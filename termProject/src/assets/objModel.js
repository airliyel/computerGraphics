/*-----------------------------------------------------------------------------
class ObjModel

OBJ 파일을 파싱하여 WebGL 버퍼에 로드하는 클래스입니다.
Cube 클래스와 동일한 인터페이스를 제공합니다:
  - draw(shader)
  - delete()
  - updateNormals()
  - copyVertexNormalsToNormals()
  - copyFaceNormalsToNormals()

사용법:
  const model = await ObjModel.load(gl, '/data/1.obj');

OBJ face 형식 지원: v, v/vt, v/vt/vn, v//vn
-----------------------------------------------------------------------------*/

export class ObjModel {
    constructor(gl) {
        this.gl = gl;
        this.vao = null;
        this.vbo = null;
        this.ebo = null;
        this.indexCount = 0;

        this.vertices = null;
        this.normals = null;
        this.colors = null;
        this.texCoords = null;
        this.indices = null;
        this.faceNormals = null;
        this.vertexNormals = null;
    }

    /**
     * OBJ 파일을 비동기로 불러와 파싱 후 ObjModel 인스턴스를 반환합니다.
     * @param {WebGL2RenderingContext} gl
     * @param {string} url - OBJ 파일 경로
     * @param {object} options - { color: [r,g,b,a] } (기본: 밝은 회색)
     * @returns {Promise<ObjModel>}
     */
    static async load(gl, url, options = {}) {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`OBJ 파일 로드 실패: ${url}`);
        const text = await response.text();

        const model = new ObjModel(gl);
        model._parse(text, options);
        model._computeNormals();
        model.initBuffers();
        return model;
    }

    _parse(text, options) {
        const posArr  = [];   // vec3[]
        const vtArr   = [];   // vec2[]
        const vnArr   = [];   // vec3[]

        // 인덱스 조합별 최종 버퍼 인덱스를 캐시
        const indexMap = new Map();

        const outPos  = [];
        const outNorm = [];
        const outCol  = [];
        const outUV   = [];
        const outIdx  = [];

        const defaultColor = options.color || [0.8, 0.8, 0.8, 1.0];

        const lines = text.split(/\r?\n/);
        for (const raw of lines) {
            const line = raw.trim();
            if (!line || line.startsWith('#')) continue;

            const parts = line.split(/\s+/);
            const type = parts[0];

            if (type === 'v') {
                posArr.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
            } else if (type === 'vt') {
                vtArr.push([parseFloat(parts[1]), parseFloat(parts[2])]);
            } else if (type === 'vn') {
                vnArr.push([parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])]);
            } else if (type === 'f') {
                // 폴리곤을 삼각형으로 팬(fan) 분할
                const faceVerts = parts.slice(1).map(token => {
                    const [vi, ti, ni] = token.split('/').map(s => (s ? parseInt(s) - 1 : -1));
                    return { vi, ti, ni };
                });

                for (let i = 1; i < faceVerts.length - 1; i++) {
                    const tri = [faceVerts[0], faceVerts[i], faceVerts[i + 1]];
                    for (const v of tri) {
                        const key = `${v.vi}/${v.ti}/${v.ni}`;
                        if (!indexMap.has(key)) {
                            const idx = outPos.length / 3;
                            indexMap.set(key, idx);

                            const p = posArr[v.vi] || [0, 0, 0];
                            outPos.push(p[0], p[1], p[2]);

                            const n = v.ni >= 0 ? vnArr[v.ni] : [0, 1, 0];
                            outNorm.push(n[0], n[1], n[2]);

                            outCol.push(...defaultColor);

                            const uv = v.ti >= 0 ? vtArr[v.ti] : [0, 0];
                            outUV.push(uv[0], uv[1]);
                        }
                        outIdx.push(indexMap.get(key));
                    }
                }
            }
        }

        // 모델을 단위 큐브 크기(±0.5)로 정규화
        this._normalize(outPos);

        this.vertices  = new Float32Array(outPos);
        this.normals   = new Float32Array(outNorm);
        this.colors    = new Float32Array(outCol);
        this.texCoords = new Float32Array(outUV);
        this.indices   = new Uint32Array(outIdx);  // 정점 수가 많으면 Uint32 필요
    }

    /** 모델 좌표를 ±0.5 범위로 정규화 */
    _normalize(pos) {
        let minX = Infinity, maxX = -Infinity;
        let minY = Infinity, maxY = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;

        for (let i = 0; i < pos.length; i += 3) {
            minX = Math.min(minX, pos[i]);   maxX = Math.max(maxX, pos[i]);
            minY = Math.min(minY, pos[i+1]); maxY = Math.max(maxY, pos[i+1]);
            minZ = Math.min(minZ, pos[i+2]); maxZ = Math.max(maxZ, pos[i+2]);
        }

        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;
        const cz = (minZ + maxZ) / 2;
        const scale = 1.0 / Math.max(maxX - minX, maxY - minY, maxZ - minZ);

        for (let i = 0; i < pos.length; i += 3) {
            pos[i]   = (pos[i]   - cx) * scale;
            pos[i+1] = (pos[i+1] - cy) * scale;
            pos[i+2] = (pos[i+2] - cz) * scale;
        }
    }

    /** OBJ에 법선이 없는 경우 면 법선을 계산하고, 정점 법선을 평균냄 */
    _computeNormals() {
        const vertCount = this.vertices.length / 3;
        this.faceNormals   = new Float32Array(this.normals);  // 복사본
        this.vertexNormals = new Float32Array(this.normals.length);

        // 누적용
        const accum = new Float32Array(this.normals.length);
        const cnt   = new Uint32Array(vertCount);

        const idx = this.indices;
        const v   = this.vertices;

        for (let i = 0; i < idx.length; i += 3) {
            const i0 = idx[i], i1 = idx[i+1], i2 = idx[i+2];

            // 두 변 벡터
            const ax = v[i1*3]   - v[i0*3],   ay = v[i1*3+1] - v[i0*3+1], az = v[i1*3+2] - v[i0*3+2];
            const bx = v[i2*3]   - v[i0*3],   by = v[i2*3+1] - v[i0*3+1], bz = v[i2*3+2] - v[i0*3+2];

            // 외적
            const nx = ay*bz - az*by;
            const ny = az*bx - ax*bz;
            const nz = ax*by - ay*bx;

            for (const vi of [i0, i1, i2]) {
                accum[vi*3]   += nx;
                accum[vi*3+1] += ny;
                accum[vi*3+2] += nz;
                cnt[vi]++;
            }
        }

        for (let i = 0; i < vertCount; i++) {
            const c = cnt[i] || 1;
            let nx = accum[i*3] / c;
            let ny = accum[i*3+1] / c;
            let nz = accum[i*3+2] / c;
            const len = Math.sqrt(nx*nx + ny*ny + nz*nz) || 1;
            this.vertexNormals[i*3]   = nx / len;
            this.vertexNormals[i*3+1] = ny / len;
            this.vertexNormals[i*3+2] = nz / len;
        }

        // 기본은 vertex normal 사용
        this.normals = new Float32Array(this.vertexNormals);
    }

    copyVertexNormalsToNormals() {
        this.normals.set(this.vertexNormals);
    }

    copyFaceNormalsToNormals() {
        this.normals.set(this.faceNormals);
    }

    initBuffers() {
        const gl = this.gl;

        this.vao = gl.createVertexArray();
        this.vbo = gl.createBuffer();
        this.ebo = gl.createBuffer();
        this.indexCount = this.indices.length;

        const vSize = this.vertices.byteLength;
        const nSize = this.normals.byteLength;
        const cSize = this.colors.byteLength;
        const tSize = this.texCoords.byteLength;
        const totalSize = vSize + nSize + cSize + tSize;

        gl.bindVertexArray(this.vao);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferData(gl.ARRAY_BUFFER, totalSize, gl.STATIC_DRAW);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
        gl.bufferSubData(gl.ARRAY_BUFFER, vSize, this.normals);
        gl.bufferSubData(gl.ARRAY_BUFFER, vSize + nSize, this.colors);
        gl.bufferSubData(gl.ARRAY_BUFFER, vSize + nSize + cSize, this.texCoords);

        // Uint32Array 사용 (정점 수 > 65535 가능)
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);                       // position
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, vSize);                   // normal
        gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, vSize + nSize);           // color
        gl.vertexAttribPointer(3, 2, gl.FLOAT, false, 0, vSize + nSize + cSize);   // texCoord

        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.enableVertexAttribArray(3);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    updateNormals() {
        const gl = this.gl;
        const vSize = this.vertices.byteLength;

        gl.bindVertexArray(this.vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bufferSubData(gl.ARRAY_BUFFER, vSize, this.normals);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    draw(shader) {
        const gl = this.gl;
        shader.use();
        gl.bindVertexArray(this.vao);
        // Uint32 인덱스 사용
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_INT, 0);
        gl.bindVertexArray(null);
    }

    delete() {
        const gl = this.gl;
        if (this.vbo) gl.deleteBuffer(this.vbo);
        if (this.ebo) gl.deleteBuffer(this.ebo);
        if (this.vao) gl.deleteVertexArray(this.vao);
        this.vbo = null;
        this.ebo = null;
        this.vao = null;
    }
}

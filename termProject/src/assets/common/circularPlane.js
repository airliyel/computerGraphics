// public/assets/common/circularPlane.js
//   location 0: position(vec3)
//   location 1: normal(vec3)
//   location 2: color(vec4)
//   location 3: texCoord(vec2)

export class CircularPlane {
    constructor(gl, options = {}) {
        this.gl = gl;
        this.radius = options.radius ?? 4.0;
        this.segments = Math.max(3, options.segments ?? 96);
        this.color = options.color ?? [0.78, 0.78, 0.72, 1.0];

        this.vao = gl.createVertexArray();
        this.vbo = gl.createBuffer();
        this.ebo = gl.createBuffer();

        this._initGeometry();
        this._initBuffers();
    }

    _initGeometry() {
        const positions = [];
        const normals = [];
        const colors = [];
        const texCoords = [];
        const indices = [];

        // center vertex
        positions.push(0, 0, 0);
        normals.push(0, 1, 0);
        colors.push(...this.color);
        texCoords.push(0.5, 0.5);

        // outer ring vertices on XZ plane
        for (let i = 0; i <= this.segments; i++) {
            const t = (i / this.segments) * Math.PI * 2.0;
            const x = Math.cos(t) * this.radius;
            const z = Math.sin(t) * this.radius;

            positions.push(x, 0, z);
            normals.push(0, 1, 0);
            colors.push(...this.color);
            texCoords.push(
                0.5 + 0.5 * Math.cos(t),
                0.5 + 0.5 * Math.sin(t)
            );
        }

        // triangle fan indices
        for (let i = 1; i <= this.segments; i++) {
            indices.push(0, i, i + 1);
        }

        this.vertices = new Float32Array(positions);
        this.normals = new Float32Array(normals);
        this.colors = new Float32Array(colors);
        this.texCoords = new Float32Array(texCoords);
        this.indices = new Uint16Array(indices);
        this.indexCount = this.indices.length;
    }

    _initBuffers() {
        const gl = this.gl;
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

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, vSize);
        gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, vSize + nSize);
        gl.vertexAttribPointer(3, 2, gl.FLOAT, false, 0, vSize + nSize + cSize);

        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.enableVertexAttribArray(3);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    draw(shader) {
        const gl = this.gl;
        shader.use();
        gl.bindVertexArray(this.vao);
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
        gl.bindVertexArray(null);
    }

    delete() {
        const gl = this.gl;
        gl.deleteBuffer(this.vbo);
        gl.deleteBuffer(this.ebo);
        gl.deleteVertexArray(this.vao);
    }
}
// ─────────────────────────────────────────────────────────────
// RectPlane: XZ 평면 기준 직사각형 (법선 +Y)
//   rotateY(90°) 하면 YZ 평면 수직 벽이 됨
//   location 0: position(vec3)
//   location 1: normal(vec3)
//   location 2: color(vec4)
//   location 3: texCoord(vec2)
// ─────────────────────────────────────────────────────────────
export class RectPlane {
    constructor(gl, options = {}) {
        this.gl = gl;
        this.halfW = options.halfW ?? 7.0;  // X 방향 반너비
        this.halfH = options.halfH ?? 6.0;  // Z 방향 반높이
        this.color = options.color ?? [0.88, 0.84, 0.78, 1.0];

        this.vao = gl.createVertexArray();
        this.vbo = gl.createBuffer();
        this.ebo = gl.createBuffer();

        this._initGeometry();
        this._initBuffers();
    }

    _initGeometry() {
        const w = this.halfW, h = this.halfH;
        const c = this.color;

        // 4 vertices: (-w,0,-h), (w,0,-h), (w,0,h), (-w,0,h)
        const positions  = new Float32Array([-w,0,-h,  w,0,-h,  w,0,h,  -w,0,h]);
        const normals    = new Float32Array([ 0,1, 0,  0,1, 0,  0,1,0,   0,1,0]);
        const colors     = new Float32Array([...c,...c,...c,...c]);
        const texCoords  = new Float32Array([0,0, 1,0, 1,1, 0,1]);
        const indices    = new Uint16Array([0,2,1, 0,3,2]);

        this.vertices  = positions;
        this.normals   = normals;
        this.colors    = colors;
        this.texCoords = texCoords;
        this.indices   = indices;
        this.indexCount = indices.length;
    }

    _initBuffers() {
        const gl = this.gl;
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

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, vSize);
        gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 0, vSize + nSize);
        gl.vertexAttribPointer(3, 2, gl.FLOAT, false, 0, vSize + nSize + cSize);

        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.enableVertexAttribArray(3);

        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
    }

    draw(shader) {
        const gl = this.gl;
        shader.use();
        gl.bindVertexArray(this.vao);
        gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
        gl.bindVertexArray(null);
    }

    delete() {
        const gl = this.gl;
        gl.deleteBuffer(this.vbo);
        gl.deleteBuffer(this.ebo);
        gl.deleteVertexArray(this.vao);
    }
}
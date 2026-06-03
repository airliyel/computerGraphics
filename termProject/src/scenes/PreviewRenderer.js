// src/scenes/PreviewRenderer.js
// 스테이지 선택 화면 전용 경량 3D 프리뷰 렌더러
import { ObjModel } from '../game/objModel.js';
import { mat4, mat3 } from 'gl-matrix';

// ObjModel은 fixed location으로 VAO를 바인딩하므로 attribute 이름은 무관
const VERT = `#version 300 es
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_normal;
uniform mat4 u_mvp;
uniform mat3 u_normalMat;
out vec3 v_normal;
void main() {
    gl_Position = u_mvp * vec4(a_position, 1.0);
    v_normal    = normalize(u_normalMat * a_normal);
}`;

const FRAG = `#version 300 es
precision mediump float;
in  vec3 v_normal;
uniform vec3  u_lightDir;
uniform vec3  u_color;
uniform float u_brightness;
out vec4 outColor;
void main() {
    vec3 n    = normalize(v_normal);
    vec3 l    = normalize(u_lightDir);
    float d   = max(dot(n, l), 0.0);
    float rim = max(dot(n, vec3(-l.x * 0.3, -l.y * 0.3, l.z)), 0.0) * 0.10;
    float a   = 0.32;
    outColor  = vec4(u_color * (a + d * 0.68 + rim) * u_brightness, 1.0);
}`;

export class PreviewRenderer {
    /** @param {HTMLCanvasElement} canvas */
    constructor(canvas) {
        this._canvas = canvas;
        this._gl = canvas.getContext('webgl2', {
            alpha: true,
            antialias: true,
            depth: true,
            premultipliedAlpha: false,
            powerPreference: 'low-power',
        });

        if (!this._gl) {
            console.error('[Preview] WebGL2 context creation failed for canvas', canvas.dataset.index);
        }

        this._program = null;
        this._shader  = null;
        this._model   = null;
        this._rotY    = 0;
        this.ready    = false;

        if (this._gl) this._initGL();
    }

    _initGL() {
        const gl = this._gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);

        const vert = this._compile(gl.VERTEX_SHADER,   VERT);
        const frag = this._compile(gl.FRAGMENT_SHADER, FRAG);
        this._program = this._link(vert, frag);

        // ObjModel.draw(shader) 은 shader.use() 만 호출
        const prog = this._program;
        this._shader = { program: prog, use: () => gl.useProgram(prog) };
    }

    async loadModel(url) {
        if (!this._gl) return;
        try {
            this._model = await ObjModel.load(this._gl, url);
            this.ready  = true;
        } catch (e) {
            console.error('[Preview] model load failed:', url, e);
        }
    }

    /**
     * @param {number} dt        초 단위 경과 시간
     * @param {object} [opts]
     * @param {number} [opts.brightness=1.0]  밝기 (0~1)
     * @param {number} [opts.rotSpeed=0.42]   회전 속도 (rad/s)
     */
    render(dt, opts = {}) {
        const gl = this._gl;
        if (!gl || !this.ready || !this._model || !this._program) return;

        const { brightness = 1.0, rotSpeed = 0.42 } = opts;
        this._rotY += dt * rotSpeed;

        // 캔버스 해상도 동기화 — clientWidth 가 레이아웃 전에 0일 수 있으므로 fallback 적용
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cssW = this._canvas.clientWidth  || this._canvas.width  || 240;
        const cssH = this._canvas.clientHeight || this._canvas.height || 240;
        const cw   = (cssW * dpr) | 0;
        const ch   = (cssH * dpr) | 0;

        if (cw <= 0 || ch <= 0) return; // 아직 레이아웃이 계산되지 않은 경우

        if (this._canvas.width !== cw || this._canvas.height !== ch) {
            this._canvas.width  = cw;
            this._canvas.height = ch;
        }

        gl.viewport(0, 0, cw, ch);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const aspect = cw / Math.max(ch, 1);
        const proj   = mat4.perspective(mat4.create(), Math.PI / 5.5, aspect, 0.05, 50);
        const view   = mat4.lookAt(mat4.create(), [0, 0.12, 2.6], [0, 0, 0], [0, 1, 0]);

        const model = mat4.create();
        mat4.rotateY(model, model, this._rotY);
        mat4.rotateX(model, model, 0.22); // 살짝 위에서 내려다보는 각도

        const mv  = mat4.multiply(mat4.create(), view, model);
        const mvp = mat4.multiply(mat4.create(), proj, mv);
        const nm  = mat3.normalFromMat4(mat3.create(), mv);

        const prog = this._program;
        gl.useProgram(prog);
        gl.uniformMatrix4fv(gl.getUniformLocation(prog, 'u_mvp'),       false, mvp);
        gl.uniformMatrix3fv(gl.getUniformLocation(prog, 'u_normalMat'), false, nm);
        gl.uniform3fv(gl.getUniformLocation(prog, 'u_lightDir'),  [1.4, 2.2, 2.8]);
        gl.uniform3fv(gl.getUniformLocation(prog, 'u_color'),     [1.0, 0.95, 0.84]);
        gl.uniform1f(gl.getUniformLocation(prog, 'u_brightness'), brightness);

        this._model.draw(this._shader);
    }

    destroy() {
        this._model?.delete?.();
        if (this._program && this._gl) this._gl.deleteProgram(this._program);
        this._model   = null;
        this._program = null;
        this._shader  = null;
        this.ready    = false;
    }

    _compile(type, src) {
        const gl = this._gl;
        const sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
            console.error('[Preview shader]', gl.getShaderInfoLog(sh));
            gl.deleteShader(sh);
            return null;
        }
        return sh;
    }

    _link(vert, frag) {
        if (!vert || !frag) return null;
        const gl   = this._gl;
        const prog = gl.createProgram();
        gl.attachShader(prog, vert);
        gl.attachShader(prog, frag);
        gl.linkProgram(prog);
        gl.deleteShader(vert);
        gl.deleteShader(frag);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error('[Preview link]', gl.getProgramInfoLog(prog));
            return null;
        }
        return prog;
    }
}

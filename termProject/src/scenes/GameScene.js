// src/scenes/GameScene.js
import BaseScene from './BaseScene.js';
import SceneManager from '../core/SceneManager.js';
import Arcball from '../game/arcball.js';
import StageManager from '../core/StageManager.js';
import ScoreCalculate from '../game/ScoreCalculate.js';
import StorageManager from '../core/StorageManager.js';
import '../styles/GameScene.css';
import { mat3, mat4, vec3 } from 'gl-matrix';

import { ObjModel } from '../game/objModel.js';
import { CircularPlane, RectPlane } from '../assets/common/circularPlane.js';
import shVertSource from '../shaders/shVert.glsl?raw';
import shFragSource from '../shaders/shFrag.glsl?raw';
import shLampVertSource from '../shaders/shLampVert.glsl?raw';
import shLampFragSource from '../shaders/shLampFrag.glsl?raw';
import shadowVertSource from '../shaders/shadowVert.glsl?raw';
import shadowFragSource from '../shaders/shadowFrag.glsl?raw';
import wallFragSource   from '../shaders/wallFrag.glsl?raw';
import ShadowMatcher from '../game/ShadowMatcher.js';

class SimpleShader {
    constructor(gl, vertexSource, fragmentSource) {
        this.gl = gl;
        this.program = this._createProgram(vertexSource, fragmentSource);
    }

    use() {
        this.gl.useProgram(this.program);
    }

    setInt(name, value) {
        this.gl.uniform1i(this.gl.getUniformLocation(this.program, name), value);
    }

    setFloat(name, value) {
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, name), value);
    }

    setVec2(name, value) {
        this.gl.uniform2fv(this.gl.getUniformLocation(this.program, name), value);
    }

    setVec3(name, value) {
        this.gl.uniform3fv(this.gl.getUniformLocation(this.program, name), value);
    }

    setVec4(name, value) {
        this.gl.uniform4fv(this.gl.getUniformLocation(this.program, name), value);
    }

    setMat3(name, value) {
        this.gl.uniformMatrix3fv(this.gl.getUniformLocation(this.program, name), false, value);
    }

    setMat4(name, value) {
        this.gl.uniformMatrix4fv(this.gl.getUniformLocation(this.program, name), false, value);
    }

    delete() {
        this.gl.deleteProgram(this.program);
    }

    _createProgram(vertexSource, fragmentSource) {
        const gl = this.gl;
        const vertexShader = this._compileShader(gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = this._compileShader(gl.FRAGMENT_SHADER, fragmentSource);
        const program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const log = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            throw new Error(`Shader program link failed: ${log}`);
        }

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return program;
    }

    _compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const log = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(`Shader compile failed: ${log}`);
        }

        return shader;
    }
}

export default class GameScene extends BaseScene {

    constructor(gl, stageId) {
        super(gl);

        this.selectedStageId = stageId;

        this.timer           = 0;      // 경과 시간 (초) — 인트로 종료 후부터 카운트
        this.hintCount       = 0;      // 힌트 사용 횟수
        this.matchRate       = 0;      // 그림자 일치율 0~1
        this._clearTriggered = false;  // 클리어 연출 중복 방지

        // 인트로 연출 상태
        this._introActive        = true;
        this._introElapsed       = 0;
        this._introSpotIntensity = 0;  // 0→1 spotlight reveal
        this._hudVisible         = false;
        this._introOverlay       = null;

        // 힌트 상태
        this._hintActive  = false;
        this._hintTimer   = 0;
        this._hintAlpha   = 0;
        this._HINT_IN     = 0.35;  // fade-in 시간 (초)
        this._HINT_HOLD   = 2.0;   // 유지 시간 (초)
        this._HINT_OUT    = 0.55;  // fade-out 시간 (초)

        this._onKeyDown = this._onKeyDown.bind(this);
        this.arcball = new Arcball(this.gl.canvas, 5.0, { rotation: 1.2, zoom: 0.0 });

        this.wallX         = -4.5;   // 그림자가 크게 보이도록 약간 앞으로
        this.lightPosition = vec3.fromValues(4.5, 1.2, 0.5);  // 그림자가 벽 중앙에 맺히도록 계산된 위치
        this.viewPosition  = vec3.fromValues(2.0, 2.8, 5.5);  // 오브젝트·벽을 함께 담는 구도
    }

    async enter() {
        const stage = StageManager.getById(this.selectedStageId);

        if (!stage) {
            console.error(`Stage with ID ${this.selectedStageId} not found!`);
            import('./StageSelectScene.js').then(({ default: StageSelectScene }) => {
                SceneManager.changeScene(new StageSelectScene(this.gl));
            });
            return;
        }

        this.arcball.locked = true;  // 인트로 동안 조작 불가

        this.stageId = stage.id;
        this.stageName = stage ? stage.name : `Stage ${this.stageId + 1}`;
        this.assetsPath = stage ? stage.assetsPath : null;
        this.targetShadowImage = stage ? stage.targetShadow : null;
        // 06-03 feat: get answer angle
        this.targetRotation = stage.targetRotation;

        this._initGLState();
        await this._initSceneResources();

        this._buildUI();
        window.addEventListener('keydown', this._onKeyDown);
    }

    exit() {
        window.removeEventListener('keydown', this._onKeyDown);
        this._removeUI();
        this._deleteSceneResources();
    }

    update(deltaTime) {
        // ── 인트로 연출 중 ──
        if (this._introActive) {
            this._introElapsed += deltaTime;
            this._tickIntro();
            return;
        }

        // ── 게임 플레이 (인트로 종료 후) ──
        const result = ShadowMatcher.checkClear(
            this.arcball.getRotationQuaternion(),
            this.targetRotation
        );

	if (!result.cleared)
            this.timer += deltaTime;

        this.matchRate = result.matchPercentage / 100.0;

        this._updateHUD();
        this._updateHint(deltaTime);

        if (result.cleared && !this._clearTriggered) {
            this._clearTriggered = true;
            this._playSuccessEffect();
        }
    }

    // ─── 인트로 틱 ────────────────────────────────────────────
    _tickIntro() {
        const e = this._introElapsed;

        // spotlight 강도: 0.5s~2.3s, 느린 시작 → 빠른 밝아짐 (t²)
        const ss = 0.5, se = 2.3;
        const t = Math.max(0, Math.min(1, (e - ss) / (se - ss)));
        this._introSpotIntensity = t * t;

        // HUD 등장 (2.2s): opacity 0 → 1
        if (!this._hudVisible && e >= 2.2) {
            this._hudVisible = true;
            if (this._ui) {
                this._ui.style.transition = 'opacity 0.55s ease';
                this._ui.style.opacity    = '1';
            }
            this._updateHUD();   // timer 00:00 + 도트 초기 상태 표시
        }

        // 인트로 종료 (2.5s): 조작 해제 + 타이머 시작
        if (e >= 2.5) {
            this._introActive        = false;
            this._introSpotIntensity = 1.0;
            this.arcball.locked      = false;
            this._introOverlay?.remove();
            this._introOverlay = null;
        }
    }

    _updateHint(dt) {
        if (!this._hintActive) return;
        this._hintTimer += dt;
        const { _HINT_IN: fi, _HINT_HOLD: hold, _HINT_OUT: fo } = this;
        const total = fi + hold + fo;

        if (this._hintTimer >= total) {
            this._hintActive = false;
            this._hintAlpha  = 0;
        } else if (this._hintTimer < fi) {
            this._hintAlpha = this._hintTimer / fi;
        } else if (this._hintTimer < fi + hold) {
            this._hintAlpha = 1.0;
        } else {
            this._hintAlpha = 1.0 - (this._hintTimer - fi - hold) / fo;
        }
    }

    render() {
        const gl = this.gl;
        if (!this.cube || !this.wall || !this.objectShader || !this.shadowShader || !this.wallShader) return;

        // 매 프레임 GL 상태 초기화
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.depthMask(true);
        gl.stencilMask(0xff);   // ← 이 줄이 없으면 stencil clear가 차단됨

        gl.clearColor(0.05, 0.04, 0.04, 1.0);  // 극장같은 암흑 배경
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

        const { view, projection } = this._getCameraMatrices();
        const cubeModel = this._getCubeModelMatrix();

        // 벽은 YZ 평면에 놓인 직사각형: X = wallX 위치에 수직으로 세움
        // RectPlane은 XZ 평면(법선 +Y) → rotateZ(-90°)하면 법선이 +X를 향함
        const wallModel = mat4.create();
        mat4.translate(wallModel, wallModel, [this.wallX, 0.0, 0.0]);
        mat4.rotateZ(wallModel, wallModel, -Math.PI / 2.0);

        // 1) 벽을 먼저 그림 (spotlight 전용 셰이더)
        this._drawWall(wallModel, view, projection);

        // 2) 벽에 cube가 만드는 평면 그림자를 그림 (수직 평면 X = wallX)
        //    평면 방정식: x = wallX  →  (1, 0, 0, -wallX)
        const shadowModel = this._getShadowModelMatrix(cubeModel);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.depthMask(false);

        // 스텐실: 처음 그려지는 픽셀만 1로 마킹하고 통과
        gl.stencilFunc(gl.NOTEQUAL, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
        gl.stencilMask(0xff);

        this._drawShadowObject(this.cube, shadowModel, view, projection, 0.72);

        // 스텐실 상태 복구
        gl.stencilMask(0x00);
        gl.stencilFunc(gl.ALWAYS, 0, 0xff);

        gl.depthMask(true);
        gl.disable(gl.BLEND);

        // 3) 힌트 그림자 (정답 rotation 기준, 청록색)
        if (this._hintActive && this._hintAlpha > 0.001) {
            const hintCube   = this._getHintModelMatrix();
            const hintShadow = this._getShadowModelMatrix(hintCube);

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            gl.depthMask(false);
            this._drawHintShadow(this.cube, hintShadow, view, projection, this._hintAlpha);
            gl.depthMask(true);
            gl.disable(gl.BLEND);
        }

        // 4) 실제 오브젝트를 그림
        this._drawLitObject(this.cube, cubeModel, view, projection);
    }

    _initGLState() {
        const gl = this.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.enable(gl.STENCIL_TEST);
    }

    async _initSceneResources() {
        const gl = this.gl;
        const stage = StageManager.getById(this.selectedStageId);

        this.cube = await ObjModel.load(gl, stage.modelPath);

        // 벽: YZ 평면에 놓인 직사각형 (rotateY로 세움)
        this.wall = new RectPlane(gl, {
            halfW: 8.0,
            halfH: 7.0,
            color: [0.88, 0.84, 0.78, 1.0],
        });

        this.objectShader = new SimpleShader(gl, shVertSource, shFragSource);
        this.lampShader   = new SimpleShader(gl, shLampVertSource, shLampFragSource);
        this.shadowShader = new SimpleShader(gl, shadowVertSource, shadowFragSource);
        this.wallShader   = new SimpleShader(gl, shVertSource, wallFragSource);
        this.whiteTexture = this._createSingleColorTexture([255, 255, 255, 255]);

        // 벽 Spotlight 중심: 광원 → 오브젝트 중심(0,0.55,0) 연장선이 벽과 만나는 점
        const Lx = this.lightPosition[0], Ly = this.lightPosition[1], Lz = this.lightPosition[2];
        const spotT = (Lx - this.wallX) / Lx;
        this._wallSpotCenter = new Float32Array([
            Ly + spotT * (0.55 - Ly),
            Lz + spotT * (0.0  - Lz),
        ]);
        this._wallSpotRadius = 3.2;
    }

    _deleteSceneResources() {
        this.cube?.delete?.();
        this.wall?.delete?.();
        this.objectShader?.delete?.();
        this.lampShader?.delete?.();
        this.shadowShader?.delete?.();
        this.wallShader?.delete?.();

        if (this.whiteTexture) this.gl.deleteTexture(this.whiteTexture);

        this.cube = null;
        this.wall = null;
        this.objectShader = null;
        this.lampShader = null;
        this.shadowShader = null;
        this.wallShader = null;
        this.whiteTexture = null;
    }

    _createSingleColorTexture(rgba) {
        const gl = this.gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            1,
            1,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            new Uint8Array(rgba)
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    }

    _getCameraMatrices() {
        const gl = this.gl;
        const aspect = gl.canvas.width / Math.max(gl.canvas.height, 1);
        const view = mat4.create();
        const projection = mat4.create();

        mat4.lookAt(
            view,
            this.viewPosition,
            vec3.fromValues(-1.0, 0.4, 0.0),  // 오브젝트·벽 중간을 향함
            vec3.fromValues(0.0, 1.0, 0.0)
        );
        mat4.perspective(projection, Math.PI / 4.0, aspect, 0.1, 100.0);

        return { view, projection };
    }

    _getCubeModelMatrix() {
        const model = mat4.create();
        const rotation = this.arcball.getModelRotMatrix();

        mat4.translate(model, model, [0.0, 0.55, 0.0]);
        mat4.multiply(model, model, rotation);
        mat4.scale(model, model, [1.45, 1.45, 1.45]);

        return model;
    }

    _getShadowModelMatrix(objectModel) {
        // 수직 벽 평면: x = wallX  →  법선(1,0,0), d = -wallX
        // 평면 방정식: 1*x + 0*y + 0*z + (-wallX) = 0
        const shadowProjection = this._createPlaneShadowMatrix(
            [1.0, 0.0, 0.0, -this.wallX],
            [this.lightPosition[0], this.lightPosition[1], this.lightPosition[2], 1.0]
        );
        const bias = mat4.create();
        const shadowModel = mat4.create();

        // z-fighting 방지: 벽에서 살짝 앞으로 (X축 양의 방향)
        mat4.translate(bias, bias, [0.004, 0.0, 0.0]);
        mat4.multiply(shadowModel, bias, shadowProjection);
        mat4.multiply(shadowModel, shadowModel, objectModel);

        return shadowModel;
    }

    _createPlaneShadowMatrix(plane, light) {
        const dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];
        const matrix = mat4.create();

        // column-major layout for gl-matrix
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                matrix[col * 4 + row] = dot * (row === col ? 1.0 : 0.0) - light[row] * plane[col];
            }
        }

        return matrix;
    }

    _drawLitObject(object, model, view, projection) {
        const gl = this.gl;
        const shader = this.objectShader;
        const normalMatrix = mat3.create();

        mat3.normalFromMat4(normalMatrix, model);

        shader.use();
        shader.setMat4('u_model', model);
        shader.setMat4('u_view', view);
        shader.setMat4('u_projection', projection);
        shader.setVec3('u_viewPos', this.viewPosition);
        shader.setVec3('light.position', this.lightPosition);
        shader.setVec3('light.ambient',  [0.06, 0.06, 0.07]);  // 거의 암흑, 형태만 보임
        shader.setVec3('light.diffuse',  [0.95, 0.93, 0.88]);  // 따뜻한 spotlight diffuse
        shader.setVec3('light.specular', [0.50, 0.48, 0.44]);  // 선명한 하이라이트
        shader.setVec3('light.direction', vec3.fromValues(-this.lightPosition[0], -this.lightPosition[1], -this.lightPosition[2]));
        shader.setFloat('light.cutOff', Math.PI / 5.0);
        shader.setFloat('light.outerCutOff', Math.PI / 4.0);
        shader.setFloat('light.constant', 1.0);
        shader.setFloat('light.linear', 0.045);
        shader.setFloat('light.quadratic', 0.0075);
        shader.setVec3('material.specular', [0.2, 0.2, 0.2]);
        shader.setFloat('material.shininess', 32.0);
        shader.setInt('material.diffuse', 0);

        // shVert.glsl이 내부에서 normal matrix를 계산하므로 현재 normalMatrix는 향후 shader 교체용으로만 유지
        void normalMatrix;

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.whiteTexture);
        object.draw(shader);
    }

    _drawShadowObject(object, model, view, projection, alpha = 0.72) {
        const shader = this.shadowShader;
        shader.use();
        shader.setMat4('u_model', model);
        shader.setMat4('u_view', view);
        shader.setMat4('u_projection', projection);
        shader.setVec4('u_shadowColor', [0.0, 0.0, 0.0, alpha]);
        object.draw(shader);
    }

    _drawWall(model, view, projection) {
        const shader = this.wallShader;
        shader.use();
        shader.setMat4('u_model', model);
        shader.setMat4('u_view', view);
        shader.setMat4('u_projection', projection);
        shader.setVec2('u_spotCenter', this._wallSpotCenter);
        shader.setFloat('u_spotRadius', this._wallSpotRadius);
        shader.setVec3('u_wallColor', [0.88, 0.85, 0.79]);
        shader.setFloat('u_introIntensity', this._introSpotIntensity);
        this.wall.draw(shader);
    }

    _drawLamp(model, view, projection) {
        const shader = this.lampShader;
        shader.use();
        shader.setMat4('u_model', model);
        shader.setMat4('u_view', view);
        shader.setMat4('u_projection', projection);
        this.cube.draw(shader);
    }

    // ─── 클리어 연출 ──────────────────────────────────────────

    _playSuccessEffect() {
        // 클리어 순간 정확한 정답 회전으로 스냅 → 힌트 그림자와 완전히 일치
        const q   = this.targetRotation;
        const len = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
        this.arcball.rotation[0] = q[0] / len;
        this.arcball.rotation[1] = q[1] / len;
        this.arcball.rotation[2] = q[2] / len;
        this.arcball.rotation[3] = q[3] / len;

        // 1) 입력 차단
        this.arcball.locked = true;
        document.getElementById('btn-hint')?.setAttribute('disabled', '');
        document.getElementById('btn-back')?.setAttribute('disabled', '');

        // 2) 도트 펄스
        document.querySelectorAll('.match-dot').forEach(dot => {
            dot.classList.add('active', 'celebrating');
        });

        // 3) 화면 가장자리 글로우
        const vignette = document.createElement('div');
        vignette.id = 'clear-vignette';
        document.body.appendChild(vignette);

        // 4) 성공 배너
        const banner = document.createElement('div');
        banner.id = 'clear-banner';
        banner.textContent = 'Clear!';
        document.body.appendChild(banner);

        this._clearOverlays = [vignette, banner];

        // 5) 1600ms 후 어두운 페이드 → 클리어 오버레이 표시
        setTimeout(() => {
            const fade = document.createElement('div');
            fade.id = 'clear-fade';
            document.body.appendChild(fade);
            this._clearOverlays.push(fade);

            setTimeout(async () => {
                // 페이드 제거 후 클리어 오버레이 표시
                fade.remove();
                this._clearOverlays = this._clearOverlays.filter(el => el !== fade);
                vignette.remove();
                banner.remove();
                this._clearOverlays = [];
                await this._showClearOverlay();
            }, 500);
        }, 1600);
    }

    async _showClearOverlay() {
        // 별점 계산
        const scorer = new ScoreCalculate(this.stageId);
        await scorer.init();
        const stars = scorer.calculate(this.timer, this.hintCount);

        // 저장
        StorageManager.saveResult(this.stageId, { score: this.timer, stars });

        const fmt = t => `${String(Math.floor(t / 60)).padStart(2,'0')}:${String(Math.floor(t % 60)).padStart(2,'0')}`;
        const clearTime = fmt(this.timer);
        const saved     = StorageManager.getResult(this.stageId);
        const bestStr   = saved.bestScore < 99 * 60 + 59 ? fmt(saved.bestScore) : '--:--';
        const isLast    = this.stageId >= StageManager.getTotalCount() - 1;

        const overlay = document.createElement('div');
        overlay.id = 'clear-overlay';
        overlay.innerHTML = `
            <div id="co-backdrop"></div>
            <div id="co-card">
                <p id="co-stage-label">Stage ${this.stageId + 1} · ${this.stageName}</p>
                <h2 id="co-title">Stage Clear!</h2>
                <div id="co-stars">
                    <span class="co-star side${stars >= 1 ? ' active' : ''}">★</span>
                    <span class="co-star center${stars >= 2 ? ' active' : ''}">★</span>
                    <span class="co-star side${stars >= 3 ? ' active' : ''}">★</span>
                </div>
                <div id="co-scores">
                    <div class="co-score-card">
                        <span class="co-score-label">Score</span>
                        <span class="co-score-val">${clearTime}</span>
                    </div>
                    <div class="co-score-card">
                        <span class="co-score-label">Best</span>
                        <span class="co-score-val">${bestStr}</span>
                    </div>
                </div>
                <div id="co-actions">
                    <button id="co-retry" class="co-btn-icon" title="Retry">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                            <path d="M3 3v5h5"/>
                        </svg>
                    </button>
                    <button id="co-next" class="co-btn-primary"${isLast ? ' disabled' : ''}>Next</button>
                    <button id="co-menu" class="co-btn-icon" title="Stage Select">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                            <polyline points="16 17 21 12 16 7"/>
                            <line x1="21" y1="12" x2="9" y2="12"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        this._clearOverlays = [overlay];

        // 별 순차 등장
        overlay.querySelectorAll('.co-star').forEach((star, i) => {
            setTimeout(() => star.classList.add('pop'), 200 + i * 220);
        });

        // 버튼 이벤트
        overlay.querySelector('#co-retry').addEventListener('click', () => {
            import('./GameScene.js').then(({ default: GameScene }) => {
                SceneManager.changeScene(new GameScene(this.gl, this.stageId));
            });
        });
        overlay.querySelector('#co-next').addEventListener('click', () => {
            import('./GameScene.js').then(({ default: GameScene }) => {
                SceneManager.changeScene(new GameScene(this.gl, this.stageId + 1));
            });
        });
        overlay.querySelector('#co-menu').addEventListener('click', () => {
            import('./StageSelectScene.js').then(({ default: StageSelectScene }) => {
                SceneManager.changeScene(new StageSelectScene(this.gl));
            });
        });
    }

    // ─── 힌트 ─────────────────────────────────────────────────

    _useHint() {
        if (this._introActive || this._clearTriggered || this._hintActive) return;
        this.hintCount++;
        this._hintActive = true;
        this._hintTimer  = 0;
        this._hintAlpha  = 0;
    }

    // targetRotation 기준 모델 행렬 (arcball 변경 없음)
    _getHintModelMatrix() {
        const model  = mat4.create();
        const rotMat = mat4.create();
        const q   = this.targetRotation;
        const len = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
        mat4.fromQuat(rotMat, [q[0]/len, q[1]/len, q[2]/len, q[3]/len]);
        mat4.translate(model, model, [0.0, 0.55, 0.0]);
        mat4.multiply(model, model, rotMat);
        mat4.scale(model, model, [1.45, 1.45, 1.45]);
        return model;
    }

    // 청록색 힌트 그림자 드로우
    _drawHintShadow(object, model, view, projection, alpha) {
        const shader = this.shadowShader;
        shader.use();
        shader.setMat4('u_model', model);
        shader.setMat4('u_view', view);
        shader.setMat4('u_projection', projection);
        // #00d7fe = rgba(0, 0.843, 0.996) 청록색
        shader.setVec4('u_shadowColor', [0.0, 0.843, 0.996, alpha * 0.72]);
        object.draw(shader);
    }

    // ─── UI 빌드 ──────────────────────────────────────────────

    _buildUI() {
        this._ui = document.createElement('div');
        this._ui.id = 'game-hud';
        this._ui.innerHTML = `

            <!-- header: 뒤로가기 · 스테이지 정보 · 타이머 -->
            <header id="game-header">
                <button id="btn-back" aria-label="뒤로가기">←</button>
                <div id="header-title">
                    <span id="header-level">Stage ${String(this.stageId+1)}</span>
                    <span id="header-stage-name">${String(this.stageName)}</span>
                </div>
                <div id="hud-timer">00:00</div>
            </header>

            <!-- body: 전체 캔버스 영역 + 하단 오버레이 -->
            <div id="game-body">
                <div id="game-viewport"></div>

                <!-- 하단 중앙 오버레이 -->
                <div id="game-bottom">
                    <div id="panel-match-card">
                        <div id="panel-match-info">
                            <span id="panel-match-label">Match</span>
                        </div>
                        <div id="panel-match-divider"></div>
                        <div id="panel-match-dots">
                            <div class="match-dot"></div>
                            <div class="match-dot"></div>
                            <div class="match-dot"></div>
                            <div class="match-dot"></div>
                            <div class="match-dot"></div>
                        </div>
                    </div>
                    <button id="btn-hint">Hint</button>
                </div>
            </div>
        `;

        document.body.appendChild(this._ui);
        this._ui.style.opacity = '0';  // 인트로 중 HUD 숨김

        // 인트로 암전 오버레이 (CSS가 서서히 fade-out)
        this._introOverlay = document.createElement('div');
        this._introOverlay.id = 'game-intro-overlay';
        document.body.appendChild(this._introOverlay);

        document.getElementById('btn-back').addEventListener('click', () => {
            this._goToStageSelect();
        });
        document.getElementById('btn-hint').addEventListener('click', () => {
            this._useHint();
        });
    }

    // ─── HUD 갱신 ─────────────────────────────────────────────

    _updateHUD() {
        const m = String(Math.floor(this.timer / 60)).padStart(2, '0');
        const s = String(Math.floor(this.timer % 60)).padStart(2, '0');

        const timerEl = document.getElementById('hud-timer');
        const pctEl   = document.getElementById('panel-match-pct');

        if (timerEl) timerEl.textContent = `${m}:${s}`;

        const pct = Math.floor(this.matchRate * 100);
        if (pctEl) pctEl.textContent = `${pct}%`;

        // 1~4단계: 구간별 점등 / 5단계: 클리어 조건 달성 시에만 점등
        const activeSteps = this._clearTriggered ? 5 : pct >= 80 ? 4 : pct >= 60 ? 3 : pct >= 30 ? 2 : 1;
        document.querySelectorAll('.match-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i < activeSteps);
        });
    }

    _removeUI() {
        this._ui?.remove();
        this._introOverlay?.remove();
        this._introOverlay = null;
        this._clearOverlays?.forEach(el => el?.remove());
    }

    // ─── 씬 전환 ──────────────────────────────────────────────

    _goToStageSelect() {
        import('./StageSelectScene.js').then(({ default: StageSelectScene }) => {
            SceneManager.changeScene(new StageSelectScene(this.gl));
        });
    }

    // ─── 키보드 단축키 ────────────────────────────────────────

    _onKeyDown(e) {
        if (e.key === 'Escape') { this._goToStageSelect(); return; }
        if (this._introActive || this._clearTriggered) return;
        if (e.key === 'h') this._useHint();
        if (e.key === 'p') console.log('Current Rotation:', this.arcball.rotation);
    }
}
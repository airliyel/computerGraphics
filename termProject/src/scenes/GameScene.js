// src/scenes/GameScene.js
import BaseScene from './BaseScene.js';
import SceneManager from '../core/SceneManager.js';
import ClearScene from './ClearScene.js';
import Arcball from '../game/arcball.js';
import StageManager from '../core/StageManager.js';
import '../styles/GameScene.css';
import { mat3, mat4, vec3 } from 'gl-matrix';

import { ObjModel } from '../assets/objModel.js';
import { CircularPlane, RectPlane } from '../assets/common/circularPlane.js';
import shVertSource from '../shaders/shVert.glsl?raw';
import shFragSource from '../shaders/shFrag.glsl?raw';
import shLampVertSource from '../shaders/shLampVert.glsl?raw';
import shLampFragSource from '../shaders/shLampFrag.glsl?raw';
import shadowVertSource from '../shaders/shadowVert.glsl?raw';
import shadowFragSource from '../shaders/shadowFrag.glsl?raw';
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

        this.timer     = 0;      // 경과 시간 (초)
        this.hintCount = 0;      // 힌트 사용 횟수
        this.matchRate = 0;      // 그림자 일치율 0~1

        this._onKeyDown = this._onKeyDown.bind(this);
        this.arcball = new Arcball(this.gl.canvas, 5.0, { rotation: 1.2, zoom: 0.0 });

        this.wallX = -5.0;          // 왼쪽 벽의 X 위치
        this.lightPosition = vec3.fromValues(6.0, 3.0, 4.0);   // 오브젝트 오른쪽 앞에서 비춤
        this.viewPosition  = vec3.fromValues(1.5, 3, 4.5);   // 벽과 오브젝트를 함께 볼 수 있는 위치
    }

    async enter() {
        const stage = StageManager.getById(this.selectedStageId);

        if (!stage) {
            console.error(`Stage with ID ${this.selectedStageId} not found!`);
            SceneManager.changeScene(new ClearScene(this.gl, {
                stageId: this.selectedStageId,
                time: 0,
                hintCount: 0
            }));
            return;
        }

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

    // feat: level clear check
    update(deltaTime) {
        this.timer += deltaTime;

        const result = ShadowMatcher.checkClear(
            this.arcball.getRotationQuaternion(),
            this.targetRotation
        );

        this.matchRate = result.matchPercentage / 100.0;

        this._updateHUD();

        if (result.cleared) {
            this._stageClear(this.stageId);
        }
    }

    render() {
        const gl = this.gl;
        if (!this.cube || !this.wall || !this.objectShader || !this.shadowShader) return;

        gl.clearColor(0.94, 0.94, 0.94, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);

        const { view, projection } = this._getCameraMatrices();
        const cubeModel = this._getCubeModelMatrix();

        // 벽은 YZ 평면에 놓인 직사각형: X = wallX 위치에 수직으로 세움
        // RectPlane은 XZ 평면(법선 +Y) → rotateZ(-90°)하면 법선이 +X를 향함
        const wallModel = mat4.create();
        mat4.translate(wallModel, wallModel, [this.wallX, 0.0, 0.0]);
        mat4.rotateZ(wallModel, wallModel, -Math.PI / 2.0);

        // 1) 벽을 먼저 그림
        this._drawLitObject(this.wall, wallModel, view, projection, this.wallTexture);

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

        this._drawShadowObject(this.cube, shadowModel, view, projection);

        // 스텐실 상태 복구
        gl.stencilMask(0x00);
        gl.stencilFunc(gl.ALWAYS, 0, 0xff);

        gl.depthMask(true);
        gl.disable(gl.BLEND);

        // 3) 실제 cube object를 그림
        this._drawLitObject(this.cube, cubeModel, view, projection);

        // 4) 광원 위치 표시용 작은 cube를 그림
        const lampModel = mat4.create();
        mat4.translate(lampModel, lampModel, this.lightPosition);
        mat4.scale(lampModel, lampModel, [0.14, 0.14, 0.14]);
        this._drawLamp(lampModel, view, projection);
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

        this.cube = await ObjModel.load(gl, `./assets/stage1/1.obj`);

        // 벽: YZ 평면에 놓인 직사각형 (rotateY로 세움)
        this.wall = new RectPlane(gl, {
            halfW: 8.0,
            halfH: 7.0,
            color: [0.88, 0.84, 0.78, 1.0],
        });

        this.objectShader = new SimpleShader(gl, shVertSource, shFragSource);
        this.lampShader   = new SimpleShader(gl, shLampVertSource, shLampFragSource);
        this.shadowShader = new SimpleShader(gl, shadowVertSource, shadowFragSource);
        this.whiteTexture = this._createSingleColorTexture([255, 255, 255, 255]);
        this.wallTexture  = this._createSingleColorTexture([224, 215, 200, 255]);
    }

    _deleteSceneResources() {
        this.cube?.delete?.();
        this.wall?.delete?.();
        this.objectShader?.delete?.();
        this.lampShader?.delete?.();
        this.shadowShader?.delete?.();

        if (this.whiteTexture) this.gl.deleteTexture(this.whiteTexture);
        if (this.wallTexture)  this.gl.deleteTexture(this.wallTexture);

        this.cube = null;
        this.wall = null;
        this.objectShader = null;
        this.lampShader = null;
        this.shadowShader = null;
        this.whiteTexture = null;
        this.wallTexture = null;
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
            vec3.fromValues(-1.0, 0.5, 0.0),  // 오브젝트와 왼쪽 벽 사이를 바라봄
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
        shader.setVec3('light.ambient', [0.35, 0.35, 0.35]);
        shader.setVec3('light.diffuse', [0.82, 0.82, 0.82]);
        shader.setVec3('light.specular', [0.35, 0.35, 0.35]);
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

    _drawShadowObject(object, model, view, projection) {
        const shader = this.shadowShader;
        shader.use();
        shader.setMat4('u_model', model);
        shader.setMat4('u_view', view);
        shader.setMat4('u_projection', projection);
        shader.setVec4('u_shadowColor', [0.0, 0.0, 0.0, 0.38]);
        object.draw(shader);
    }

    _drawLamp(model, view, projection) {
        const shader = this.lampShader;
        shader.use();
        shader.setMat4('u_model', model);
        shader.setMat4('u_view', view);
        shader.setMat4('u_projection', projection);
        this.cube.draw(shader);
    }

    // ─── 클리어 ───────────────────────────────────────────────

    _stageClear(stageId) {
        SceneManager.changeScene(
            new ClearScene(this.gl, {
                stageId:   stageId,
                time:      this.timer,
                hintCount: this.hintCount,
            })
        );
    }

    // ─── 힌트 ─────────────────────────────────────────────────

    _useHint() {
        this.hintCount++;
        console.log(`Hint used!`);
        // TODO: 힌트 내용 UI 표시
    }

    // ─── UI 빌드 ──────────────────────────────────────────────

    _buildUI() {
        this._ui = document.createElement('div');
        this._ui.id = 'game-hud';
        this._ui.innerHTML = `

            <!-- header -->
            <header id="game-header">
                <button id="btn-back" aria-label="뒤로가기">←</button>
                <div id="header-title">
                    <span id="header-level">Stage ${String(this.stageId+1)}</span>
                    <span id="header-stage-name">${String(this.stageName)}</span>
                </div>
            </header>

            <!-- body -->
            <div id="game-body">

                <!-- WebGL 캔버스가 뒤에서 비치는 투명 영역 -->
                <div id="game-viewport">
                    <!-- TODO: 조명 컨트롤러(LightController) UI를 여기에 마운트 -->
                    <!-- TODO: 오브젝트 선택 오버레이(ObjectController) UI를 여기에 마운트 -->
                </div>

                <!-- right panel -->
                <aside id="game-panel">

                    <!-- target shadow -->
                    <div id="panel-target-card">
                        <span id="panel-target-label">Target Shadow</span>
                        <div id="panel-target-preview">
                            <!-- TODO: load target shadow image -->
                            <div class="shadow-placeholder"></div>
                        </div>
                    </div>

                    <!-- match gauge -->
                    <div id="panel-match-card">
                        <span id="panel-match-label">Match</span>
                        <div id="panel-match-bar-track">
                            <div id="panel-match-bar-fill" data-level="low"></div>
                        </div>
                    </div>

                    <!-- timer & hint -->
                    <div id="panel-actions">
                        <div id="hud-timer">00:00</div>
                        <button id="btn-hint">Hint</button>
                        <button id="btn-debug-clear">[Debug] Clear</button>
                    </div>

                </aside>
            </div>
        `;

        document.body.appendChild(this._ui);

        // 이벤트 바인딩
        document.getElementById('btn-back').addEventListener('click', () => {
            this._goToStageSelect();
        });
        document.getElementById('btn-hint').addEventListener('click', () => {
            this._useHint();
        });
        document.getElementById('btn-debug-clear').addEventListener('click', () => {
            this._stageClear(this.stageId);
        });
    }

    // ─── HUD 갱신 ─────────────────────────────────────────────

    _updateHUD() {
        const m = String(Math.floor(this.timer / 60)).padStart(2, '0');
        const s = String(Math.floor(this.timer % 60)).padStart(2, '0');

        const timerEl = document.getElementById('hud-timer');
        const fillEl  = document.getElementById('panel-match-bar-fill');

        if (timerEl) timerEl.textContent = `${m}:${s}`;

        if (fillEl) {
            const pct = Math.floor(this.matchRate * 100);
            fillEl.style.width = `${pct}%`;

            // 구간별 색상 (gameScene.css의 data-level 속성 활용)
            if      (pct >= 80) fillEl.dataset.level = 'high';
            else if (pct >= 40) fillEl.dataset.level = 'mid';
            else                fillEl.dataset.level = 'low';
        }
    }

    _removeUI() {
        this._ui?.remove();
    }

    // ─── 씬 전환 ──────────────────────────────────────────────

    _goToStageSelect() {
        import('./StageSelectScene.js').then(({ default: StageSelectScene }) => {
            SceneManager.changeScene(new StageSelectScene(this.gl));
        });
    }

    // ─── 키보드 단축키 ────────────────────────────────────────

    _onKeyDown(e) {
        if (e.key === 'h')      this._useHint();
        if (e.key === 'Escape') this._goToStageSelect();
        if (e.key === 'p') {
        console.log('Current Rotation:', this.arcball.rotation);
        }
    }
}
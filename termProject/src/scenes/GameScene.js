// src/scenes/GameScene.js
import BaseScene from './BaseScene.js';
import SceneManager from '../core/SceneManager.js';
import ClearScene from './ClearScene.js';
import Arcball from '../game/arcball.js';
import StageManager from '../core/StageManager.js';

export default class GameScene extends BaseScene {

    constructor(gl, stageId) {
        super(gl);

        this.selectedStageId = stageId;

        this.timer     = 0;      // 경과 시간 (초)
        this.hintCount = 0;      // 힌트 사용 횟수
        this.matchRate = 0;      // 그림자 일치율 0~1

        this._onKeyDown = this._onKeyDown.bind(this);
        this.arcball = new Arcball(this.gl.canvas);
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

        // CSS 로드 (중복 삽입 방지)
        if (!document.getElementById('game-scene-css')) {
            const link = document.createElement('link');
            link.id   = 'game-scene-css';
            link.rel  = 'stylesheet';
            link.href = './src/styles/gameScene.css';
            document.head.appendChild(link);
        }

        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);

        this._buildUI();
        window.addEventListener('keydown', this._onKeyDown);

        // TODO: 스테이지 데이터 로드, 셰이더 초기화, 오브젝트 배치
    }

    exit() {
        window.removeEventListener('keydown', this._onKeyDown);
        this._removeUI();
    }

    update(deltaTime) {
        this.timer += deltaTime;
        this._updateHUD();

        // this.matchRate = ShadowMatcher.check();
        if (this.matchRate >= 0.95) {
            this._stageClear(this.stageId);
        }
    }

    render() {
        const gl = this.gl;


        gl.clearColor(0.94, 0.94, 0.94, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // TODO: 오브젝트 드로우콜
        // TODO: 그림자 드로우콜
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
    }
}
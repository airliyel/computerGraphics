// Stage Select Scene
// show stage list and allow player to select a stage
// stage list is based on stageConfig.json

import BaseScene from './BaseScene.js';
import SceneManager from '../core/SceneManager.js';
import GameScene from './GameScene.js';
import StageManager from '../core/StageManager.js';

export default class StageSelectScene extends BaseScene {
    constructor(gl) {
        super(gl);

        this.stages = [];
        this.selectedStageId = 0;

        this._ui = null;

        this._onKeyDown = this._onKeyDown.bind(this);
    }

    async enter() {
        this.stages = StageManager.getAll();

        if (!this.stages || this.stages.length === 0) {
            console.error('No stages loaded.');
            return;
        }

        this._buildUI();

        window.addEventListener('keydown', this._onKeyDown);
    }

    exit() {
        window.removeEventListener('keydown', this._onKeyDown);

        this._removeUI();
    }

    update() {

    }

    render() {
        this.gl.clearColor(0.1, 0.1, 0.1, 1.0);
        this.gl.clear(
            this.gl.COLOR_BUFFER_BIT |
            this.gl.DEPTH_BUFFER_BIT
        );
    }

    // ─────────────────────────────────────────────────────────
    // UI
    // ─────────────────────────────────────────────────────────

    _buildUI() {
        // 중복 생성 방지
        this._removeUI();

        this._ui = document.createElement('div');
        this._ui.id = 'stage-select';

        this._ui.innerHTML = `
            <h2>Select Stage</h2>

            <div id="stage-list">
                ${this.stages.map((stage, index) => `
                    <button
                        class="stage-card"
                        data-index="${index}"
                    >
                        <strong>Stage ${index + 1}</strong>
                        <br>
                        ${stage.name ?? 'Untitled'}
                    </button>
                `).join('')}
            </div>

            <button id="btn-back">
                ← Back
            </button>
        `;

        document.body.appendChild(this._ui);

        const stageButtons =
            this._ui.querySelectorAll('.stage-card');

        stageButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = Number(btn.dataset.index);

                this._startStage(index);
            });
        });

        const backBtn =
            this._ui.querySelector('#btn-back');

        backBtn.addEventListener('click', async () => {
            const { default: MainMenuScene } =
                await import('./MainMenuScene.js');

            SceneManager.changeScene(
                new MainMenuScene(this.gl)
            );
        });
    }

    _removeUI() {
        if (this._ui) {
            this._ui.remove();
            this._ui = null;
        }
    }

    // ─────────────────────────────────────────────────────────
    // Stage Start
    // ─────────────────────────────────────────────────────────

    _startStage(stageIndex) {
        const stage = this.stages[stageIndex];

        if (!stage) {
            console.error('Invalid stage index:', stageIndex);
            return;
        }

        console.log('Starting Stage:', stage);

        SceneManager.changeScene(
            new GameScene(this.gl, stageIndex)
        );
    }

    // ─────────────────────────────────────────────────────────
    // Keyboard Shortcut
    // ─────────────────────────────────────────────────────────

    async _onKeyDown(e) {
        if (e.key === 'Escape') {
            const { default: MainMenuScene } =
                await import('./MainMenuScene.js');

            SceneManager.changeScene(
                new MainMenuScene(this.gl)
            );
        }
    }
}
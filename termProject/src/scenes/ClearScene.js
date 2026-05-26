// src/scenes/ClearScene.js
import BaseScene from './BaseScene.js';
import SceneManager from '../core/SceneManager.js';
import ScoreCalculate from '../game/ScoreCalculate.js';
import StageManager from '../core/StageManager.js';
import StorageManager from '../core/StorageManager.js';

export default class ClearScene extends BaseScene {
    /**
     * @param {WebGL2RenderingContext} gl
     * @param {{ stageId: number, time: number, hintCount: number }} result
     */
    constructor(gl, result) {
        super(gl);
        this.result = result;
        this.stars  = 0;           // 별점 1~3
    }

    async enter() {
        this.stars = await this._calcStars();
        StorageManager.saveResult(this.result.stageId, {score: this.result.time, stars: this.stars});
        this._buildUI();
    }

    exit() {
        this._removeUI();
    }

    update() {}

    render() {
        this.gl.clearColor(0.05, 0.05, 0.05, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    // ─── 별점 계산 ────────────────────────────────────────────

    async _calcStars() {
        const s = new ScoreCalculate(this.result.stageId);
        await s.init();
        return await s.calculate(this.result.time, this.result.hintCount);
    }

    // ─── UI ───────────────────────────────────────────────────

    _padTime(time) {
        const m = String(Math.floor(time / 60)).padStart(2, '0');
        const s = String(Math.floor(time % 60)).padStart(2, '0');
        return `${m}:${s}`;
    }

    _buildUI() {
        const { time, stageId } = this.result;

        const clearTime = this._padTime(time);
        const starStr = '★'.repeat(this.stars) + '☆'.repeat(3 - this.stars);
        const highscoreTime = this._padTime(StorageManager.getResult(stageId).bestScore);

        this._ui = document.createElement('div');
        this._ui.id = 'clear-scene';
        this._ui.innerHTML = `
            <h2>Stage Clear!</h2>
            <p>Stage: ${stageId + 1}</p>
            <div id="clear-stars">${starStr}</div>
            <p>highscore: ${highscoreTime}</p>
            <p>Time: ${clearTime}</p>
            <button id="btn-next">Next Stage</button>
            <button id="btn-retry">Retry</button>
            <button id="btn-menu">Menu</button>
        `;
        document.body.appendChild(this._ui);

        document.getElementById('btn-next').addEventListener('click', () => {
            import('./GameScene.js').then(({ default: GameScene }) => {
                SceneManager.changeScene(new GameScene(this.gl, stageId + 1));
            });
        });
        if (stageId >= StageManager.getTotalCount() - 1) {  // TODO: 다음 스테이지 구현 후 조건 수정
            document.getElementById('btn-next').style.display = 'none';  // TODO: 다음 스테이지 구현 후 활성화
        }
        document.getElementById('btn-retry').addEventListener('click', () => {
            import('./GameScene.js').then(({ default: GameScene }) => {
                SceneManager.changeScene(new GameScene(this.gl, stageId));
            });
        });
        document.getElementById('btn-menu').addEventListener('click', () => {
            import('./StageSelectScene.js').then(({ default: StageSelectScene }) => {
                SceneManager.changeScene(new StageSelectScene(this.gl));
            });
        });
    }

    _removeUI() {
        this._ui?.remove();
    }
}
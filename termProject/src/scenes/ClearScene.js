// src/scenes/ClearScene.js
import BaseScene from './BaseScene.js';
import SceneManager from '../core/SceneManager.js';
import ScoreCalculate from '../game/ScoreCalaulate.js';
import StageManager from '../core/StageManager.js';

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

    enter() {
        this.stars = this._calcStars();
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

    _calcStars() {
        // TODO: ScoreCalculate.js로 위임 예정
        return ScoreCalculate.calculate(this.result.time, this.result.hintCount);
    }

    // ─── UI ───────────────────────────────────────────────────

    _buildUI() {
        const { time, stageId } = this.result;
        const m = String(Math.floor(time / 60)).padStart(2, '0');
        const s = String(Math.floor(time % 60)).padStart(2, '0');
        const starStr = '★'.repeat(this.stars) + '☆'.repeat(3 - this.stars);

        this._ui = document.createElement('div');
        this._ui.id = 'clear-scene';
        this._ui.innerHTML = `
            <h2>Stage Clear!</h2>
            <p>Stage: ${stageId + 1}</p>
            <div id="clear-stars">${starStr}</div>
            <p>highscore: ${m}:${s}</p> <!-- todo: 스테이지별 최고 기록 표시 -->
            <p>Time: ${m}:${s}</p>
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
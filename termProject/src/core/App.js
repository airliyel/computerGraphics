// src/core/App.js
import SceneManager from './SceneManager.js';
import MainMenuScene from '../scenes/MainMenuScene.js';
import StageManager from './StageManager.js';

export default class App {
    constructor() {
        this.canvas    = null;
        this.gl        = null;
        this._lastTime = null;   // 직전 프레임 타임스탬프 (ms)
    }

    async initialize() {
        await StageManager.load();

        this.canvas = document.getElementById('gameCanvas');
        this.gl = this.canvas.getContext('webgl2');

        if (!this.gl) {
            alert('WebGL2 not supported');
            return;
        }

        this.resize();

        window.addEventListener('resize', () => {
            this.resize();
        });

        SceneManager.changeScene(
            new MainMenuScene(this.gl)
        );
    }

    resize() {
        this.canvas.width  = window.innerWidth;
        this.canvas.height = window.innerHeight;

        if (this.gl) {
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    run() {
        const loop = (timestamp) => {
            // 첫 프레임은 deltaTime 0으로 시작
            if (this._lastTime === null) {
                this._lastTime = timestamp;
            }

            // deltaTime : 초 단위 (ex. 60fps → 약 0.0167)
            const deltaTime = (timestamp - this._lastTime) / 1000;
            this._lastTime  = timestamp;

            SceneManager.update(deltaTime);
            SceneManager.render();

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }
}
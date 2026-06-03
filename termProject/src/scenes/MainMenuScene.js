// src/scenes/MainMenuScene.js
import BaseScene from './BaseScene.js';
import SceneManager from '../core/SceneManager.js';
import StageSelectScene from './StageSelectScene.js';
import GameScene from './GameScene.js';
import StorageManager from '../core/StorageManager.js';
import '../styles/MainMenuScene.css';

export default class MainMenuScene extends BaseScene {
    constructor(gl) {
        super(gl);
        this._onKeyDown = this._onKeyDown.bind(this);
    }

    enter() {
        this._buildUI();
        window.addEventListener('keydown', this._onKeyDown);
    }

    exit() {
        window.removeEventListener('keydown', this._onKeyDown);
        this._removeUI();
    }

    update() {}

    render() {
        this.gl.clearColor(0.05, 0.04, 0.04, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    // ─── UI ───────────────────────────────────────────────────
    _buildUI() {
        this._ui = document.createElement('div');
        this._ui.id = 'main-menu';
        this._ui.innerHTML = `
            <h1 id="menu-title">Shadow<br>Match</h1>
            <p id="menu-tagline">Shadow Puzzle Game</p>
            <div id="menu-buttons">
                <button id="btn-start" class="btn-primary">New Game</button>
                <button id="btn-stage" class="btn-secondary">Select Stage</button>
            </div>
            <div id="menu-line"></div>
        `;
        document.body.appendChild(this._ui);

        document.getElementById('btn-start').addEventListener('click', () => {
            StorageManager.reset();
            SceneManager.changeScene(new GameScene(this.gl, 0));
        });
        document.getElementById('btn-stage').addEventListener('click', () => {
            SceneManager.changeScene(new StageSelectScene(this.gl));
        });
    }

    _removeUI() {
        this._ui?.remove();
    }

    // ─── 키보드 단축키 ────────────────────────────────────────
    _onKeyDown(e) {
        if (e.key === 'Enter') {
            SceneManager.changeScene(new StageSelectScene(this.gl));
        }
    }
}

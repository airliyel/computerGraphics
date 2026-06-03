// src/scenes/StageSelectScene.js
import BaseScene from './BaseScene.js';
import SceneManager from '../core/SceneManager.js';
import GameScene from './GameScene.js';
import StageManager from '../core/StageManager.js';
import StorageManager from '../core/StorageManager.js';
import { PreviewRenderer } from './PreviewRenderer.js';
import '../styles/StageSelectScene.css';

export default class StageSelectScene extends BaseScene {
    constructor(gl) {
        super(gl);
        this.stages       = [];
        this.currentIndex = 0;
        this._ui          = null;
        /** @type {Map<number, PreviewRenderer>} */
        this._previews    = new Map();
        this._onKeyDown   = this._onKeyDown.bind(this);
    }

    async enter() {
        this.stages = StageManager.getAll();
        if (!this.stages || this.stages.length === 0) {
            console.error('No stages loaded.');
            return;
        }
        this._buildUI();
        await this._initPreviews();
        window.addEventListener('keydown', this._onKeyDown);
    }

    exit() {
        window.removeEventListener('keydown', this._onKeyDown);
        this._destroyPreviews();
        this._removeUI();
    }

    // 매 프레임: 보이는 카드의 preview만 렌더
    update(deltaTime) {
        if (!this._ui || this._previews.size === 0) return;

        const visible = new Set([
            this.currentIndex - 1,
            this.currentIndex,
            this.currentIndex + 1,
        ].filter(i => i >= 0 && i < this.stages.length));

        for (const [idx, renderer] of this._previews) {
            if (!visible.has(idx)) continue;
            const isCurrent = idx === this.currentIndex;
            const isLocked  = !StorageManager.isUnlocked(idx);
            renderer.render(deltaTime, {
                brightness: isCurrent ? 1.0 : (isLocked ? 0.35 : 0.52),
                rotSpeed:   isCurrent ? 0.42 : 0.22,
            });
        }
    }

    render() {
        this.gl.clearColor(0.13, 0.12, 0.12, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    // ─── UI Build ─────────────────────────────────────────────

    _buildUI() {
        this._removeUI();
        this._ui = document.createElement('div');
        this._ui.id = 'stage-select';

        this._ui.innerHTML = `
            <header id="ss-header">
                <button id="ss-back" aria-label="뒤로가기">
                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                        <path d="M19 9H1M1 9L9 1M1 9L9 17"
                              stroke="currentColor" stroke-width="2.4"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <h1 id="ss-title">Stages</h1>
            </header>

            <div id="ss-carousel-area">
                <button id="ss-prev" class="ss-nav" aria-label="이전">
                    <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
                        <path d="M11 1L1 11L11 21"
                              stroke="currentColor" stroke-width="2.4"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <div id="ss-track">
                    ${this.stages.map((s, i) => this._cardHTML(s, i)).join('')}
                </div>

                <button id="ss-next" class="ss-nav" aria-label="다음">
                    <svg width="12" height="22" viewBox="0 0 12 22" fill="none">
                        <path d="M1 1L11 11L1 21"
                              stroke="currentColor" stroke-width="2.4"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(this._ui);
        this._updateCarousel(false);
        this._bindEvents();
    }

    _cardHTML(stage, index) {
        const unlocked = StorageManager.isUnlocked(index);
        const result   = StorageManager.getResult(index);
        const stars    = result.bestStars || 0;
        const hasBest  = result.bestScore < 99 * 60 + 59;
        const bestStr  = hasBest ? `Best · ${this._fmt(result.bestScore)}` : '---';
        const num      = String(index + 1).padStart(2, '0');

        const starsHTML = [1, 2, 3]
            .map(i => `<span class="card-star${stars >= i ? ' filled' : ''}">★</span>`)
            .join('');

        return `
            <div class="stage-card${unlocked ? '' : ' locked'}" data-index="${index}">
                <div class="card-circle">
                    ${unlocked ? `<div class="card-top">
                        <span class="card-number">${num}</span>
                        <span class="card-name">${stage.name || 'Stage ' + (index + 1)}</span>
                    </div>` : ''}

                    <canvas class="preview-canvas" data-index="${index}"
                            width="240" height="240"
                            style="pointer-events:none;width:240px;height:240px"></canvas>

                    ${unlocked
                        ? `<div class="card-stars">${starsHTML}</div>`
                        : `<div class="lock-overlay">
                               <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
                                   <rect x="4" y="22" width="36" height="28" rx="5"
                                         fill="currentColor" opacity="0.8"/>
                                   <path d="M11 22V16C11 9.373 15.925 4 22 4C28.075 4 33 9.373 33 16V22"
                                         stroke="currentColor" stroke-width="4"
                                         stroke-linecap="round" fill="none" opacity="0.8"/>
                                   <circle cx="22" cy="36" r="3.5" fill="#201f1f"/>
                               </svg>
                           </div>`
                    }
                </div>
                <p class="card-score${unlocked ? '' : ' locked-text'}">${unlocked ? bestStr : 'Locked'}</p>
            </div>
        `;
    }

    // ─── Preview 초기화 ───────────────────────────────────────

    async _initPreviews() {
        const canvases = this._ui.querySelectorAll('.preview-canvas');
        const loadJobs = [];

        canvases.forEach(canvas => {
            const idx   = Number(canvas.dataset.index);
            const stage = this.stages[idx];
            if (!stage?.modelPath) return;

            const renderer = new PreviewRenderer(canvas);
            this._previews.set(idx, renderer);
            loadJobs.push(renderer.loadModel(stage.modelPath));
        });

        // 모두 병렬 로드 (에러 무시 — 로드 실패 시 그냥 빈 캔버스)
        await Promise.allSettled(loadJobs);
    }

    _destroyPreviews() {
        for (const renderer of this._previews.values()) {
            renderer.destroy();
        }
        this._previews.clear();
    }

    // ─── 캐러셀 ──────────────────────────────────────────────

    _bindEvents() {
        document.getElementById('ss-back').addEventListener('click', async () => {
            const { default: M } = await import('./MainMenuScene.js');
            SceneManager.changeScene(new M(this.gl));
        });

        document.getElementById('ss-prev').addEventListener('click', () => {
            if (this.currentIndex > 0) { this.currentIndex--; this._updateCarousel(true); }
        });

        document.getElementById('ss-next').addEventListener('click', () => {
            if (this.currentIndex < this.stages.length - 1) {
                this.currentIndex++;
                this._updateCarousel(true);
            }
        });

        this._ui.querySelectorAll('.stage-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = Number(card.dataset.index);
                if (idx !== this.currentIndex) {
                    this.currentIndex = idx;
                    this._updateCarousel(true);
                } else if (StorageManager.isUnlocked(idx)) {
                    this._startStage(idx);
                }
            });
        });
    }

    _updateCarousel(animate) {
        const cards   = this._ui.querySelectorAll('.stage-card');
        const classes = ['far-left', 'left', 'current', 'right', 'far-right'];

        if (!animate) cards.forEach(c => c.classList.add('no-transition'));

        cards.forEach((card, i) => {
            card.classList.remove(...classes);
            const d = i - this.currentIndex;
            if      (d < -1) card.classList.add('far-left');
            else if (d === -1) card.classList.add('left');
            else if (d === 0) card.classList.add('current');
            else if (d === 1) card.classList.add('right');
            else              card.classList.add('far-right');
        });

        if (!animate) {
            requestAnimationFrame(() => cards.forEach(c => c.classList.remove('no-transition')));
        }

        const prev = this._ui.querySelector('#ss-prev');
        const next = this._ui.querySelector('#ss-next');
        if (prev) prev.disabled = this.currentIndex === 0;
        if (next) next.disabled = this.currentIndex === this.stages.length - 1;
    }

    _removeUI() {
        if (this._ui) { this._ui.remove(); this._ui = null; }
    }

    // ─── 스테이지 시작 ───────────────────────────────────────

    _startStage(index) {
        SceneManager.changeScene(new GameScene(this.gl, index));
    }

    // ─── 헬퍼 ────────────────────────────────────────────────

    _fmt(t) {
        return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
    }

    async _onKeyDown(e) {
        if (e.key === 'ArrowLeft' && this.currentIndex > 0) {
            this.currentIndex--; this._updateCarousel(true);
        } else if (e.key === 'ArrowRight' && this.currentIndex < this.stages.length - 1) {
            this.currentIndex++; this._updateCarousel(true);
        } else if (e.key === 'Enter') {
            if (StorageManager.isUnlocked(this.currentIndex)) this._startStage(this.currentIndex);
        } else if (e.key === 'Escape') {
            const { default: M } = await import('./MainMenuScene.js');
            SceneManager.changeScene(new M(this.gl));
        }
    }
}

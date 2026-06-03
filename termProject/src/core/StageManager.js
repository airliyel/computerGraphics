import stages from '../data/stageConfig.json';
import MODEL_URLS from '../assets/models.js';

const StageManager = {

    /** @type {Array} 로드된 전체 스테이지 배열 */
    _stages: stages.map(s => ({ ...s, modelPath: MODEL_URLS[s.id] })),

    // App.initialize() 에서 await StageManager.load() 호출을 유지하기 위한 no-op
    async load() {},

    getAll() {
        return this._stages;
    },

    getById(stageId) {
        return this._stages.find(stage => stage.id === stageId) || null;
    },

    getTotalCount() {
        return this._stages.length;
    },
};

export default StageManager;

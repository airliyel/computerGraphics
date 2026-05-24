async function loadStageConfig() {
    try {
        const response = await fetch('/public/data/stageConfig.json');
        const stageData = await response.json();
        return stageData;
    } catch (error) {
        console.error('Error loading stage config:', error);
        return [];
    }
}

const StageManager = {

    /** @type {Array} 로드된 전체 스테이지 배열 */
    _stages: [],

    async load() {
        this._stages = await loadStageConfig();
    },

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
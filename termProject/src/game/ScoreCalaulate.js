// Score Calculation system
// calculate score based on time taken to clear the stage and number of hints used
// 1. time score : based on time taken to clear the stage, the faster the better
// 2. [optimal] hint score : once hint is used, score is reduced by a certain percentage of the total score

import StorageManager from '../core/StorageManager.js';

const ScoreCalculate = {
    constructor(stageId) {
        this.selectedStageId = stageId;
        this.threestarTime = 0;
    },
    
    async init() {
        const stage = StageManager.getById(this.selectedStageId);
        if (!stage) {
            console.error(`Stage with ID ${this.selectedStageId} not found!`);
            return;
        }
        this.threestarTime = stage.threestartime ?? 60;
    },
    
    calculate(time, hintCount) {
        // 플레이 타임과 힌트 사용 여부에 따라 점수가 결정됩니다
        // stageConfig에서 각 스테이지의 threeStarTime을 참조하여 별점 기준을 설정할 수 있습니다
        // hint 사용 시 기본적으로 별 1개 감점하도록 구현하되, 필요에 따라 감점 방식을 조정할 수 있습니다
        // 반환 값은 1~3 사이의 별점으로, 3이 가장 높은 점수입니다.
        return 1;
    }
};

export default ScoreCalculate;
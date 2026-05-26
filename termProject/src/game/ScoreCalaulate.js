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

    // 소요 시간과 힌트 사용 개수를 이용해 별점 계산
    // public/data/stageConfig.json에서 threeStarTime 설정
    calculate(time, hintCount, leniency = 0) {
        // threestarTime 60초인 경우,
        // 첫 번째 힌트 사용 시 60초 추가, 두 번째 45초, 세 번째 33.75초
        const hintPenaltyDecay = 0.75;
        const hintPenalty = this.threeStarTime / (1 - hintPenaltyDecay)
            * (1 - (hintPenaltyDecay ** hintCount));
        time += hintPenalty;

        // leniency: 별 2개 조건만을 완화합니다. 기본값은 0
        const twoStarTime = this.threeStarTime * 2 * (1 + leniency);

        // 별 개수 (최소 1, 최대 3)
        return 1 + (time < this.threeStarTime) + (time < twoStarTime);
    }
};

export default ScoreCalculate;
// 호출 흐름:
//   ClearScene.enter()
//     └─ StorageManager.saveResult(stageId, { score, stars })
//     └─ StorageManager.unlockNext(stageId)
//
//   StageSelectScene._buildUI()
//     └─ StorageManager.isUnlocked(stageId)  ← 버튼 잠금 표시
//     └─ StorageManager.getResult(stageId)   ← 별점 표시
//
// localStorage 저장 구조 (참고):
// {
//   "stages": {
//     "1": { cleared: true, bestScore: 920, bestStars: 3 },
//     "2": { cleared: false, bestScore: 0,  bestStars: 0 }
//   }
// }
//
// _load, _save는 내부 전용이므로 다른 곳에서 직접 호출하지 마세요.

// localStorage에 클리어 기록을 저장하는 키
const STORAGE_KEY = 'shadowMatch_save';

// 기록이 없을 때 스테이지 기록을 초기화할 기본값
const NEW_SAVE = { cleared: false, bestScore: 0, bestStars: 0 };

const StorageManager = {

    _load() {
        // localStorage에서 기록 문자열을 불러와 오브젝트로 반환합니다.
        // 문자열이 없거나 불러올 수 없을 때 stages가 빈 오브젝트를 반환합니다.
        try {
            const s = window.localStorage.getItem(STORAGE_KEY);
            if (s !== null)
                return JSON.parse(s);
        } catch (e) {
            console.error(e);
        }
        return { stages: {} };
    },

    _save(data) {
        // data 오브젝트를 받아 localStorage에 저장합니다.
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    saveResult(stageId, { score, stars }) {
        // ClearScene에서 클리어 직후 호출합니다.
        // 기존 기록이 있으면 score, stars 갱신하고, 없으면 생성합니다.
        let stageData = _load().stages;
        if (!(stageId in stageData)) {
            stageData[stageId] = { cleared: true, bestScore: score, bestStars: stars };
            return;
        }
        stageData[stageId].bestScore = Math.max(stageData[stageId].bestScore, score);
        stageData[stageId].bestStars = Math.max(stageData[stageId].bestStars, stars);
    },

    getResult(stageId) {
        // 특정 스테이지의 저장 기록을 반환합니다. 
        // StageSelectScene에서 별점 표시할 때 씁니다. 
        // 기록이 없으면 { cleared: false, bestScore: 0, bestStars: 0 } 반환합니다.
        return _load().stages[stageId] ?? NEW_SAVE;
    },

    unlockNext(stageId) {
        // ClearScene에서 saveResult() 직후에 호출합니다.
        // stageId + 1번 스테이지 항목이 없을 경우에만 새 기록을 생성합니다.
        let stageData = _load().stages;
        if (!(stageId + 1 in stageData)) {
            stageData[stageId + 1] = NEW_SAVE;
        }
    },

    isUnlocked(stageId) {
        // StageSelectScene에서 버튼 활성화 여부를 결정할 때 씁니다.(스테이지 잠금 처리)
        // 첫 스테이지이거나, 이전 스테이지가 클리어되었을 때 true
        return stageId === 1 || getResult(stageId - 1).cleared;
    },

    reset() {
        // localStorage에서 shadowMatch_save 키를 삭제합니다. 
        // 메인 화면에서 New Start 버튼에 연결할 함수입니다. 
        // 확인 다이얼로그는 UI 쪽에서 처리하면 되고 이 함수는 삭제만 하면 됩니다.
        window.localstorage.removeItem(STORAGE_KEY);
    },
};

export default StorageManager;
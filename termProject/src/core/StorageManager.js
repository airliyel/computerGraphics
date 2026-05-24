// storage Manager.js
// save stage clear results to localStorage and retrieve them for display in StageSelectScene

// ┌─────────────────────────────────────────────────────────────────┐
// │                                                        │
// │                                                                 │
// │  이 파일은 스테이지 클리어 기록을 localStorage에 저장하고       │
// │  꺼내는 역할을 합니다.                                          │
// │                                                                 │
// │  호출 흐름:                                                     │
// │    ClearScene.enter()                                           │
// │      └─ StorageManager.saveResult(stageId, { score, stars })   │
// │      └─ StorageManager.unlockNext(stageId)                     │
// │                                                                 │
// │    StageSelectScene._buildUI()                                  │
// │      └─ StorageManager.isUnlocked(stageId)  ← 버튼 잠금 표시  │
// │      └─ StorageManager.getResult(stageId)   ← 별점 표시        │
// │                                                                 │
// │  localStorage 저장 구조 (참고):                                  │
// │  {                                                              │
// │    "stages": {                                                  │
// │      "1": { cleared: true, bestScore: 920, bestStars: 3 },     │
// │      "2": { cleared: false, bestScore: 0,  bestStars: 0 }      │
// │    }                                                            │
// │  }                                                              │
// └─────────────────────────────────────────────────────────────────┘

// 저장 키는 'shadowMatch_save'로 고정합니다. 필요 시 변경 가능합니다.
const STORAGE_KEY = 'shadowMatch_save';

const StorageManager = {

    _load() {
        // localStorage에서 shadowMatch_save 키로 저장된 문자열을 읽어 JSON.parse해서 반환합니다. 
        // 저장된 게 없거나 파싱 실패 시엔 { stages: {} }를 반환합니다. 
        // try/catch 필수입니다. 내부 전용이라 다른 곳에서 직접 호출하지 마세요.
        return { stages: {} };
    },

    _save(data) {
        // data 객체를 JSON.stringify해서 localStorage의 shadowMatch_save 키에 저장합니다. 
        // 내부 전용입니다. 다른 곳에서 직접 호출하지 마세요.
    },

    saveResult(stageId, { score, stars }) {
        // ClearScene에서 클리어 직후 호출합니다. 
        // 기존 기록보다 score, stars가 높을 때만 갱신합니다. 
        // 처음 저장이면 { cleared: true, bestScore: score, bestStars: stars }로 생성하면 됩니다.
    },

    getResult(stageId) {
        // 특정 스테이지의 저장 기록을 반환합니다. 
        // StageSelectScene에서 별점 표시할 때 씁니다. 
        // 기록이 없으면 { cleared: false, bestScore: 0, bestStars: 0 } 반환합니다.
        return { cleared: false, bestScore: 0, bestStars: 0 };
    },

    unlockNext(stageId) {
        // ClearScene에서 saveResult() 직후에 호출합니다. 
        // stageId + 1번 스테이지 항목이 없으면 { cleared: false, bestScore: 0, bestStars: 0 }으로 새로 만들어줍니다. 
        // 이미 기록이 있으면 덮어쓰지 않습니다.
    },

    isUnlocked(stageId) {
        // StageSelectScene에서 버튼 활성화 여부를 결정할 때 씁니다.(스테이지 잠금 처리)
        // stageId가 1이면 무조건 true, 
        // 나머지는 getResult(stageId - 1).cleared가 true일 때만 true입니다.
        return false;
    },

    reset() {
        // localStorage에서 shadowMatch_save 키를 삭제합니다. 
        // 메인 화면에서 New Start 버튼에 연결할 함수입니다. 
        // 확인 다이얼로그는 UI 쪽에서 처리하면 되고 이 함수는 삭제만 하면 됩니다.
    },
};

export default StorageManager;
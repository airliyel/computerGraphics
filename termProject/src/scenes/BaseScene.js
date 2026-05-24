// Scene Interface
export default class BaseScene {

    /**
     * @param {WebGL2RenderingContext} gl
     */
    constructor(gl) {
        this.gl = gl;
    }

    // ─── SceneManager가 호출하는 생명주기 메서드 ───────────────

    /** 씬이 활성화될 때 한 번 호출 — 리소스 초기화, 이벤트 등록 */
    enter() {}

    /** 씬이 비활성화될 때 한 번 호출 — 이벤트 해제, 상태 저장 */
    exit() {}

    /** App의 게임루프에서 매 프레임 호출 — 로직 업데이트 */
    update() {}

    /** App의 게임루프에서 매 프레임 호출 — WebGL 드로우콜 */
    render() {}
}
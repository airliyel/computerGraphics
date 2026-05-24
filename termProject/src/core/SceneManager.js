class SceneManager {
    constructor() {
        this.currentScene = null;
    }

    changeScene(scene) {
        if (this.currentScene) {
            this.currentScene.exit();
        }

        this.currentScene = scene;

        if (this.currentScene) {
            this.currentScene.enter();
        }
    }

    update(deltaTime) {
        if (this.currentScene) {
            this.currentScene.update(deltaTime);
        }
    }

    render() {
        if (this.currentScene) {
            this.currentScene.render();
        }
    }
}

export default new SceneManager();
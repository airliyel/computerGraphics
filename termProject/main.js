import App from './src/core/App.js';

window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
    app.run();
});
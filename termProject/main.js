import App from './src/core/App.js';
import './src/styles/style.css';

window.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
    app.run();
});
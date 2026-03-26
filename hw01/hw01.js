// Global constants
const canvas = document.getElementById('glCanvas'); // Get the canvas element 
const gl = canvas.getContext('webgl2'); // Get the WebGL2 context

if (!gl) {
    console.error('WebGL 2 is not supported by your browser.');
}

// Set canvas size: 현재 window 전체를 canvas로 사용
// Initialize canvas size: 500 x 500
canvas.width = 500;
canvas.height = 500;

gl.enable(gl.SCISSOR_TEST);

function drawRect(x, y, width, height, color) {
    gl.scissor(x, y, width, height);
    gl.clearColor(...color);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

drawRect(250, 250, 250, 250, [1, 0, 0, 1]);
drawRect(250, 0, 250, 250, [1, 1, 0, 1]);
drawRect(0, 0, 250, 250, [0, 0, 1, 1]);
drawRect(0, 250, 250, 250, [0, 1, 0, 1]);


// Start rendering
render();

// Render loop
function render() {
    const size = canvas.height/2;
    drawRect(size, size, size, size, [1, 0, 0, 1]);
    drawRect(size, 0, size, size, [1, 1, 0, 1]);
    drawRect(0, 0, size, size, [0, 0, 1, 1]);
    drawRect(0, size, size, size, [0, 1, 0, 1]);
    
}

// Resize viewport when window size changes
window.addEventListener('resize', () => {
    // When window resized, resize canvas with 1:1 ratio
    var y = window.innerHeight;
    var x = window.innerWidth;

    // Set window Size to smaller window height or width
    var windowdSize = (y > x) ? x : y;
    canvas.width = windowdSize;
    canvas.height = windowdSize;
    gl.viewport(0, 0, canvas.width, canvas.height);
    render();
});

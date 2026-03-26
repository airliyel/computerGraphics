// Get the canvas and WebGL 2 context
const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl2');

if (!gl) {
    console.error('WebGL 2 is not supported by your browser.');
}

// Set canvas size (using current browser's size)
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;
canvas.width = 600;
canvas.height = 600;

// Resize viewport when window size changes (without keeping the aspect ratio)
// window.addEventListener('resize', () => {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     gl.viewport(0, 0, canvas.width, canvas.height);
//     render();
// });

var UpRightX = 0.1;
var UpRightY = 0.1;

window.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowRight') {
        if (UpRightX < 1.0) {
        UpRightX += 0.01;
        }
    }
    if (event.key == 'ArrowLeft') {
        if (UpRightX > -0.8) {
        UpRightX -= 0.01;
        }
    }
    if (event.key == 'ArrowUp') {
        if (UpRightY < 1.0) {
        UpRightY += 0.01;
        }
    }
    if (event.key == 'ArrowDown') {
        if (UpRightY > -0.8) {
        UpRightY -= 0.01;
        }
    }

    vertices = new Float32Array([
        UpRightX, UpRightY, 0.0,
        UpRightX -0.2, UpRightY, 0.0,
        UpRightX -0.2, UpRightY-0.2, 0.0
    ]);
    
    vertices2 = new Float32Array([
        UpRightX, UpRightY, 0.0,
        UpRightX, UpRightY -0.2, 0.0,
        UpRightX -0.2, UpRightY-0.2, 0.0
    ]);
    
    combined = new Float32Array([
        ...vertices,
        ...vertices2
    ]);
    delete vertices;
    delete vertices2;
    render(combined);
    delete combined
})

// Initialize WebGL settings
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.1, 0.1, 0.1, 1.0);

// Vertex shader source
const vertexShaderSource = `#version 300 es
layout(location = 0) in vec3 aPos;
void main() {
    gl_Position = vec4(aPos, 1.0); // Set vertex position
}`;

// Fragment shader source
const fragmentShaderSource = `#version 300 es
precision mediump float;
out vec4 FragColor;
void main() {
    FragColor = vec4(1.0, 0.5, 0.2, 1.0); // Orange color
}`;

// Function to compile shader
function compileShader(gl, source, type) {

    // Create shader object
    const shader = gl.createShader(type);

    // Set shader source code
    gl.shaderSource(shader, source);

    // Compile shader
    gl.compileShader(shader);

    // Check if the shader compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

// Function to create shader program
function createProgram(gl, vertexShaderSource, fragmentShaderSource) {

    // Compile vertex and fragment shaders
    const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    // Create shader program (template)
    const shaderProgram = gl.createProgram();

    // Attach shaders to the program
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // Link the shaders and program to complete the shader program
    gl.linkProgram(shaderProgram);

    // Check if the program linked successfully
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error('Error linking program:', gl.getProgramInfoLog(shaderProgram));
        gl.deleteProgram(shaderProgram);
        return null;
    }
    return shaderProgram;
}

// Create shader programs
const shaderProgram = createProgram(gl, vertexShaderSource, fragmentShaderSource);

// Triangle vertex coordinates 
var vertices = new Float32Array([
    UpRightX, UpRightY, 0.0,
    UpRightX -0.2, UpRightY, 0.0,
    UpRightX -0.2, UpRightY-0.2, 0.0
]);

var vertices2 = new Float32Array([
    UpRightX, UpRightY, 0.0,
    UpRightX, UpRightY -0.2, 0.0,
    UpRightX -0.2, UpRightY-0.2, 0.0
]);

var combined = new Float32Array([
    ...vertices,
    ...vertices2
]);

// Create Vertex Array Object (VAO)
var vao = gl.createVertexArray();
gl.bindVertexArray(vao);

// Create Vertex Buffer and bind data
var vertexBuffer = gl.createBuffer();

// Designate the target vertex buffer (to bind)
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// Feed the vertex coordinates to the vertex buffer
gl.bufferData(gl.ARRAY_BUFFER, combined, gl.STATIC_DRAW);

// Link vertex data to shader program variables
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(0);

// Use shader program 
gl.useProgram(shaderProgram);

// Render loop
function render(a) {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Bind VAO and draw
    gl.bindVertexArray(vao);
    gl.bufferData(gl.ARRAY_BUFFER, a, gl.STATIC_DRAW);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    // Request next frame
    //requestAnimationFrame(render);
}

// Start rendering
render(combined);

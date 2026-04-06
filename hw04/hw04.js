import { resizeAspectRatio, Axes } from '../util/util.js';
import { Shader, readShaderFile } from '../util/shader.js';

let isInitialized = false;
const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl2');

let shader;
let vaoRect;
let axes;
let startTime = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (isInitialized) {
        console.log("Already initialized");
        return;
    }

    main().then(success => {
        if (!success) {
            console.log('프로그램을 종료합니다.');
            return;
        }
        isInitialized = true;
        requestAnimationFrame(animate);
    }).catch(error => {
        console.error('프로그램 실행 중 오류 발생:', error);
    });
});

function initWebGL() {
    if (!gl) {
        console.error('WebGL 2 is not supported by your browser.');
        return false;
    }

    canvas.width = 700;
    canvas.height = 700;
    resizeAspectRatio(gl, canvas);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.2, 0.3, 0.4, 1.0);

    return true;
}

function setupBuffers() {
    const rectVertices = new Float32Array([
        -0.5,  0.5,
        -0.5, -0.5,
         0.5, -0.5,
         0.5,  0.5
    ]);

    const indices = new Uint16Array([
        0, 1, 2,
        0, 2, 3
    ]);

    const rectColors = new Float32Array([
        1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 1.0
    ]);

    vaoRect = gl.createVertexArray();
    gl.bindVertexArray(vaoRect);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rectVertices, gl.STATIC_DRAW);
    shader.setAttribPointer("a_position", 2, gl.FLOAT, false, 0, 0);

    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, rectColors, gl.STATIC_DRAW);
    shader.setAttribPointer("a_color", 4, gl.FLOAT, false, 0, 0);

    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    gl.bindVertexArray(null);
}

function drawRect(transform, color) {
    shader.use();
    shader.setMat4("u_transform", transform);
    shader.setVec4("u_color", color);
    gl.bindVertexArray(vaoRect);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}

function render(elapsedTime) {
    gl.clear(gl.COLOR_BUFFER_BIT);

    const centerX = 0.0;
    const centerY = 0.2;

    const bigAngle = Math.sin(elapsedTime) * Math.PI * 2.0;
    const smallAngle = Math.sin(elapsedTime) * Math.PI * -10.0;

    const bigBladeLength = 0.72;
    const bigBladeThickness = 0.08;
    const halfBigBlade = bigBladeLength / 2.0;

    const smallBladeLength = 0.24;
    const smallBladeThickness = 0.06;

    // pillar
    {
        const pillar = mat4.create();
        mat4.translate(pillar, pillar, [0.0, -0.30, 0.0]);
        mat4.scale(pillar, pillar, [0.12, 1.0, 1.0]);
        drawRect(pillar, [0.4, 0.2, 0.05, 1.0]);
    }

    // Main Wing
    {
        const bigBlade = mat4.create();
        mat4.translate(bigBlade, bigBlade, [centerX, centerY, 0.0]);
        mat4.rotate(bigBlade, bigBlade, bigAngle, [0, 0, 1]);
        mat4.scale(bigBlade, bigBlade, [bigBladeLength, bigBladeThickness, 1.0]);
        drawRect(bigBlade, [0.92, 0.92, 0.92, 1.0]);
    }

    // Main wing endpoint
    const dx = Math.cos(bigAngle) * halfBigBlade;
    const dy = Math.sin(bigAngle) * halfBigBlade;

    const rightEndX = centerX + dx;
    const rightEndY = centerY + dy;
    const leftEndX = centerX - dx;
    const leftEndY = centerY - dy;

    // subwing - right
    {
        const smallBlade1 = mat4.create();
        mat4.translate(smallBlade1, smallBlade1, [rightEndX, rightEndY, 0.0]);
        mat4.rotate(smallBlade1, smallBlade1, smallAngle + Math.PI / 2, [0, 0, 1]);
        mat4.scale(smallBlade1, smallBlade1, [smallBladeLength, smallBladeThickness, 1.0]);
        drawRect(smallBlade1, [0.6, 0.6, 0.6, 1.0]);
    }

    // subwing - left
    {
        const smallBlade2 = mat4.create();
        mat4.translate(smallBlade2, smallBlade2, [leftEndX, leftEndY, 0.0]);
        mat4.rotate(smallBlade2, smallBlade2, smallAngle + Math.PI / 2, [0, 0, 1]);
        mat4.scale(smallBlade2, smallBlade2, [smallBladeLength, smallBladeThickness, 1.0]);
        drawRect(smallBlade2, [0.6, 0.6, 0.6, 1.0]);
    };

}

function animate(currentTime) {
    if (startTime === 0) startTime = currentTime;

    const elapsedTime = (currentTime - startTime) / 1000.0;
    render(elapsedTime);

    requestAnimationFrame(animate);
}

async function initShader() {
    const vertexShaderSource = await readShaderFile('shVert.glsl');
    const fragmentShaderSource = await readShaderFile('shFrag.glsl');
    shader = new Shader(gl, vertexShaderSource, fragmentShaderSource);
}

async function main() {
    try {
        if (!initWebGL()) {
            throw new Error('WebGL 초기화 실패');
        }

        await initShader();
        setupBuffers();

        axes = new Axes(gl, 0.8);



        return true;
    } catch (error) {
        console.error('Failed to initialize program:', error);
        alert('프로그램 초기화에 실패했습니다.');
        return false;
    }
}
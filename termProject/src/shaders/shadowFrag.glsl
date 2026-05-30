#version 300 es
precision mediump float;

uniform vec4 u_shadowColor;
out vec4 FragColor;

void main() {
    FragColor = u_shadowColor;
}

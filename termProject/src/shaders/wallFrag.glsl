#version 300 es
precision highp float;

out vec4 FragColor;

in vec3 fragPos;

uniform vec2  u_spotCenter;     // (Y, Z) world-space center of spotlight on wall
uniform float u_spotRadius;     // falloff radius (world units)
uniform vec3  u_wallColor;      // base wall color
uniform float u_introIntensity; // 0→1 intro reveal multiplier

void main() {
    float dist = length(fragPos.yz - u_spotCenter);
    float t    = dist / u_spotRadius;

    // Gaussian spotlight: bright hotspot + wide ambient glow
    float hotspot = exp(-t * t * 14.0);           // tight bright center
    float glow    = exp(-t * t * 1.8);            // wide soft falloff
    float intensity = glow + hotspot * 0.40;
    intensity = clamp(intensity, 0.010, 1.40);

    // Warm tint at center, neutral toward edges
    vec3 warmTint = mix(vec3(0.86, 0.86, 0.90), vec3(1.00, 0.97, 0.91), hotspot);

    FragColor = vec4(u_wallColor * warmTint * intensity * u_introIntensity, 1.0);
}

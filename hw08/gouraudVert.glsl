#version 300 es

layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

uniform vec3 lightPos;
uniform vec3 viewPos;

out vec3 Color;

void main() {

    vec4 worldPos = model * vec4(aPosition, 1.0);

    vec3 fragPos = worldPos.xyz;

    vec3 ambient = vec3(0.15);

    vec3 norm = normalize(mat3(transpose(inverse(model))) * aNormal);

    vec3 lightDir = normalize(lightPos - fragPos);

    float diff = max(dot(norm, lightDir), 0.0);

    vec3 diffuse = diff * vec3(0.8, 0.4, 0.2);

    vec3 viewDir = normalize(viewPos - fragPos);

    vec3 reflectDir = reflect(-lightDir, norm);

    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

    vec3 specular = spec * vec3(1.0);

    Color = ambient + diffuse + specular;

    gl_Position = projection * view * worldPos;
}
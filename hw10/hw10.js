import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// Scene / Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Cameras
const cameraPosition = new THREE.Vector3(0, 90, 160);
let cameraMode = 'Perspective';
let camera = createPerspectiveCamera();
scene.add(camera);

let orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.05;
orbitControls.target.set(0, 0, 0);

function createPerspectiveCamera() {
  const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  cam.position.copy(cameraPosition);
  cam.lookAt(scene.position);
  return cam;
}

function createOrthographicCamera() {
  const aspect = window.innerWidth / window.innerHeight;
  const frustumSize = 160;
  const cam = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2,
    (frustumSize * aspect) / 2,
    frustumSize / 2,
    frustumSize / -2,
    0.1,
    1000
  );
  cam.position.copy(cameraPosition);
  cam.lookAt(scene.position);
  return cam;
}

function switchCamera() {
  cameraPosition.copy(camera.position);
  scene.remove(camera);
  orbitControls.dispose();

  if (camera instanceof THREE.PerspectiveCamera) {
    camera = createOrthographicCamera();
    cameraMode = 'Orthographic';
  } else {
    camera = createPerspectiveCamera();
    cameraMode = 'Perspective';
  }

  scene.add(camera);
  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.05;
  orbitControls.target.set(0, 0, 0);
}

// Lights
scene.add(new THREE.AmbientLight(0x404040, 1.8));
const sunLight = new THREE.PointLight(0xffffff, 1200, 500, 1.7);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

// Texture loader
const textureLoader = new THREE.TextureLoader();

function loadTexture(path) {
  const texture = textureLoader.load(path);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Sun: radius 10
const sunGeometry = new THREE.SphereGeometry(10, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planet data from Homework 10
const planetInfos = [
  {
    name: 'Mercury', radius: 1.5, distance: 20, color: '#a6a6a6',
    rotationSpeed: 0.02, orbitSpeed: 0.02, texture: './Assets/Mercury.jpg'
  },
  {
    name: 'Venus', radius: 3, distance: 35, color: '#e39e1c',
    rotationSpeed: 0.015, orbitSpeed: 0.015, texture: './Assets/Venus.jpg'
  },
  {
    name: 'Earth', radius: 3.5, distance: 50, color: '#3498db',
    rotationSpeed: 0.01, orbitSpeed: 0.01, texture: './Assets/Earth.jpg'
  },
  {
    name: 'Mars', radius: 2.5, distance: 65, color: '#c0392b',
    rotationSpeed: 0.008, orbitSpeed: 0.008, texture: './Assets/Mars.jpg'
  }
];

const planets = [];

function createOrbitLine(distance) {
  const curve = new THREE.EllipseCurve(0, 0, distance, distance, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(160);
  const geometry = new THREE.BufferGeometry().setFromPoints(points.map((p) => new THREE.Vector3(p.x, 0, p.y)));
  const material = new THREE.LineBasicMaterial({ color: 0x333333 });
  const orbitLine = new THREE.LineLoop(geometry, material);
  orbitLine.visible = false;

  return orbitLine;
}

for (const info of planetInfos) {
  const pivot = new THREE.Object3D();
  scene.add(pivot);

  const geometry = new THREE.SphereGeometry(info.radius, 48, 48);
  const material = new THREE.MeshPhongMaterial({
    color: info.color,
    map: loadTexture(info.texture),
    shininess: 20
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = info.distance;
  pivot.add(mesh);

  scene.add(createOrbitLine(info.distance));
  planets.push({ ...info, pivot, mesh });
}

// GUI
const gui = new GUI();
const cameraFolder = gui.addFolder('Camera');
const cameraProps = {
  mode: cameraMode,
  switchCamera: () => switchCamera()
};
cameraFolder.add(cameraProps, 'switchCamera').name('Switch Camera Type');
cameraFolder.add(cameraProps, 'mode').name('Current Camera').listen();
cameraFolder.open();

for (const planet of planets) {
  const folder = gui.addFolder(planet.name);
  folder.add(planet, 'rotationSpeed', -0.1, 0.1, 0.001).name('Rotation Speed');
  folder.add(planet, 'orbitSpeed', -0.1, 0.1, 0.001).name('Orbit Speed');
}

// Resize
window.addEventListener('resize', () => {
  if (camera instanceof THREE.PerspectiveCamera) {
    camera.aspect = window.innerWidth / window.innerHeight;
  } else {
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 160;
    camera.left = (frustumSize * aspect) / -2;
    camera.right = (frustumSize * aspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
  }
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
function animate() {
  requestAnimationFrame(animate);

  stats.update();
  orbitControls.update();

  sun.rotation.y += 0.004;
  for (const planet of planets) {
    planet.mesh.rotation.y += planet.rotationSpeed;
    planet.pivot.rotation.y += planet.orbitSpeed;
  }

  cameraProps.mode = cameraMode;
  renderer.render(scene, camera);
}

animate();
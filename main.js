// Import necessary modules
import * as THREE from "three";
import { MSky } from "./src/Components/Sky.js";
import "./style.css";
// ======================================
import { CargoShip } from "./src/Components/CargoShip.js";
import { Island } from "./src/Components/Island.js";
import { Control } from "./src/Components/control.js";
import { Sea } from "./src/Components/Sea.js";

// ======================================
// Your Three.js setup and initialization code here

export let camera, renderer;
export let controls, water, sun;
// ======================
// my cmp

export const scene = new THREE.Scene();
// export const world = new CANNON.World(); // Create a physics world
// world.broadphase = new CANNON.SAPBroadphase(world);
// world.allowSleep = true;
// world.gravity.set(0, -9.82, 0); // Set gravity (adjust as needed)

const color = 0xffffff; // white light
const intensity = 2; // full intensity
export const light = new THREE.AmbientLight(color, intensity);
light.position.set(10, 10, 10); // position the light
scene.add(light);
//30
// Scene
var mass = 15 * 1000 * 1000;

export var cargoShip = new CargoShip(
  'first',
  scene,
  "./src/Models/cargoship/scene.gltf",
  mass
);

const island = new Island(scene, "./src/Models/island/scene.gltf", {
  x: 2400,
  y: 0,
  z: 2000,
});
const island2 = new Island(scene, "./src/Models/island/scene.gltf", {
  x: -2400,
  y: 0,
  z: -1000,
});
const island3 = new Island(scene, "./src/Models/island/scene.gltf", {
  x: 400,
  y: 0,
  z: 1000,
});
const island4 = new Island(scene, "./src/Models/island/scene.gltf", {
  x: 400,
  y: 0,
  z: -1000,
});

// Renderer
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;
document.body.appendChild(renderer.domElement);

// Camera
camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  20000
);
camera.position.set(0, 10, 60);
scene.add(camera);

controls = new Control();

// Canon

// // const shipShape = new CANNON.Box(new CANNON.Vec3(50, 10, 200)); // Adjust dimensions to match your model

// Sun
sun = new THREE.Vector3();
export const sea = new Sea();
// Skybox
const sky = new MSky();

// sun controller
const parameters = {
  elevation: 2, // Change to desired elevation
  azimuth: 180, // Change to desired azimuth
};

const pmremGenerator = new THREE.PMREMGenerator(renderer);
// const sceneEnv = new THREE.Scene();
let renderTarget;

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
let time = Date.now();
const clock = new THREE.Clock();
// var force = new CANNON.Vec3(0, 100, 0);
const loop = () => {
  // animate();
  let lastTime = Date.now();
  let deltaTime = (lastTime - time) / 1000; // Time elapsed in seconds
  time = lastTime;

  // Movement logic (adjust for 120 FPS)
  // console.log(cargoShip.getPosition);
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  cargoShip.updatePosition(elapsedTime, deltaTime);
  sea.update(light, elapsedTime);

  // sea.water.material.uniforms["time"].value = elapsedTime / 2;
  renderer.render(scene, camera);
  // renderer.render(scene, camera);

  window.requestAnimationFrame(loop);
};
loop();

function updateSun() {
  // const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);//default
  // const theta = THREE.MathUtils.degToRad(parameters.azimuth);

  // sun.setFromSphericalCoords(1, phi, theta);

  // sky.sky.material.uniforms["sunPosition"].value.copy(sun);
  sea.water.material.uniforms["sunDirection"].value.copy(light).normalize();

  if (renderTarget !== undefined) renderTarget.dispose();
  // sceneEnv.add(sky);
  // renderTarget = pmremGenerator.fromScene(sceneEnv);
  // scene.environment = renderTarget.texture;
}
// updateSun();

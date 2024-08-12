// Import necessary modules
import * as THREE from "three";
import { MSky } from "./src/Components/Sky.js";
import "./style.css";
import Engine from "./src/physics/Engine.js"; // I
import { CargoShip } from "./src/Components/CargoShip.js";
import { Island } from "./src/Components/Island.js";
import { Control } from "./src/Components/control.js";
import { Sea } from "./src/Components/Sea.js";
import GUI from "lil-gui";

export let camera, renderer;
export let controls, water, sun;
export const scene = new THREE.Scene();
export let gui = new GUI();
gui.title("ships");

const color = 0xffffff; // white light
const intensity = 2; // full intensity
export const light = new THREE.AmbientLight(color, intensity);
light.position.set(10, 10, 10); // position the light
scene.add(light);
// Scene
var enginePower = 60_000_000;
let engine = new Engine(enginePower, 73, 0.8);
let engine2 = new Engine(enginePower, 73, 0.8);
export var cargoShip = new CargoShip(
  "Aframax",
  scene,
  "./src/Models/cargoship/scene.gltf",
  engine,
  {
    x: -0,
    y: 0,
    z: 0,
  }
);

var cargoShip2 = new CargoShip(
  "EverGreen",
  scene,
  "./src/Models/cargoship/scene.gltf",
  engine2,
  {
    x: 0,
    y: 0,
    z: -200,
  },
  100,
  6,
  15
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
sun = new THREE.Vector3();
export const sea = new Sea();
// Skybox
const sky = new MSky();

// sun controller
const parameters = {
  elevation: 2, // Change to desired elevation
  azimuth: 180, // Change to desired azimuth
};

window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
let time = Date.now();
const clock = new THREE.Clock();
const loop = () => {
  let lastTime = Date.now();
  let deltaTime = (lastTime - time) / 1000; // Time elapsed in seconds
  time = lastTime;
  const elapsedTime = clock.getElapsedTime();
  cargoShip.updatePosition(elapsedTime, deltaTime);
  cargoShip2.updatePosition(elapsedTime, deltaTime);
  controls.update();
  sea.update(light, elapsedTime);
  sky.update(light, elapsedTime);
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

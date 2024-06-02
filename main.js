// Import necessary modules
import * as THREE from "three";
import { MSky } from "./src/Components/Sky.js";
import "./style.css";
// ======================================
import { CargoShip } from "./src/Components/CargoShip.js";
import { Island } from "./src/Components/Island.js";
import { Control } from "./src/Components/control.js";
import * as CANNON from "cannon-es";
import { Sea } from "./src/Components/Sea.js";

// ======================================
// Your Three.js setup and initialization code here

export let camera, renderer;
export let controls, water, sun;
// ======================
// my cmp

export const scene = new THREE.Scene();
export const world = new CANNON.World(); // Create a physics world
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
world.gravity.set(0, -9.82, 0); // Set gravity (adjust as needed)

const color = 0xffffff; // white light
const intensity = 4; // full intensity
export const light = new THREE.AmbientLight(color, intensity);
light.position.set(10, 10, 10); // position the light
scene.add(light);
export var mass = 60*1000*1000;
                  //603
// Scene
export const cargoShip = new CargoShip(
  scene,
  "./src/Models/cargoship/scene.gltf",
  world,
  mass
);

const island = new Island(scene, "./src/Models/island/scene.gltf", {
  x: 2400,
  y: -1,
  z: 2000,
});
const island2 = new Island(scene, "./src/Models/island/scene.gltf", {
  x: -2400,
  y: -1,
  z: -1000,
});
const island3 = new Island(scene, "./src/Models/island/scene.gltf", {
  x: 400,
  y: -1,
  z: 1000,
});
const island4 = new Island(scene, "./src/Models/island/scene.gltf", {
  x: 400,
  y: 3,
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

const shipShape = new CANNON.Box(new CANNON.Vec3(50, 10, 200)); // Adjust dimensions to match your model

// Sun
sun = new THREE.Vector3();
const sea = new Sea();
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
updateSun();

// Window resize handling
window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (cargoShip.ship) {
    // camera.lookAt(cargoShip.ship.position);
  }
}

const clock = new THREE.Clock();
var force = new CANNON.Vec3(0, 100, 0);
const loop = () => {
  // animate();
  // camera.lookAt(cargoShip.ship.position);
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  cargoShip.updatePosition();
  //    shipBody.position.copy(cargoShip.ship.position); // Update physics body position
  //    shipBody.quaternion.copy(cargoShip.ship.quaternion); // Update physics body rotation
  // cargoShip.ship.position.copy(cargoship.shipBody.position); // Update Three.js mesh position
  // cargoShip.ship.quaternion.copy(cargoshipshipBody.quaternion); // Update Three.js mesh rotation
  //    shipBody.applyLocalForce(engineForce, shipBody.position);

  world.step(1 / 60);
  // console.log(cargoShip.getPosition);
  sea.water.material.uniforms["time"].value = elapsedTime / 2;
  renderer.render(scene, camera);
  // renderer.render(scene, camera);

  window.requestAnimationFrame(loop);
};
loop();

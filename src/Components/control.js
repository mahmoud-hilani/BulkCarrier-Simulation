import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {  camera, renderer,cargoShip } from "../../main.js";
import * as THREE from "three";

// Orbit Controls
export class Control {
  constructor() {
   this.controls =  new OrbitControls(camera, renderer.domElement);
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.enableDamping = true;
    this.controls.minDistance = 20;
    this.controls.maxDistance = 100;
   
  }

  update() {
    
    if(cargoShip.ship)
      this.controls.target.copy(cargoShip.ship.position).add(new THREE.Vector3(6, 5, 0));
    this.controls.update();
  
  }
}

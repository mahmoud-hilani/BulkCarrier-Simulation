import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import Buoyancy from "../physics/Buoyancy"; // Import the Buoyancy class
import { camera, gui, sea } from "../../main.js";

class CargoShip {
  constructor(
    name,
    scene,
    path,
    mass,
    shipLength = 200,
    shipDraft = 4,
    shipBeam = 30
  ) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.ship = gltf.scene;
      scene.add(this.ship);
    });
    this.mass = mass;
    this.v = new THREE.Vector3(0, 0, 0);
    // this.mass = mass;

    const folder = gui.addFolder(name);
    folder.add(this, "mass", 1, 30_000_000, 1_000_000).onChange((value) => {
      this.updateMass(value);
      this.v = new THREE.Vector3(0, 0, 0);
    });

    // Initialize Buoyancy
    this.buoyancy = new Buoyancy(this.mass, shipLength, shipDraft, shipBeam);
  }

  updateMass(newMass) {
    this.mass = newMass;
    this.buoyancy.updateMass(newMass);
    // console.log(this.mass)
  }
  get getPosition() {
    if (this.ship) return this.ship.position;
  }

  updatePosition(time, deltaTime) {
    if (this.ship) {
      let B = this.buoyancy.BuoyancyForce(this.ship, time);
      let WD = this.buoyancy.waterDrag(this.v.y);
        console.log(`wd ${WD.y}`);
        console.log(`B ${B.y}`);
        console.log(`v ${this.v.y*this.v.y}`);

      var s = B.add(WD);
      var y = s.y;
      //  this.ship.position.y += vY * deltaTime;
      // this.ship.position.add(a)
      // var result = vector1.clone().add(vector2).add(vector3);
      let a = s.clone().divideScalar(this.mass);
      // console.log(this.a.y)
      this.v.add(a.clone().multiplyScalar(deltaTime));
      this.ship.position.add(this.v.clone().multiplyScalar(deltaTime));
      console.log(`s ${s.y}`);
      console.log(this.ship.position.y);
    }
  }
}

export { CargoShip };

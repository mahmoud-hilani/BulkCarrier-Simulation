import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import Buoyancy from "../physics/Buoyancy";
import Engine from "../physics/Engine"; // I
import Rudder from "../physics/Rudder"; // I

import { calcRadean } from "../Components/MathCalc"; // Import thethCalc";
import {gui} from "../../main.js"; //

class CargoShip {
  constructor(
    name,
    scene,
    path,
    mass,
    pos,
    shipLength = 200,
    shipDraft = 12, //height
    shipBeam = 30
  ) {
    let guifolder = gui.addFolder(name);

    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.ship = gltf.scene;
      this.scaling();
      this.ship.position.set(pos.x, pos.y, pos.z);

      scene.add(this.ship);
    });
    this.shipLength = shipLength;
    this.shipDraft = shipDraft;
    this.shipBeam = shipBeam;
    this.mass = mass;
    this.v = new THREE.Vector3(0, 0, 0);
    this.engine = new Engine(60_000_000, 73, 0.8, guifolder);
    this.buoyancy = new Buoyancy(this.mass, shipLength, shipDraft, shipBeam);
    this.rudder = new Rudder(shipLength, shipBeam, this.mass);
    this.updateMass(guifolder);

    // Initialize Buoyancy
  }

  scaling() {
    // Get the original dimensions of the loaded model
    const boundingBox = new THREE.Box3().setFromObject(this.ship);
    console.log(boundingBox);
    const originalLength = boundingBox.max.x - boundingBox.min.x;
    const originalDraft = boundingBox.max.y - boundingBox.min.y;
    const originalBeam = boundingBox.max.z - boundingBox.min.z;
    // Calculate scaling factors to match desired dimensions
    const lengthScale = this.shipLength / originalLength;
    const draftScale = (this.shipDraft * 5) / originalDraft;
    const beamScale = this.shipBeam / originalBeam;

    // Apply scaling
    this.ship.scale.set(beamScale, draftScale, lengthScale);
    this.shipYlevel = 6 * draftScale;
    // Update the ship's position to keep the bottom of the ship at the water level
    // this.ship.position.y =this.shipYlevel-this.shipDraft-1 ;
    const oundingBox = new THREE.Box3().setFromObject(this.ship);
    console.log(oundingBox);
  }

  updateMass(guifolder) {
    guifolder
      .add(this, "mass", 1, 80_000_000, 1_000_000)
      .onChange((newMass) => {
        this.mass = newMass;
        this.buoyancy.updateMass(newMass);
        this.rudder.updateMass(newMass);

        this.v = new THREE.Vector3(0, 0, 0);
      });

    // console.log(`m ${this.mass}`)
  }
  get getPosition() {
    if (this.ship) return this.ship.position;
  }

  updatePosition(time, deltaTime) {
    if (this.ship) {
      let B = this.buoyancy.BuoyancyForce(this.ship, time, this.shipYlevel);
      let WD = this.buoyancy.waterDrag(this.v.y);
      let T = this.engine.getThrustForce();

      if (!B.equals(new THREE.Vector3(0, 0, 0))) {
        T = new THREE.Vector3(0, 0, 0);
      }

      var s = B.add(WD.add(T));
      let a = s.clone().divideScalar(this.mass);

      const rudderAngle = calcRadean(45); // Get rudder input (in radians, typically -0.6 to 0.6)
      // console.log(this.ship.scale)

      this.rudder.updateAngle(rudderAngle);

      // Update ship rotation (yaw)
      let angularVelocity = this.rudder.updateYaw(
        deltaTime,
        this.v,
        this.mass,
        this.shipInertia
      );
      //  console.log(angularVelocity)
      this.ship.rotation.y += angularVelocity * deltaTime;

      // Calculate thrust force (including lateral component)
      // const lateralForce = thrustForce.clone().multiplyScalar(0.2 * rudderAngle); // Example calculation
      // thrustForce.add(lateralForce);
      this.v.add(a.clone().multiplyScalar(deltaTime));
      this.ship.position.add(this.v.clone().multiplyScalar(deltaTime));
    }
  }
}
function print() {
  console.log(`a ${a.x}`);

  console.log(`B `);
  console.log(B);

  console.log(`v ${this.v.x}`);
  console.log(this.v);
}
export { CargoShip };

import * as THREE from "three";
import GUI from "lil-gui";
import { gui, sea } from "../../main.js";
class Buoyancy {
  constructor(shipMass, shipLength, shipDraft, shipBeam) {
    this.waterDensity = 1025;
    this.time = 0;
    this.shipLength = shipLength;
    this.shipDraft = shipDraft;
    this.shipBeam = shipBeam;
    this.shipMass = shipMass;
    this.gravity = 9.8;

    // folder.add(this, "gravity", 1, 20);

    // obj = { mass: 28*1000*1000, number2: 50 }
  }

  updateMass(newMass) {
    this.shipMass = newMass;
}

  applyCorrectBuoyancyForce(shipBody, time) {
    // this.time += 1 / 60; // Increment time for wave simulation
// this.shipmass=mass

    const wave = sea.getWaterLevel(
      shipBody.position.x,
      shipBody.position.z,
      time
    );
      console.log(this.shipMass)
    var requiredSubmergedVolume = this.shipMass / this.waterDensity;
    const waterLevel =
      requiredSubmergedVolume / (this.shipLength * this.shipBeam);
      // console.log(requiredSubmergedVolume)

    if (waterLevel > this.shipDraft) {
      const maxSubmergedVolume =
        this.shipLength * this.shipDraft * this.shipBeam;
      const maxBuoyantForce = maxSubmergedVolume * this.waterDensity;
      // console.log(24600000  + " maxBuoyantForce")
      shipBody.position.y = 0;

      // Ship sinks
      return maxBuoyantForce - this.shipMass * this.gravity;
    }

    // const buoyantForceMagnitude = requiredSubmergedVolume * this.waterDensity * gravity;
    // Adjust the ship's y position based on submerged depth
    const newYPosition = -waterLevel + wave;
    shipBody.position.y = newYPosition;
    // Adjust the ship's y position based on submerged depth

    // Calculate the center of buoyancy

    // Apply the buoyant force at the center of buoyancy
    // const force = new THREE.Vector3(0, buoyantForceMagnitude, 0);
    // shipBody.applyForce(force, centerOfBuoyancy);
  }
}
/*  calculateSubmergedVolume(shipBody, waterLevel) {
    const submergedDepth = waterLevel - (shipBody.position.y - this.shipDraft / 2);

    if (submergedDepth <= 0) {
      return 0; // Not submerged
    }

    if (submergedDepth >= this.shipDraft) {
      return this.shipLength * this.shipDraft * this.shipBeam; // Fully submerged
    }

    // Partially submerged
    return submergedDepth * this.shipLength * this.shipBeam;
  }
*/
export default Buoyancy;

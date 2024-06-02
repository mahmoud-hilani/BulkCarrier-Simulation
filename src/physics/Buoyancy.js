import * as CANNON from "cannon-es";
import { world, mass } from "../../main.js";
import { World } from "three/examples/jsm/libs/ecsy.module.js";

class Buoyancy {
  constructor(waveAmplitude, waveFrequency = 3, waterDensity = 1025) {
    this.waveFrequency = waveFrequency;
    this.waveAmplitude = waveAmplitude;
    this.waterDensity = waterDensity;
    this.time = 0;
    this.shipLength = 200;
    this.shipDraft = 10;
    this.shipBeam = 30;
  }

  getWaterLevel(x, z, time) {
    // Smoother wave function
    return (
      Math.sin(x * this.waveFrequency + time) * this.waveAmplitude * 0.5 +
      Math.cos(z * this.waveFrequency + time) * this.waveAmplitude * 0.5 +
      1
    );
  }

  calculateSubmergedVolume(shipBody, waterLevel) {
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

  applyCorrectBuoyancyForce(shipBody) {
    this.time += 1 / 60; // Increment time for wave simulation

    const waterLevel = this.getWaterLevel(
      shipBody.position.x,
      shipBody.position.z,
      this.time
    );

    const shipMass = mass;
    const maxSubmergedVolume = this.shipLength * this.shipDraft * this.shipBeam;
      const gravity = -world.gravity.y;
    const maxBuoyantForce = maxSubmergedVolume * this.waterDensity * gravity;

    if (shipMass > maxBuoyantForce) {
        const sinkingForce = new CANNON.Vec3(0, gravity*shipMass*0.99, 0);
        console.log(maxBuoyantForce)
      // Ship sinks
      shipBody.applyForce(sinkingForce, shipBody.position);
      return;
    }

    const requiredSubmergedVolume = shipMass / this.waterDensity;
    const submergedDepth = requiredSubmergedVolume / (this.shipLength * this.shipBeam);

    const buoyantForceMagnitude =
      requiredSubmergedVolume * this.waterDensity * gravity;
console.log(submergedDepth)// Adjust the ship's y position based on submerged depth
    const newYPosition = waterLevel - submergedDepth*5 / 80;
    shipBody.position.y = newYPosition+5;

    // Calculate the center of buoyancy
    const centerOfBuoyancy = new CANNON.Vec3(
      shipBody.position.x,
      waterLevel - submergedDepth / 2,
      shipBody.position.z
    );

    // Apply the buoyant force at the center of buoyancy
    const force = new CANNON.Vec3(0, buoyantForceMagnitude, 0);
    shipBody.applyForce(force, centerOfBuoyancy);
  }
}

export default Buoyancy;

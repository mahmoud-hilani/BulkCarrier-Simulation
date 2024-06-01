// Buoyancy.js
import * as CANNON from "cannon-es";

class Buoyancy {
  constructor(waveAmplitude = 1 , waveFrequency = 3, waterDensity = 1025) {
    this.waveFrequency = waveFrequency;
    this.waveAmplitude = waveAmplitude;
    this.waterDensity = waterDensity;
    this.time = 0;
  }

  getWaterLevel(x, z, time) {
    return Math.sin(x * this.waveFrequency + time) * this.waveAmplitude +
           Math.sin(z * this.waveFrequency + time) * this.waveAmplitude;
  }

  calculateSubmergedVolume(shipBody, waterLevel) {
    const halfHeight = shipBody.shapes[0].halfExtents.y;
    const bodyHeight = halfHeight * 2;
    const depthBelowWater = waterLevel - (shipBody.position.y - halfHeight);

    if (depthBelowWater <= 0) {
      return 0; // Not submerged
    }

    if (depthBelowWater >= bodyHeight) {
      return bodyHeight * shipBody.shapes[0].halfExtents.x * 2 * shipBody.shapes[0].halfExtents.z * 2; // Fully submerged
    }

    // Partially submerged
    return depthBelowWater * shipBody.shapes[0].halfExtents.x * 2 * shipBody.shapes[0].halfExtents.z * 2;
  }

  applyBuoyancyForce(shipBody) {
    this.time += 1 / 60; // Increment time for wave simulation
    const waterLevel = this.getWaterLevel(shipBody.position.x, shipBody.position.z, this.time);
    const submergedVolume = this.calculateSubmergedVolume(shipBody, waterLevel);
    const buoyantForceMagnitude = submergedVolume * this.waterDensity * 9.81; // Density of seawater

    // Apply buoyant force at the center of buoyancy
    const force = new CANNON.Vec3(0, buoyantForceMagnitude, 0);
    shipBody.applyForce(force, shipBody.position);
  }
}

export default Buoyancy;

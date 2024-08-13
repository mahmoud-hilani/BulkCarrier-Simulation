import * as THREE from "three";
import GUI from "lil-gui";
import { sea } from "../../main.js";
class Buoyancy {
  constructor(shipMass, shipLength, shipDraft, shipBeam, Drag) {
    this.waterDensity = 1025;
    this.time = 0;
    this.shipLength = shipLength;
    this.shipDraft = shipDraft;
    this.shipBeam = shipBeam;
    this.shipMass = shipMass;
    this.gravity = 9.8;
    this.Drag = Drag;
  }

  updateMass(newMass) {
    this.shipMass = newMass;
  }


  calculateForce(position, shipYlevel) {
    const wave = sea.getWaterLevel(position.x, position.z);
    var requiredSubmergedVolume = this.shipMass / this.waterDensity;
    const waterLevel =
      requiredSubmergedVolume / (this.shipLength * this.shipBeam);
    this.Drag.setwaterlevel(waterLevel);
    if (waterLevel > this.shipDraft) {
      const maxSubmergedVolume =
        this.shipLength * this.shipDraft * this.shipBeam;
      const B =
        maxSubmergedVolume * this.waterDensity * this.gravity -
        this.shipMass * this.gravity;
      return new THREE.Vector3(0, B, 0);
    }
    // Adjust the ship's y position based on submerged depth
    const newYPosition = -waterLevel + shipYlevel + wave / this.shipMass;
    position.y = newYPosition;
    const submergedVolume = this.shipLength * waterLevel * this.shipBeam;
    const B =submergedVolume* this.waterDensity * this.gravity
    return new THREE.Vector3(0, B, 0);
  }
}

export default Buoyancy;

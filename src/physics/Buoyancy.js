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

  // AirDrag(){
  //  let C = 0.04
  // }

  // waterDrag(v){
  //   // let C = 0.003
  //     let C = 1.3

  //  let A = this.shipBeam*this.shipLength
  //   var DF = 0.5 * C * this.waterDensity * A * v * v;
  //   return new THREE.Vector3(0,DF,0)

  // }

  calculateForce(position, time, shipYlevel) {
    const wave = sea.getWaterLevel(position.x, position.z, time);
    var requiredSubmergedVolume = this.shipMass / this.waterDensity;
    const waterLevel =
      requiredSubmergedVolume / (this.shipLength * this.shipBeam);
    this.Drag.setwaterlevel(waterLevel);
    if (waterLevel > this.shipDraft) {
      const maxSubmergedVolume =
        this.shipLength * this.shipDraft * this.shipBeam;
      // console.log(24600000  + " maxBuoyantForce")
      const B =
        maxSubmergedVolume * this.waterDensity * this.gravity -
        this.shipMass * this.gravity;
      return new THREE.Vector3(0, B, 0);
    }
    // Adjust the ship's y position based on submerged depth
    const newYPosition = -waterLevel + shipYlevel + wave / this.shipMass;
    position.y = newYPosition;
    return new THREE.Vector3(0, 0, 0);
  }
}

export default Buoyancy;

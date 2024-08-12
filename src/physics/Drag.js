import * as THREE from "three";
import GUI from "lil-gui";
import { sea } from "../../main.js";
class Drag {
  //00.04
  constructor(
    shipLength,
    shipDraft,
    shipBeam,
    airDragCoefficient = 0.0025,
    waterDragCoefficient = 0.005
  ) {
    this.airDensity = 1.225; // kg/m^3
    this.waterDensity = 1025;
    this.time = 0;
    this.shipLength = shipLength;
    this.shipDraft = shipDraft;
    this.shipBeam = shipBeam;
    this.gravity = 9.8;
    this.airDragCoefficient = airDragCoefficient;
    this.waterDragCoefficient = waterDragCoefficient;
  }

  AirDrag() {
    let C = 0.04; //0.005
  }

  waterDrag(v) {
    let C = 0.003;
    //    let C = 1.3

    let A = this.shipBeam * this.shipDraft;
    var DF = 0.5 * C * this.waterDensity * A * v * v;
    return new THREE.Vector3(0, DF, 0);
  }

  setwaterlevel(waterLevel) {
    this.waterLevel = waterLevel;
  }

  movingAirDrag(shipVelocity) {
    const frontalArea = this.shipDraft * 4 * this.shipBeam; // Approximate frontal area
    let force =
      -0.5 *
      this.airDensity *
      shipVelocity *
      shipVelocity *
      this.airDragCoefficient *
      frontalArea;
    return new THREE.Vector3(force, 0, force);
  }

  movingWaterDrag(shipVelocity) {
    const wettedSurfaceArea = this.shipBeam * this.waterLevel; // Simplified
    let force =
      -0.5 *
      this.waterDensity *
      shipVelocity *
      shipVelocity *
      this.waterDragCoefficient *
      wettedSurfaceArea;
    return new THREE.Vector3(force, 0, force);
  }

  rotatingAirDrag(shipVelocity) {
    const sideArea = this.shipDraft * 4 * this.shipLength; // Approximate frontal area
    let force =
      0.5 *
      this.airDensity *
      shipVelocity *
      shipVelocity *
      this.airDragCoefficient *
      sideArea;
    return force;
  }

  rotatingWaterDrag(shipVelocity) {
    const wettedSurfaceArea = this.shipLength * this.waterLevel; // Simplified
    let force =
      0.5 *
      this.waterDensity *
      shipVelocity *
      shipVelocity *
      this.waterDragCoefficient *
      wettedSurfaceArea;
    return force;
  }

  BoyuancyWaterDrag(v) {
    // let C = 0.003
    let C = 1.3;

    let A = this.shipBeam * this.shipLength;
    var DF = 0.5 * C * this.waterDensity * A * v * v;
    return new THREE.Vector3(0, DF, 0);
  }
}
export default Drag;

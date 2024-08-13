import * as THREE from "three";
import GUI from "lil-gui";
import { sea } from "../../main.js";
import { degreesToRadians } from "../Components/MathCalc";

class Drag {
  constructor(
    shipLength,
    shipDraft,
    shipBeam,
    dragCoefficient = 0.5, //0.8580   //00.04
    sideDragCoefficient = 0.8
  ) {
    this.airDensity = 1.225; // kg/m^3
    this.waterDensity = 1025;
    this.time = 0;
    this.shipLength = shipLength;
    this.shipDraft = shipDraft;
    this.shipBeam = shipBeam;
    this.gravity = 9.8;
    this.dragCoefficient = dragCoefficient;
    this.sideDragCoefficient = sideDragCoefficient;
  }

  setwaterlevel(waterLevel) {
    this.waterLevel = waterLevel;
  }

  movingAirDrag(shipVelocity) {
    const frontalArea = this.shipDraft * 4 * this.shipBeam; // Approximate frontal area
    let force =
      0.5 *
      this.airDensity *
      shipVelocity *
      shipVelocity *
      this.dragCoefficient *
      frontalArea;
    return force;
  }

  movingAirDragVec(shipVelocity) {
    let force = this.movingAirDrag(shipVelocity);
    return new THREE.Vector3(-force, 0, -force);
  }

  movingWaterDrag(shipVelocity) {
    const wettedSurfaceArea = this.shipBeam * this.waterLevel; // Simplified
    let force =
      0.5 *
      this.waterDensity *
      shipVelocity *
      shipVelocity *
      this.dragCoefficient *
      wettedSurfaceArea;
    return force
  }

  movingWaterDragVec(shipVelocity) {
    let force = this.movingWaterDrag(shipVelocity);
    return new THREE.Vector3(-force, 0, -force);
  }

  rotatingAirDrag(shipVelocity) {
    const sideArea = this.shipDraft * 4 * this.shipLength; // Approximate frontal area
    let force =
      0.5 *
      this.airDensity *
      shipVelocity *
      shipVelocity *
      this.sideDragCoefficient *
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
      this.sideDragCoefficient *
      wettedSurfaceArea;
    return force;
  }

  BoyuancyWaterDrag(v) {
    // let C = 0.003
    let C = 0.5;

    let A = this.shipBeam * this.shipLength;
    var DF = 0.5 * C * this.waterDensity * A * v * v;
    return new THREE.Vector3(0, DF, 0);
  }
}
export default Drag;

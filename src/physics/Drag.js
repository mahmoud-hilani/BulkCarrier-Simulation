import * as THREE from "three";
import GUI from "lil-gui";
import {  sea } from "../../main.js";
class Drag {
  constructor( shipLength, shipDraft, shipBeam) {
    this.waterDensity = 1025;
    this.time = 0;
    this.shipLength = shipLength;
    this.shipDraft = shipDraft;
    this.shipBeam = shipBeam;
    this.gravity = 9.8;
  }

  AirDrag(){
    let C = 0.04
   }
   
   waterDrag(v){
     let C = 0.003
    //    let C = 1.3
   
    let A = this.shipBeam*this.shipDraft
     var DF = 0.5 * C * this.waterDensity * A * v * v;
     return new THREE.Vector3(0,DF,0)
   
   }

   force(){

   }

}
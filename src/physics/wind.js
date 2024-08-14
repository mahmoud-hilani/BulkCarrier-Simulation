 
 import * as THREE from "three";
 import { degreesToRadians } from "../Components/MathCalc";

 class Wind {
  constructor(drag) {
    this.drag = drag;
  }
  calculateForce(airv, theta) {
    let moving = this.drag.movingAirDrag(airv) + this.drag.movingWaterDrag(airv);
    let frontforce = new THREE.Vector3(
      moving * Math.cos(degreesToRadians(theta)),
      0,
      0
    );
    let side = this.drag.rotatingAirDrag(airv) + this.drag.rotatingWaterDrag(airv);
    let sideForce = new THREE.Vector3(
      0,
      0,
      side * Math.sin(degreesToRadians(theta))
    );
    return sideForce.clone().add(frontforce);
  }
}
export default Wind ;

import * as THREE from "three";
import { radiansToDegrees, degreesToRadians } from "../Components/MathCalc";

class Engine {
  constructor(power, maxRPM, efficiency, guifolder) {
    this.power = power;
    this.maxRPM = maxRPM;
    this.efficiency = efficiency;
    this.currentRPM = 0;
  }

  setRPM(RPM) {
    this.currentRPM = RPM;
  }

  getThrustForce() {
    //
    // console.log("theta: " + radiansToDegrees(theta));
    const thrust =
      this.power * this.efficiency * (this.currentRPM ** 2 / this.maxRPM ** 2);
    return new THREE.Vector3(thrust, 0, thrust);
  }
}

export default Engine;

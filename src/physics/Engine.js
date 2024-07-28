import * as THREE from "three";
import { radiansToDegrees,degreesToRadians } from "../Components/MathCalc";

class Engine {
    constructor(power, maxRPM, efficiency,guifolder) {
        this.power = power;       // Force in Newtons (N)
        this.maxRPM = maxRPM;    // Maximum rotations per minute
        this.efficiency = efficiency;  // Percentage (0.8 for 80%)
        this.currentRPM = 0; 
        guifolder.add(this, 'currentRPM', 0, maxRPM, 10).onChange((value) => {
     
    });    // Starts at rest
    }

    setThrottle(throttle) { // Throttle is a value between 0 and 1
        this.currentRPM = throttle * this.maxRPM;
    }

    getThrustForce(theta) { //
        // Calculate thrust based on power, RPM, and efficiency
        // console.log("theta: " + radiansToDegrees(theta));
        const thrust = this.power * this.efficiency * (this.currentRPM / this.maxRPM);
        return new THREE.Vector3(thrust,0,thrust);
    }
}

export default Engine;

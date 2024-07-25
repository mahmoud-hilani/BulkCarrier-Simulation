import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import Buoyancy from "../physics/Buoyancy"; // Import the Buoyancy class
import Engine from "../physics/Engine"; // Import the Buoyancy class

import GUI from "lil-gui";

class CargoShip {
  constructor(
    name,
    scene,
    path,
    mass,
    shipLength = 200,
    shipDraft = 4, //height
    shipBeam = 30
  ) {
    const gui = new GUI();
    const guifolder = gui.addFolder(name);
    

    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.ship = gltf.scene;
      scene.add(this.ship);
    });
    this.mass = mass;
    this.v = new THREE.Vector3(0, 0, 0);
    this.engine =new Engine(60_000_000,73,0.8,guifolder)
    guifolder.add(this, "mass", 1, 30_000_000, 1_000_000).onChange((value) => {
      this.updateMass(value);
      this.v = new THREE.Vector3(0, 0, 0);
    });    

    // Initialize Buoyancy
    this.buoyancy = new Buoyancy(this.mass, shipLength, shipDraft, shipBeam);
  }

  updateMass(newMass) {
    this.mass = newMass;
    this.buoyancy.updateMass(newMass);
    // console.log(this.mass)
  }
  get getPosition() {
    if (this.ship) return this.ship.position;
  }

  updatePosition(time, deltaTime) {
    if (this.ship) {
      let B = this.buoyancy.BuoyancyForce(this.ship, time);
      let WD = this.buoyancy.waterDrag(this.v.y);
      let T = this.engine.getThrustForce();
      
      if(!B.equals(new THREE.Vector3(0,0,0)) ) 
        {     
          T= new THREE.Vector3(0,0,0)
        }


        console.log(`T ${T.x}`);
        console.log(`B ${B.y}`);
        console.log(`v ${this.v.x}`);

      var s = B.add(WD.add(T));
      var y = s.y;
      //  this.ship.position.y += vY * deltaTime;
      // this.ship.position.add(a)
      // var result = vector1.clone().add(vector2).add(vector3);
      let a = s.clone().divideScalar(this.mass);
      const rudderAngle = 1 // Get rudder input (in radians, typically -0.6 to 0.6)

      // Turning rate and angular velocity
      const d = this.shipLength/2; // Adjust for desired turning speed
      const angularVelocity =  rudderAngle/this.mass ;
  
      // Update ship rotation
      this.ship.rotation.y += angularVelocity * deltaTime;
  
      // Calculate thrust force (including lateral component)
      // const lateralForce = thrustForce.clone().multiplyScalar(0.2 * rudderAngle); // Example calculation
      // thrustForce.add(lateralForce);
      // console.log(this.a.y)
      this.v.add(a.clone().multiplyScalar(deltaTime));
      this.ship.position.add(this.v.clone().multiplyScalar(deltaTime));
      console.log(`a ${a.x}`);
    }
  }
}

export { CargoShip };

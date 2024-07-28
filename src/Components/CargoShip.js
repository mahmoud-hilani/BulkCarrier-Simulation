import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import Buoyancy from "../physics/Buoyancy";
import Engine from "../physics/Engine"; // I
import Rudder from "../physics/Rudder"; // I

import { degreesToRadians } from "../Components/MathCalc"; // Import thethCalc";
import { gui } from "../../main.js"; //

class CargoShip {
  constructor(
    name,
    scene,
    path,
    mass,
    pos,
    shipLength = 200,
    shipDraft  = 12, //height
    shipBeam   = 30 
    
  ) {
    this.guifolder = gui.addFolder(name);

    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.ship = gltf.scene;
      this.scaling();
      this.ship.position.set(pos.x, pos.y, pos.z);
      scene.add(this.ship);
    });
    this.shipLength = shipLength;
    this.shipDraft = shipDraft;
    this.shipBeam = shipBeam;
    this.mass = mass;
    this.v = new THREE.Vector3(0, 0, 0);
    this.angularVelocity=0
    this.engine = new Engine(60_000_000, 73, 0.8, this.guifolder);
    this.buoyancy = new Buoyancy(this.mass, shipLength, shipDraft, shipBeam);
    this.rudder = new Rudder(shipLength, shipBeam, this.mass,this.guifolder);
    this.updateMass();
    this.gui()
    // Initialize Buoyancy
  }

  updatePosition(time, deltaTime) {
    if (this.ship) {
      // Update ship rotation (yaw)
      let angularAcceleration = this.rudder.updateYaw(deltaTime, this.v, this.mass);
       // Update angular velocity
    this.angularVelocity += angularAcceleration * deltaTime;

    // Apply damping to angular velocity
    const damping = 0.99; // Damping factor
    this.angularVelocity *= damping;      
      this.ship.rotation.y += this.angularVelocity*deltaTime;
      console.log( this.v)
      // this.ship.rotation.y = degreesToRadians(45)
      
      let B = this.buoyancy.BuoyancyForce(this.ship, time, this.shipYlevel);
      let WD = this.buoyancy.waterDrag(this.v.y);
      let T = this.engine.getThrustForce(angularAcceleration);
      // console.log(Math.cos(this.ship.rotation.y) +"  "+ Math.sin(this.ship.rotation.y))

      if (!B.equals(new THREE.Vector3(0, 0, 0))) {
        T = new THREE.Vector3(0, 0, 0);
      }

      var s = B.add(WD.add(T));
      let a = s.clone().divideScalar(this.mass);
      this.v.add(a.clone().multiplyScalar(deltaTime));
      this.pos=new THREE.Vector3(
        this.v.x*Math.cos(-this.ship.rotation.y)
      ,this.v.y
      ,this.v.z*Math.sin(-this.ship.rotation.y))
      this.pos.multiplyScalar(deltaTime)

      this.ship.position.add(this.pos);
      // console.log(this.ship.rotation);
    }
  }


gui(){
  this.guifolder.add( this, 'angularVelocity' ) .listen()
  this.guifolder.add( this.v, 'x' ).listen()
  this.guifolder.add( this.v, 'y' ).listen()
  this.guifolder.add( this.v, 'z' ).listen()

}
  scaling() {
    // Get the original dimensions of the loaded model
    const boundingBox = new THREE.Box3().setFromObject(this.ship);
    const originalLength = boundingBox.max.x - boundingBox.min.x;
    const originalDraft = boundingBox.max.y - boundingBox.min.y;
    const originalBeam = boundingBox.max.z - boundingBox.min.z;
    // Calculate scaling factors to match desired dimensions
    const lengthScale = this.shipLength / originalLength;
    const draftScale  = (this.shipDraft * 5) / originalDraft;
    const beamScale   = this.shipBeam / originalBeam;
    // Apply scaling
    this.ship.scale.set(beamScale, draftScale, lengthScale);
    this.shipYlevel = 6 * draftScale;
  }

  updateMass() {
    this.guifolder
      .add(this, "mass", 1, 80_000_000, 1_000_000)
      .onChange((newMass) => {
        this.mass = newMass;
        this.buoyancy.updateMass(newMass);
        this.rudder.updateMass(newMass);

        this.v.normalize 
      });

    // console.log(`m ${this.mass}`)
  }
  // get getPosition() {
  //   if (this.ship) return this.ship.position;
  // }

 
}
function print() {

  console.log(`B `);
  console.log(B);

  console.log(`v ${this.v.x}`);
  console.log(this.v);
}
export { CargoShip };

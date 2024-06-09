import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import Buoyancy from "../physics/Buoyancy"; // Import the Buoyancy class

class CargoShip {
  constructor(scene, path, mass) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.ship = gltf.scene;
      scene.add(this.ship);
      this.mass = mass;

      // Initialize Buoyancy
      this.buoyancy = new Buoyancy(1, mass);
      this.ship.position.set(100,0,500)

      // const baseMass = 100; // Define a reference mass (adjust as needed)
      // const scaleFactor = 1; // Cube root for 3D scaling
      //   this.ship.scale.set(scaleFactor, scaleFactor, scaleFactor);
      // console.log(this.ship)

      // Physics Setup
      // const shipBoundingBox = new THREE.Box3().setFromObject(this.ship);
      // const shipSize = shipBoundingBox.getSize(new THREE.Vector3());
      // const shipShape = new CANNON.Box(
      //   new CANNON.Vec3(shipSize.x / 2, shipSize.y / 2, shipSize.z / 2)
      // );

      // this.shipBody = new CANNON.Body({
      //   mass: mass,
      //   shape: shipShape,
      //   position: new CANNON.Vec3(0, 5, 0), // Adjust to ensure the ship floats
      // });

      // world.addBody(this.shipBody);
      // this.world = world;
    });
  }

  get getPosition() {
    return this.ship.position;
  }

  updatePosition() {
    if (this.ship) {
      // Apply buoyancy force
      this.buoyancy.applyCorrectBuoyancyForce(this.ship);
 
    }
  }
}

export { CargoShip };

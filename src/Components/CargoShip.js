import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import Buoyancy from "../physics/Buoyancy"; // Import the Buoyancy class

class CargoShip {
  constructor(scene, path, world, mass) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.ship = gltf.scene;
      scene.add(this.ship);

      // Physics Setup
      const shipBoundingBox = new THREE.Box3().setFromObject(this.ship);
      const shipSize = shipBoundingBox.getSize(new THREE.Vector3());
      const shipShape = new CANNON.Box(
        new CANNON.Vec3(shipSize.x / 2, shipSize.y / 2, shipSize.z / 2)
      );

      this.shipBody = new CANNON.Body({
        mass: mass,
        shape: shipShape,
        position: new CANNON.Vec3(0, 5, 0), // Adjust to ensure the ship floats
      });

      world.addBody(this.shipBody);
      this.world = world;

      // Initialize Buoyancy
      this.buoyancy = new Buoyancy(1/20);
    });
  }

  get getPosition() {
    return this.ship.position;
  }

  updatePosition() {
    if (this.ship) {
      // Apply buoyancy force
      this.buoyancy.applyBuoyancyForce(this.shipBody);

      // Sync Three.js mesh with Cannon.js body
      this.ship.position.copy(this.shipBody.position);
      this.ship.quaternion.copy(this.shipBody.quaternion);
    }
  }
}

export { CargoShip };

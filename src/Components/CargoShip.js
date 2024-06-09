import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import Buoyancy from "../physics/Buoyancy"; // Import the Buoyancy class
import { gui, sea } from "../../main.js";

class CargoShip {
  constructor(
    scene,
    path,
    mass,
    shipLength = 200,
    shipDraft = 4,
    shipBeam = 30
  ) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.ship = gltf.scene;
      scene.add(this.ship);
      this.mass = mass;
      // this.mass = mass;

      const folder = gui.addFolder("ship");
      folder
        .add(this, "mass", 1, 25 * 1000 * 1000, 1 * 1000 * 1000)
        .onChange(() => {
          this.buoyancy.updateMass(this.mass);
        });

      // Initialize Buoyancy
      this.buoyancy = new Buoyancy(this.mass, shipLength, shipDraft, shipBeam);
      // this.ship.position.set(350, 0, -1000);
      // console.log(this.ship)

      // const baseMass = 100; // Define a reference mass (adjust as needed)
      // const scaleFactor = 1; // Cube root for 3D scaling
      //   this.ship.scale.set(scaleFactor, scaleFactor, scaleFactor);
      // console.log(this.ship)

      // Physics Setup
      const shipBoundingBox = new THREE.Box3().setFromObject(this.ship);
      const shipSize = shipBoundingBox.getSize(new THREE.Vector3());
      // console.log(shipSize)

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

  updatePosition(time) {
    if (this.ship) {
      // Apply buoyancy force
      this.buoyancy.applyCorrectBuoyancyForce(this.ship, time);
    }
  }
}

export { CargoShip };

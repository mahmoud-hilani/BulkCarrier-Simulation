import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import Buoyancy from "../physics/Buoyancy.js";
import Engine from "../physics/Engine.js"; // I
import Rudder from "../physics/Rudder.js"; // I
import Drag from "../physics/Drag.js";
import { degreesToRadians } from "./MathCalc.js"; // Import thethCalc";
import { gui } from "../../main.js"; //

class CargoShip {
  constructor(
    name,
    scene,
    path,
    // enginePower,
    engine,
    start,
    shipLength = 200,
    shipDraft = 12, //height
    shipBeam = 30
  ) {
    this.guifolder = gui.addFolder(name);

    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.ship = gltf.scene;
      this.scaling();
      this.ship.position.set();
      scene.add(this.ship);
    });
    this.shipLength = shipLength;
    this.shipDraft = shipDraft;
    this.shipBeam = shipBeam;
    this.mass = 5 * 1000 * 1000;
    this.pos = new THREE.Vector3(0, 0, 0);
    this.v = new THREE.Vector3(0, 0, 0);
    this.a = new THREE.Vector3(0, 0, 0);
    this.T = new THREE.Vector3(0, 0, 0);
    this.B = new THREE.Vector3(0, 0, 0);
    this.WD = new THREE.Vector3(0, 0, 0);
    this.AD = new THREE.Vector3(0, 0, 0);
    this.angularVelocity = 0;
    this.updateMass();

    this.Drag = new Drag(shipLength, shipDraft, shipBeam);
    // this.engine = new Engine(enginePower, 73, 0.8, this.guifolder);
    this.engine = engine;
    this.buoyancy = new Buoyancy(
      this.mass,
      shipLength,
      shipDraft,
      shipBeam,
      this.Drag
    );
    this.rudder = new Rudder(
      shipLength,
      shipBeam,
      this.mass,
      this.guifolder,
      this.Drag
    );
    this.position = new THREE.Vector3(start.x, start.y, start.z);
    this.gui();
  }

  updatePosition(time, deltaTime) {
    if (this.ship) {
      this.B.copy(
        this.buoyancy.calculateForce(this.position, time, this.shipYlevel)
      );
      let sinkingDrag = this.Drag.BoyuancyWaterDrag(this.v.y);
      this.T.copy(this.engine.getThrustForce());
      // turn) off the engine when sinking
      this.AD.copy(this.Drag.movingAirDrag(this.v.x));
      this.WD.copy(this.Drag.movingWaterDrag(this.v.x));
      // if (!this.B.equals(new THREE.Vector3(0, 0, 0))) {
      //   T = new THREE.Vector3(0, 0, 0);
      // }
      let theta = this.rudder.updateYaw(deltaTime, this.v, this.mass);
      this.ship.rotation.y += theta;

      var s = this.B.add(
        sinkingDrag
          .clone()
          .add(this.T.clone().add(this.WD.clone().add(this.AD)))
      );
      this.a.copy(s.clone().divideScalar(this.mass));
      this.v.add(this.a.clone().multiplyScalar(deltaTime));
      this.pos.set(
        this.v.x * Math.cos(-this.ship.rotation.y),
        this.v.y,
        this.v.z * Math.sin(-this.ship.rotation.y)
      );

      this.pos.multiplyScalar(deltaTime);
      this.position.add(this.pos);
      this.ship.position.set(this.position.x, this.position.y, this.position.z);
    }
  }

  gui() {
    this.guifolder
      .add(this.engine, "currentRPM", 0, this.engine.maxRPM, 10)
      .onChange((value) => {});

    this.guifolder.add(this.a, "x").listen().name("acceleration");
    this.guifolder.add(this.v, "x").listen().name("velocity");
    this.guifolder.add(this.v, "y").listen().name("velocity Y");

    let position = this.guifolder.addFolder("position");
    position.add(this.position, "x").listen();
    position.add(this.position, "y").listen();
    position.add(this.position, "z").listen();
    let forces = this.guifolder.addFolder("forces");
    forces.add(this.T, "x").listen().name("T");
    forces.add(this.B, "y").listen().name("B");
    forces.add(this.WD, "x").listen().name("WD");
    forces.add(this.AD, "x").listen().name("AD");
  }
  scaling() {
    // Get the original dimensions of the loaded model
    const boundingBox = new THREE.Box3().setFromObject(this.ship);
    const originalLength = boundingBox.max.x - boundingBox.min.x;
    const originalDraft = boundingBox.max.y - boundingBox.min.y;
    const originalBeam = boundingBox.max.z - boundingBox.min.z;
    // Calculate scaling factors to match desired dimensions
    const lengthScale = this.shipLength / originalLength;
    const draftScale = (this.shipDraft * 5) / originalDraft;
    const beamScale = this.shipBeam / originalBeam;
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

        this.v.set(0, 0, 0);
      });
  }
}

export { CargoShip };

import { degreesToRadians } from "../Components/MathCalc";
class Rudder {
  constructor(shipLength, shipBeam, shipMass, guifolder, drag) {
    this.drag = drag;
    this.shipLength = shipLength;
    this.shipMass = shipMass;
    this.rudderAngle = 0; // Rudder angle in radians
    this.rudderForceCoefficient = 1.0; // Realistic rudder force coefficient
    this.rudderArea = 0.015 * shipBeam * shipLength; // 1.5% of the submerged lateral area
    this.rudderDistance = shipLength * 0.5; // Assume rudder is at 90% of the ship length
    this.shipInertia =
      (1 / 1200) * shipMass * (shipLength ** 2 + shipBeam ** 2); // Moment of inertia for yaw
    // this.shipInertia = (1 / 12) * shipMass * (shipBeam/2) ** 2; // Moment of inertia for yaw
    this.angularAcceleration = 0; // Initial angular velocity
    this.angularVelocity = 0; // Initial angular velocity
    guifolder.add(this, "rudderAngle", -35, 35, 10);
    guifolder.add(this, "angularAcceleration").listen();
    guifolder.add(this, "angularVelocity").listen();
  }
  updateMass(newMass) {
    this.shipMass = newMass;
  }
  calculateTurningMoment(velocity) {
    const rudderForce =
      this.rudderForceCoefficient *
      this.rudderArea *
      velocity.lengthSq() *
      Math.sin(degreesToRadians(this.rudderAngle));
      let D =
      this.drag.rotatingAirDrag(this.angularVelocity) +
      this.drag.rotatingWaterDrag(this.angularVelocity);
    const moment = (rudderForce) * this.rudderDistance;
    return moment;
  }

  // Update ship's yaw based on the turning moment
  updateYaw(deltaTime, velocity) {
    const moment = this.calculateTurningMoment(velocity);
    //    console.log(this.shipMass)
    //    console.log(moment)
    
   
    this.angularAcceleration = moment / this.shipInertia;
    this.angularVelocity += this.angularAcceleration * deltaTime;

    //Apply damping to angular velocity
    const damping = 0.99; // Damping factor
    this.angularVelocity *= damping;

    return this.angularVelocity * deltaTime;
  }
}

export default Rudder;

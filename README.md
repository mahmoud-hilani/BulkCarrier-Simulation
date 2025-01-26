
# Bulk Carriers Simulation

A 3D simulation project that models and visualizes the physical forces acting on bulk carriers. This project leverages **Three.js** to create an interactive environment, incorporating buoyancy, drag, engine thrust, rudder dynamics, and wind effects.

## Features

- **Buoyancy Simulation:** Models the effect of buoyant forces based on water density and ship parameters.
- **Drag Forces:** Calculates air and water drag to simulate realistic resistance during movement.
- **Engine Thrust:** Models engine-generated thrust forces for propulsion.
- **Rudder Dynamics:** Simulates turning moments and yaw based on rudder position and velocity.
- **Wind Forces:** Applies external wind forces on the ship, affecting navigation.
- **3D Visualization:** Real-time rendering of the ship and surrounding environment using Three.js.

## Setup

### Prerequisites

- Node.js installed on your system.
- A modern web browser that supports WebGL.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mahmoud-hilani/BulkCarrier-Simulation.git
   cd BulkCarrier-Simulation
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Classes and Their Functions

### `Buoyancy.js`

- **Purpose:** Models buoyant forces acting on the ship.
- **Key Functions:**
  - `updateMass(newMass)`: Updates the ship's mass.
  - `calculateForce(position, shipYlevel)`: Calculates the buoyant force and adjusts the ship's position based on water displacement.

### `Drag.js`

- **Purpose:** Calculates drag forces from air and water.
- **Key Functions:**
  - `movingAirDrag(shipVelocity)`: Computes drag caused by air.
  - `movingWaterDrag(shipVelocity)`: Computes drag caused by water.
  - `rotatingAirDrag(shipVelocity)`: Computes rotational drag in air.
  - `rotatingWaterDrag(shipVelocity)`: Computes rotational drag in water.

### `Engine.js`

- **Purpose:** Simulates thrust forces generated by the ship's engines.
- **Key Functions:**
  - `setRPM(RPM)`: Sets the engine's RPM.
  - `getThrustForce()`: Returns the thrust force based on engine power and efficiency.

### `Rudder.js`

- **Purpose:** Implements rudder dynamics, calculating turning moments and drag moments.
- **Key Functions:**
  - `calculateTurningMoment(velocity)`: Calculates the turning moment caused by the rudder.
  - `updateYaw(deltaTime, velocity)`: Updates the ship's yaw based on turning moments and angular velocity.

### `wind.js`

- **Purpose:** Models wind forces impacting the ship's movement.
- **Key Functions:**
  - `calculateForce(airv, theta)`: Calculates the combined forces of wind and water on the ship.

### `main.js`

- **Purpose:** The core script to initialize and run the simulation.
- **Key Functions:**
  - Sets up the scene, renderer, camera, and controls.
  - Runs the simulation loop to update ship positions and environmental effects.

## Technologies

- **Three.js:** For 3D rendering.
- **lil-gui:** To provide a user interface for modifying simulation parameters.
- **JavaScript Modules:** To organize simulation components (e.g., buoyancy, drag, rudder).

## Future Enhancements

- Add collision detection with islands and other ships.
- Incorporate real-world weather data for dynamic wind and sea conditions.
- Enhance visuals with realistic textures and lighting.

## Contributing

Contributions are welcome! If you’d like to contribute, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Three.js Documentation](https://threejs.org/docs/)
- [lil-gui](https://lil-gui.georgealways.com/)

  import { Water } from 'three/examples/jsm/objects/Water.js';
import * as THREE from 'three';
import { scene } from "../../main.js";

class Sea {
  constructor() {
    this.waveFrequency = 6;
    this.waveAmplitude = 1;

    this.water = new Water(
      new THREE.PlaneGeometry(10000, 10000),
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('./src/textures/waternormals.jpg', function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
      }
    );

    this.water.rotation.x = -Math.PI / 2;
    // this.water.position.set(0,-5,0);
    scene.add(this.water);
  }

  // getWaterHeightAt(x, z, time) {
  //   // Sample the wave height using the water's shader
  //   const waveAmplitude = 10; // Adjust based on your wave amplitude in the shader
  //   const waveFrequency = 0.2; // Adjust based on your wave frequency in the shader
  //   return Math.sin((x + time) * waveFrequency) * waveAmplitude;
  // }
  getWaterLevel(x, z, time) {
    // Smoother wave function
    return (
      Math.sin(x * this.waveFrequency + time) * this.waveAmplitude * 0.5 +
      Math.cos(z * this.waveFrequency + time) * this.waveAmplitude * 0.5 
    );
  }
  update(light,time){
    this.updateSunPosition(light)
    this.updateTime(time )
  }   
  updateTime(time ){
    this.water.material.uniforms["time"].value = time / 2;

  }
  updateSunPosition(light) {
    this.water.material.uniforms["sunDirection"].value.copy(light).normalize();

  }
}

export { Sea };

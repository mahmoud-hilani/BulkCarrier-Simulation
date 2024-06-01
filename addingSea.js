// import * as THREE from "three";
// import { Water } from "three/examples/jsm/objects/Water.js";
// import { water, scene } from "./main.js";

// export function addingSea() {
//   // Water
//    waterGeometry = new THREE.PlaneGeometry(10000, 10000);
//   water = new Water(waterGeometry, {
//     textureWidth: 512,
//     textureHeight: 512,
//     waterNormals: new THREE.TextureLoader().load(
//       "./src/textures/waternormals.jpg",
//       function (texture) {
//         texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//       }
//     ),
//     sunDirection: new THREE.Vector3(),
//     sunColor: 16711680,
//     waterColor: 4286945,
//     distortionScale: 3.7,
//     fog: scene.fog !== undefined,
//   });
//   water.rotation.x = -Math.PI / 2;
//   //color control
//   water.material.uniforms["distortionScale"].value = 10.7; // 3.7
//   water.material.uniforms["waterColor"].value.set(4286945); //0x4169e1

//   // =========================
//   //dont touch
//   /*
//         water.material.uniforms['waterNormals'].value = new THREE.TextureLoader().load('./path/to/your/texture.jpg', function (texture) {
//             texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
//         });
//     */
//   // ==========================
//   scene.add(water);
// }

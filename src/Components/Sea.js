
import { Water } from 'three/examples/jsm/objects/Water.js';
import * as THREE from 'three';
import {  scene } from "../../main.js";


 class Sea {
    // water =  new Water(
    //     new THREE.PlaneGeometry(10000, 10000),
    //         {   
    //             textureWidth: 512,
    //             textureHeight: 512,
    //             waterNormals: new THREE.TextureLoader().load('./src/textures/waternormals.jpg', function (texture) {
    //                 texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //             }),
    //             sunDirection: new THREE.Vector3(),
    //             sunColor: 0xff0000,
    //             waterColor: 0x4169e1,
    //             distortionScale: 3.7,
    //             rotation: THREE
    //         }
    //     );
constructor(){ 
    this.water  = new Water(
        new THREE.PlaneGeometry(10000, 10000),
            {   
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: new THREE.TextureLoader().load('./src/textures/waternormals.jpg', function (texture) {
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                }),
                sunDirection: new THREE.Vector3(),
                sunColor: 0xff0000,
                waterColor: 0x4169e1,
                distortionScale: 3.7,
                
            },
            //  rotation.x = - Math.PI / 2
        );
    // this.sea.fog = scene.fog !== undefinedconsole

    this.water.rotation.x = - Math.PI / 2;
    //color control
    // this.water.material.uniforms['distortionScale'].value = 10.7; // 3.7
    // this.water.material.uniforms['waterColor'].value.set(0x4169e1);//0x4169e1
    scene.add(this.water);

    // =========================
    //dont touch
    /*
        water.material.uniforms['waterNormals'].value = new THREE.TextureLoader().load('./path/to/your/texture.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        });
    */ 
    // ==========================
}
}
export {Sea
}; 

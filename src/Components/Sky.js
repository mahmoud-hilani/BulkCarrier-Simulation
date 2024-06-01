import { Sky } from "three/examples/jsm/objects/Sky.js";
import { scene, light } from "../../main.js";
import * as THREE from "three";

export class MSky {
    constructor(){
        this.sky = new Sky();
        this.sky.scale.setScalar(10000);
        this.sky.material.uniforms["sunPosition"].value.copy(light.position);

        this.skyUniforms = this.sky.material.uniforms;
        this.skyUniforms["turbidity"].value = 10;
        this.skyUniforms["rayleigh"].value = 2;
        this.skyUniforms["mieCoefficient"].value = 0.005;
        this.skyUniforms["mieDirectionalG"].value = 0.8;
        scene.add(this.sky);
            }
update(){
    this.sky.material.uniforms["sunPosition"].value.copy(light.position);

}
        }


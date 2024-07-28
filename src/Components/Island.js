import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { random  } from './MathCalc.js';
class Island{
    constructor(scene,path,distanc){
        const loader = new GLTFLoader();
        loader.load(path,(gltf) => {
            if(distanc){
                gltf.scene.position.set(distanc.x,distanc.y,distanc.z);
            }else{
                gltf.scene.position.set(400,-1,3000);
            }
            gltf.scene.scale.set(30,30,30);
            scene.add(gltf.scene);
        });
    }
    update (){
        if( this.ship ){
            this.ship.rotation.x += 1;
            this.ship.translateX(this.speed.speedOfShip);
        }
    }
    

}

export {Island}; 


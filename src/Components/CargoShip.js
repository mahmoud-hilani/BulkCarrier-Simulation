import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { calcdegre  } from './MathCalc.js';
import { random  } from './MathCalc.js';
import { calcRadean  } from './MathCalc.js';
class CargoShip{
    constructor(scene,path){
        const loader = new GLTFLoader();
        loader.load(path,(gltf) => {
            gltf.scene.position.set(0,6,0);
            gltf.scene.scale.set(8,8,8);
            scene.add(gltf.scene);
            this.cornerX = 0;
            this.speed = 1;
            this.ship = gltf.scene;
            this.vibrateRate = random(1,5) * 0.0001;
            this.rotateRate = 0.017453;
            this.vibCorner = 1;
        });
    }
    update (){
        if( this.ship ){
            this.ship.rotation.x += 1;
            this.ship.translateX(this.speed.speedOfShip);
        }
    }

    pRoatate(){
        this.ship.rotation.x += 0.01832; 
        console.log('ss');
    }
    
    go(){
        this.ship.position.x += this.speed * Math.sin(this.cornerX); 
        this.ship.position.z += this.speed * Math.cos(this.cornerX); 
        console.log('a');
    }

}

export {CargoShip}; 


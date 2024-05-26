// Import necessary modules
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import './style.css';
// ======================================
import { CargoShip } from './src/Components/CargoShip.js';
import { Island } from './src/Components/Island.js';
// ======================================
// Your Three.js setup and initialization code here

let camera, scene, renderer;
let controls, water, sun;
// ======================
// my cmp
let cargoShip ;
let island ;
let island2 ;
let island3 ;
let island4 ;





init();
animate();

function init() {
    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    document.body.appendChild(renderer.domElement);

    // Scene
    scene = new THREE.Scene();
    cargoShip = new CargoShip(scene,'./src/Models/c2/scene.gltf');
    island = new Island(scene,'./src/Models/island/scene.gltf',{x:2400,y:-1,z:2000});
    island2 = new Island(scene,'./src/Models/island/scene.gltf',{x:-2400,y:-1,z:-1000});
    island3 = new Island(scene,'./src/Models/island/scene.gltf',{x:400,y:-1,z:1000});
    island4 = new Island(scene,'./src/Models/island/scene.gltf',{x:400,y:3,z:-1000});
    
    // Camera
    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight,10,20000);
    camera.position.set(1000, 30, 100);
    

    // constrol the camera
    // camera.position.set(100, 100, 10000); // Change to desired position
    // camera.fov = 55; // Field of view
    // camera.aspect = window.innerWidth / window.innerHeight; // Aspect ratio
    // camera.near = 10; // Near clipping plane
    // camera.far = 20000; // Far clipping plane
    // camera.updateProjectionMatrix(); // Update the camera's projection matrix


    // Sun
    sun = new THREE.Vector3();

    // Water
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    water = new Water(
        waterGeometry,
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
            fog: scene.fog !== undefined
        }
    );
    water.rotation.x = - Math.PI / 2;
    //color control
    water.material.uniforms['distortionScale'].value = 10.7; // 3.7
    water.material.uniforms['waterColor'].value.set(0x4169e1);//0x4169e1
    // =========================
    //dont touch
    /*
        water.material.uniforms['waterNormals'].value = new THREE.TextureLoader().load('./path/to/your/texture.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        });
    */ 
    // ==========================
    scene.add(water);

    // Skybox
    const sky = new Sky();
    sky.scale.setScalar(10000);
    scene.add(sky);

    const skyUniforms = sky.material.uniforms;
    skyUniforms['turbidity'].value = 10;
    skyUniforms['rayleigh'].value = 2;
    skyUniforms['mieCoefficient'].value = 0.005;
    skyUniforms['mieDirectionalG'].value = 0.8;

    // const parameters = {
    //     elevation: 2,
    //     azimuth: 180
    // };
    // sun controller
    const parameters = {
        elevation: 2, // Change to desired elevation
        azimuth: 180 // Change to desired azimuth
    };

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const sceneEnv = new THREE.Scene();
    let renderTarget;

    function updateSun() {
        // const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);//default
        const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
        const theta = THREE.MathUtils.degToRad(parameters.azimuth);

        sun.setFromSphericalCoords(1, phi, theta);

        sky.material.uniforms['sunPosition'].value.copy(sun);
        water.material.uniforms['sunDirection'].value.copy(sun).normalize();

        if (renderTarget !== undefined) renderTarget.dispose();
        sceneEnv.add(sky);
        renderTarget = pmremGenerator.fromScene(sceneEnv);
        scene.add(sky);
        scene.environment = renderTarget.texture;
    }
    
    
    updateSun();

    // Orbit Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set(0, 10, 0);
    controls.minDistance = 40.0;
    controls.maxDistance = 200.0;
    controls.update();

    // Window resize handling
    window.addEventListener('resize', onWindowResize);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
    requestAnimationFrame(animate);
    if(cargoShip.ship){
        // camera.lookAt(cargoShip.ship.position);
        
    }
    render();    
}

function render() {
    water.material.uniforms['time'].value += 1.0 / 60.0;
    renderer.render(scene, camera);
}
window.addEventListener('keydown',function(e){
    if(e.key == 'ArrowUp'){
        cargoShip.ship.go();
        console.log('ppppppp')
    }
    else if(e.key=='ArrowLeft'){
        if(cargoShip.ship){
            cargoShip.ship.pRoatate();
        }
    }
    else if(e.key=='ArrowRight'){
        if(cargoShip.ship){

        }
    }
});

// ====================================
// camera function 
let cameraSpeed = 1;  

function cameraForWord(){
    camera.position.z-=1;
}
function cameraBackWord(){
    camera.position.z+=1;
}
function cameraDown(){
    camera.position.y-=1;
}
function cameraUp(){
    camera.position.y-=1;
}

function cameraGoRight(){
    
}
function cameraGoleft(){

}

function cameraRightRotate(){
    camera.rotation.y-=1;
}

function cameraLeftRotate(){
    camera.rotation.y-=1;
}
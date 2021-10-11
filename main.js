import * as THREE from './node_modules/three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

// scene camera renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotation.order = 'YXZ';
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;

document.body.appendChild( renderer.domElement );


// ajout des cube / plans
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


const material2 = new THREE.MeshStandardMaterial( { color: 0x11111 } );
const plane = new THREE.PlaneBufferGeometry(100,100,1);
const planemesh = new THREE.Mesh(plane,material2);
scene.add(planemesh);


planemesh.receiveShadow= true
cube.castShadow = true
cube.receiveShadow=false

// Lumiere
const directionalLight = new THREE.DirectionalLight( 0xffffaa, 0.3 );
directionalLight.position.set( 0, 25,100);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default
scene.add( directionalLight );
  
planemesh.position.z=-1;


camera.position.z = 2;

const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
scene.add( helper );



const animate = function () {
  requestAnimationFrame( animate );

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );
};

let fpsControls = new PointerLockControls( camera ,  document.body );

//add event listener to your document.body
document.body.addEventListener( 'click', function () {
    //lock mouse on screen
    document.body.requestPointerLock();
}, false );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
animate();


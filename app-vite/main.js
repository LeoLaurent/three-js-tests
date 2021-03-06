import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// SCENE and CAMERA

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 5);
camera.lookAt( 0, 0, 0 );


// WINDOW RESIZE

const onWindowResize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
};


// RENDERER

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
window.addEventListener( 'resize', onWindowResize );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );


// LIGHTS

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 2, 1);
light.castShadow = true;
scene.add(light);

light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;


// OBJECTS

const cube_geometry = new THREE.BoxGeometry();
const cube_material = new THREE.MeshBasicMaterial( { color: 0xcc00aa, transparent: true, opacity: 0.3,  } );
const cube = new THREE.Mesh( cube_geometry, cube_material );
scene.add( cube );

const cube2 = new THREE.Mesh( cube_geometry, cube_material );
cube2.scale.set(0.95,0.95,0.95);
scene.add( cube2 );

const x = 0, y = 0;

const heartShape = new THREE.Shape();
heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const heart_geometry = new THREE.ShapeGeometry( heartShape );
const heart_material = new THREE.MeshPhongMaterial( { color: 0xff0000, side: THREE.DoubleSide } );
const heart = new THREE.Mesh( heart_geometry, heart_material );

heart.scale.set(0.035,0.035,0.035);
heart.geometry.center();
heart.position.set(0,0,0);
cube2.castShadow = true;
heart.rotation.z += Math.PI;

scene.add( heart );

const plane_geometry = new THREE.PlaneGeometry( 5, 5 );
const plane_material = new THREE.ShadowMaterial( {color: 0x00aa00, side: THREE.DoubleSide, transparent: true, opacity: 0.5} );
const plane = new THREE.Mesh( plane_geometry, plane_material );
plane.receiveShadow = true;
plane.rotation.x -= Math.PI/2;
plane.translateZ(-1);
scene.add( plane );

// Controls

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 1, 0 );
controls.update();


// ANIMATION

const animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
    cube2.rotation.x -= 0.005;
    cube2.rotation.y -= 0.01;

    heart.rotation.y += 0.005;

    renderer.render( scene, camera );
};

animate();
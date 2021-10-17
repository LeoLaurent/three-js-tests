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
renderer.localClippingEnabled = true;
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

const delta_texture_bg = new THREE.TextureLoader().load( 'textures/deltarune_bg.jpg' );
delta_texture_bg.wrapS = THREE.RepeatWrapping;
delta_texture_bg.wrapT = THREE.RepeatWrapping;
delta_texture_bg.repeat.set( 4, 4 );
const delta_material_bg = new THREE.MeshPhongMaterial( { map: delta_texture_bg, transparent: true, opacity: 0.3 } );

const delta_texture_cube = new THREE.TextureLoader().load( 'textures/deltarune_cube.jpg' );
delta_texture_cube.wrapS = THREE.RepeatWrapping;
delta_texture_cube.wrapT = THREE.RepeatWrapping;
delta_texture_cube.repeat.set( 0.5, 0.5 );
const delta_material_cube = new THREE.MeshBasicMaterial( { map: delta_texture_cube, transparent: true, opacity: 0.3 } );

// Cubes

const cube_geometry = new THREE.BoxGeometry();

const cube = new THREE.Mesh( cube_geometry, delta_material_cube );
cube.castShadow = true;

const cube2 = new THREE.Mesh( cube_geometry, delta_material_cube );
cube2.scale.set(0.95,0.95,0.95);
cube2.castShadow = true;

scene.add( cube, cube2 );

// Heart

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
heart.rotation.z += Math.PI;

scene.add( heart );


// Clipping Planes

const clip_plane_left = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 5 );
const clip_plane_right = new THREE.Plane( new THREE.Vector3( -1, 0, 0 ), 5 );
const clip_plane_fwd = new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 5 );
const clip_plane_bwd = new THREE.Plane( new THREE.Vector3( 0, 0, -1 ), 5 );


// Planes

const plane_geometry = new THREE.PlaneGeometry( 10, 10, 20, 20 );

const init_plane_geometry = function () {
    let { array } = plane_geometry.attributes.position;
    for (let i = 0; i < array.length; i += 3)
        {
        let x = array[i];
        let y = array[i + 1];
        let z = array[i + 2];

        array[i + 2] = z - Math.random()*0.5 ;
    }
};
init_plane_geometry();

const plane = new THREE.Mesh( plane_geometry, delta_material_bg );
plane.material.flatShading = THREE.FlatShading;
plane.material.clippingPlanes = [ clip_plane_left, clip_plane_right, clip_plane_bwd, clip_plane_fwd ];
plane.material.clipShadows = true;
//plane.castShadow = true;
//plane.receiveShadow = true;
plane.position.set(-5, -2, 0);
plane.rotation.x -= Math.PI/2;

const shadow_material = new THREE.ShadowMaterial( { color: 0x003300, side: THREE.DoubleSide, transparent: true, opacity: 0.1} );
const plane_shadow = new THREE.Mesh( plane_geometry, shadow_material );
plane_shadow.receiveShadow = true;
plane_shadow.position.set(-5, -2, 0);
plane_shadow.rotation.x -= Math.PI/2;

scene.add( plane, plane_shadow );

const plane2 = plane.clone();
plane2.scale.x = -1;
plane2.position.x += 10;

const plane_shadow2 = plane_shadow.clone();
plane_shadow2.scale.x = -1;
plane_shadow2.position.x += 10;

scene.add( plane2, plane_shadow2 );

const plane3 = plane.clone();
plane3.scale.y = -1;
plane3.position.z += 10;

const plane_shadow3 = plane_shadow.clone();
plane_shadow3.scale.y = -1;
plane_shadow3.position.z += 10;

scene.add( plane3, plane_shadow3 );

const plane4 = plane3.clone();
plane4.scale.x = -1;
plane4.position.x += 10;

const plane_shadow4 = plane_shadow3.clone();
plane_shadow4.scale.x = -1;
plane_shadow4.position.x += 10;

scene.add( plane4, plane_shadow4 );



// CONTROLS

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0, 0 );
controls.update();


// ANIMATION

console.log(plane.geometry.attributes.position.array);

const new_plane_x = function (x) {
    let new_x = 0.;
    if (x > 10) {
        new_x = -10;
    }
    else {
        new_x = x + 0.005;
    }
    return new_x;
};

const new_plane_z = function (z) {
    let new_z = 0.;
    if (z < -10) {
        new_z = 10;
    }
    else {
        new_z = z - 0.005;
    }
    return new_z;
};


const animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.005;
    cube2.rotation.x -= 0.005;
    cube2.rotation.y -= 0.01;

    heart.rotation.y += 0.005;

    plane.position.x = new_plane_x( plane.position.x ) ;
    plane2.position.x = new_plane_x( plane2.position.x ) ;
    plane3.position.x = new_plane_x( plane3.position.x ) ;
    plane4.position.x = new_plane_x( plane4.position.x ) ;
    plane_shadow.position.x = new_plane_x( plane_shadow.position.x ) ;
    plane_shadow2.position.x = new_plane_x( plane_shadow2.position.x ) ;
    plane_shadow3.position.x = new_plane_x( plane_shadow3.position.x ) ;
    plane_shadow4.position.x = new_plane_x( plane_shadow4.position.x ) ;

    plane.position.z = new_plane_z( plane.position.z ) ;
    plane2.position.z = new_plane_z( plane2.position.z ) ;
    plane3.position.z = new_plane_z( plane3.position.z ) ;
    plane4.position.z = new_plane_z( plane4.position.z ) ;
    plane_shadow.position.z = new_plane_z( plane_shadow.position.z ) ;
    plane_shadow2.position.z = new_plane_z( plane_shadow2.position.z ) ;
    plane_shadow3.position.z = new_plane_z( plane_shadow3.position.z ) ;
    plane_shadow4.position.z = new_plane_z( plane_shadow4.position.z ) ;

    renderer.render( scene, camera );
};

animate();
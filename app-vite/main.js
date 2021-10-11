import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 3);
camera.lookAt( 0, 0, 0 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const cube_geometry = new THREE.BoxGeometry();
const cube_material = new THREE.MeshBasicMaterial( { color: 0xcc00aa, transparent: true, opacity: 0.5,  } );
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
const heart_material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const heart = new THREE.Mesh( heart_geometry, heart_material );

heart.scale.set(0.035,0.035,0.035);
heart.geometry.center();
heart.translateY(-0.08)
heart.material.side = THREE.DoubleSide;
heart.rotation.z += Math.PI;

scene.add( heart );

const plane_geometry = new THREE.PlaneGeometry( 1, 1 );
const plane_material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( plane_geometry, plane_material );
scene.add( plane );

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
import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,-5,3);
camera.lookAt( 0, 0, 0 );
const renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled= true
document.body.appendChild(renderer.domElement)

const plane_geometry = new THREE.PlaneGeometry( 50, 50 );
const plane_material = new THREE.MeshStandardMaterial(0xff0000);
const plane = new THREE.Mesh( plane_geometry, plane_material);
plane.receiveShadow= true
scene.add( plane );


const cube_geometry = new THREE.BoxGeometry(1,1)
const cube_material = new THREE.MeshStandardMaterial(0xffffff);
const cube = new THREE.Mesh( cube_geometry, cube_material);
cube.position.set(0,0,1);
cube.castShadow= true;
scene.add(cube);

const light = new THREE.DirectionalLight(0xffffff, 1,100 )
light.position.set(-2,-2,5);
light.castShadow = true;
light.shadowMapWidth = 1024; // default is 512
light.shadowMapHeight = 1024; // default is 512
scene.add(light);


renderer.render(scene,camera);


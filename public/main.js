import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // red
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // green
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // blue
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // yellow
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // magenta
  new THREE.MeshBasicMaterial({ color: 0x00ffff })  // cyan
];

const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 5;
/*
function animate() {

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render( scene, camera );

}
  */
 const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.enableZoom = true;

function animate() {
  renderer.render( scene, camera );
}

async function cubeRotation() {
  const xSlider = document.getElementById('xRotation');
  const ySlider = document.getElementById('yRotation');
  const zSlider = document.getElementById('zRotation');

  xSlider.addEventListener('input', () => {
    cube.rotation.x = THREE.MathUtils.degToRad(xSlider.value);
  });

  ySlider.addEventListener('input', () => {
    cube.rotation.y = THREE.MathUtils.degToRad(ySlider.value);
  });

  zSlider.addEventListener('input', () => {
    cube.rotation.z = THREE.MathUtils.degToRad(zSlider.value);
  });
    const camX = document.getElementById('camX');
    const camY = document.getElementById('camY');
    const camZ = document.getElementById('camZ');
    camX.addEventListener('input', () => {
        camera.position.x = camX.value/100
    });

    camY.addEventListener('input', () => {
        camera.position.y = camY.value/100
    });

    camZ.addEventListener('input', () => {
        camera.position.z = camZ.value/100
    });
}

cubeRotation();

function spin(c, t) {

  c.rotation.x += 0.01;
  c.rotation.y += 0.01;

  renderer.render( scene, camera );

}

function addCube() {
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const randColor = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  const material = new THREE.MeshBasicMaterial( { color: randColor } );
  const cube = new THREE.Mesh( geometry, material );

  cube.position.x = (Math.random() - 0.5) * 10; // range -5 to +5
  cube.position.y = (Math.random() - 0.5) * 10; // range -5 to +5
  cube.position.z = (Math.random() - 0.5) * 10; // range -5 to +5

  scene.add( cube );

  renderer.setAnimationLoop( t => spin(cube, t));
}

window.addEventListener('click', addCube);

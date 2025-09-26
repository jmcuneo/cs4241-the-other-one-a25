import * as THREE from 'three';

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

window.onload= () => {
    const slider = document.createElement("input")
    slider.type="range"
    slider.onchange
    document.body.appendChild(slider)
}
  */

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
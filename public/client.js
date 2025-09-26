import * as THREE from "https://unpkg.com/three@0.180.0/build/three.module.js";
// Or import specific components

// 1. Scene, Camera, Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "renderer"
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xccccff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const textureLoader = new THREE.TextureLoader();
// 2. Create a 3D object (e.g., a cube)
let texture = textureLoader.load('/assets/egg_skin.png')
texture.repeat.set(1.3, 0.9);
const geometry = new THREE.SphereGeometry(1,32,16)
const material = new THREE.MeshStandardMaterial({ map: texture, flatShading: true}); // green color
const ellipse = new THREE.Mesh(geometry, material);
ellipse.scale.set(1.3,0.9,1)
scene.add(ellipse);

material.needsUpdate = true

// 3. Position the camera
camera.position.z = 5;

// 4. Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the ellipse
    ellipse.rotation.x += 0.01;
    ellipse.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// 5. Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Create raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Listen for clicks on the window
window.addEventListener('click', (event) => {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);

    // Check if it intersects the ellipse mesh
    const intersects = raycaster.intersectObject(ellipse);

    if (intersects.length > 0) {
        start(event)
        // Example action: scale it
        ellipse.scale.set(1.5, 1.1, 1);
    }
});

const start = function (event) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()

    const canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    canvas.width = canvas.height = 512
    const ctx = canvas.getContext('2d')

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement('audio')
    document.body.appendChild(audioElement)

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 1024 // 512 bins
    const player = audioCtx.createMediaElementSource(audioElement)
    player.connect(audioCtx.destination)
    player.connect(analyser)

    // make sure, for this example, that your audiofle is accesssible
    // from your server's root directory... here we assume the file is
    // in the ssame location as our index.html file
    audioElement.src = './assets/click.wav'
    audioElement.play()

    const results = new Uint8Array(analyser.frequencyBinCount)
}

animate();

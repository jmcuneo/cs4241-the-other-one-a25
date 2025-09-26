import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cubes = [];
const geometry = new THREE.BoxGeometry(1, 1, 1);

let score = 0;
let missed = 0;
let fallSpeed = 0.02;
let gameOver = false;

setInterval(() => {
    if (gameOver) return;
    const material = new THREE.MeshBasicMaterial({color: 0xff0000});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set((Math.random() - 0.5) * 10, 6, 0);
    scene.add(cube);
    cubes.push(cube);
}, 1000);

setInterval(() => {
    if (!gameOver) fallSpeed += 0.005;
}, 10000);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
    if (gameOver) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const hits = raycaster.intersectObjects(cubes);
    if (hits.length > 0) {
        const hit = hits[0].object;
        scene.remove(hit);
        cubes.splice(cubes.indexOf(hit), 1);
        score++;
        updateHUD();
    }
});

function updateHUD() {
    document.getElementById("hud").innerText = `Score: ${score} | Missed: ${missed}`;
}

function animate() {
    requestAnimationFrame(animate);

    if (!gameOver) {
        cubes.forEach((c, i) => {
            c.position.y -= fallSpeed;
            if (c.position.y < -6) {
                scene.remove(c);
                cubes.splice(i, 1);
                missed++;
                updateHUD();
                if (missed >= 5) {
                    gameOver = true;
                    document.getElementById("hud").innerText += " | GAME OVER";
                }
            }
        });
    }

    renderer.render(scene, camera);
}

animate();

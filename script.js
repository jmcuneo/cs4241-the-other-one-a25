window.onload = function() {
    
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer = new THREE.WebGLRenderer();

    renderer.setSize(800, 600);
    document.body.appendChild(renderer.domElement);

    // Cube
    let geometry = new THREE.BoxGeometry();
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Bouncing parameters
    let speedX = 0.02;
    let speedY = 0.015;
    let boundsX = 3;
    let boundsY = 2;

    // Animation loop
    function animate() {
        // Move cube
        cube.position.x += speedX;
        cube.position.y += speedY;
        
        // Bounce off walls
        if (cube.position.x > boundsX || cube.position.x < -boundsX) {
            speedX = -speedX;
        }
        if (cube.position.y > boundsY || cube.position.y < -boundsY) {
            speedY = -speedY;
        }
        
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    animate();

    // Button changes color
    document.getElementById('btn').onclick = function() {
        cube.material.color.setHex(Math.random() * 0xffffff);
    }
}
import * as THREE from 'https://unpkg.com/three/build/three.module.js'

export class Objects {
    static createKnot() {
        const knotgeo = new THREE.TorusKnotGeometry(10, 0.5, 128, 16, 5, 21)
        const mat = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 2000 })
        const knot = new THREE.Mesh(knotgeo, mat)

        // Position the knot slightly to the left
        knot.position.x = -15

        return knot
    }

    static createCube() {
        const geometry = new THREE.BoxGeometry(8, 8, 8)
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            shininess: 1000
        })
        const cube = new THREE.Mesh(geometry, material)

        // Position the cube to the right
        cube.position.x = 15

        return cube
    }

    static createSphere() {
        const geometry = new THREE.SphereGeometry(6, 32, 32)
        const material = new THREE.MeshPhongMaterial({
            color: 0x0000ff,
            shininess: 1500
        })
        const sphere = new THREE.Mesh(geometry, material)

        // Position the sphere in the center-back
        sphere.position.z = -10

        return sphere
    }

    static createTorus() {
        const geometry = new THREE.TorusGeometry(7, 2, 16, 100)
        const material = new THREE.MeshPhongMaterial({
            color: 0xffff00,
            shininess: 800,
            emissive: 0x222200
        })
        const torus = new THREE.Mesh(geometry, material)

        // Position the torus above the center so it doesn't overlap others
        torus.position.y = 12
        torus.rotation.x = Math.PI / 6

        return torus
    }
}
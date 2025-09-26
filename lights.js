import * as THREE from 'https://unpkg.com/three/build/three.module.js'

export class Lighting {
    static createLights() {
        const lights = []

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xcccccc, 2)
        directionalLight.position.set(0, 0, 100)
        lights.push(directionalLight)

        // Add an ambient light for better overall illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
        lights.push(ambientLight)

        // Add a point light for more dynamic lighting
        const pointLight = new THREE.PointLight(0xffffff, 0.8, 100)
        pointLight.position.set(10, 10, 10)
        lights.push(pointLight)

        return lights
    }
}
import * as THREE from 'https://unpkg.com/three/build/three.module.js'
import { Objects } from './objects.js'
import { Lighting } from './lights.js'

export class SceneManager {
    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
        this.renderer = new THREE.WebGLRenderer()
        this.objects = []

        this.init()
    }

    init() {
        // Set up camera position
        this.camera.position.z = 50

        // Set up renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        // Create and add lights
        const lights = Lighting.createLights()
        lights.forEach(light => this.scene.add(light))

        // Create and add objects
        this.knot = Objects.createKnot()
        this.cube = Objects.createCube()
        this.sphere = Objects.createSphere()
        this.torus = Objects.createTorus()

        this.scene.add(this.knot)
        this.scene.add(this.cube)
        this.scene.add(this.sphere)
        this.scene.add(this.torus)

        // Store objects for easy access
        this.objects = [this.knot, this.cube, this.sphere, this.torus]
    }

    getScene() {
        return this.scene
    }

    getCamera() {
        return this.camera
    }

    getRenderer() {
        return this.renderer
    }

    getObjects() {
        return {
            knot: this.knot,
            cube: this.cube,
            sphere: this.sphere,
            torus: this.torus,
            all: this.objects
        }
    }
}
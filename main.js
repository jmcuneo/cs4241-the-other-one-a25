// import our three.js reference
import * as THREE from 'https://unpkg.com/three/build/three.module.js'
import { Pane } from 'https://unpkg.com/tweakpane'

const app = {
    init() {
        // Starting object. Will be populated with camera, lighting objects, etc.
        this.scene = new THREE.Scene()

        // Create a new camera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
        this.camera.position.z = 50

        // Specify the type of renderer to use. In this case, it's a WebGL renderer.
        this.renderer = new THREE.WebGLRenderer()

        // Fill the entire window
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        // Creates the canvas element and appends it to our page
        document.body.appendChild(this.renderer.domElement)

        this.createLights()
        this.knot = this.createKnot()

        // Take whatever function you're calling this on and creates a 
        // permanent execution context. Ensures that when we call render(),
        // "this" is not assumed to be the global "this" but the function reference.
        // Called "hard binding"
        this.render = this.render.bind(this)
        this.render()

        // create a new tweakpane instance
        this.pane = new Pane()
        // setup our pane to control the know rotation on the y axis
        this.pane.addBinding(this.knot.rotation, 'y')
    },

    createLights() {
        // Create one point light and add it to the scene
        const pointLight = new THREE.DirectionalLight(0xcccccc, 2)

        // Set the point light's position
        pointLight.position.z = 100

        // Add the light to the scene
        this.scene.add(pointLight)
    },

    // Creates the torus knot geometry that we'll display in our scene 
    createKnot() {
        const knotgeo = new THREE.TorusKnotGeometry(10, .5, 128, 16, 5, 21)

        // The material (texture) for the shape we want to draw
        const mat = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 2000 })
        const knot = new THREE.Mesh(knotgeo, mat)

        // Add the knot tho the scene
        this.scene.add(knot)
        return knot
    },

    // Animation loop
    render() {
        // Slowing increment the rotation angle over time to animate the knot
        this.knot.rotation.x += .025

        // Render using the scene and camera specified earlier
        this.renderer.render(this.scene, this.camera)

        // Schedules a function to be called the next time the graphics engine
        // refreshes your browser window. Necessary for the animation to occur.
        window.requestAnimationFrame(this.render)
    }
}

window.onload = () => app.init()
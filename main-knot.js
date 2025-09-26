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

        this.setupTweakpane()
        this.render()

    },

    setupTweakpane() {
        // create a new tweakpane instance
        this.pane = new Pane()

        // Parameters object to hold our control values
        this.params = {
            knotColor: '#ff0000',
            backgroundColor: '#000000',
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: 1
        }

        // Rotation controls
        const rotationFolder = this.pane.addFolder({
            title: 'Rotation',
            expanded: true
        })
        rotationFolder.addBinding(this.knot.rotation, 'x', {
            min: 0, max: Math.PI * 2, step: 0.01
        })
        rotationFolder.addBinding(this.knot.rotation, 'y', {
            min: 0, max: Math.PI * 2, step: 0.01
        })
        rotationFolder.addBinding(this.knot.rotation, 'z', {
            min: 0, max: Math.PI * 2, step: 0.01
        })

        // Position controls
        const positionFolder = this.pane.addFolder({
            title: 'Position',
            expanded: true
        })
        positionFolder.addBinding(this.params.position, 'x', {
            min: -50, max: 50, step: 0.1
        }).on('change', (ev) => {
            this.knot.position.x = ev.value
        })
        positionFolder.addBinding(this.params.position, 'y', {
            min: -50, max: 50, step: 0.1
        }).on('change', (ev) => {
            this.knot.position.y = ev.value
        })
        positionFolder.addBinding(this.params.position, 'z', {
            min: -50, max: 50, step: 0.1
        }).on('change', (ev) => {
            this.knot.position.z = ev.value
        })

        // Scale control
        this.pane.addBinding(this.params, 'scale', {
            min: 0.1, max: 3, step: 0.1
        }).on('change', (ev) => {
            this.knot.scale.setScalar(ev.value)
        })

        // Color controls
        const colorFolder = this.pane.addFolder({
            title: 'Colors',
            expanded: true
        })

        // Knot color control
        colorFolder.addBinding(this.params, 'knotColor').on('change', (ev) => {
            this.knot.material.color.setHex(ev.value.replace('#', '0x'))
        })

        // Background color control
        colorFolder.addBinding(this.params, 'backgroundColor').on('change', (ev) => {
            this.scene.background = new THREE.Color(ev.value)
        })

        // Set initial background color
        this.scene.background = new THREE.Color(this.params.backgroundColor)
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
        // Render using the scene and camera specified earlier
        this.renderer.render(this.scene, this.camera)

        // Schedules a function to be called the next time the graphics engine
        // refreshes your browser window. Necessary for the animation to occur.
        window.requestAnimationFrame(this.render)
    }
}

window.onload = () => app.init()
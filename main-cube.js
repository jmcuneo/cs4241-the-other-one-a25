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
        this.cube = this.createCube()

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
            cubeColor: '#00ff00',
            backgroundColor: '#111111',
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
        rotationFolder.addBinding(this.cube.rotation, 'x', {
            min: 0, max: Math.PI * 2, step: 0.01
        })
        rotationFolder.addBinding(this.cube.rotation, 'y', {
            min: 0, max: Math.PI * 2, step: 0.01
        })
        rotationFolder.addBinding(this.cube.rotation, 'z', {
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
            this.cube.position.x = ev.value
        })
        positionFolder.addBinding(this.params.position, 'y', {
            min: -50, max: 50, step: 0.1
        }).on('change', (ev) => {
            this.cube.position.y = ev.value
        })
        positionFolder.addBinding(this.params.position, 'z', {
            min: -50, max: 50, step: 0.1
        }).on('change', (ev) => {
            this.cube.position.z = ev.value
        })

        // Scale control
        this.pane.addBinding(this.params, 'scale', {
            min: 0.1, max: 3, step: 0.1
        }).on('change', (ev) => {
            this.cube.scale.setScalar(ev.value)
        })

        // Color controls
        const colorFolder = this.pane.addFolder({
            title: 'Colors',
            expanded: true
        })

        // Cube color control
        colorFolder.addBinding(this.params, 'cubeColor').on('change', (ev) => {
            this.cube.material.color.setHex(ev.value.replace('#', '0x'))
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

    // Creates the cube geometry that we'll display in our scene 
    createCube() {
        const cubeGeometry = new THREE.BoxGeometry(15, 15, 15)

        // The material (texture) for the shape we want to draw
        const mat = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 2000 })
        const cube = new THREE.Mesh(cubeGeometry, mat)

        // Add the cube to the scene
        this.scene.add(cube)
        return cube
    },

    // Animation loop
    render() {
        // Add some rotation animation
        this.cube.rotation.x += 0.01
        this.cube.rotation.y += 0.01

        // Render using the scene and camera specified earlier
        this.renderer.render(this.scene, this.camera)

        // Schedules a function to be called the next time the graphics engine
        // refreshes your browser window. Necessary for the animation to occur.
        window.requestAnimationFrame(this.render)
    }
}

window.onload = () => app.init()
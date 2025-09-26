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
        this.sphere = this.createSphere()

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
            sphereColor: '#0077ff',
            backgroundColor: '#220022',
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: 1,
            wireframe: false
        }

        // Rotation controls
        const rotationFolder = this.pane.addFolder({
            title: 'Rotation',
            expanded: true
        })
        rotationFolder.addBinding(this.sphere.rotation, 'x', {
            min: 0, max: Math.PI * 2, step: 0.01
        })
        rotationFolder.addBinding(this.sphere.rotation, 'y', {
            min: 0, max: Math.PI * 2, step: 0.01
        })
        rotationFolder.addBinding(this.sphere.rotation, 'z', {
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
            this.sphere.position.x = ev.value
        })
        positionFolder.addBinding(this.params.position, 'y', {
            min: -50, max: 50, step: 0.1
        }).on('change', (ev) => {
            this.sphere.position.y = ev.value
        })
        positionFolder.addBinding(this.params.position, 'z', {
            min: -50, max: 50, step: 0.1
        }).on('change', (ev) => {
            this.sphere.position.z = ev.value
        })

        // Scale control
        this.pane.addBinding(this.params, 'scale', {
            min: 0.1, max: 3, step: 0.1
        }).on('change', (ev) => {
            this.sphere.scale.setScalar(ev.value)
        })

        // Color controls
        const colorFolder = this.pane.addFolder({
            title: 'Colors',
            expanded: true
        })

        // Sphere color control
        colorFolder.addBinding(this.params, 'sphereColor').on('change', (ev) => {
            this.sphere.material.color.setHex(ev.value.replace('#', '0x'))
        })

        // Background color control
        colorFolder.addBinding(this.params, 'backgroundColor').on('change', (ev) => {
            this.scene.background = new THREE.Color(ev.value)
        })

        // Wireframe toggle
        colorFolder.addBinding(this.params, 'wireframe').on('change', (ev) => {
            this.sphere.material.wireframe = ev.value
        })

        // Set initial background color
        this.scene.background = new THREE.Color(this.params.backgroundColor)
    },

    createLights() {
        // Create multiple lights for better sphere illumination
        const pointLight1 = new THREE.DirectionalLight(0xffffff, 1)
        pointLight1.position.set(50, 50, 50)
        this.scene.add(pointLight1)

        const pointLight2 = new THREE.DirectionalLight(0x4444ff, 0.5)
        pointLight2.position.set(-50, -50, 50)
        this.scene.add(pointLight2)
    },

    // Creates the sphere geometry that we'll display in our scene 
    createSphere() {
        const sphereGeometry = new THREE.SphereGeometry(12, 32, 32)

        // The material (texture) for the shape we want to draw
        const mat = new THREE.MeshPhongMaterial({
            color: 0x0077ff,
            shininess: 1000,
            transparent: true,
            opacity: 0.9
        })
        const sphere = new THREE.Mesh(sphereGeometry, mat)

        // Add the sphere to the scene
        this.scene.add(sphere)
        return sphere
    },

    // Animation loop
    render() {
        // Add some floating animation
        this.sphere.position.y = Math.sin(Date.now() * 0.001) * 5
        this.sphere.rotation.y += 0.005

        // Render using the scene and camera specified earlier
        this.renderer.render(this.scene, this.camera)

        // Schedules a function to be called the next time the graphics engine
        // refreshes your browser window. Necessary for the animation to occur.
        window.requestAnimationFrame(this.render)
    }
}

window.onload = () => app.init()
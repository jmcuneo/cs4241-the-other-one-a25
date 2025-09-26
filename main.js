// import our three.js reference
import * as THREE from 'https://unpkg.com/three/build/three.module.js'
import { Pane } from 'https://unpkg.com/tweakpane'
import { SceneManager } from './sceneManager.js'

const app = {
    init() {
        // Initialize scene manager
        this.sceneManager = new SceneManager()

        // Get references to scene components
        this.scene = this.sceneManager.getScene()
        this.camera = this.sceneManager.getCamera()
        this.renderer = this.sceneManager.getRenderer()
        this.objects = this.sceneManager.getObjects()

        // Bind the render method to the current context
        this.render = this.render.bind(this)
        this.render()

        // create a new tweakpane instance
        this.pane = new Pane()
        this.setupControls()
    },

    setupControls() {
        // Create folders for organizing controls
        const knotFolder = this.pane.addFolder({ title: 'Knot Controls' })
        const cubeFolder = this.pane.addFolder({ title: 'Cube Controls' })
        const sphereFolder = this.pane.addFolder({ title: 'Sphere Controls' })

        // Knot controls
        knotFolder.addBinding(this.objects.knot.rotation, 'x', { min: 0, max: Math.PI * 2 })
        knotFolder.addBinding(this.objects.knot.rotation, 'y', { min: 0, max: Math.PI * 2 })
        knotFolder.addBinding(this.objects.knot.rotation, 'z', { min: 0, max: Math.PI * 2 })
        knotFolder.addBinding(this.objects.knot, 'visible')

        // Cube controls
        cubeFolder.addBinding(this.objects.cube.rotation, 'x', { min: 0, max: Math.PI * 2 })
        cubeFolder.addBinding(this.objects.cube.rotation, 'y', { min: 0, max: Math.PI * 2 })
        cubeFolder.addBinding(this.objects.cube.rotation, 'z', { min: 0, max: Math.PI * 2 })
        cubeFolder.addBinding(this.objects.cube, 'visible')

        // Sphere controls
        sphereFolder.addBinding(this.objects.sphere.rotation, 'x', { min: 0, max: Math.PI * 2 })
        sphereFolder.addBinding(this.objects.sphere.rotation, 'y', { min: 0, max: Math.PI * 2 })
        sphereFolder.addBinding(this.objects.sphere.rotation, 'z', { min: 0, max: Math.PI * 2 })
        sphereFolder.addBinding(this.objects.sphere, 'visible')
    },

    // Animation loop
    render() {
        // Animate all objects with different rotation speeds
        this.objects.knot.rotation.x += 0.025
        this.objects.cube.rotation.y += 0.02
        this.objects.cube.rotation.x += 0.01
        this.objects.sphere.rotation.z += 0.03
        this.objects.sphere.rotation.y += 0.015

        // Render using the scene and camera specified earlier
        this.renderer.render(this.scene, this.camera)

        // Schedules a function to be called the next time the graphics engine
        // refreshes your browser window. Necessary for the animation to occur.
        window.requestAnimationFrame(this.render)
    }
}

window.onload = () => app.init()
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

        // Initialize animation parameters
        this.animationParams = {
            verticalOscillation: 5,
            depthOscillation: 3,
            verticalSpeed: 1.5,
            depthSpeed: 0.8,
            pulseScale: 0.2,
            pulseSpeed: 2
        }
        
        // Initialize color parameters
        this.colorParams = {
            knotColor: { r: 255, g: 0, b: 0 },    // Red
            cubeColor: { r: 0, g: 255, b: 0 },    // Green
            sphereColor: { r: 0, g: 0, b: 255 }   // Blue
        }
        
        // Flag to track if colors have been initialized
        this.colorsInitialized = false;

        // Take whatever function you're calling this on and creates a 
        // permanent execution context. Ensures that when we call render(),
        // "this" is not assumed to be the global "this" but the function reference.
        // Called "hard binding"
        this.render = this.render.bind(this)
        this.render()

        // create a new tweakpane instance
        this.pane = new Pane()
        this.setupControls()
    },

    setupControls() {
        // Create folders for organizing controls
        const knotFolder = this.pane.addFolder({ title: 'Knot Controls' })
        const knotAnimationFolder = this.pane.addFolder({ title: 'Knot Animation' })
        const cubeFolder = this.pane.addFolder({ title: 'Cube Controls' })
        const cubeAnimationFolder = this.pane.addFolder({ title: 'Cube Animation' })
        const sphereFolder = this.pane.addFolder({ title: 'Sphere Controls' })
        const sphereAnimationFolder = this.pane.addFolder({ title: 'Sphere Animation' })
    const torusFolder = this.pane.addFolder({ title: 'Torus Controls' })
    const torusAnimationFolder = this.pane.addFolder({ title: 'Torus Animation' })

        // Add animation parameters
        this.animationParams = {
            verticalOscillation: 5,
            depthOscillation: 3,
            verticalSpeed: 1.5,
            depthSpeed: 0.8,
            pulseScale: 0.2,
            pulseSpeed: 2
        }

        // Knot controls
        knotFolder.addBinding(this.objects.knot.rotation, 'x', { min: 0, max: Math.PI * 2 })
        knotFolder.addBinding(this.objects.knot.rotation, 'y', { min: 0, max: Math.PI * 2 })
        knotFolder.addBinding(this.objects.knot.rotation, 'z', { min: 0, max: Math.PI * 2 })
        knotFolder.addBinding(this.objects.knot.scale, 'x', { min: 0.1, max: 3, step: 0.1 })
        
        // Color controls for knot
        knotFolder.addBinding(this.colorParams, 'knotColor', {
            view: 'color',
            label: 'Color'
        }).on('change', (ev) => {
            const color = new THREE.Color(
                ev.value.r / 255,
                ev.value.g / 255,
                ev.value.b / 255
            );
            this.objects.knot.material.color = color;
        });
        
        // Knot animation controls
        knotAnimationFolder.addBinding(this.animationParams, 'verticalOscillation', { min: 0, max: 10, step: 0.5 })
        knotAnimationFolder.addBinding(this.animationParams, 'depthOscillation', { min: 0, max: 10, step: 0.5 })
        knotAnimationFolder.addBinding(this.animationParams, 'verticalSpeed', { min: 0.1, max: 5, step: 0.1 })
        knotAnimationFolder.addBinding(this.animationParams, 'depthSpeed', { min: 0.1, max: 5, step: 0.1 })
        knotAnimationFolder.addBinding(this.animationParams, 'pulseScale', { min: 0, max: 1, step: 0.05 })
        knotAnimationFolder.addBinding(this.animationParams, 'pulseSpeed', { min: 0.1, max: 5, step: 0.1 })
        // Cube controls
        cubeFolder.addBinding(this.objects.cube.rotation, 'x', { min: 0, max: Math.PI * 2 })
        cubeFolder.addBinding(this.objects.cube.rotation, 'y', { min: 0, max: Math.PI * 2 })
        cubeFolder.addBinding(this.objects.cube.rotation, 'z', { min: 0, max: Math.PI * 2 })
        
        // Color controls for cube
        cubeFolder.addBinding(this.colorParams, 'cubeColor', {
            view: 'color',
            label: 'Color'
        }).on('change', (ev) => {
            const color = new THREE.Color(
                ev.value.r / 255,
                ev.value.g / 255,
                ev.value.b / 255
            );
            this.objects.cube.material.color = color;
        });

        //Cube position controls
        cubeAnimationFolder.addBinding(this.animationParams, 'verticalOscillation', { min: 0, max: 10, step: 0.5 })
        cubeAnimationFolder.addBinding(this.animationParams, 'depthOscillation', { min: 0, max: 10, step: 0.5 })
        cubeAnimationFolder.addBinding(this.animationParams, 'verticalSpeed', { min: 0.1, max: 5, step: 0.1 })
        cubeAnimationFolder.addBinding(this.animationParams, 'depthSpeed', { min: 0.1, max: 5, step: 0.1 })
        cubeAnimationFolder.addBinding(this.animationParams, 'pulseScale', { min: 0, max: 1, step: 0.05 })
        cubeAnimationFolder.addBinding(this.animationParams, 'pulseSpeed', { min: 0.1, max: 5, step: 0.1 })

        // Sphere controls
        sphereFolder.addBinding(this.objects.sphere.rotation, 'x', { min: 0, max: Math.PI * 2 })
        sphereFolder.addBinding(this.objects.sphere.rotation, 'y', { min: 0, max: Math.PI * 2 })
        sphereFolder.addBinding(this.objects.sphere.rotation, 'z', { min: 0, max: Math.PI * 2 })
        
        // Color controls for sphere
        sphereFolder.addBinding(this.colorParams, 'sphereColor', {
            view: 'color',
            label: 'Color'
        }).on('change', (ev) => {
            const color = new THREE.Color(
                ev.value.r / 255,
                ev.value.g / 255,
                ev.value.b / 255
            );
            this.objects.sphere.material.color = color;
        });

    // Torus controls
    torusFolder.addBinding(this.objects.torus.rotation, 'x', { min: 0, max: Math.PI * 2 })
    torusFolder.addBinding(this.objects.torus.rotation, 'y', { min: 0, max: Math.PI * 2 })
    torusFolder.addBinding(this.objects.torus.rotation, 'z', { min: 0, max: Math.PI * 2 })
    torusFolder.addBinding(this.objects.torus.scale, 'x', { min: 0.1, max: 3, step: 0.1 })

        // Sphere animation controls
        sphereAnimationFolder.addBinding(this.animationParams, 'verticalOscillation', { min: 0, max: 10, step: 0.5 })
        sphereAnimationFolder.addBinding(this.animationParams, 'depthOscillation', { min: 0, max: 10, step: 0.5 })
        sphereAnimationFolder.addBinding(this.animationParams, 'verticalSpeed', { min: 0.1, max: 5, step: 0.1 })
        sphereAnimationFolder.addBinding(this.animationParams, 'depthSpeed', { min: 0.1, max: 5, step: 0.1 })
        sphereAnimationFolder.addBinding(this.animationParams, 'pulseScale', { min: 0, max: 1, step: 0.05 })
        sphereAnimationFolder.addBinding(this.animationParams, 'pulseSpeed', { min: 0.1, max: 5, step: 0.1 })
        // Torus animation controls
        torusAnimationFolder.addBinding(this.animationParams, 'verticalOscillation', { min: 0, max: 10, step: 0.5 })
        torusAnimationFolder.addBinding(this.animationParams, 'depthOscillation', { min: 0, max: 10, step: 0.5 })
        torusAnimationFolder.addBinding(this.animationParams, 'verticalSpeed', { min: 0.1, max: 5, step: 0.1 })
        torusAnimationFolder.addBinding(this.animationParams, 'depthSpeed', { min: 0.1, max: 5, step: 0.1 })
        torusAnimationFolder.addBinding(this.animationParams, 'pulseScale', { min: 0, max: 1, step: 0.05 })
        torusAnimationFolder.addBinding(this.animationParams, 'pulseSpeed', { min: 0.1, max: 5, step: 0.1 })
    },

    // Animation loop
    render() {
        // Initialize colors on the first frame if they haven't been set already
        if (!this.colorsInitialized) {
            // Set initial colors based on the colorParams
            this.objects.knot.material.color = new THREE.Color(
                this.colorParams.knotColor.r / 255,
                this.colorParams.knotColor.g / 255,
                this.colorParams.knotColor.b / 255
            );
            
            this.objects.cube.material.color = new THREE.Color(
                this.colorParams.cubeColor.r / 255,
                this.colorParams.cubeColor.g / 255,
                this.colorParams.cubeColor.b / 255
            );
            
            this.objects.sphere.material.color = new THREE.Color(
                this.colorParams.sphereColor.r / 255,
                this.colorParams.sphereColor.g / 255,
                this.colorParams.sphereColor.b / 255
            );
            
            this.colorsInitialized = true;
        }
        
        // Track the time for smooth animations
        const time = performance.now() * 0.001; // convert to seconds

        // Animate knot with more complex movement
        this.objects.knot.rotation.x += 0.015;
        this.objects.knot.rotation.y += 0.02;

        // Add oscillating movement to the knot using the configurable parameters
        this.objects.knot.position.y = Math.sin(time * this.animationParams.verticalSpeed) * this.animationParams.verticalOscillation;
        this.objects.knot.position.z = Math.cos(time * this.animationParams.depthSpeed) * this.animationParams.depthOscillation;

        // Scale pulsating effect with configurable parameters
        const scale = 1 + Math.sin(time * this.animationParams.pulseSpeed) * this.animationParams.pulseScale;
        this.objects.knot.scale.set(scale, scale, scale);

        // Animate other objects
        this.objects.cube.rotation.y += 0.02;
        this.objects.cube.rotation.x += 0.01;
        this.objects.sphere.rotation.z += 0.03;
        this.objects.sphere.rotation.y += 0.015;
        // Animate torus: rotations and oscillation + pulse using shared animation params
        if (this.objects.torus) {
            // gentle rotation
            this.objects.torus.rotation.x += 0.02;
            this.objects.torus.rotation.y += 0.01;
            this.objects.torus.rotation.z += 0.015;

            // base offset (created at y=12) plus configurable oscillation
            const baseTorusY = 12;
            this.objects.torus.position.y = baseTorusY + Math.sin(time * this.animationParams.verticalSpeed) * this.animationParams.verticalOscillation;
            this.objects.torus.position.z = Math.cos(time * this.animationParams.depthSpeed) * this.animationParams.depthOscillation;

            // pulsating scale
            const torusScale = 1 + Math.sin(time * this.animationParams.pulseSpeed) * this.animationParams.pulseScale;
            this.objects.torus.scale.set(torusScale, torusScale, torusScale);
        }

        // Render using the scene and camera specified earlier
        this.renderer.render(this.scene, this.camera);

        // Schedules a function to be called the next time the graphics engine
        // refreshes your browser window. Necessary for the animation to occur.
        window.requestAnimationFrame(this.render);
    }
}

window.onload = () => app.init()
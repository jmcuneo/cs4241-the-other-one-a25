// import our three.js reference
import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';

import { Pane } from 'tweakpane'

const app = {
  init() {
    // Clock
    this.clock = new THREE.Clock();

    // Starting object. Will be populated with camera, lighting objects, etc.
    this.scene = new THREE.Scene()

    // Create a new camera
    this.camera = new THREE.PerspectiveCamera(75 , window.innerWidth/window.innerHeight, 0.1, 1000 )
    this.camera.position.y = 1
    this.camera.rotation.y = 45 

    // Specify the type of renderer to use. In this case, it's a WebGL renderer.
    this.renderer = new THREE.WebGLRenderer()

    // Fill the entire window
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    // Controls
    this.controls = new FirstPersonControls( this.camera, this.renderer.domElement );

    this.controls.movementSpeed = 1;
    this.controls.lookSpeed = 0.1;
    this.controls.lookVertical = true;
    this.controls.activeLook = false;
	
    // Add Lights
    this.createLights()
    this.knot = this.createKnot()

    // Add HDRI
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    new HDRLoader()
    .setDataType(THREE.HalfFloatType)
    .load('minedump_flats_2k.hdr', (hdriMap) => {
        const envMap = pmremGenerator.fromEquirectangular(hdriMap).texture;
        this.scene.environment = envMap;
        this.scene.background = envMap;
        hdriMap.dispose();
        pmremGenerator.dispose();
    });

    // Add Plane
    this.floor = this.createFloor()

    // Render
    this.render = this.render.bind( this )
    this.render()

    // Create Tweak Pane
    this.pane = new Pane()
    this.pane.addBinding(this.camera, 'fov', {min: 40, max: 120, step: 1}).on('change', () => {
        this.camera.updateProjectionMatrix();
    });
    this.pane.addBinding(this.controls, 'activeLook')
    this.pane.addBinding(this.camera, 'position')

    this.renderer.domElement.addEventListener('resize', this.onWindowResize );
  },

  createLights() {
    // Create one point light and add it to the scene
    const pointLight = new THREE.DirectionalLight( 0xcccccc, 2 )  

    // Set the point light's position
    pointLight.position.z = 100

    // Add the light to the scene
    this.scene.add( pointLight )
  },

  // Creates the torus knot geometry that we'll display in our scene 
  createKnot() {
    const knotgeo = new THREE.TorusKnotGeometry( 10, .5, 128, 16, 5, 21 )

    // The material (texture) for the shape we want to draw
    const mat     = new THREE.MeshPhongMaterial({ color:0xff0000, shininess:2000 }) 
    const knot    = new THREE.Mesh( knotgeo, mat )

    // Add the knot tho the scene
    this.scene.add( knot )
    return knot
  },

  createFloor() {
    const planeGeometry = new THREE.PlaneGeometry(10, 10, 1, 1); 
    const planeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x252525, 
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0
    this.scene.add(plane);
  },

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.controls.handleResize();
  },

  // Animation loop
  render() {
    this.knot.rotation.z += 0.005;

    // Control Update
    this.controls.update(this.clock.getDelta());

    // Render with renderer
    this.renderer.render( this.scene, this.camera )

    // Render frame
    window.requestAnimationFrame( this.render )
  }
}

window.onload = ()=> app.init()
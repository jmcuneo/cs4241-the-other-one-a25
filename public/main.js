// import our three.js reference
import * as THREE from 'https://unpkg.com/three/build/three.module.js'
import { Pane } from 'https://unpkg.com/tweakpane'
document.title = "heart?";

// quick in-class assignment complete by Elijah Gray.
// https://github.com/jmcuneo/cs4241-guides/blob/master/using.three.md
// was based of the 3D example we were given in class due to time constraints.
// added an interface with some simple features and a sound effect that plays
// based on the maximum velocity of one of the axises.


// WARNING: fast speeds may create fast flashing lights that could trigger epilepsy
alert("WARNING: fast speeds may create fast flashing lights that could trigger epilepsy")

const app = {


    init() {

        document.title = "Have a Heart";

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            5,
            1000
        );
        this.camera.position.z = 130;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.createLights();

        // make the heart
        this.knot = this.createKnot();
        
        // audio
        this.audio = new window.AudioContext();
        this.whirr_sound = this.audio.createOscillator();
        this.gain = this.audio.createGain();

        this.whirr_sound.type = 'triangle';
        this.whirr_sound.frequency.value = 80;
        this.gain.gain.value = 0.1;

        this.whirr_sound.connect(this.gain);
        this.gain.connect(this.audio.destination);

        //ui
        this.prepare_UI();

        this.render = this.render.bind(this);
        this.render();

        window.addEventListener('click', () => {
            this.whirr_sound.start();
        });


    },

    createLights() {
        const pointLight = new THREE.DirectionalLight(0xcccccc, 2)

        // Set the point light's position
        pointLight.position.z = 100

        this.scene.add(pointLight);
    },

    createKnot() {

        // https://threejs.org/docs/#api/en/extras/core/Shape
        // I followed this pretty much to a T to get an example shape
        // its a simple heart.
        // I changed it a little cause the heart would look bad when I made substantial changes

        const heartShape = new THREE.Shape();

        heartShape.moveTo(25, 25);
        heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
        heartShape.bezierCurveTo(- 30, 0, - 30, 35, - 30, 35);
        heartShape.bezierCurveTo(- 30, 55, - 10, 77, 25, 95);
        heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
        heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
        heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

        const extrudeSettings = {
            depth: 8,
            bevelEnabled: true,
            bevelSegments: 5,
            steps: 25,
            bevelSize: 1,
            bevelThickness: 1
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

        // adjust the center of mass for rotating!
        geometry.center();

        //const geometry2 = new THREE.TorusKnotGeometry(10, 1, 128, 16, 5, 21);

        const material = new THREE.MeshPhongMaterial({color:0xff0000, shininess: 1999});
        const knot = new THREE.Mesh(geometry, material);

        //flip it around
        knot.rotation.x = Math.PI;

        this.scene.add(knot);
        return knot;
    },

    prepare_UI() {

        this.params = {x_Speed: 0, y_Speed: 0.003, z_Speed: 0,
            color: '#ff0000',
            scale: 1,
            volume: 0.1
        };

        this.UI_MENU = new Pane();

        this.UI_MENU.addBinding(this.params, 'x_Speed', {min: 0, max: 1});
        this.UI_MENU.addBinding(this.params, 'y_Speed', {min: 0, max: 1});
        this.UI_MENU.addBinding(this.params, 'z_Speed', {min: 0, max: 1});

        // update physical looks
        this.UI_MENU.addBinding(this.params, 'scale',{min: 0.1, max: 1}).on('change', event => {
            this.knot.scale.set(event.value, event.value, event.value);
        });

        this.UI_MENU.addBinding(this.params, 'color').on('change',  event =>{
            this.knot.material.color.set(event.value);
        });

        // change the volume based on the current slider.
        this.UI_MENU.addBinding(this.params, 'volume',{min: 0, max: 0.2}).on('change', event => {
            this.gain.gain.value = event.value;
        });


    },

    render() {

        this.knot.rotation.x += this.params.x_Speed;
        this.knot.rotation.y += this.params.y_Speed;
        this.knot.rotation.z += this.params.z_Speed;

        const max = Math.max(this.params.x_Speed, this.params.y_Speed, this.params.z_Speed);

        const frequency = 80 + (max * 1300);
        this.whirr_sound.frequency.value = frequency;

        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render);
    }



};

window.onload = () => app.init();



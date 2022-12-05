import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { GameObject, EventManager } from '../Core';

import * as CONTROL from 'three/examples/jsm/controls/OrbitControls';

export class GameWorld {
    //Private Fields
    private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    private renderWorld = new THREE.Scene();
    private physicWorld = new CANNON.World({
        gravity: new CANNON.Vec3(0, -9.82, 0)
    });
    private renderer = new THREE.WebGLRenderer();

    control : CONTROL.OrbitControls;

    constructor() {
        this.camera.position.z = 25;
        this.initScene();
        this.initPhysicWorld();
        this.initRenderer();
        document.body.appendChild(this.renderer.domElement);

        this.control = new CONTROL.OrbitControls(this.camera, this.renderer.domElement);
        this.control.update();

        EventManager.getSystem().subscribe("Update", this.update);
    }

    //Event
    private update = () => {
        this.control.update();
        this.physicWorld.fixedStep();
        this.renderer.render(this.renderWorld, this.camera);
    }

    //Public Method
    public add(gameObject: GameObject) {
        this.renderWorld.add(gameObject.getMesh());
        this.physicWorld.addBody(gameObject.getRigidBody());
    }

    //Private Method
    private initScene() {
        this.renderWorld.fog = new THREE.Fog(0x000000, 500, 10000);

        const axesHelper = new THREE.AxesHelper( 5 );
        this.renderWorld.add( axesHelper );
    }

    private initPhysicWorld() {
        this.physicWorld.defaultContactMaterial.restitution = 0.8;
    }

    private initRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        if(this.renderWorld.fog != null) {
            this.renderer.setClearColor(this.renderWorld.fog.color);
        }
        this.renderer.outputEncoding = THREE.sRGBEncoding;
    }
}
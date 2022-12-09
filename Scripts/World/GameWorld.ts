import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { GameObject, EventManager, Time } from '../Core';

import * as CONTROL from 'three/examples/jsm/controls/OrbitControls';

export class GameWorld {
    //Private Fields
    private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    private renderWorld = new THREE.Scene();
    private physicWorld = new CANNON.World({
        gravity: new CANNON.Vec3(0, -20, 0)
    });
    private renderer = new THREE.WebGLRenderer();

    private lastTime: number = 0;

    control : CONTROL.OrbitControls;

    constructor(gameObjects: Array<GameObject>) {
        this.camera.position.z = 25;
        this.initRenderWorld();
        this.initPhysicWorld();
        this.initRenderer();
        document.body.appendChild(this.renderer.domElement);

        this.control = new CONTROL.OrbitControls(this.camera, this.renderer.domElement);
        this.control.update();

        gameObjects.forEach((gameObject) => {
            this.add(gameObject);
        });

        EventManager.getSystem().notify("Awake");
        EventManager.getSystem().notify("Start");
        requestAnimationFrame(this.update);
    }

    //Events
    private update = (now: number) => {
        requestAnimationFrame(this.update);

        Time.deltaTime = (now - this.lastTime)/1000;
        this.lastTime = now;

        this.control.update();
        this.physicWorld.fixedStep();
        this.renderer.render(this.renderWorld, this.camera);
        EventManager.getSystem().notify("Update");
    }

    //Public Methods
    public add(gameObject: GameObject) {
        gameObject.setup();
        this.renderWorld.add(gameObject.getRenderObject());
        this.physicWorld.addBody(gameObject.getPhysicBody());
    }

    //Private Methods
    private initRenderWorld() {
        this.renderWorld.fog = new THREE.Fog(0x000000, 500, 10000);

        const axesHelper = new THREE.AxesHelper( 5 );
        this.renderWorld.add( axesHelper );
    }

    private initPhysicWorld() {
        this.physicWorld.defaultContactMaterial.restitution = 0.5;
    }

    private initRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        if(this.renderWorld.fog != null) {
            this.renderer.setClearColor(this.renderWorld.fog.color);
        }
        this.renderer.outputEncoding = THREE.sRGBEncoding;
    }
}
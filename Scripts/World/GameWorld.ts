import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { GameObject, EventManager, Time, Mesh, RigidBody, SphereMesh } from '../Core';

import * as CONTROL from 'three/examples/jsm/controls/OrbitControls';
import { ObjectSerializer } from '../Serialization';

let savePressed: Boolean = false;
let loadPressed: Boolean = false;

export class GameWorld {
    //Private Fields
    private camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    private renderWorld = new THREE.Scene();
    private physicWorld = new CANNON.World({
        gravity: new CANNON.Vec3(0, -20, 0)
    });
    private renderer = new THREE.WebGLRenderer();

    private lastTime: number = 0;
    private gameObjects: Array<GameObject>;
    private loadedGameObjects: number = 0;

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

        document.addEventListener('keydown', this.onKeyDown, false);
        this.gameObjects = gameObjects;
    }

    //Events
    private update = (now: number) => {
        requestAnimationFrame(this.update);

        Time.deltaTime = (now - this.lastTime)/1000;
        this.lastTime = now;

        this.control.update();
        this.physicWorld.fixedStep();
        this.renderer.render(this.renderWorld, this.camera);

        if(savePressed) {
            GameObject.gameObjects.forEach((gameObject) => {
                let objectToSerialize = gameObject.serialize();
                if(objectToSerialize == null) return;

                ObjectSerializer.download(gameObject.constructor.name + '.json', ObjectSerializer.serialize(objectToSerialize));
            })
            savePressed = false;
        }

        if(loadPressed) {
            GameObject.gameObjects.forEach((gameObject) => {
                ObjectSerializer.readTextFile("Assets/" + gameObject.constructor.name + ".json", (text: string | null) => {
                    if(text) { gameObject.deserialize(ObjectSerializer.deserialize(text)); }
                });
            })
            loadPressed = false;
        }

        EventManager.getSystem().notify("Update");
    }

    //Public Methods
    public add(gameObject: GameObject) {
        gameObject.setup();
        ObjectSerializer.readTextFile("Assets/" + gameObject.constructor.name + ".json", (text: string | null) => {
            if(text) { gameObject.deserialize(ObjectSerializer.deserialize(text)); }
            this.loadedGameObjects++;
            this.initEvents();
        });
        // let gameObjectMesh = gameObject.getComponent(Mesh)?.getMesh();
        // if(gameObjectMesh) { this.renderWorld.add(gameObjectMesh); }

        // let gameObjectRigidBody = gameObject.getComponent(RigidBody)?.getRigidBody();
        // if(gameObjectRigidBody) {this.physicWorld.addBody(gameObjectRigidBody); }
        //this.renderWorld.add(gameObject.getRenderObject());
        //this.physicWorld.addBody(gameObject.getPhysicBody());
    }

    public draw(gameObject: GameObject) {
        let gameObjectMesh = gameObject.getComponent(Mesh)?.getMesh();
        if(gameObjectMesh) { this.renderWorld.add(gameObjectMesh); }

        let gameObjectRigidBody = gameObject.getComponent(RigidBody)?.getRigidBody();
        if(gameObjectRigidBody) {this.physicWorld.addBody(gameObjectRigidBody); }
    }

    //Private Methods
    private initRenderWorld() {
        this.renderWorld.fog = new THREE.Fog(0x000000, 500, 10000);

        const light = new THREE.AmbientLight( 0x404040, 1 );
        this.renderWorld.add( light );

        //const helper = new THREE.AmbientLightHelper( light, 5 );
        //this.renderWorld.add( helper );

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

    private initEvents() {
        if(this.loadedGameObjects < this.gameObjects.length) return;

        EventManager.getSystem().notify("Awake");
        EventManager.getSystem().notify("Start");
        requestAnimationFrame(this.update);

        this.gameObjects.forEach((gameObject) => {
            this.draw(gameObject);
        });
    }

    private onKeyDown(event: KeyboardEvent) {
        if(event.key == "t") { savePressed = true; }
        else if(event.key == "l") { loadPressed = true; }
    }
}
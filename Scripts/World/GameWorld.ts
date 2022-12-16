import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { GameObject, EventManager, Time, RigidBody, RenderableObject } from '../Core';
import { ObjectSerializer } from '../Serialization';
import { PerspectiveCamera } from '../Camera';

import * as CONTROL from 'three/examples/jsm/controls/OrbitControls';
import { PrefabInstantiator } from '../Prefab';

let savePressed: Boolean = false;
let loadPressed: Boolean = false;

export class GameWorld {
    //Private Fields
    private camera: PerspectiveCamera | null | undefined = null;
    private renderWorld = new THREE.Scene();
    private physicWorld = new CANNON.World({
        gravity: new CANNON.Vec3(0, -20, 0)
    });
    private renderer = new THREE.WebGLRenderer();

    private lastTime: number = 0;
    private instances: Array<string | GameObject>;
    private gameObjects: Array<GameObject> = new Array<GameObject>();
    private loadedGameObjects: number = 0;

    //control : CONTROL.OrbitControls | null = null;

    constructor(gameObjectsToInstantiate: Array<string | GameObject>) {
        this.instances = gameObjectsToInstantiate;

        this.initRenderWorld();
        this.initPhysicWorld();
        this.initRenderer();
        document.body.appendChild(this.renderer.domElement);

        gameObjectsToInstantiate.forEach((gameObject) => {
            if(typeof gameObject == "string") {
                this.addFromJSON(gameObject);
            }
            else {
                this.add(gameObject);
            }
        });

        document.addEventListener('keydown', this.onKeyDown, false);
    }

    //Events
    private update = (now: number) => {
        requestAnimationFrame(this.update);

        Time.deltaTime = (now - this.lastTime)/1000;
        this.lastTime = now;

        //if(this.control) { this.control.update() };
        this.physicWorld.fixedStep();

        var cameraObject = this.camera?.getCamera();
        if(cameraObject) { this.renderer.render(this.renderWorld, cameraObject); }

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
        EventManager.getSystem().notify("LateUpdate");
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

    private initEvents() {
        if(this.loadedGameObjects < this.instances.length) return;

        EventManager.getSystem().notify("Awake");
        EventManager.getSystem().notify("Start");

        this.camera = GameObject.findWithTag("MainCamera")?.getComponent(PerspectiveCamera);
        //var cameraObject = this.camera?.getCamera();
        //if(cameraObject) {
            //this.control = new CONTROL.OrbitControls(cameraObject, this.renderer.domElement);
            //this.control.update();
        //}

        requestAnimationFrame(this.update);

        this.gameObjects.forEach((gameObject) => {
            this.draw(gameObject);
        });
    }

    private add(gameObject: GameObject) {
        PrefabInstantiator.setupInstance(gameObject);
        this.gameObjects.push(gameObject);
        this.loadedGameObjects++;
        this.initEvents();
    }

    private addFromJSON(instanceJSONPath: string) {
        PrefabInstantiator.createInstanceFromJSON(instanceJSONPath, (instance: GameObject | null) => {
            if(!instance) return;

            this.gameObjects.push(instance);
            this.loadedGameObjects++;
            this.initEvents();
        });
    }

    private draw(gameObject: GameObject) {
        let gameObjectRender = gameObject.getComponent(RenderableObject)?.getObject();
        if(gameObjectRender) { this.renderWorld.add(gameObjectRender); }

        let gameObjectRigidBody = gameObject.getComponent(RigidBody)?.getRigidBody();
        if(gameObjectRigidBody) {this.physicWorld.addBody(gameObjectRigidBody); }
    }

    private onKeyDown(event: KeyboardEvent) {
        if(event.key == "t") { savePressed = true; }
        else if(event.key == "l") { loadPressed = true; }
    }
}
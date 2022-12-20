import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { GameObject, EventManager, Time, RigidBody, RenderableObject, pair } from '../Core';
import { ObjectSerializer } from '../Serialization';
import { PerspectiveCamera } from '../Camera';

import { PrefabInstantiator } from '../Prefab';
import { Skybox } from '../World';

export class GameWorld {
    //Private Fields
    private camera: PerspectiveCamera | null | undefined = null;
    private renderWorld = new THREE.Scene();
    private physicWorld = new CANNON.World({
        gravity: new CANNON.Vec3(0, -20, 0)
    });
    private renderer = new THREE.WebGLRenderer();
    private skyBox: Skybox = new Skybox();

    private lastTime: number = 0;
    private instanceLength: number = 0;
    private gameObjects: Array<GameObject> = new Array<GameObject>();
    private loadedGameObjects: number = 0;

    constructor(gameObjectsToInstantiate: Array<string | GameObject> | string) {
        if(typeof gameObjectsToInstantiate != "string") {
            this.instanceLength = gameObjectsToInstantiate.length;
        }

        this.initRenderWorld();
        this.initPhysicWorld();
        this.initRenderer();
        document.body.appendChild(this.renderer.domElement);

        if(typeof gameObjectsToInstantiate == "string") {
            this.deserialize(gameObjectsToInstantiate);
        }
        else {
            gameObjectsToInstantiate.forEach((gameObject) => {
                if(typeof gameObject == "string") {
                    this.addFromJSON(gameObject);
                }
                else {
                    this.add(gameObject);
                }
            });
        }
    }

    //Events
    private update = (now: number) => {
        requestAnimationFrame(this.update);

        Time.deltaTime = (now - this.lastTime)/1000;
        this.lastTime = now;

        this.physicWorld.fixedStep();

        var cameraObject = this.camera?.getCamera();
        if(cameraObject) { this.renderer.render(this.renderWorld, cameraObject); }

        EventManager.getSystem().notify("Update");
        EventManager.getSystem().notify("LateUpdate");
    }

    //Private Methods
    private initRenderWorld() {
        this.renderWorld.fog = new THREE.Fog(0x000000, 500, 10000);
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
        if(this.loadedGameObjects < this.instanceLength) return;

        EventManager.getSystem().notify("Awake");
        EventManager.getSystem().notify("Start");

        this.camera = GameObject.findWithTag("MainCamera")?.getComponent(PerspectiveCamera);

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

    private deserialize(worldPath: string) {
        ObjectSerializer.readTextFile(worldPath, (text: string | null) => {
            if(!text) return;

            let worldStates = ObjectSerializer.deserialize(text) as Array<pair>;
            worldStates.forEach((state) => {
                Object.keys(state).forEach((key) => {
                    if(key == "Skybox") {
                        const skyBoxState = state[key] as ReturnType<Skybox["toObject"]>;
                        this.skyBox.deserialize(skyBoxState);
                        var skyboxObject = this.skyBox.getSkybox();
                        if(skyboxObject) this.renderWorld.add(skyboxObject);
                    }
                    else {
                        const paths = state[key] as Array<string>;
                        this.instanceLength = paths.length;
                        paths.forEach((path) => {
                            this.addFromJSON(path);
                        })
                    }
                })
            })
        });
    }
}
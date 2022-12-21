import * as THREE from 'three';
import * as CONVERT from "three-to-cannon";
import { GameObject, EventManager, Time, RenderableObject, Transform, pair } from '../Core';
import { ObjectSerializer } from '../Serialization';

import * as ORBITCONTROL from 'three/examples/jsm/controls/OrbitControls';
import * as TRANSFORMCONTROL from 'three/examples/jsm/controls/TransformControls';
import { PrefabInstantiator } from '../Prefab';
import { Skybox } from '../World';

let savePressed: Boolean = false;
let loadPressed: Boolean = false;

let raycaster: THREE.Raycaster = new THREE.Raycaster();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 30000 );
let renderer = new THREE.WebGLRenderer();
let transformControl : TRANSFORMCONTROL.TransformControls = new TRANSFORMCONTROL.TransformControls(camera, renderer.domElement);
let orbitControl : ORBITCONTROL.OrbitControls | null = null;
let objectGroup = new THREE.Group;
let renderWorld = new THREE.Scene();

export class GameEditor {
    //Private Fields
    private lastTime: number = 0;
    private instanceLength: number = 0;
    private skyBox: Skybox = new Skybox();

    private static loadedGameObjects: number = 0;
    private static isFirstEvent: Boolean = true;
    private static selectedGameObject: GameObject | null = null;

    constructor(worldJSON: string) {
        this.initRenderWorld();
        this.initRenderer();
        document.body.appendChild(renderer.domElement);

        this.deserialize(worldJSON);

        document.addEventListener('keydown', this.onKeyDown, false);
        document.addEventListener("click", this.onClick, true);
        document.addEventListener('drop', this.onDrop);
        document.addEventListener('dragover', this.onDragOver);
        GameObject.event.subscribe("OnDestroy", this.onDestroy);
    }

    //Events
    private update = (now: number) => {
        requestAnimationFrame(this.update);

        Time.deltaTime = (now - this.lastTime)/1000;
        this.lastTime = now;

        if(orbitControl) { orbitControl.update() };
        renderer.render(renderWorld, camera);

        if(savePressed) {
            let i: number = 0;
            let worldMap = new Array<pair>();
            let gameObjectPaths: Array<String> = new Array<String>();
            let zipMap = new Map<string, string>();

            GameObject.gameObjects.forEach((gameObject) => {
                let objectToSerialize = gameObject.serialize();
                if(objectToSerialize == null) return;

                var fileName = ++i + '.json';
                zipMap.set(fileName, ObjectSerializer.serialize(objectToSerialize));
                //ObjectSerializer.download(, );
                gameObjectPaths.push("Assets/GameObject/" + fileName);
            })
            worldMap.push({["Skybox"]: this.skyBox.serialize()});
            worldMap.push({["Instances"]: gameObjectPaths});
            zipMap.set("World.json", ObjectSerializer.serialize(worldMap));
            ObjectSerializer.download("data.zip", zipMap);
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

        if(GameEditor.isFirstEvent) {
            GameObject.gameObjects.forEach((gameObject) => {
                gameObject.disable();
                GameEditor.isFirstEvent = false;
            });
        }

        GameObject.gameObjects.forEach((gameObject) => {
            var transform = gameObject.getComponent(Transform);
            var renderableObject = gameObject.getComponent(RenderableObject);
            if(!transform) return;
            if(!renderableObject) return;

            var newPos = renderableObject.getPosition();
            if(newPos) transform.setPosition(newPos.x, newPos.y, newPos.z);
            
            var newQ = renderableObject.getQuaternion();
            if(newQ) transform.setQuaternion(newQ.x, newQ.y, newQ.z, newQ.w);

            var newS = renderableObject.getScale();
            if(newS) transform.setScale(newS.x, newS.y, newS.z);
        });
    }

    private onDestroy = (gameObject: GameObject) => {
        var obj = gameObject.getComponent(RenderableObject)?.getObject();
        if(obj) {
            transformControl.detach();
            if(orbitControl) orbitControl.enabled = true;
            GameEditor.selectedGameObject = null;
            objectGroup.remove(obj);
        }
    }

    private static remove(gameObject: GameObject) {
        GameObject.destroy(gameObject);
    }

    //Private Methods
    private initRenderWorld() {
        camera.position.z = 50;
        renderWorld.fog = new THREE.Fog(0x000000, 500, 10000);
        renderWorld.add(camera);
        renderWorld.add(transformControl);
        renderWorld.add(objectGroup);
        
        const axesHelper = new THREE.AxesHelper( 5 );
        renderWorld.add( axesHelper );
    }

    private initRenderer() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        if(renderWorld.fog != null) {
            renderer.setClearColor(renderWorld.fog.color);
        }
        renderer.outputEncoding = THREE.sRGBEncoding;
    }

    private initEvents() {
        if(GameEditor.loadedGameObjects < this.instanceLength) return;

        EventManager.getSystem().notify("Awake");
        EventManager.getSystem().notify("Start");

        orbitControl = new ORBITCONTROL.OrbitControls(camera, renderer.domElement);
        orbitControl.update();

        requestAnimationFrame(this.update);

        GameObject.gameObjects.forEach((gameObject) => {
            GameEditor.draw(gameObject);
        });
    }

    private static addFromDrag(prefabName: string) {
        var instance = PrefabInstantiator.createInstance(prefabName)
        if(!instance) return;

        GameEditor.isFirstEvent = true;

        EventManager.getSystem().notify("Awake");
        EventManager.getSystem().notify("Start");

        GameEditor.draw(instance);
    }

    private addFromJSON(instanceJSONPath: string) {
        PrefabInstantiator.createInstanceFromJSON(instanceJSONPath, (instance: GameObject | null) => {
            if(!instance) return;

            GameEditor.loadedGameObjects++;
            this.initEvents();
        });
    }

    private static draw(gameObject: GameObject) {
        let gameObjectRender = gameObject.getComponent(RenderableObject)?.getObject();
        if(gameObjectRender) { renderWorld.add(gameObjectRender); }
    }

    private onKeyDown(event: KeyboardEvent) {
        if(event.key == "t") { savePressed = true; }
        else if(event.key == "l") { loadPressed = true; }
        else if(event.key == 'g') { transformControl.setMode('translate'); }
        else if(event.key == 'r') { transformControl.setMode('rotate'); }
        else if(event.key == 's') { transformControl.setMode('scale'); }
        else if(event.key == 'd') { 
            if(!GameEditor.selectedGameObject) return;
            GameEditor.remove(GameEditor.selectedGameObject); 
        }
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
                        if(skyboxObject) renderWorld.add(skyboxObject);
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

    private onClick(event: MouseEvent) {
		var mouse = new THREE.Vector2();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);
		transformControl.detach();
        GameObject.gameObjects.forEach((gameObject) => {
            var obj = gameObject.getComponent(RenderableObject)?.getObject();
            if(obj) objectGroup.add(obj);
        });
		var intersects = raycaster.intersectObjects(objectGroup.children, true); //array
		if (intersects.length > 0) {
			transformControl.attach(intersects[0].object);
            GameObject.gameObjects.forEach((gameObject) => {
                var renderable = gameObject.getComponent(RenderableObject)?.getObject();
                if(renderable == intersects[0].object) {
                    GameEditor.selectedGameObject = gameObject;
                }
            });
            if(orbitControl) orbitControl.enabled = false;
		}
        else {
            GameEditor.selectedGameObject = null;
            if(orbitControl) orbitControl.enabled = true;
        }
	}

    private onDrop(event: DragEvent) {
        event.preventDefault();
        if(!event.dataTransfer) return;

        var prefabName: string = "";

        if (event.dataTransfer.items) {
            [...event.dataTransfer.items].forEach((item, i) => {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    if(file) {
                        prefabName = file.name;
                        prefabName = prefabName.substring(0, prefabName.lastIndexOf('.')) || prefabName;
                    }
                    if(prefabName) console.log(`… file[${i}].name = ${prefabName}`);
                }
            });
        } 
        else {
            [...event.dataTransfer.files].forEach((file, i) => {
                prefabName = file.name;
                prefabName = prefabName.substring(0, prefabName.lastIndexOf('.')) || prefabName;
                console.log(`… file[${i}].name = ${prefabName}`);
            });
        }

        GameEditor.addFromDrag(prefabName);
    }

    private onDragOver(event: DragEvent) {
        event.preventDefault();
    }
}
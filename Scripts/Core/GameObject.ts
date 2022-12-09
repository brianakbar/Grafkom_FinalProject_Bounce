import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Component, Transform, EventManager } from '../Core';

export class GameObject {
    //Protected Fields
    protected name = "GameObject";
    protected mesh = new THREE.Mesh();
    protected rigidBody = new CANNON.Body();
    protected transform!: Transform;

    //Private Fields
    private components = new Array<Component>();

    //Events
    protected awake = () => {}
    protected start = () => {}
    protected update = () => {}
    private updateBody = () => {
        if(!this.mesh) return;
        if(!this.rigidBody) return;

        this.mesh.position.set(this.rigidBody.position.x, this.rigidBody.position.y, this.rigidBody.position.z);
        this.mesh.quaternion.set(this.rigidBody.quaternion.x, 
                                this.rigidBody.quaternion.y, 
                                this.rigidBody.quaternion.z, 
                                this.rigidBody.quaternion.w);
    }

    //Public Methods
    public setup() {
        this.create();
        EventManager.getSystem().subscribe("Awake", this.awake);
        EventManager.getSystem().subscribe("Start", this.start);
        EventManager.getSystem().subscribe("Update", this.update);
        EventManager.getSystem().subscribe("Update", this.updateBody);
    }

    public getRenderObject() {
        return this.mesh;
    }

    public getPhysicBody() {
        return this.rigidBody;
    }

    public getTransform() {
        return this.transform;
    }

    public getComponent<T extends Component>(componentToCheck: new () => T): T | null {
        let componentToReturn: T | null = null;
        this.components.forEach((component) => {
            if(component.constructor.name === componentToCheck.name) {
                componentToReturn = component as T;
            }  
        });
        if(componentToReturn) { return componentToReturn; }
        else { return null; }
    }

    public addComponent(component : Component) {
        component.setup(this);
        this.components.push(component);
    }

    //Protected Methods
    protected draw() {}
    protected create() {}
}
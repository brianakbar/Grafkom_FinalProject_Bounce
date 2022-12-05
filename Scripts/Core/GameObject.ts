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

    protected setup() {
        this.draw();
        EventManager.getSystem().subscribe("Update", this.update);
        EventManager.getSystem().subscribe("Update", this.updateBody);
    }

    protected draw() {}
    
    //Events
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
    public getMesh() {
        return this.mesh;
    }

    public getRigidBody() {
        return this.rigidBody;
    }

    public getTransform() {
        return this.transform;
    }

    public addComponent(component : Component) {
        component.setGameObject(this);
        this.components.push(component);
    }
}
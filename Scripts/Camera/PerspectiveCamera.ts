import * as THREE from 'three';
import { Position, RenderableObject } from "../Core";

export class PerspectiveCamera extends RenderableObject {
    //Editable Fields
    private fieldOfView: number = 75;
    private near: number = 1;
    private far: number = 1000;

    //Caches
    private camera: THREE.PerspectiveCamera | null = null;

    protected onAwake = () => {
        this.camera = new THREE.PerspectiveCamera(this.fieldOfView, 
                                                window.innerWidth / window.innerHeight, 
                                                this.near, this.far);
        this.object = this.camera;
        //this.camera.position.z = 100;
    }

    public getCamera(): THREE.Camera | null {
        return this.camera;
    }

    public lookAt(position: Position) {
        if(!this.object) return;
        
        this.object.lookAt(position.x, position.y, position.z);
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<PerspectiveCamera["toObject"]>;
    
        this.fieldOfView = state.fieldOfView;
        this.near = state.near;
        this.far = state.far;
    }

    private toObject() {
        return {
            fieldOfView: this.fieldOfView,
            near: this.near,
            far: this.far
        }
    }
}
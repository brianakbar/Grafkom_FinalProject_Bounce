import * as THREE from 'three';
import { RenderableObject } from "../Core";

export class PerspectiveCamera extends RenderableObject {
    //Editable Fields
    private fieldOfView: number = 50;
    private near: number = 0.1;
    private far: number = 2000;

    //Caches
    private camera: THREE.PerspectiveCamera | null = null;

    protected onAwake = () => {
        this.camera = new THREE.PerspectiveCamera(this.fieldOfView, 
                                                window.innerWidth / window.innerHeight, 
                                                this.near, this.far);
        this.camera.position.z = 25;
    }

    public getObject(): THREE.Object3D<THREE.Event> | null {
        return this.camera;
    }

    public getCamera(): THREE.Camera | null {
        return this.camera;
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
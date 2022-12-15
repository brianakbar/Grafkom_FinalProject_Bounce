import * as THREE from 'three';
import { RenderableObject } from "../Core";

export class DirectionalLight extends RenderableObject {
    //Editable Fields
    private color: number = 0xffffff;
    private intensity: number = 1;

    //Caches
    private light: THREE.DirectionalLight | null = null;

    protected onAwake = () => {
        this.light = new THREE.DirectionalLight(this.color, this.intensity);
    }

    public getObject(): THREE.Object3D<THREE.Event> | null {
        return this.light;
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<DirectionalLight["toObject"]>;
    
        this.color = state.color;
        this.intensity = state.intensity;
    }

    private toObject() {
        return {
            color: this.color,
            intensity: this.intensity
        }
    }
}
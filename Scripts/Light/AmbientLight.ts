import * as THREE from 'three';
import { RenderableObject } from "../Core";

export class AmbientLight extends RenderableObject {
    //Editable Fields
    private color: number = 0x404040;
    private intensity: number = 1;

    //Caches
    private light: THREE.AmbientLight | null = null;

    protected onAwake = () => {
        this.light = new THREE.AmbientLight(this.color, this.intensity);
    }

    public getObject(): THREE.Object3D<THREE.Event> | null {
        return this.light;
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<AmbientLight["toObject"]>;
    
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
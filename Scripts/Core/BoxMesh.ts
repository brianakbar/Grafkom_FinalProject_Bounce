import * as THREE from "three";
import { Mesh } from "../Core";

export class BoxMesh extends Mesh {
    //Editable Fields
    private width: number = 50;
    private height: number = 5;
    private depth: number = 50;

    //Private Fields
    private geometry: THREE.BoxGeometry | null = null;
    private material: THREE.MeshStandardMaterial | null = null;

    protected onAwake = () => {
        this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
        this.material = new THREE.MeshStandardMaterial({color: 0x964B00});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<BoxMesh["toObject"]>;
    
        this.width = state.width;
        this.height = state.height;
        this.depth = state.depth;
    }

    private toObject() {
        return {
            width: this.width,
            height: this.height,
            depth: this.depth
        }
    }
}
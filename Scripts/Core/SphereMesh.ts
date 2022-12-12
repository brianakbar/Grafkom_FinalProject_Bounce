import * as THREE from "three";
import { Mesh } from "../Core";

export class SphereMesh extends Mesh {
    //Editable Fields
    private radius: number = 3;

    //Private Fields
    private geometry: THREE.SphereGeometry | null = null;
    private material: THREE.MeshBasicMaterial | null = null;

    protected onAwake = () => {
        this.geometry = new THREE.SphereGeometry(this.radius);
        this.material = new THREE.MeshBasicMaterial({color: 0xD10000});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<SphereMesh["toObject"]>;
    
        this.radius = state.radius;
    }

    private toObject() {
        return {
            radius: this.radius
        }
    }
}
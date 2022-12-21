import * as THREE from "three";
import { Mesh } from "../Core";

export class CylinderMesh extends Mesh {
    //Editable Fields
    private radiusTop: number = 4;
    private radiusBottom: number = 4;
    private height: number = 12;
    private radialSegments: number = 8;
    private heightSegments: number = 1;
    private color: number = 0x00D100;

    //Private Fields
    private geometry: THREE.CylinderGeometry | null = null;
    private material: THREE.MeshStandardMaterial | null = null;

    protected onAwake = () => {
        this.geometry = new THREE.CylinderGeometry(this.radiusTop, this.radiusBottom, this.height, this.radialSegments, this.heightSegments);
        this.material = new THREE.MeshStandardMaterial({color: this.color});
        this.object = new THREE.Mesh(this.geometry, this.material);
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<CylinderMesh["toObject"]>;
    
        this.radiusTop = state.radiusTop;
        this.radiusBottom = state.radiusBottom;
        this.height = state.height;
        this.radialSegments = state.radialSegments;
        this.heightSegments = state.heightSegments;
    }

    private toObject() {
        return {
            radiusTop: this.radiusTop,
            radiusBottom: this.radiusBottom,
            height: this.height,
            radialSegments: this.radialSegments,
            heightSegments: this.heightSegments
        }
    }
}
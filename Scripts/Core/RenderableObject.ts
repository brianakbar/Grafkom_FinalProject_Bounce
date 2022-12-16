import * as THREE from "three";
import { Component, Position, Quaternion } from "../Core";

export class RenderableObject extends Component {
    protected object: THREE.Object3D | null = null;

    public getObject(): THREE.Object3D | null {
        return this.object;
    }

    public setPosition(position: Position) {
        this.object?.position.set(position.x, position.y, position.z);
    }

    public setQuaternion(quaternion: Quaternion) {
        this.object?.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }

    public getPosition() {
        if(!this.object) return null;

        var position = new Position();
        position.x = this.object.position.x;
        position.y = this.object?.position.y;
        position.z = this.object?.position.z;

        return position;
    }
}
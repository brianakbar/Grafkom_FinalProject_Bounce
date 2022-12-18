import * as THREE from "three";
import { Component, Position, Quaternion, Scale } from "../Core";

export class RenderableObject extends Component {
    protected object: THREE.Object3D | null = null;

    public getObject(): THREE.Object3D | null {
        return this.object;
    }

    public setPosition(position: Position) {
        this.object?.position.set(position.x, position.y, position.z);
    }

    public setScale(scale: Scale) {
        this.object?.scale.set(scale.x, scale.y, scale.z);
    }

    public setQuaternion(quaternion: Quaternion) {
        this.object?.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }

    public getPosition() {
        if(!this.object) return null;

        var position = new Position();
        position.x = this.object.position.x;
        position.y = this.object.position.y;
        position.z = this.object.position.z;

        return position;
    }

    public getScale() {
        if(!this.object) return null;

        var scale = new Scale();
        scale.x = this.object.scale.x;
        scale.y = this.object.scale.y;
        scale.z = this.object.scale.z;

        return scale;
    }

    public getQuaternion() {
        if(!this.object) return null;

        var quaternion = new Quaternion();
        quaternion.x = this.object.quaternion.x;
        quaternion.y = this.object.quaternion.y;
        quaternion.z = this.object.quaternion.z;
        quaternion.w = this.object.quaternion.w;

        return quaternion;
    }
}
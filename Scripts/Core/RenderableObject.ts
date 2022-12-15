import * as THREE from "three";
import { Component, Position, Quaternion } from "../Core";

export class RenderableObject extends Component {
    public getObject(): THREE.Object3D | null {
        return null;
    }

    public setPosition(position: Position) {}
    public setQuaternion(quaternion: Quaternion) {}
}
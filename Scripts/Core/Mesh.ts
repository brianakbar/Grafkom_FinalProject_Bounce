import { Position, Quaternion, RenderableObject } from "../Core";

export class Mesh extends RenderableObject {
    protected mesh: THREE.Mesh | null = null;

    public getObject() {
        return this.mesh;
    }

    public setPosition(position: Position) {
        this.mesh?.position.set(position.x, position.y, position.z);
    }

    public setQuaternion(quaternion: Quaternion) {
        this.mesh?.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }
}
import { Component } from "../Core";

export class Mesh extends Component {
    protected mesh: THREE.Mesh | null = null;

    public getMesh() {
        return this.mesh;
    }

    public setPosition(x: number, y: number, z: number) {
        this.mesh?.position.set(x, y, z);
    }

    public setQuaternion(x: number, y: number, z: number, w: number) {
        this.mesh?.quaternion.set(x, y, z, w);
    }
}
import { BoxMesh, GameObject, RigidBody } from "../Core";

export class FloorPrefab extends GameObject {
    protected name = "FloorPrefab";

    protected addComponents() {
        this.addComponent(new BoxMesh);
        this.addComponent(new RigidBody);
    }
}
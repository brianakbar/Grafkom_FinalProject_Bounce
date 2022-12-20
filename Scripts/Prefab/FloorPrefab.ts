import { GameObject, RigidBody } from "../Core";
import { BoxMesh } from "../Mesh";

export class FloorPrefab extends GameObject {
    protected name = "FloorPrefab";

    protected addComponents() {
        this.addComponent(new BoxMesh);
        this.addComponent(new RigidBody);
    }
}
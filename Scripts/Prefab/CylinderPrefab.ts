import { GameObject, RigidBody } from "../Core";
import { CylinderMesh } from "../Mesh";

export class CylinderPrefab extends GameObject {
    protected name = "CylinderPrefab";

    protected addComponents() {
        this.addComponent(new CylinderMesh);
        this.addComponent(new RigidBody);
    }
}
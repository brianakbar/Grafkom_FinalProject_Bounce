import { GameObject, RigidBody, SphereMesh } from "../Core";
import { PlayerController } from "../Controller";
import { Mover } from "../Movement";

export class BallPrefab extends GameObject {
    protected name = "BallPrefab";

    protected addComponents() {
        this.addComponent(new SphereMesh);
        this.addComponent(new RigidBody);
        this.addComponent(new PlayerController);
        this.addComponent(new Mover);
    }
}
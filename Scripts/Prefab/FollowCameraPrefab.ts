import { PerspectiveCamera } from "../Camera";
import { GameObject } from "../Core";

export class FollowCameraPrefab extends GameObject {
    protected name = "FollowCameraPrefab";
    protected tag = "MainCamera";

    protected addComponents() {
        this.addComponent(new PerspectiveCamera);
    }
}
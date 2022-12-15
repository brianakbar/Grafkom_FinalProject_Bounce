import { GameObject } from "../Core";
import { AmbientLight } from "../Light";

export class AmbientLightPrefab extends GameObject {
    protected name = "AmbientLightPrefab";

    protected addComponents() {
        this.addComponent(new AmbientLight);
    }
}
import { GameObject } from "../Core";
import { DirectionalLight } from "../Light";

export class DirectionalLightPrefab extends GameObject {
    protected name = "DirectionalLightPrefab";

    protected addComponents() {
        this.addComponent(new DirectionalLight);
    }
}
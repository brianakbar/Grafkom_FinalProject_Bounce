import { GameObject } from '../Core'; 

export class Component {
    //Private Fields
    private gameObject = new GameObject();

    //Public Methods
    public setGameObject(gameObject: GameObject) {
        this.gameObject = gameObject;
    }
}
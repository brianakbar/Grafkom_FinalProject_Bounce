import { EventManager, GameObject } from '../Core'; 

export class Component {
    //Private Fields
    private gameObject = new GameObject();

    //Events
    protected onAwake = () => {}
    protected onStart = () => {}
    protected onUpdate = () => {}

    //Public Methods
    public setup(gameObject: GameObject) {
        this.gameObject = gameObject;
        EventManager.getSystem().subscribe("Awake", this.onAwake);
        EventManager.getSystem().subscribe("Start", this.onStart);
        EventManager.getSystem().subscribe("Update", this.onUpdate);
    }

    public getComponent<T extends Component>(componentToCheck: new () => T): T | null {
        return this.gameObject.getComponent<T>(componentToCheck);
    }

    public serialize(): object | null { return null; }
    public deserialize(serializer: object)  {}
}
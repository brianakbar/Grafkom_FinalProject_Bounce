import { EventManager, GameObject } from '../Core'; 

export class Component {
    //Private Fields
    private gameObject = new GameObject();
    protected isEnabled = true;

    //Events
    protected onAwake = () => {}
    protected onStart = () => {}
    protected onUpdate = () => {}
    protected onLateUpdate = () => {}

    //Public Methods
    public setup(gameObject: GameObject) {
        this.gameObject = gameObject;
        EventManager.getSystem().subscribe("Awake", this.onAwake);
        EventManager.getSystem().subscribe("Start", this.onStart);
        EventManager.getSystem().subscribe("Update", this.onUpdate);
        EventManager.getSystem().subscribe("LateUpdate", this.onLateUpdate);
    }

    public disable() {
        this.isEnabled = false;
        EventManager.getSystem().unsubscribe("Awake", this.onAwake);
        EventManager.getSystem().unsubscribe("Start", this.onStart);
        EventManager.getSystem().unsubscribe("Update", this.onUpdate);
        EventManager.getSystem().unsubscribe("LateUpdate", this.onLateUpdate);
    }

    public getComponent<T extends Component>(componentToCheck: new () => T): T | null {
        return this.gameObject.getComponent<T>(componentToCheck);
    }

    public serialize(): object | null { return null; }
    public deserialize(serializer: object)  {}
}
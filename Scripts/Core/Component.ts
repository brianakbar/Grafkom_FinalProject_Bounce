import { EventManager, GameObject } from '../Core'; 

export class Component {
    //Private Fields
    private gameObject = new GameObject();

    //Events
    protected awake = () => {}
    protected start = () => {}
    protected update = () => {}

    //Public Methods
    public setup(gameObject: GameObject) {
        this.gameObject = gameObject;
        EventManager.getSystem().subscribe("Awake", this.awake);
        EventManager.getSystem().subscribe("Start", this.start);
        EventManager.getSystem().subscribe("Update", this.update);
    }

    public getComponent<T extends Component>(componentToCheck: new () => T): T | null {
        return this.gameObject.getComponent<T>(componentToCheck);
    }

    public getRenderObject() {
        return this.gameObject.getRenderObject();
    }

    public getPhysicBody() {
        return this.gameObject.getPhysicBody();
    }
}
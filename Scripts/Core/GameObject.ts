import { Component } from '../Core';

interface pair {
    [key: string]: object
}

export class GameObject {
    //Protected Fields
    protected name = "GameObject";

    public static gameObjects = new Array<GameObject>();
    //Private Fields
    private components = new Array<Component>();

    //Public Methods
    public setup() {
        GameObject.gameObjects.push(this);
        this.addComponents();
    }

    public getComponent<T extends Component>(componentToCheck: new () => T): T | null {
        let componentToReturn: T | null = null;
        this.components.forEach((component) => {
            let componentPrototype = Object.getPrototypeOf(component);
            while(componentPrototype instanceof Component) {
                if(componentPrototype.constructor.name === componentToCheck.name) {
                    componentToReturn = component as T;
                }  
                componentPrototype = Object.getPrototypeOf(componentPrototype);
            }
        });
        if(componentToReturn) { return componentToReturn; }
        else { return null; }
    }

    public addComponent(component : Component) {
        component.setup(this);
        this.components.push(component);
    }

    //Serialization
    public serialize(): object | null { 
        let componentsMap = new Array<pair>();
        this.components.forEach((component) => {
            let componentSerialization = component.serialize();
            if(!componentSerialization) return;

            componentsMap.push({[component.constructor.name]: componentSerialization});
        });
        if(componentsMap.length > 0) return componentsMap;
        return null;
    }

    public deserialize(serialized: object)  {
        let componentStates = serialized as Array<pair>;
        componentStates.forEach((state) => {
            Object.keys(state).forEach((key) => {
                this.getComponentByString(key)?.deserialize(state[key]);
            })
        })
    }

    private getComponentByString(componentToCheck: string): Component | null {
        let componentToReturn: Component | null = null;
        this.components.forEach((component) => {
            if(component.constructor.name === componentToCheck) {
                componentToReturn = component;
            }  
        });
        if(componentToReturn) { return componentToReturn; }
        else { return null; }
    }

    //Protected Methods
    protected draw() {}
    protected addComponents() {}
}
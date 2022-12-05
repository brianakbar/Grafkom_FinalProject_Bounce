import EventSystem from 'events-system';

type Event = {
    Update: () => void;
}

export class EventManager {
    private static hasBeenCreated: boolean;
    private static eventSystem : EventSystem<Event>;

    constructor() {
        this.onUpdate();
    }

    public static getSystem() {
        if(!this.hasBeenCreated) {
            this.hasBeenCreated = true;
            new EventManager();
        }
        if(!this.eventSystem) this.eventSystem = new EventSystem<Event>();
        return this.eventSystem;
    }

    private onUpdate = () => {
        requestAnimationFrame(this.onUpdate);
        EventManager.getSystem().notify("Update");
    }
}
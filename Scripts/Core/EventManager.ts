import EventSystem from 'events-system';

type Event = {
    Awake: () => void;
    Start: () => void;
    Update: () => void;
    LateUpdate: () => void;
}

export class EventManager {
    private static eventSystem : EventSystem<Event>;

    public static getSystem() {
        if(!this.eventSystem) this.eventSystem = new EventSystem<Event>();
        return this.eventSystem;
    }
}
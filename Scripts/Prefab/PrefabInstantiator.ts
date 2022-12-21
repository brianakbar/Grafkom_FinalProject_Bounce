import { GameObject, pair } from "../Core";
import * as PREFAB from "../Prefab"
import { ObjectSerializer } from "../Serialization";

export class PrefabInstantiator {
    public static setupInstance(gameObject: GameObject) {
        gameObject.setup();
    }

    public static createInstance(prefabName: string): GameObject | null {
        var createdGameObject: GameObject;

        switch(prefabName) {
            case "AmbientLightPrefab":
                createdGameObject = new PREFAB.AmbientLightPrefab;
                break;
            case "BallPrefab":
                createdGameObject = new PREFAB.BallPrefab;
                break;
            case "CylinderPrefab":
                createdGameObject = new PREFAB.CylinderPrefab;
                break;
            case "DirectionalLightPrefab":
                createdGameObject = new PREFAB.DirectionalLightPrefab;
                break;
            case "FloorPrefab":
                createdGameObject = new PREFAB.FloorPrefab;
                break;
            case "FollowCameraPrefab":
                createdGameObject = new PREFAB.FollowCameraPrefab;
                break;
            default:
                return null;
        }

        this.setupInstance(createdGameObject);
        return createdGameObject;
    }

    public static createInstanceFromJSON(instanceJSONPath: string, callback: (instance: GameObject | null) => void) {
        ObjectSerializer.readTextFile(instanceJSONPath, (loadedJSON: string | null) => {
            if(!loadedJSON) { 
                callback(null); 
                return; 
            }
            
            var prefabName: string | null = null;
            var deserializedJSON = ObjectSerializer.deserialize(loadedJSON);
            var componentStates = deserializedJSON as Array<pair>;

            componentStates.forEach((state) => {
                Object.keys(state).forEach((key) => {
                    if(key == "GameObject") {
                        const gameObjectState = state[key] as ReturnType<GameObject["toObject"]>;
                        prefabName = gameObjectState.prefab;
                    }
                })
            })
            if(!prefabName) { 
                callback(null);
                return; 
            }

            var createdInstance = this.createInstance(prefabName);
            createdInstance?.deserialize(deserializedJSON);
            callback(createdInstance);
        });
    }
}
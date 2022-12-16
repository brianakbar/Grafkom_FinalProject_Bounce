import { GameObject } from "./Scripts/Core";
import { GameWorld } from "./Scripts/World";

let gameObjectsToSpawn = new Array<string | GameObject>();
gameObjectsToSpawn.push("Assets/FollowCameraPrefab.json");
gameObjectsToSpawn.push("Assets/AmbientLightPrefab.json");
gameObjectsToSpawn.push("Assets/DirectionalLightPrefab.json");
gameObjectsToSpawn.push("Assets/BallPrefab.json");
gameObjectsToSpawn.push("Assets/FloorPrefab.json");

new GameWorld(gameObjectsToSpawn);
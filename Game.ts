import { GameObject } from "./Scripts/Core";
import { BallPrefab, FloorPrefab } from "./Scripts/Prefab";
import { GameWorld } from "./Scripts/World";

let gameObjectsToSpawn = new Array<GameObject>();
gameObjectsToSpawn.push(new BallPrefab());
gameObjectsToSpawn.push(new FloorPrefab());

new GameWorld(gameObjectsToSpawn);
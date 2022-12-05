import { BallPrefab, FloorPrefab } from "./Scripts/Prefab";
import { GameWorld } from "./Scripts/World";

let gameWorld = new GameWorld();
gameWorld.add(new BallPrefab());
gameWorld.add(new FloorPrefab());
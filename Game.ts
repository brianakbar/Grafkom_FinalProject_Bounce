import { GameObject } from "./Scripts/Core";
import { GameEditor } from "./Scripts/Editor";
import { GameWorld } from "./Scripts/World";

// let gameObjectsToSpawn = new Array<string | GameObject>();
// gameObjectsToSpawn.push("Assets/FollowCameraPrefab.json");
// gameObjectsToSpawn.push("Assets/AmbientLightPrefab.json");
// gameObjectsToSpawn.push("Assets/DirectionalLightPrefab.json");
// gameObjectsToSpawn.push("Assets/BallPrefab.json");
// gameObjectsToSpawn.push("Assets/FloorPrefab.json");

//new GameWorld(gameObjectsToSpawn);
//window.name = "Game";

if(window.name == "Game") {
    new GameWorld("Assets/World.json");
}
else {
    new GameEditor("Assets/World.json");
}

document.addEventListener('keydown', onKeyDown, false);
function onKeyDown(event: KeyboardEvent) {
    if(event.key == "1") { 
        if(window.name == "Game") window.name = "Editor";
        else window.name = "Game";
        location.reload();
    }
}

//new GameEditor("Assets/World.json");
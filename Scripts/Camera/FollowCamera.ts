import { PerspectiveCamera } from "../Camera";
import { Component, GameObject, Position, Transform } from "../Core";

const playerTag: string = "Player";

export class FollowCamera extends Component {
    private cameraInitialPosition: Position | null = null;

    //Caches
    private playerTransform: Transform | null = null;
    private mainCamera: PerspectiveCamera | null = null;
    
    protected onAwake = () => {
        var transformTemp = GameObject.findWithTag(playerTag)?.getComponent(Transform);
        if(transformTemp) this.playerTransform = transformTemp;
        this.mainCamera = this.getComponent(PerspectiveCamera);
    }

    protected onLateUpdate = () => {
        this.initCameraPosition();
        this.follow();
    }

    private initCameraPosition() {
        if(!this.cameraInitialPosition) {
            if(!this.mainCamera) return;
            this.cameraInitialPosition = this.mainCamera.getPosition();
        }
    }

    private follow() {
        if(!this.playerTransform) return;
        if(!this.mainCamera) return;
        if(!this.cameraInitialPosition) return;

        var newCameraPosition = this.mainCamera.getPosition();
        if(!newCameraPosition) return;

        var playerPosition = this.playerTransform.getPosition()
        newCameraPosition.x = playerPosition.x;
        newCameraPosition.y = this.cameraInitialPosition.y + playerPosition.y;
        this.mainCamera.setPosition(newCameraPosition);
        this.mainCamera.lookAt(playerPosition);
    }
}
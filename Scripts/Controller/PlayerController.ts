import { Component } from "../Core";
import { MoveDirection, Mover, RotateDirection } from "../Movement";

let upPressed: Boolean = false;
let leftPressed: Boolean = false;
let downPressed: Boolean = false;
let rightPressed: Boolean = false;
let spaceBarPressed: Boolean = false;

export class PlayerController extends Component {
    private mover: Mover | null = null;

    protected onAwake = () => {
        document.addEventListener('keydown', this.onKeyDown, false);
        document.addEventListener('keyup', this.onKeyUp, false);
        this.mover = this.getComponent(Mover);
    }

    protected onUpdate = () => {
        if(this.mover == null) return;

        if(rightPressed) { this.mover.startMove(MoveDirection.Forward); }
        else if(leftPressed) { this.mover.startMove(MoveDirection.Backward); }
        else { this.mover.stopMove(); }

        //if(rightPressed) { this.mover.startRotate(RotateDirection.Right); }
        //else if(leftPressed) { this.mover.startRotate(RotateDirection.Left); }
        //else { this.mover.stopRotate(); }

        if(spaceBarPressed) { 
            this.mover.jump() 
            spaceBarPressed = false;
        }
    }
      
    private onKeyDown(event: KeyboardEvent) {
        if(event.key == "w") { upPressed = true; }
        else if(event.key == "s") { downPressed = true; }
        else if(event.key == "a") { leftPressed = true; }
        else if(event.key == "d") { rightPressed = true; }
        else if(event.key == " ") { spaceBarPressed = true; }
    }

    private onKeyUp(event: KeyboardEvent) {
        if(event.key == "w") { upPressed = false; }
        else if(event.key == "s") { downPressed = false; }
        else if(event.key == "a") { leftPressed = false; }
        else if(event.key == "d") { rightPressed = false; }
    }
}
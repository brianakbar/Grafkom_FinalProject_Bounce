import * as CANNON from "cannon-es";
import { clamp, lerp } from "three/src/math/MathUtils";
import { Component, Time } from "../Core";
import { MoveDirection, RotateDirection } from "../Movement";

export class Mover extends Component {
    //Fields
    private acceleration: number = 20; // /second
    private deceleration: number = 2; // /second
    private maxSpeed: number = 20; // /second
    private rotateSpeed: number = 90; // radian/second
    private jumpForce: number = 20;

    private angle: number = Math.PI/2;
    private currentSpeed: number = 0;
    private moveDirection: MoveDirection = MoveDirection.None;
    private rotateDirection: RotateDirection = RotateDirection.None;

    //Caches
    private rigidBody!: CANNON.Body;

    protected awake = () => {
        this.rigidBody = this.getPhysicBody();
    }

    protected update = () => {
        this.move();
        this.rotate();
    }

    public startMove(moveDirection: MoveDirection) {
        this.moveDirection = moveDirection;
    }

    public stopMove() {
        this.moveDirection = MoveDirection.None;
    }

    public startRotate(rotateDirection: RotateDirection) {
        this.rotateDirection = rotateDirection;
    }

    public stopRotate() {
        this.rotateDirection = RotateDirection.None;
    }

    public jump() {
        this.rigidBody.velocity.y = this.jumpForce;
    }

    private move() {
        if(this.moveDirection == MoveDirection.Forward) {
            this.currentSpeed = clamp(this.currentSpeed + (this.acceleration * Time.deltaTime), 
                                        this.currentSpeed, this.maxSpeed);
        }
        else if(this.moveDirection == MoveDirection.Backward) {
            this.currentSpeed = clamp(this.currentSpeed - (this.acceleration * Time.deltaTime), 
                                        -this.maxSpeed, this.currentSpeed);
        }
        else if(this.currentSpeed > 0) {
            this.currentSpeed = clamp(this.currentSpeed - (this.deceleration * Time.deltaTime), 
                                        0, this.currentSpeed);
        }
        else {
            this.currentSpeed = clamp(this.currentSpeed + (this.deceleration * Time.deltaTime), 
                                        this.currentSpeed, 0);
        }
        var localCurrentSpeedZ = this.currentSpeed * Math.sin(this.angle);
        var localCurrentSpeedX = this.currentSpeed * Math.cos(this.angle);
        this.rigidBody.velocity.z = localCurrentSpeedZ;
        this.rigidBody.velocity.x = localCurrentSpeedX;
    }

    private rotate() {
        this.angle += this.rotateDirection * Math.PI/180 * 
                    Math.abs(this.currentSpeed / this.maxSpeed) *
                    this.rotateSpeed * Time.deltaTime;
    }
}
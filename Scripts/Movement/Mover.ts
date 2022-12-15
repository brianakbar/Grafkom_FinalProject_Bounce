import * as CANNON from "cannon-es";
import { clamp } from "three/src/math/MathUtils";
import { Component, RigidBody, Time } from "../Core";
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
    private rigidBodyComponent: RigidBody | null = null;

    protected onAwake = () => {
        this.rigidBodyComponent = this.getComponent(RigidBody);
    }

    protected onUpdate = () => {
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
        if(!this.rigidBodyComponent) return;
        var rigidBody = this.rigidBodyComponent.getRigidBody();
        if(!rigidBody) return;

        rigidBody.velocity.y = this.jumpForce;
    }

    private move() {
        if(!this.rigidBodyComponent) return;
        var rigidBody = this.rigidBodyComponent.getRigidBody();
        if(!rigidBody) return;

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
        //var localCurrentSpeedZ = this.currentSpeed * Math.sin(this.angle);
        //var localCurrentSpeedX = this.currentSpeed * Math.cos(this.angle);
        //rigidBody.velocity.z = localCurrentSpeedZ;
        rigidBody.velocity.x = this.currentSpeed;
    }

    private rotate() {
        this.angle += this.rotateDirection * Math.PI/180 * 
                    Math.abs(this.currentSpeed / this.maxSpeed) *
                    this.rotateSpeed * Time.deltaTime;
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<Mover["toObject"]>;
    
        this.acceleration = state.acceleration;
        this.deceleration = state.deceleration;
        this.maxSpeed = state.maxSpeed;
        this.rotateSpeed = state.rotateSpeed;
        this.jumpForce = state.jumpForce;
    }

    private toObject() {
        return {
            acceleration: this.acceleration,
            deceleration: this.deceleration,
            maxSpeed: this.maxSpeed,
            rotateSpeed: this.rotateSpeed,
            jumpForce: this.jumpForce
        }
    }
}
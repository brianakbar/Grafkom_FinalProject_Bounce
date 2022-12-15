import * as CANNON from 'cannon-es';
import * as CONVERT from "three-to-cannon";
import { Component, Mesh, Position, Quaternion } from "../Core";

export class RigidBody extends Component {
    //Editable Fields
    private mass: number = 0;
    private bodyType: string = "DYNAMIC";

    private rigidBody: CANNON.Body | null = null;
    private meshComponent: Mesh | null = null;

    protected onAwake = () => {
        this.meshComponent = this.getComponent(Mesh);
    }

    protected onStart = () => {
        let mesh = this.meshComponent?.getObject();
        if(!mesh) return;

        let cannonBodyType: CANNON.BodyType = CANNON.Body.DYNAMIC;
        if(this.bodyType === "STATIC") cannonBodyType = CANNON.Body.STATIC;
        else if(this.bodyType === "KINEMATIC") cannonBodyType = CANNON.Body.KINEMATIC;

        let convertResult = CONVERT.threeToCannon(mesh);
        this.rigidBody = new CANNON.Body({
            mass: this.mass,
            type: cannonBodyType,
            shape: convertResult?.shape,
            position: convertResult?.offset,
            quaternion: convertResult?.orientation,
        })
    }

    public setPosition(position: Position) {
        this.rigidBody?.position.set(position.x, position.y, position.z);
    }

    public setQuaternion(quaternion: Quaternion) {
        this.rigidBody?.quaternion.set(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
    }

    public getPosition() {
        if(!this.rigidBody) return null;

        let position: Position = new Position();
        position.x = this.rigidBody.position.x;
        position.y = this.rigidBody.position.y;
        position.z = this.rigidBody.position.z;
        return position;
    }

    public getQuaternion() {
        if(!this.rigidBody) return null;

        let quaternion: Quaternion = new Quaternion();
        quaternion.x = this.rigidBody.quaternion.x;
        quaternion.y = this.rigidBody.quaternion.y;
        quaternion.z = this.rigidBody.quaternion.z;
        quaternion.w = this.rigidBody.quaternion.w;
        return quaternion;
    }


    public getRigidBody() {
        return this.rigidBody;
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<RigidBody["toObject"]>;
    
        this.mass = state.mass;
        this.bodyType = state.bodyType;
    }

    private toObject() {
        return {
            mass: this.mass,
            bodyType: this.bodyType
        }
    }
}
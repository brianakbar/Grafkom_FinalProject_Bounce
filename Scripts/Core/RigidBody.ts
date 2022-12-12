import * as CANNON from 'cannon-es';
import { BodyType } from 'cannon-es';
import * as CONVERT from "three-to-cannon";
import { Component, Mesh } from "../Core";

export class RigidBody extends Component {
    //Editable Fields
    private mass: number = 0;
    private x: number = 0;
    private y: number = 0;
    private z: number = 0;
    private bodyType: string = "DYNAMIC";

    private rigidBody: CANNON.Body | null = null;
    private meshComponent: Mesh | null = null;

    protected onAwake = () => {
        this.meshComponent = this.getComponent(Mesh);
    }

    protected onStart = () => {
        let mesh = this.meshComponent?.getMesh();
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

        this.rigidBody.position.set(this.x, this.y, this.z);
    }

    protected onUpdate = () => {
        if(!this.rigidBody) return;
        this.meshComponent?.setPosition(this.rigidBody.position.x, 
                                        this.rigidBody.position.y, 
                                        this.rigidBody.position.z);
        this.meshComponent?.setQuaternion(this.rigidBody.quaternion.x,
                                            this.rigidBody.quaternion.y,
                                            this.rigidBody.quaternion.z,
                                            this.rigidBody.quaternion.w);
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
        this.x = state.x;
        this.y = state.y;
        this.z = state.z;
        this.bodyType = state.bodyType;
    }

    private toObject() {
        return {
            mass: this.mass,
            x: this.x,
            y: this.y,
            z: this.z,
            bodyType: this.bodyType
        }
    }
}
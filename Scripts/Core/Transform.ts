import { Component, Position, Quaternion, RenderableObject, RigidBody } from '../Core';

export class Transform extends Component {
    //Editable Fields
    private position: Position = new Position();
    private quaternion: Quaternion = new Quaternion();

    //Private Fields
    private isFirstSynchronize: Boolean = true;

    //Caches
    private rigidBody: RigidBody | null = null;
    private renderableObject: RenderableObject | null = null;

    protected onAwake = () => {
        this.rigidBody = this.getComponent(RigidBody);
        this.renderableObject = this.getComponent(RenderableObject);
    }

    protected onUpdate = () => {
        if(this.isFirstSynchronize) {
            this.synchronizeTransform();
            this.isFirstSynchronize = false;
        }

        this.updateTransform();
        this.synchronizeTransform();
    }

    public setPosition(x: number, y: number, z: number) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        this.synchronizeTransform();
    }

    public setQuaternion(x: number, y: number, z: number, w: number) {
        this.quaternion.x = x;
        this.quaternion.y = y;
        this.quaternion.z = z;
        this.quaternion.w = w;
        this.synchronizeTransform();
    }

    private updateTransform() {
        if(this.rigidBody) {
            var newPosition = this.rigidBody.getPosition();
            if(newPosition) this.position = newPosition;
            var newQuaternion = this.rigidBody.getQuaternion();
            if(newQuaternion) this.quaternion = newQuaternion;
        }
    }

    private synchronizeTransform() {
        if(this.rigidBody) {
            this.rigidBody.setPosition(this.position);
            this.rigidBody.setQuaternion(this.quaternion);
        }
        if(this.renderableObject) {
            this.renderableObject.setPosition(this.position);
            this.renderableObject.setQuaternion(this.quaternion);
        }
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<Transform["toObject"]>;
    
        if(state.position) this.position.deserialize(state.position);
        if(state.quaternion) this.quaternion.deserialize(state.quaternion);
    }

    private toObject() {
        return {
            position: this.position.serialize(),
            quaternion: this.quaternion.serialize()
        }
    }
}
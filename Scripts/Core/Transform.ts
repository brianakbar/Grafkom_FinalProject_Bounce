import { Component, Position, Quaternion, RenderableObject, RigidBody, Scale } from '../Core';

export class Transform extends Component {
    //Editable Fields
    private position: Position = new Position();
    private scale: Scale = new Scale();
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
            if(this.rigidBody) {
                if(this.renderableObject) this.renderableObject.setScale(this.scale);
                this.rigidBody.updateShape()
            };
            this.isFirstSynchronize = false;
        }

        this.updateTransform();
        if(this.rigidBody) {
            this.synchronizeTransform();
        }
    }

    public setPosition(x: number, y: number, z: number) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
        if(this.isEnabled) this.synchronizeTransform();
    }

    public setScale(x: number, y: number, z: number) {
        this.scale.x = x;
        this.scale.y = y;
        this.scale.z = z;
        if(this.isEnabled) {
            if(this.renderableObject) this.renderableObject.setScale(this.scale);
            if(this.rigidBody) this.rigidBody.updateShape();
        }
    }

    public setQuaternion(x: number, y: number, z: number, w: number) {
        this.quaternion.x = x;
        this.quaternion.y = y;
        this.quaternion.z = z;
        this.quaternion.w = w;
        if(this.isEnabled) this.synchronizeTransform();
    }

    public getPosition() {
        return this.position;
    }

    public getScale() {
        return this.scale;
    }

    public getQuaternion() {
        return this.quaternion;
    }

    private updateTransform() {
        if(this.rigidBody) {
            var newPosition = this.rigidBody.getPosition();
            if(newPosition) this.position = newPosition;
            var newQuaternion = this.rigidBody.getQuaternion();
            if(newQuaternion) this.quaternion = newQuaternion;
        }
        if(this.renderableObject) {
            var newScale = this.renderableObject.getScale();
            if(newScale) this.scale = newScale;
        }
    }

    private synchronizeTransform() {
        if(this.renderableObject) {
            this.renderableObject.setPosition(this.position);
            this.renderableObject.setQuaternion(this.quaternion);
        }
        if(this.rigidBody) {
            this.rigidBody.setPosition(this.position);
            this.rigidBody.setQuaternion(this.quaternion);
        }
    }

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<Transform["toObject"]>;
    
        if(state.position) this.position.deserialize(state.position);
        if(state.scale) this.scale.deserialize(state.scale);
        if(state.quaternion) this.quaternion.deserialize(state.quaternion);
    }

    private toObject() {
        return {
            position: this.position.serialize(),
            scale: this.scale.serialize(),
            quaternion: this.quaternion.serialize()
        }
    }
}
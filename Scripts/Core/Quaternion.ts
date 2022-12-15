export class Quaternion {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public w: number = 0;

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<Quaternion["toObject"]>;
    
        this.x = state.x;
        this.y = state.y;
        this.z = state.z;
        this.w = state.w;
    }
    
    private toObject() {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            w: this.w
        }
    }
}
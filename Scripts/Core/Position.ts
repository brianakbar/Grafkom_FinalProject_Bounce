export class Position {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    //Serialization
    public serialize(): object | null {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<Position["toObject"]>;
    
        this.x = state.x;
        this.y = state.y;
        this.z = state.z;
    }
    
    private toObject() {
        return {
            x: this.x,
            y: this.y,
            z: this.z
        }
    }
}
import * as THREE from "three";

export class Skybox {
    private skyboxFilePath: string = "Assets/Skybox/corona";
    private side: number = 10000;

    //Private Fields
    private geometry: THREE.BoxGeometry | null = null;
    private object: THREE.Object3D | null = null;

    public getSkybox() {
        return this.object;
    }

    private createMaterialArray(filePath: string) {
        const skyboxImagePaths = this.createPathStrings(filePath);
        const materialArray = skyboxImagePaths.map(image => {
            let texture = new THREE.TextureLoader().load(image);
        
            return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
        });
        return materialArray;
    }

    private createPathStrings(filePath: string) {
        const fileType = ".png";
        const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
        const pathStrings = sides.map(side => {
            return filePath + "_" + side + fileType;
        });
        return pathStrings;
    }

    //Serialization
    public serialize(): object {
        return this.toObject();
    }

    public deserialize(serialized: object)  {
        const state = serialized as ReturnType<Skybox["toObject"]>;
    
        this.skyboxFilePath = state.skyboxFilePath;
        this.side = state.side;

        this.geometry = new THREE.BoxGeometry(this.side, this.side, this.side);
        this.object = new THREE.Mesh(this.geometry, this.createMaterialArray(this.skyboxFilePath));
    }

    private toObject() {
        return {
            skyboxFilePath: this.skyboxFilePath,
            side: this.side
        }
    }
}
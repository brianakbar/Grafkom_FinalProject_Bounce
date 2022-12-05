import * as THREE from "three";
import * as CANNON from "cannon-es";
import * as CONVERT from "three-to-cannon";
import { GameObject } from "../Core";

export class BallPrefab extends GameObject {
    protected name = "BallPrefab";
    radius = 3;
    
    constructor() {
        super();
        this.setup();
    }

    protected draw() {
        let geometry = new THREE.SphereGeometry(this.radius);
        let material = new THREE.MeshBasicMaterial({color: 0xD10000});
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.position.set(0, 75, 0);

        let result = CONVERT.threeToCannon(this.mesh);
        this.rigidBody = new CANNON.Body({
            mass: 20,
            shape: result?.shape,
            position: result?.offset,
            quaternion: result?.orientation,
        })

        this.rigidBody.position.set(0, 75, 0);
    }

    protected update = () => {}
}
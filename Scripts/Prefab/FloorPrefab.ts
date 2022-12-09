import * as THREE from "three";
import * as CANNON from "cannon-es";
import * as CONVERT from "three-to-cannon";
import { GameObject } from "../Core";

export class FloorPrefab extends GameObject {
    protected name = "FloorPrefab";

    protected create() {
        this.draw();
    }

    protected draw() {
        let geometry = new THREE.BoxGeometry(50, 5, 50);
        let material = new THREE.MeshBasicMaterial({color: 0x964B00});
        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.position.set(0, -5, 0);

        let result = CONVERT.threeToCannon(this.mesh);
        this.rigidBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: result?.shape,
            position: result?.offset,
            quaternion: result?.orientation
        })

        this.rigidBody.position.set(0, -5, 0);
    }
}
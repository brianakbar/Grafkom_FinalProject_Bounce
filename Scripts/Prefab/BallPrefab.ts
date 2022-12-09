import * as THREE from "three";
import * as CANNON from "cannon-es";
import * as CONVERT from "three-to-cannon";
import { GameObject } from "../Core";
import { PlayerController } from "../Controller";
import { Mover } from "../Movement";

export class BallPrefab extends GameObject {
    protected name = "BallPrefab";
    radius = 3;

    protected create() {
        this.draw();
        this.addComponents();
    }

    protected draw() {
        let geometry = new THREE.SphereGeometry(this.radius);
        let material = new THREE.MeshBasicMaterial({color: 0xD10000});
        this.mesh = new THREE.Mesh(geometry, material);

        //this.mesh.position.set(0, 60, 0);

        let result = CONVERT.threeToCannon(this.mesh);
        this.rigidBody = new CANNON.Body({
            mass: 20,
            shape: result?.shape,
            position: result?.offset,
            quaternion: result?.orientation,
        })

        this.rigidBody.position.set(0, 1, 0);
    }

    protected addComponents() {
        this.addComponent(new PlayerController);
        this.addComponent(new Mover);
    }

    protected update = () => {}
}
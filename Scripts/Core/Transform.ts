import * as THREE from 'three';
import { Component } from '../Core';

export class Transform extends Component {
    position = new THREE.Vector3;
    rotation = new THREE.Quaternion;
}
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

const setupScene = (renderer: THREE.WebGLRenderer): THREE.Scene => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const environment = new RoomEnvironment(renderer);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(environment).texture;

    environment.dispose();
    return scene;
};

export default setupScene;

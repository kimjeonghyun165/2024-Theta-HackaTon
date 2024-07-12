import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

interface SetupSceneOptions {
    backgroundColor: number;
    backgroundOpacity: number;
    renderer: THREE.WebGLRenderer;
}

const setupScene = ({ renderer, backgroundColor, backgroundOpacity }: SetupSceneOptions): THREE.Scene => {
    const scene = new THREE.Scene();
    renderer.setClearColor(new THREE.Color(backgroundColor), backgroundOpacity / 100);

    const environment = new RoomEnvironment(renderer);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(environment).texture;

    environment.dispose();
    return scene;
};

export default setupScene;

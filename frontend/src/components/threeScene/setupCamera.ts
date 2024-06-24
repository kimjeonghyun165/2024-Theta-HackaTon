import * as THREE from 'three';

const setupCamera = (): THREE.PerspectiveCamera => {
    const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
    );
    camera.position.set(0, 200, 0);
    return camera;
};

export default setupCamera;

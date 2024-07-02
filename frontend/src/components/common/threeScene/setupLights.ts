import * as THREE from 'three';

const setupLights = (scene: THREE.Scene): void => {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
    hemiLight.position.set(0, 200, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 5);
    dirLight.position.set(0, 200, 100);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 180;
    dirLight.shadow.camera.bottom = -100;
    dirLight.shadow.camera.left = -120;
    dirLight.shadow.camera.right = 120;
    scene.add(dirLight);

    const grid = new THREE.GridHelper(500, 10, 0xffffff, 0xffffff);
    (grid.material as THREE.Material).opacity = 0.5;
    (grid.material as THREE.Material).depthWrite = false;
    (grid.material as THREE.Material).transparent = true;
    scene.add(grid);
};

export default setupLights;

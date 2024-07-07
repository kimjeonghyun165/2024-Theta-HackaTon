import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const loadModel = (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    controls: OrbitControls,
    modelPath: any
): void => {
    const loader = new FBXLoader();
    loader.load(
        modelPath,
        (fbx) => {
            fbx.traverse((child) => {
                if ((child as THREE.Mesh).isMesh) {
                    const mesh = child as THREE.Mesh;
                    if (mesh.material) {
                        console.log('Material:', mesh.material);
                    }
                }
            });

            const box = new THREE.Box3().setFromObject(fbx);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            fbx.position.y += size.y / 2 - center.y;
            scene.add(fbx);

            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

            cameraZ *= 1.5; // 여유공간
            camera.position.set(center.x + cameraZ, center.y + cameraZ, center.z + cameraZ);
            camera.lookAt(center);

            controls.target.set(center.x, center.y, center.z);
            controls.update();

            renderer.render(scene, camera);
        },
        undefined,
        (error) => {
            console.error('An error happened', error);
        }
    );
};

export default loadModel;

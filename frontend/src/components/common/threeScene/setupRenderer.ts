import * as THREE from 'three';

const setupRenderer = (container: HTMLDivElement): THREE.WebGLRenderer => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0; // 노출 조정
    container.appendChild(renderer.domElement);
    return renderer;
};

export default setupRenderer;



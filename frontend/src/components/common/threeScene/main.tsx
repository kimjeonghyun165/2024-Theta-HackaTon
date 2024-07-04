import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import setupRenderer from "./setupRenderer";
import setupCamera from "./setupCamera";
import setupScene from "./setupScene";
import setupLights from "./setupLights";
import loadModel from "./loadModel";

interface ThreeSceneProps {
  backgroundColor: number;
  backgroundOpacity: number;
  showGrid: boolean;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
  backgroundColor,
  backgroundOpacity,
  showGrid,
}: ThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let container: HTMLDivElement | null = null;
    let camera: THREE.PerspectiveCamera,
      scene: THREE.Scene,
      renderer: THREE.WebGLRenderer;

    if (containerRef.current) {
      container = containerRef.current;
      renderer = setupRenderer(container);
      renderer.setSize(container.clientWidth, container.clientHeight);

      camera = setupCamera();
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();

      scene = setupScene({ renderer, backgroundColor, backgroundOpacity });
      setupLights({ scene, showGrid });

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.minDistance = 400;
      controls.maxDistance = 1000;
      controls.target.set(0, 0, 0);
      controls.update();

      loadModel(scene, camera, renderer, controls);

      const onWindowResize = () => {
        if (container) {
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
          renderer.render(scene, camera);
        }
      };

      window.addEventListener("resize", onWindowResize);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        if (container && renderer) {
          container.removeChild(renderer.domElement);
        }
        window.removeEventListener("resize", onWindowResize);
      };
    }
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default ThreeScene;

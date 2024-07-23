import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import setupRenderer from "./setupRenderer";
import setupCamera from "./setupCamera";
import setupScene from "./setupScene";
import setupLights from "./setupLights";
import loadModel from "./loadModel";
import Loading from "../loading"; // 로딩 컴포넌트 경로에 맞게 수정

interface ThreeSceneProps {
  backgroundColor: number;
  backgroundOpacity: number;
  showGrid: boolean;
  modelPath?: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
  backgroundColor,
  backgroundOpacity,
  showGrid,
  modelPath,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      const handleLoadModel = async () => {
        if (modelPath) {
          setIsLoading(true);
          try {
            await loadModel(scene, camera, renderer, controls, modelPath);
          } catch (error) {
            console.error("Error loading model:", error);
          } finally {
            setIsLoading(false);
          }
        } else {
          renderer.render(scene, camera);
        }
      };

      handleLoadModel();

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
  }, [showGrid, modelPath, backgroundColor, backgroundOpacity]);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-950 bg-opacity-75 z-10">
          <Loading type="dots" size="lg" />
        </div>
      )}
    </div>
  );
};

export default ThreeScene;

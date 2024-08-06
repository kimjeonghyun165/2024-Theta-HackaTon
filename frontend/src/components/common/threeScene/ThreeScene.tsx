import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import setupRenderer from "./setupRenderer";
import setupCamera from "./setupCamera";
import setupScene from "./setupScene";
import setupLights from "./setupLights";
import loadModel from "./loadModel";
import Loading from "../Loading"; // 로딩 컴포넌트 경로에 맞게 수정
import { useQuery } from "@tanstack/react-query";

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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ThreeScene", modelPath],
    queryFn: () => loadModelWrapper(modelPath),
    enabled: !!modelPath, // modelPath가 있을 때만 쿼리 실행
    staleTime: 30000,
  });

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

      if (data) {
        // 모델이 성공적으로 로드되었을 때 추가 로직이 있다면 여기에 추가
        renderer.render(scene, camera);
      } else {
        renderer.render(scene, camera);
      }

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
  }, [data, showGrid, backgroundColor, backgroundOpacity]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-opacity-75 bg-gray-950">
          <Loading type="spinner" size="lg" />
        </div>
      )}
      {isError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-red-500 bg-opacity-75">
          <p>Error loading model</p>
        </div>
      )}
    </div>
  );
};

const loadModelWrapper = async (modelPath?: string) => {
  if (modelPath) {
    const scene = new THREE.Scene(); // Load the model into the scene
    const camera = new THREE.PerspectiveCamera();
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);
    await loadModel(scene, camera, renderer, controls, modelPath);
    return { scene, camera, renderer, controls };
  } else {
    throw new Error("No model path provided");
  }
};

export default ThreeScene;
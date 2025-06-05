// src/App.tsx
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // GLTFLoaderに変更
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { useRef, useEffect } from "react";

function App() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // カメラ
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 3;

    // シーン
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight("white", 0.1);
    scene.add(ambientLight);

    // CSS3DRendererセットアップ
    const cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = "absolute";
    cssRenderer.domElement.style.top = "0";
    cssRenderer.domElement.style.left = "0";
    cssRenderer.domElement.style.pointerEvents = "none"; // WebGL側に操作を渡す
    // document.body.appendChild(cssRenderer.domElement);

    // レンダラー
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    // mountRef.current?.appendChild(renderer.domElement);

    mountRef.current?.appendChild(renderer.domElement); // WebGL下層
    document.body.appendChild(cssRenderer.domElement);

    const loaderOBJ = new OBJLoader();
    const textureLoader = new THREE.TextureLoader();

    // 床のサイズと位置
    const floorSize = 10;
    const floorHeight = -2;

    // 床ジオメトリ
    const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
    floorGeometry.rotateX(-Math.PI / 2); // X軸回転を直接ジオメトリに適用

    // テクスチャを読み込んでマテリアルを作成
    textureLoader.load("/wood2.jpg", (woodTexture) => {
      const floorMaterial = new THREE.MeshStandardMaterial({
        map: woodTexture,
        roughness: 0.8,
        metalness: 0.0,
      });

      // 床メッシュを作成
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.y = floorHeight;
      scene.add(floor);
    });

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      cssRenderer.render(scene, camera);
    };
    animate();

    const controls = new OrbitControls(camera, renderer.domElement);

    // クリーンアップ
    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={mountRef} />
    </>
  );
}

export default App;

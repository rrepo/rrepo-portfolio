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

function Top() {
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

    const wallHeight = 10;
    const wallTexture = textureLoader.load("Concrete-wall-texture041.jpg");

    const wallMaterial = new THREE.MeshStandardMaterial({
      map: wallTexture,
      color: "#676767",
      side: THREE.DoubleSide,
    });
    const wallGeometry = new THREE.PlaneGeometry(floorSize, wallHeight);

    // 壁1 (奥側)
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.set(0, wallHeight / 2 + floorHeight, -floorSize / 2);
    scene.add(wall1);

    // 壁2 (右側)
    const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall2.rotation.y = Math.PI / 2;
    wall2.position.set(floorSize / 2, wallHeight / 2 + floorHeight, 0);
    scene.add(wall2);

    // 壁3 (左側)
    const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall3.rotation.y = -Math.PI / 2;
    wall3.position.set(-floorSize / 2, wallHeight / 2 + floorHeight, 0);
    scene.add(wall3);

    // 壁4 (手前側)
    // const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
    // wall4.rotation.y = Math.PI;
    // wall4.position.set(0, wallHeight / 2 + floorHeight, floorSize / 2);
    // scene.add(wall4);

    loaderOBJ.load("/Desk.obj", (obj) => {
      obj.scale.set(0.007, 0.007, 0.007);
      const box = new THREE.Box3().setFromObject(obj);
      const center = new THREE.Vector3();
      box.getCenter(center);

      obj.position.x = -center.x;
      obj.position.y = -2;

      const woodTexture = textureLoader.load("/wood.jpg");
      obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = new THREE.MeshStandardMaterial({
            map: woodTexture,
            roughness: 0.8,
            metalness: 0.0,
          });
        }
      });

      scene.add(obj);

      // デスクの上面のY座標を計算
      const size = new THREE.Vector3();
      box.getSize(size);

      const updatedBox = new THREE.Box3().setFromObject(obj);
      const max = updatedBox.max;
      const deskHeight = max.y + 0.5;
      console.log("Desk height:", max.y);

      loadMonitorAndPC(deskHeight);
    });

    function loadMonitorAndPC(deskY: number) {
      // monitor.glb の読み込み
      const loaderGLTF = new GLTFLoader();
      loaderGLTF.load("/monitor.glb", (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.4, 0.4, 0.4);
        model.position.x = 1;
        model.position.z = -0.3;

        // デスクの上に置く：deskYに少し高さを加えて
        model.position.y = deskY + 0.2; // 机の上に少し浮かせる
        model.rotation.y = Math.PI / -1.7;

        const div = document.createElement("div");
        div.style.width = "200px";
        div.style.height = "200px";
        div.style.background = "black";
        div.style.color = "lime";
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.fontFamily = "Segoe Fluent";
        div.style.fontSize = "3px";
        div.style.whiteSpace = "pre"; // ← 改行・スペースを保持
        div.style.lineHeight = "0.5"; // デフォルトより詰める
        div.style.fontFamily = "monospace";
        div.textContent = `
oooo   oooo     o      ooooooooooo ooooo  oooo oooo   oooo ooooo                                  \n
 8888o  88     888     88    888    888    88   888  o88    888                                   \n
 88 888o88    8  88        888      888    88   888888      888                                   \n
 88   8888   8oooo88     888    oo  888    88   888  88o    888                                   \n
o88o    88 o88o  o888o o888oooo888   888oo88   o888o o888o o888o                                  \n
                                                                                                  \n
ooooooooooo   o      oooo   oooo      o      ooooo ooooo      o       oooooooo8 ooooo ooooo ooooo \n
88  888  88  888      888  o88       888      888   888      888     888         888   888   888  \n
    888     8  88     888888        8  88     888ooo888     8  88     888oooooo  888ooo888   888  \n
    888    8oooo88    888  88o     8oooo88    888   888    8oooo88           888 888   888   888  \n
   o888o o88o  o888o o888o o888o o88o  o888o o888o o888o o88o  o888o o88oooo888 o888o o888o o888o \n
                                                                                                  \n
oooooooooo    ooooooo  oooooooooo  ooooooooooo ooooooooooo  ooooooo  ooooo       ooooo  ooooooo   \n
 888    888 o888   888o 888    888 88  888  88  888    88 o888   888o 888         888 o888   888o \n
 888oooo88  888     888 888oooo88      888      888ooo8   888     888 888         888 888     888 \n
 888        888o   o888 888  88o       888      888       888o   o888 888      o  888 888o   o888 \n
o888o         88ooo88  o888o  88o8    o888o    o888o        88ooo88  o888ooooo88 o888o  88ooo88   \n

        `;

        const link = document.createElement("a");
        link.href = "https://example.com"; // ← 遷移先URL
        link.textContent = "WORKS";
        link.style.display = "block";
        link.style.color = "lime";
        link.style.fontSize = "10px";
        link.style.textAlign = "center";
        link.style.fontFamily = "Lucida Console";
        link.style.marginTop = "15px";
        link.style.textDecoration = "underline";
        div.appendChild(link);

        const link2 = document.createElement("a");
        link2.href = "https://example.com"; // ← 遷移先URL
        link2.textContent = "EXPERIENCE";
        link2.style.display = "block";
        link2.style.color = "lime";
        link2.style.fontSize = "10px";
        link2.style.textAlign = "center";
        link2.style.fontFamily = "Lucida Console";
        link2.style.marginTop = "15px";
        link2.style.textDecoration = "underline";
        div.appendChild(link2);

        const link3 = document.createElement("a");
        link3.href = "https://example.com"; // ← 遷移先URL
        link3.textContent = "DREAM";
        link3.style.display = "block";
        link3.style.color = "lime";
        link3.style.fontSize = "10px";
        link3.style.textAlign = "center";
        link3.style.fontFamily = "Lucida Console";
        link3.style.marginTop = "15px";
        link3.style.textDecoration = "underline";
        div.appendChild(link3);

        const link4 = document.createElement("a");
        link4.href = "https://example.com"; // ← 遷移先URL
        link4.textContent = "CONTACT";
        link4.style.display = "block";
        link4.style.color = "lime";
        link4.style.fontSize = "10px";
        link4.style.textAlign = "center";
        link4.style.fontFamily = "Lucida Console";
        link4.style.marginTop = "15px";
        link4.style.textDecoration = "underline";
        div.appendChild(link4);

        // divをCSS3DObjectにラップ
        const cssObject = new CSS3DObject(div);
        cssObject.scale.set(0.0045, 0.0045, 0.0045); // 小さくする
        cssObject.position.set(0.75, 0.125, 0.35); // カメラの前方
        cssObject.rotation.y = Math.PI / 0.169;
        scene.add(cssObject);

        scene.add(model);

        const secondMonitor = model.clone(true);
        secondMonitor.position.set(-0.3, deskY + 0.3, -0.4);
        secondMonitor.scale.set(0.3, 0.45, 0.3);
        secondMonitor.rotation.y = Math.PI / -2;

        const div2 = document.createElement("div");
        div2.style.width = "200px";
        div2.style.height = "300px";
        div2.style.background = "black";
        div2.style.color = "lime";
        div2.style.display = "flex";
        div2.style.alignItems = "flex-start"; // ← 上端に詰める
        div2.style.justifyContent = "flex-start"; // ← 左端に詰める
        div2.style.fontSize = "13px";
        div2.style.whiteSpace = "pre"; // 改行・スペースを保持
        div2.style.lineHeight = "1.5"; // テキスト行の間隔（0.5だと潰れすぎるかも）
        div2.style.fontFamily = "monospace";
        div2.style.margin = "0";
        div2.style.padding = "0";
        div2.style.whiteSpace = "normal"; // 折り返しを許可
        div2.style.wordBreak = "break-word"; // 長い単語も折り返し
        div2.innerHTML = `
        HI I am Nazuki, I have learned computer science in university.<br>
        I have been working as a software engineer intern for 3 years at Gaccom.<br>
        At Gaccom, I developed Gaccom Gakudohoiku, Gaccom Kodomoshokudo, and Gaccom Kotsujiko using Nuxt 3 and TypeScript for the frontend, and Express with TypeScript for the backend.<br>
        In my personal experience, I have been using Go, Python, React, Ruby and Lisp. `;

        const cssObject2 = new CSS3DObject(div2);
        cssObject2.scale.set(0.003, 0.003, 0.003); // 小さくする
        cssObject2.position.set(-0.37, deskY + 0.3, 0.1); // カメラの前方
        cssObject2.rotation.y = Math.PI / -0.1;
        scene.add(cssObject2);

        scene.add(secondMonitor);
      });

      //   loaderGLTF.load("/Lamp.glb", (gltf) => {
      //     const model = gltf.scene;
      //     model.scale.set(1, 1, 1);
      //     model.position.x = -1.8;
      //     model.position.z = -1.4;

      //     // デスクの上に置く：deskYに少し高さを加えて
      //     model.position.y = deskY - 0.5; // 机の上に少し浮かせる

      //     model.rotation.y = Math.PI / -0.3;
      //     scene.add(model);

      //     const lampLight = new THREE.PointLight(0xffffff, 1, 10); // 色, 強さ, 距離
      //     lampLight.position.set(-2, 1.5, 0); // modelの原点に配置（必要なら微調整）
      //     model.add(lampLight); // ランプモデルにライトを追加
      //   });

      const loaderSTL = new STLLoader();
      // STLモデルの参照を保持する
      let stlMesh1: THREE.Mesh | null = null;
      let stlMesh2: THREE.Mesh | null = null;

      loaderSTL.load(
        "/hand_game_full.stl",
        (geometry: THREE.BufferGeometry) => {
          // 初期処理
          geometry.computeBoundingBox();
          const center = new THREE.Vector3();
          geometry.boundingBox!.getCenter(center);
          geometry.center(); // 中心を原点に移動

          const size = new THREE.Vector3();
          geometry.boundingBox!.getSize(size);
          const scaleFactor = 0.5 / Math.max(size.x, size.y, size.z);
          geometry.scale(scaleFactor, scaleFactor, scaleFactor);

          const material = new THREE.MeshToonMaterial({ color: "gray" });

          // stlMesh1: 通常の向き
          stlMesh1 = new THREE.Mesh(geometry, material);
          stlMesh1.rotation.x = Math.PI / -2;
          stlMesh1.position.set(0.1, deskY - 0.35, 0.5);
          scene.add(stlMesh1);

          // stlMesh2: ミラー反転用に Mesh を複製
          stlMesh2 = stlMesh1.clone();
          stlMesh2.position.set(-0.5, deskY - 0.35, 0.5);
          stlMesh2.scale.x *= -1; // ミラー反転
          scene.add(stlMesh2);
        }
      );
    }

    // アニメーション
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      cssRenderer.render(scene, camera);
    };
    animate();

    const controls = new OrbitControls(camera, renderer.domElement);
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true; // 慣性のような動きを加える

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

export default Top;

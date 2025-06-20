import "../styles/test.css";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

import { useRef, useEffect } from "react";

function Works() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = 300;
    const height = 300;

    // カメラ
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.set(0, 2, 3); // 少し上から斜めに見る視点

    // シーン
    const scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight("whitebel", 1);
    scene.add(ambientLight);
    scene.background = new THREE.Color(0xf0f0f0); // 明るい背景色（任意）

    // ✅ グリッド表示
    const gridHelper = new THREE.GridHelper(10, 20); // size: 10, divisions: 20
    scene.add(gridHelper);

    // ✅ 軸表示
    const axesHelper = new THREE.AxesHelper(1.5); // XYZ軸
    scene.add(axesHelper);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const loaderSTL = new STLLoader();
    // STLモデルの参照を保持する
    let stlMesh1: THREE.Mesh | null = null;
    let stlMesh2: THREE.Mesh | null = null;

    loaderSTL.load("/hand_game_full.stl", (geometry: THREE.BufferGeometry) => {
      // 初期処理
      geometry.computeBoundingBox();
      const center = new THREE.Vector3();
      geometry.boundingBox!.getCenter(center);
      geometry.center(); // 中心を原点に移動

      const size = new THREE.Vector3();
      geometry.boundingBox!.getSize(size);
      const scaleFactor = 1.5 / Math.max(size.x, size.y, size.z);
      geometry.scale(scaleFactor, scaleFactor, scaleFactor);

      const material = new THREE.MeshStandardMaterial({
        color: "white",
        metalness: 0.3,
        roughness: 0.6,
      });

      // stlMesh1: 通常の向き
      stlMesh1 = new THREE.Mesh(geometry, material);
      stlMesh1.rotation.x = Math.PI / -2;
      stlMesh1.position.set(0.8, 0, 0, 0.5);
      scene.add(stlMesh1);

      // stlMesh2: ミラー反転用に Mesh を複製
      stlMesh2 = stlMesh1.clone();
      stlMesh2.position.set(-0.8, 0, 0, 0.5);
      stlMesh2.scale.x *= -1;
      scene.add(stlMesh2);
    });

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const controls = new OrbitControls(camera, renderer.domElement);

    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div className="computer-flame">
        <div className="inner-background">
          <div className="inner-content">
            <h1 className="title">PERSONAL PRODUCTION</h1>

            <div className="card-two-container">
              <figure className="card">
                <a className="card-image" href="https://solfuw.herokuapp.com/">
                  <img
                    src="https://i.gyazo.com/4dbc4b907018b6c9e669a97adb4e2d67.png"
                    alt=""
                  ></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    <a href="https://github.com/rrepo/solfuw">solfuw</a>
                    という不登校児向け掲示板サイトです。herokuの無料枠廃止に伴い終了しました。
                  </p>
                  <p className="card-caption-info">html/css/ruby/rails/mysql</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://hanpencult.herokuapp.com/"
                  data-size="980x668"
                >
                  <img
                    src="https://i.gyazo.com/ea4b8d6f96daf7f4b483203645e1288a.png"
                    alt=""
                  ></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    <a href="https://github.com/rrepo/git-_hanpen2">
                      はんぺん教
                    </a>
                    という架空の宗教サイトです。herokuの無料枠廃止に伴い終了しました。
                  </p>
                  <p className="card-caption-info">html/css/ruby/rails/mysql</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://discordapp.com/oauth2/authorize?client_id=575278513456939009&amp;scope=bot&amp;permissions=0"
                  data-size="980x668"
                >
                  <img
                    src="https://i.gyazo.com/1f3a30c88559d0d4e77e78d0a4e385a3.png"
                    alt=""
                  ></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    <a href="https://discordapp.com/oauth2/authorize?client_id=575278513456939009&amp;scope=bot&amp;permissions=0">
                      DisTopic
                    </a>
                    というdiscordで話題を振るbotです。
                  </p>
                  <p className="card-caption-info">discord.js / javascript</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://github.com/rrepo/vue"
                  data-size="980x668"
                >
                  <img src="/img/todo.png" alt="Image not found"></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    vue.jsで制作した
                    <a href="https://github.com/rrepo/vue">todoアプリ</a>です。
                  </p>
                  <p className="card-caption-info">javascript / vue.js</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://github.com/rrepo/todo"
                  data-size="980x668"
                >
                  <img src="/img/go-todo.png"></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    goで制作した
                    <a href="https://github.com/rrepo/todo">todoアプリ</a>
                    です、メール認証機能までつけました。
                  </p>
                  <p className="card-caption-info">html / css / go</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://www.udemy.com/course/go-fintech/"
                  data-size="980x668"
                >
                  <img src="/img/trade.png" alt=""></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    golangで制作したビットコインの
                    <a href="https://www.udemy.com/course/go-fintech/">
                      トレードボット
                    </a>
                    です。ボリンジャーバンドで取引しています。
                  </p>
                  <p className="card-caption-info">golang / bitflyerapi</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://rrepo.github.io/memap/"
                  data-size="980x668"
                >
                  <img src="/img/map.png" alt=""></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    <a href="https://rrepo.github.io/memap/">
                      地図上のメモアプリ
                    </a>
                    です。
                    javascriptとleafletという地図ライブラリで作成しました。
                  </p>
                  <p className="card-caption-info">leaflet / javascript</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://discord.com/oauth2/authorize?client_id=1236261136551378964&amp;permissions=0&amp;scope=bot%20applications.commands"
                  data-size="980x668"
                >
                  <img src="/img/bot.png" alt=""></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    シークレットヒトラーというボードゲームを再現した
                    <a href="https://discord.com/oauth2/authorize?client_id=1236261136551378964&permissions=0&scope=bot%20applications.commands">
                      discord botです。
                    </a>
                  </p>
                  <p className="card-caption-info">discord bot / js</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://github.com/rrepo/final-project"
                  data-size="980x668"
                >
                  <img src="/img/cs50final.png" alt=""></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    cs50xというハーバードのコンピューターサイエンスの資格のために作成した
                    <a href="https://github.com/rrepo/final-project">
                      ブックマークセーバーです。
                    </a>
                  </p>
                  <p className="card-caption-info">firebase / nuxt3</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://marketplace.visualstudio.com/items?itemName=rrepo.commonlisp-formatter&amp;ssr=false#overview"
                  data-size="980x668"
                >
                  <img src="/img/commonlisp.gif" alt=""></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    <a href="https://marketplace.visualstudio.com/items?itemName=rrepo.commonlisp-formatter&ssr=false#overview">
                      commonlispのフォーマッター
                    </a>
                    です。vscodeの拡張機能です。
                  </p>
                  <p className="card-caption-info">ts / commonlisp</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://uncord-961ac.web.app/"
                  data-size="980x668"
                >
                  <img src="/img/YtbP1sB.png" alt=""></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    reactとfirebaseを使い開発した
                    <a href="https://uncord-961ac.web.app/">
                      ぷりぷりうんぴーずの掲示板サイト
                    </a>
                    です。 googleの認証機能を使い、ユーザー登録ができます。
                  </p>
                  <p className="card-caption-info">react / firebase</p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>
            </div>

            <figure className="card-big">
              <a
                className="card-image"
                href="https://github.com/rrepo/easy-mindmap-renderer-demo"
                data-size="980x668"
              >
                <img src="/img/demo.gif" alt=""></img>
              </a>
              <figcaption className="card-caption">
                <p className="card-caption-title">
                  Vueで開発した
                  <a href="https://github.com/rrepo/easy-mindmap-renderer-demo">
                    Mindmapライブラリ
                  </a>
                  です。<br></br>
                  画面の移動、拡大縮小、ノードの作成、編集、ノードの移動、ノードからノードの移動、追加、ができます。
                  他の重い Mindmap
                  ライブラリとは異なり、再帰処理や座標計算に依存しない構造のため、非常に高速で軽量です。
                  <br></br>
                  ノードの位置はすべて Htmk/Css によって制御され、JS
                  で座標を指定する必要がありません。
                </p>
                <p className="card-caption-info">vue / typescript</p>
              </figcaption>
            </figure>

            <br></br>
            <br></br>

            <figure className="card-big">
              <div className="keyboard-container">
                <a
                  className="keyboard-image"
                  href="https://github.com/rrepo/hand_game_3Dmodels?tab=readme-ov-file"
                  data-size="980x668"
                >
                  <img src="img/keyboard.jpg"></img>
                </a>

                <div className="thereD" ref={mountRef} />
              </div>

              <figcaption className="card-caption">
                <p className="card-caption-title">
                  3Dモデルから設計した
                  <a href="https://github.com/rrepo/hand_game_3Dmodels?tab=readme-ov-file">
                    自作キーボード
                  </a>
                  です。<br></br>
                  画面の移動、拡大縮小、ノードの作成、編集、ノードの移動、ノードからノードの移動、追加、ができます。
                  他の重い Mindmap
                  ライブラリとは異なり、再帰処理や座標計算に依存しない構造のため、非常に高速で軽量です。
                  <br></br>
                  ノードの位置はすべて Htmk/Css によって制御され、JS
                  で座標を指定する必要がありません。
                </p>
                <p className="card-caption-info">vue / typescript</p>
              </figcaption>

              <iframe
                src="https://www.youtube.com/embed/vkTfhr-UHwI"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="youtube-iframe"
              ></iframe>
            </figure>

            <h1 className="title">BUSSINESS PRODUCTION</h1>
            <figure className="card-big">
              <figcaption className="card-caption">
                <div className="keyboard-container">
                  <a
                    className="keyboard-image"
                    href="https://gakudohoiku.gaccom.jp/"
                    data-size="980x668"
                  >
                    <img src="img/chart.gif"></img>
                  </a>

                  <a
                    className="keyboard-image"
                    href="https://gakudohoiku.gaccom.jp/"
                    data-size="980x668"
                  >
                    <img src="img/map.gif"></img>
                  </a>
                </div>

                <p className="card-caption-title">
                  <a href="https://github.com/rrepo/hand_game_3Dmodels?tab=readme-ov-file">
                    ガッコム学童保育という学童保育情報サイト
                  </a>
                  です。<br></br>
                  フロントエンドでは県一覧、県、市、丁目、各学童保育、各エリア情報ページ、地図ページ、サイドウィジェット、等のページをchart.js,leafleftを使用し作成しました。
                  バックエンドでは、各ページのapiの作成を行いました。
                  インフラではgcp上でのデプロイやsqlの最適化を行いました。
                </p>
                <p className="card-caption-info">
                  nuxt3 / vue / typescript / express / mysql /docker /gcp /
                  cloud run / cloud storage
                </p>
              </figcaption>
            </figure>

            <h1 className="title">PERSONAL EXPERIENCE</h1>
            <div className="card-two-container">
              <figure className="card">
                <a
                  className="card-image"
                  href="https://www.youtube.com/watch?v=GtDb3T_w64A"
                  data-size="980x668"
                >
                  <iframe
                    data-size="980x668"
                    src="https://www.youtube.com/embed/GtDb3T_w64A"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    <a href="https://www.youtube.com/embed/GtDb3T_w64A">
                      {" "}
                      Musa-Kos ～赤錆を超音波で黒錆に！～
                    </a>
                    FIRST LEGO League
                    2017に出場した際のプロジェクトプレゼンテーションです
                  </p>
                  <p className="card-caption-info"></p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://www.youtube.com/watch?v=vMNjCLhoYuo"
                  data-size="980x668"
                >
                  <iframe
                    data-size="980x668"
                    src="https://www.youtube.com/embed/vMNjCLhoYuo"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen=""
                  ></iframe>
                </a>
                <figcaption className="card-caption">
                  <a href="https://www.youtube.com/watch?v=vMNjCLhoYuo">
                    {" "}
                    FLL Hydrodynamics 350points Musa-Kos
                  </a>
                  <p className="card-caption-title">
                    FIRST LEGO League 2017に出場した際のロボット競技です
                  </p>
                  <p className="card-caption-info"></p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://yn-au.co.jp/Your%20Notice%20As%20Usual/ohisama_murakami/"
                  data-size="980x668"
                >
                  <img
                    src="/img/crosswalk.jpg"
                    alt=""
                    data-size="980x668"
                  ></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title"></p>
                  <img src="" alt=""></img>
                  <p className="card-caption-info">
                    ノーティス株式会社
                    放課後等デイサービスおひさま、障害者就労継続支援B型事業所クロスウォークでのボランティア活動があります
                  </p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://credentials.edx.org/credentials/12d8b805a7fc4e48add49c9c04e7cffb/"
                  data-size="980x668"
                >
                  <img src="/img/pro1.png" alt=""></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    cs50というハーバードのコンピューターサイエンスの{" "}
                    <a href="https://credentials.edx.org/credentials/12d8b805a7fc4e48add49c9c04e7cffb/">
                      {" "}
                      プロフェッショナル資格
                    </a>
                    を持っています。
                  </p>
                  <p className="card-caption-info"></p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://credentials.edx.org/credentials/12d8b805a7fc4e48add49c9c04e7cffb/"
                  data-size="980x668"
                >
                  <img
                    src="/img/pro.png"
                    alt=""
                    data-size="980x668"
                    width="400px"
                  ></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    cs50というハーバードの
                    <a href="https://credentials.edx.org/credentials/12d8b805a7fc4e48add49c9c04e7cffb/">
                      aiの資格
                    </a>
                    を持っています。
                  </p>
                  <p className="card-caption-info"></p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>

              <figure className="card">
                <a
                  className="card-image"
                  href="https://credentials.edx.org/credentials/12d8b805a7fc4e48add49c9c04e7cffb/"
                  data-size="980x668"
                >
                  <img
                    src="/img/gaccom.jpg"
                    alt=""
                    data-size="980x668"
                    width="400px"
                  ></img>
                </a>
                <figcaption className="card-caption">
                  <p className="card-caption-title">
                    株式会社ガッコムで4年インターンを行っており、ガッコム学童保育の開発を行いました。
                  </p>
                  <p className="card-caption-info"></p>
                  <p className="card-caption-url"></p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Works;

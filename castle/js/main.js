
import * as THREE from "three";
import { OrbitControls } from 'https://unpkg.com/three@0.153.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://unpkg.com/three@0.153.0/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "https://unpkg.com/three@0.153.0/examples/jsm/loaders/FBXLoader.js";
import { RGBELoader } from "https://unpkg.com/three@0.153.0/examples/jsm/loaders/RGBELoader.js";
import * as SkeletonUtils from 'https://unpkg.com/three@0.153.0/examples/jsm/utils/SkeletonUtils.js';
import MouseMeshInteraction from '/castle/js/three_mmi.js';
import {CSS2DRenderer, CSS2DObject} from "https://unpkg.com/three@0.153.0/examples/jsm/renderers/CSS2DRenderer.js"
import { loadMap } from "./map.js";
import Castle from "./Castle.js";

let renderer, clock, controls;

function loadScene(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x73bfcc)
  // camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 3000 );
  let viewSize = 900;
  let aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera(-aspectRatio*viewSize / 2, aspectRatio*viewSize / 2, viewSize / 2, -viewSize / 2, 0, 2000 )
  camera.lookAt(new THREE.Vector3(0,0,0)); 
  camera.position.x = Math.PI/4 + 500;
  camera.position.y = 350;
  camera.position.z = Math.PI/4 + 500;

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild( renderer.domElement );
  
  controls = new OrbitControls( camera, renderer.domElement );
  controls.enableRotate = false;
  controls.touches = {
    ONE: THREE.TOUCH.PAN,
    TWO: THREE.TOUCH.DOLLY_ROTATE
  }
  clock = new THREE.Clock();

  mmi = new MouseMeshInteraction(scene, camera);
  loadingManager = new THREE.LoadingManager();
}


function loadLight(){
  // const light = new THREE.AmbientLight( 0x404040 ); // soft white light
  // scene.add( light );

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 3 );
  directionalLight.position.set(-500, 350, 0);
  directionalLight.castShadow = true;
  // directionalLight.shadow.bias = -0.001;
  directionalLight.shadow.mapSize.width = 10000; // default
  directionalLight.shadow.mapSize.height = 10000; // default
  directionalLight.shadow.camera.near = 0.1; // default
  directionalLight.shadow.camera.far = 1000; // default
  directionalLight.shadow.camera.left = 2000;
  directionalLight.shadow.camera.right = -2000;
  directionalLight.shadow.camera.top = 2000;
  directionalLight.shadow.camera.bottom = -2000;
  scene.add( directionalLight );
  const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
  // scene.add( helper );
}

function loadModel(){
  
  const loader2 = new FBXLoader(loadingManager);
  loader2.load('assets/character_pack/FBX/Knight_Golden_Male.fbx', function(fbx){
    clips = fbx.animations
    
  }, function(xhr){
    // console.log((xhr.loaded/xhr.total) * 100);
  }, function(error){
    console.log(error);
  });
  
  // c1 = new Castle({x:450, y:0, z:50}, "wood", 1, false, "#6e3300");
  // console.log(c1)
  
  // c2 = new Castle({x:-450, y:0, z:-100}, "ruin", 1, true, "#888c8d");
  // console.log(c2)
  
  // c3 = new Castle({x:150, y:0, z:-400}, "stone", 1, false, "#ffd700");
  // console.log(c3)

  
}
  
function loadGround(){ 
  const geometry = new THREE.PlaneGeometry( 1000, 1000 );
  const material = new THREE.MeshStandardMaterial( {
    color: 0x96ae3c, 
    side: THREE.DoubleSide,
    roughness: 1
  } );
  const plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = Math.PI/2;
  plane.position.y = 0
  plane.receiveShadow = true;
  scene.add( plane );
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();

    mmi.update();

    const mixerUpdateDelta = clock.getDelta();
    mixers.forEach(mixer => {
      mixer.update( mixerUpdateDelta );
    });

    labelRenderer.render(scene, camera);
    renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function myCallback() {
  Castle.castleList.forEach(castle=>{
    if(castle.isRuin == false && castle.lvl < 10){
      castle.addLvl(1);
    }
  })
}

function rotateCam(){
  let obj = {
    x: scene.rotation.y
  }

  anime({
    targets: obj,
    x: scene.rotation.y + Math.PI/4,
    direction: "normal",
    loop: false,
    easing: "spring(0.5, 50, 50, 30)",
    // duration: 2000,
    update: function() {
      scene.rotation.y = obj.x;
      camera.lookAt(0, 0, 0);
    },
    complete(){
      console.log("rotate")
    }
  });
}
V.rotateButton = document.querySelector('.buttonRotate');
V.rotateButton.onclick = ()=>{rotateCam()}

function loadLabel(){
  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth * 0.999, window.innerHeight * 0.999);
  labelRenderer.domElement.style.position = "absolute";
  labelRenderer.domElement.style.top = "0px";
  labelRenderer.domElement.style.pointerEvents = "none";

  document.body.appendChild(labelRenderer.domElement);
}

function createRandomCastle(){
  let wood = 0;
  let stone = 0;
  let ruin = 0;
  for (let i = -500; i < 500; i=i+10) {
    for (let j = -500; j < 500; j=j+10) {
      if(getRandomInt(2000) == 0){
        if(wood == 0){
          let c = new Castle({x:i, y:0, z:j}, "wood", 1, false, "#6e3300");
          wood = 1;
        }else if(stone == 0){
          let c = new Castle({x:i, y:0, z:j}, "stone", 1, false, "#ffd700");
          stone = 1;
        }else{
          c2 = new Castle({x:-i, y:0, z:-j}, "ruin", 1, true, "#888c8d");
        }
      }
    }
  }
}  


function init(){
  loadScene();
  loadLight();
  loadGround();
  loadModel();
  loadLabel();
  // loadMap();
  loadingManager.onProgress = function(url, loaded, total){
    console.log(loaded / total)
  }
  loadingManager.onLoad = function(){
    console.log("loaded")
    var intervalID = window.setInterval(myCallback, 5000);
    animate();

    Castle.castleList.forEach(castle =>{
      castle.buildCastle();
      if(castle.clan == playerClan){
        castle.createArrows();
      }
    })
  }

  createRandomCastle();
}

init();


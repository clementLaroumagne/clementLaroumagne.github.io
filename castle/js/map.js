
import { GLTFLoader } from "https://unpkg.com/three@0.153.0/examples/jsm/loaders/GLTFLoader.js";

let loadMap = function(){
    const loader = new GLTFLoader(loadingManager);
    loader.load('assets/map.gltf', function(gltf){
        let model = gltf.scene;
        model.traverse(c =>{
            c.receiveShadow = true;
        })
        model.scale.set(10, 10, 10)
        model.position.set(0, -10, 0);
        scene.add(model);
        
    }, function(xhr){
        // console.log((xhr.loaded/xhr.total) * 100);
    }, function(error){
        console.log(error);
    });
}

export {loadMap};
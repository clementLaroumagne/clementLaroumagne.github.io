import * as THREE from "three";
import { GLTFLoader } from "https://unpkg.com/three@0.153.0/examples/jsm/loaders/GLTFLoader.js";
import {CSS2DRenderer, CSS2DObject} from "https://unpkg.com/three@0.153.0/examples/jsm/renderers/CSS2DRenderer.js"
import * as SkeletonUtils from 'https://unpkg.com/three@0.153.0/examples/jsm/utils/SkeletonUtils.js';



class Castle{

    static modelList = [];
    static modelListEmpty = true;
    static castleList = [];

    constructor(position, clan, lvl, isRuin, color){
        this.models = {
            wood: {
                lvl4: "assets/medieval_pack/gltf/Wonder_FirstAge_Level1.gltf",
                lvl7: "assets/medieval_pack/gltf/Wonder_FirstAge_Level2.gltf",
                lvl10: "assets/medieval_pack/gltf/Wonder_FirstAge_Level3.gltf",
                lvlMax: "assets/medieval_pack/gltf/Temple_FirstAge_Level3.gltf",
                army1: "assets/character_pack/gltf/Knight_Golden_Male.gltf",
                army2: "assets/character_pack/gltf/Knight_Golden_Female.gltf"
            },
            stone: {
                lvl4: "assets/medieval_pack/gltf/Wonder_SecondAge_Level1.gltf",
                lvl7: "assets/medieval_pack/gltf/Wonder_SecondAge_Level2.gltf",
                lvl10: "assets/medieval_pack/gltf/Wonder_SecondAge_Level3.gltf",
                lvlMax: "assets/medieval_pack/gltf/Temple_SecondAge_Level3.gltf",
                army1: "assets/character_pack/gltf/Viking_Male.gltf",
                army2: "assets/character_pack/gltf/Viking_Female.gltf"
            },
            ruin: {
                lvl1: "assets/medieval_pack/gltf/Logs.gltf",
                lvl3: "assets/medieval_pack/gltf/TownCenter_FirstAge_Level1.gltf"
            },
            arrow: {
                blue: "assets/direction_arrow/scene.gltf"
            }
        };
        this.position = position;
        this.clan = clan;
        this.lvl = lvl;
        this.isRuin = isRuin;
        this.color = color;
        // this.modelList = [];

        if(Castle.modelListEmpty == true){
            Castle.modelListEmpty = false;
            this.loadModels("wood");
            this.loadModels("stone");
            this.loadModels("ruin");
            this.loadModels("arrow");
        }

        if(this.isRuin == true){
            this.modelLink = this.models.ruin.lvl3;
        }else{
            this.modelLink = this.models[clan]["lvl"+ this.lvlGetter(lvl)];
        }

        Castle.castleList.push(this);

    }

    loadModels = function(clan){
        let moi = this;
        const loader = new GLTFLoader(loadingManager);
        for(let link in this.models[clan]){
            loader.load(this.models[clan][link], function(gltf){
                let model = gltf.scene;
                // model.scale.set(10, 10, 10);
                model.traverse(c =>{
                    c.recieveShadow = true;
                    c.castShadow = true;
                })
                model.name = moi.models[clan][link];
    
                Castle.modelList.push(model);
                
            }, function(xhr){
                // console.log((xhr.loaded/xhr.total) * 100);
            }, function(error){
                console.log(error);
            });
        }
    }

    buildCastle = function(){
        let moi = this;
        const pos = this.position;
        let scale;
        if(moi.model != undefined){
            scale = moi.model.scale;
        }else{
            scale = {x:10, y:10, z:10};
        }
        moi.model = Castle.modelList.find(castle=>castle.name == this.modelLink).clone();
        moi.model.position.set(pos.x, pos.y, pos.z);
        moi.model.scale.set(scale.x, scale.y, scale.z);

        this.createLabel(this.model, "castleLabel");
        this.updateLabel(this.model, this.lvl);

        scene.add(moi.model);
    }

    lvlGetter = function(lvl){
        if(lvl > 10){
            return "Max";
        }else if(lvl <= 4){
            return "4";
        }else if(lvl <= 7){
            return "7";
        }else if(lvl <= 10){
            return "10";
        }
    }

    refresh = function(){
        this.model.remove(this.model.children.find(child=>child.isCSS2DObject == true));
        scene.remove(this.model);
        this.modelLink = this.models[this.clan]["lvl" + this.lvlGetter(this.lvl)];
        this.buildCastle();
    }

    animeCastle = function(lvl){
        let moi = this;
        let obj = {x: moi.model.scale.x}
        
        anime({
          targets: obj,
          x: moi.model.scale.x + lvl,
          direction: "normal",
          loop: false,
          easing: "spring(1, 100, 10, 20)",
        update: function() {
            moi.model.scale.set(obj.x, obj.x, obj.x);
        }
        });
    }

    changeLvl = function(lvl){
        if(this.models[this.clan]["lvl" + this.lvlGetter(this.lvl)] == this.models[this.clan]["lvl" + this.lvlGetter(this.lvl + lvl)]){
            this.lvl = lvl;
            this.updateLabel(this.model, this.lvl);
            // this.animeCastle(0);
            this.model.scale.set(10, 10, 10);
        }else{
            this.updateLabel(this.model, this.lvl)
            this.lvl = lvl;
            this.refresh();
            // this.animeCastle(0);
            this.model.scale.set(10, 10, 10);
        }
    }

    addLvl = function(lvl){
        if(this.models[this.clan]["lvl" + this.lvlGetter(this.lvl)] == this.models[this.clan]["lvl" + this.lvlGetter(this.lvl + lvl)]){
            this.lvl = this.lvl + lvl;
            this.updateLabel(this.model, this.lvl);
            this.animeCastle(lvl);
        }else{
            this.updateLabel(this.model, this.lvl);
            this.lvl = this.lvl + lvl;
            this.refresh();
            this.animeCastle(lvl);
        }
    }

    createLabel = function(model, option){
        let p = document.createElement("p");
        p.classList.add(option);
        p.style.color = this.color;
        let castleLabel = new CSS2DObject(p);
        castleLabel.position.set(0, 3, 0);
        model.add(castleLabel);
    }

    updateLabel = function(model, lvl){
        model.children[1].element.textContent = lvl;
    }

    createArmy = function(destination){
        if(this.lvl >= 2){
            let armyGenre;
            switch (getRandomInt(2)) {
                case 0:
                    armyGenre = "Male"
                    break;
                case 1:
                    armyGenre = "Female"
                    break;
                default:
                    break;
            }
            let armyModel
            if(this.clan == "wood"){
                armyModel = Castle.modelList.find(army=> army.name == `assets/character_pack/gltf/Viking_${armyGenre}.gltf`);

            }else{
                armyModel = Castle.modelList.find(army=> army.name == `assets/character_pack/gltf/Knight_Golden_${armyGenre}.gltf`);
            }
            let armyClone = SkeletonUtils.clone(armyModel);
            armyClone.lvl = Math.round(this.lvl / 2);
            armyClone.clan = this.clan;
            armyClone.scale.set(0.01 * armyClone.lvl, 0.01 * armyClone.lvl, 0.01 * armyClone.lvl);
            armyClone.position.set(this.position.x, this.position.y, this.position.z);
            armyClone.lookAt(destination.position.x, destination.position.y, destination.position.z);
            
            let mixer = new THREE.AnimationMixer(armyClone);
            const run = mixer.clipAction(clips[16]);
            run.play();
            mixers.push(mixer);
            
            this.createLabel(armyClone, "armyLabel");
            this.updateLabel(armyClone, armyClone.lvl);
            // armyList.push(armyClone);
            scene.add(armyClone);
            this.addLvl(-armyClone.lvl);
            this.sendArmy(armyClone, destination);
        }
    }

    sendArmy = function(model, destination){
        let moi = this;
        let obj = {
          x: model.position.x,
          y: model.position.y,
          z: model.position.z
        }
      
        let distance = (Math.sqrt(Math.pow((destination.position.x - model.position.x), 2) + Math.pow((destination.position.y - model.position.y), 2) + Math.pow((destination.position.z - model.position.z), 2)));
      
        var animation = anime({
          targets: obj,
          x: destination.position.x,
          y: destination.position.y,
          z: destination.position.z,
          direction: "normal",
          loop: false,
          duration: distance * 50,
          easing: "linear",
          update: function() {
            model.position.x = obj.x;
            model.position.y = obj.y;
            model.position.z = obj.z;
          },
          complete: function() {
            if(model.clan != destination.clan){
              if((destination.lvl - model.lvl) <= 0){
                destination.changeClan(moi.clan, moi.color, Castle.modelList);
                destination.isRuin = false;
              }else{
                destination.addLvl(-model.lvl)
              }
            }else{
              destination.addLvl(model.lvl);
            }
            model.remove(model.children[1])
            scene.remove(model);
            // arrayRemove(armyList, model);
          }
        });
      
        animation.play();
    }

    changeClan = function(clan, color){
        this.clan = clan;
        this.color = color;
        this.changeLvl(1);
        this.refresh();
        if(clan == playerClan){
            this.createArrows();
        }
    }

    createArrows() {
        let arrow = Castle.modelList.find(arrow=> arrow.name == `assets/direction_arrow/scene.gltf`);

        Castle.castleList.forEach(destination => {
            if(destination != this){
                let arrowClone = SkeletonUtils.clone(arrow);
                arrowClone.position.set(this.position.x, this.position.y, this.position.z);
                arrowClone.lookAt(destination.position.x, destination.position.y, destination.position.z);
                arrowClone.translateZ(50);
                arrowClone.rotateY(-Math.PI/2);
                arrowClone.scale.set(10, 5, 5);
                
                arrowClone.traverse(c =>{
                    c.to = destination;
                    c.from = this;
                    if(c.isObject3D){
                        c.name = "arrow_attack";
                    }
                })
                
                scene.add(arrowClone);
            }
        });
        
        mmi.addHandler('arrow_attack', 'click', function(mesh) {
            mesh.from.createArmy(mesh.to);
        });
    }

    

}

export default Castle;
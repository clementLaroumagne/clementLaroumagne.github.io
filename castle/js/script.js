let camera, scene, loadingManager, mmi, clips, labelRenderer, c1, c2, c3, mixers = [];

let playerClan = "wood";

let V = {}

function arrayRemove(arr, value) { 
    for( var i = 0; i < arr.length; i++){                         
        if ( arr[i] === value) { 
            arr.splice(i, 1); 
            i--; 
        }
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

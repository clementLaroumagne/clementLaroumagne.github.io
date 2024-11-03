var rellax = new Rellax('.rellax');
var mobile = false;
M = {};

M.init = function(){

}

V = {};



V.init = function(){
    let liens = document.querySelectorAll('.divNav a');
    liens.forEach(lien => {
        lien.addEventListener('click', C.handlerClickLink);
    });

    V.downPart = document.querySelector('.downPart');
    V.goTop = document.querySelector('.goTop');
    V.goTop.addEventListener('click', ()=>{window.scroll(0, 0)})
    
    window.addEventListener('scroll', C.handlerScroll);

    if(window.mobileCheck()){
        mobile = true;
        document.querySelector("html").style.scrollBehavior = "smooth";
        rellax.destroy();
    }
}

V.scrollTo = function(){
    if(!mobile){
        var easing = BezierEasing(1, 0, 1, 1);
        let done = false;
        let x = 0.6;

        function scroll(){
            let s = window.scrollY;
            let h = window.innerHeight;
            if (s >= h){
                done = true;
            }
            else{
                x += 1/250;
                let scrollBy = easing(x) / 100 * h;
                if(window.scrollY + Math.abs(scrollBy) > h){
                    window.scroll(0, h);
                }
                else{
                    window.scrollBy(0, Math.abs(scrollBy));
                }
                window.requestAnimationFrame(scroll);
            }
        }

        window.requestAnimationFrame(scroll);
    }
    else{
        console.log("scroll mobile", window.innerHeight)
        window.scrollTo(0, window.innerHeight);
    }
}

V.triArt = function(){
    let liens = document.querySelectorAll('.productionClass a');

    V.troisD = document.querySelector('.troisD');
    V.videos = document.querySelector('.artVideos');
    V.graphisme = document.querySelector('.graphisme');
    V.planche = document.querySelector('.artPlanche');

    liens.forEach(lien => {
        lien.addEventListener('click', C.handlerClickLinkTri);
    });
}

C = {};

C.init = function(){
    V.init();
    M.init();

}

C.handlerScroll = function(){
    if(window.scrollY > window.innerHeight){
        V.goTop.style.animation = "forwards apear 0.5s";
    }
    else{
        V.goTop.style.animation = "forwards desapear 0.5s";
    }
}

C.handlerClickLink = function(ev){
    if(ev.target.textContent == "I. A propos"){
        let template = document.querySelector('.templateApropos');
        V.downPart.innerHTML = template.innerHTML;
    }
    if(ev.target.textContent == "II. Productions"){
        let template = document.querySelector('.templateProductions');
        V.downPart.innerHTML = template.innerHTML;
        V.triArt();
    }
    if(ev.target.textContent == "III. Contact"){
        let template = document.querySelector('.templateContact');
        V.downPart.innerHTML = template.innerHTML;
    }
    V.scrollTo();
}

C.handlerClickLinkTri = function(ev){
    ev.target.parentNode.childNodes.forEach(element => {
        element.style.textDecoration = "none";
    });

    V.videos.style.display = "flex";
    V.planche.style.display = "flex";
    V.graphisme.style.display = "flex";
    V.troisD.style.display = "flex";

    if (ev.target.textContent == "3D"){
        ev.target.style.textDecoration = "underline";
        V.videos.style.display = "none";
        V.planche.style.display = "none";
        V.graphisme.style.display = "none";
    }
    if (ev.target.textContent == "Vidéos"){
        ev.target.style.textDecoration = "underline";
        V.troisD.style.display = "none";
        V.planche.style.display = "none";
        V.graphisme.style.display = "none";
    }
    if (ev.target.textContent == "Photographies"){
        ev.target.style.textDecoration = "underline";
        V.videos.style.display = "none";
        V.troisD.style.display = "none";
        V.graphisme.style.display = "none";
    }
    if (ev.target.textContent == "2D"){
        ev.target.style.textDecoration = "underline";
        V.videos.style.display = "none";
        V.planche.style.display = "none";
        V.troisD.style.display = "none";
    }
}

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

C.init();

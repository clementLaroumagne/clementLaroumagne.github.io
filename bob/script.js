//Aplication test API OMDB pour la serie BOB l'Eponge

let M = {};

M.init = function() {
    M.dataSerie = {};
    M.dataSaison = {
        liste: [],
    };
    M.dataSaisonSort = {
        liste: []
    };
    M.dataEpisode = {};
    M.dataListeEpisode = {
        liste: [],
        listeSort: []
    };
}

let V = {};

V.init = function() {
    V.divSaisons = document.querySelectorAll('.maison');
    V.content = document.querySelector('.content__template');
    V.allEpisodeButton = document.querySelector('.allEpisodeButton');

    V.saisonSort = false;
    V.episodesSort = false;

    for(let i=0;i<V.divSaisons.length;i++){
        V.divSaisons[i].addEventListener('click', C.handler_clickOnSaison);
        V.divSaisons[i].addEventListener('mouseover', C.handler_hoverOnSaison);
        V.divSaisons[i].addEventListener('mouseleave', C.handler_leaveOnSaison);


    }
    
    V.content.addEventListener('click', C.handler_clickOnEpisode);
    V.allEpisodeButton.addEventListener('click', C.handler_clickOnAllEpisodes);
    
    // V.sortBox.addEventListener('click', C.handler_clickOnSort);
    
    V.textSaison = document.querySelectorAll('.saison__text');
    console.log(V.textSaison)
    
}


V.renderEpisode = function (data){ // Render Episode en particulier avec data d'un episode
    let template = document.querySelector("#detailEpisode");
    console.log(data.imdbID);
    let divEpisode = document.querySelector('.episode' + data.imdbID);
    
    let html = template.innerHTML;
    html = html.replace('{{titre}}', data.Title);
    html = html.replace('{{episodeNB}}', data.Episode);
    html = html.replace('{{note}}', data.imdbRating);
    html = html.replace('{{date}}', data.Released);
    html = html.replace('{{info}}', data.Plot)
    html = html.replace('{{image}}', data.Poster)
    divEpisode.innerHTML = html;
}

V.renderSaison = function(data) { // Render Saison en particulier avec data d'une saison en particulier
    console.log(data)
    
    let template = document.querySelector('#template__saison');
    let content = document.querySelector('.content__template');
    content.innerHTML = "";
    let html = template.innerHTML;

    html = html.replace('{{date}}', 2000);
    

    content.innerHTML = html;

    let templateListEpisode = document.querySelector('#template__episode');
    let listEpisode = document.querySelector('.saison__episodes__list');

    V.saisonCross = document.querySelectorAll('.croix');
    V.saisonCross = addEventListener('click', C.handler_clickOnCrossSaison);

    for (let i=0;i<data.length;i++){
        let idEpisode = data[i].imdbID;
        let xhr = new XMLHttpRequest();
        xhr.open('get', "https://www.omdbapi.com/?apikey=68f04feb&i=" +idEpisode + "&plot=full");
        
        //xhr.open('get', "https://www.omdbapi.com/?apikey=53187fd6&t=SpongeBob&plot=full&Season=" + idSaison + "&Episode=" + ev.target.dataset.episode);
        // console.log("https://www.omdbapi.com/?apikey=53187fd6&i=" +idEpisode + "&plot=full")
        
        let handler_response = function(){
            let dataEpisode = JSON.parse( xhr.responseText );
            let html = templateListEpisode.innerHTML;
            html = html.replace('{{title}}', dataEpisode.Title);
            html = html.replace('{{srcIMG}}', dataEpisode.Poster);

            html = html.replaceAll('{{episode}}', dataEpisode.imdbID)
            html = html.replace('{{plot}}', dataEpisode.Plot)
            html = html.replace('{{date}}', dataEpisode.Released)
            html = html.replace('{{note}}', dataEpisode.imdbRating);

            listEpisode.innerHTML += html;
            // console.log(dataEpisode)
        }
    
        xhr.addEventListener('load', handler_response);
        xhr.send();
        
    }
    
}

V.renderAllEpisodes = function(data) { // Render all episodes avec tableau de tous les episodes
    console.log('render all')

    let template = document.querySelector('#template__allEpisode');
    let content = document.querySelector('.content__template');
    let templateEpisode = document.querySelector('#template__episode__short');
    let html = template.innerHTML;
    html = html.replace('{{nbTotalEpisodes}}', M.dataListeEpisode.liste.length);
    content.innerHTML = html;
    let listeEpisode = document.querySelector('.template__list__episode');
    
    V.cross = document.querySelector(".allEpisode__cross")
    V.sortBox = document.querySelector('#sortBox');
    V.sortDiv = document.querySelector('.sortDiv');
    V.sortBox2 = document.querySelector('#sortBox2');
    V.sortDiv2 = document.querySelector('.sortDiv2');
    V.noteMinBox = document.querySelector('#noteMin');

    V.sortBox.addEventListener('click', C.handler_clickOnSort);
    V.cross.addEventListener('click', C.handler_clickOnCross);
    

    for (let i=0;i<M.dataListeEpisode.liste.length;i++){
        let html = templateEpisode.innerHTML;
        if (V.noteMinBox.value == ""){
            noteMin = 0;
        }
        else{
            noteMin = V.noteMinBox.value;
            console.log(noteMin);
        }
        if (data[i].imdbRating != "N/A"){
            if (data[i].imdbRating>noteMin){
                if (V.sortBox.checked == true){
                    html = html.replace('{{title}}',data[i].Title);
                }
                else{
                    html = html.replace('{{title}}', "Episode " + (i+1) + " : " + data[i].Title);
                }
                
                html = html.replace('{{note}}', data[i].imdbRating);
                html = html.replaceAll('{{idEpisode}}', data[i].imdbID);
                // html = html.replace('{{saison}}', data.Season);
        
                listeEpisode.innerHTML += html;
            }
        }
    } 
}

V.renderSortEpisode = function(data) {
    let templateEpisode = document.querySelector('#template__episode__short');
    let listeEpisode = document.querySelector('.template__list__episode');
    listeEpisode.innerHTML = "";

    if (V.noteMinBox.value == ""){
        noteMin = 0;
        console.log(noteMin);
    }
    else{
        noteMin = V.noteMinBox.value;
        console.log(noteMin);
    }
    for (let i=0;i<M.dataListeEpisode.liste.length;i++){
        if (data[i].imdbRating != "N/A"){
            if (data[i].imdbRating>noteMin){
                let html = templateEpisode.innerHTML;
                html = html.replace('{{title}}',data[i].Title);        
                html = html.replace('{{note}}', data[i].imdbRating);
                html = html.replaceAll('{{idEpisode}}', data[i].imdbID);
                

                listeEpisode.innerHTML += html;
            }
        }
    }
}

V.renderOrderEpisode = function(){

}

let C = {};

C.init = function() {
    M.init();
    V.init();

    C.loadAllEpisodes(); //Charge la liste des saison + liste episode lors de l'arrivée sur la page
}

C.handler_clickOnEpisode = function(ev){ // Appel de l'API concernant un épisode en particulier + render
console.dir(ev.target)
    
    if (ev.target.classList[0]=="episode__item" || ev.target.classList[0]=="saison__episode__title"){
        console.log('click Episode !')
        let idEpisode = ev.target.dataset.episode;
        console.log(ev.target.dataset.episode)
        
        let xhr = new XMLHttpRequest();
        xhr.open('get', "https://www.omdbapi.com/?apikey=68f04feb&i=" +idEpisode + "&plot=full");
        
        //xhr.open('get', "https://www.omdbapi.com/?apikey=53187fd6&t=SpongeBob&plot=full&Season=" + idSaison + "&Episode=" + ev.target.dataset.episode);
        console.log("https://www.omdbapi.com/?apikey=68f04feb&i=" +idEpisode + "&plot=full")
        
        let handler_response = function(){
            M.dataEpisode = JSON.parse( xhr.responseText );
            let idSaison = M.dataEpisode.Season;
            V.renderEpisode(M.dataEpisode);

        }
    
        xhr.addEventListener('load', handler_response);
        xhr.send();
        
    }   
}

C.handler_clickOnSaison = function(ev) { // Render Saison à partir de id de la div clickée
    console.log('click Saison !')
    
    let content = document.querySelector('.content__template');
    content.innerHTML = "";
    let nbSaison = ev.target.dataset.saison;
    console.log(nbSaison)
    
    V.renderSaison(M.dataSaisonSort.liste[nbSaison]);

    
    
}

C.loadAllEpisodes = function() { // Appel de l'API pour obtenir les informations de M.dataSerie
    console.log('load All Episodes !');

        let xhr = new XMLHttpRequest();
        xhr.open('get', "https://www.omdbapi.com/?apikey=68f04feb&t=SpongeBob&plot=full");
        
        let handler_response = function(){
            M.dataSerie = JSON.parse( xhr.responseText );
            if (M.dataSerie.Response == "True"){
                C.callAllSaison(M.dataSerie);
            }
        }

        xhr.addEventListener('load', handler_response);
        xhr.send();
}

C.callAllSaison = function(data) { //Appel API pour remplir M.dataSaison & M.dataListeEpisode à l'aide de M.dataSerie

    console.log("call all saison")

    for (let i=1;i<(data.totalSeasons);i++){
        console.log(data.totalSeasons)
        let xhr = new XMLHttpRequest();
        xhr.open('get', "https://www.omdbapi.com/?apikey=68f04feb&t=SpongeBob&plot=full&Season=" + i);
        
        let handler_response = function(){
            let data = JSON.parse( xhr.responseText );
            if (data.Response == "True"){
                M.dataSaison.liste.push(data.Episodes);
                M.dataSaisonSort.liste.push(data.Episodes);
                for (let j=0;j<data.Episodes.length;j++){
                    M.dataListeEpisode.liste.push(data.Episodes[j]);
                    M.dataListeEpisode.listeSort.push(data.Episodes[j]);
                }
            }
            
        }

        xhr.addEventListener('load', handler_response);
        xhr.send();
    }
    for (let i=0;i<data.totalSeasons;i++){
        V.saisonTextes = document.querySelector('.saison' + [i]);
    }
}

C.handler_clickOnAllEpisodes = function() { // Render All Episodes
    V.renderAllEpisodes(M.dataListeEpisode.liste);
    V.sortBox.style.display = 'flex';
    // if (V.episodesSort == false){
    //     C.sortNoteAllEpisodes();
    //     console.log("sort lunch");
    // }
    C.sortNoteAllEpisodes();
}



C.sortNoteAllEpisodes = function() {
    let comp = function(a, b){
        if (a.imdbRating == "N/A"){
            return -1;
        }
        else{
            return a.imdbRating - b.imdbRating;
        }
    }

    M.dataListeEpisode.listeSort.sort(comp);
    M.dataListeEpisode.listeSort.reverse();
    console.log("sort All Episode")
    console.log(M.dataListeEpisode.listeSort)
}

C.handler_clickOnSort = function() {
    console.log("click on sort")
    V.sortBox = document.querySelector('#sortBox');
    if (V.sortBox.checked == true){
        console.log('render Sort');
        V.renderSortEpisode(M.dataListeEpisode.listeSort);
    }
    else{
        console.log('render liste');
        V.renderSortEpisode(M.dataListeEpisode.liste);
    }
}

C.handler_clickOnCross = function(){
    console.log("clean !")
    V.content.innerHTML = "";
}

C.handler_clickOnCrossSaison = function(ev){
    console.log(ev.target.classList)
    if (ev.target.classList[0] == "saison__croix" || ev.target.classList[0] == "allEpisode__cross__bar"){
        V.content.innerHTML = "";
    }
}

C.handler_hoverOnSaison = function(ev) {
    let nb = (ev.target.dataset.saison -1 );
    V.textSaison[nb].style.transform = "translateY(-23rem)";
}

C.handler_leaveOnSaison = function(ev) {
    let nb = (ev.target.dataset.saison -1 );
    V.textSaison[nb].style.transform = "translateY(0)";
}

C.init();
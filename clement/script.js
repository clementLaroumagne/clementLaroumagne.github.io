let M = {}

M.init = function(){
    M.data = {
        sitesWeb:[
            {
                nom: "Pyrofigters",
                url: "https://pyrofighters.online",
                srcimg : "images/pyro.png",
                text: "Jeu multijoueur en ligne avec boutique et système de compte utiliateur et boutique, utilise NextJS, BunJS, ThreeJS, NodeJS, MongoDB, Symfony, MySQL."
            },
            {
                nom: "POC - Webapp",
                url: "https://clemz.fr/POC",
                srcimg : "images/tri2.png",
                text: "Proof of concept, application web installable en JS natif, elle utilise le design Material you de Google et fonctionne avec un web socket utilisant socket.io"
            },
            {
                nom: "Portfolio Clémentine Dufour",
                url: "https://clemz.fr/clementine",
                srcimg : "images/clem.png",
                text: "Portfolio regroupant les travaux vidéos/3D de Clémentine Dufour réalisé en JS vanilla"
            },
            {
                nom: "Data visualisation",
                url: "https://clemz.fr/dataViz",
                srcimg : "images/dataviz.png",
                text: "Site desktop mettant en avant des statistiques concernant les départ en vacances de français, il utilise le framework reveal.js, les illustrations sont faites main"
            },
            {
                nom: "Bob L'éponge",
                url: "https://clemz.fr/bob",
                srcimg : "images/bob.png",
                text: "Projet Tutoré fait en une semaine à 4 personnes, utilisation de l'API IMDb, l'effet parallax sur le héros utilise une légère librairie, les illustrations sont faites main"
            },
        ],
        testsGraphiques:[
            {
                nom: "La Petite Maison",
                url: "https://clemz.fr/petiteMaison",
                srcimg : "images/petite.png",
                text: "Test de la librairie THREE.JS, import d'un modèle 3D provenant d'internet, les mouvements de la souris font pivoter le modèle"
            },
            {
                nom: "3D hoover",
                url: "https://clemz.fr/3Dhoover",
                srcimg : "images/3d.png",
                text: "Test d'un effet 3D lors du passage de la souris sur un élément, CSS natif"
            },
            {
                nom: "Lava Hammer",
                url: "https://clemz.fr/hammerAnime",
                srcimg : "images/hammer.png",
                text: "Martau animé en 3D, utilisation de la librairie THREE.JS et de la librairie AnimeJS pour l'animation"
            },
            {
                nom: "HDRI",
                url: "https://clemz.fr/hdri",
                srcimg : "images/hdri.png",
                text: "Test de la librairie THREE.JS, les mouvements de la souris font pivoter le modèle, ajout d'un environnement HDRI"
            },
            {
                nom: "Soir d'été",
                url: "https://clemz.fr/soirEte",
                srcimg : "images/soir.png",
                text: "Test de la librairie THREE.JS, import de modèles 3D provenant d'internet, squelette du personnage avec animation, ajout d'ombres et réflexions"
            },
        ],
        jeux:[
            {
                nom: "Castle Impact",
                url: "https://clemz.fr/castleImpact",
                srcimg: "images/castle.png",
                text: "Mini jeu de rythme développé en JS vanilla utilisant le canvas, les illustrations sont faites main par 2 amis. Fonctionne uniquement sur Desktop"
            },
            {
                nom: "Castle conquest",
                url: "https://clemz.fr/castle",
                srcimg: "images/castle2.png",
                text: "Jeu de stratégie de plateau en ligne, le but est de capturer le château adverse, le jeu est en cours de développement, il utilise la librairie Phaser threeJS"
            }
        ],
        links:[
            {
                nom: "Github",
                url: "https://github.com/clementLaroumagne",
                srcimg: "images/github.png",
                text: "Mon github"
            },
            {
                nom: "Linkedin",
                url: "https://www.linkedin.com/in/cl%C3%A9ment-laroumagne-89185a210/",
                srcimg: "images/linkedin.png",
                text: "Mon Linkedin"
            },
            {
                nom: "Mail",
                url: "mailto:laroumagne24@gmail.com",
                srcimg: "images/mail.svg",
                text: "Mon mail"
            },
            {
                nom: "CV",
                url: "images/cv.pdf",
                srcimg: "images/cv.svg",
                text: "Mon CV"
            },
        ]
    }
}

let V = {}

V.init = function(){
    V.siteList = document.querySelector('#sites-web-div').querySelector('.card-list');
    V.testList = document.querySelector('#test-graphiques-div').querySelector('.card-list');
    V.jeuList = document.querySelector('#jeux-div').querySelector('.card-list');
    V.linkList = document.querySelector('#links-div').querySelector('.links-list');

    let cursor = document.querySelector('.div__flou');

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        updateCursor();
    });

    window.addEventListener('scroll', function() {
        updateCursor();
    });

    function updateCursor() {
        cursor.style.left = (mouseX + window.scrollX - 20) + 'px';
        cursor.style.top = (mouseY + window.scrollY - 20) + 'px';
    }

    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = 0;
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = 1;
    });

    
    window.addEventListener('mousedown', function() {
        cursor.style.transform = 'scale(0.7)';
        cursor.style.backdropFilter = 'blur(5px)';
    });

    window.addEventListener('mouseup', function() {
        cursor.style.transform = 'scale(1)';
        cursor.style.backdropFilter = 'blur(1px)';
    });

    //if desktop user
    if (window.innerWidth > 768) {
        cursor.classList.add('desktop');
    }
}

let C = {}

C.createCard = function(){
    let data = Object.assign(M.data);
    let template = document.querySelector('#card-template');
    let templateLink = document.querySelector('#link-template');
    console.log(data)
    data.sitesWeb.forEach(site => {
        let html = template.innerHTML;
        html = html.replaceAll('{{url}}', site.url);
        html = html.replace('{{titre}}', site.nom);
        html = html.replaceAll('{{src}}', site.srcimg);
        html = html.replace('{{text}}', site.text);
        V.siteList.innerHTML += html;
    });
    data.testsGraphiques.forEach(site => {
        let html = template.innerHTML;
        html = html.replaceAll('{{url}}', site.url);
        html = html.replace('{{titre}}', site.nom);
        html = html.replaceAll('{{src}}', site.srcimg);
        html = html.replace('{{text}}', site.text);
        V.testList.innerHTML += html;
    });
    data.jeux.forEach(site => {
        let html = template.innerHTML;
        html = html.replaceAll('{{url}}', site.url);
        html = html.replace('{{titre}}', site.nom);
        html = html.replaceAll('{{src}}', site.srcimg);
        html = html.replace('{{text}}', site.text);
        V.jeuList.innerHTML += html;
    });
    data.links.forEach(site => {
        let html = templateLink.innerHTML;
        html = html.replaceAll('{{url}}', site.url);
        html = html.replace('{{titre}}', site.nom);
        html = html.replaceAll('{{src}}', site.srcimg);
        html = html.replace('{{text}}', site.text);
        document.querySelector('#links-div').innerHTML += html;
    });
}

C.init = function(){
    M.init();
    V.init();
    C.createCard();
}

C.init();
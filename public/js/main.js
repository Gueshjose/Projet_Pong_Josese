/**
 * récupération de la div pong 
 */
let pong = document.querySelector('#pong');
/**
 * récupération de la div score 
 */
let score = document.querySelector('#score');

/**
 * récupération de la div play 
 */
let play = document.querySelector('#play');

/**
 * récupération de la div joueur 
 */
let player = document.querySelector('#joueur');
player.style.top = '50%';
let tailleJ = player.style.height;
/**
 * récupération de la div ordi 
 */
let ordi = document.querySelector('#ordi');
let tailleO = ordi.style.height;

/**
 * récupération de la div balle
 */
let balle = document.querySelector('#balle');


//Données de la div container
let hauteurMax = (pong.getBoundingClientRect().bottom);
let largeurMax = (pong.getBoundingClientRect().right);


//Données de la balle 
balle.style.top = (Math.random() * (hauteurMax / 4) + hauteurMax / 3) + 'px';
let previousBall = (Math.random() * (hauteurMax / 4) + hauteurMax / 3) + 'px';
balle.style.left = (Math.random() * (largeurMax / 4) + largeurMax / 3) + 'px';
let speedBallY = 2;
let speedBallX = 2;
let speedOY = 8;

ordi.style.top = Number(balle.style.top.slice(0, -2)) + 'px';



/**
 * 
 * Fonction deplacement
 */
function deplacement(e) {
    // Déplacement à la souris
    if (e.clientY < (hauteurMax - player.getBoundingClientRect().height)) {
        player.style.top = e.clientY + 'px';
    }

    // Déplacement tactile
    if (e.touches[0].clientY < (hauteurMax - player.getBoundingClientRect().height)) {
        player.style.top = e.touches[0].clientY + 'px';
    }
}

/**
 * Lancement du jeux lorsqu'on appuie sur play
 */
play.addEventListener('click', function () {
    play.setAttribute('style', 'display:none')
    jouer();

})

/**
 * Fonction mouvement de la barre de l'ia 
 */
ordi.style.top = balle.style.top;

function moveOrdi() {
    console.log(Math.random()*(Number(balle.style.top.slice(0, -2) - speedBallY)-10)+((Number(balle.style.top.slice(0, -2) - speedBallY)+10)))
    


    if ( !( (ordi.style.top.slice(0, -2) <= 0 && balle.style.top.slice(0, -2) < previousBall)   ^ (ordi.style.top.slice(0, -2) >= hauteurMax - ordi.getBoundingClientRect().height && balle.style.top.slice(0, -2) > previousBall))) {
        ordi.style.top = (Math.random()*(3-(-3)+1)+(-3))+Number(balle.style.top.slice(0, -2) )+ 3.5 + 'px';
        previousBall = Number(balle.style.top.slice(0, -2)); 
    }
}

/**
 * 
 * Fonction pour les colisions ball et barres 
 */
function colission(j, b) {

    if ((j.y + j.height) < (b.y) || (b.y + b.height) < (j.y) || ((j.x + j.width) < b.x) || (j.x > (b.x + b.width))) {

        return false;
    } else {
        speedBallX *= -1.15;
        if ((b.y > (j.y + (j.height / 2)))) {
            speedBallY *= -1.15;
        } else {
            speedBallY *= 1.15;
        }
        return true
    }
}
/*
 * function qui fait bouger la balle
 */
function jouer() {
    /**
     * On  appel la fonction deplacement lors d'un mouvement de la souris
     */
    pong.addEventListener('mousemove', deplacement);

    /**
     * On  appel la fonction deplacement lors d'un mouvement tactile
     */
    pong.addEventListener('touchmove', deplacement);

    //Mise à jour de la position de la balle 
    balle.style.top = Number(balle.style.top.slice(0, -2)) + speedBallY + 'px';
    balle.style.left = Number(balle.style.left.slice(0, -2)) + speedBallX + 'px';

    //Changement de sens quand la balle touche le haut ou le bas de l'écran
    if (Number(balle.style.top.slice(0, -2)) <= 0 || Number(balle.style.top.slice(0, -2)) > hauteurMax - balle.getBoundingClientRect().height) {
        speedBallY *= -1;
    }

    //Vérification si la ball passe derrière le stick de l'ia

    if (Number(balle.style.left.slice(0, -2)) <= 0) {
        score.querySelectorAll('h1')[1].style.color = 'cyan';
        score.querySelectorAll('h1')[1].style.textShadow = ' 0px 3px 5px greenYellow';
        score.querySelectorAll('h1')[1].innerText = Number(score.querySelectorAll('h1')[1].innerText) + 1;
        balle.style.top = (Math.random() * (hauteurMax / 4) + hauteurMax / 3) + 'px';
        balle.style.left = (Math.random() * (largeurMax / 4) + largeurMax / 3) + 'px';
        balle.style.backgroundColor = 'yellow'
        ordi.style.backgroundColor = 'yellowgreen'
        ordi.style.boxShadow = '0px 0px 15px yellowgreen';
        player.style.height = tailleJ;
        ordi.style.height = tailleO;
        player.style.backgroundColor = 'red'
        player.style.boxShadow = '0px 0px 15px red';
        setTimeout(() => {
            score.querySelectorAll('h1')[1].style.color = 'white';
            score.querySelectorAll('h1')[1].style.textShadow = '0px 3px 5px cyan';
            balle.style.backgroundColor = 'white';
            ordi.style.backgroundColor = 'white'
            ordi.style.boxShadow = '0px 0px 15px white';
            player.style.backgroundColor = 'white'
            player.style.boxShadow = '0px 0px 15px white';
        }, 1500);
        speedBallY = 2;
        speedBallX = 2;


    }
    //Vérification si la ball passe derrière le stick de l'ia
    if (Number(balle.style.left.slice(0, -2)) > largeurMax - balle.getBoundingClientRect().width) {
        score.querySelector('h1').style.color = 'cyan';
        score.querySelector('h1').style.textShadow = ' 0px 3px 5px greenYellow';
        score.querySelector('h1').innerText = Number(score.querySelector('h1').innerText) + 1;
        balle.style.top = (Math.random() * (hauteurMax / 4) + hauteurMax / 3) + 'px';
        balle.style.left = (Math.random() * (largeurMax / 4) + largeurMax / 3) + 'px';
        balle.style.backgroundColor = 'yellow';
        player.style.backgroundColor = 'yellowgreen'
        player.style.boxShadow = '0px 0px 15px yellowgreen';
        player.style.height = tailleJ;
        ordi.style.height = tailleO;

        ordi.style.backgroundColor = 'red'
        ordi.style.boxShadow = '0px 0px 15px red';
        setTimeout(() => {
            score.querySelector('h1').style.color = 'white';
            score.querySelector('h1').style.textShadow = '0px 3px 5px cyan';
            balle.style.backgroundColor = 'white';
            player.style.backgroundColor = 'white'
            player.style.boxShadow = '0px 0px 15px white';
            ordi.style.backgroundColor = 'white'
            ordi.style.boxShadow = '0px 0px 15px white';

        }, 1000);
        speedBallY = 2;
        speedBallX = 2;

    }

    // Verification si la ball touche le stick du joueur
    if (colission(player.getBoundingClientRect(), balle.getBoundingClientRect())) {
        player.style.backgroundColor = 'cyan'
        player.style.boxShadow = '0px 0px 15px cyan';
        player.style.height -= 5;

        setTimeout(() => {
            player.style.backgroundColor = 'white'
            player.style.boxShadow = '0px 0px 15px white';
        }, 1000);
    };
    // Verification si la ball touche le stick de l'ia 
    if (colission(ordi.getBoundingClientRect(), balle.getBoundingClientRect())) {
        ordi.style.backgroundColor = 'cyan'
        ordi.style.boxShadow = '0px 0px 15px cyan';
        ordi.style.height -= 5;

        setTimeout(() => {
            ordi.style.backgroundColor = 'white'
            ordi.style.boxShadow = '0px 0px 15px white';
        }, 1000);
    };
    //Appel de la fonction qui fait bouger le stick de l'ia 
    moveOrdi();
    //Appel en boucle de la fonction jouer 
    requestAnimationFrame(jouer);

}
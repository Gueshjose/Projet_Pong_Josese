
/**
 * récupération de la div pong 
 */
let pong= document.querySelector('#pong');

/**
 * récupération de la div joueur 
 */
let player=document.querySelector('#joueur');

/**
 * récupération de la div ordi 
 */
 let ordi= document.querySelector('#ordi');

 /**
  * récupération de la div balle
  */
 let balle=document.querySelector('#balle');


/**
 * On  appel la fonction deplacement lors d'un mouvement de la souris
 */
pong.addEventListener('mousemove',deplacement);
let hauteurMax=(pong.getBoundingClientRect().bottom-player.getBoundingClientRect().height);
let largeurMax=(pong.getBoundingClientRect().right-player.getBoundingClientRect().width);
balle.style.top=(Math.random()*(((hauteurMax-150)+150)+1)+150) + 'px';
balle.style.left=(Math.random()*(((largeurMax-150)+150)+1)+150) + 'px';
/**
 * 
 * Fonction deplacement
 */
function deplacement(e){
    if(e.clientY<hauteurMax){
    player.style.top =e.clientY + 'px';
}
}
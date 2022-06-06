const sonido1 = new Audio();
const sonido2 = new Audio();
const sonido3 = new Audio();
const sonido4 = new Audio();
const error = new Audio();
let secuencia = new Object;
let nroRonda;
let nroClick = 1;
let intervaloId;
let idSecuencia = 1;
let relojJuego = 1000;

sonido1.src = "verde.mp3";
sonido2.src = "rojo.mp3";
sonido3.src = "azul.mp3";
sonido4.src = "amarillo.mp3";
error.src = "error.mp3"

const $tableroRonda = document.querySelector("#nroRonda");
const $turnos = document.querySelector("#turnos");
const $boton1 = document.querySelector("#btnVerde");
const $boton2 = document.querySelector("#btnRojo");
const $boton3 = document.querySelector("#btnAzul");
const $boton4 = document.querySelector("#btnAmarillo");
const $botonStart = document.querySelector("#btnStart");
const $tituloRonda = document.querySelector("#tituloRonda");
const $divSwitchDificultad = document.querySelector("#divSwitchDificultad");
const $botonSwitchDificultad = document.querySelector("#switch-label");


const botones = {
    1: $boton1,
    2: $boton2,
    3: $boton3,
    4: $boton4
}

const sonidos = {
    1: sonido1,
    2: sonido2,
    3: sonido3,
    4: sonido4
}

function generaRandom(){
    return Math.floor((Math.random() * 4) + 1);
}

$botonSwitchDificultad.onclick = function seleccionaDificultad() {
    if ($botonSwitchDificultad.checked == true){
        relojJuego = 500;
    } else {
        relojJuego = 1000;
    }
    console.log(relojJuego);
}

$botonStart.onclick = function(){
    desablitarStart();
    nroRonda = 1;
    document.querySelector("#body").className = "gradiente";
    $tituloRonda.className = "";
    $tituloRonda.innerText = "Ronda:";
    $tableroRonda.className = "score";
    $tableroRonda.innerText = nroRonda;
    $divSwitchDificultad.className = "switch-button";
    $turnos.innerText = "Memoriza Esto!!!";
    Object.keys(botones).forEach(function(key){botones[key].disabled = false});
    window.setTimeout(rondaPc, relojJuego);
}

function desablitarStart(){
    $botonStart.disabled = true;
}

function habilitarStart(){
    $botonStart.disabled = false;
}

function rondaPc(){
        let random = generaRandom();
        secuencia[nroRonda] = random;
        reproduceSecuencia();
        $tableroRonda.innerText = nroRonda;
        window.setTimeout(rondaUsuario, relojJuego, secuencia);
}

function reproduceSecuencia(){
        intervaloId = window.setInterval(leeSecuencia, (relojJuego*0.7));
}

function leeSecuencia(){
    if(idSecuencia <= Object.keys(secuencia).length){
        const key = secuencia[idSecuencia];
        const reproducir = sonidos[key];
        reproducir.play();
        const botonActual = botones[key];
        botonActual.className = `boton${key}Brilla`;
        window.setTimeout(borraBrillo, (relojJuego*0.2),key, botonActual)
        idSecuencia ++;
    }else{
    clearInterval(intervaloId);
    idSecuencia = 1;
    }
}

function borraBrillo(key, botonActual){
    botonActual.className = `boton${key}`;
}

function rondaUsuario(secuencia){
nroClick = 1;
$turnos.innerText = "Tu turno!!!";
    $boton1.onclick = function() {
        botonActual = 1;
        chequeaGame(botonActual);
    }
    
    $boton2.onclick = function() {
        botonActual = 2;
        chequeaGame(botonActual);
    }
    
    $boton3.onclick = function() {
        botonActual = 3;
        chequeaGame(botonActual);
    }
    
    $boton4.onclick = function() {
        botonActual = 4;
        chequeaGame(botonActual);
    }
}

function chequeaGame(botonActual){
    if(secuencia[nroClick] === botonActual) {
        sonidos[botonActual].play();
        if (nroClick === Object.keys(secuencia).length){
            $turnos.innerText = "Memoriza Esto!!!";
            nroRonda ++;
            nroClick ++;
            return window.setTimeout(rondaPc, (relojJuego*1.6)), nroClick;
        }else{
            nroClick ++;
            return nroClick;
        }
    }else{
        error.play();
        $turnos.innerText = "Game Over";
        gameOver();
}
}

function gameOver(){
    secuencia = {};
    document.querySelector("#body").className = "gradienteGameOver";
    $tableroRonda.className = "oculto";
    $divSwitchDificultad.className = "oculto";
    $tituloRonda.innerText = `Alcanzaste\n${nroRonda}\nrondas`;
    Object.keys(botones).forEach(function(key){botones[key].disabled = true});
    nroRonda = 1;
    habilitarStart();
}

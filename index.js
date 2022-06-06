const sonido1 = new Audio();
const sonido2 = new Audio();
const sonido3 = new Audio();
const sonido4 = new Audio();
const error = new Audio();
let nroRonda;
let nroClick = 1;

sonido1.src = "verde.mp3";
sonido2.src = "rojo.mp3";
sonido3.src = "azul.mp3";
sonido4.src = "amarillo.mp3";
error.src = "error.mp3"

const $turnos = document.querySelector("#turnos");
const $boton1 = document.querySelector("#btnVerde");
const $boton2 = document.querySelector("#btnRojo");
const $boton3 = document.querySelector("#btnAzul");
const $boton4 = document.querySelector("#btnAmarillo");
const $botonStart = document.querySelector("#btnStart");

let secuencia = new Object;
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

function time(espera_segundos) {
    espera = espera_segundos * 1000
    const tiempo_inicio = Date.now();
    let tiempo_actual= null;
    do {
      tiempo_actual= Date.now();
    } while (tiempo_actual - tiempo_inicio < espera);
}

function generaRandom(){
    return Math.floor((Math.random() * 4) + 1);
}

$botonStart.onclick = function(){
    desablitarStart();
    nroRonda = 1;
    document.querySelector("#body").className = "gradiente";
    document.querySelector("#tituloRonda").className = "";
    document.querySelector("#tituloRonda").innerText = "Ronda:";
    document.querySelector("#nroRonda").className = "score";
    document.querySelector("#nroRonda").innerText = nroRonda;
    $turnos.innerText = "Memoriza Esto!!!";
    window.setTimeout(rondaPc, 1000);
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

        document.querySelector("#nroRonda").innerText = nroRonda;
        window.setTimeout(rondaUsuario, 1000, secuencia);
}

function reproduceSecuencia(){
    
    Object.keys(secuencia).forEach(function(i){
        const key = secuencia[i];
        const botonActual = botones[key];
        const reproducir = sonidos[key];
        window.setTimeout(brillaBoton, 0, key, botonActual);
        window.setTimeout(reproduceSonido, 0, reproducir);
        window.setTimeout(retornaColor, 0, key, botonActual);
    });
    
}

function reproduceSonido(reproducir) {
    reproducir.play();
    time(0.3);
    return;
}

function brillaBoton(key,botonActual){
    botonActual.className = `boton${key}Brilla`;
    time(0.3);
    return;
}

function retornaColor(key, botonActual){
    botonActual.className = `boton${key}`;
    time(0.3);
    return;
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
            return window.setTimeout(rondaPc, 2000), nroClick;
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
    document.querySelector("#nroRonda").className = "oculto";
    document.querySelector("#tituloRonda").innerText = `Alcanzaste\n${nroRonda}\nrondas`;
    habilitarStart();
    nroRonda = 1;
}
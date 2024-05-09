/* Libreria de sound: https://github.com/goldfire/howler.js */

/* Audios tomados de: https://pixabay.com/music/ */

/* Sounds */
let localSound = "assets/sound/once-in-paris-168895.mp3";
let cloudinarySound = "https://res.cloudinary.com/ddmptv2sk/video/upload/v1714585634/groovy-ambient-funk-201745.mp3"

/* Variables */
let control_volumen;
let btn_play, btn_pause, btn_previous, btn_next;
let sound1, sound2, currentSound = "sound1", volumen;

window.onload = function () {
  /* Obtener los elementos HTML desde el JS */
  control_volumen = document.getElementById("control_volumen");
  btn_play = document.getElementById("btn_play");
  btn_pause = document.getElementById("btn_pause");
  btn_previous = document.getElementById("btn_previous");
  btn_next = document.getElementById("btn_next");

  /* Instancias de sonidos */
  sound1 = new Howl({
    src: [localSound],
    volumen: 0.4,
    loop: true
  })

  sound2 = new Howl({
    src: [cloudinarySound],
    volumen: 0.4,
    loop: true
  })

  /* Escuchadores de eventos */
  btn_play.addEventListener("click", play);
  btn_pause.addEventListener("click", pause);
  btn_previous.addEventListener("click", previous);
  btn_next.addEventListener("click", next);
  control_volumen.addEventListener("change", updateVolumen)

  /* Obtener volumen de LocalStorage */
  volumen = localStorage.getItem("volumen");
  if (volumen) {
    sound1.volume(volumen);
    sound2.volume(volumen);
    control_volumen.value = volumen;
  }
}

function updateVolumen(evento) {
  volumen = evento.target.value;
  sound1.volume(volumen);
  sound2.volume(volumen);
  /* Guardar volumen en el LocalStorage */
  localStorage.setItem("volumen", volumen)
}

/* Verifica cuál es el sonido actual y lo reproduce */
function play() {
  if (currentSound === "sound1") {
    sound1.play();
  } else {
    sound2.play();
  }
  btn_play.classList.add("hidden");
  btn_pause.classList.remove("hidden");
}

/* Verifica cuál es el sonido actual y lo pausa */
function pause() {
  if (currentSound === "sound1") {
    sound1.pause();
  } else {
    sound2.pause();
  }
  btn_play.className = "btn";
  btn_pause.className = "btn hidden";
}

/* Verifica el sonido actual, lo pausa y reproduce el anterior,
adicionalmente cambia la variabloe de sonido actual */
function previous() {
  if (currentSound === "sound1") {
    sound1.stop();
    sound2.play();
    currentSound = "sound2";
  } else {
    sound2.stop();
    sound1.play();
    currentSound = "sound1";
  }
  btn_play.classList.add("hidden");
  btn_pause.classList.remove("hidden");
}

/* Verifica el sonido actual, lo pausa y reproduce el siguiente,
adicionalmente cambia la variabloe de sonido actual */
function next() {
  if (currentSound === "sound2") {
    sound2.stop();
    sound1.play();
    currentSound = "sound1";
  } else {
    sound1.stop();
    sound2.play();
    currentSound = "sound2";
  }
  btn_play.className = "btn hidden";
  btn_pause.className = "btn";
}
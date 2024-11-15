const musicContainer = document.querySelector(".music-container")
const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const audio = document.querySelector("#audioMp3")
const progress = document.querySelector(".progress")
const progressContainer = document.querySelector(".progress-container")
const title = document.querySelector("#tituloC")
const cover = document.querySelector("#portada")
//Audio bar

//Títulos
const songs = ["Hambre",  "My Curse", "Question!","Bitter End", "Vultures of North", "Dana Dan", "Godeater", "Alone Infection", "Psychosocial","Bounce"]

//Orden canciones
let songIndex = 0

//Cargar info
loadSong(songs[songIndex])

//Actualizar Detalles
function loadSong(song){
    title.innerText = song
    audio.src = `Música/${song}.mp3`
    cover.src = `Imágenes/${song}.jpg`
}

function playSong(){
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fa").classList.remove("fa-play")
    playBtn.querySelector("i.fa").classList.add("fa-pause")
    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fa").classList.add("fa-play")
    playBtn.querySelector("i.fa").classList.remove("fa-pause")
    audio.pause()
}

function prevSong(){
    songIndex--

    if(songIndex<0){
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong(){
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}
function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width)*duration
}
//Eventos
playBtn.addEventListener("click", () =>{
    const isPlaying = musicContainer.classList.contains("play")
    if(isPlaying){
        pauseSong()
    } else {playSong()}
})

    //Cambiar canción
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)

    //Barra de progreso
audio.addEventListener("timeupdate", updateProgress)

progressContainer.addEventListener("click", setProgress)

audio.addEventListener("ended", nextSong)
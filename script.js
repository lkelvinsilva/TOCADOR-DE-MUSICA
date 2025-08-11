const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const skipforward = document.getElementById('skip-forward');
const skipbackward = document.getElementById('skip-backward');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const songTime = document.getElementById ('song-time');
const totalTime = document.getElementById('total-time');

const asYouWere = {
    songName : 'as You were',
    artist : 'TrackTribe',
    file : 'as_you_were',
    liked = false,
};
const boomBaplick = {
    songName : 'boom bap flick',
    artist : 'Quincas Moreira',
    file : 'boom_bap_flick',
    liked = true,
};

const canthide = {
    songName : 'Can´t Hide',
    artist : 'Otis Mcdonald',
    file : 'cant_hide',
    liked = false,

};
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = [localStorage.getItem('')];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}

function likeButtonRender(){
    if (sortedPlaylist[index].liked === true0) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    } else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function inicializeSong(){
    cover.src = `images/${sortedPlaylist[index].file}.webp`; 
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}

function skipbackwardSong(){
    if(index === 0){
        index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    inicializeSong();
    playSong();
}

function skipforwardSong(){
    if(index ===  sortedPlaylist.length - 1){
        index = 0;
    }
    else {
        index += 1;
    }
    inicializeSong();
    playSong();
}

function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);

}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
  const size = preShuffleArray.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
}

function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 36000 )/ 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2,'0')}:${min
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2,'0')}`;
}

function updateTotalTime(){
    totalTime.innerText] = toHHMMSS(song.duration);
}

function likeButtonClicked(){
    
}

inicializeSong();

play.addEventListener('click', playPauseDecider);
skipbackward.addEventListener('click',skipbackwardSong);
skipforward.addEventListener('click', skipforwardSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click',shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);

window.addEventListener('load', init, false);
function init() {
//Testing the tone.js api 
console.clear() 

var context;

var start = document.querySelector('#start');
var stop = document.querySelector('#stop');
var metronome = document.querySelector('#metronome');
var isPlaying = false;
var sound1 = new Tone.Player("https://freesound.org/data/previews/104/104221_1531859-lq.mp3").toMaster();
var sound2 = new Tone.Player("https://freesound.org/data/previews/268/268822_4486188-lq.mp3").toMaster();
var bpm = 120;
var beatCount = 0;
var beatNumber = 4; // 4 beats per measure
var beatSubDiv = 4; // each beat has 4 quarter notes
var totalCount = 0;
var soundSelect = false;

window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

Tone.Transport.scheduleRepeat(function(time){
  blink();
}, 2*beatSubDiv+"n");

function count(){
	totalCount++;
	playSound();
  console.log("tick " + (beatCount+1) + " " + totalCount);
  if(beatCount<beatNumber-1)
  beatCount++;
  else
  beatCount=0;
}

function playSound(){
  if(soundSelect)
  sound2.start();
  else
  sound1.start();
}

function blink(){
  metronome.classList.toggle('active');
    if(metronome.classList.contains('active'))
  	{
  	count();
		}
}

function startMetro(){
  if(!isPlaying)
  {
  console.log('Start!');
  isPlaying=true;
  Tone.Transport.start("+.25");
  }
}
function stopMetro(){
  if(isPlaying)
  {
  if(metronome.classList.contains('active'))
  metronome.classList.toggle('active');
  console.log('Stopping!');
  isPlaying=false;
  Tone.Transport.stop();
  }
}
document.querySelector('#bpm').addEventListener('input', function(e){
	lastState=isPlaying;
  stopMetro();
  bpm = parseInt(e.target.value);
  Tone.Transport.bpm.value= bpm;
  console.log(bpm);
  if(lastState)
  startMetro();
})
document.querySelector('#soundToggle').addEventListener('change', function(){
	console.log("CHECKED")
  if(this.checked)
  soundSelect=true;
  else
  soundSelect=false;
})
play.addEventListener('click',startMetro);
stop.addEventListener('click',stopMetro);
}
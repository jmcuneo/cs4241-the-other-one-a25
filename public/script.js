let audioCtx = new AudioContext();
let analyser = audioCtx.createAnalyser();

async function loadSound(fileName, location) {
    let node = audioCtx.createBufferSource();

    let response = await fetch(fileName);
    let buffer = await response.arrayBuffer();
    node.buffer = await audioCtx.decodeAudioData(buffer);

    const panner = audioCtx.createStereoPanner();
    panner.pan.value = location;
    panner.connect(audioCtx.destination);

    analyser.connect(panner);

    node.connect(analyser);

    return node;
}

const catButton = document.querySelector("#cat");
const cowButton = document.querySelector("#cow");
const pigButton = document.querySelector("#pig");

catButton.addEventListener("click", () => loadSound("audioFiles/cat-meow-401729.mp3", 0).then(x => x.start()));
cowButton.addEventListener("click", () => loadSound("audioFiles/cow-mooing-343423.mp3", 1).then(x => x.start()));
pigButton.addEventListener("click", () => loadSound("audioFiles/pig-oink-47167.mp3", -1).then(x => x.start()));

// Visualization of audio section

analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

const canvas = document.getElementById("oscilloscope");
const canvasCtx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

function draw() {
  drawVisual = requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = "rgb(200 200 200)";
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0 0 0)";

  canvasCtx.beginPath();

  const sliceWidth = (WIDTH * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * HEIGHT) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
}

draw();
const audioCtx = new window.AudioContext();
let analyser, bufferLength, dataArray;
let micSource, fileSource, audioElement;
let isFileMode = false;

const canvas = document.getElementById('spectrogram');
const ctx = canvas.getContext('2d');

const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const fileInput = document.getElementById('file-input');
const modeToggle = document.getElementById('mode-toggle');
const modeLabel = document.getElementById('mode-label');

function setupAnalyser(inputSource, connectToSpeakers = false) {
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    inputSource.connect(analyser);
    if (connectToSpeakers) {
        analyser.connect(audioCtx.destination);
    }
}

async function initMic() {
    if (fileSource) {
        fileSource.disconnect();
        fileSource = null;
    }
    if (audioElement) {
        audioElement.pause();
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    micSource = audioCtx.createMediaStreamSource(stream);

    setupAnalyser(micSource, false);
    isFileMode = false;
    modeLabel.textContent = "Mic";
}

function initFile(file) {
    if (micSource) {
        micSource.disconnect();
        micSource = null;
    }

    if (audioElement) {
        audioElement.pause();
    }
    audioElement = new Audio();
    audioElement.src = URL.createObjectURL(file);
    audioElement.crossOrigin = "anonymous";
    audioElement.loop = true;

    fileSource = audioCtx.createMediaElementSource(audioElement);
    setupAnalyser(fileSource, true);

    isFileMode = true;
    modeLabel.textContent = "File";
}

function draw() {
    requestAnimationFrame(draw);

    if (!analyser) return;

    analyser.getByteFrequencyData(dataArray);

    const imageData = ctx.getImageData(1, 0, canvas.width - 1, canvas.height);
    ctx.putImageData(imageData, 0, 0);

    const scale = bufferLength / canvas.height;
    for (let y = 0; y < canvas.height; y++) {
        const i = Math.floor(y * scale);
        const value = dataArray[i];
        const percent = value / 255;

        const hue = 240 - percent * 240;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(canvas.width - 1, canvas.height - y, 1, 1);
    }
}

playBtn.addEventListener('click', async () => {
    if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
    }
    if (isFileMode && audioElement) {
        audioElement.play();
    }
});

pauseBtn.addEventListener('click', () => {
    if (isFileMode && audioElement) {
        audioElement.pause();
    }
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        initFile(file);
        audioElement.play();
        modeToggle.checked = true;
    }
});

modeToggle.addEventListener('change', async () => {
    if (modeToggle.checked) {
        if (fileInput.files[0]) {
            initFile(fileInput.files[0]);
            audioElement.play();
        } else {
            modeToggle.checked = false;
            alert("Please select a file first.");
        }
    } else {
        await initMic();
    }
});

initMic();
draw();

const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createMediaStreamSource(stream);

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

source.connect(analyser);

const canvas = document.getElementById('spectrogram');
const ctx = canvas.getContext('2d');

function draw() {
    requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    const imageData = ctx.getImageData(1, 0, canvas.width - 1, canvas.height);
    ctx.putImageData(imageData, 0, 0);

    for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i];
        const percent = value / 255;
        const hue = Math.floor(255 - (percent * 255));
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(canvas.width - 1, canvas.height - i, 1, 1);
    }
}

draw();

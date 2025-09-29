const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const source = audioCtx.createMediaStreamSource(stream);

const analyser = audioCtx.createAnalyser();

analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;

const dataArray = new Uint8Array(bufferLength);

source.connect(analyser);
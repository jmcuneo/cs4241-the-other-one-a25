const audioContexrt = new AudioContext();

const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;
analyser.getByteTimeDomainData(new Uint8Array(bufferLength))


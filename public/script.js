const playButton = document.querySelector("#play-button");

let audioCtx = new AudioContext();
let track = audioCtx.createBufferSource();

fetch("audioFiles/cat-meow-401729.mp3")
    .then(response => response.arrayBuffer())
    .then(buffer => audioCtx.decodeAudioData(buffer))
    .then(buffer => {
        track.buffer = buffer;

        const node = new StereoPannerNode(audioCtx, { pan: -1 });
        node.connect(audioCtx.destination);

        track.connect(node);
    });

playButton.addEventListener("click", () => track.start(0));
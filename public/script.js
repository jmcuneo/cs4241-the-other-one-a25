const playButton = document.querySelector("#play-button");

let audioCtx = new AudioContext();

async function loadSound(fileName, location) {
    let node = audioCtx.createBufferSource();

    let response = await fetch(fileName);
    let arraybuffer = await response.arrayBuffer();
    node.buffer = await audioCtx.decodeAudioData(arraybuffer);

    const panner = audioCtx.createStereoPanner();
    panner.pan.value = location;
    panner.connect(audioCtx.destination);

    node.connect(panner);

    return node;
}

let sound;
loadSound("audioFiles/cat-meow-401729.mp3", -1)
    .then((node) => sound = node);

playButton.addEventListener("click", () => sound.start(0));
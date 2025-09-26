const audioCtx = new AudioContext();

async function loadSound(fileName, location) {
    let node = audioCtx.createBufferSource();

    let response = await fetch(fileName);
    let buffer = await response.arrayBuffer();
    node.buffer = await audioCtx.decodeAudioData(buffer);

    const panner = audioCtx.createStereoPanner();
    panner.pan.value = location;
    panner.connect(audioCtx.destination);

    node.connect(panner);

    return node;
}

const catButton = document.querySelector("#cat");
const cowButton = document.querySelector("#cow");
const pigButton = document.querySelector("#pig");

catButton.addEventListener("click", () => loadSound("audioFiles/cat-meow-401729.mp3", 0).then(x => x.start()));
cowButton.addEventListener("click", () => loadSound("audioFiles/cow-mooing-343423.mp3", 1).then(x => x.start()));
pigButton.addEventListener("click", () => loadSound("audioFiles/pig-oink-47167.mp3", -1).then(x => x.start()));
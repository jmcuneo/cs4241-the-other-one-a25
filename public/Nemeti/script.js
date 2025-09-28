const synth = new Tone.Synth().toDestination();

//Im sorry that this sucks I couldn't get the buttons to work for literally the whole class 
//and I'm still not sure if they work. 
//My plan was to create a keyboard so here's at least a 
//skeleton of what it should have looked like - Ryan

function playA() {
    synth.triggerAttackRelease("A4", "4n");
};

function playB() {
    synth.triggerAttackRelease("B4", "4n");
};

function playC() {
    synth.triggerAttackRelease("C4", "4n");
};

function playD() {
    synth.triggerAttackRelease("D4", "4n");
};

function playE() {
    synth.triggerAttackRelease("E4", "4n");
};
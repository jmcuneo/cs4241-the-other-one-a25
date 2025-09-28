document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeControls();
    }, 500);
});

function initializeControls() {
    const speedControl = document.getElementById('speedControl');
    const sizeControl = document.getElementById('sizeControl');
    const trailControl = document.getElementById('trailControl');
    const colorControl = document.getElementById('colorControl');
    const showMPG = document.getElementById('showMPG');
    const showAge = document.getElementById('showAge');
    const canvas = document.getElementById('carCanvas');

    if (window.carViz && window.carViz.cars.length === 0) {
        createDemoCars();
    }

    function updateValueDisplays() {
        document.getElementById('speedValue').textContent = parseFloat(speedControl.value).toFixed(1) + 'x';
        document.getElementById('sizeValue').textContent = parseFloat(sizeControl.value).toFixed(1) + 'x';
        document.getElementById('trailValue').textContent = trailControl.value;
        document.getElementById('colorValue').textContent = Math.round(parseFloat(colorControl.value) * 100) + '%';
    }

    function applySettings() {
        if (window.carViz) {
            window.carViz.updateSettings({
                speed: parseFloat(speedControl.value),
                size: parseFloat(sizeControl.value),
                trailLength: parseInt(trailControl.value),
                colorIntensity: parseFloat(colorControl.value),
                showMPG: showMPG.checked,
                showAge: showAge.checked
            });
        }
    }

    function createDemoCars() {
        if (!window.carViz) return;

        for (let i = 0; i < 3; i++) {
            window.carViz.addRandomCar();
        }
        console.log('Demo cars created for visualization');
    }

    [speedControl, sizeControl, trailControl, colorControl].forEach(control => {
        control.addEventListener('input', function() {
            updateValueDisplays();
            applySettings();
        });
    });

    [showMPG, showAge].forEach(control => {
        control.addEventListener('change', function() {
            applySettings();
        });
    });

    canvas.addEventListener('click', function(event) {
        if (window.carViz) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            window.carViz.addRandomCar(x, y);
            console.log('Added random car at:', x, y);
        }
    });

    updateValueDisplays();
    applySettings();

    if (!localStorage.getItem('helpShown')) {
        setTimeout(() => {
            const helpModal = new bootstrap.Modal(document.getElementById('helpModal'));
            helpModal.show();
            localStorage.setItem('helpShown', 'true');
        }, 1000);
    }

    console.log('Visualization controls initialized');
}
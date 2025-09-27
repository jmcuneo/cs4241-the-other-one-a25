class CarVisualization {
    constructor() {
        this.canvas = document.getElementById('carCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cars = [];
        this.animationId = null;

        this.settings = {
            speed: 1.0,
            size: 1.0,
            trailLength: 20,
            colorIntensity: 0.7,
            showMPG: true,
            showAge: false
        };

        this.init();
    }

    init() {
        this.setCanvasSize();
        window.addEventListener('resize', () => this.handleResize());
        this.start();
    }

    handleResize() {
        this.setCanvasSize();
        if (this.cars.length > 0) {
            this.cars.forEach(car => {
                car.x = Math.min(car.x, this.canvas.width);
                car.y = Math.min(car.y, this.canvas.height);
            });
        }
    }

    setCanvasSize() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = 400;
    }

    createVisualCars(carData) {
        this.cars = carData.map(car => ({
            ...car,
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            trail: [],
            maxTrail: this.settings.trailLength,
            color: this.getCarColor(car),
            size: this.calculateSize(car)
        }));
    }

    getCarColor(car) {
        const colorByFuel = {
            'gasoline': 0,
            'diesel': 200,
            'electric': 120,
            'hybrid': 60
        };

        let baseHue = colorByFuel[car.fuelType] || 280;
        let saturationBoost = Math.round((car.mpg / 50) * 20);
        let brightness = 40 + Math.round((car.age / 30) * 20);

        return `hsl(${baseHue}, ${80 + saturationBoost}%, ${brightness}%)`;
    }

    calculateSize(car) {
        const baseCarSize = 20;
        let sizeFromMPG = car.mpg / 50;
        let sizeFromAge = 1 - (car.age / 30) * 0.5;
        let finalSize = baseCarSize * this.settings.size * sizeFromMPG * sizeFromAge;
        return Math.max(10, finalSize);
    }

    update() {
        this.ctx.fillStyle = 'rgba(15, 15, 25, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.cars.length === 0) {
            this.drawHelpText();
            return;
        }

        for (let i = 0; i < this.cars.length; i++) {
            let car = this.cars[i];
            this.updateCarPosition(car);
            this.drawCar(car);
        }
    }

    updateCarPosition(car) {
        car.x += car.vx * this.settings.speed;
        car.y += car.vy * this.settings.speed;

        if (car.x < 0 || car.x > this.canvas.width) {
            car.vx = -car.vx;
            car.x = Math.max(0, Math.min(car.x, this.canvas.width));
        }

        if (car.y < 0 || car.y > this.canvas.height) {
            car.vy = -car.vy;
            car.y = Math.max(0, Math.min(car.y, this.canvas.height));
        }

        car.trail.push({x: car.x, y: car.y});
        if (car.trail.length > car.maxTrail) {
            car.trail.shift();
        }
    }

    drawHelpText() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Add some cars to see the magic!', this.canvas.width / 2, this.canvas.height / 2);
    }

    drawCar(car) {
        car.trail.forEach((point, index) => {
            const alpha = (index / car.trail.length) * 0.5 * this.settings.colorIntensity;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, car.size * 0.3, 0, Math.PI * 2);
            this.ctx.fillStyle = car.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
            this.ctx.fill();
        });

        this.ctx.save();
        this.ctx.translate(car.x, car.y);

        this.ctx.fillStyle = car.color;
        this.ctx.fillRect(-car.size, -car.size/2, car.size * 2, car.size);

        this.ctx.fillStyle = 'rgba(200, 230, 255, 0.6)';
        this.ctx.fillRect(-car.size * 0.7, -car.size * 0.4, car.size * 1.4, car.size * 0.3);

        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(-car.size * 1.8, -car.size * 0.6, car.size * 0.4, car.size * 0.3);
        this.ctx.fillRect(car.size * 1.4, -car.size * 0.6, car.size * 0.4, car.size * 0.3);
        this.ctx.fillRect(-car.size * 1.8, car.size * 0.3, car.size * 0.4, car.size * 0.3);
        this.ctx.fillRect(car.size * 1.4, car.size * 0.3, car.size * 0.4, car.size * 0.3);

        this.ctx.restore();

        if (this.settings.showMPG) {
            this.ctx.fillStyle = 'white';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`${car.mpg} MPG`, car.x, car.y - car.size - 5);
        }

        if (this.settings.showAge) {
            this.ctx.fillStyle = 'yellow';
            this.ctx.font = '10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`Age: ${car.age}yr`, car.x, car.y + car.size + 15);
        }
    }

    start() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        const animate = () => {
            try {
                this.update();
                this.animationId = requestAnimationFrame(animate);
            } catch (error) {
                console.error('Animation error:', error);
            }
        };

        animate();
    }

    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };

        this.cars.forEach(car => {
            car.maxTrail = this.settings.trailLength;
            car.size = this.calculateSize(car);
            car.color = this.getCarColor(car);
        });
    }

    addRandomCar(x, y) {
        const fuelTypes = ['gasoline', 'diesel', 'electric', 'hybrid'];

        let randomFuel = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
        let randomYear = 2000 + Math.floor(Math.random() * 25);
        let randomMPG = 15 + Math.floor(Math.random() * 35);
        let randomAge = new Date().getFullYear() - randomYear;

        let newCar = {
            _id: 'demo-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
            model: 'Demo Car',
            year: randomYear,
            mpg: randomMPG,
            fuelType: randomFuel,
            age: randomAge,
            features: []
        };

        let visualCar = {
            ...newCar,
            x: x || Math.random() * this.canvas.width,
            y: y || Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 3.5,
            vy: (Math.random() - 0.5) * 3.5,
            trail: [],
            maxTrail: this.settings.trailLength,
            color: this.getCarColor(newCar),
            size: this.calculateSize(newCar)
        };

        this.cars.push(visualCar);
        return visualCar;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.carViz = new CarVisualization();

        if (typeof window.loadCars !== 'undefined') {
            let originalLoad = window.loadCars;
            window.loadCars = async function() {
                await originalLoad.apply(this, arguments);
                if (window.cars && window.cars.length > 0) {
                    window.carViz.createVisualCars(window.cars);
                }
            };
        }

        if (window.cars && window.cars.length > 0) {
            window.carViz.createVisualCars(window.cars);
        }
    }, 100);
});
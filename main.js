let canvas, pen, w, h, startX, startY;

function updateRes() {
    w = window.innerWidth;
    h = getComputedStyle(document.querySelector('#header')).height.replace('px', '');
    canvas.width = w;
    canvas.height = h
    lines = [];
    for (let i = 0; i < 70; i++) {
        lines.push(new Line());
    }
    console.log('changed res');
}

let lines = [];

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('header');
    pen = canvas.getContext('2d');
    window.addEventListener('resize', updateRes);
    updateRes();
    startX = w * Math.random();
    startY = h * Math.random();
    animate();
})

class Line {
    constructor() {
        this.x = {
            pos: w * Math.random(),
            max: w,
            dir: Math.random() > 0.3
        }

        this.y = {
            pos: h * Math.random(),
            max: h,
            dir: Math.random() > 0.5
        }

        this.maxVel = 0.05;
        this.zIndex = 1 - Math.sin(Math.sin(Math.random() * Math.PI / 2) * Math.PI / 2);
        this.triangleSize = 30 * (0.2 + (this.zIndex * 0.8));

        this.vel = {
            y: this.maxVel * (0.2 + (this.zIndex * 0.8)),
            x: this.maxVel * (0.2 + (this.zIndex * 0.8))
        }
    }


    checkDirection() {
        this.x.dir = this.checkMax(this.x);
        this.y.dir = this.checkMax(this.y);
    }

    checkMax(axis) {
        if (axis.pos >= axis.max) {
            return false;
        } else if (axis.pos <= 0) {
            return true;
        } else {
            return axis.dir;
        }
    }

    iterate() {
        this.checkDirection();
        if (this.x.dir) {
            this.x.pos += this.vel.x;
        } else {
            this.x.pos -= this.vel.x;
        }

        if (this.y.dir) {
            this.y.pos += this.vel.y;
        } else {
            this.y.pos -= this.vel.y;
        }
    }

    setpos() {
        pen.beginPath();
        pen.strokeStyle = `rgba(255, 255, 255, ${0.2 + this.zIndex * 0.2})`;
        pen.lineWidth = this.triangleSize / 20;
        pen.moveTo(this.x.pos, this.y.pos);
        pen.lineTo(this.x.pos + this.triangleSize, this.y.pos + this.triangleSize / 2);
        pen.lineTo(this.x.pos, this.y.pos + this.triangleSize);
        pen.closePath();
        this.render();
    }

    render() {
        pen.stroke();
    }
}



function animate() {
    pen.clearRect(0, 0, w, h);
    lines.forEach((line) => {
        line.iterate();
        line.setpos();
    })
    window.requestAnimationFrame(animate);
}

const canvas = document.getElementById("identicon");
const ctx = canvas.getContext('2d');
const size = canvas.width;
const res = size / 6;

function randomColor() {
    const goldenRatio = 0.618033988749895;
    let hue = Math.random();
    hue += goldenRatio;
    hue %= 1;
    let c = HSVtoRGB(hue, 0.5, 0.95);
    return "rgb("+c.r+", "+c.g+", "+c.b+")"
}

function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function new2DArr(cols, rows, value) {
    let arr = Array(cols);
    for (let x = 0; x < cols; x++) {
        arr[x] = Array(rows).fill(value);
    }
    console.log(arr);
    return arr;
}

function generateShape() {
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 5; y++) {
            grid[x][y] = (Math.random() > 0.5) + 0;
        }
    }
    for (let x = 3; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            grid[x][y] = grid[2 - (x - 2)][y]
        }
    }
}

function draw() {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            if (grid[x][y]) {
                ctx.fillStyle = color
            }
            else {
                ctx.fillStyle = 'rgb(238, 238, 238)'
            }
            ctx.fillRect((x * res) + (res / 2), (y * res) + (res / 2), res, res);
        }
    }
}

function download() {
    window.location = canvas.toDataURL("image/png");
}

function generateImg() {
    color = randomColor();
    generateShape();
    draw();
}

function refreshColor() {
    color = randomColor();
    draw();
}

function refreshShape() {
    generateShape();
    draw();
}

let grid = new2DArr(5, 5, 0);
ctx.fillStyle = 'rgb(238, 238, 238)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
let color;
generateImg();
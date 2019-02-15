const canvas = document.getElementById("identicon");
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const padding = height > width ? width / 10 : height / 10 ; // uses the smallest side to get padding
const shapeWidth = width - (2 * padding); // width after padding is applied
const shapeHeight = height - (2 * padding); // width after padding is applied
let colsInput = document.getElementById("cols").value;
let rowsInput = document.getElementById("rows").value;
let cols = colsInput;
let rows = rowsInput;
let colWidth = Math.round(shapeWidth / cols);
let rowWidth = Math.round(shapeHeight / rows);

const container = document.getElementById("container");
container.style.width = canvas.width+"px"; // set the width of container to width of canvas so that canvas is centered

function randomColor() {
    const goldenRatio = 0.618033988749895;
    let hue = Math.random();
    hue += goldenRatio; // using golden ratio as spacing makes the values more evenly distributed
    hue %= 1;
    let c = HSVtoRGB(hue, 0.5, 0.95); // converts to rgb so it can be used in js
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
    init();
    for (let x = 0; x < Math.round(cols / 2); x++) {
        for (let y = 0; y < rows; y++) {
            grid[x][y] = (Math.random() > 0.5) + 0;
        }
    }
    for (let x = Math.round(cols / 2); x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            grid[x][y] = grid[Math.round(cols / 2) - (x - Math.floor(cols / 2)) - 1][y]
        }
    }
}

function draw() {
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            if (grid[x][y]) {
                ctx.fillStyle = color
            }
            else {
                ctx.fillStyle = 'rgb(238, 238, 238)'
            }
            ctx.fillRect((x * colWidth) + padding, (y * rowWidth) + padding, colWidth, rowWidth);
        }
    }
}

function init() {
    ctx.fillStyle = 'rgb(238, 238, 238)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    colsInput = document.getElementById("cols").value;
    rowsInput = document.getElementById("rows").value;
    cols = colsInput;
    rows = rowsInput;
    colWidth = Math.round(shapeWidth / cols);
    rowWidth = Math.round(shapeHeight / rows);
    grid = new2DArr(cols, rows, 0);
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

function updateLabels() {
    document.getElementById('rowsCounter').innerText = document.getElementById("rows").value;
    document.getElementById('colsCounter').innerText = document.getElementById("cols").value;
}

let grid;
let color;
updateLabels();
generateImg();
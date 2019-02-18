const canvas = document.getElementById("identicon");
const ctx = canvas.getContext('2d');
let cellSize, padding, cols, rows, grid, color, gridArr;
let arlock = document.getElementById("1:1ratio").checked;

function arlockToggle() {
    arlock = document.getElementById("1:1ratio").checked;
}

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

function gcd(a, b) {
    return (b === 0) ? a : gcd(b, a%b);
}

function new2DArr(cols, rows, value) {
    let arr = Array(cols);
    for (let x = 0; x < cols; x++) {
        arr[x] = Array(rows).fill(value);
    }
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
            ctx.fillRect((x * cellSize) + padding, (y * cellSize) + padding, cellSize, cellSize);
        }
    }
}

function init() {
    cols = +document.getElementById("cols").value;
    rows = +document.getElementById("rows").value;
    let gcdWin = gcd(window.innerWidth, window.innerHeight);
    let arWin = (window.innerWidth/gcdWin)/(window.innerHeight/gcdWin);
    let gcdGrid = gcd(cols, rows);
    let arGrid = (cols/gcdGrid)/(rows/gcdGrid);

    if (arGrid > arWin) {
        canvas.width = window.innerWidth - 200;
        padding = 40;
        cellSize = Math.round((canvas.width - padding * 2) / cols);
        canvas.height = (rows * cellSize) + padding * 2;
        canvas.width = (cols * cellSize) + padding * 2;
    } else {
        canvas.height = window.innerHeight - 200;
        padding = 40;
        cellSize = Math.round((canvas.height - padding * 2) / rows);
        canvas.height = (rows * cellSize) + padding * 2;
        canvas.width = (cols * cellSize) + padding * 2;
    }

    document.getElementById('container').style.width = canvas.width + "px";
    ctx.fillStyle = 'rgb(238, 238, 238)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
    document.getElementById('colsCounter').innerText = document.getElementById("cols").value;
    if (arlock) {
        document.getElementById("rows").disabled = true;
        document.getElementById("rows").value = document.getElementById("cols").value;
    } else {
        document.getElementById("rows").disabled = false;
    }
    document.getElementById('rowsCounter').innerText = document.getElementById("rows").value;
}

function generateSeed() {
    /*gridArr = new2DArr(Math.round(cols / 2), rows, 0);
    for (let x = 0; x < Math.round(cols / 2); x++) {
        for (let y = 0; y < rows; y++) {
            gridArr[x][y] = grid[x][y]
        }
    }
    window.location = "https://smzr.github.io/identicon-generator/?seed="+JSON.stringify({cols, rows, cellSize, color, gridArr});*/
    let cvSave = canvas.toDataURL("image/png");
    console.log(cvSave)
}

function loadSeed(seed) {
    seed = JSON.parse(seed);
    cols = seed.cols;
    rows = seed.rows;
    cellSize = seed.cellSize;
    color = seed.color;
    gridArr = seed.gridArr;

    let gcdWin = gcd(window.innerWidth, window.innerHeight);
    let arWin = (window.innerWidth/gcdWin)/(window.innerHeight/gcdWin);
    let gcdGrid = gcd(cols, rows);
    let arGrid = (cols/gcdGrid)/(rows/gcdGrid);

    if (arGrid > arWin) {
        canvas.width = window.innerWidth - 200;
        padding = 40;
        canvas.height = (rows * cellSize) + padding * 2;
        canvas.width = (cols * cellSize) + padding * 2;
    } else {
        canvas.height = window.innerHeight - 200;
        padding = 40;
        canvas.height = (rows * cellSize) + padding * 2;
        canvas.width = (cols * cellSize) + padding * 2;
    }

    document.getElementById('container').style.width = canvas.width + "px";
    ctx.fillStyle = 'rgb(238, 238, 238)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    grid = new2DArr(cols, rows, 0);
    for (let x = 0; x < Math.round(cols / 2); x++) {
        for (let y = 0; y < rows; y++) {
            grid[x][y] = gridArr[x][y]
        }
    }
    for (let x = Math.round(cols / 2); x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            grid[x][y] = grid[Math.round(cols / 2) - (x - Math.floor(cols / 2)) - 1][y]
        }
    }
    draw();
}

updateLabels();
let url = new URL(window.location);
let seed = url.searchParams.get('seed');
if (seed) {
    loadSeed(seed)
} else {
    generateImg();
}
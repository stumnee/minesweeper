const grid = [];
let mines = 20;
let gameOver = false;
let minesDeployed = 0;
const maxX = 10;
const maxY = 10;
const totalCells = maxY * maxX;
const neighborsOffset = [[-1, -1], [-1, 0], [-1, 1],
                         [ 0, -1],          [ 0, 1],
                         [ 1, -1], [ 1, 0], [ 1, 1]];

function idxToXY(i, multiplier = 1) {
    return {x: (i % maxX) * multiplier, y: parseInt( i / maxY) * multiplier}
}

function xyToIdx(x, y, divisor = 1) {
    return parseInt(y / divisor) *  maxY + parseInt(x / divisor);
}

function xyToCell(x, y, divisor = 1) {
    x /= divisor
    y /= divisor
    if (x >= 0 && x < maxX && y >= 0 && y < maxY) {
        return grid[xyToIdx(x, y)]
    }
    return {}
}

function setup() {
    createCanvas(maxX * Cell.w, maxY * Cell.w + Cell.top);

    for (let i = 0; i < totalCells; i++) {
      let xy = idxToXY(i, Cell.w);
      grid.push(new Cell(xy.x, xy.y));
    }

    // Place mines
    let i = 0;
    let pct = 1 / totalCells;

    while (minesDeployed < mines) {
      if (!grid[i].mine && Math.random() < pct) {
          grid[i].mine = true;
          minesDeployed++;
      }
      i++;
      if (i === totalCells) {
          i = 0;
      }
    }

    // Calculate neighbor mine counts
    grid.forEach((cell, idx) => {
      let xy = idxToXY(idx)
      cell.nMineCount = neighborsOffset.filter(offset =>
                                                    xyToCell(xy.x + offset[0],xy.y + offset[1]).mine)
                                        .length
    })
}

function mouseReleased() {
    let cell = xyToCell(mouseX, mouseY - Cell.top, Cell.w)

    if (cell.x === undefined) //outside
        return

    if (mouseButton === RIGHT) {
        if (!cell.revealed) {

            cell.flagged = !cell.flagged
            mines += cell.flagged ? -1 : 1
        }
        return

    }
    if (!cell.flagged) {
        if (cell.mine) {
            gameOver = true
            grid.forEach(cell => cell.revealed = true)
        } else {
            reveal(xyToIdx(mouseX, mouseY - Cell.top, Cell.w))
        }
    }
}

// reveal non mine cells in Flood Fill pattern
function reveal(idx) {
    grid[idx].reveal()
    if (grid[idx].nMineCount > 0 || grid[idx].mine || grid[idx].flagged) {
        return;
    }
    let xy = idxToXY(idx)
    neighborsOffset.map(offset => [xy.x + offset[0], xy.y + offset[1]])
        .forEach(neighborXY => {
            let cell = xyToCell(...neighborXY)
            if (cell.x !== undefined && !cell.revealed && !cell.mine) {
                reveal(xyToIdx(...neighborXY))
            }
        })
}

function draw() {
    background(0);

    grid.forEach(cell=>cell.show())

    fill(255);
    textAlign(LEFT, CENTER);
    textSize(24)
    text("Mines Left: " + mines, 0, 30)

    if (gameOver) {
        fill(255, 0, 0);
        textAlign(RIGHT, CENTER);
        text("Game Over!", maxX * Cell.w, 30)
    }

    if (mines === 0 && maxX * maxY === minesDeployed + grid.filter(cell=>cell.revealed).length) {
        fill(0, 255, 0);
        textAlign(RIGHT, CENTER);
        text("Good Job!", maxX * Cell.w, 30)
    }
}

//disable right mouse click
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);


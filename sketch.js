const grid = [];
const mines = 20;
const maxX = 10;
const maxY = 10;
function setup() {
  createCanvas(200, 200);
  for (let y = 0; y < maxY; y ++) {
      let row = []
      for (let x = 0; x < maxX; x++) {
          row.push(new Cell(x * Cell.w, y * Cell.w));
      }
      grid.push(row);
  }
  minesDeployed = 0;
  while (minesDeployed < mines) {
      let cell = grid[Math.floor(parseInt(Math.random() * 1000)/100)][Math.floor(parseInt(Math.random() * 1000)/100)];
      if (!cell.mine) {
          cell.mine = true;
          minesDeployed++;
      }
  }
    for (let y = 0; y < maxY; y ++) {
        for (let x = 0; x < maxX; x++) {
            let count = 0;
            for (let dx = -1; dx <= 1; dx++) {
                for(let dy = -1; dy <= 1; dy++) {
                    if (x + dx >= 0 && x + dx < maxX && y + dy >= 0 && y + dy < maxY && grid[y + dy][x + dx].mine) {
                        count++;
                    }
                }
            }
            grid[y][x].nMineCount = count;
        }
    }
}

function mouseReleased() {
    console.log(mouseButton)
    let x = parseInt(mouseX / Cell.w)
    let y = parseInt(mouseY / Cell.w)
    reveal(x, y)
}

function reveal(x, y) {
    grid[y][x].reveal()
    if (grid[y][x].nMineCount > 0 || grid[y][x].mine) {
        return;
    }
    for (let dx = -1; dx <= 1; dx++) {
        for(let dy = -1; dy <= 1; dy++) {
            if (x + dx >= 0 && x + dx < maxX && y + dy >= 0 && y + dy < maxY && !grid[y + dy][x + dx].revealed && !grid[y + dy][x + dx].mine) {
                reveal(x + dx, y + dy)
            }
        }
    }
}

function draw() {
  background(0);

    for (let y = 0; y < maxY; y ++) {
        for (let x = 0; x < maxX; x++) {
            grid[y][x].show();
        }
    }
}

//disable right mouse click
window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}, false);
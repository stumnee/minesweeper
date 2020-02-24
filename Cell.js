class Cell {
    static w = 20
    constructor(x, y, mine = false) {
        this.x = x;
        this.y = y;
        this.revealed = false;
        this.mine = mine;
        this.nMineCount = 0;
    }
    get centerX() {
        return this.x + Cell.w * 0.5;
    }
    get centerY() {
        return this.y + Cell.w * 0.5;
    }
    reveal() {
        this.revealed = true;
    }
    show() {
        stroke(0);

        if (!this.revealed) {
            fill(255);
        } else {
            fill(200)
        }
        rect(this.x, this.y, Cell.w, Cell.w)
        if (!this.revealed) {
            return;
        }
        if (this.mine) {
            fill(155);
            circle(this.centerX, this.centerY, Cell.w * 0.5);
        } else {
            textAlign(CENTER, CENTER);
            stroke(60);
            fill(100);
            if (this.nMineCount > 0) {
                text(this.nMineCount, this.x + 2, this.y, Cell.w, Cell.w)
            }
        }

    }
}
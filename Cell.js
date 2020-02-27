class Cell {
    static w = 50
    static top = 50
    constructor(x, y, mine = false) {
        this.x = x;
        this.y = y;
        this.revealed = false;
        this.flagged = false;
        this.mine = mine;
        this.nMineCount = 0;
    }

    reveal() {
        this.revealed = true;
    }
    show() {
        let y = this.y + Cell.top
        let x = this.x
        let w = Cell.w
        let cX = x + w * .5
        let cY = y + w * .5
        stroke(0);

        if (!this.revealed) {
            fill(255);
        } else {
            fill(200)
        }
        rect(x, y, w, w)
        if (this.flagged) {
            stroke(60);
            fill(255, 0, 0);
            triangle(x + w/2, y + w/4, x + w/4*3, y + w/8 * 3, x + w/2, y + w/2)
            line(x + w/2, y + w/2, x + w/2, y + w/4 * 3)
            line(x + w/4 - 2, y + w/4*3, x + w/4*3 + 2, y + w/4*3)
        }

        if (this.revealed) {
            if (this.mine) {
                fill(255, 0, 0);
                circle(cX, cY, w / 4);
                line(cX,y + w/4, cX, y + w*3/4)
                line(x + w / 4, cY, x + w*3/4 , cY)
                line(x + w / 4, y + w/4, x + w*3/4, y + w*3/4)
                line(x + w / 4, y + w*3/4, x + w*3/4, y + w/4)
            } else {
                textAlign(CENTER, CENTER);
                stroke(60);
                fill(100);
                if (this.nMineCount > 0) {
                    textSize(24)
                    text(this.nMineCount, x + 2, y, w, w)
                }
            }
        }

    }
}
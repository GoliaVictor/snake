class Snake {
    constructor(x, y, xspeed, yspeed) {
        this.x = x;
        this.y = y;

        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.xspeedNext = 1;
        this.yspeedNext = 0;

        this.squares = [{x: x, y: y}]
        this.length = 1
    }

    move(notEating=true) {
        if (notEating) {
            this.squares.splice(0, 1)
        }
        else {
            this.length++;
            console.log(this.length)
            isSnakeNotEating = true
        }
        this.xspeed = this.xspeedNext
        this.yspeed = this.yspeedNext
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.squares.push({x: this.x, y: this.y})
    }

    eat() {

    }

    setDir(x, y) {
        this.xspeedNext = this.xspeed == -x ? this.xspeedNext : x;
        this.yspeedNext = this.yspeed == -y ? this.yspeedNext : y;
    }
}
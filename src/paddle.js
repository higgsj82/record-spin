class Paddle {
    constructor() {
        this.width = 170;
        this.height = 20;
        this.color = color(242, 182, 51);
        this.location = createVector((width / 2) - (this.width / 2), height - 80);
        this.speed = {
            right: createVector(9, 0),
            left: createVector(-9, 0)
        }
    }

    display() {
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height, 28)
    }

    move(direction) {
        this.location.add(this.speed[direction]);

        if(this.location.x < 0) {
            this.location.x = 0;
        } else if (this.location.x + this.width > width) {
            this.location.x = width - this.width
        }
    }
}
// module.exports = Paddle;
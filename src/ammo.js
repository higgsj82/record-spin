class Ammunition {
    constructor(paddle) {
        this.radius = 10;
        this.size = this.radius * 2;
        this.location = createVector(paddle.location.x + (paddle.width/2), paddle.location.y - (this.radius - 5));
        this.color = color(255, 0, 0);
        this.velocity = createVector(8, -8);
        this.paddle = paddle;
    }

    display() {
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }

    update() {
        this.location.add(this.velocity);
    }

    collisionEdge() {
        if(this.location.x + this.radius >= width) {
            this.reverse('x');
        } else if (this.location.x - this.radius <= 0) {
            this.reverse('x');
        } else if (this.location.y - this.radius <= 0) {
            this.reverse('y');
        }
    }

    collisionPaddle() {
        if (this.location.x + this.radius >= this.paddle.location.x &&
            this.location.x - this.radius <= this.paddle.location.x + this.paddle.width) {
                if (this.location.y + this.radius > this.paddle.location.y) {
                    this.reverse('y');
                    this.location.y = this.paddle.location.y - this.radius - 1;
                }
        }
    }

    belowPaddle() {
        return this.location.y - this.radius > height;
    }

    reverse(coord) {
        this.velocity[coord] *= -1;
    }

}

// export default 'Ammunition';
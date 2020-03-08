class Bubble {
    constructor(location, width, height, color) {
        this.location = location;
        this.width = width;
        this.height = height;
        this.color = color;
        this.points = 1;
    }

    display() {
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height, 50);
    }

    hit(ammo) {
        if(ammo.location.y - ammo.radius <= this.location.y + this.height &&
            ammo.location.y + ammo.radius >= this.location.y &&
            ammo.location.x + ammo.radius >= this.location.x &&
            ammo.location.x - ammo.radius <= this.location.x + this.width) {
                return true;
        }
    }
}

// export default 'Bubble';
class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }

    update() {
        this.#move();
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        )
        ctx.fill()

        ctx.restore();
    }

    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration;
        }

        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }
        
        // limit max forward speed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed
        }

        // limit max reverse speed
        if (this.speed < -(this.maxSpeed - 1)) {
            this.speed = -(this.maxSpeed - 1)
        }

        // apply friction to forward driving
        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        // apply friction to reverse driving
        if (this.speed < 0) {
            this.speed += this.friction;
        }

        // keep the car from indefinitely moving due to non-zero speed
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        
        // flips turning direction based on forward or reverse driving
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }

            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
        }

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }
}

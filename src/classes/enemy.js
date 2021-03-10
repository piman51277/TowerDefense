class Enemy {
    path = gamePath;
    pos = 0;
    speed = 1;
    coords = this.path.getPosFromLength(0)
    health_max = 1;
    health = 1;
    icon = "enemy_basic"
    constructor() {}
    move() {
        this.pos += this.speed;
        this.coords = this.path.getPosFromLength(this.pos)
    }
    takeDamage(amount) {
        this.health -= amount;
    }
    display() {
        const healthPercent = this.health / this.health_max
        canva.fill(255, 0, 0)
        canva.rect(this.coords[0] - 10, this.coords[1] + 10, 20, 5)
        canva.fill(0, 255, 0)
        canva.rect(this.coords[0] - 10, this.coords[1] + 10, 20 * healthPercent, 5)

        //icon
        canva.image(this.icon, this.coords[0] - 10, this.coords[1] - 10);
    }
}
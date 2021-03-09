class enemy_basic extends Enemy {
    speed = 2;
    health_max = 5
    health = 5;
    display() {
        canva.fill(255, 0, 0)
        canva.ellipse(this.coords[0], this.coords[1], 10, 10)
        this.displayHealth();
    }
}

const enemyTypes = {
    basic: enemy_basic,
    tank: enemy_tank
}
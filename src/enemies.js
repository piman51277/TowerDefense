class enemy_basic extends Enemy {
    speed = 2;
    health_max = 5
    health = 5;
    icon = "enemy_basic"
}

class enemy_tank extends Enemy {
    speed = 1;
    health_max = 50
    health = 50;
    icon = "enemy_tank"
}
const enemyTypes = {
    basic: enemy_basic,
    tank: enemy_tank
}
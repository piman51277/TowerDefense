class enemy_basic extends Enemy {
    speed = 2;
    health_max = 5
    health = 5;
    icon = "enemy_basic"
    reward = 1;
}

class enemy_tank extends Enemy {
    speed = 1;
    health_max = 100
    health = 100;
    icon = "enemy_tank"
    reward = 2;
}

class enemy_fast extends Enemy {
    speed = 4;
    health_max = 20
    health = 20;
    icon = "enemy_fast"
    reward = 5
}
const enemyTypes = {
    basic: enemy_basic,
    tank: enemy_tank,
    fast: enemy_fast
}
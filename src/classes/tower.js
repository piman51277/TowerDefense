class Tower {
    range = 10;
    activeRanges = [];
    path = gamePath;
    maxCooldown = 1;
    cooldown = 0;
    attackStrength = 1;
    maxTargets = 1;
    icon = "tower_basic";

    //used for visualising shots
    tracers = [];
    constructor(x, y) {
        this.coords = [x, y];
    }
    inRange(pos) {
        for (const set in this.activeRanges) {
            const [min, max] = this.activeRanges[set]
            if (pos >= min && pos <= max) return true;
        }
        return false;
    }
    findEnemiesInRange() {
        const enemiesInRange = []
        for (let enemy in enemies) {
            if (this.inRange(enemies[enemy].pos)) {
                enemiesInRange.push(enemies[enemy])
            }
        }
        if (enemiesInRange.length > 0) {
            if (this.cooldown == 0) {
                for (let targetNum = 0; targetNum < Math.min(this.maxTargets, enemiesInRange.length); targetNum++) {
                    this.attack(enemiesInRange[targetNum])
                    this.tracers.push(enemiesInRange[targetNum].coords)
                }
                this.cooldown = this.maxCooldown
            } else {
                this.cooldown--;
            }
        }
    }
    attack(enemy) {
        enemy.takeDamage(this.attackStrength)
    }
    display() {
        //cooldown meter
        const cooldownPercent = this.cooldown / this.maxCooldown
        canva.fill(0, 255, 0)
        canva.rect(this.coords[0] - 10, this.coords[1] + 10, 20, 5)
        canva.fill(255, 0, 0)
        canva.rect(this.coords[0] - 10, this.coords[1] + 10, 20 - 20 * cooldownPercent, 5)

        //range
        canva.fill(0, 0, 0, 20)
        canva.ellipse(this.coords[0], this.coords[1], this.range * 2, this.range * 2)

        //icon
        canva.image(this.icon, this.coords[0] - 10, this.coords[1] - 10);

        //tracers
        for (let tracer in this.tracers) {
            const [tx, ty] = this.tracers[tracer]
            canva.line(this.coords[0], this.coords[1], tx, ty)
        }

        this.tracers = []
    }
}
class tower_basic extends Tower {
    range = 100;
    maxTargets = 1;
    attackStrength = 3;
    maxCooldown = 50;
    activeRanges = this.path.getIntervalsForRange(this.coords[0], this.coords[1], this.range);
    icon = "tower_basic"
}

class tower_machinegun extends Tower {
    range = 80;
    maxTargets = 1;
    attackStrength = 2;
    maxCooldown = 5;
    activeRanges = this.path.getIntervalsForRange(this.coords[0], this.coords[1], this.range);
    icon = "tower_machinegun"
}

class tower_shotgun extends Tower {
    range = 60;
    maxTargets = 10;
    attackStrength = 3;
    maxCooldown = 80;
    activeRanges = this.path.getIntervalsForRange(this.coords[0], this.coords[1], this.range);
    icon = "tower_shotgun"
}

class tower_sniper extends Tower {
    range = 200;
    maxTargets = 1;
    attackStrength = 20;
    maxCooldown = 100;
    activeRanges = this.path.getIntervalsForRange(this.coords[0], this.coords[1], this.range);
    icon = "tower_sniper"
}

const towerTypes = {
    basic: tower_basic,
    machinegun: tower_machinegun,
    shotgun: tower_shotgun,
    sniper: tower_sniper
}
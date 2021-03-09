class tower_basic extends Tower {
    range = 60;
    maxTargets = 1;
    attackStrength = 1;
    maxCooldown = 20;
    activeRanges = this.path.getIntervalsForRange(this.coords[0], this.coords[1], this.range);
    display() {
        canva.fill(0, 0, 0, 20)
        canva.ellipse(this.coords[0], this.coords[1], this.range * 2, this.range * 2)
        canva.fill(0, 0, 255)
        canva.rect(this.coords[0] - 5, this.coords[1] - 5, 10, 10)
        this.displayCooldown();
    }

}

const towerTypes = {
    basic: tower_basic
}
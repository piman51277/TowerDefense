let canva;

const gamePath = new Path([
    [100, 50],
    [100, 900],
    [200, 900],
    [200, 100],
    [300, 100],
    [300, 900],
    [400, 900],
    [400, 100],
    [500, 100],
    [500, 900],
    [600, 900],
    [600, 100],
    [700, 100],
    [700, 900],
    [800, 900],
    [800, 50],
    [100, 50]
])

let enemies = [];
let towers = [
    new towerTypes.basic(250, 200)
];

function processTick() {
    //towers attack
    for (let tower in towers) {
        towers[tower].findEnemiesInRange()
    }

    //move enemies
    for (let enemy in enemies) {
        if (enemies[enemy].health <= 0 || enemies[enemy].pos > gamePath.totalLength) {
            enemies.splice(enemy, 1)
        } else {
            enemies[enemy].move()
        }
    }
}

function display() {
    //set background
    canva.background(255, 255, 255)

    //draw path
    for (let i = 1, j = 0; i < gamePath.pointArray.length; j = i++) {
        const point0 = gamePath.pointArray[j]
        const point1 = gamePath.pointArray[i]
        canva.line(point0[0], point0[1], point1[0], point1[1])
    }

    //draw towers
    for (let tower in towers) {
        towers[tower].display();
    }

    //draw enemies
    for (let enemy in enemies) {
        enemies[enemy].display()
    }
}

$(document).ready(() => {
    const canvasObj = document.getElementById("main")
    canva = new canvas(canvasObj)

    canvasObj.width = 1000;
    canvasObj.height = 1000;

    setInterval(() => {
        processTick();
    }, 20)
    setInterval(() => {
        display();
    }, 20)

    setInterval(() => {
        enemies.push(new enemyTypes.basic)
        enemies.push(new enemyTypes.tank)
    }, 500)

    canva.mouseClicked(() => {
        towers.push(new towerTypes.machinegun(canva.mouseX, canva.mouseY))
    })
})
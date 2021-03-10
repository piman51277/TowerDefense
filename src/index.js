let canva;
let canvasObj;

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
let towers = [];

let selectedTower = 'basic'

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

//dynamic componets of display
function refreshDisplay() {
    //set background
    canva.fill(255, 255, 255)
    canva.rect(0, 0, 850, 1000)

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

//non-dynamic componets
function display() {

    //draw sidebar
    canva.fill(200, 200, 200)
    canva.rect(850, 0, 150, 1000)
    canva.fill(0, 0, 0)
    canva.setFont('30px Arial')
    canva.textAlign('center')
    canva.text("Towers", 925, 30)

    //buttons
    const towerButtons = {
        basic: new button(860, 50, 40, 40),
        machinegun: new button(905, 50, 40, 40),
        shotgun: new button(950, 50, 40, 40)
    }
    canva.fill(100, 100, 100)
    for (let name in towerButtons) {
        const towerButton = towerButtons[name];
        canva.rect(towerButton.x, towerButton.y, towerButton.width, towerButton.height)
        canva.image(`tower_${name}`, towerButton.x + 10, towerButton.y + 10)
        towerButton.onClick = () => {
            selectedTower = name;
        }
    }
}

$(document).ready(() => {
    canvasObj = document.getElementById("main")
    canva = new canvas(canvasObj)

    canvasObj.width = 1000;
    canvasObj.height = 1000;

    display();

    setInterval(() => {
        processTick();
    }, 10)
    setInterval(() => {
        refreshDisplay();
    }, 20)

    setInterval(() => {
        enemies.push(new enemyTypes.basic)
        enemies.push(new enemyTypes.tank)
    }, 500)

    canva.mouseClicked(() => {
        if (canva.mouseX < 850) {
            towers.push(new towerTypes[selectedTower](canva.mouseX, canva.mouseY))
        }
    })
})
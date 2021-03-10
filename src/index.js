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

//buttons
let towerButtons = {}

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

    //draw sidebar
    canva.fill(200, 200, 200)
    canva.rect(850, 0, 150, 1000)
    canva.fill(0, 0, 0)
    canva.setFont('30px Arial')
    canva.textAlign('center')
    canva.text("Towers", 925, 30)

    //wave indicator
    canva.text(`Wave: ${currentWave}`, 925, 980)

    //buttons
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

//non-dynamic componets
function display() {
    for (let name in towerButtons) {

        const towerButton = towerButtons[name];
        towerButton.onClick = () => {
            selectedTower = name;
        }
    }
}

//waves
let currentWave = 0;

async function sendWaves() {
    //check if wave even exists
    if (waves[currentWave] == undefined) return;
    //send wave
    for (subwave in waves[currentWave]) {
        const entry = waves[currentWave][subwave]
        for (let count = 0; count < entry[1]; count++) {
            enemies.push(new entry[0])

            //wait for delay
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 100 * entry[2])
            })
        }
    }
}

async function manageWaves() {
    for (i in waves) {
        currentWave = i;
        await sendWaves()
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000)
        })
    }
}


$(document).ready(() => {
    canvasObj = document.getElementById("main")
    canva = new canvas(canvasObj)

    canvasObj.width = 1000;
    canvasObj.height = 1000;

    //set button objects
    towerButtons = {
        basic: new button(860, 50, 40, 40),
        machinegun: new button(905, 50, 40, 40),
        shotgun: new button(950, 50, 40, 40),
        sniper: new button(860, 95, 40, 40),
    }


    display();

    setInterval(() => {
        processTick();
        refreshDisplay();
    }, 15)

    manageWaves();

    canva.mouseClicked(() => {
        if (canva.mouseX < 850) {
            towers.push(new towerTypes[selectedTower](canva.mouseX, canva.mouseY))
        }
    })
})
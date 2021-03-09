// A recreation of Processing.JS n modern Javascipt

let ctx;
class canvas {
    constructor(canvas) {
        this.canvas = canvas
        ctx = canvas.getContext('2d');

        this.width = canvas.width;
        this.height = canvas.height;

        //event listeners
        this.canvas.addEventListener("click", () => { this.onClick() });
        this.canvas.addEventListener("mousemove", event => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
            this.onMouseMove();
        })
    }

    //SHAPES

    /**Draws a path
     * @param {Array} coordinates - An array of x,y pairs
     */
    path(coordinates) {
        ctx.beginPath()
        ctx.moveTo(coordinates[0][0], coordinates[0][1])
        for (let i = 1; i < coordinates.length; i++) {
            ctx.lineTo(coordinates[i][0], coordinates[i][1])
        }
        ctx.fill();
        ctx.stroke();
    }

    /**Draws a line
     * @param {number} x1 x-coordinate of first point
     * @param {number} y1 y-coordinate of first point
     * @param {number} x2 x-coordinate of last point
     * @param {number} y2 y-coordinate of last point
     */
    line(x1, y1, x2, y2) {
        this.path([
            [x1, y1],
            [x2, y2]
        ])
    }

    /**Draws a line
     * @param {number} x x-coordinate of the top left corner
     * @param {number} y y-coordinate of the top left corner
     * @param {number} width width of rectangle
     * @param {number} height height of rectangle
     */
    rect(x, y, width, height) {
        ctx.fillRect(x, y, width, height);
    }

    /**Draws a triangle
     * @param {number} x1 x-coordinate of first point
     * @param {number} y1 y-coordinate of first point
     * @param {number} x2 x-coordinate of second point
     * @param {number} y2 y-coordinate of second point
     * @param {number} x3 x-coordinate of third point
     * @param {number} y3 y-coordinate of third point
     */
    triangle(x1, y1, x2, y2, x3, y3) {
        this.path([
            [x1, y1],
            [x2, y2],
            [x3, y3]
        ])
    }

    /**ellipse
     * @param {number} x - x-coordinate of center
     * @param {number} y - y-coordinate of center
     * @param {number} width - width of ellipse
     * @param {number} height - height of ellipse
     */
    ellipse(x, y, width, height) {
        ctx.beginPath();
        ctx.ellipse(x, y, width * 0.5, height * 0.5, 0, 0, Math.PI * 2)
        ctx.fill();
        ctx.stroke();
    }

    //COLORS

    /**Sets background color
     * @param {number} r red value 0-255
     * @param {number} g green value 0-255
     * @param {number} b blue value 0-255
     */
    background(r, g, b) {
        //don't disturb the current fill
        const cache = ctx.fillStyle;
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.fillStyle = cache
    }

    /**Sets fill color
     * @param {number} r red value 0-255
     * @param {number} g green value 0-255
     * @param {number} b blue value 0-255
     * @param {number} a alpha value 0-255
     */
    fill(r, g, b, a = 255) {
        ctx.fillStyle = `rgba(${r},${g},${b},${a*0.003921})`;
    }

    /**Turns off shape fill
     */
    noFill() {
        this.fill(0, 0, 0, 0)
    }

    /**Sets stroke color
     * @param {number} r red value 0-255
     * @param {number} g green value 0-255
     * @param {number} b blue value 0-255
     * @param {number} a alpha value 0-255
     */
    stroke(r, g, b, a = 255) {
        ctx.strokeStyle = `rgb(${r},${g},${b},${a*0.003921})`;
    }


    /**sets the stroke weight
     * @param {*} weight - how thick the lines should be
     */
    strokeWeight(weight) {
        ctx.lineWidth = weight
    }

    /**Turns off stroke
     */
    noStroke() {
        this.stroke(0, 0, 0, 0)
    }

    //TEXT

    /**Draws text
     * @param {string} text - The text to draw
     * @param {string} x - x-coordinate to draw the text at
     * @param {string} y = y-coordinate to draw the text at
     */
    text(text, x, y) {
        ctx.fillText(text, x, y);
    }

    setFont(font) {
        ctx.font = font;
    }

    textAlign(align) {
        ctx.textAlign = align
    }

    //MOUSE
    mouseX = 0;
    mouseY = 0;

    onClick = () => {}
    onMouseMove = () => {}

    mouseClicked(callback) {
        this.onClick = callback;
    }

    mouseMoved(callback) {
        this.onMouseMove = callback;
    }






}
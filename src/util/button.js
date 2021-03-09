class button {
    onClick = () => {}
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        canvasObj.addEventListener("click", event => {
            if (event.clientX > x && event.clientY > y && event.clientY < (y + height) && event.clientY < (x + width)) {
                this.onClick();
            }
        })
    }
}
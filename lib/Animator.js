class Animator{
    constructor(maxSize){
        this.width = maxSize.x;
        this.height = maxSize.y;
        this.tempCanvas = createGraphics(this.width, this.height);
        this.canvas = createGraphics(this.width, this.height);

        currentScene.animationObjects.push(this);
    }

    get camera(){
        return currentScene.camera;
    }

    update(){
        currentScene.debugCounter++
        let x = this.width, y = this.height;
        this.tempCanvas.clear();
        this.tempCanvas.copy(this.canvas, 0, 0, x, y, 0, 0, x, y);
    }

    updateImage(position){
        let xOffset = width/2 - this.width/2 - this.camera.centeredPosition.x;
        let yOffset = height/2 - this.height/2 - this.camera.centeredPosition.y;
        image(this.tempCanvas, position.x + xOffset, position.y + yOffset)
    }

    addImage(img, position){
        this.canvas.image(img, position.x, position.y)
    }

    drawGravityField(gravitation){
        this.drawGravityFieldInternal(gravitation, gravitation, 40);
    }

    drawGravityFieldInternal(darkness, startDarkness, radius){

        if(darkness < 10 && darkness < startDarkness / 2) {
            return;
        }

        this.canvas.stroke(0, 0, 0, darkness);
        this.canvas.strokeWeight(Math.floor(radius));
        this.canvas.point(this.canvas.width/2, this.canvas.height/2);

        this.drawGravityFieldInternal(darkness * .9*.9, startDarkness, radius + 160)
    }

    castShadow(position, radius){
        //this.canvas.erase();
        //this.canvas.rect(position.x, position.y - radius, 9999, 2*radius);
    }

    static calculateGravityFieldSize(gravitation){
        return this.calculateGravityFieldSizeInternal(gravitation, gravitation, 40);
    }

    static calculateGravityFieldSizeInternal(darkness, startDarkness, radius){
        if(darkness < 10 && darkness < startDarkness / 2) return radius;
        else{
            return this.calculateGravityFieldSizeInternal(darkness * .9*.9, startDarkness, radius + 160)
        }
    }
}
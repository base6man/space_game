class Animator{
    constructor(maxSize){
        this.width = maxSize.x;
        this.height = maxSize.y;
        this.canvas = createGraphics(this.width, this.height);
    }

    get camera(){
        return currentScene.camera;
    }

    updateImage(position){
        image(this.canvas, position.x + width/2 - this.canvas.width/2 - this.camera.centeredPosition.x, position.y + height/2 - this.canvas.height/2 - this.camera.centeredPosition.y)
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
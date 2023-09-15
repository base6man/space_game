class Animator{
    constructor(maxSize){
        this.width = maxSize.x;
        this.height = maxSize.y;
        this.canvas = createGraphics(this.width, this.height);
    }

    updateImage(position){
        image(this.canvas, position.x + width/2 - this.canvas.width/2, position.y + height/2 - this.canvas.height/2)
    }

    addImage(img, position){
        this.canvas.image(img, position.x, position.y)
    }

    drawGravityField(mass){
        this.drawGravityFieldInternal(mass, 40);
    }

    drawGravityFieldInternal(darkness, radius){

        if(darkness < 10) {
            return;
        }

        this.canvas.stroke(0, 0, 0, darkness);
        this.canvas.strokeWeight(Math.floor(radius));
        this.canvas.point(this.canvas.width/2, this.canvas.height/2);

        this.drawGravityFieldInternal(darkness * 0.9, radius + 80)
    }

    static calculateGravityFieldSize(mass){
        return this.calculateGravityFieldSizeInternal(mass, 40);
    }

    static calculateGravityFieldSizeInternal(darkness, radius){
        if(darkness < 10) return radius;
        else{
            return this.calculateGravityFieldSizeInternal(darkness * 0.9, radius + 80)
        }
    }
}
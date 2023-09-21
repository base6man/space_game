

class GravityObject{
    /**
     * @brief A body of gravitational influence. Not a physics object.
     * @param {*} MASS the planet's gravitational force 
     * @param {*} physicsObject use this if you want the planet to move
     */
    constructor(MASS = 1, physicsObject = new PhysicsObject(new Vector(0, 0), new Vector(0, 0))){
        this.physicsObject = physicsObject;
        this.physicsObject.planet = this;

        this.MASS = MASS;

        let maxCanvasSize = Animator.calculateGravityFieldSize(this.MASS);
        this.animator = new Animator(new Vector(maxCanvasSize, maxCanvasSize));
        this.animator.drawGravityField(this.MASS)

        currentScene.imageObjects[0].push(this);
        currentScene.planetObjects.push(this);
    }

    get position(){
        return this.physicsObject.position;
    }

    get velocity(){
        return this.physicsObject.velocity;
    }

    update(){
        this.physicsObject.update();
    }

    updateImage(){
        this.animator.updateImage(this.position);
        //currentScene.drawCircle(this.MASS, this.position);
    }
    /*
    bounce(other, dist){
        if(other.isBlackHole){
            planets.splice(planets.indexOf(this), 1);
            this.isDeleted = true;
            if(this.isEarth) currentScene.isOver = true;
            
            return;
        }
        if(this.isBlackHole){
            planets.splice(planets.indexOf(other), 1);
            other.isDeleted = true;
            if(other.isEarth) currentScene.isOver = true;
            return;
        }

        // shortening variable names
        {
            this.xPos = this.position.x
            this.yPos = this.position.y
            this.xVel = this.velocity.x
            this.yVel = this.velocity.y
            other.xPos = other.position.x
            other.yPos = other.position.y
            other.xVel = other.velocity.x
            other.yVel = other.velocity.y
        }


        let newVector = new Vector((other.xPos - this.xPos) / dist, (other.yPos - this.yPos) / dist); 
        
        // I didn't cite the source when I wrote this code
        // This was the algorithm I was given. I hope it never breaks
        let p = 2 * (this.xVel * newVector.x + this.yVel * newVector.y - 
                    other.xVel * newVector.x - other.yVel * newVector.y) / 
                    (this.MASS + other.MASS); 
        
        
        // Collision elasticity
        this.xVel =  this.xVel - p * other.MASS * newVector.x * 0.99; 
        this.yVel =  this.yVel - p * other.MASS * newVector.y * 0.99; 
        other.xVel = other.xVel + p * this.MASS * newVector.x * 0.99; 
        other.yVel = other.yVel + p * this.MASS * newVector.y * 0.99;
        
        let i = 0
        
        while(Math.sqrt(Math.pow(this.xPos - other.xPos, 2) + Math.pow(this.yPos - other.yPos, 2)) < (this.size + other.size)/2)
        {
            this.xPos += this.xVel * timeElapsed;
            this.yPos += this.yVel * timeElapsed;
            other.xPos += other.xVel * timeElapsed;
            other.yPos += other.yVel * timeElapsed;

            i++
        }



        let velocityDiff = Math.sqrt(
            Math.pow(this.xVel - other.xVel, 2) +
            Math.pow(this.yVel - other.yVel, 2));

        if(velocityDiff < 100){

            if(this.isEarth){
                this.xVel = other.xVel;
                this.yVel = other.yVel;
            }
            else if (other.isEarth){
                other.xVel = this.xVel;
                other.yVel = this.yVel;
            }
            else{
                let tempxVel = this.xVel;
                let tempyVel = this.yVel;
                this.xVel += 2*(other.xVel - this.xVel);
                this.yVel += 2*(other.yVel - this.yVel);
                other.xVel += 2*(tempxVel - other.xVel);
                other.yVel += 2*(tempyVel - other.yVel);
            }
        }

        // lengthening variable names again
        {
            this.position.x =  this.xPos
            this.position.y =  this.yPos
            this.velocity.x =  this.xVel
            this.velocity.y =  this.yVel
            other.position.x = other.xPos
            other.position.y = other.yPos
            other.velocity.x = other.xVel
            other.velocity.y = other.yVel
        }
        
    }
    */
}


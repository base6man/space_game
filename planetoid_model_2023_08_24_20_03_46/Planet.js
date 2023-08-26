

class Planet{
    constructor(position = Vector(0, 0), velocity = Vector(0, 0), mass = 1, size = 1, color = 'white'){
        this.position = position
        this.velocity = velocity
        this.mass = mass
        this.size = size
        this.color = color

        this.acceleration = new Vector(0, 0)

        this.index = planets.length
        planets.push(this)

        this.isEarth = false
        if(this.index == 0) this.isEarth = true
    }

    update(){
        if(stopUpdates) return
        
        this.position.x += this.velocity.x * timeElapsed;
        this.position.y += this.velocity.y * timeElapsed;
        
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        
        let tempVelocity = this.velocity.copy()
        for(let i of planets){
            if(i != this){
                
                let gMag = 1/(this.position.subtract(i.position).sqrMagnitude);
                
                this.velocity.x -= (this.position.x - i.position.x) * timeElapsed * gMag * gMult * i.mass;
                this.velocity.y -= (this.position.y - i.position.y) * timeElapsed * gMag * gMult * i.mass;
            
                //if(tempVelocity.isVector() && !this.velocity.isVector()) print(this.velocity, planets[i].velocity, tempVelocity, gMag, this.position, planets[i].position, this.index, planets[i].index)
            }
        }
        this.acceleration.x = (this.velocity.x - tempVelocity.x) * steps;
        this.acceleration.y = (this.velocity.y - tempVelocity.y) * steps;
        
        for(let i of planets){
            if(i != this){
            
                let dist = Math.sqrt(
                    Math.pow(this.position.x - i.position.x, 2) +
                    Math.pow(this.position.y - i.position.y, 2));
                
                if(dist < (this.size + i.size) / 2){
                    
                    this.bounce(i, dist);
                }
            }
        }
    }

    bounce(other, dist){

        let goingToStick = false
        if(Math.abs(this.xVel - other.xVel) < 100 &&
        Math.abs(this.yVel - other.yVel) < 100){
            goingToStick = true
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
        print("Collision!")
        numCollisions++
        //print(Math.sqrt(Math.pow(this.xPos - other.xPos, 2) + Math.pow(this.yPos - other.yPos, 2)) - (this.size + other.size))

        // move them out of each other's hitboxes
        let averageX = (this.xPos + other.xPos)/2
        let averageY = (this.yPos + other.yPos)/2

        //print(this.color, other.color)
        //print(this.xPos, this.yPos, other.xPos, other.yPos)
        this.xPos =  averageX + this.size/2 * (this.xPos - other.xPos) / dist; 
        this.yPos =  averageY + this.size/2 * (this.yPos - other.yPos) / dist; 
        other.xPos = averageX + other.size/2 * (other.xPos - this.xPos) / dist;
        other.yPos = averageY + other.size/2 * (other.yPos - this.yPos) / dist;

        if(numCollisions >= 2){

            this.position.x =  this.xPos
            this.position.y =  this.yPos
            this.velocity.x =  this.xVel
            this.velocity.y =  this.yVel
            other.position.x = other.xPos
            other.position.y = other.yPos
            other.velocity.x = other.xVel
            other.velocity.y = other.yVel
        }

        //print(averagePosition)
        //print(this.size/2 * (this.xPos - other.xPos) / dist, this.size/2 * (this.yPos - other.yPos) / dist, other.size/2 * (other.xPos - this.xPos) / dist, other.size/2 * (other.yPos - this.yPos) / dist)
        //print(this.xPos, this.yPos, other.xPos, other.yPos)

        let newVector = new Vector((other.xPos - this.xPos) / dist, (other.yPos - this.yPos) / dist); 
        
        // I didn't cite the source when I wrote this code
        // This was the algorithm I was given. I hope it never breaks
        let p = 2 * (this.xVel * newVector.x + this.yVel * newVector.y - 
                    other.xVel * newVector.x - other.yVel * newVector.y) / 
                    (this.mass + other.mass); 
        
        
        // Collision elasticity
        this.xVel =  this.xVel - p * other.mass * newVector.x * 0.99; 
        this.yVel =  this.yVel - p * other.mass * newVector.y * 0.99; 
        other.xVel = other.xVel + p * this.mass * newVector.x * 0.99; 
        other.yVel = other.yVel + p * this.mass * newVector.y * 0.99;
        
        let i = 0
        //print(Math.sqrt(Math.pow(this.xPos - other.xPos, 2) + Math.pow(this.yPos - other.yPos, 2)) - (this.size + other.size))

        //this.sizePercent =  this.size /  (this.size + other.size)
        //other.sizePercent = other.size / (this.size + other.size)
        
        while(Math.sqrt(Math.pow(this.xPos - other.xPos, 2) + Math.pow(this.yPos - other.yPos, 2)) < (this.size + other.size)/2)
        {
            this.xPos += this.xVel * timeElapsed;
            this.yPos += this.yVel * timeElapsed;
            other.xPos += other.xVel * timeElapsed;
            other.yPos += other.yVel * timeElapsed;

            i++
        }
        print(i)

        if(numCollisions >= 2){
            stopUpdates = true
            return
        }
        
        //print(this.xPos, this.yPos, other.xPos, other.yPos)
        //print(Math.sqrt(Math.pow(this.xPos - other.xPos, 2) + Math.pow(this.yPos - other.yPos, 2)) - (this.size + other.size))

        if(goingToStick){

            print("Stick!")

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
}


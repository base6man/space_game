class CircleCollider{
    constructor(parent, radius, isTrigger = false){
        super(parent);
        this.radius = radius;

        this.isTrigger = isTrigger;
    }

    update(){
        for(let i = this.colliders.length-1; i >= 0; i--){
            if(this.colliders[i] == this) continue;
            
            let dist = Math.sqrt(
                Math.pow(this.parent.position.x - this.colliders[i].parent.position.x, 2) +
                Math.pow(this.parent.position.y - this.colliders[i].parent.position.y, 2));
            
            if(dist < (this.radius + this.colliders[i].radius) / 2){
                
                this.bounce(this.colliders[i], dist);
            }
            
        }
    }

    bounce(){
        // accessing all variables
        {
            myXPos = this.parent.position.x
            myYPos = this.parent.position.y
            myXVel = this.parent.velocity.x
            myYVel = this.parent.velocity.y
            otherXPos = other.parent.position.x
            otherYPos = other.parent.position.y
            otherXVel = other.parent.velocity.x
            otherYVel = other.parent.velocity.y
        }


        let newVector = new Vector((otherXPos - myXPos) / dist, (otherYPos - myYPos) / dist); 
        
        // I didn't cite the source when I wrote this code
        // This was the algorithm I was given. I hope it never breaks
        let p = 2 * (myXVel * newVector.x + myYVel * newVector.y - 
                    otherXVel * newVector.x - otherYVel * newVector.y) / 
                    (this.mass + other.mass); 
        
        
        // Collision elasticity
        myXVel =  myXVel - p * other.mass * newVector.x * 0.99; 
        myYVel =  myYVel - p * other.mass * newVector.y * 0.99; 
        otherXVel = otherXVel + p * this.mass * newVector.x * 0.99; 
        otherYVel = otherYVel + p * this.mass * newVector.y * 0.99;
        
        let i = 0
        
        while(Math.sqrt(Math.pow(myXPos - otherXPos, 2) + Math.pow(myYPos - otherYPos, 2)) < (this.size + other.size)/2)
        {
            myXPos += myXVel * timeElapsed;
            myYPos += myYVel * timeElapsed;
            otherXPos += otherXVel * timeElapsed;
            otherYPos += otherYVel * timeElapsed;

            i++
        }



        let velocityDiff = Math.sqrt(
            Math.pow(myXVel - otherXVel, 2) +
            Math.pow(myYVel - otherYVel, 2));

        if(velocityDiff < 100){

            if(this.isEarth){
                myXVel = otherXVel;
                myYVel = otherYVel;
            }
            else if (other.isEarth){
                otherXVel = myXVel;
                otherYVel = myYVel;
            }
            else{
                let tempxVel = myXVel;
                let tempyVel = myYVel;
                myXVel += 2*(otherXVel - myXVel);
                myYVel += 2*(otherYVel - myYVel);
                otherXVel += 2*(tempxVel - otherXVel);
                otherYVel += 2*(tempyVel - otherYVel);
            }
        }

        // redistributing variables
        {
            this.parent.position.x =  myXPos
            this.parent.position.y =  myYPos
            this.parent.velocity.x =  myXVel
            this.parent.velocity.y =  myYVel
            other.parent.position.x = otherXPos
            other.parent.position.y = otherYPos
            other.parent.velocity.x = otherXVel
            other.parent.velocity.y = otherYVel
        }
     
    }
}
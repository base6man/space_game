class CircleCollider extends Collider{
    constructor(parent, radius, isTrigger = false){
        super(parent);
        this.radius = radius;

        this.isTrigger = isTrigger;
    }

    update(){
        for(let i of this.colliders){
            if(i === this) continue;

            //for(let j of this.doNotCollide) if(j === i) continue;
            //for(let j of i.doNotCollide) if(j === this) continue;
            
            // This will work as long as doNotCollide never exceeds 1 item
            // You can always add another one if it'll never exceed 2
            if(i.doNotCollide[0] === this) continue;
            if(this.doNotCollide[0] === i) continue;
            
            let dist = Math.sqrt(Math.pow(this.position.x - i.position.x, 2) + Math.pow(this.position.y - i.position.y, 2));
            
            if(dist < (this.radius + i.radius) / 2){
                this.bounce(i, dist);
            }
            
        }
    }

    bounce(other, dist){
        let previousVelocity = other.velocity.copy();

        let newVector = new Vector((other.position.x - this.position.x) / dist, (other.position.y - this.position.y) / dist); 
        
        // I didn't cite the source when I wrote this code
        // This was the algorithm I was given. I hope it never breaks
        let p = 2 * (this.velocity.x * newVector.x + this.velocity.y * newVector.y - 
                    other.velocity.x * newVector.x - other.velocity.y * newVector.y) / 
                    (this.MASS + other.MASS); 
        
        // Collision elasticity
        this.velocity.x =  this.velocity.x - p * other.MASS * newVector.x * 0.99; 
        this.velocity.y =  this.velocity.y - p * other.MASS * newVector.y * 0.99; 
        other.velocity.x = other.velocity.x + p * this.MASS * newVector.x * 0.99; 
        other.velocity.y = other.velocity.y + p * this.MASS * newVector.y * 0.99;
        
        let i = 0        
        while(Math.sqrt(Math.pow(this.position.x - other.position.x, 2) + 
                        Math.pow(this.position.y - other.position.y, 2)) < 
                        (this.radius + other.radius)/2)
        {
            this.position.x += this.velocity.x * time.deltaTime;
            this.position.y += this.velocity.y * time.deltaTime;
            other.position.x += other.velocity.x * time.deltaTime;
            other.position.y += other.velocity.y * time.deltaTime;

            i++
        }
        
        this.parent.bouncedThisFrame = true;
        console.log(previousVelocity, other.velocity, this.MASS);


        // Landing code, will probably rewrite
        /*
        let velocityDiff = Math.sqrt(
            Math.pow(this.velocity.x - this.velocity.x, 2) +
            Math.pow(this.velocity.y - this.velocity.y, 2));

        if(velocityDiff < 100){

            if(this.isEarth){
                this.velocity.x = this.velocity.x;
                this.velocity.y = this.velocity.y;
            }
            else if (other.isEarth){
                this.velocity.x = this.velocity.x;
                this.velocity.y = this.velocity.y;
            }
            else{
                let tempxVel = this.velocity.x;
                let tempyVel = this.velocity.y;
                this.velocity.x += 2*(this.velocity.x - this.velocity.x);
                this.velocity.y += 2*(this.velocity.y - this.velocity.y);
                this.velocity.x += 2*(tempxVel - this.velocity.x);
                this.velocity.y += 2*(tempyVel - this.velocity.y);
            }
        }
        */
    }
}
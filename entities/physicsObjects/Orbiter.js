class Orbiter extends KinematicObject{
    constructor(radius, position, velocity){
        super(position, velocity);        
        this.acceleration = new Vector(0, 0)

        this.collider = new CircleCollider(this, radius);        
        this.radius = this.collider.radius;
        this.planet;

        this.animator = new Animator(new Vector(this.radius + 5, this.radius + 5));
        this.animator.addImage(drawCircle(this.radius), new Vector(0, 0))
        currentScene.imageObjects[1].push(this);

        this.isDeleted = false;

        this.friction = 0;

        
        this.bouncedThisFrame = false;
        this.lastBouncedWith;
        this.previousVelocity = new Vector(0, 0)
    }

    get planets(){
        return currentScene.gravityObjects;
    }

    get MASS(){
        if(this.planet) return this.planet.MASS;
        else{ return super.MASS; }
    }

    update(){
        super.update();
        
        this.velocity.x *= 1 - this.friction * time.deltaTime;
        this.velocity.y *= 1 - this.friction * time.deltaTime;
        
        let tempVelocity = this.velocity.copy()

        this.greatestInfluenceValue = 0
        for(let i of this.planets){
            if(i.physicsObject === this) continue;
            
            let gravityMagnitude = 1/(this.position.subtract(i.position).sqrMagnitude) * i.MASS * GRAVITY_MULTIPLIER;
                
            this.velocity.x -= (this.position.x - i.position.x) * time.deltaTime * gravityMagnitude;
            this.velocity.y -= (this.position.y - i.position.y) * time.deltaTime * gravityMagnitude;

            i.animator.castShadow(i.position.subtract(this.position), this.radius);
        }
        this.acceleration.x = (this.velocity.x - tempVelocity.x) * STEPS;
        this.acceleration.y = (this.velocity.y - tempVelocity.y) * STEPS;
        
        this.bouncedThisFrame = false;
        this.previousVelocity = this.velocity.copy();
    }

    updateImage(){
        this.animator.updateImage(this.position);
    }

    onBounce(other){
        this.lastBouncedWith = other;
        this.bouncedThisFrame = true;
    }

    delete(){
        super.delete();
        this.isDeleted = true;
        // currentScene.imageObjects[1].pop(currentScene.imageObjects[1].findIndex((x) => x === this));
        //this.collider.delete();
        
        for(let i = 0; i < currentScene.imageObjects[1].length; i++){
            if(currentScene.imageObjects[1][i] === this) {
                currentScene.imageObjects[1].pop(i);
                return;
            }
        }
        throw new Error(e);
    }
}
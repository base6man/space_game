class Orbiter extends PhysicsObject{
    constructor(position = new Vector(0, 0), velocity = new Vector(0, 0), radius){
        super(position, velocity);

        
        this.acceleration = new Vector(0, 0)

        this.radius = this.collider.radius;
        this.color = color;
        this.animator = new Animator(new Vector(this.radius + 5, this.radius + 5));
        this.animator.addImage(this.drawImage(), new Vector(0, 0))

        this.isDeleted = false;

        this.friction = 0;

        currentScene.imageObjects[1].push(this);
    }

    get planets(){
        return currentScene.planetObjects;
    }

    update(){
        super.update();
        
        this.velocity.x *= 1 - this.friction * time.deltaTime;
        this.velocity.y *= 1 - this.friction * time.deltaTime;
        
        let tempVelocity = this.velocity.copy()

        this.greatestInfluenceValue = 0
        for(let i of this.planets){
            if(i.physicsObject === this) continue;
            
            let gravityMagnitude = 1/(this.position.subtract(i.position).sqrMagnitude) * i.mass * GRAVITY_MULTIPLIER;
                
            this.velocity.x -= (this.position.x - i.position.x) * time.deltaTime * gravityMagnitude;
            this.velocity.y -= (this.position.y - i.position.y) * time.deltaTime * gravityMagnitude;
        }
        this.acceleration.x = (this.velocity.x - tempVelocity.x) * STEPS;
        this.acceleration.y = (this.velocity.y - tempVelocity.y) * STEPS;
    }

    updateImage(){
        this.animator.updateImage(this.position);
    }

    drawImage(){
        let newImage = createGraphics(this.radius + 5, this.radius + 5)
        newImage.fill('white')
        newImage.stroke('black')
        newImage.strokeWeight(5);
        newImage.circle(newImage.width/2, newImage.height/2, this.radius)
        return newImage;
    }
}
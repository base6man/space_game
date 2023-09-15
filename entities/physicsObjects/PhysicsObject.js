class PhysicsObject{
    constructor(position = new Vector(0, 0), velocity = new Vector(0, 0)){
        this.position = position;
        this.velocity = velocity;

        currentScene.physicsObjects.push(this);
    }

    update(){
        this.position.x += this.velocity.x * time.deltaTime;
        this.position.y += this.velocity.y * time.deltaTime;
    }
}
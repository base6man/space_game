class Player{
    /**
     * @param {*} radius the player's radius
     * @param {*} startingPlanet the planet this object starts on. If null, object starts in orbit
     * @param {*} startingPosition either the starting angle on the planet or the position in orbit
     * @param {*} orbitVelocity if in orbit, starting velocity
     */
    constructor(radius, startingPlanet, startingPosition, orbitVelocity = null){

        this.walker = null;
        this.orbiter = null;

        this.radius = radius;

        if(startingPlanet){
            this.walker = new Walker(startingPlanet, startingPosition, Walker.playerInputMotion, [100], this.radius);
        }
        else{
            this.orbiter = new Orbiter(this.radius, startingPosition, orbitVelocity);
        }

        this.launchSpeed = 1000;

        currentScene.inputObjects.push(this);
    }
    
    update(){
        if(KeyReader.space && this.walker){
            this.launch();
        }
        if(keyIsDown(SHIFT)) stopUpdates = true;
    }

    launch(){
        console.log("Hello!")
        let newVelocity = this.walker.velocity;
        newVelocity = newVelocity.add(Vector.fromPseudovector(this.launchSpeed, this.walker.angle));

        let newPosition = this.walker.position;
        newPosition = newPosition.add(newVelocity.multiply(time.deltaTime));

        this.walker.delete();
        this.walker = null;
        
        this.orbiter = new Orbiter(this.radius, newPosition, newVelocity);
    }
}
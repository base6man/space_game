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

        this.launchSpeed = 1000;
        this.walkSpeed = 250;

        if(startingPlanet){
            this.walker = new Walker(startingPlanet, startingPosition, Walker.playerInputMotion, [this.walkSpeed], this.radius);
        }
        else{
            this.orbiter = new Orbiter(this.radius, startingPosition, orbitVelocity);
        }


        currentScene.inputObjects.push(this);
    }
    
    update(){
        if(KeyReader.space && this.walker){
            this.launch();
            return;
        }
        if(KeyReader.holdSpace && this.orbiter && this.orbiter.bouncedThisFrame){
            this.land();
            return;
        }
        if(keyIsDown(SHIFT)) stopUpdates = true;
    }

    launch(){
        let newVelocity = this.walker.velocity;
        newVelocity = newVelocity.add(Vector.fromPseudovector(this.launchSpeed, this.walker.angle));

        let newPosition = this.walker.position;
        newPosition = newPosition.add(newVelocity.multiply(time.deltaTime));

        this.walker.delete();
        this.walker = null;
        
        this.orbiter = new Orbiter(this.radius, newPosition, newVelocity);
    }

    land(){
        let planet = this.orbiter.lastBouncedWith;
        this.orbiter.delete();
        this.orbiter = null;
        
        this.walker = new Walker(planet, 0, Walker.playerInputMotion, [this.walkSpeed], this.radius);
        this.walker.debugMe = true;
        this.walker.debugFunc();
    }

    get position(){
        if(this.walker){
            return this.walker.position;
        }
        return this.orbiter.position;
    }

    getCameraPosition(){
        if(this.walker){
            return this.walker.parent.position;
        }
        return this.position;
    }
}
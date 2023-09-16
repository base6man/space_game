class Camera{
    constructor(){
        this.rotation = 0
        this.zoom = 0.05
        this.speed = 4        
    }

    setTarget(target){
        this.target = target
        this.position = new Vector(this.target.position.x - width/this.zoom/2, this.target.position.y - height/this.zoom/2)
    }

    update(){
        this.position.x = (this.position.x + (this.target.position.x - width / this.zoom / 2) / 10) / 1.1
        this.position.y = (this.position.y + (this.target.position.y - height / this.zoom / 2) / 10) / 1.1
        //this.position.x = this.target.position.x - width/this.zoom/2
        //this.position.y = this.target.position.y - height/this.zoom/2
    }

    /*
    getInput(){
    
        //Attaching a jetpack to one of the celestial bodies
        let jetpackPower = 40 * inp.value();
        if(keyIsDown(65)){
            // Go left
            this.target.velocity.x -= jetpackPower * cos(-this.rotation);
            this.target.velocity.y -= jetpackPower * sin(-this.rotation);
        }
        if(keyIsDown(68)){
            // Go right
            this.target.velocity.x += jetpackPower * cos(-this.rotation);
            this.target.velocity.y += jetpackPower * sin(-this.rotation);
        }
        if(keyIsDown(83)){
            // Go down
            this.target.velocity.x -= jetpackPower * sin(-this.rotation);
            this.target.velocity.y += jetpackPower * cos(-this.rotation);
        }
        if(keyIsDown(87)){
            // Go up
            this.target.velocity.x += jetpackPower * sin(-this.rotation);
            this.target.velocity.y -= jetpackPower * cos(-this.rotation);
        }
        if(keyIsDown(32)){
            let targetVelocity = this.target.greatestInfluencePlanet.velocity.copy()
            this.target.velocity = this.target.velocity.add(targetVelocity.divide(3)).divide(1.333)
        }
        inp.input(ChangeTimeScale);

        
        if(keyIsDown(DOWN_ARROW)){
            
            let tempX = this.position.x + width / this.zoom / 2;
            let tempY = this.position.y + height / this.zoom / 2;
            
            this.zoom *= 0.99;
            
            this.position.x = tempX - width / this.zoom / 2;
            this.position.y = tempY - height / this.zoom / 2;
        }
        if(keyIsDown(UP_ARROW)){
            
            let tempX = this.position.x + width / this.zoom / 2;
            let tempY = this.position.y + height / this.zoom / 2;
            
            this.zoom *= 1.01;
            
            this.position.x = tempX - width / this.zoom / 2;
            this.position.y = tempY - height / this.zoom / 2;
        }
    }
    */
    get centeredPosition(){
        return new Vector(this.position.x + width/this.zoom/2, this.position.y + height/this.zoom/2)
    }
}
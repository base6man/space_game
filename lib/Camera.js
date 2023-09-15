class Camera{
    constructor(earth){
        this.rotation = 0
        this.zoom = 0.05
        this.speed = 4

        this.earth = earth
        
        this.position = new Vector(this.earth.position.x - width/this.zoom/2, this.earth.position.y - height/this.zoom/2)
    }

    update(){
        this.position.x = (this.position.x + (this.earth.position.x - width / this.zoom / 2) / 10) / 1.1
        this.position.y = (this.position.y + (this.earth.position.y - height / this.zoom / 2) / 10) / 1.1
        //this.position.x = this.earth.position.x - width/this.zoom/2
        //this.position.y = this.earth.position.y - height/this.zoom/2

        /*
        let newRotation = -this.earth.acceleration.angle - Math.PI/2

        while(Math.abs(this.rotation - newRotation) > PI){
            if(this.rotation > newRotation){
                this.rotation -= 2*PI;
            }
            else{
                newRotation -= 2*PI;
            }
        }

        this.rotation = (this.rotation + (newRotation / 20)) / 1.05;
        */
    }

    getInput(){
    
        //Attaching a jetpack to one of the celestial bodies
        let jetpackPower = 40 * inp.value();
        if(keyIsDown(65)){
            // Go left
            this.earth.velocity.x -= jetpackPower * cos(-this.rotation);
            this.earth.velocity.y -= jetpackPower * sin(-this.rotation);
        }
        if(keyIsDown(68)){
            // Go right
            this.earth.velocity.x += jetpackPower * cos(-this.rotation);
            this.earth.velocity.y += jetpackPower * sin(-this.rotation);
        }
        if(keyIsDown(83)){
            // Go down
            this.earth.velocity.x -= jetpackPower * sin(-this.rotation);
            this.earth.velocity.y += jetpackPower * cos(-this.rotation);
        }
        if(keyIsDown(87)){
            // Go up
            this.earth.velocity.x += jetpackPower * sin(-this.rotation);
            this.earth.velocity.y -= jetpackPower * cos(-this.rotation);
        }
        if(keyIsDown(32)){
            let targetVelocity = this.earth.greatestInfluencePlanet.velocity.copy()
            this.earth.velocity = this.earth.velocity.add(targetVelocity.divide(3)).divide(1.333)
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

    get centeredPosition(){
        return new Vector(this.position.x + width/this.zoom/2, this.position.y + height/this.zoom/2)
    }
}
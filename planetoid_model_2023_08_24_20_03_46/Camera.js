class Camera{
    constructor(earth){
        this.rotation = 0
        this.zoom = 0.1
        this.speed = 4

        this.earth = earth
        
        //this.position = earth.position.subtract(new Vector(_width, _height).divide(this.zoom, 2))
        this.position = new Vector(0, 0)
    }

    update(){
        this.position.x = (this.position.x + (this.earth.position.x - width / this.zoom / 2) / 100) / 1.01
        this.position.y = (this.position.y + (this.earth.position.y - height / this.zoom / 2) / 100) / 1.01
        //this.position.x = this.earth.position.x - width/this.zoom/2
        //this.position.y = this.earth.position.y - height/this.zoom/2

        //this.rotation = (camera.rotation + (this.earth.acceleration.angle / 30)) / 1.033;
        //this.rotation = this.earth.acceleration.angle + Math.PI/2
    }
}
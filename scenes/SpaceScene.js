class SpaceScene extends Scene{
    constructor(){
        super();

        this.physicsObjects = []
        this.planetObjects = []
        this.colliders = []
        this.imageObjects = [
            [], // Planets
            [] // Orbiters
        ]
        this.isOver = false;
    }

    setup(){
        super.setup();

        let centralPlanet = new Planet(60)
        let smallestPlanet = new Planet(30, new Orbiter(50, new Vector(300, 0), new Vector(0, -500)))

        for(let i = 0; i < 2*Math.PI; i+=2*Math.PI/10){
            let startPosition = new Vector(200, 0).setAngle(i);
            let startVelocity = new Vector(0, 250).setAngle(i + Math.PI/2);
            new Planet(12, new Orbiter(20, startPosition, startVelocity))
        }
        
        this.camera.setTarget(centralPlanet)
    }

    update(){
        super.update();
        
        for(let i of this.physicsObjects) i.update();
        for(let i of this.colliders) i.update();
    }

    updateImages(){
        super.updateImages();
        background(255);

        for(let i of this.imageObjects) {
            for(let j of i){
                j.updateImage();
            }
        }
    }
}
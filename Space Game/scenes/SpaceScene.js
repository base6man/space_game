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

        new Orbiter(new Vector(300, 0), new Vector(150, -150))
        new Planet(100),
        new Planet(50, new Orbiter(new Vector(-200, 300), new Vector(250, 0)))

        //new Planet(20, new Orbiter(new Vector(300, 0), new Vector(150, -150)))
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
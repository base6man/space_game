
let _width;
let _height;

let stars = [];
let planets = []

let friction = 1;
let gMult = 100;
let timeScale = 0.1;
let steps = 2;
let timeElapsed = timeScale / steps;

let starSize = 10

let inp;
let camera;

let stopUpdates = false
let numCollisions = 0

function isNumber(num){
  return num >= 0 || num < 0
}

function setup() {
  _width = windowWidth;
  _height = windowHeight;
  createCanvas(_width, _height);

  beegPlanets();

  camera = new Camera(planets[0])
    
  for(i = 0; i < 50000; i++){
    
    let red = 255;
    let blue = random(100, 255);
    let green = random(blue, 255);
    let alpha = 255;
    
    const star = {
      xPos: random(-100000, 100000),
      yPos: random(-100000, 100000),
      size: Math.pow(2, random(1, 6)),
      color: color(red, green, blue, alpha)
    }
    
    stars.push(star);    
  }
  
  inp = createInput(timeScale.toString());
  inp.position(0, 0);
}

function draw() {
  if(stopUpdates) return
  background(0);
  
  //let tempEarthVel = {
  //  x: earth.xVel, y: earth.yVel
  //}
  
  for(let i = 0; i < steps; i++){
    for(let j = 0; j < planets.length; j++){
    
      planets[j].update()
    }
  }
  
  camera.update()
  //getInput(tempEarthVel.x - earth.xVel, tempEarthVel.y - earth.yVel);

  strokeWeight(starSize * camera.zoom);
  stroke('white');
  let tempDist;
  if(width > height){
    tempDist = width / camera.zoom;
  }
  else{
    tempDist = height / camera.zoom;
  }
  for(let i = 0; i < stars.length; i++){
    
    if(Math.pow(stars[i].xPos - camera.position.x, 2) +
      Math.pow(stars[i].yPos - camera.position.y, 2) < Math.pow(tempDist, 2)){
      
      drawWithRot((stars[i].xPos-camera.position.x) * camera.zoom, 
                  (stars[i].yPos-camera.position.y) * camera.zoom);
    }
  }
  
  for(let i = planets.length-1; i >= 0; i--){
    
    stroke(planets[i].color);
    strokeWeight(planets[i].size * camera.zoom);
    
    if(planets[i].isEarth){
      //point(width/2, height/2)
    }

    drawWithRot((planets[i].position.x - camera.position.x) * camera.zoom, 
                (planets[i].position.y - camera.position.y) * camera.zoom);
  }
  
}
/*
function planetsBounce(i, j, d){
  
  planets[i].x = 
    0.5*(planets[i].x + planets[j].x) + 
    planets[i].size/2 * (planets[i].x - planets[j].x) / d; 
  planets[i].y = 
    0.5*(planets[i].y + planets[j].y) + 
    planets[i].size/2 * (planets[i].y - planets[j].y) / d; 
  planets[j].x = 
    0.5*(planets[i].x + planets[j].x) + 
    planets[j].size/2 * (planets[j].x - planets[i].x) / d; 
  planets[j].y = 
    0.5*(planets[i].y + planets[j].y) + 
    planets[j].size/2 * (planets[j].y - planets[i].y) / d;
  
  let nx = (planets[j].xPos - planets[i].xPos) / d; 
  let ny = (planets[j].yPos - planets[i].yPos) / d; 

  let p = 2 * (planets[i].xVel * nx + planets[i].yVel * ny - 
               planets[j].xVel * nx - planets[j].yVel * ny) /   
               (planets[i].mass + planets[j].mass); 
  
  planets[i].xVel = planets[i].xVel - p * planets[j].mass * nx * 0.99; 
  planets[i].yVel = planets[i].yVel - p * planets[j].mass * ny * 0.99; 
  planets[j].xVel = planets[j].xVel + p * planets[i].mass * nx * 0.99; 
  planets[j].yVel = planets[j].yVel + p * planets[i].mass * ny * 0.99;
  
        
  planets[i].xPos += planets[i].xVel * t;
  planets[i].yPos += planets[i].yVel * t;
  planets[j].xPos += planets[j].xVel * t;
  planets[j].yPos += planets[j].yVel * t;
 
  if(Math.abs(planets[i].xVel - planets[j].xVel) < 100 &&
     Math.abs(planets[i].yVel - planets[j].yVel) < 100){
    if(planets[i] == earth){
      planets[i].xVel = planets[j].xVel;
      planets[i].yVel = planets[j].yVel;
    }
    else if (planets[j] == earth){
      planets[j].xVel = planets[i].xVel;
      planets[j].yVel = planets[i].yVel;
    }
    else{
      let tempxVel = planets[i].xVel;
      let tempyVel = planets[i].yVel;
      planets[i].xVel += 2*(planets[j].xVel - planets[i].xVel);
      planets[i].yVel += 2*(planets[j].yVel - planets[i].yVel);
      planets[j].xVel += 2*(tempxVel - planets[j].xVel);
      planets[j].yVel += 2*(tempyVel - planets[j].yVel);
    }
  }
}
*/
function drawWithRot(inputX, inputY){
  
  //Thomas leaves his mark on the project
  let x = inputX - width/2;
  let y = inputY - height/2;
  
  let l = Math.sqrt(x*x + y*y);
  
  let theta;
  if (x<0) { theta = -camera.rotation - PI - Math.atan(y/x); }
  else{ theta = -camera.rotation - Math.atan(y/x); }
  
  let x2 = l * Math.cos(theta);
  let y2 = l * Math.sin(theta);
  
  point(x2 + width/2, y2 + height/2);
  
}

function getInput(accelerationX, accelerationY){
  
  /*
  //Attaching a jetpack to one of the celestial bodies
  let jetpackPower = 40 * inp.value();
  if(keyIsDown(LEFT_ARROW)){
    earth.xVel -= jetpackPower * cos(-camera.rotation);
    earth.yVel -= jetpackPower * sin(-camera.rotation);
  }
  if(keyIsDown(RIGHT_ARROW)){
    earth.xVel += jetpackPower * cos(-camera.rotation);
    earth.yVel += jetpackPower * sin(-camera.rotation);
  }
  if(keyIsDown(DOWN_ARROW)){
    earth.xVel -= jetpackPower * sin(camera.rotation);
    earth.yVel -= jetpackPower * cos(camera.rotation);
  }
  if(keyIsDown(UP_ARROW)){
    earth.xVel += jetpackPower * sin(camera.rotation);
    earth.yVel += jetpackPower * cos(camera.rotation);
  }
  
  if(keyIsDown(83)){
    
    let tempX = camera.position.x + width / camera.zoom / 2;
    let tempY = camera.position.y + height / camera.zoom / 2;
    
    camera.zoom *= 0.99;
    
    camera.position.x = tempX - width / camera.zoom / 2;
    camera.position.y = tempY - height / camera.zoom / 2;
  }
  if(keyIsDown(87)){
    
    let tempX = camera.position.x + width / camera.zoom / 2;
    let tempY = camera.position.y + height / camera.zoom / 2;
    
    camera.zoom *= 1.01;
    
    camera.position.x = tempX - width / camera.zoom / 2;
    camera.position.y = tempY - height / camera.zoom / 2;
  }
  */
  
  /*
  tempRot = Math.atan2(accelerationX, accelerationY);
  
  if(tempRot >= 0 || tempRot < 0){
    
    if(Math.abs(camera.rotation - tempRot) > PI){
      if(camera.rotation > tempRot){
        camera.rotation -= 2*PI;
      }
      else{
        tempRot -= 2*PI;
      }
    }
    
    camera.rotation = (camera.rotation + (tempRot / 30)) / 1.033;
    
  }
  */
  inp.input(ChangeTimeScale);
}

function ChangeTimeScale(){
  
  let value = this.value();
  
  if(
    (value > 0 && value < 1000) || (value < 0 && value > -1000)){
    
    timeScale = value;
    timeElapsed = timeScale / steps;
    
    console.log("Changing!");
  }
  
  console.log(value);
}

function earthMars(){
  
  
const planet1 = Object.assign({}, planetTemplate);
planet1.xPos = 700; planet1.yPos = 0;
planet1.xVel = 0; planet1.yVel = 120;
planet1.mass = 20; planet1.size = 60;
planet1.color = 'brown';
planets.push(planet1);
  
const sun1 = Object.assign({}, planetTemplate);
sun1.xPos = 0; sun1.yPos = 0;
sun1.xVel = 0; sun1.yVel = 0;
sun1.mass = 100; sun1.size = 400;
sun1.color = 'white';
planets.push(sun1);

const moon1 = Object.assign({}, planetTemplate);
moon1.xPos = 700; moon1.yPos = -60;
moon1.xVel = 45; moon1.yVel = 100;
moon1.mass = 1; moon1.size = 20;
moon1.color = 'brown';
planets.push(moon1);

const planet2 = Object.assign({}, planetTemplate);
planet2.xPos = 1700; planet2.yPos = 0;
planet2.xVel = 0; planet2.yVel = -110;
planet2.mass = 30; planet2.size = 100;
planet2.color = 'red';
planets.push(planet2);
}

function quadPlanets(){
  
  
const planet1 = Object.assign({}, planetTemplate);
planet1.xPos = 1200; planet1.yPos = 1200;
planet1.xVel = 80; planet1.yVel = -80;
planet1.mass = 55; planet1.size = 100;
planet1.color = 'green';
planets.push(planet1);
  
const planet2 = Object.assign({}, planetTemplate);
planet2.xPos = -1200; planet2.yPos = 1200;
planet2.xVel = 80; planet2.yVel = 80;
planet2.mass = 55; planet2.size = 100;
planet2.color = 'green';
planets.push(planet2);
  
const planet3 = Object.assign({}, planetTemplate);
planet3.xPos = -1200; planet3.yPos = -1200;
planet3.xVel = -80; planet3.yVel = 80;
planet3.mass = 55; planet3.size = 100;
planet3.color = 'green';
planets.push(planet3);
  
const planet4 = Object.assign({}, planetTemplate);
planet4.xPos = 1200; planet4.yPos = -1200;
planet4.xVel = -80; planet4.yVel = -80;
planet4.mass = 55; planet4.size = 100;
planet4.color = 'green';
planets.push(planet4);
}

function twinSuns(){
  
  const planet1 = new Planet(new Vector(0, 0), new Vector(0, 0), 1, 40, 'green')
  const planet2 = new Planet(new Vector(3000, 240), new Vector(0, 140), 1, 70, 'brown')
    
  const sun1 = new Planet(new Vector(400, 0), new Vector(0, -90), 100, 120, 'yellow')
  const sun2 = new Planet(new Vector(-400, 0), new Vector(0, 90), 100, 120, 'white')
}

function beegPlanets(){
  const planet = new Planet(new Vector(0, 5000), new Vector(100, 0), 10, 40, 'green')

  const sun = new Planet(new Vector(0, 0), new Vector(0, 0), 1200, 4000, 'white')

  const planet1 = new Planet(new Vector(0, 12000), new Vector(-500, 0), 200, 1200, 'brown')
  const planet2 = new Planet(new Vector(5000, 0),  new Vector(0, 300),  200, 1200, 'red')
}













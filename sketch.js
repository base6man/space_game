let time;
let isFirstFrame = true;
const GLOBAL_TIMESCALE = 1.0;
const STEPS = 10;

const GRAVITY_MULTIPLIER = 1000;

let stopUpdates = false;
let isInScene = true;

let currentScene;

let frameNumber = 1;

// Various stuff you shouldn't need to worry about
// Includes gamepad support and math functions
{
  var gamepadAPI = {
    controller: {},
    connected: false,
    connect: function(evt) {
      gamepadAPI.controller = evt.gamepad;
      gamepadAPI.connected = true;
      userStartAudio();
    },
    disconnect: function(evt) {
      gamepadAPI.connected = false;
      delete gamepadAPI.controller;
    },
    update: function() {
      // clear the buttons cache
      gamepadAPI.buttonsCache = [];
      // move the buttons status from the previous frame to the cache
      for(var k=0; k<gamepadAPI.buttonsStatus.length; k++) {
        gamepadAPI.buttonsCache[k] = gamepadAPI.buttonsStatus[k];
      }
      // clear the buttons status
      gamepadAPI.buttonsStatus = [];
      // get the gamepad object
      var c = gamepadAPI.controller || {};
      c = navigator.getGamepads()[c.index];
    
      // loop through buttons and push the pressed ones to the array
      var pressed = [];
      if(c.buttons) {
        for(var b=0,t=c.buttons.length; b<t; b++) {
          if(c.buttons[b].pressed) {
            pressed.push(gamepadAPI.buttons[b]);
          }
        }
      }
      // loop through axes and push their values to the array
      var axes = [];
      if(c.axes) {
        for(var a=0,x=c.axes.length; a<x; a++) {
          axes.push(c.axes[a].toFixed(2));
        }
      }
      // assign received values
      gamepadAPI.axesStatus = axes;
      gamepadAPI.buttonsStatus = pressed;
      gamepadAPI.controller = c;
      // return buttons for debugging purposes
      return pressed;
    },
    buttonPressed: function(button, hold) {
      var newPress = false;
      // loop through pressed buttons
      for(var i=0,s=gamepadAPI.buttonsStatus.length; i<s; i++) {
        // if we found the button we're looking for...
        if(gamepadAPI.buttonsStatus[i] == button) {
          // set the boolean variable to true
          newPress = true;
          // if we want to check the single press
          if(!hold) {
            // loop through the cached states from the previous frame
            for(var j=0,p=gamepadAPI.buttonsCache.length; j<p; j++) {
              // if the button was already pressed, ignore new press
              if(gamepadAPI.buttonsCache[j] == button) {
                newPress = false;
              }
            }
          }
        }
      }
      return newPress;
    },
    buttons: [
      'A', 'B', 'X', 'Y',
      'LB', 'RB', 'LT', 'RT',
      'Start', 'Options', 
      'L3', 'R3',
      'Dpad_Up', 'Dpad_Down', 'Dpad_Left', 'Dpad_Right'
    ],
    buttonsCache: [],
    buttonsStatus: [],
    axesStatus: []
  };
  
  window.addEventListener("gamepadconnected", gamepadAPI.connect);
  window.addEventListener("gamepaddisconnected", gamepadAPI.disconnect);
  
  
  function isBetween(num, a, b) {
    var min = Math.min.apply(Math, [a, b]);
    var max = Math.max.apply(Math, [a, b]);
    return num > min && num < max;
  };
  
  function isBetweenInclusive(num, a, b) {
    var min = Math.min.apply(Math, [a, b]);
    var max = Math.max.apply(Math, [a, b]);
    return num >= min && num <= max;
  }
  
  function includesKeyword(array, keyword){
    for(i in array){
      if(keyword.test(array[i])) {return true; }
    }
    return false;
  }
  
  function isNumber(num){
    return (num > 0 || num <= 0) && typeof num == 'number';
  }
  
  function isRealNumber(num){
    return typeof num == 'number' && (num < 0 || num >= 0) && (num != Infinity || num != -Infinity);
  }
  
  function randRange(min, max){
    return Math.random() * (max - min) + min;
  }
  function randRangeInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  time = new Time();

  currentScene = new SpaceScene();
  currentScene.setup();
}

function draw() {
  if(stopUpdates) return

  let startTime = new Date();

  if(!isInScene){
    betweenSceneFunction();
    return;
  }

  for(let i = 0; i < STEPS; i++){
    time.update();
    currentScene.update();
  }
  currentScene.updateImages();
  currentScene.checkForSceneEnd();
  
  let endTime = new Date();
  //console.log(endTime - startTime)
}

function endScene(){
  isInScene = false;
  currentScene = null;
  planets = []
  cutsceneRuntime = 0;
  sceneNumber++

  noStroke();
  fill('white')
  textAlign(CENTER, CENTER);

  background(0)
}
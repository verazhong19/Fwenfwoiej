const serial = new p5.WebSerial();
let portButton;
let debug;


const canvas = document.getElementById("myCanvas");
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight
});
const texture = PIXI.Texture.from('assets/_floor.png');
const baseLayer = PIXI.Texture.from('assets/_base.png');
const _spill = PIXI.Texture.from('assets/_spill.png');
const _bed = PIXI.Texture.from('assets/_bed.png');
const _desk = PIXI.Texture.from('assets/_desk.png');
const _dresser = PIXI.Texture.from('assets/_drawer.png');
const floor = new PIXI.Sprite(texture);
const base = new PIXI.Sprite(baseLayer);
const d_floor = new PIXI.Sprite(texture);
const d_base = new PIXI.Sprite(baseLayer);
const bed = new PIXI.Sprite(_bed);
const dresser = new PIXI.Sprite(_dresser);
const desk = new PIXI.Sprite(_desk);
const baseBed = new PIXI.Sprite(_bed);
const baseDresser = new PIXI.Sprite(_dresser);
const baseDesk = new PIXI.Sprite(_desk);
const spill = new PIXI.Sprite(_spill);

document.body.appendChild(app.view);

floor.x = app.renderer.width / 2;
floor.y = app.renderer.height / 2;
floor.anchor.x = 0.5;
floor.anchor.y = 0.5;
floor.scale.x = 0.28;
floor.scale.y = 0.28;

base.x = app.renderer.width / 2;
base.y = app.renderer.height / 2;
base.anchor.x = 0.5;
base.anchor.y = 0.5;
base.scale.x = 0.28;
base.scale.y = 0.28;

d_floor.x = app.renderer.width / 2;
d_floor.y = app.renderer.height / 2;
d_floor.anchor.x = 0.5;
d_floor.anchor.y = 0.5;
d_floor.scale.x = 0.28;
d_floor.scale.y = 0.28;

d_base.x = app.renderer.width / 2;
d_base.y = app.renderer.height / 2;
d_base.anchor.x = 0.5;
d_base.anchor.y = 0.5;
d_base.scale.x = 0.28;
d_base.scale.y = 0.28;

spill.x = app.renderer.width / 2;
spill.x = spill.x - 300;
spill.y = app.renderer.height / 2;
spill.y = spill.y - 300;
spill.anchor.x = 0.5;
spill.anchor.y = 0.5;
spill.scale.x = 0;
spill.scale.y = 0;
spill.alpha = 0;

bed.x = app.renderer.width / 2;
bed.y = app.renderer.height / 2;
bed.anchor.x = 0.5;
bed.anchor.y = 0.5;
bed.scale.x = 0.28;
bed.scale.y = 0.28;

dresser.x = app.renderer.width / 2;
dresser.y = app.renderer.height / 2;
dresser.anchor.x = 0.5;
dresser.anchor.y = 0.5;
dresser.scale.x = 0.28;
dresser.scale.y = 0.28;

desk.x = app.renderer.width / 2;
desk.y = app.renderer.height / 2;
desk.anchor.x = 0.5;
desk.anchor.y = 0.5;
desk.scale.x = 0.28;
desk.scale.y = 0.28;

baseDesk.x = app.renderer.width / 2;
baseDesk.y = app.renderer.height / 2;
baseDesk.anchor.x = 0.5;
baseDesk.anchor.y = 0.5;
baseDesk.scale.x = 0.28;
baseDesk.scale.y = 0.28;

baseBed.x = app.renderer.width / 2;
baseBed.y = app.renderer.height / 2;
baseBed.anchor.x = 0.5;
baseBed.anchor.y = 0.5;
baseBed.scale.x = 0.28;
baseBed.scale.y = 0.28;

baseDresser.x = app.renderer.width / 2;
baseDresser.y = app.renderer.height / 2;
baseDresser.anchor.x = 0.5;
baseDresser.anchor.y = 0.5;
baseDresser.scale.x = 0.28;
baseDresser.scale.y = 0.28;

const parentContainer = new PIXI.Container();
app.stage.addChild(parentContainer);

const baseContainer = new PIXI.Container();
const floorContainer = new PIXI.Container();
const floorContainerDupe = new PIXI.Container();
const underContainer = new PIXI.Container();
baseContainer.addChild(underContainer);

floorContainer.addChild(floor);
floorContainer.addChild(base);

//floorContainerDupe.addChild(d_floor);
floorContainerDupe.addChild(d_base);


underContainer.addChild(floorContainer);



baseContainer.addChild(baseBed);
baseContainer.addChild(baseDresser);
baseContainer.addChild(baseDesk);
baseContainer.addChild(spill);
parentContainer.addChild(baseContainer)

const displacementSprite = PIXI.Sprite.from('map_7.png');
const displacementFilter = new PIXI.DisplacementFilter(displacementSprite);
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
displacementSprite.scale.set(1.8)

baseContainer.addChild(displacementSprite);
baseContainer.filters = [displacementFilter]

const staticFloor = new PIXI.Container();
const staticObject = new PIXI.Container();

staticObject.addChild(staticFloor);
parentContainer.addChild(staticObject);



const imgContainer = new PIXI.Container();
imgContainer.alpha = 0;
bed.alpha = 0;
imgContainer.addChild(bed);
staticObject.addChild(imgContainer);

const _imgContainer = new PIXI.Container();
_imgContainer.alpha = 0;
dresser.alpha = 0;
imgContainer.addChild(dresser);
staticObject.addChild(_imgContainer);

const __imgContainer = new PIXI.Container();
__imgContainer.alpha = 0;
desk.alpha = 0;
imgContainer.addChild(desk);
staticObject.addChild(__imgContainer);

const floorReset = new PIXI.Container();
floorReset.alpha = 0;
floorContainerDupe.alpha = 0;
floorReset.addChild(floorContainerDupe);
staticFloor.addChild(floorReset);


let frameCounter = 0;

function animate(delta) {
  let speed = Math.random() * (1 - 0.25) + 0.25;
  let maxOffset = 10;
  let x_offset = Math.sin(delta * speed) * maxOffset;
  let y_offset = Math.sin(delta * speed / 2) * maxOffset;
  displacementSprite.x += x_offset;
  displacementSprite.y += y_offset;
  frameCounter++;
}

sensorVal = '';
let triggerEnd;

let tl = new TimelineMax({
  paused: true
});
tl.to(displacementFilter.scale, 8, {
  x: -150,
  y: -150,
  ease: Expo.easeInOut
});
tl.to(app.view, 0.7, {
  ease: Expo.easeInOut
}, "-=4");

let experienceInProgress = false;
let ended = false;
let reverseStart = false;
let n_floor = false;
let n_drawer = false;
let n_bed = false;
let n_desk = false;

function setupAnimation(container, targetImage, removedItem) {
  let _displacementSprite = PIXI.Sprite.from("map_7.png");
  _displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

  let _displacementFilter = new PIXI.DisplacementFilter(_displacementSprite);

  container.addChild(_displacementSprite);
  container.filters = [_displacementFilter];

  _displacementFilter.scale.x = -3000;
  _displacementFilter.scale.y = -3000;
  _displacementSprite.scale.set(0.6);
  _displacementSprite.anchor.set(0.5);

  var _tl = new TimelineMax({
    paused: true
  });
  _tl.to(_displacementSprite.anchor, 2, {
    y: 0
  });
  _tl.to(_displacementFilter.scale, 2, {
    x: 1,
    y: 1,
    ease: Expo.easeInOut
  });
  _tl.to(_displacementFilter.scale, 2, {
    x: 0,
    y: 0,
    ease: Expo.easeInOut
  }, "-=2");
  _tl.to(container, 2, {
    alpha: 1,
    ease: Expo.easeInOut
  }, "-=2");
  _tl.to(targetImage, 2, {
    alpha: 1,
    ease: Expo.easeInOut
  }, "-=2");

  _tl.add(() => {
    setTimeout(() => baseContainer.removeChild(removedItem), 2000);

  });

  // Play the animation
  _tl.play();


}

let audioTracks = {};
let currentAudio;

function preload() {
  audioTracks.initial = loadSound('assets/audio/tts/tts_1.mp3');
  audioTracks.predistort = loadSound('assets/audio/tts/tts_2.mp3');
  audioTracks.distort = loadSound('assets/audio/tts/tts_3.mp3');
  audioTracks.bed = loadSound('assets/audio/tts/tts_4.mp3');
  audioTracks.book = loadSound('assets/audio/tts/tts_book.mp3');
  audioTracks.drawer = loadSound('assets/audio/tts/tts_drawer.mp3');
  audioTracks.trash = loadSound('assets/audio/tts/tts_trash.mp3');
  audioTracks.final = loadSound('assets/audio/tts/tts_final.mp3');
}

function setup() {
  createCanvas(400, 300);
  allSerialStuff();
}


function draw() {
  //chair off
  if (sensorVal == 'q' && !reverseStart) {
    if (bed.alpha == 0) {
      setupAnimation(imgContainer, bed, baseBed);
      unspill(spill);
      playAudio(sensorVal);
      n_bed = true;
    }


  }
  //drawer
  if (sensorVal == 'w') {
    if (dresser.alpha == 0) {
      setupAnimation(_imgContainer, dresser, baseDresser);
      playAudio(sensorVal);
      n_drawer = true;
    }
  }

  //desk
  if (sensorVal == 'e') {
    if (desk.alpha == 0) {
      setupAnimation(_imgContainer, desk, baseDesk);
      playAudio(sensorVal);
      n_desk = true;
    }
  }
  //chair sit
  if(sensorVal == '1') {
    if (!experienceInProgress) {
      experienceInProgress = true;
      startExperience();
      }
  }
  //floor
  if (sensorVal == 'r') {
    if (floorContainerDupe.alpha == 0) {
      setupAnimation(floorReset, floorContainerDupe, floorContainer);
      playAudio(sensorVal);
      n_floor = true;
    }
  }

  if (n_bed && n_desk && n_drawer && n_floor && !ended || debug) {
    //console.log('cool')
    //playAudio('final');
    setTimeout(() => {audioTracks.final.play();
      tl.reverse();
      setTimeout(() => {
        fadeParentContainer(0);
      }, "10000");}, 7000);
    ended = true;
  }
}


function playAudio(sensorVal) {
  if (currentAudio) {
    // If audio is already playing, stop it
    currentAudio.stop();
  }

  // Check the value of sensorVal and play the corresponding audio
  if (sensorVal === 'q') {
    currentAudio = audioTracks.bed;
  } else if (sensorVal === 'w') {
    currentAudio = audioTracks.drawer;
  }
   else if (sensorVal === 'e') {
    currentAudio = audioTracks.book;
  } else if (sensorVal === 'r') {
    currentAudio = audioTracks.trash;
  }
  else if (sensorVal === 'final') {
    currentAudio = audioTracks.final;
  }

  // Play the new audio
  currentAudio.play();
}

function startExperience() {
  app.ticker.add(animate);
  tl.play();
  transitionSprites(base, spill)
}

function transitionSprites(oldSprite, newSprite) {
  // Delay the animation by 30 seconds (30000 milliseconds)
  setTimeout(() => {

    if (experienceInProgress && sensorVal != 'e') {
      // Create a timeline
      let tl = new TimelineMax();
      tl.add([
        TweenMax.to(newSprite, 7, {
          alpha: 1,
          ease: Expo.easeIn
        }, "+=3"),
        TweenMax.to(newSprite, 15, {
          x: newSprite.x + 300,
          y: newSprite.y + 300,
          ease: Expo.easeOut
        }),
        TweenMax.to(newSprite.scale, 15, {
          x: 0.28,
          y: 0.28
        })
      ]);
      tl.play();
    }

  }, 5000); // 30000 milliseconds = 30 seconds
}

function unspill(newSprite) {
  //console.log('123')
  reverseStart = true;
  // Create a timeline
  let _tl = new TimelineMax();
  _tl.add([
    TweenMax.to(newSprite, 2, {
      alpha: 0,
      ease: Expo.easeIn
    }),
  ]);

  _tl.play();
}

function fadeParentContainer(value) {
  // Create a timeline
  let fadeout = new TimelineMax();
  fadeout.add([
    TweenMax.to(parentContainer, 3, {alpha: value}),
]);
  fadeout.play();
}


function serialEvent() {
  // read a string from the serial port:
  var inString = serial.readLine();
  console.log(inString);
  sensorVal = inString;
  // check to see that there's actually a string there:
  //   if (inString) {
  //   // convert it to a number:
  //   inData = Number(inString);
  //   }
}

function allSerialStuff() {
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:
  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
  // add serial connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
}
// if there's no port selected,
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  if (portButton) portButton.show();
  serial.requestPort();
}

// open the selected port, and make the port
// button invisible:
// open the selected port, and make the port
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}
// read any incoming data as a string
// (assumes a newline at the end of it):

// try to connect if a new serial port
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
}

function closePort() {
  serial.close();
}
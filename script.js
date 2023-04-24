const serial = new p5.WebSerial();
let portButton;

const canvas = document.getElementById("myCanvas");
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
});
const texture = PIXI.Texture.from('bedroom.jpg');
const _bedroom = PIXI.Texture.from('_bedroom_b.png');
const _bedroom_desk = PIXI.Texture.from('_bedroom_desk.png');
const _bedroom_dresser = PIXI.Texture.from('_bedroom_dresser.png');
const img = new PIXI.Sprite(texture);
const _img = new PIXI.Sprite(_bedroom);
const __img = new PIXI.Sprite(_bedroom_desk);
const ___img = new PIXI.Sprite(_bedroom_dresser);

document.body.appendChild(app.view);

img.x = app.renderer.width / 2;
img.y = app.renderer.height / 2;
img.anchor.x = 0.5;
img.anchor.y = 0.5;
img.scale.x = 0.28;
img.scale.y = 0.28;


_img.x = app.renderer.width / 2;
_img.y = app.renderer.height / 2;
_img.anchor.x = 0.5;
_img.anchor.y = 0.5;
_img.scale.x = 0.28;
_img.scale.y = 0.28;

__img.x = app.renderer.width / 2;
__img.y = app.renderer.height / 2;
__img.anchor.x = 0.5;
__img.anchor.y = 0.5;
__img.scale.x = 0.28;
__img.scale.y = 0.28;

___img.x = app.renderer.width / 2;
___img.y = app.renderer.height / 2;
___img.anchor.x = 0.5;
___img.anchor.y = 0.5;
___img.scale.x = 0.28;
___img.scale.y = 0.28;

const parentContainer = new PIXI.Container();
app.stage.addChild(parentContainer);

const baseContainer = new PIXI.Container();
baseContainer.addChild(img);
parentContainer.addChild(baseContainer)
//app.stage.addChild(img);


const displacementSprite = PIXI.Sprite.from('map_7.png');
const displacementFilter = new PIXI.DisplacementFilter(displacementSprite);
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
displacementSprite.scale.set(1.8)

baseContainer.addChild(displacementSprite);
baseContainer.filters = [displacementFilter]

parentContainer.addChild(__img);

const imgContainer = new PIXI.Container();
imgContainer.alpha = 0;
_img.alpha = 0;
imgContainer.addChild(_img);
parentContainer.addChild(imgContainer);

let frameCounter = 0;
function animate(delta) {
    let speed = Math.random()*(1-0.25)+0.25;
    let maxOffset = 10;
    let x_offset = Math.sin(delta * speed) * maxOffset;
    let y_offset = Math.sin(delta * speed/2) * maxOffset;
    displacementSprite.x += x_offset;
    displacementSprite.y += y_offset;
    // if (frameCounter % 9 === 0) {
    //     displacementSprite.scale._x=Math.random()*(10-0.25)+0.25;
    //     displacementSprite.scale._y=Math.random()*(1-0.25)+0.25;
    //   }
    
    
      frameCounter++;
}

sensorVal = ''

let tl = new TimelineMax({ paused: true });
tl.to(displacementFilter.scale, 8, { x: -150, y: -150, ease: Expo.easeInOut });
tl.to(app.view, 0.7, { ease: Expo.easeInOut }, "-=4");

//tl.play();

let experienceInProgress = false;

function setupAnimation(container, targetImage) {
    let _displacementSprite = PIXI.Sprite.from("map_7.png");
    _displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

    let _displacementFilter = new PIXI.DisplacementFilter(_displacementSprite);

    container.addChild(_displacementSprite);
    container.filters = [_displacementFilter];

    _displacementFilter.scale.x = -3000;
    _displacementFilter.scale.y = -3000;
    _displacementSprite.scale.set(0.6);
    _displacementSprite.anchor.set(0.5);

    var _tl = new TimelineMax({ paused: true });
    _tl.to(_displacementSprite.anchor, 2, { y: 0 });
    _tl.to(_displacementFilter.scale, 2, { x: 1, y: 1, ease: Expo.easeInOut });
    _tl.to(_displacementFilter.scale, 2, { x: 0, y: 0, ease: Expo.easeInOut }, "-=2");
    _tl.to(container, 2, { alpha: 1, ease: Expo.easeInOut }, "-=2");
    _tl.to(targetImage, 2, { alpha: 1, ease: Expo.easeInOut }, "-=2");

    // Play the animation
    _tl.play();
}


function setup() {
    createCanvas(400, 300);
    allSerialStuff();
  }


function draw() {
    if (sensorVal == 'q') {
        if(_img.alpha == 0){
            setupAnimation(imgContainer, _img);
        }
        
        
    }
    if (sensorVal == 'w') {
        parentContainer.addChild(___img);
        
    }
    if (sensorVal == '1' && !experienceInProgress) {
        startExperience();
        experienceInProgress = true;
    }
}

function debugSensor() {
    sensorVal = 'q'
}

function startExperience() {
    app.ticker.add(animate);
    tl.play();
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
  
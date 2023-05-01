const serial = new p5.WebSerial();
let portButton;

const canvas = document.getElementById("myCanvas");
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
});
const texture = PIXI.Texture.from('assets/floor.png');
const baseLayer = PIXI.Texture.from('assets/base.png');
const _bed = PIXI.Texture.from('assets/bed.png');
const _bedroom_desk = PIXI.Texture.from('_bedroom_desk.png');
const _dresser = PIXI.Texture.from('assets/dresser.png');
const floor = new PIXI.Sprite(texture);
const base = new PIXI.Sprite(baseLayer);
const bed = new PIXI.Sprite(_bed);
const dresser = new PIXI.Sprite(_dresser);
const baseBed = new PIXI.Sprite(_bed);
const baseDresser = new PIXI.Sprite(_dresser);

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
baseContainer.addChild(floor);
baseContainer.addChild(base);
baseContainer.addChild(baseBed);
baseContainer.addChild(baseDresser);
parentContainer.addChild(baseContainer)
//app.stage.addChild(img);


const displacementSprite = PIXI.Sprite.from('map_7.png');
const displacementFilter = new PIXI.DisplacementFilter(displacementSprite);
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
displacementSprite.scale.set(1.8)

baseContainer.addChild(displacementSprite);
baseContainer.filters = [displacementFilter]


const imgContainer = new PIXI.Container();
imgContainer.alpha = 0;
bed.alpha = 0;
imgContainer.addChild(bed);
parentContainer.addChild(imgContainer);

const _imgContainer = new PIXI.Container();
_imgContainer.alpha = 0;
dresser.alpha = 0;
imgContainer.addChild(dresser);
parentContainer.addChild(_imgContainer);

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

    var _tl = new TimelineMax({ paused: true });
    _tl.to(_displacementSprite.anchor, 2, { y: 0 });
    _tl.to(_displacementFilter.scale, 2, { x: 1, y: 1, ease: Expo.easeInOut });
    _tl.to(_displacementFilter.scale, 2, { x: 0, y: 0, ease: Expo.easeInOut }, "-=2");
    _tl.to(container, 2, { alpha: 1, ease: Expo.easeInOut }, "-=2");
    _tl.to(targetImage, 2, { alpha: 1, ease: Expo.easeInOut }, "-=2");

    _tl.add(() => {
          setTimeout( () => baseContainer.removeChild(removedItem), 2000 );
          
  });

    // Play the animation
    _tl.play();


}


function setup() {
    createCanvas(400, 300);
    allSerialStuff();
  }


function draw() {
    if (sensorVal == 'q') {
        if(bed.alpha == 0){
            setupAnimation(imgContainer, bed, baseBed);
            //baseContainer.removeChild(baseBed);
        }
        
        
    }
    if (sensorVal == 'w') {
        //parentContainer.addChild(___img);
        if(dresser.alpha == 0){
          setupAnimation(_imgContainer, dresser, baseDresser);
      }        
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
  
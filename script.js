const canvas = document.getElementById("myCanvas");
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
});
const texture = PIXI.Texture.from('bedroom.jpg');
const img = new PIXI.Sprite(texture);

document.body.appendChild(app.view);

img.x = app.renderer.width / 2;
img.y = app.renderer.height / 2;
img.anchor.x = 0.5;
img.anchor.y = 0.5;
img.scale.x = 0.28;
img.scale.y = 0.28;

app.stage.addChild(img);


const displacementSprite = PIXI.Sprite.from('map_7.png');
const displacementFilter = new PIXI.DisplacementFilter(displacementSprite);
displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
displacementSprite.scale.set(1.8)


app.stage.addChild(displacementSprite);
app.stage.filters = [displacementFilter];

app.ticker.add(animate);

let frameCounter = 0;
function animate(delta) {
    let speed = Math.random()*(1-0.25)+0.25;
    let maxOffset = 10;
    let x_offset = Math.sin(delta * speed) * maxOffset;
    let y_offset = Math.sin(delta * speed) * 5;
    displacementSprite.x += x_offset;
    displacementSprite.y += y_offset;
    if (frameCounter % 9 === 0) {
        displacementSprite.scale._x=Math.random()*(10-0.25)+0.25;
        displacementSprite.scale._y=Math.random()*(1-0.25)+0.25;
      }
    
      frameCounter++;
}


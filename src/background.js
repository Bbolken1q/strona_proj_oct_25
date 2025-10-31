import * as PIXI from 'pixi.js'

PIXI.extensions.add(PIXI.ResizePlugin);

function easeInSine(x) {
  return 1 - Math.cos((x * Math.PI) / 2);

}

var time = new Date().getTime();

let backgrounds = [
  "background1.png",
  "background2.png",
  "background3.png",
  "background4.png",
]

let bg_image_path = "src/assets/" + backgrounds[Math.floor(Math.random()*backgrounds.length)]


const app = new PIXI.Application();

await app.init({ background: '#000000ff', resizeTo: document.getElementById('body') });

app.canvas.className = "background"
document.body.appendChild(app.canvas);

let sprite = new PIXI.Sprite(await PIXI.Assets.load({ src: bg_image_path }));
sprite.anchor.set(0);

function resizeSprite() {
    sprite.width = app.screen.width;
    sprite.height = app.screen.height;
}

app.stage.addChild(sprite);

resizeSprite()

window.addEventListener('resize', () => {
    app.renderer.resize(app.canvas.clientWidth, app.canvas.clientHeight);
    resizeSprite()
    console.log("resized sprite")
});

// setInterval(() => {
//   console.log(Math.max(3, parseInt( (Math.min(1, easeInSine((new Date().getTime() - time)/1000)))*7 )));
// }, 100)


const vertex = /*glsl*/`
  in vec2 aPosition;
  out vec2 vTextureCoord;

  uniform vec4 uInputSize;
  uniform vec4 uOutputFrame;
  uniform vec4 uOutputTexture;

  vec4 filterVertexPosition( void )
  {
      vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;

      position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
      position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

      return vec4(position, 0.0, 1.0);
  }

  vec2 filterTextureCoord( void )
  {
      return aPosition * (uOutputFrame.zw * uInputSize.zw);
  }

  void main(void)
  {
      gl_Position = filterVertexPosition();
      vTextureCoord = filterTextureCoord();
  }
`;

const fragment = /*glsl*/`
  in vec2 vTextureCoord;
  in vec4 vColor;

  uniform sampler2D uTexture;
  uniform int uPixelSize;
  
  
  uniform int uScreenHeight;
  uniform int uScreenWidth;

  uniform int uColorChannelCount;

  int toPixelSpace(float coordinate, int dimension) {
    return int(coordinate * float(dimension));
  }

  void main(void)
  {
    int channelNumber = 256 / uColorChannelCount;

    
    vec2 uvs = vec2(
      float((toPixelSpace(vTextureCoord.x, uScreenWidth)/uPixelSize)*uPixelSize) / float(uScreenWidth),
      float((toPixelSpace(vTextureCoord.y, uScreenHeight)/uPixelSize)*uPixelSize) / float(uScreenHeight)
    );

    float channelRed = 0.0;
    float channelGreen = 0.0;
    float channelBlue = 0.0;

    for(int x = -6; x <= 6; x++) {
      for(int y = -6; y <= 6; y++) {
        vec4 texture = texture2D(uTexture, 
                                            vec2(
                                              float((toPixelSpace(vTextureCoord.x, uScreenWidth) + x)) / float(uScreenWidth),
                                              float((toPixelSpace(vTextureCoord.y, uScreenHeight) + y)) / float(uScreenHeight)
                                            ));
        channelRed = channelRed + texture.x;
        channelGreen = channelGreen + texture.y;
        channelBlue = channelBlue + texture.z;
      }
    }

    channelRed = channelRed / 169.0;
    channelGreen = channelGreen / 169.0;
    channelBlue = channelBlue / 169.0;
    
    vec4 fg = vec4(channelRed, channelGreen, channelBlue, 1.0);
    // vec4 fg = vec4(channelRed, channelRed, channelRed, 1.0);

    fg.x = float((int(fg.x * 256.0) / channelNumber) * channelNumber) / 256.0;
    fg.y = float((int(fg.y * 256.0) / channelNumber) * channelNumber) / 256.0;
    fg.z = float((int(fg.z * 256.0) / channelNumber) * channelNumber) / 256.0;

    gl_FragColor = fg * vec4(0.6, 0.6, 0.6, 1);
    // gl_FragColor = fg;
    
  }
`;

const customFilter = new PIXI.Filter({
  glProgram: new PIXI.GlProgram({
    fragment,
    vertex,
  }),
  resources: {
    configUniforms: {
        uPixelSize: {value: 5, type: 'i32'},
        uColorChannelCount: {value: 7, type: 'i32'},
        uScreenWidth: {value: sprite.width, type: 'i32'},
        uScreenHeight: {value: sprite.height, type: 'i32'}
    }
  },
});

// Apply the filter
sprite.filters = [customFilter];
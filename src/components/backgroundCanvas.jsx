import { useEffect } from "react";
import * as PIXI from "pixi.js";

import bg1 from "../assets/background1.png";
import bg2 from "../assets/background2.png";
import bg3 from "../assets/background3.png";
import bg4 from "../assets/background4.png";

export default function BackgroundCanvas() {
  useEffect(() => {
    const backgrounds = [bg1, bg2, bg3, bg4];
    const bg_image_path =
      backgrounds[Math.floor(Math.random() * backgrounds.length)];

    const body = document.getElementById("body");
    if (!body) return;

    let app;
    let sprite;

    async function initPixi() {
      PIXI.extensions.add(PIXI.ResizePlugin);

      app = new PIXI.Application();
      await app.init({
        background: "#000000ff",
        resizeTo: body,
      });

      app.canvas.className = "background";
      body.appendChild(app.canvas);

      sprite = new PIXI.Sprite(await PIXI.Assets.load(bg_image_path));
      sprite.anchor.set(0);
      app.stage.addChild(sprite);

      function resizeSprite() {
        sprite.width = app.screen.width;
        sprite.height = app.screen.height;
      }

      resizeSprite();

      window.addEventListener("resize", resizeSprite);

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
        channelRed += texture.x;
        channelGreen += texture.y;
        channelBlue += texture.z;
      }
    }

    channelRed /= 169.0;
    channelGreen /= 169.0;
    channelBlue /= 169.0;

    vec4 fg = vec4(channelRed, channelGreen, channelBlue, 1.0);

    fg.x = float((int(fg.x * 256.0) / channelNumber) * channelNumber) / 256.0;
    fg.y = float((int(fg.y * 256.0) / channelNumber) * channelNumber) / 256.0;
    fg.z = float((int(fg.z * 256.0) / channelNumber) * channelNumber) / 256.0;

    gl_FragColor = fg * vec4(0.6, 0.6, 0.6, 1);
  }
`;

      const customFilter = new PIXI.Filter({
        glProgram: new PIXI.GlProgram({
          fragment,
          vertex,
        }),
        resources: {
          configUniforms: {
            uPixelSize: { value: 5, type: "i32" },
            uColorChannelCount: { value: 7, type: "i32" },
            uScreenWidth: { value: sprite.width, type: "i32" },
            uScreenHeight: { value: sprite.height, type: "i32" },
          },
        },
      });

      sprite.filters = [customFilter];
    }

    initPixi();

    return () => {
      if (app) {
        app.destroy(true, { children: true, texture: true, baseTexture: true });
      }
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return null;
}

export { BackgroundCanvas }
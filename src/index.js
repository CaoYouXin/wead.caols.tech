import { WEAD, PlaneGeometry, CurtainGeometry } from './wead';
import { generateTexture } from './wead/texture';
import texVertexShaderSource from './glsl/texture/vertex.glsl';
import texFragmentShaderSource from './glsl/texture/fragment.glsl';
import curtainVertexShaderSource from './glsl/curtain/vertex.glsl';
import curtainFragmentShaderSource from './glsl/curtain/fragment.glsl';
import noiseTexture from './flame.png';

const start = (image) => {
  let canvasElem = document.getElementById('main');
  let wead = new WEAD(canvasElem);

  let geometry = new PlaneGeometry(wead);
  geometry.shader(texVertexShaderSource, texFragmentShaderSource);
  geometry.bind();

  let sand = {
    baseColor: [128, 128, 128, 255],
    noise:
    [
      {
        color: [255, 0, 0, 1024],
        attenuation: 1,
        roughness: 2,
        numOctaves: 6,
        startingOctave: 2
      },
      {
        color: [0, 255, 0, 1024],
        attenuation: 1,
        roughness: 2,
        numOctaves: 6,
        startingOctave: 2
      },
      {
        color: [0, 0, 255, 1024],
        attenuation: 1,
        roughness: 2,
        numOctaves: 6,
        startingOctave: 2
      }
    ]
  };
  let canvas = generateTexture(512, sand);

  let curtain = new CurtainGeometry(wead);
  geometry.shader(curtainVertexShaderSource, curtainFragmentShaderSource);
  curtain.bind();

  let render = () => {
    wead.viewportToCanvas();
    wead.clear();

    let now = (performance.now() / 1000) % 2;
    if (now > 1) {
      now = 2 - now;
    }

    geometry.update(image, { "u_now": now });
    geometry.draw();

    geometry.update(canvas, { "u_now": now });
    curtain.draw();

    requestAnimationFrame(render);
  };

  render();
}

window.main = () => {
  var image = new Image();
  image.src = noiseTexture;  // MUST BE SAME DOMAIN!!!
  image.onload = () => {
    start(image);
  };

  image.style.position = "absolute";
  image.style.zIndex = 1;
  document.body.appendChild(image);
}
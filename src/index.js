import { WEAD, PlaneGeometry } from './wead';
import { generateTexture } from './wead/texture';
import texVertexShaderSource from './glsl/texture/vertex.glsl';
import texFragmentShaderSource from './glsl/texture/fragment.glsl';
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

  let render = () => {
    wead.viewportToCanvas();
    wead.clear();

    geometry.update(image, { "u_now": (performance.now() / 1000) % .3 });
    geometry.draw();

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
import { NoiseGenerator } from './noise';

export const generateTexture = (size, data) => {
  var canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  var context = canvas.getContext('2d');
  var imageDataObject = context.createImageData(size, size);
  var imageData = imageDataObject.data;
  for (var i = 0; i < size * size * 4; i += 4) {
    imageData[i] = data.baseColor[0];
    imageData[i + 1] = data.baseColor[1];
    imageData[i + 2] = data.baseColor[2];
    imageData[i + 3] = data.baseColor[3];
  }
  var twoPi = Math.PI * 2;
  var at = 1;
  var ct = 4;
  for (i = 0; i < data.noise.length; i++) {
    var k = data.noise[i];
    var n = new NoiseGenerator(k.numOctaves, k.attenuation, k.roughness, k.startingOctave);
    var p = 0;
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        var xt = (ct + at * Math.cos(twoPi * y / size)) * Math.cos(twoPi * x / size);
        var yt = (ct + at * Math.cos(twoPi * y / size)) * Math.sin(twoPi * x / size);
        var zt = at * Math.sin(twoPi * y / size);
        // generate noise at current x and y coordinates (z is set to 0)
        var v = Math.abs(data.wrap ? n.noise(xt, yt, zt) : n.noise(x / size, y / size, 0));
        for (var c = 0; c < 3; c++ , p++) {
          imageData[p] = Math.floor(imageData[p] + v * k.color[c] * k.color[3] / 255);
        }
        p++;
      }
    }
  }
  context.putImageData(imageDataObject, 0, 0);
  return canvas;
}
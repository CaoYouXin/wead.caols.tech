export const get2dContext = (canvas) => {
  return canvas.getContext('2d');
}

export const getWebGlContext = (canvas) => {
  let gl = canvas.getContext('webgl');

  if (!gl) {
    gl = canvas.getContext('experimental-webgl');
  }

  if (!gl) {
    throw new Error('Your Browser DO NOT support WebGL.');
  }

  return gl;
}

export const getWebGl2Context = (canvas) => {
  let gl = canvas.getContext('webgl2');

  if (!gl) {
    throw new Error('Your Browser DO NOT support WebGL2.');
  }

  return gl;
}
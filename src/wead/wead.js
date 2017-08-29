import { getWebGlContext, getWebGl2Context } from './context';
import { createShader } from './shader';
import { createProgram } from './program';

export class WEAD {

  constructor(canvas) {
    try {
      this.gl = getWebGlContext(canvas);
      this.version = 1;

      this.gl.enable(this.gl.CULL_FACE);
    } catch (e) {
      alert(e);
    }
  }

  viewportToCanvas() {
    let canvas = this.gl.canvas;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.gl.viewport(0, 0, canvas.width, canvas.height);
  }

  clear() {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  vertexShader(vertexShaderSource) {
    return createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource);
  }

  fragmentShader(fragmentShaderSource) {
    return createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource);
  }

  program(vShader, fShader) {
    return createProgram(this.gl, vShader, fShader);
  }

  bindArray(program, bufArray, name, size, normalize) {
    let gl = this.gl;

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufArray), gl.STATIC_DRAW);

    let attrLocation = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(attrLocation);
    // var size = this.size;  // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    // var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(attrLocation, size, type, normalize, stride, offset);
  }

  bindTexture(texImage) {
    let gl = this.gl;

    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texImage);

    // Fill the texture with a 1x1 blue pixel.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  }

  bindUniform(program, name, value) {
    let gl = this.gl;

    let uniformLocation = gl.getUniformLocation(program, name);

    if (!value.length) {
      gl.uniform1f(uniformLocation, value);
      return;
    }

    switch (value.length) {
      case 2:
        gl.uniform2f(uniformLocation, value[0], value[1]);
        return;
      case 3:
        gl.uniform3f(uniformLocation, value[0], value[1], value[2]);
        return;
      case 4:
        gl.uniform4f(uniformLocation, value[0], value[1], value[2], value[3]);
        return;
      default:
        throw new Error('unhandled length ' + value.length);
    }
  }

}
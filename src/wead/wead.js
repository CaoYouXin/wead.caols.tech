import { getWebGlContext, getWebGl2Context } from './context';
import { createShader } from './shader';
import { createProgram } from './program';

export class WEAD {

  constructor(canvas) {
    try {
      this.gl = getWebGlContext(canvas);
      this.version = 1;
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
    this.gl.clearColor(0, 0, 0, 0);
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


}
import vertexShaderSource from '../glsl/base/vertex.glsl';
import fragmentShaderSource from '../glsl/base/fragment.glsl';

export class Geometry {
  constructor(wead, points, size) {
    this.wead = wead;
    this.points = points;
    this.size = size;

    this.bind();
  }

  shader(vertexShaderSource, fragmentShaderSource) {
    let vertexShader = this.wead.vertexShader(vertexShaderSource);
    let fragmentShader = this.wead.fragmentShader(fragmentShaderSource);
    this.program = this.wead.program(vertexShader, fragmentShader);
  }

  bind() {
    if (!this.program) {
      this.shader(vertexShaderSource, fragmentShaderSource);
    }

    let gl = this.wead.gl;
    if (!gl) {
      throw new Error('webgl is not ready.');
    }

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.points), gl.STATIC_DRAW);

    let positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    var size = this.size;  // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
  }

  draw() {
    let gl = this.wead.gl;

    gl.useProgram(this.program);
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = this.points.length / this.size;
    gl.drawArrays(primitiveType, offset, count);
  }
}
import dftVertexShaderSource from '../glsl/base/vertex.glsl';
import dftFragmentShaderSource from '../glsl/base/fragment.glsl';
import { generateTexture } from './texture';
import { GeometryInfo } from './info';

export class Geometry {
  constructor(wead, info) {
    if (!(info instanceof GeometryInfo)) {
      throw new Error('wrong argument type');
    }

    this.wead = wead;
    this.info = info;
  }

  shader(vertexShaderSource, fragmentShaderSource) {
    let vertexShader = this.wead.vertexShader(vertexShaderSource);
    let fragmentShader = this.wead.fragmentShader(fragmentShaderSource);
    this.program = this.wead.program(vertexShader, fragmentShader);
  }

  bind() {
    if (!this.program) {
      this.shader(dftVertexShaderSource, dftFragmentShaderSource);
    }

    this.wead.bindArray(this.program, this.info.vertex, 'a_position', this.info.size, false);

    if (this.info.normal) {
      this.wead.bindArray(this.program, this.info.normal, 'a_nomral', 3, false);
    }

    if (this.info.uv) {
      this.wead.bindArray(this.program, this.info.uv, 'a_uv', 2, false);
    }
  }

  update(texture, uniforms) {
    if (texture) {
      this.info.texture = texture;
    }

    if (uniforms) {
      this.info.uniforms = Object.assign(this.info.uniforms || {}, uniforms);
    }
  }

  draw() {
    let gl = this.wead.gl;

    gl.useProgram(this.program);

    if (this.info.texture) {
      this.wead.bindTexture(this.info.texture);
    }

    if (this.info.uniforms) {
      Object.keys(this.info.uniforms).forEach(k => {
        this.wead.bindUniform(this.program, k, this.info.uniforms[k]);
      });
    }

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = this.info.vertex.length / this.info.size;
    gl.drawArrays(primitiveType, offset, count);
  }
}
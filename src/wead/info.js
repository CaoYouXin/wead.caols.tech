export class GeometryInfo {

  constructor(vertex, size) {
    this.vertex = vertex;
    this.size = size;
  }

  setUV(uv, texture) {
    this.uv = uv;
    this.texture = texture;
    return this;
  }

  setNormal(normal) {
    this.normal = normal;
    return this;
  }

  setUniforms(uniforms) {
    this.uniforms = uniforms;
    return this;
  }

}
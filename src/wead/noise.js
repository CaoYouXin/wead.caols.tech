export class NoiseGenerator {

  constructor(numOctaves, attenuation, roughness, startingOctave) {
    this.p = [];
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }

    this.perm = [];
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }

    this.grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1],
      [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ];

    this.numOctaves = numOctaves;
    this.attenuation = attenuation;
    this.roughness = roughness;
    this.startingOctave = startingOctave;
  }

  noise(x, y, z) {
    let a = Math.pow(this.attenuation, -this.startingOctave);
    let f = Math.pow(this.roughness, this.startingOctave);
    let m = 0;
    for (let i = this.startingOctave; i < this.numOctaves + this.startingOctave; i++) {
      m += this.n(x * f, y * f, z * f) * a;
      a /= this.attenuation;
      f *= this.roughness;
    }
    return m / this.numOctaves;
  }

  mix(a, b, t) {
    return (1 - t) * a + t * b;
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  perlinDot(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  n(x, y, z) {
    // Find unit grid cell containing point
    let X = Math.floor(x);
    let Y = Math.floor(y);
    let Z = Math.floor(z);

    // Get relative xyz coordinates of point within that cell
    x = x - X;
    y = y - Y;
    z = z - Z;

    // Wrap the integer cells at 255
    X &= 255;
    Y &= 255;
    Z &= 255;

    // Calculate a set of eight hashed gradient indices
    let gi000 = this.perm[X + this.perm[Y + this.perm[Z]]] % 12;
    let gi001 = this.perm[X + this.perm[Y + this.perm[Z + 1]]] % 12;
    let gi010 = this.perm[X + this.perm[Y + 1 + this.perm[Z]]] % 12;
    let gi011 = this.perm[X + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;
    let gi100 = this.perm[X + 1 + this.perm[Y + this.perm[Z]]] % 12;
    let gi101 = this.perm[X + 1 + this.perm[Y + this.perm[Z + 1]]] % 12;
    let gi110 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z]]] % 12;
    let gi111 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z + 1]]] % 12;

    // Calculate noise contributions from each of the eight corners
    let n000 = this.perlinDot(this.grad3[gi000], x, y, z);
    let n100 = this.perlinDot(this.grad3[gi100], x - 1, y, z);
    let n010 = this.perlinDot(this.grad3[gi010], x, y - 1, z);
    let n110 = this.perlinDot(this.grad3[gi110], x - 1, y - 1, z);
    let n001 = this.perlinDot(this.grad3[gi001], x, y, z - 1);
    let n101 = this.perlinDot(this.grad3[gi101], x - 1, y, z - 1);
    let n011 = this.perlinDot(this.grad3[gi011], x, y - 1, z - 1);
    let n111 = this.perlinDot(this.grad3[gi111], x - 1, y - 1, z - 1);

    // Compute the ease curve value for each of x, y, z
    let u = this.fade(x);
    let v = this.fade(y);
    let w = this.fade(z);

    // Interpolate (along x) the contributions from each of the corners
    let nx00 = this.mix(n000, n100, u);
    let nx01 = this.mix(n001, n101, u);
    let nx10 = this.mix(n010, n110, u);
    let nx11 = this.mix(n011, n111, u);

    // Interpolate the four results along y
    let nxy0 = this.mix(nx00, nx10, v);
    let nxy1 = this.mix(nx01, nx11, v);

    // Interpolate the last two results along z
    return this.mix(nxy0, nxy1, w);
  }

}
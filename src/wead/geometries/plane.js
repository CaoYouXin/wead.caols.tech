import { Geometry } from '../geometry';
import { GeometryInfo } from '../info';

export class PlaneGeometry extends Geometry {
  constructor(wead) {
    let info = new GeometryInfo([
      -0.5, -0.5, 0,
      0.5, -0.5, 0,
      -0.5, 0.5, 0,
      0.5, 0.5, 0,
      -0.5, 0.5, 0,
      0.5, -0.5, 0
    ], 3);

    info.setUV([
      0, 0,
      1, 0,
      0, 1,
      1, 1,
      0, 1,
      1, 0
    ]);

    super(wead, info);
  }
}
import { Geometry } from '../geometry';
import { GeometryInfo } from '../info';

export class CurtainGeometry extends Geometry {
  constructor(wead) {
    let info = new GeometryInfo([
      -1, -1, 1,
      1, -1, 1,
      -1, 1, 1,
      1, 1, 1,
      -1, 1, 1,
      1, -1, 1
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
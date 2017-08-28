import { getWebGlContext, getWebGl2Context } from './context';

export class WEAD {

  init(canvas) {
    try {
      this.gl = getWebGl2Context(canvas);
      this.version = 2;
    } catch (e) {
      try {
        this.gl = getWebGlContext(canvas);
        this.version = 1;
      } catch (e) {
        alert(e);
      }
    }
  }

}
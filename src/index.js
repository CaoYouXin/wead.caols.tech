import { WEAD, Geometry } from './wead';

window.main = () => {
  let canvasElem = document.getElementById('main');
  let wead = new WEAD(canvasElem);

  var positions = [
    0, 0,
    0, 0.5,
    0.7, 0,
  ];
  let geometry = new Geometry(wead, positions, 2);

  let render = () => {
    wead.viewportToCanvas();
    wead.clear();
    geometry.draw();
  };

  window.addEventListener('resize', render);
  render();
}
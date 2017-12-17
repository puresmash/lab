
import _ from 'lodash';

export const initPinchHelper = (cb) => {
  let prevScale = 1;
  let scale = 1;
  const TH = 1;
  return _.throttle(
    e => {
      // pinchend won't trigger sometime, use pinchstart instead.
      if(e.type === 'pinchstart'){
        prevScale *= scale;
        if(prevScale < TH) prevScale = TH;
      }
      // fliter noise event
      if(e.scale === 1) return;
      scale = e.scale;
      const result = prevScale * scale;
      cb(result > TH ? result : TH);
    }, 34
  );
}

export const initTapHelper = (cb) => _.throttle(e => console.log('tap', e), 100);

export const initDoubleTapHelper = (cb) => _.throttle(e => {
  console.log('double tap', e);
  cb();
}, 100)

export const initPanHelper = (cb, calcBound) => {
  let prevLocate = { x: 0, y: 0 };
  return _.throttle(
    e => {
      const { mx, my } = calcBound();
      console.log(mx, my)
      const x = e.deltaX;
      const y = e.deltaY;

      let rx = x + prevLocate.x;
      if(Math.abs(rx) > mx) {
        rx = rx < 0 ? -mx : mx;
      }
      let ry = y + prevLocate.y;
      if(Math.abs(ry) > my) {
        ry = ry < 0 ? -my : my;
      }
      cb(rx, ry);
      if(e.type === 'panend') {
        prevLocate.x = rx;
        prevLocate.y = ry;
      }
    }, 34
  );
}

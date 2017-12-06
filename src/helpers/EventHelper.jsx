
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

export const initPanHelper = (cb) => {
  let prevLocate = { x: 0, y: 0 };
  return _.throttle(
    e => {
      const x = e.deltaX;
      const y = e.deltaY;
      cb(x + prevLocate.x, y + prevLocate.y);
      if(e.type === 'panend') {
        prevLocate.x += x;
        prevLocate.y += y;
      }
    }, 34
  );
}

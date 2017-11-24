

const getViewport = () => {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0];
  return {
    x: w.innerWidth || e.clientWidth || g.clientWidth,
    y: w.innerHeight|| e.clientHeight|| g.clientHeight
  }
}

export {
  getViewport
}

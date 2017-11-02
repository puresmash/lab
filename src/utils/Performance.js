
// TTI
function getTimeToInteractive () {
  const requestStart = window.performance.timing.requestStart;
  const domInteractive = window.performance.timing.domInteractive;
  return domInteractive - requestStart;
}

function getResourceEntries() {
  // name, duration, transferSize
  return window.performance.getEntriesByType('resource') || [];
}

function prefetchResource(resourceURL) {
  const xhrRequest = new XMLHttpRequest();
  xhrRequest.open('GET', resourceURL, true);
  xhrRequest.send();
}

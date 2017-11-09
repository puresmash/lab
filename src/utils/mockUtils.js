export const mockApiCall = (waiting=5) => {
  return new Promise(resolve => {
    setTimeout(() => resolve('mock payload'), waiting * 1000);
  });
}
export const logTime = (max=1) => {
  let cnt = 1;
  const id = setInterval(() => {
    if(cnt > max) {
      clearInterval(id);
      return;
    }
    console.log(`${cnt} sec passing...`)
    cnt ++;
  }, 1000);
}

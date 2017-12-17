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

const dataURItoBlob = (dataURI, callback) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==
    const byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length);
    const typedArray = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      typedArray[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    return new Blob([ab], { type: mimeString });
}

// export const atob = (str) => {
//   return return new Buffer(b64str, 'base64').toString();
// }

export const mockBlob = () => {
  return dataURItoBlob('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==');
}

function request(url) {
  return new Promise((resolve,reject) => {
    console.log('请求', url);
    resolve('data');
  })
}

async function _requestWithTimeoutAndRetry(url, timeout, retry, count, resolve, reject) {
  
}

async function requestWithTimeoutAndRetry(url, timeout, retry) {
  request(url);

}
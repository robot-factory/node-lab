const requestWithTime = (url: string, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    //向 server 端获取一张图片
    xhr.open("GET", url, true);

    // 这行是关键！
    //将响应数据按照纯文本格式来解析，字符集替换为用户自己定义的字符集
    xhr.overrideMimeType("text/plain; charset=x-user-defined");

    const timeoutTimer = setTimeout(() => {
      xhr.abort();
      reject(new Error("timeout"));
    }, timeout);

    xhr.onreadystatechange = function (e) {
      if (this.readyState == 4 && this.status == 200) {
        resolve(this.responseText);
      } else {
        reject();
      }
      clearTimeout(timeoutTimer);
    };

    xhr.send();
  });
};

const requestWithRetry = async (url: string, timeout = 5000, retry = 3) => {
  let count = 0;
  let result = [false, {}];
  while (count < retry) {
    count++;
    const res = await requestWithTime(url, timeout);
    if (res) {
      result = [true, res];
      break;
    }
  }
  return result;
};

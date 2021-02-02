const originalXhrSend = XMLHttpRequest.prototype.send;
const originalOpen = XMLHttpRequest.prototype.open;

XMLHttpRequest.prototype.open = function (method, url, isAsync) {
  this.isSync = isAsync === false;
  originalOpen.call(this, method, url);
}

XMLHttpRequest.prototype.send = async function (body) {
  console.log(this, body, this.isSync);

  if (this.isSync) await sendSync.call(this, body);
  else originalXhrSend.call(this, body);

  console.log('SUKA 2', this.responseText);  
};

function sendSync(body) {
  const xhr = this;

  return new Promise((resolve) => {
    xhr.onload = function () {
      resolve();
    };

    xhr.onerror = function () {
      resolve();
    };

    originalXhrSend.call(xhr, body, false);
  });
}

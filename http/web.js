function SmartAppInterceptor({ iframeSelector, smartAppUrl }) {
  this._iframe = document.querySelector(iframeSelector);
  this._smartAppUrl = smartAppUrl;
  this._serviceWorker = null;
  this._cookies = {};

  this._installSW();
}

SmartAppInterceptor.prototype.log = function (...args) {
  // console.log(...args)
  document.body.append(
    args
      .map((arg) => (typeof arg === "string" ? arg : JSON.stringify(arg)))
      .join(" ")
  );
  document.body.append(document.createElement("hr"));
};

SmartAppInterceptor.prototype._handleMessage = function (event) {
  const message = event.data;
  const messageId = message.messageId;

  // this.log("[recv::web]", message);

  switch (message.type) {
    case "request":
      const { url, method, headers, body } = message;

      this._sendMessageToAndroid({
        url,
        method,
        headers,
        body,
        ref: messageId,
      });
      break;
    default:
      // console.log("unknown event from iframe", message);
      break;
  }
};

SmartAppInterceptor.prototype._sendMessageToIframe = function (message) {
  this._iframe.contentWindow.postMessage(message, "*");
};

SmartAppInterceptor.prototype._sendMessageToSW = function (message) {
  if (!this._serviceWorker) return;
  // this.log("[send::web]", message);
  this._serviceWorker.active.postMessage(message);
};

SmartAppInterceptor.prototype._sendMessageToAndroid = function ({
  url,
  method,
  body,
  headers,
  ref,
}) {
  this.log({ data: { url, method, body, headers }, ref });

  if (typeof express === "undefined") {
    this.log('No object "express", cannot send message to Android');
    return;
  }
  if (!express.send) {
    this.log('No method "express.send", cannot send message to Android');
  }

  express.send(
    JSON.stringify({
      data: {
        url,
        method,
        body,
        headers,
      },
      ref,
    })
  );
};

SmartAppInterceptor.prototype._loadResource = function ({
  url,
  method,
  body,
  headers,
}) {
  const _this = this;

  let response;
  let responseData;

  const proxiedUrl = _this._prepareFetchUrl(url);

  const requestHeaders = {
    ...headers,
    cookie: Object.entries(_this._cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join("; "),
  };

  this.log(proxiedUrl, requestHeaders, "cookies", _this._cookies);

  return fetch("http://localhost:3000/fetch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: proxiedUrl,
      method,
      body: base64.encode(body),
      headers: requestHeaders,
    }),
  })
    .then((res) => {
      response = res;
      return response.json();
    })
    .then((data) => {
      responseData = _this._processRedirect(data);

      _this._processCookies.call(_this, data);
      return _this._injectScript(url, base64.decode(data.body));
    })
    .then((body) => {
      console.log("[recv]", responseData);
      // this.log(
      //   url,
      //   new TextDecoder().decode(base64.decode(responseData.body))
      // );

      return {
        status: responseData.status,
        headers: responseData.headers,
        body,
      };
    })
    .catch((error) => {
      console.error(error);
      // TODO: response actual error
      return { status: 404 };
    });
};

SmartAppInterceptor.prototype.dispose = function () {
  window.removeEventListener("message", this._handleMessage);
};

SmartAppInterceptor.prototype._installSW = function () {
  const _this = this;

  if (!navigator.serviceWorker) {
    document.body.innerHTML = "<h1>SW not supported</h1>";
  }

  navigator.serviceWorker
    .register("__smart_app__sw__.js")
    .then(function (registration) {
      navigator.serviceWorker.addEventListener(
        "message",
        _this._handleMessage.bind(_this)
      );

      _this.log("SW installed");

      _this._serviceWorker = registration;
      _this._iframe.src = location.origin + _this._smartAppUrl;
    })
    .catch((error) => {
      document.body.innerHTML = "<h1>SW install error :(</h1>";
      console.error("SW error", error);
    });
};

SmartAppInterceptor.prototype._processCookies = function (data) {
  const _this = this;

  const responseHeaders = Object.entries(data.headers).reduce(
    (headers, [keyName, keyValue]) => {
      if (keyName === "set-cookie") {
        _this._cookies = keyValue.split(/,\s+/).reduce((cookies, text) => {
          const [, name, value] = text.match(/([^=]+)=([^;]+);/) || [];
          if (name && value) {
            return { ...cookies, [name]: value };
          }
          return cookies;
        }, _this._cookies);

        return headers;
      }

      return { ...headers, [keyName]: keyValue };
    },
    {}
  );

  return responseHeaders;
};

SmartAppInterceptor.prototype._processRedirect = function (data) {
  const { headers, status } = data;

  if (status < 300 || status > 399 || !headers.location) return data;

  return {
    ...data,
    headers: {
      ...headers,
      location: headers.location.replace(
        "https://mobile-dev.nornik.ru:8443",
        "http://localhost:8080"
      ),
    },
  };
};

SmartAppInterceptor.prototype._prepareFetchUrl = function (url) {
  return url
    .replace("http://localhost:8080", "https://mobile-dev.nornik.ru:8443")
    .replace(/^\//, "https://mobile-dev.nornik.ru:8443/");
};

SmartAppInterceptor.prototype._injectScript = function (url, body) {
  if (url.indexOf("sap/public/bc/ui2/zlogon/login.js") === -1) return body;

  return fetch("./__smart_app__login__.js").then((res) => res.arrayBuffer());
};

window.SmartAppInterceptor = SmartAppInterceptor;

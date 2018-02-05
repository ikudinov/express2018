/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var icon = undefined ? '' : __webpack_require__(1);

var CLIENT_RESPONSE_TIMEOUT = 500;
var messages = [];

function sendMessageToClient(client, msg) {
  return new Promise(function (resolve, reject) {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    client.postMessage(msg, [channel.port2]);

    setTimeout(function () {
      return reject();
    }, CLIENT_RESPONSE_TIMEOUT);
  });
}

function sendMessageToAllClients(msg) {
  var responses = [];

  return self.clients.matchAll().then(function (clients) {
    var promises = clients.map(function (client) {
      return sendMessageToClient(client, msg).then(function (data) {
        responses.push({ data: data, client: client });
      });
    });

    return Promise.all(promises);
  }).then(function () {
    if (responses.length) return responses;

    return Promise.reject();
  });
}

function closeAllNotifications() {
  self.registration.getNotifications().then(function (notifications) {
    notifications.forEach(function (notification) {
      return notification.close();
    });
  });
  messages.splice(0);
}

function showNotification(title, data) {
  var body = messages.join('\n') || '';

  self.registration.getNotifications().then(function (items) {
    return items.forEach(function (item) {
      return item.close();
    });
  });
  self.registration.showNotification(title, { icon: icon, data: data, body: body });

  messages.unshift(title);
  if (messages.length > 3) messages.pop();
}

self.addEventListener('activate', function () {
  return self.clients.claim();
});

self.addEventListener('push', function (event) {
  var payload = event && event.data && event.data.text();

  var _JSON$parse = JSON.parse(payload || '{}'),
      message = _JSON$parse.message,
      data = _JSON$parse.data;

  event.waitUntil(self.clients.matchAll().then(function (clients) {
    var appInFocus = clients.reduce(function (result, client) {
      return client.focused && client.visibilityState === 'visible' || result;
    }, false);

    return !appInFocus && showNotification(message, data);
  }, function () {
    showNotification(message, data);
  }));
});

self.addEventListener('notificationclick', function (event) {
  var message = {
    type: 'ACTIVATE_CHAT',
    payload: event.notification.data
  };

  closeAllNotifications();

  event.waitUntil(sendMessageToAllClients(message).then(function (responses) {
    if (responses.length) responses[0].client.focus();else self.clients.openWindow('/#/chats/' + event.notification.data.group_chat_id);
  }, function () {
    return self.clients.openWindow('/#/chats/' + event.notification.data.group_chat_id);
  }));
});

self.addEventListener('message', function (event) {
  if (event.data === 'closeAllNotifications') closeAllNotifications();
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(icon, 'icon', '/home/fesh/Work/web_client/app/workers/pushWorker.js');

  __REACT_HOT_LOADER__.register(CLIENT_RESPONSE_TIMEOUT, 'CLIENT_RESPONSE_TIMEOUT', '/home/fesh/Work/web_client/app/workers/pushWorker.js');

  __REACT_HOT_LOADER__.register(messages, 'messages', '/home/fesh/Work/web_client/app/workers/pushWorker.js');

  __REACT_HOT_LOADER__.register(sendMessageToClient, 'sendMessageToClient', '/home/fesh/Work/web_client/app/workers/pushWorker.js');

  __REACT_HOT_LOADER__.register(sendMessageToAllClients, 'sendMessageToAllClients', '/home/fesh/Work/web_client/app/workers/pushWorker.js');

  __REACT_HOT_LOADER__.register(closeAllNotifications, 'closeAllNotifications', '/home/fesh/Work/web_client/app/workers/pushWorker.js');

  __REACT_HOT_LOADER__.register(showNotification, 'showNotification', '/home/fesh/Work/web_client/app/workers/pushWorker.js');
}();

;

 ;(function register() { /* react-hot-loader/webpack */ if (Object({"CONFIG":{"gcmSenderId":"67784544521","regions":{"ru":{"host":"rts1dev.ccsteam.ru","prefix":7},"ae":{"host":"rts1test.ccsteam.ru","prefix":971}},"sentryDSN":null},"TEST":undefined}).NODE_ENV !== 'production') { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/home/fesh/Work/web_client/app/workers/pushWorker.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/fesh/Work/web_client/app/workers/pushWorker.js"); } } })();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "dist/images/notification_icon.png";

/***/ })
/******/ ]);
//# sourceMappingURL=510506691748d87b7a93.serviceworker.js.map
'use strict';

function ExpressWidget(params) {
  var _this = this;

  var _ref = params || {};

  var elementId = _ref.elementId;
  var url = _ref.url;
  var chatId = _ref.chatId;
  var _ref$full = _ref.full;
  var full = _ref$full === undefined ? true : _ref$full;

  this.RPC_COMMAND = {
    UNREAD_CHATS_COUNTER: 'unreadChatsCounter',
    APP_LOADED: 'appLoaded',
    OPEN_CHAT: 'openChat',
    VERSION: 'version',
    LOGOUT: 'logout',
    LOGIN: 'login'
  };
  this.containerElement = null;
  this.iframeElement = null;
  this.badgeElement = null;
  this.isOpen = false;
  this.isUser = false;

  this.init = function () {
    _this.containerElement = document.getElementById(elementId);
    if (!_this.containerElement) {
      var container = document.createElement('div');
      container.setAttribute('class', 'express-wrapper');
      container.setAttribute('id', elementId);
      document.body.appendChild(container);
      _this.containerElement = document.getElementById(elementId);
    } else {
      _this.containerElement.classList.add('express-wrapper');
    }

    var buttonId = 'express-button-' + Math.random();
    var iframeId = 'express-iframe-' + Math.random();
    var badgeId = 'express-bagde-' + Math.random();

    document.body.insertAdjacentHTML('beforeend', '\n      <iframe\n          src="' + url + '/#/rpc?origin=' + encodeURIComponent(window.location.origin) + '"\n          style="width: 1px; height: 1px; visibility: hidden;"\n          class="express-iframe express-button-full"\n    sandbox="allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation-by-user-activation"\n      id="' + iframeId + '"\n      ></iframe>\n    ');

    _this.containerElement.innerHTML = '\n      <button class="express-button" id="' + buttonId + '">\n          <svg width="35" height="35" viewBox="-1 -1 16 16" fill="#FFF"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M12.7 1H2.3c-.715 0-1.293.585-1.293 1.3L1 14l2.6-2.6h9.1c.715 0 1.3-.585 1.3-1.3V2.3c0-.715-.585-1.3-1.3-1.3zM3.6 5.55h7.8v1.3H3.6v-1.3zM8.8 8.8H3.6V7.5h5.2v1.3zm2.6-3.9H3.6V3.6h7.8v1.3z"></path></g></svg>\n          <span id=' + badgeId + ' class="express-button__badge" style="display:none"></span>\n      </button>\n    ';

    _this.iframeElement = document.getElementById(iframeId);
    _this.badgeElement = document.getElementById(badgeId);
    _this.buttonElement = document.getElementById(buttonId);

    _this.buttonElement.addEventListener('click', _this.handleToggle);
    window.addEventListener('message', function (event) {
      return _this.handleRpcCommand(event.data);
    });
  };

  this.handleRpcCommand = function (_ref2) {
    var type = _ref2.type;
    var payload = _ref2.payload;

    switch (type) {
      case _this.RPC_COMMAND.UNREAD_CHATS_COUNTER:
        _this.handleUnreadCounter(payload.counter);
        break;
      case _this.RPC_COMMAND.APP_LOADED:
        if (!_this.isUser && payload) {
          _this.isUser = true;
          _this.buttonElement.style = 'background-color: #4799e3;';
        }
        if (full) _this.sendRpcCommand({ type: _this.RPC_COMMAND.VERSION, payload: { embeddedType: 'full' } });
        if (chatId) _this.sendRpcCommand({ type: _this.RPC_COMMAND.OPEN_CHAT, payload: { chatId: chatId } });
        break;
      case _this.RPC_COMMAND.LOGIN:
        if (!_this.isUser) {
          _this.isUser = true;
          _this.buttonElement.style = 'background-color: #4799e3;';
        }
        if (full) _this.sendRpcCommand({ type: _this.RPC_COMMAND.VERSION, payload: { embeddedType: 'full' } });
        break;
      case _this.RPC_COMMAND.LOGOUT:
        if (_this.isUser) {
          _this.isUser = false;
          _this.buttonElement.style = 'background-color: #999999;';
        }
        if (full) _this.sendRpcCommand({ type: _this.RPC_COMMAND.VERSION, payload: { embeddedType: 'full' } });
        _this.handleUnreadCounter(null);
        break;
      case _this.RPC_COMMAND.VERSION:
        if (full) _this.sendRpcCommand({ type: _this.RPC_COMMAND.VERSION, payload: { embeddedType: 'full' } });
        break;
      default:
        break;
    }
  };

  this.sendRpcCommand = function (_ref3) {
    var type = _ref3.type;
    var payload = _ref3.payload;

    _this.iframeElement.contentWindow.postMessage({ type: type, payload: payload }, url);
  };

  this.handleUnreadCounter = function (counter) {
    if (!counter) {
      _this.badgeElement.style = 'display: none';
      return;
    }
    _this.badgeElement.style = '';
    _this.badgeElement.innerHTML = counter;
  };

  this.handleToggle = function () {
    if (_this.isOpen) {
      _this.handleClose();
    } else {
      _this.handleOpen();
    }
  };

  this.handleOpen = function () {
    _this.isOpen = true;
    _this.iframeElement.style = '\n      width: 50%;\n      min-width: 600px;\n      height: 50%;\n      min-height: 600px;\n      opacity: 1;\n    ';
  };

  this.handleClose = function () {
    _this.isOpen = false;
    _this.iframeElement.style = '\n      width: 1px;\n      height: 1px;\n      min-width: 1px;\n      min-height: 1px;\n      opacity: 0;\n    ';
  };

  this.init();
}

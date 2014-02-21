var MockPebble = function () {
  this.eventListeners = {};
  this.eventHandlers = {
    appmessage: []
  };
};

MockPebble.prototype.addEventListener = function (event, callback) {
  if (! this.eventListeners[event]) {
    this.eventListeners[event] = [];
  }
  this.eventListeners[event].push(callback);
};

MockPebble.prototype.sendAppMessage = function (payload) {
  var _arguments = Array.prototype.slice.call(arguments);
  this.eventHandlers.appmessage.forEach(function (handler) {
    handler.apply(null, _arguments);
  });
};

MockPebble.prototype.getAccountToken = function () {
  return '';
};

MockPebble.prototype._emit = function (event, data) {
  if (! this.eventListeners[event]) {
    return;
  }
  this.eventListeners[event].forEach(function (listener) {
    listener(data);
  });
};

MockPebble.prototype._on = function(event, callback) {
  if (! this.eventHandlers[event]) {
    return;
  }
  this.eventHandlers[event].push(callback);
};

MockPebble.prototype._getEventListeners = function(event) {
  return this.eventListeners[event] || [];
};

MockPebble.prototype._reset = function () {
  this.eventListeners = {};
  this.eventHandlers.appmessage = [];
}
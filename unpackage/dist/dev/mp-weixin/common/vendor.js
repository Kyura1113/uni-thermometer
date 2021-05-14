(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"uni-thermometer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!********************************************************!*\
  !*** D:/projects/kyu/uni-thermometer/utils/filters.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.timeFormat = timeFormat; // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(Number(dateTime));
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"uni-thermometer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"uni-thermometer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"uni-thermometer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"uni-thermometer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 26:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 27);

/***/ }),

/***/ 27:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 28);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 28:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 29:
/*!************************************************************************!*\
  !*** D:/projects/kyu/uni-thermometer/pages/thermometer/thermometer.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.readCSVfile = readCSVfile;exports.currentTemperature = currentTemperature;function readCSVfile(file, callback) {
  var fileReader = wx.getFileSystemManager();
  var fileData = fileReader.readFile({
    filePath: file,
    encoding: "utf-8",
    success: function success(res) {var
      data = res.data;
      callback(csvToObj(data));
    } });

}

function csvToObj(csvString) {
  var csvArray = csvString.split("\r\n");
  var result = [];
  for (var i = 1; i < csvArray.length - 2; i++) {
    result.push({
      index: i,
      value: csvArray[i].split(",")[4] });

  }
  return result;
}

function currentTemperature(pmData, pbData) {
  if (!pmData && !pbData && pmData.length !== pbData.length) {
    return "Error";
  }
  var valueArr = function valueArr(data) {
    var arr = [];
    data.map(function (item) {return arr.push(item.value);});
    return arr; //Array.from(new Set(arr));
  };
  return computedTemperature(pmData[0].value, valueArr(pmData), pbData[0].value, valueArr(pbData));
}

function computedTemperature(pm, pmvalArr, pb, pbvalArr) {
  var pmArr = pmvalArr.sort(function (a, b) {return a - b;});
  var pbArr = pbvalArr.sort(function (a, b) {return a - b;});
  var pmPre = pmArr.findIndex(function (v) {return v === pm;});
  pmPre = (pmPre === 1 ? 1 : pmPre === 0 ? 0 : pmPre / (pmvalArr.length - 1)) * 100;
  var pbPre = pbArr.findIndex(function (v) {return v === pb;});
  pbPre = (pbPre === 1 ? 1 : pbPre === 0 ? 0 : pbPre / (pbvalArr.length - 1)) * 100;
  return (pmPre + pbPre) / 2;
}

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!**************************************************!*\
  !*** D:/projects/kyu/uni-thermometer/pages.json ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 48:
/*!*************************************************************!*\
  !*** D:/projects/kyu/uni-thermometer/assets/echarts.min.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?e(exports):undefined;}(this,function(t){"use strict";function e(t,e){function n(){this.constructor=t;}_Dv(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n());}function n(){for(var t=0,e=0,n=arguments.length;n>e;e++){t+=arguments[e].length;}for(var i=Array(t),r=0,e=0;n>e;e++){for(var o=arguments[e],a=0,s=o.length;s>a;a++,r++){i[r]=o[a];}}return i;}function i(t,e){var n=e.browser,i=t.match(/Firefox\/([\d.]+)/),r=t.match(/MSIE\s([\d.]+)/)||t.match(/Trident\/.+?rv:(([\d.]+))/),o=t.match(/Edge?\/([\d.]+)/),a=/micromessenger/i.test(t);i&&(n.firefox=!0,n.version=i[1]),r&&(n.ie=!0,n.version=r[1]),o&&(n.edge=!0,n.version=o[1],n.newEdge=+o[1].split(".")[0]>18),a&&(n.weChat=!0),e.canvasSupported=!!document.createElement("canvas").getContext,e.svgSupported="undefined"!=typeof SVGRect,e.touchEventsSupported="ontouchstart"in window&&!n.ie&&!n.edge,e.pointerEventsSupported="onpointerdown"in window&&(n.edge||n.ie&&+n.version>=11),e.domSupported="undefined"!=typeof document;var s=document.documentElement.style;e.transform3dSupported=(n.ie&&"transition"in s||n.edge||"WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix()||"MozPerspective"in s)&&!("OTransition"in s),e.transformSupported=e.transform3dSupported||n.ie&&+n.version>=9;}function r(t,e){Yv[t]=e;}function o(){return Xv++;}function a(){for(var t=[],e=0;e<arguments.length;e++){t[e]=arguments[e];}"undefined"!=typeof console&&console.error.apply(console,t);}function s(t){if(null==t||"object"!=typeof t)return t;var e=t,n=zv.call(t);if("[object Array]"===n){if(!Y(t)){e=[];for(var i=0,r=t.length;r>i;i++){e[i]=s(t[i]);}}}else if(Bv[n]){if(!Y(t)){var o=t.constructor;if(o.from)e=o.from(t);else{e=new o(t.length);for(var i=0,r=t.length;r>i;i++){e[i]=s(t[i]);}}}}else if(!Ev[n]&&!Y(t)&&!P(t)){e={};for(var a in t){t.hasOwnProperty(a)&&(e[a]=s(t[a]));}}return e;}function l(t,e,n){if(!k(e)||!k(t))return n?s(e):t;for(var i in e){if(e.hasOwnProperty(i)){var r=t[i],o=e[i];!k(o)||!k(r)||M(o)||M(r)||P(o)||P(r)||D(o)||D(r)||Y(o)||Y(r)?!n&&i in t||(t[i]=s(e[i])):l(r,o,n);}}return t;}function u(t,e){for(var n=t[0],i=1,r=t.length;r>i;i++){n=l(n,t[i],e);}return n;}function h(t,e){if(Object.assign)Object.assign(t,e);else for(var n in e){e.hasOwnProperty(n)&&(t[n]=e[n]);}return t;}function c(t,e,n){for(var i=b(e),r=0;r<i.length;r++){var o=i[r];(n?null!=e[o]:null==t[o])&&(t[o]=e[o]);}return t;}function p(t,e){if(t){if(t.indexOf)return t.indexOf(e);for(var n=0,i=t.length;i>n;n++){if(t[n]===e)return n;}}return-1;}function f(t,e){function n(){}var i=t.prototype;n.prototype=e.prototype,t.prototype=new n();for(var r in i){i.hasOwnProperty(r)&&(t.prototype[r]=i[r]);}t.prototype.constructor=t,t.superClass=e;}function d(t,e,n){if(t="prototype"in t?t.prototype:t,e="prototype"in e?e.prototype:e,Object.getOwnPropertyNames)for(var i=Object.getOwnPropertyNames(e),r=0;r<i.length;r++){var o=i[r];"constructor"!==o&&(n?null!=e[o]:null==t[o])&&(t[o]=e[o]);}else c(t,e,n);}function g(t){return t?"string"==typeof t?!1:"number"==typeof t.length:!1;}function y(t,e,n){if(t&&e)if(t.forEach&&t.forEach===Fv)t.forEach(e,n);else if(t.length===+t.length)for(var i=0,r=t.length;r>i;i++){e.call(n,t[i],i,t);}else for(var o in t){t.hasOwnProperty(o)&&e.call(n,t[o],o,t);}}function v(t,e,n){if(!t)return[];if(!e)return V(t);if(t.map&&t.map===Gv)return t.map(e,n);for(var i=[],r=0,o=t.length;o>r;r++){i.push(e.call(n,t[r],r,t));}return i;}function m(t,e,n,i){if(t&&e){for(var r=0,o=t.length;o>r;r++){n=e.call(i,n,t[r],r,t);}return n;}}function _(t,e,n){if(!t)return[];if(!e)return V(t);if(t.filter&&t.filter===Vv)return t.filter(e,n);for(var i=[],r=0,o=t.length;o>r;r++){e.call(n,t[r],r,t)&&i.push(t[r]);}return i;}function x(t,e,n){if(t&&e)for(var i=0,r=t.length;r>i;i++){if(e.call(n,t[i],i,t))return t[i];}}function b(t){if(!t)return[];if(Object.keys)return Object.keys(t);var e=[];for(var n in t){t.hasOwnProperty(n)&&e.push(n);}return e;}function w(t,e){for(var n=[],i=2;i<arguments.length;i++){n[i-2]=arguments[i];}return function(){return t.apply(e,n.concat(Hv.call(arguments)));};}function S(t){for(var e=[],n=1;n<arguments.length;n++){e[n-1]=arguments[n];}return function(){return t.apply(this,e.concat(Hv.call(arguments)));};}function M(t){return Array.isArray?Array.isArray(t):"[object Array]"===zv.call(t);}function T(t){return"function"==typeof t;}function C(t){return"string"==typeof t;}function I(t){return"[object String]"===zv.call(t);}function A(t){return"number"==typeof t;}function k(t){var e=typeof t;return"function"===e||!!t&&"object"===e;}function D(t){return!!Ev[zv.call(t)];}function L(t){return!!Bv[zv.call(t)];}function P(t){return"object"==typeof t&&"number"==typeof t.nodeType&&"object"==typeof t.ownerDocument;}function O(t){return null!=t.colorStops;}function R(t){return null!=t.image;}function E(t){return"[object RegExp]"===zv.call(t);}function B(t){return t!==t;}function z(){for(var t=[],e=0;e<arguments.length;e++){t[e]=arguments[e];}for(var n=0,i=t.length;i>n;n++){if(null!=t[n])return t[n];}}function N(t,e){return null!=t?t:e;}function F(t,e,n){return null!=t?t:null!=e?e:n;}function V(t){for(var e=[],n=1;n<arguments.length;n++){e[n-1]=arguments[n];}return Hv.apply(t,e);}function H(t){if("number"==typeof t)return[t,t,t,t];var e=t.length;return 2===e?[t[0],t[1],t[0],t[1]]:3===e?[t[0],t[1],t[2],t[1]]:t;}function G(t,e){if(!t)throw new Error(e);}function W(t){return null==t?null:"function"==typeof t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");}function U(t){t[Zv]=!0;}function Y(t){return t[Zv];}function X(t){return new Kv(t);}function j(t,e){for(var n=new t.constructor(t.length+e.length),i=0;i<t.length;i++){n[i]=t[i];}for(var r=t.length,i=0;i<e.length;i++){n[i+r]=e[i];}return n;}function q(t,e){var n;if(Object.create)n=Object.create(t);else{var i=function i(){};i.prototype=t,n=new i();}return e&&h(n,e),n;}function Z(t,e){return t.hasOwnProperty(e);}function K(){}function $(t,e){return null==t&&(t=0),null==e&&(e=0),[t,e];}function J(t,e){return t[0]=e[0],t[1]=e[1],t;}function Q(t){return[t[0],t[1]];}function te(t,e,n){return t[0]=e,t[1]=n,t;}function ee(t,e,n){return t[0]=e[0]+n[0],t[1]=e[1]+n[1],t;}function ne(t,e,n,i){return t[0]=e[0]+n[0]*i,t[1]=e[1]+n[1]*i,t;}function ie(t,e,n){return t[0]=e[0]-n[0],t[1]=e[1]-n[1],t;}function re(t){return Math.sqrt(oe(t));}function oe(t){return t[0]*t[0]+t[1]*t[1];}function ae(t,e,n){return t[0]=e[0]*n[0],t[1]=e[1]*n[1],t;}function se(t,e,n){return t[0]=e[0]/n[0],t[1]=e[1]/n[1],t;}function le(t,e){return t[0]*e[0]+t[1]*e[1];}function ue(t,e,n){return t[0]=e[0]*n,t[1]=e[1]*n,t;}function he(t,e){var n=re(e);return 0===n?(t[0]=0,t[1]=0):(t[0]=e[0]/n,t[1]=e[1]/n),t;}function ce(t,e){return Math.sqrt((t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]));}function pe(t,e){return(t[0]-e[0])*(t[0]-e[0])+(t[1]-e[1])*(t[1]-e[1]);}function fe(t,e){return t[0]=-e[0],t[1]=-e[1],t;}function de(t,e,n,i){return t[0]=e[0]+i*(n[0]-e[0]),t[1]=e[1]+i*(n[1]-e[1]),t;}function ge(t,e,n){var i=e[0],r=e[1];return t[0]=n[0]*i+n[2]*r+n[4],t[1]=n[1]*i+n[3]*r+n[5],t;}function ye(t,e,n){return t[0]=Math.min(e[0],n[0]),t[1]=Math.min(e[1],n[1]),t;}function ve(t,e,n){return t[0]=Math.max(e[0],n[0]),t[1]=Math.max(e[1],n[1]),t;}function me(t,e,n,i,r,o){var a=i+"-"+r,s=t.length;if(o.hasOwnProperty(a))return o[a];if(1===e){var l=Math.round(Math.log((1<<s)-1&~r)/am);return t[n][l];}for(var u=i|1<<n,h=n+1;i&1<<h;){h++;}for(var c=0,p=0,f=0;s>p;p++){var d=1<<p;d&r||(c+=(f%2?-1:1)*t[n][p]*me(t,e-1,h,u,r|d,o),f++);}return o[a]=c,c;}function _e(t,e){var n=[[t[0],t[1],1,0,0,0,-e[0]*t[0],-e[0]*t[1]],[0,0,0,t[0],t[1],1,-e[1]*t[0],-e[1]*t[1]],[t[2],t[3],1,0,0,0,-e[2]*t[2],-e[2]*t[3]],[0,0,0,t[2],t[3],1,-e[3]*t[2],-e[3]*t[3]],[t[4],t[5],1,0,0,0,-e[4]*t[4],-e[4]*t[5]],[0,0,0,t[4],t[5],1,-e[5]*t[4],-e[5]*t[5]],[t[6],t[7],1,0,0,0,-e[6]*t[6],-e[6]*t[7]],[0,0,0,t[6],t[7],1,-e[7]*t[6],-e[7]*t[7]]],i={},r=me(n,8,0,0,0,i);if(0!==r){for(var o=[],a=0;8>a;a++){for(var s=0;8>s;s++){null==o[s]&&(o[s]=0),o[s]+=((a+s)%2?-1:1)*me(n,7,0===a?1:0,1<<a,1<<s,i)/r*e[a];}}return function(t,e,n){var i=e*o[6]+n*o[7]+1;t[0]=(e*o[0]+n*o[1]+o[2])/i,t[1]=(e*o[3]+n*o[4]+o[5])/i;};}}function xe(t,e,n,i,r){return be(lm,e,i,r,!0)&&be(t,n,lm[0],lm[1]);}function be(t,e,n,i,r){if(e.getBoundingClientRect&&Rv.domSupported&&!Me(e)){var o=e[sm]||(e[sm]={}),a=we(e,o),s=Se(a,o,r);if(s)return s(t,n,i),!0;}return!1;}function we(t,e){var n=e.markers;if(n)return n;n=e.markers=[];for(var i=["left","right"],r=["top","bottom"],o=0;4>o;o++){var a=document.createElement("div"),s=a.style,l=o%2,u=(o>>1)%2;s.cssText=["position: absolute","visibility: hidden","padding: 0","margin: 0","border-width: 0","user-select: none","width:0","height:0",i[l]+":0",r[u]+":0",i[1-l]+":auto",r[1-u]+":auto",""].join("!important;"),t.appendChild(a),n.push(a);}return n;}function Se(t,e,n){for(var i=n?"invTrans":"trans",r=e[i],o=e.srcCoords,a=[],s=[],l=!0,u=0;4>u;u++){var h=t[u].getBoundingClientRect(),c=2*u,p=h.left,f=h.top;a.push(p,f),l=l&&o&&p===o[c]&&f===o[c+1],s.push(t[u].offsetLeft,t[u].offsetTop);}return l&&r?r:(e.srcCoords=a,e[i]=n?_e(s,a):_e(a,s));}function Me(t){return"CANVAS"===t.nodeName.toUpperCase();}function Te(t,e,n,i){return n=n||{},i||!Rv.canvasSupported?Ce(t,e,n):Rv.browser.firefox&&null!=e.layerX&&e.layerX!==e.offsetX?(n.zrX=e.layerX,n.zrY=e.layerY):null!=e.offsetX?(n.zrX=e.offsetX,n.zrY=e.offsetY):Ce(t,e,n),n;}function Ce(t,e,n){if(Rv.domSupported&&t.getBoundingClientRect){var i=e.clientX,r=e.clientY;if(Me(t)){var o=t.getBoundingClientRect();return n.zrX=i-o.left,void(n.zrY=r-o.top);}if(be(cm,t,i,r))return n.zrX=cm[0],void(n.zrY=cm[1]);}n.zrX=n.zrY=0;}function Ie(t){return t||window.event;}function Ae(t,e,n){if(e=Ie(e),null!=e.zrX)return e;var i=e.type,r=i&&i.indexOf("touch")>=0;if(r){var o="touchend"!==i?e.targetTouches[0]:e.changedTouches[0];o&&Te(t,o,e,n);}else{Te(t,e,e,n);var a=ke(e);e.zrDelta=a?a/120:-(e.detail||0)/3;}var s=e.button;return null==e.which&&void 0!==s&&hm.test(e.type)&&(e.which=1&s?1:2&s?3:4&s?2:0),e;}function ke(t){var e=t.wheelDelta;if(e)return e;var n=t.deltaX,i=t.deltaY;if(null==n||null==i)return e;var r=Math.abs(0!==i?i:n),o=i>0?-1:0>i?1:n>0?-1:1;return 3*r*o;}function De(t,e,n,i){um?t.addEventListener(e,n,i):t.attachEvent("on"+e,n);}function Le(t,e,n,i){um?t.removeEventListener(e,n,i):t.detachEvent("on"+e,n);}function Pe(t){var e=t[1][0]-t[0][0],n=t[1][1]-t[0][1];return Math.sqrt(e*e+n*n);}function Oe(t){return[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2];}function Re(t,e,n){return{type:t,event:n,target:e.target,topTarget:e.topTarget,cancelBubble:!1,offsetX:n.zrX,offsetY:n.zrY,gestureEvent:n.gestureEvent,pinchX:n.pinchX,pinchY:n.pinchY,pinchScale:n.pinchScale,wheelDelta:n.zrDelta,zrByTouch:n.zrByTouch,which:n.which,stop:Ee};}function Ee(){pm(this.event);}function Be(t,e,n){if(t[t.rectHover?"rectContain":"contain"](e,n)){for(var i=t,r=void 0,o=!1;i;){if(i.ignoreClip&&(o=!0),!o){var a=i.getClipPath();if(a&&!a.contain(e,n))return!1;i.silent&&(r=!0);}var s=i.__hostTarget;i=s?s:i.parent;}return r?gm:!0;}return!1;}function ze(t,e,n){var i=t.painter;return 0>e||e>i.getWidth()||0>n||n>i.getHeight();}function Ne(){return[1,0,0,1,0,0];}function Fe(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t;}function Ve(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t;}function He(t,e,n){var i=e[0]*n[0]+e[2]*n[1],r=e[1]*n[0]+e[3]*n[1],o=e[0]*n[2]+e[2]*n[3],a=e[1]*n[2]+e[3]*n[3],s=e[0]*n[4]+e[2]*n[5]+e[4],l=e[1]*n[4]+e[3]*n[5]+e[5];return t[0]=i,t[1]=r,t[2]=o,t[3]=a,t[4]=s,t[5]=l,t;}function Ge(t,e,n){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4]+n[0],t[5]=e[5]+n[1],t;}function We(t,e,n){var i=e[0],r=e[2],o=e[4],a=e[1],s=e[3],l=e[5],u=Math.sin(n),h=Math.cos(n);return t[0]=i*h+a*u,t[1]=-i*u+a*h,t[2]=r*h+s*u,t[3]=-r*u+h*s,t[4]=h*o+u*l,t[5]=h*l-u*o,t;}function Ue(t,e,n){var i=n[0],r=n[1];return t[0]=e[0]*i,t[1]=e[1]*r,t[2]=e[2]*i,t[3]=e[3]*r,t[4]=e[4]*i,t[5]=e[5]*r,t;}function Ye(t,e){var n=e[0],i=e[2],r=e[4],o=e[1],a=e[3],s=e[5],l=n*a-o*i;return l?(l=1/l,t[0]=a*l,t[1]=-o*l,t[2]=-i*l,t[3]=n*l,t[4]=(i*s-a*r)*l,t[5]=(o*r-n*s)*l,t):null;}function Xe(t){var e=Ne();return Ve(e,t),e;}function je(t){return t>Mm||-Mm>t;}function qe(t){return t=Math.round(t),0>t?0:t>255?255:t;}function Ze(t){return t=Math.round(t),0>t?0:t>360?360:t;}function Ke(t){return 0>t?0:t>1?1:t;}function $e(t){var e=t;return qe(e.length&&"%"===e.charAt(e.length-1)?parseFloat(e)/100*255:parseInt(e,10));}function Je(t){var e=t;return Ke(e.length&&"%"===e.charAt(e.length-1)?parseFloat(e)/100:parseFloat(e));}function Qe(t,e,n){return 0>n?n+=1:n>1&&(n-=1),1>6*n?t+(e-t)*n*6:1>2*n?e:2>3*n?t+(e-t)*(2/3-n)*6:t;}function tn(t,e,n){return t+(e-t)*n;}function en(t,e,n,i,r){return t[0]=e,t[1]=n,t[2]=i,t[3]=r,t;}function nn(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t;}function rn(t,e){zm&&nn(zm,e),zm=Bm.put(t,zm||e.slice());}function on(t,e){if(t){e=e||[];var n=Bm.get(t);if(n)return nn(e,n);t+="";var i=t.replace(/ /g,"").toLowerCase();if(i in Em)return nn(e,Em[i]),rn(t,e),e;var r=i.length;if("#"!==i.charAt(0)){var o=i.indexOf("("),a=i.indexOf(")");if(-1!==o&&a+1===r){var s=i.substr(0,o),l=i.substr(o+1,a-(o+1)).split(","),u=1;switch(s){case"rgba":if(4!==l.length)return 3===l.length?en(e,+l[0],+l[1],+l[2],1):en(e,0,0,0,1);u=Je(l.pop());case"rgb":return 3!==l.length?void en(e,0,0,0,1):(en(e,$e(l[0]),$e(l[1]),$e(l[2]),u),rn(t,e),e);case"hsla":return 4!==l.length?void en(e,0,0,0,1):(l[3]=Je(l[3]),an(l,e),rn(t,e),e);case"hsl":return 3!==l.length?void en(e,0,0,0,1):(an(l,e),rn(t,e),e);default:return;}}en(e,0,0,0,1);}else{if(4===r||5===r){var h=parseInt(i.slice(1,4),16);return h>=0&&4095>=h?(en(e,(3840&h)>>4|(3840&h)>>8,240&h|(240&h)>>4,15&h|(15&h)<<4,5===r?parseInt(i.slice(4),16)/15:1),rn(t,e),e):void en(e,0,0,0,1);}if(7===r||9===r){var h=parseInt(i.slice(1,7),16);return h>=0&&16777215>=h?(en(e,(16711680&h)>>16,(65280&h)>>8,255&h,9===r?parseInt(i.slice(7),16)/255:1),rn(t,e),e):void en(e,0,0,0,1);}}}}function an(t,e){var n=(parseFloat(t[0])%360+360)%360/360,i=Je(t[1]),r=Je(t[2]),o=.5>=r?r*(i+1):r+i-r*i,a=2*r-o;return e=e||[],en(e,qe(255*Qe(a,o,n+1/3)),qe(255*Qe(a,o,n)),qe(255*Qe(a,o,n-1/3)),1),4===t.length&&(e[3]=t[3]),e;}function sn(t){if(t){var e,n,i=t[0]/255,r=t[1]/255,o=t[2]/255,a=Math.min(i,r,o),s=Math.max(i,r,o),l=s-a,u=(s+a)/2;if(0===l)e=0,n=0;else{n=.5>u?l/(s+a):l/(2-s-a);var h=((s-i)/6+l/2)/l,c=((s-r)/6+l/2)/l,p=((s-o)/6+l/2)/l;i===s?e=p-c:r===s?e=1/3+h-p:o===s&&(e=2/3+c-h),0>e&&(e+=1),e>1&&(e-=1);}var f=[360*e,n,u];return null!=t[3]&&f.push(t[3]),f;}}function ln(t,e){var n=on(t);if(n){for(var i=0;3>i;i++){n[i]=0>e?n[i]*(1-e)|0:(255-n[i])*e+n[i]|0,n[i]>255?n[i]=255:n[i]<0&&(n[i]=0);}return dn(n,4===n.length?"rgba":"rgb");}}function un(t){var e=on(t);return e?((1<<24)+(e[0]<<16)+(e[1]<<8)+ +e[2]).toString(16).slice(1):void 0;}function hn(t,e,n){if(e&&e.length&&t>=0&&1>=t){n=n||[];var i=t*(e.length-1),r=Math.floor(i),o=Math.ceil(i),a=e[r],s=e[o],l=i-r;return n[0]=qe(tn(a[0],s[0],l)),n[1]=qe(tn(a[1],s[1],l)),n[2]=qe(tn(a[2],s[2],l)),n[3]=Ke(tn(a[3],s[3],l)),n;}}function cn(t,e,n){if(e&&e.length&&t>=0&&1>=t){var i=t*(e.length-1),r=Math.floor(i),o=Math.ceil(i),a=on(e[r]),s=on(e[o]),l=i-r,u=dn([qe(tn(a[0],s[0],l)),qe(tn(a[1],s[1],l)),qe(tn(a[2],s[2],l)),Ke(tn(a[3],s[3],l))],"rgba");return n?{color:u,leftIndex:r,rightIndex:o,value:i}:u;}}function pn(t,e,n,i){var r=on(t);return t?(r=sn(r),null!=e&&(r[0]=Ze(e)),null!=n&&(r[1]=Je(n)),null!=i&&(r[2]=Je(i)),dn(an(r),"rgba")):void 0;}function fn(t,e){var n=on(t);return n&&null!=e?(n[3]=Ke(e),dn(n,"rgba")):void 0;}function dn(t,e){if(t&&t.length){var n=t[0]+","+t[1]+","+t[2];return("rgba"===e||"hsva"===e||"hsla"===e)&&(n+=","+t[3]),e+"("+n+")";}}function gn(t,e){var n=on(t);return n?(.299*n[0]+.587*n[1]+.114*n[2])*n[3]/255+(1-n[3])*e:0;}function yn(){var t=Math.round(255*Math.random()),e=Math.round(255*Math.random()),n=Math.round(255*Math.random());return"rgb("+t+","+e+","+n+")";}function vn(t,e,n){return(e-t)*n+t;}function mn(t,e,n){return n>.5?e:t;}function _n(t,e,n,i){for(var r=e.length,o=0;r>o;o++){t[o]=vn(e[o],n[o],i);}}function xn(t,e,n,i){for(var r=e.length,o=r&&e[0].length,a=0;r>a;a++){t[a]||(t[a]=[]);for(var s=0;o>s;s++){t[a][s]=vn(e[a][s],n[a][s],i);}}}function bn(t,e,n,i){for(var r=e.length,o=0;r>o;o++){t[o]=e[o]+n[o]*i;}return t;}function wn(t,e,n,i){for(var r=e.length,o=r&&e[0].length,a=0;r>a;a++){t[a]||(t[a]=[]);for(var s=0;o>s;s++){t[a][s]=e[a][s]+n[a][s]*i;}}return t;}function Sn(t,e,n){var i=t,r=e;if(i.push&&r.push){var o=i.length,a=r.length;if(o!==a){var s=o>a;if(s)i.length=a;else for(var l=o;a>l;l++){i.push(1===n?r[l]:Hm.call(r[l]));}}for(var u=i[0]&&i[0].length,l=0;l<i.length;l++){if(1===n)isNaN(i[l])&&(i[l]=r[l]);else for(var h=0;u>h;h++){isNaN(i[l][h])&&(i[l][h]=r[l][h]);}}}}function Mn(t,e){var n=t.length;if(n!==e.length)return!1;for(var i=0;n>i;i++){if(t[i]!==e[i])return!1;}return!0;}function Tn(t,e,n,i,r,o,a){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*a+(-3*(e-n)-2*s-l)*o+s*r+e;}function Cn(t,e,n,i,r,o,a,s){for(var l=e.length,u=0;l>u;u++){t[u]=Tn(e[u],n[u],i[u],r[u],o,a,s);}}function In(t,e,n,i,r,o,a,s){for(var l=e.length,u=e[0].length,h=0;l>h;h++){t[h]||(t[1]=[]);for(var c=0;u>c;c++){t[h][c]=Tn(e[h][c],n[h][c],i[h][c],r[h][c],o,a,s);}}}function An(t){if(g(t)){var e=t.length;if(g(t[0])){for(var n=[],i=0;e>i;i++){n.push(Hm.call(t[i]));}return n;}return Hm.call(t);}return t;}function kn(t){return t[0]=Math.floor(t[0]),t[1]=Math.floor(t[1]),t[2]=Math.floor(t[2]),"rgba("+t.join(",")+")";}function Dn(t){return g(t&&t[0])?2:1;}function Ln(t,e){return xm||(xm=jv().getContext("2d")),bm!==e&&(bm=xm.font=e||n_),xm.measureText(t);}function Pn(t,e){e=e||n_;var n=e_[e];n||(n=e_[e]=new Rm(500));var i=n.get(t);return null==i&&(i=i_.measureText(t,e).width,n.put(t,i)),i;}function On(t,e,n,i){var r=Pn(t,e),o=zn(e),a=En(0,r,n),s=Bn(0,o,i),l=new t_(a,s,r,o);return l;}function Rn(t,e,n,i){var r=((t||"")+"").split("\n"),o=r.length;if(1===o)return On(r[0],e,n,i);for(var a=new t_(0,0,0,0),s=0;s<r.length;s++){var l=On(r[s],e,n,i);0===s?a.copy(l):a.union(l);}return a;}function En(t,e,n){return"right"===n?t-=e:"center"===n&&(t-=e/2),t;}function Bn(t,e,n){return"middle"===n?t-=e/2:"bottom"===n&&(t-=e),t;}function zn(t){return Pn("国",t);}function Nn(t,e){return"string"==typeof t?t.lastIndexOf("%")>=0?parseFloat(t)/100*e:parseFloat(t):t;}function Fn(t,e,n){var i=e.position||"inside",r=null!=e.distance?e.distance:5,o=n.height,a=n.width,s=o/2,l=n.x,u=n.y,h="left",c="top";if(i instanceof Array)l+=Nn(i[0],n.width),u+=Nn(i[1],n.height),h=null,c=null;else switch(i){case"left":l-=r,u+=s,h="right",c="middle";break;case"right":l+=r+a,u+=s,c="middle";break;case"top":l+=a/2,u-=r,h="center",c="bottom";break;case"bottom":l+=a/2,u+=o+r,h="center";break;case"inside":l+=a/2,u+=s,h="center",c="middle";break;case"insideLeft":l+=r,u+=s,c="middle";break;case"insideRight":l+=a-r,u+=s,h="right",c="middle";break;case"insideTop":l+=a/2,u+=r,h="center";break;case"insideBottom":l+=a/2,u+=o-r,h="center",c="bottom";break;case"insideTopLeft":l+=r,u+=r;break;case"insideTopRight":l+=a-r,u+=r,h="right";break;case"insideBottomLeft":l+=r,u+=o-r,c="bottom";break;case"insideBottomRight":l+=a-r,u+=o-r,h="right",c="bottom";}return t=t||{},t.x=l,t.y=u,t.align=h,t.verticalAlign=c,t;}function Vn(t,e,n,i,r){n=n||{};var o=[];Un(t,"",t,e,n,i,o,r);var a=o.length,s=!1,l=n.done,u=n.aborted,h=function h(){s=!0,a--,0>=a&&(s?l&&l():u&&u());},c=function c(){a--,0>=a&&(s?l&&l():u&&u());};a||l&&l(),o.length>0&&n.during&&o[0].during(function(t,e){n.during(e);});for(var p=0;p<o.length;p++){var f=o[p];h&&f.done(h),c&&f.aborted(c),f.start(n.easing,n.force);}return o;}function Hn(t,e,n){for(var i=0;n>i;i++){t[i]=e[i];}}function Gn(t){return g(t[0]);}function Wn(t,e,n){if(g(e[n])){if(g(t[n])||(t[n]=[]),L(e[n])){var i=e[n].length;t[n].length!==i&&(t[n]=new e[n].constructor(i),Hn(t[n],e[n],i));}else{var r=e[n],o=t[n],a=r.length;if(Gn(r))for(var s=r[0].length,l=0;a>l;l++){o[l]?Hn(o[l],r[l],s):o[l]=Array.prototype.slice.call(r[l]);}else Hn(o,r,a);o.length=r.length;}}else t[n]=e[n];}function Un(t,e,n,i,r,o,a,s){for(var l=[],u=[],h=b(i),c=r.duration,f=r.delay,d=r.additive,y=r.setToFinal,v=!k(o),m=0;m<h.length;m++){var _=h[m];if(null!=n[_]&&null!=i[_]&&(v||o[_])){if(k(i[_])&&!g(i[_])){if(e){s||(n[_]=i[_],t.updateDuringAnimation(e));continue;}Un(t,_,n[_],i[_],r,o&&o[_],a,s);}else l.push(_),u.push(_);}else s||(n[_]=i[_],t.updateDuringAnimation(e),u.push(_));}var x=l.length;if(x>0||r.force&&!a.length){for(var w=t.animators,S=[],M=0;M<w.length;M++){w[M].targetName===e&&S.push(w[M]);}if(!d&&S.length)for(var M=0;M<S.length;M++){var T=S[M].stopTracks(u);if(T){var C=p(w,S[M]);w.splice(C,1);}}var I=void 0,A=void 0,D=void 0;if(s){A={},y&&(I={});for(var M=0;x>M;M++){var _=l[M];A[_]=n[_],y?I[_]=i[_]:n[_]=i[_];}}else if(y){D={};for(var M=0;x>M;M++){var _=l[M];D[_]=An(n[_]),Wn(n,i,_);}}var L=new Um(n,!1,d?S:null);L.targetName=e,r.scope&&(L.scope=r.scope),y&&I&&L.whenWithKeys(0,I,l),D&&L.whenWithKeys(0,D,l),L.whenWithKeys(null==c?500:c,s?A:i,l).delay(f||0),t.addAnimator(L,e),a.push(L);}}function Yn(t){for(var e=0;t>=v_;){e|=1&t,t>>=1;}return t+e;}function Xn(t,e,n,i){var r=e+1;if(r===n)return 1;if(i(t[r++],t[e])<0){for(;n>r&&i(t[r],t[r-1])<0;){r++;}jn(t,e,r);}else for(;n>r&&i(t[r],t[r-1])>=0;){r++;}return r-e;}function jn(t,e,n){for(n--;n>e;){var i=t[e];t[e++]=t[n],t[n--]=i;}}function qn(t,e,n,i,r){for(i===e&&i++;n>i;i++){for(var o,a=t[i],s=e,l=i;l>s;){o=s+l>>>1,r(a,t[o])<0?l=o:s=o+1;}var u=i-s;switch(u){case 3:t[s+3]=t[s+2];case 2:t[s+2]=t[s+1];case 1:t[s+1]=t[s];break;default:for(;u>0;){t[s+u]=t[s+u-1],u--;}}t[s]=a;}}function Zn(t,e,n,i,r,o){var a=0,s=0,l=1;if(o(t,e[n+r])>0){for(s=i-r;s>l&&o(t,e[n+r+l])>0;){a=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s),a+=r,l+=r;}else{for(s=r+1;s>l&&o(t,e[n+r-l])<=0;){a=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s);var u=a;a=r-l,l=r-u;}for(a++;l>a;){var h=a+(l-a>>>1);o(t,e[n+h])>0?a=h+1:l=h;}return l;}function Kn(t,e,n,i,r,o){var a=0,s=0,l=1;if(o(t,e[n+r])<0){for(s=r+1;s>l&&o(t,e[n+r-l])<0;){a=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s);var u=a;a=r-l,l=r-u;}else{for(s=i-r;s>l&&o(t,e[n+r+l])>=0;){a=l,l=(l<<1)+1,0>=l&&(l=s);}l>s&&(l=s),a+=r,l+=r;}for(a++;l>a;){var h=a+(l-a>>>1);o(t,e[n+h])<0?l=h:a=h+1;}return l;}function $n(t,e){function n(t,e){l[c]=t,u[c]=e,c+=1;}function i(){for(;c>1;){var t=c-2;if(t>=1&&u[t-1]<=u[t]+u[t+1]||t>=2&&u[t-2]<=u[t]+u[t-1])u[t-1]<u[t+1]&&t--;else if(u[t]>u[t+1])break;o(t);}}function r(){for(;c>1;){var t=c-2;t>0&&u[t-1]<u[t+1]&&t--,o(t);}}function o(n){var i=l[n],r=u[n],o=l[n+1],h=u[n+1];u[n]=r+h,n===c-3&&(l[n+1]=l[n+2],u[n+1]=u[n+2]),c--;var p=Kn(t[o],t,i,r,0,e);i+=p,r-=p,0!==r&&(h=Zn(t[i+r-1],t,o,h,h-1,e),0!==h&&(h>=r?a(i,r,o,h):s(i,r,o,h)));}function a(n,i,r,o){var a=0;for(a=0;i>a;a++){p[a]=t[n+a];}var s=0,l=r,u=n;if(t[u++]=t[l++],0!==--o){if(1===i){for(a=0;o>a;a++){t[u+a]=t[l+a];}return void(t[u+o]=p[s]);}for(var c,f,d,g=h;;){c=0,f=0,d=!1;do{if(e(t[l],p[s])<0){if(t[u++]=t[l++],f++,c=0,0===--o){d=!0;break;}}else if(t[u++]=p[s++],c++,f=0,1===--i){d=!0;break;}}while(g>(c|f));if(d)break;do{if(c=Kn(t[l],p,s,i,0,e),0!==c){for(a=0;c>a;a++){t[u+a]=p[s+a];}if(u+=c,s+=c,i-=c,1>=i){d=!0;break;}}if(t[u++]=t[l++],0===--o){d=!0;break;}if(f=Zn(p[s],t,l,o,0,e),0!==f){for(a=0;f>a;a++){t[u+a]=t[l+a];}if(u+=f,l+=f,o-=f,0===o){d=!0;break;}}if(t[u++]=p[s++],1===--i){d=!0;break;}g--;}while(c>=m_||f>=m_);if(d)break;0>g&&(g=0),g+=2;}if(h=g,1>h&&(h=1),1===i){for(a=0;o>a;a++){t[u+a]=t[l+a];}t[u+o]=p[s];}else{if(0===i)throw new Error();for(a=0;i>a;a++){t[u+a]=p[s+a];}}}else for(a=0;i>a;a++){t[u+a]=p[s+a];}}function s(n,i,r,o){var a=0;for(a=0;o>a;a++){p[a]=t[r+a];}var s=n+i-1,l=o-1,u=r+o-1,c=0,f=0;if(t[u--]=t[s--],0!==--i){if(1===o){for(u-=i,s-=i,f=u+1,c=s+1,a=i-1;a>=0;a--){t[f+a]=t[c+a];}return void(t[u]=p[l]);}for(var d=h;;){var g=0,y=0,v=!1;do{if(e(p[l],t[s])<0){if(t[u--]=t[s--],g++,y=0,0===--i){v=!0;break;}}else if(t[u--]=p[l--],y++,g=0,1===--o){v=!0;break;}}while(d>(g|y));if(v)break;do{if(g=i-Kn(p[l],t,n,i,i-1,e),0!==g){for(u-=g,s-=g,i-=g,f=u+1,c=s+1,a=g-1;a>=0;a--){t[f+a]=t[c+a];}if(0===i){v=!0;break;}}if(t[u--]=p[l--],1===--o){v=!0;break;}if(y=o-Zn(t[s],p,0,o,o-1,e),0!==y){for(u-=y,l-=y,o-=y,f=u+1,c=l+1,a=0;y>a;a++){t[f+a]=p[c+a];}if(1>=o){v=!0;break;}}if(t[u--]=t[s--],0===--i){v=!0;break;}d--;}while(g>=m_||y>=m_);if(v)break;0>d&&(d=0),d+=2;}if(h=d,1>h&&(h=1),1===o){for(u-=i,s-=i,f=u+1,c=s+1,a=i-1;a>=0;a--){t[f+a]=t[c+a];}t[u]=p[l];}else{if(0===o)throw new Error();for(c=u-(o-1),a=0;o>a;a++){t[c+a]=p[a];}}}else for(c=u-(o-1),a=0;o>a;a++){t[c+a]=p[a];}}var l,u,h=m_,c=0,p=[];return l=[],u=[],{mergeRuns:i,forceMergeRuns:r,pushRun:n};}function Jn(t,e,n,i){n||(n=0),i||(i=t.length);var r=i-n;if(!(2>r)){var o=0;if(v_>r)return o=Xn(t,n,i,e),void qn(t,n,i,n+o,e);var a=$n(t,e),s=Yn(r);do{if(o=Xn(t,n,i,e),s>o){var l=r;l>s&&(l=s),qn(t,n,n+l,n+o,e),o=l;}a.pushRun(n,o),a.mergeRuns(),r-=o,n+=o;}while(0!==r);a.forceMergeRuns();}}function Qn(){__||(__=!0,console.warn("z / z2 / zlevel of displayable is invalid, which may cause unexpected errors"));}function ti(t,e){return t.zlevel===e.zlevel?t.z===e.z?t.z2-e.z2:t.z-e.z:t.zlevel-e.zlevel;}function ei(t){var e=t.pointerType;return"pen"===e||"touch"===e;}function ni(t){t.touching=!0,null!=t.touchTimer&&(clearTimeout(t.touchTimer),t.touchTimer=null),t.touchTimer=setTimeout(function(){t.touching=!1,t.touchTimer=null;},700);}function ii(t){t&&(t.zrByTouch=!0);}function ri(t,e){return Ae(t.dom,new A_(t,e),!0);}function oi(t,e){for(var n=e,i=!1;n&&9!==n.nodeType&&!(i=n.domBelongToZr||n!==e&&n===t.painterRoot);){n=n.parentNode;}return i;}function ai(t,e){var n=e.domHandlers;Rv.pointerEventsSupported?y(T_.pointer,function(i){li(e,i,function(e){n[i].call(t,e);});}):(Rv.touchEventsSupported&&y(T_.touch,function(i){li(e,i,function(r){n[i].call(t,r),ni(e);});}),y(T_.mouse,function(i){li(e,i,function(r){r=Ie(r),e.touching||n[i].call(t,r);});}));}function si(t,e){function n(n){function i(i){i=Ie(i),oi(t,i.target)||(i=ri(t,i),e.domHandlers[n].call(t,i));}li(e,n,i,{capture:!0});}Rv.pointerEventsSupported?y(C_.pointer,n):Rv.touchEventsSupported||y(C_.mouse,n);}function li(t,e,n,i){t.mounted[e]=n,t.listenerOpts[e]=i,De(t.domTarget,e,n,i);}function ui(t){var e=t.mounted;for(var n in e){e.hasOwnProperty(n)&&Le(t.domTarget,n,e[n],t.listenerOpts[n]);}t.mounted={};}function hi(t){delete B_[t];}function ci(t){if(!t)return!1;if("string"==typeof t)return gn(t,1)<a_;if(t.colorStops){for(var e=t.colorStops,n=0,i=e.length,r=0;i>r;r++){n+=gn(e[r].color,1);}return n/=i,a_>n;}return!1;}function pi(t,e){var n=new z_(o(),t,e);return B_[n.id]=n,n;}function fi(t){t.dispose();}function di(){for(var t in B_){B_.hasOwnProperty(t)&&B_[t].dispose();}B_={};}function gi(t){return B_[t];}function yi(t,e){E_[t]=e;}function vi(t){return t.replace(/^\s+|\s+$/g,"");}function mi(t,e,n,i){var r=e[1]-e[0],o=n[1]-n[0];if(0===r)return 0===o?n[0]:(n[0]+n[1])/2;if(i){if(r>0){if(t<=e[0])return n[0];if(t>=e[1])return n[1];}else{if(t>=e[0])return n[0];if(t<=e[1])return n[1];}}else{if(t===e[0])return n[0];if(t===e[1])return n[1];}return(t-e[0])/r*o+n[0];}function _i(t,e){switch(t){case"center":case"middle":t="50%";break;case"left":case"top":t="0%";break;case"right":case"bottom":t="100%";}return"string"==typeof t?vi(t).match(/%$/)?parseFloat(t)/100*e:parseFloat(t):null==t?0/0:+t;}function xi(t,e,n){return null==e&&(e=10),e=Math.min(Math.max(0,e),20),t=(+t).toFixed(e),n?t:+t;}function bi(t){return t.sort(function(t,e){return t-e;}),t;}function wi(t){if(t=+t,isNaN(t))return 0;for(var e=1,n=0;Math.round(t*e)/e!==t;){e*=10,n++;}return n;}function Si(t){var e=t.toString(),n=e.indexOf("e");if(n>0){var i=+e.slice(n+1);return 0>i?-i:0;}var r=e.indexOf(".");return 0>r?0:e.length-1-r;}function Mi(t,e){var n=Math.log,i=Math.LN10,r=Math.floor(n(t[1]-t[0])/i),o=Math.round(n(Math.abs(e[1]-e[0]))/i),a=Math.min(Math.max(-r+o,0),20);return isFinite(a)?a:20;}function Ti(t,e,n){if(!t[e])return 0;var i=m(t,function(t,e){return t+(isNaN(e)?0:e);},0);if(0===i)return 0;for(var r=Math.pow(10,n),o=v(t,function(t){return(isNaN(t)?0:t)/i*r*100;}),a=100*r,s=v(o,function(t){return Math.floor(t);}),l=m(s,function(t,e){return t+e;},0),u=v(o,function(t,e){return t-s[e];});a>l;){for(var h=Number.NEGATIVE_INFINITY,c=null,p=0,f=u.length;f>p;++p){u[p]>h&&(h=u[p],c=p);}++s[c],u[c]=0,++l;}return s[e]/r;}function Ci(t){var e=2*Math.PI;return(t%e+e)%e;}function Ii(t){return t>-V_&&V_>t;}function Ai(t){if(t instanceof Date)return t;if("string"==typeof t){var e=G_.exec(t);if(!e)return new Date(0/0);if(e[8]){var n=+e[4]||0;return"Z"!==e[8].toUpperCase()&&(n-=+e[8].slice(0,3)),new Date(Date.UTC(+e[1],+(e[2]||1)-1,+e[3]||1,n,+(e[5]||0),+e[6]||0,+e[7]||0));}return new Date(+e[1],+(e[2]||1)-1,+e[3]||1,+e[4]||0,+(e[5]||0),+e[6]||0,+e[7]||0);}return new Date(null==t?0/0:Math.round(t));}function ki(t){return Math.pow(10,Di(t));}function Di(t){if(0===t)return 0;var e=Math.floor(Math.log(t)/Math.LN10);return t/Math.pow(10,e)>=10&&e++,e;}function Li(t,e){var n,i=Di(t),r=Math.pow(10,i),o=t/r;return n=e?1.5>o?1:2.5>o?2:4>o?3:7>o?5:10:1>o?1:2>o?2:3>o?3:5>o?5:10,t=n*r,i>=-20?+t.toFixed(0>i?-i:0):t;}function Pi(t,e){var n=(t.length-1)*e+1,i=Math.floor(n),r=+t[i-1],o=n-i;return o?r+o*(t[i]-r):r;}function Oi(t){function e(t,n,i){return t.interval[i]<n.interval[i]||t.interval[i]===n.interval[i]&&(t.close[i]-n.close[i]===(i?-1:1)||!i&&e(t,n,1));}t.sort(function(t,n){return e(t,n,0)?-1:1;});for(var n=-1/0,i=1,r=0;r<t.length;){for(var o=t[r].interval,a=t[r].close,s=0;2>s;s++){o[s]<=n&&(o[s]=n,a[s]=s?1:1-i),n=o[s],i=a[s];}o[0]===o[1]&&a[0]*a[1]!==1?t.splice(r,1):r++;}return t;}function Ri(t){var e=parseFloat(t);return e==t&&(0!==e||"string"!=typeof t||t.indexOf("x")<=0)?e:0/0;}function Ei(t){return!isNaN(Ri(t));}function Bi(){return Math.round(9*Math.random());}function zi(t,e){return 0===e?t:zi(e,t%e);}function Ni(t,e){return null==t?e:null==e?t:t*e/zi(t,e);}function Fi(t){throw new Error(t);}function Vi(t){return t instanceof Array?t:null==t?[]:[t];}function Hi(t,e,n){if(t){t[e]=t[e]||{},t.emphasis=t.emphasis||{},t.emphasis[e]=t.emphasis[e]||{};for(var i=0,r=n.length;r>i;i++){var o=n[i];!t.emphasis[e].hasOwnProperty(o)&&t[e].hasOwnProperty(o)&&(t.emphasis[e][o]=t[e][o]);}}}function Gi(t){return!k(t)||M(t)||t instanceof Date?t:t.value;}function Wi(t){return k(t)&&!(t instanceof Array);}function Ui(t,e,n){var i="normalMerge"===n,r="replaceMerge"===n,o="replaceAll"===n;t=t||[],e=(e||[]).slice();var a=X();y(e,function(t,n){return k(t)?void 0:void(e[n]=null);});var s=Yi(t,a,n);return(i||r)&&Xi(s,t,a,e),i&&ji(s,e),i||r?qi(s,e,r):o&&Zi(s,e),Ki(s),s;}function Yi(t,e,n){var i=[];if("replaceAll"===n)return i;for(var r=0;r<t.length;r++){var o=t[r];o&&null!=o.id&&e.set(o.id,r),i.push({existing:"replaceMerge"===n||er(o)?null:o,newOption:null,keyInfo:null,brandNew:null});}return i;}function Xi(t,e,n,i){y(i,function(r,o){if(r&&null!=r.id){var a=Ji(r.id),s=n.get(a);if(null!=s){var l=t[s];G(!l.newOption,'Duplicated option on id "'+a+'".'),l.newOption=r,l.existing=e[s],i[o]=null;}}});}function ji(t,e){y(e,function(n,i){if(n&&null!=n.name)for(var r=0;r<t.length;r++){var o=t[r].existing;if(!t[r].newOption&&o&&(null==o.id||null==n.id)&&!er(n)&&!er(o)&&$i("name",o,n))return t[r].newOption=n,void(e[i]=null);}});}function qi(t,e,n){y(e,function(e){if(e){for(var i,r=0;(i=t[r])&&(i.newOption||er(i.existing)||i.existing&&null!=e.id&&!$i("id",e,i.existing));){r++;}i?(i.newOption=e,i.brandNew=n):t.push({newOption:e,brandNew:n,existing:null,keyInfo:null}),r++;}});}function Zi(t,e){y(e,function(e){t.push({newOption:e,brandNew:!0,existing:null,keyInfo:null});});}function Ki(t){var e=X();y(t,function(t){var n=t.existing;n&&e.set(n.id,t);}),y(t,function(t){var n=t.newOption;G(!n||null==n.id||!e.get(n.id)||e.get(n.id)===t,"id duplicates: "+(n&&n.id)),n&&null!=n.id&&e.set(n.id,t),!t.keyInfo&&(t.keyInfo={});}),y(t,function(t,n){var i=t.existing,r=t.newOption,o=t.keyInfo;if(k(r)){if(o.name=null!=r.name?Ji(r.name):i?i.name:W_+n,i)o.id=Ji(i.id);else if(null!=r.id)o.id=Ji(r.id);else{var a=0;do{o.id="\x00"+o.name+"\x00"+a++;}while(e.get(o.id));}e.set(o.id,t);}});}function $i(t,e,n){var i=Qi(e[t],null),r=Qi(n[t],null);return null!=i&&null!=r&&i===r;}function Ji(t){return Qi(t,"");}function Qi(t,e){if(null==t)return e;var n=typeof t;return"string"===n?t:"number"===n||I(t)?t+"":e;}function tr(t){var e=t.name;return!(!e||!e.indexOf(W_));}function er(t){return t&&null!=t.id&&0===Ji(t.id).indexOf(U_);}function nr(t,e,n){y(t,function(t){var i=t.newOption;k(i)&&(t.keyInfo.mainType=e,t.keyInfo.subType=ir(e,i,t.existing,n));
});}function ir(t,e,n,i){var r=e.type?e.type:n?n.subType:i.determineSubType(t,e);return r;}function rr(t,e){return null!=e.dataIndexInside?e.dataIndexInside:null!=e.dataIndex?M(e.dataIndex)?v(e.dataIndex,function(e){return t.indexOfRawIndex(e);}):t.indexOfRawIndex(e.dataIndex):null!=e.name?M(e.name)?v(e.name,function(e){return t.indexOfName(e);}):t.indexOfName(e.name):void 0;}function or(){var t="__ec_inner_"+X_++;return function(e){return e[t]||(e[t]={});};}function ar(t,e,n){var i=sr(e,n),r=i.mainTypeSpecified,o=i.queryOptionMap,a=i.others,s=a,l=n?n.defaultMainType:null;return!r&&l&&o.set(l,{}),o.each(function(e,i){var r=lr(t,i,e,{useDefault:l===i,enableAll:n&&null!=n.enableAll?n.enableAll:!0,enableNone:n&&null!=n.enableNone?n.enableNone:!0});s[i+"Models"]=r.models,s[i+"Model"]=r.models[0];}),s;}function sr(t,e){var n;if(C(t)){var i={};i[t+"Index"]=0,n=i;}else n=t;var r=X(),o={},a=!1;return y(n,function(t,n){if("dataIndex"===n||"dataIndexInside"===n)return void(o[n]=t);var i=n.match(/^(\w+)(Index|Id|Name)$/)||[],s=i[1],l=(i[2]||"").toLowerCase();if(s&&l&&!(e&&e.includeMainTypes&&p(e.includeMainTypes,s)<0)){a=a||!!s;var u=r.get(s)||r.set(s,{});u[l]=t;}}),{mainTypeSpecified:a,queryOptionMap:r,others:o};}function lr(t,e,n,i){i=i||j_;var r=n.index,o=n.id,a=n.name,s={models:null,specified:null!=r||null!=o||null!=a};if(!s.specified){var l=void 0;return s.models=i.useDefault&&(l=t.getComponent(e))?[l]:[],s;}return"none"===r||r===!1?(G(i.enableNone,'`"none"` or `false` is not a valid value on index option.'),s.models=[],s):("all"===r&&(G(i.enableAll,'`"all"` is not a valid value on index option.'),r=o=a=null),s.models=t.queryComponents({mainType:e,index:r,id:o,name:a}),s);}function ur(t,e,n){t.setAttribute?t.setAttribute(e,n):t[e]=n;}function hr(t,e){return t.getAttribute?t.getAttribute(e):t[e];}function cr(t){return"auto"===t?Rv.domSupported?"html":"richText":t||"html";}function pr(t,e,n,i,r){var o=null==e||"auto"===e;if(null==i)return i;if("number"==typeof i){var a=vn(n||0,i,r);return xi(a,o?Math.max(Si(n||0),Si(i)):e);}if("string"==typeof i)return 1>r?n:i;for(var s=[],l=n,u=i,h=Math.max(l?l.length:0,u.length),c=0;h>c;++c){var p=t.getDimensionInfo(c);if("ordinal"===p.type)s[c]=(1>r&&l?l:u)[c];else{var f=l&&l[c]?l[c]:0,d=u[c],a=vn(f,d,r);s[c]=xi(a,o?Math.max(Si(f),Si(d)):e);}}return s;}function fr(t){var e={main:"",sub:""};if(t){var n=t.split(q_);e.main=n[0]||"",e.sub=n[1]||"";}return e;}function dr(t){G(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t),'componentType "'+t+'" illegal');}function gr(t){return!(!t||!t[K_]);}function yr(t){t.$constructor=t,t.extend=function(t){function e(){for(var r=[],o=0;o<arguments.length;o++){r[o]=arguments[o];}if(t.$constructor)t.$constructor.apply(this,arguments);else{if(vr(i)){var a=q(e.prototype,new(i.bind.apply(i,n([void 0],r)))());return a;}i.apply(this,arguments);}}var i=this;return e[K_]=!0,h(e.prototype,t),e.extend=this.extend,e.superCall=xr,e.superApply=br,f(e,this),e.superClass=i,e;};}function vr(t){return"function"==typeof t&&/^class\s/.test(Function.prototype.toString.call(t));}function mr(t,e){t.extend=e.extend;}function _r(t){var e=["__\x00is_clz",$_++].join("_");t.prototype[e]=!0,t.isInstance=function(t){return!(!t||!t[e]);};}function xr(t,e){for(var n=[],i=2;i<arguments.length;i++){n[i-2]=arguments[i];}return this.superClass.prototype[e].apply(t,n);}function br(t,e,n){return this.superClass.prototype[e].apply(t,n);}function wr(t){function e(t){var e=n[t.main];return e&&e[Z_]||(e=n[t.main]={},e[Z_]=!0),e;}var n={};t.registerClass=function(t){var i=t.type||t.prototype.type;if(i){dr(i),t.prototype.type=i;var r=fr(i);if(r.sub){if(r.sub!==Z_){var o=e(r);o[r.sub]=t;}}else n[r.main]=t;}return t;},t.getClass=function(t,e,i){var r=n[t];if(r&&r[Z_]&&(r=e?r[e]:null),i&&!r)throw new Error(e?"Component "+t+"."+(e||"")+" is used but not imported.":t+".type should be specified.");return r;},t.getClassesByMainType=function(t){var e=fr(t),i=[],r=n[e.main];return r&&r[Z_]?y(r,function(t,e){e!==Z_&&i.push(t);}):i.push(r),i;},t.hasClass=function(t){var e=fr(t);return!!n[e.main];},t.getAllClassMainTypes=function(){var t=[];return y(n,function(e,n){t.push(n);}),t;},t.hasSubTypes=function(t){var e=fr(t),i=n[e.main];return i&&i[Z_];};}function Sr(t,e){for(var n=0;n<t.length;n++){t[n][1]||(t[n][1]=t[n][0]);}return e=e||!1,function(n,i,r){for(var o={},a=0;a<t.length;a++){var s=t[a][1];if(!(i&&p(i,s)>=0||r&&p(r,s)<0)){var l=n.getShallow(s,e);null!=l&&(o[t[a][0]]=l);}}return o;};}function Mr(t){if("string"==typeof t){var e=ex.get(t);return e&&e.image;}return t;}function Tr(t,e,n,i,r){if(t){if("string"==typeof t){if(e&&e.__zrImageSrc===t||!n)return e;var o=ex.get(t),a={hostEl:n,cb:i,cbPayload:r};return o?(e=o.image,!Ir(e)&&o.pending.push(a)):(e=new Image(),e.onload=e.onerror=Cr,ex.put(t,e.__cachedImgObj={image:e,pending:[a]}),e.src=e.__zrImageSrc=t),e;}return t;}return e;}function Cr(){var t=this.__cachedImgObj;this.onload=this.onerror=this.__cachedImgObj=null;for(var e=0;e<t.pending.length;e++){var n=t.pending[e],i=n.cb;i&&i(this,n.cbPayload),n.hostEl.dirty();}t.pending.length=0;}function Ir(t){return t&&t.width&&t.height;}function Ar(t,e,n,i,r){if(!e)return"";var o=(t+"").split("\n");r=kr(e,n,i,r);for(var a=0,s=o.length;s>a;a++){o[a]=Dr(o[a],r);}return o.join("\n");}function kr(t,e,n,i){i=i||{};var r=h({},i);r.font=e,n=N(n,"..."),r.maxIterations=N(i.maxIterations,2);var o=r.minChar=N(i.minChar,0);r.cnCharWidth=Pn("国",e);var a=r.ascCharWidth=Pn("a",e);r.placeholder=N(i.placeholder,"");for(var s=t=Math.max(0,t-1),l=0;o>l&&s>=a;l++){s-=a;}var u=Pn(n,e);return u>s&&(n="",u=0),s=t-u,r.ellipsis=n,r.ellipsisWidth=u,r.contentWidth=s,r.containerWidth=t,r;}function Dr(t,e){var n=e.containerWidth,i=e.font,r=e.contentWidth;if(!n)return"";var o=Pn(t,i);if(n>=o)return t;for(var a=0;;a++){if(r>=o||a>=e.maxIterations){t+=e.ellipsis;break;}var s=0===a?Lr(t,r,e.ascCharWidth,e.cnCharWidth):o>0?Math.floor(t.length*r/o):0;t=t.substr(0,s),o=Pn(t,i);}return""===t&&(t=e.placeholder),t;}function Lr(t,e,n,i){for(var r=0,o=0,a=t.length;a>o&&e>r;o++){var s=t.charCodeAt(o);r+=s>=0&&127>=s?n:i;}return o;}function Pr(t,e){null!=t&&(t+="");var n,i=e.overflow,r=e.padding,o=e.font,a="truncate"===i,s=zn(o),l=N(e.lineHeight,s),u="truncate"===e.lineOverflow,h=e.width;n=null!=h&&"break"===i||"breakAll"===i?t?zr(t,e.font,h,"breakAll"===i,0).lines:[]:t?t.split("\n"):[];var c=n.length*l,p=N(e.height,c);if(c>p&&u){var f=Math.floor(p/l);n=n.slice(0,f);}var d=p,g=h;if(r&&(d+=r[0]+r[2],null!=g&&(g+=r[1]+r[3])),t&&a&&null!=g)for(var y=kr(h,o,e.ellipsis,{minChar:e.truncateMinChar,placeholder:e.placeholder}),v=0;v<n.length;v++){n[v]=Dr(n[v],y);}if(null==h){for(var m=0,v=0;v<n.length;v++){m=Math.max(Pn(n[v],o),m);}h=m;}return{lines:n,height:p,outerHeight:d,lineHeight:l,calculatedLineHeight:s,contentHeight:c,width:h};}function Or(t,e){function n(t,e,n){t.width=e,t.lineHeight=n,p+=n,f=Math.max(f,e);}var i=new ox();if(null!=t&&(t+=""),!t)return i;for(var r,o=e.width,a=e.height,s=e.overflow,l="break"!==s&&"breakAll"!==s||null==o?null:{width:o,accumWidth:0,breakAll:"breakAll"===s},u=nx.lastIndex=0;null!=(r=nx.exec(t));){var h=r.index;h>u&&Rr(i,t.substring(u,h),e,l),Rr(i,r[2],e,l,r[1]),u=nx.lastIndex;}u<t.length&&Rr(i,t.substring(u,t.length),e,l);var c=[],p=0,f=0,d=e.padding,g="truncate"===s,y="truncate"===e.lineOverflow;t:for(var v=0;v<i.lines.length;v++){for(var m=i.lines[v],_=0,x=0,b=0;b<m.tokens.length;b++){var w=m.tokens[b],S=w.styleName&&e.rich[w.styleName]||{},M=w.textPadding=S.padding,T=M?M[1]+M[3]:0,C=w.font=S.font||e.font;w.contentHeight=zn(C);var I=N(S.height,w.contentHeight);if(w.innerHeight=I,M&&(I+=M[0]+M[2]),w.height=I,w.lineHeight=F(S.lineHeight,e.lineHeight,I),w.align=S&&S.align||e.align,w.verticalAlign=S&&S.verticalAlign||"middle",y&&null!=a&&p+w.lineHeight>a){b>0?(m.tokens=m.tokens.slice(0,b),n(m,x,_),i.lines=i.lines.slice(0,v+1)):i.lines=i.lines.slice(0,v);break t;}var A=S.width,k=null==A||"auto"===A;if("string"==typeof A&&"%"===A.charAt(A.length-1))w.percentWidth=A,c.push(w),w.contentWidth=Pn(w.text,C);else{if(k){var D=S.backgroundColor,L=D&&D.image;L&&(L=Mr(L),Ir(L)&&(w.width=Math.max(w.width,L.width*I/L.height)));}var P=g&&null!=o?o-x:null;null!=P&&P<w.width?!k||T>P?(w.text="",w.width=w.contentWidth=0):(w.text=Ar(w.text,P-T,C,e.ellipsis,{minChar:e.truncateMinChar}),w.width=w.contentWidth=Pn(w.text,C)):w.contentWidth=Pn(w.text,C);}w.width+=T,x+=w.width,S&&(_=Math.max(_,w.lineHeight));}n(m,x,_);}i.outerWidth=i.width=N(o,f),i.outerHeight=i.height=N(a,p),i.contentHeight=p,i.contentWidth=f,d&&(i.outerWidth+=d[1]+d[3],i.outerHeight+=d[0]+d[2]);for(var v=0;v<c.length;v++){var w=c[v],O=w.percentWidth;w.width=parseInt(O,10)/100*i.width;}return i;}function Rr(t,e,n,i,r){var o,a,s=""===e,l=r&&n.rich[r]||{},u=t.lines,h=l.font||n.font,c=!1;if(i){var p=l.padding,f=p?p[1]+p[3]:0;if(null!=l.width&&"auto"!==l.width){var d=Nn(l.width,i.width)+f;u.length>0&&d+i.accumWidth>i.width&&(o=e.split("\n"),c=!0),i.accumWidth=d;}else{var g=zr(e,h,i.width,i.breakAll,i.accumWidth);i.accumWidth=g.accumWidth+f,a=g.linesWidths,o=g.lines;}}else o=e.split("\n");for(var y=0;y<o.length;y++){var v=o[y],m=new ix();if(m.styleName=r,m.text=v,m.isLineHolder=!v&&!s,m.width="number"==typeof l.width?l.width:a?a[y]:Pn(v,h),y||c)u.push(new rx([m]));else{var _=(u[u.length-1]||(u[0]=new rx())).tokens,x=_.length;1===x&&_[0].isLineHolder?_[0]=m:(v||!x||s)&&_.push(m);}}}function Er(t){var e=t.charCodeAt(0);return e>=33&&255>=e;}function Br(t){return Er(t)?ax[t]?!0:!1:!0;}function zr(t,e,n,i,r){for(var o=[],a=[],s="",l="",u=0,h=0,c=0;c<t.length;c++){var p=t.charAt(c);if("\n"!==p){var f=Pn(p,e),d=i?!1:!Br(p);(o.length?h+f>n:r+h+f>n)?h?(s||l)&&(d?(s||(s=l,l="",u=0,h=u),o.push(s),a.push(h-u),l+=p,u+=f,s="",h=u):(l&&(s+=l,h+=u,l="",u=0),o.push(s),a.push(h),s=p,h=f)):d?(o.push(l),a.push(u),l=p,u=f):(o.push(p),a.push(f)):(h+=f,d?(l+=p,u+=f):(l&&(s+=l,l="",u=0),s+=p));}else l&&(s+=l,h+=u),o.push(s),a.push(h),s="",l="",u=0,h=0;}return o.length||s||(s=t,l="",u=0),l&&(s+=l),s&&(o.push(s),a.push(h)),1===o.length&&(h+=r),{accumWidth:h,lines:o,linesWidths:a};}function Nr(t,e,n){return px.copy(t.getBoundingRect()),t.transform&&px.applyTransform(t.transform),fx.width=e,fx.height=n,!px.intersect(fx);}function Fr(t){return t>-yx&&yx>t;}function Vr(t){return t>yx||-yx>t;}function Hr(t,e,n,i,r){var o=1-r;return o*o*(o*t+3*r*e)+r*r*(r*i+3*o*n);}function Gr(t,e,n,i,r){var o=1-r;return 3*(((e-t)*o+2*(n-e)*r)*o+(i-n)*r*r);}function Wr(t,e,n,i,r,o){var a=i+3*(e-n)-t,s=3*(n-2*e+t),l=3*(e-t),u=t-r,h=s*s-3*a*l,c=s*l-9*a*u,p=l*l-3*s*u,f=0;if(Fr(h)&&Fr(c)){if(Fr(s))o[0]=0;else{var d=-l/s;d>=0&&1>=d&&(o[f++]=d);}}else{var g=c*c-4*h*p;if(Fr(g)){var y=c/h,d=-s/a+y,v=-y/2;d>=0&&1>=d&&(o[f++]=d),v>=0&&1>=v&&(o[f++]=v);}else if(g>0){var m=gx(g),_=h*s+1.5*a*(-c+m),x=h*s+1.5*a*(-c-m);_=0>_?-dx(-_,_x):dx(_,_x),x=0>x?-dx(-x,_x):dx(x,_x);var d=(-s-(_+x))/(3*a);d>=0&&1>=d&&(o[f++]=d);}else{var b=(2*h*s-3*a*c)/(2*gx(h*h*h)),w=Math.acos(b)/3,S=gx(h),M=Math.cos(w),d=(-s-2*S*M)/(3*a),v=(-s+S*(M+mx*Math.sin(w)))/(3*a),T=(-s+S*(M-mx*Math.sin(w)))/(3*a);d>=0&&1>=d&&(o[f++]=d),v>=0&&1>=v&&(o[f++]=v),T>=0&&1>=T&&(o[f++]=T);}}return f;}function Ur(t,e,n,i,r){var o=6*n-12*e+6*t,a=9*e+3*i-3*t-9*n,s=3*e-3*t,l=0;if(Fr(a)){if(Vr(o)){var u=-s/o;u>=0&&1>=u&&(r[l++]=u);}}else{var h=o*o-4*a*s;if(Fr(h))r[0]=-o/(2*a);else if(h>0){var c=gx(h),u=(-o+c)/(2*a),p=(-o-c)/(2*a);u>=0&&1>=u&&(r[l++]=u),p>=0&&1>=p&&(r[l++]=p);}}return l;}function Yr(t,e,n,i,r,o){var a=(e-t)*r+t,s=(n-e)*r+e,l=(i-n)*r+n,u=(s-a)*r+a,h=(l-s)*r+s,c=(h-u)*r+u;o[0]=t,o[1]=a,o[2]=u,o[3]=c,o[4]=c,o[5]=h,o[6]=l,o[7]=i;}function Xr(t,e,n,i,r,o,a,s,l,u,h){var c,p,f,d,g,y=.005,v=1/0;xx[0]=l,xx[1]=u;for(var m=0;1>m;m+=.05){bx[0]=Hr(t,n,r,a,m),bx[1]=Hr(e,i,o,s,m),d=em(xx,bx),v>d&&(c=m,v=d);}v=1/0;for(var _=0;32>_&&!(vx>y);_++){p=c-y,f=c+y,bx[0]=Hr(t,n,r,a,p),bx[1]=Hr(e,i,o,s,p),d=em(bx,xx),p>=0&&v>d?(c=p,v=d):(Sx[0]=Hr(t,n,r,a,f),Sx[1]=Hr(e,i,o,s,f),g=em(Sx,xx),1>=f&&v>g?(c=f,v=g):y*=.5);}return h&&(h[0]=Hr(t,n,r,a,c),h[1]=Hr(e,i,o,s,c)),gx(v);}function jr(t,e,n,i,r,o,a,s,l){for(var u=t,h=e,c=0,p=1/l,f=1;l>=f;f++){var d=f*p,g=Hr(t,n,r,a,d),y=Hr(e,i,o,s,d),v=g-u,m=y-h;c+=Math.sqrt(v*v+m*m),u=g,h=y;}return c;}function qr(t,e,n,i){var r=1-i;return r*(r*t+2*i*e)+i*i*n;}function Zr(t,e,n,i){return 2*((1-i)*(e-t)+i*(n-e));}function Kr(t,e,n,i,r){var o=t-2*e+n,a=2*(e-t),s=t-i,l=0;if(Fr(o)){if(Vr(a)){var u=-s/a;u>=0&&1>=u&&(r[l++]=u);}}else{var h=a*a-4*o*s;if(Fr(h)){var u=-a/(2*o);u>=0&&1>=u&&(r[l++]=u);}else if(h>0){var c=gx(h),u=(-a+c)/(2*o),p=(-a-c)/(2*o);u>=0&&1>=u&&(r[l++]=u),p>=0&&1>=p&&(r[l++]=p);}}return l;}function $r(t,e,n){var i=t+n-2*e;return 0===i?.5:(t-e)/i;}function Jr(t,e,n,i,r){var o=(e-t)*i+t,a=(n-e)*i+e,s=(a-o)*i+o;r[0]=t,r[1]=o,r[2]=s,r[3]=s,r[4]=a,r[5]=n;}function Qr(t,e,n,i,r,o,a,s,l){var u,h=.005,c=1/0;xx[0]=a,xx[1]=s;for(var p=0;1>p;p+=.05){bx[0]=qr(t,n,r,p),bx[1]=qr(e,i,o,p);var f=em(xx,bx);c>f&&(u=p,c=f);}c=1/0;for(var d=0;32>d&&!(vx>h);d++){var g=u-h,y=u+h;bx[0]=qr(t,n,r,g),bx[1]=qr(e,i,o,g);var f=em(bx,xx);if(g>=0&&c>f)u=g,c=f;else{Sx[0]=qr(t,n,r,y),Sx[1]=qr(e,i,o,y);var v=em(Sx,xx);1>=y&&c>v?(u=y,c=v):h*=.5;}}return l&&(l[0]=qr(t,n,r,u),l[1]=qr(e,i,o,u)),gx(c);}function to(t,e,n,i,r,o,a){for(var s=t,l=e,u=0,h=1/a,c=1;a>=c;c++){var p=c*h,f=qr(t,n,r,p),d=qr(e,i,o,p),g=f-s,y=d-l;u+=Math.sqrt(g*g+y*y),s=f,l=d;}return u;}function eo(t,e,n){if(0!==t.length){for(var i=t[0],r=i[0],o=i[0],a=i[1],s=i[1],l=1;l<t.length;l++){i=t[l],r=Mx(r,i[0]),o=Tx(o,i[0]),a=Mx(a,i[1]),s=Tx(s,i[1]);}e[0]=r,e[1]=a,n[0]=o,n[1]=s;}}function no(t,e,n,i,r,o){r[0]=Mx(t,n),r[1]=Mx(e,i),o[0]=Tx(t,n),o[1]=Tx(e,i);}function io(t,e,n,i,r,o,a,s,l,u){var h=Ur,c=Hr,p=h(t,n,r,a,Px);l[0]=1/0,l[1]=1/0,u[0]=-1/0,u[1]=-1/0;for(var f=0;p>f;f++){var d=c(t,n,r,a,Px[f]);l[0]=Mx(d,l[0]),u[0]=Tx(d,u[0]);}p=h(e,i,o,s,Ox);for(var f=0;p>f;f++){var g=c(e,i,o,s,Ox[f]);l[1]=Mx(g,l[1]),u[1]=Tx(g,u[1]);}l[0]=Mx(t,l[0]),u[0]=Tx(t,u[0]),l[0]=Mx(a,l[0]),u[0]=Tx(a,u[0]),l[1]=Mx(e,l[1]),u[1]=Tx(e,u[1]),l[1]=Mx(s,l[1]),u[1]=Tx(s,u[1]);}function ro(t,e,n,i,r,o,a,s){var l=$r,u=qr,h=Tx(Mx(l(t,n,r),1),0),c=Tx(Mx(l(e,i,o),1),0),p=u(t,n,r,h),f=u(e,i,o,c);a[0]=Mx(t,r,p),a[1]=Mx(e,o,f),s[0]=Tx(t,r,p),s[1]=Tx(e,o,f);}function oo(t,e,n,i,r,o,a,s,l){var u=ye,h=ve,c=Math.abs(r-o);if(1e-4>c%Ax&&c>1e-4)return s[0]=t-n,s[1]=e-i,l[0]=t+n,void(l[1]=e+i);if(kx[0]=Ix(r)*n+t,kx[1]=Cx(r)*i+e,Dx[0]=Ix(o)*n+t,Dx[1]=Cx(o)*i+e,u(s,kx,Dx),h(l,kx,Dx),r%=Ax,0>r&&(r+=Ax),o%=Ax,0>o&&(o+=Ax),r>o&&!a?o+=Ax:o>r&&a&&(r+=Ax),a){var p=o;o=r,r=p;}for(var f=0;o>f;f+=Math.PI/2){f>r&&(Lx[0]=Ix(f)*n+t,Lx[1]=Cx(f)*i+e,u(s,Lx,s),h(l,Lx,l));}}function ao(t){var e=Math.round(t/jx*1e8)/1e8;return e%2*jx;}function so(t,e){var n=ao(t[0]);0>n&&(n+=qx);var i=n-t[0],r=t[1];r+=i,!e&&r-n>=qx?r=n+qx:e&&n-r>=qx?r=n-qx:!e&&n>r?r=n+(qx-ao(n-r)):e&&r>n&&(r=n-(qx-ao(r-n))),t[0]=n,t[1]=r;}function lo(t,e,n,i,r,o,a){if(0===r)return!1;var s=r,l=0,u=t;if(a>e+s&&a>i+s||e-s>a&&i-s>a||o>t+s&&o>n+s||t-s>o&&n-s>o)return!1;if(t===n)return Math.abs(o-t)<=s/2;l=(e-i)/(t-n),u=(t*i-n*e)/(t-n);var h=l*o-a+u,c=h*h/(l*l+1);return s/2*s/2>=c;}function uo(t,e,n,i,r,o,a,s,l,u,h){if(0===l)return!1;var c=l;if(h>e+c&&h>i+c&&h>o+c&&h>s+c||e-c>h&&i-c>h&&o-c>h&&s-c>h||u>t+c&&u>n+c&&u>r+c&&u>a+c||t-c>u&&n-c>u&&r-c>u&&a-c>u)return!1;var p=Xr(t,e,n,i,r,o,a,s,u,h,null);return c/2>=p;}function ho(t,e,n,i,r,o,a,s,l){if(0===a)return!1;var u=a;if(l>e+u&&l>i+u&&l>o+u||e-u>l&&i-u>l&&o-u>l||s>t+u&&s>n+u&&s>r+u||t-u>s&&n-u>s&&r-u>s)return!1;var h=Qr(t,e,n,i,r,o,s,l,null);return u/2>=h;}function co(t){return t%=Jx,0>t&&(t+=Jx),t;}function po(t,e,n,i,r,o,a,s,l){if(0===a)return!1;var u=a;s-=t,l-=e;var h=Math.sqrt(s*s+l*l);if(h-u>n||n>h+u)return!1;if(Math.abs(i-r)%Qx<1e-4)return!0;if(o){var c=i;i=co(r),r=co(c);}else i=co(i),r=co(r);i>r&&(r+=Qx);var p=Math.atan2(l,s);return 0>p&&(p+=Qx),p>=i&&r>=p||p+Qx>=i&&r>=p+Qx;}function fo(t,e,n,i,r,o){if(o>e&&o>i||e>o&&i>o)return 0;if(i===e)return 0;var a=(o-e)/(i-e),s=e>i?1:-1;(1===a||0===a)&&(s=e>i?.5:-.5);var l=a*(n-t)+t;return l===r?1/0:l>r?s:0;}function go(t,e){return Math.abs(t-e)<nb;}function yo(){var t=rb[0];rb[0]=rb[1],rb[1]=t;}function vo(t,e,n,i,r,o,a,s,l,u){if(u>e&&u>i&&u>o&&u>s||e>u&&i>u&&o>u&&s>u)return 0;var h=Wr(e,i,o,s,u,ib);if(0===h)return 0;for(var c=0,p=-1,f=void 0,d=void 0,g=0;h>g;g++){var y=ib[g],v=0===y||1===y?.5:1,m=Hr(t,n,r,a,y);l>m||(0>p&&(p=Ur(e,i,o,s,rb),rb[1]<rb[0]&&p>1&&yo(),f=Hr(e,i,o,s,rb[0]),p>1&&(d=Hr(e,i,o,s,rb[1]))),c+=2===p?y<rb[0]?e>f?v:-v:y<rb[1]?f>d?v:-v:d>s?v:-v:y<rb[0]?e>f?v:-v:f>s?v:-v);}return c;}function mo(t,e,n,i,r,o,a,s){if(s>e&&s>i&&s>o||e>s&&i>s&&o>s)return 0;var l=Kr(e,i,o,s,ib);if(0===l)return 0;var u=$r(e,i,o);if(u>=0&&1>=u){for(var h=0,c=qr(e,i,o,u),p=0;l>p;p++){var f=0===ib[p]||1===ib[p]?.5:1,d=qr(t,n,r,ib[p]);a>d||(h+=ib[p]<u?e>c?f:-f:c>o?f:-f);}return h;}var f=0===ib[0]||1===ib[0]?.5:1,d=qr(t,n,r,ib[0]);return a>d?0:e>o?f:-f;}function _o(t,e,n,i,r,o,a,s){if(s-=e,s>n||-n>s)return 0;var l=Math.sqrt(n*n-s*s);ib[0]=-l,ib[1]=l;var u=Math.abs(i-r);if(1e-4>u)return 0;if(u>=eb-1e-4){i=0,r=eb;var h=o?1:-1;return a>=ib[0]+t&&a<=ib[1]+t?h:0;}if(i>r){var c=i;i=r,r=c;}0>i&&(i+=eb,r+=eb);for(var p=0,f=0;2>f;f++){var d=ib[f];if(d+t>a){var g=Math.atan2(s,d),h=o?1:-1;0>g&&(g=eb+g),(g>=i&&r>=g||g+eb>=i&&r>=g+eb)&&(g>Math.PI/2&&g<1.5*Math.PI&&(h=-h),p+=h);}}return p;}function xo(t,e,n,i,r){for(var o,a,s=t.data,l=t.len(),u=0,h=0,c=0,p=0,f=0,d=0;l>d;){var g=s[d++],y=1===d;switch(g===tb.M&&d>1&&(n||(u+=fo(h,c,p,f,i,r))),y&&(h=s[d],c=s[d+1],p=h,f=c),g){case tb.M:p=s[d++],f=s[d++],h=p,c=f;break;case tb.L:if(n){if(lo(h,c,s[d],s[d+1],e,i,r))return!0;}else u+=fo(h,c,s[d],s[d+1],i,r)||0;h=s[d++],c=s[d++];break;case tb.C:if(n){if(uo(h,c,s[d++],s[d++],s[d++],s[d++],s[d],s[d+1],e,i,r))return!0;}else u+=vo(h,c,s[d++],s[d++],s[d++],s[d++],s[d],s[d+1],i,r)||0;h=s[d++],c=s[d++];break;case tb.Q:if(n){if(ho(h,c,s[d++],s[d++],s[d],s[d+1],e,i,r))return!0;}else u+=mo(h,c,s[d++],s[d++],s[d],s[d+1],i,r)||0;h=s[d++],c=s[d++];break;case tb.A:var v=s[d++],m=s[d++],_=s[d++],x=s[d++],b=s[d++],w=s[d++];d+=1;var S=!!(1-s[d++]);o=Math.cos(b)*_+v,a=Math.sin(b)*x+m,y?(p=o,f=a):u+=fo(h,c,o,a,i,r);var M=(i-v)*x/_+v;if(n){if(po(v,m,x,b,b+w,S,e,M,r))return!0;}else u+=_o(v,m,x,b,b+w,S,M,r);h=Math.cos(b+w)*_+v,c=Math.sin(b+w)*x+m;break;case tb.R:p=h=s[d++],f=c=s[d++];var T=s[d++],C=s[d++];if(o=p+T,a=f+C,n){if(lo(p,f,o,f,e,i,r)||lo(o,f,o,a,e,i,r)||lo(o,a,p,a,e,i,r)||lo(p,a,p,f,e,i,r))return!0;}else u+=fo(o,f,o,a,i,r),u+=fo(p,a,p,f,i,r);break;case tb.Z:if(n){if(lo(h,c,p,f,e,i,r))return!0;}else u+=fo(h,c,p,f,i,r);h=p,c=f;}}return n||go(c,f)||(u+=fo(h,c,p,f,i,r)||0),0!==u;}function bo(t,e,n){return xo(t,0,!1,e,n);}function wo(t,e,n,i){return xo(t,e,!0,n,i);}function So(t){return!!(t&&"string"!=typeof t&&t.width&&t.height);}function Mo(t,e){var n,i,r,o,a=e.x,s=e.y,l=e.width,u=e.height,h=e.r;0>l&&(a+=l,l=-l),0>u&&(s+=u,u=-u),"number"==typeof h?n=i=r=o=h:h instanceof Array?1===h.length?n=i=r=o=h[0]:2===h.length?(n=r=h[0],i=o=h[1]):3===h.length?(n=h[0],i=o=h[1],r=h[2]):(n=h[0],i=h[1],r=h[2],o=h[3]):n=i=r=o=0;var c;n+i>l&&(c=n+i,n*=l/c,i*=l/c),r+o>l&&(c=r+o,r*=l/c,o*=l/c),i+r>u&&(c=i+r,i*=u/c,r*=u/c),n+o>u&&(c=n+o,n*=u/c,o*=u/c),t.moveTo(a+n,s),t.lineTo(a+l-i,s),0!==i&&t.arc(a+l-i,s+i,i,-Math.PI/2,0),t.lineTo(a+l,s+u-r),0!==r&&t.arc(a+l-r,s+u-r,r,0,Math.PI/2),t.lineTo(a+o,s+u),0!==o&&t.arc(a+o,s+u-o,o,Math.PI/2,Math.PI),t.lineTo(a,s+n),0!==n&&t.arc(a+n,s+n,n,Math.PI,1.5*Math.PI);}function To(t,e,n){if(e){var i=e.x1,r=e.x2,o=e.y1,a=e.y2;t.x1=i,t.x2=r,t.y1=o,t.y2=a;var s=n&&n.lineWidth;return s?(db(2*i)===db(2*r)&&(t.x1=t.x2=Io(i,s,!0)),db(2*o)===db(2*a)&&(t.y1=t.y2=Io(o,s,!0)),t):t;}}function Co(t,e,n){if(e){var i=e.x,r=e.y,o=e.width,a=e.height;t.x=i,t.y=r,t.width=o,t.height=a;var s=n&&n.lineWidth;return s?(t.x=Io(i,s,!0),t.y=Io(r,s,!0),t.width=Math.max(Io(i+o,s,!1)-t.x,0===o?0:1),t.height=Math.max(Io(r+a,s,!1)-t.y,0===a?0:1),t):t;}}function Io(t,e,n){if(!e)return t;var i=db(2*t);return(i+db(e))%2===0?i/2:(i+(n?1:-1))/2;}function Ao(t){return ko(t),y(t.rich,ko),t;}function ko(t){if(t){t.font=bb.makeFont(t);var e=t.align;"middle"===e&&(e="center"),t.align=null==e||wb[e]?e:"left";var n=t.verticalAlign;"center"===n&&(n="middle"),t.verticalAlign=null==n||Sb[n]?n:"top";var i=t.padding;i&&(t.padding=H(t.padding));}}function Do(t,e){return null==t||0>=e||"transparent"===t||"none"===t?null:t.image||t.colorStops?"#000":t;}function Lo(t){return null==t||"none"===t?null:t.image||t.colorStops?"#000":t;}function Po(t,e,n){return"right"===e?t-n[1]:"center"===e?t+n[3]/2-n[1]/2:t+n[3];}function Oo(t){var e=t.text;return null!=e&&(e+=""),e;}function Ro(t){return!!(t.backgroundColor||t.borderWidth&&t.borderColor);}function Eo(t){return null!=t&&"none"!==t;}function Bo(t){if("string"!=typeof t)return t;var e=Vb.get(t);return e||(e=ln(t,-.1),Vb.put(t,e)),e;}function zo(t,e,n){t.onHoverStateChange&&(t.hoverState||0)!==n&&t.onHoverStateChange(e),t.hoverState=n;}function No(t){zo(t,"emphasis",Db);}function Fo(t){t.hoverState===Db&&zo(t,"normal",Ab);}function Vo(t){zo(t,"blur",kb);}function Ho(t){t.hoverState===kb&&zo(t,"normal",Ab);}function Go(t){t.selected=!0;}function Wo(t){t.selected=!1;}function Uo(t,e,n){e(t,n);}function Yo(t,e,n){Uo(t,e,n),t.isGroup&&t.traverse(function(t){Uo(t,e,n);});}function Xo(t,e){switch(e){case"emphasis":t.hoverState=Db;break;case"normal":t.hoverState=Ab;break;case"blur":t.hoverState=kb;break;case"select":t.selected=!0;}}function jo(t,e,n,i){for(var r=t.style,o={},a=0;a<e.length;a++){var s=e[a],l=r[s];o[s]=null==l?i&&i[s]:l;}for(var a=0;a<t.animators.length;a++){var u=t.animators[a];u.__fromStateTransition&&u.__fromStateTransition.indexOf(n)<0&&"style"===u.targetName&&u.saveFinalToTarget(o,e);}return o;}function qo(t,e,n,i){var r=n&&p(n,"select")>=0,o=!1;if(t instanceof lb){var a=Ib(t),s=r?a.selectFill||a.normalFill:a.normalFill,l=r?a.selectStroke||a.normalStroke:a.normalStroke;if(Eo(s)||Eo(l)){i=i||{};var u=i.style||{};!Eo(u.fill)&&Eo(s)?(o=!0,i=h({},i),u=h({},u),u.fill=Bo(s)):!Eo(u.stroke)&&Eo(l)&&(o||(i=h({},i),u=h({},u)),u.stroke=Bo(l)),i.style=u;}}if(i&&null==i.z2){o||(i=h({},i));var c=t.z2EmphasisLift;i.z2=t.z2+(null!=c?c:Ob);}return i;}function Zo(t,e,n){if(n&&null==n.z2){n=h({},n);var i=t.z2SelectLift;n.z2=t.z2+(null!=i?i:Rb);}return n;}function Ko(t,e,n){var i=p(t.currentStates,e)>=0,r=t.style.opacity,o=i?null:jo(t,["opacity"],e,{opacity:1});n=n||{};var a=n.style||{};return null==a.opacity&&(n=h({},n),a=h({opacity:i?r:.1*o.opacity},a),n.style=a),n;}function $o(t,e){var n=this.states[t];if(this.style){if("emphasis"===t)return qo(this,t,e,n);if("blur"===t)return Ko(this,t,n);if("select"===t)return Zo(this,t,n);}return n;}function Jo(t){t.stateProxy=$o;var e=t.getTextContent(),n=t.getTextGuideLine();e&&(e.stateProxy=$o),n&&(n.stateProxy=$o);}function Qo(t,e){!sa(t,e)&&!t.__highByOuter&&Yo(t,No);}function ta(t,e){!sa(t,e)&&!t.__highByOuter&&Yo(t,Fo);}function ea(t,e){t.__highByOuter|=1<<(e||0),Yo(t,No);}function na(t,e){!(t.__highByOuter&=~(1<<(e||0)))&&Yo(t,Fo);}function ia(t){Yo(t,Vo);}function ra(t){Yo(t,Ho);}function oa(t){Yo(t,Go);}function aa(t){Yo(t,Wo);}function sa(t,e){return t.__highDownSilentOnTouch&&e.zrByTouch;}function la(t){var e=t.getModel();e.eachComponent(function(e,n){var i="series"===e?t.getViewOfSeriesModel(n):t.getViewOfComponentModel(n);i.group.traverse(function(t){Ho(t);});});}function ua(t,e,n,i){function r(t,e){for(var n=0;n<e.length;n++){var i=t.getItemGraphicEl(e[n]);i&&ra(i);}}var o=i.getModel();if(n=n||"coordinateSystem",null!=t&&e&&"none"!==e){var a=o.getSeriesByIndex(t),s=a.coordinateSystem;s&&s.master&&(s=s.master);var l=[];o.eachSeries(function(t){var o=a===t,u=t.coordinateSystem;u&&u.master&&(u=u.master);var h=u&&s?u===s:o;if(!("series"===n&&!o||"coordinateSystem"===n&&!h||"series"===e&&o)){var c=i.getViewOfSeriesModel(t);if(c.group.traverse(function(t){Vo(t);}),g(e))r(t.getData(),e);else if(k(e))for(var p=b(e),f=0;f<p.length;f++){r(t.getData(p[f]),e[p[f]]);}l.push(t);}}),o.eachComponent(function(t,e){if("series"!==t){var n=i.getViewOfComponentModel(e);n&&n.blurSeries&&n.blurSeries(l,o);}});}}function ha(t,e,n){if(null!=t&&null!=e){var i=n.getModel().getComponent(t,e);if(i){var r=n.getViewOfComponentModel(i);r&&r.focusBlurEnabled&&r.group.traverse(function(t){Vo(t);});}}}function ca(t,e,n){var i=t.seriesIndex,r=t.getData(e.dataType),o=rr(r,e);o=(M(o)?o[0]:o)||0;var a=r.getItemGraphicEl(o);if(!a)for(var s=r.count(),l=0;!a&&s>l;){a=r.getItemGraphicEl(l++);}if(a){var u=Mb(a);ua(i,u.focus,u.blurScope,n);}else{var h=t.get(["emphasis","focus"]),c=t.get(["emphasis","blurScope"]);null!=h&&ua(i,h,c,n);}}function pa(t,e,n,i){var r={focusSelf:!1,dispatchers:null};if(null==t||"series"===t||null==e||null==n)return r;var o=i.getModel().getComponent(t,e);if(!o)return r;var a=i.getViewOfComponentModel(o);if(!a||!a.findHighDownDispatchers)return r;for(var s,l=a.findHighDownDispatchers(n),u=0;u<l.length;u++){if("self"===Mb(l[u]).focus){s=!0;break;}}return{focusSelf:s,dispatchers:l};}function fa(t,e,n){var i=Mb(t),r=pa(i.componentMainType,i.componentIndex,i.componentHighDownName,n),o=r.dispatchers,a=r.focusSelf;o?(a&&ha(i.componentMainType,i.componentIndex,n),y(o,function(t){return Qo(t,e);})):(ua(i.seriesIndex,i.focus,i.blurScope,n),"self"===i.focus&&ha(i.componentMainType,i.componentIndex,n),Qo(t,e));}function da(t,e,n){la(n);var i=Mb(t),r=pa(i.componentMainType,i.componentIndex,i.componentHighDownName,n).dispatchers;r?y(r,function(t){return ta(t,e);}):ta(t,e);}function ga(t,e){if(Ma(e)){var n=e.dataType,i=t.getData(n),r=rr(i,e);M(r)||(r=[r]),t[e.type===Fb?"toggleSelect":e.type===zb?"select":"unselect"](r,n);}}function ya(t){var e=t.getAllData();y(e,function(e){var n=e.data,i=e.type;n.eachItemGraphicEl(function(e,n){t.isSelected(n,i)?oa(e):aa(e);});});}function va(t){var e=[];return t.eachSeries(function(t){var n=t.getAllData();y(n,function(n){var i=(n.data,n.type),r=t.getSelectedDataIndices();if(r.length>0){var o={dataIndex:r,seriesIndex:t.seriesIndex};null!=i&&(o.dataType=i),e.push(o);}});}),e;}function ma(t,e,n){ba(t,!0),Yo(t,Jo),_a(t,e,n);}function _a(t,e,n){var i=Mb(t);null!=e?(i.focus=e,i.blurScope=n):i.focus&&(i.focus=null);}function xa(t,e,n,i){n=n||"itemStyle";for(var r=0;r<Hb.length;r++){var o=Hb[r],a=e.getModel([o,n]),s=t.ensureState(o);s.style=i?i(a):a[Gb[n]]();}}function ba(t,e){var n=e===!1,i=t;t.highDownSilentOnTouch&&(i.__highDownSilentOnTouch=t.highDownSilentOnTouch),(!n||i.__highDownDispatcher)&&(i.__highByOuter=i.__highByOuter||0,i.__highDownDispatcher=!n);}function wa(t){return!(!t||!t.__highDownDispatcher);}function Sa(t){var e=Cb[t];return null==e&&32>=Tb&&(e=Cb[t]=Tb++),e;}function Ma(t){var e=t.type;return e===zb||e===Nb||e===Fb;}function Ta(t){var e=t.type;return e===Eb||e===Bb;}function Ca(t){var e=Ib(t);e.normalFill=t.style.fill,e.normalStroke=t.style.stroke;var n=t.states.select||{};e.selectFill=n.style&&n.style.fill||null,e.selectStroke=n.style&&n.style.stroke||null;}function Ia(t,e){var n,i,r,o,a,s,l=t.data,u=t.len(),h=Wb.M,c=Wb.C,p=Wb.L,f=Wb.R,d=Wb.A,g=Wb.Q;for(r=0,o=0;u>r;){switch(n=l[r++],o=r,i=0,n){case h:i=1;break;case p:i=1;break;case c:i=3;break;case g:i=2;break;case d:var y=e[4],v=e[5],m=Yb(e[0]*e[0]+e[1]*e[1]),_=Yb(e[2]*e[2]+e[3]*e[3]),x=Xb(-e[1]/_,e[0]/m);l[r]*=m,l[r++]+=y,l[r]*=_,l[r++]+=v,l[r++]*=m,l[r++]*=_,l[r++]+=x,l[r++]+=x,r+=2,o=r;break;case f:s[0]=l[r++],s[1]=l[r++],ge(s,s,e),l[o++]=s[0],l[o++]=s[1],s[0]+=l[r++],s[1]+=l[r++],ge(s,s,e),l[o++]=s[0],l[o++]=s[1];}for(a=0;i>a;a++){var b=Ub[a];b[0]=l[r++],b[1]=l[r++],ge(b,b,e),l[o++]=b[0],l[o++]=b[1];}}t.increaseVersion();}function Aa(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1]);}function ka(t,e){return(t[0]*e[0]+t[1]*e[1])/(Aa(t)*Aa(e));}function Da(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(ka(t,e));}function La(t,e,n,i,r,o,a,s,l,u,h){var c=l*(Kb/180),p=Zb(c)*(t-n)/2+qb(c)*(e-i)/2,f=-1*qb(c)*(t-n)/2+Zb(c)*(e-i)/2,d=p*p/(a*a)+f*f/(s*s);d>1&&(a*=jb(d),s*=jb(d));var g=(r===o?-1:1)*jb((a*a*s*s-a*a*f*f-s*s*p*p)/(a*a*f*f+s*s*p*p))||0,y=g*a*f/s,v=g*-s*p/a,m=(t+n)/2+Zb(c)*y-qb(c)*v,_=(e+i)/2+qb(c)*y+Zb(c)*v,x=Da([1,0],[(p-y)/a,(f-v)/s]),b=[(p-y)/a,(f-v)/s],w=[(-1*p-y)/a,(-1*f-v)/s],S=Da(b,w);if(ka(b,w)<=-1&&(S=Kb),ka(b,w)>=1&&(S=0),0>S){var M=Math.round(S/Kb*1e6)/1e6;S=2*Kb+M%2*Kb;}h.addData(u,m,_,a,s,x,S,c,o);}function Pa(t){var e=new $x();if(!t)return e;var n,i=0,r=0,o=i,a=r,s=$x.CMD,l=t.match($b);if(!l)return e;for(var u=0;u<l.length;u++){for(var h=l[u],c=h.charAt(0),p=void 0,f=h.match(Jb)||[],d=f.length,g=0;d>g;g++){f[g]=parseFloat(f[g]);}for(var y=0;d>y;){var v=void 0,m=void 0,_=void 0,x=void 0,b=void 0,w=void 0,S=void 0,M=i,T=r,C=void 0,I=void 0;switch(c){case"l":i+=f[y++],r+=f[y++],p=s.L,e.addData(p,i,r);break;case"L":i=f[y++],r=f[y++],p=s.L,e.addData(p,i,r);break;case"m":i+=f[y++],r+=f[y++],p=s.M,e.addData(p,i,r),o=i,a=r,c="l";break;case"M":i=f[y++],r=f[y++],p=s.M,e.addData(p,i,r),o=i,a=r,c="L";break;case"h":i+=f[y++],p=s.L,e.addData(p,i,r);break;case"H":i=f[y++],p=s.L,e.addData(p,i,r);break;case"v":r+=f[y++],p=s.L,e.addData(p,i,r);break;case"V":r=f[y++],p=s.L,e.addData(p,i,r);break;case"C":p=s.C,e.addData(p,f[y++],f[y++],f[y++],f[y++],f[y++],f[y++]),i=f[y-2],r=f[y-1];break;case"c":p=s.C,e.addData(p,f[y++]+i,f[y++]+r,f[y++]+i,f[y++]+r,f[y++]+i,f[y++]+r),i+=f[y-2],r+=f[y-1];break;case"S":v=i,m=r,C=e.len(),I=e.data,n===s.C&&(v+=i-I[C-4],m+=r-I[C-3]),p=s.C,M=f[y++],T=f[y++],i=f[y++],r=f[y++],e.addData(p,v,m,M,T,i,r);break;case"s":v=i,m=r,C=e.len(),I=e.data,n===s.C&&(v+=i-I[C-4],m+=r-I[C-3]),p=s.C,M=i+f[y++],T=r+f[y++],i+=f[y++],r+=f[y++],e.addData(p,v,m,M,T,i,r);break;case"Q":M=f[y++],T=f[y++],i=f[y++],r=f[y++],p=s.Q,e.addData(p,M,T,i,r);break;case"q":M=f[y++]+i,T=f[y++]+r,i+=f[y++],r+=f[y++],p=s.Q,e.addData(p,M,T,i,r);break;case"T":v=i,m=r,C=e.len(),I=e.data,n===s.Q&&(v+=i-I[C-4],m+=r-I[C-3]),i=f[y++],r=f[y++],p=s.Q,e.addData(p,v,m,i,r);break;case"t":v=i,m=r,C=e.len(),I=e.data,n===s.Q&&(v+=i-I[C-4],m+=r-I[C-3]),i+=f[y++],r+=f[y++],p=s.Q,e.addData(p,v,m,i,r);break;case"A":_=f[y++],x=f[y++],b=f[y++],w=f[y++],S=f[y++],M=i,T=r,i=f[y++],r=f[y++],p=s.A,La(M,T,i,r,w,S,_,x,b,p,e);break;case"a":_=f[y++],x=f[y++],b=f[y++],w=f[y++],S=f[y++],M=i,T=r,i+=f[y++],r+=f[y++],p=s.A,La(M,T,i,r,w,S,_,x,b,p,e);}}("z"===c||"Z"===c)&&(p=s.Z,e.addData(p),i=o,r=a),n=p;}return e.toStatic(),e;}function Oa(t){return null!=t.setData;}function Ra(t,e){var n=Pa(t),i=h({},e);return i.buildPath=function(t){if(Oa(t)){t.setData(n.data);var e=t.getContext();e&&t.rebuildPath(e,1);}else{var e=t;n.rebuildPath(e,1);}},i.applyTransform=function(t){Ia(n,t),this.dirtyShape();},i;}function Ea(t,e){return new Qb(Ra(t,e));}function Ba(t,n){var i=Ra(t,n),r=function(t){function n(e){var n=t.call(this,e)||this;return n.applyTransform=i.applyTransform,n.buildPath=i.buildPath,n;}return e(n,t),n;}(Qb);return r;}function za(t,e){for(var n=[],i=t.length,r=0;i>r;r++){var o=t[r];o.path||o.createPathProxy(),o.shapeChanged()&&o.buildPath(o.path,o.shape,!0),n.push(o.path);}var a=new lb(e);return a.createPathProxy(),a.buildPath=function(t){if(Oa(t)){t.appendPath(n);var e=t.getContext();e&&t.rebuildPath(e,1);}},a;}function Na(t,e,n,i,r,o,a,s){var l=n-t,u=i-e,h=a-r,c=s-o,p=c*l-h*u;return dw>p*p?void 0:(p=(h*(e-o)-c*(t-r))/p,[t+p*l,e+p*u]);}function Fa(t,e,n,i,r,o,a){var s=t-n,l=e-i,u=(a?o:-o)/cw(s*s+l*l),h=u*l,c=-u*s,p=t+h,f=e+c,d=n+h,g=i+c,y=(p+d)/2,v=(f+g)/2,m=d-p,_=g-f,x=m*m+_*_,b=r-o,w=p*g-d*f,S=(0>_?-1:1)*cw(pw(0,b*b*x-w*w)),M=(w*_-m*S)/x,T=(-w*m-_*S)/x,C=(w*_+m*S)/x,I=(-w*m+_*S)/x,A=M-y,k=T-v,D=C-y,L=I-v;return A*A+k*k>D*D+L*L&&(M=C,T=I),{cx:M,cy:T,x01:-h,y01:-c,x11:M*(r/b-1),y11:T*(r/b-1)};}function Va(t,e){var n=pw(e.r,0),i=pw(e.r0||0,0),r=n>0,o=i>0;if(r||o){if(r||(n=i,i=0),i>n){var a=n;n=i,i=a;}var s,l=!!e.clockwise,u=e.startAngle,h=e.endAngle;if(u===h)s=0;else{var c=[u,h];so(c,!l),s=hw(c[0]-c[1]);}var p=e.cx,f=e.cy,d=e.cornerRadius||0,g=e.innerCornerRadius||0;if(n>dw){if(s>ow-dw)t.moveTo(p+n*sw(u),f+n*aw(u)),t.arc(p,f,n,u,h,!l),i>dw&&(t.moveTo(p+i*sw(h),f+i*aw(h)),t.arc(p,f,i,h,u,l));else{var y=hw(n-i)/2,v=fw(y,d),m=fw(y,g),_=m,x=v,b=n*sw(u),w=n*aw(u),S=i*sw(h),M=i*aw(h),T=void 0,C=void 0,I=void 0,A=void 0;if((v>dw||m>dw)&&(T=n*sw(h),C=n*aw(h),I=i*sw(u),A=i*aw(u),rw>s)){var k=Na(b,w,I,A,T,C,S,M);if(k){var D=b-k[0],L=w-k[1],P=T-k[0],O=C-k[1],R=1/aw(lw((D*P+L*O)/(cw(D*D+L*L)*cw(P*P+O*O)))/2),E=cw(k[0]*k[0]+k[1]*k[1]);_=fw(m,(i-E)/(R-1)),x=fw(v,(n-E)/(R+1));}}if(s>dw){if(x>dw){var B=Fa(I,A,b,w,n,x,l),z=Fa(T,C,S,M,n,x,l);
t.moveTo(p+B.cx+B.x01,f+B.cy+B.y01),v>x?t.arc(p+B.cx,f+B.cy,x,uw(B.y01,B.x01),uw(z.y01,z.x01),!l):(t.arc(p+B.cx,f+B.cy,x,uw(B.y01,B.x01),uw(B.y11,B.x11),!l),t.arc(p,f,n,uw(B.cy+B.y11,B.cx+B.x11),uw(z.cy+z.y11,z.cx+z.x11),!l),t.arc(p+z.cx,f+z.cy,x,uw(z.y11,z.x11),uw(z.y01,z.x01),!l));}else t.moveTo(p+b,f+w),t.arc(p,f,n,u,h,!l);}else t.moveTo(p+b,f+w);if(i>dw&&s>dw){if(_>dw){var B=Fa(S,M,T,C,i,-_,l),z=Fa(b,w,I,A,i,-_,l);t.lineTo(p+B.cx+B.x01,f+B.cy+B.y01),m>_?t.arc(p+B.cx,f+B.cy,_,uw(B.y01,B.x01),uw(z.y01,z.x01),!l):(t.arc(p+B.cx,f+B.cy,_,uw(B.y01,B.x01),uw(B.y11,B.x11),!l),t.arc(p,f,i,uw(B.cy+B.y11,B.cx+B.x11),uw(z.cy+z.y11,z.cx+z.x11),l),t.arc(p+z.cx,f+z.cy,_,uw(z.y11,z.x11),uw(z.y01,z.x01),!l));}else t.lineTo(p+S,f+M),t.arc(p,f,i,h,u,l);}else t.lineTo(p+S,f+M);}}else t.moveTo(p,f);t.closePath();}}function Ha(t,e,n,i,r,o,a){var s=.5*(n-t),l=.5*(i-e);return(2*(e-n)+s+l)*a+(-3*(e-n)-2*s-l)*o+s*r+e;}function Ga(t,e){for(var n=t.length,i=[],r=0,o=1;n>o;o++){r+=ce(t[o-1],t[o]);}var a=r/2;a=n>a?n:a;for(var o=0;a>o;o++){var s=o/(a-1)*(e?n:n-1),l=Math.floor(s),u=s-l,h=void 0,c=t[l%n],p=void 0,f=void 0;e?(h=t[(l-1+n)%n],p=t[(l+1)%n],f=t[(l+2)%n]):(h=t[0===l?l:l-1],p=t[l>n-2?n-1:l+1],f=t[l>n-3?n-1:l+2]);var d=u*u,g=u*d;i.push([Ha(h[0],c[0],p[0],f[0],u,d,g),Ha(h[1],c[1],p[1],f[1],u,d,g)]);}return i;}function Wa(t,e,n,i){var r,o,a,s,l=[],u=[],h=[],c=[];if(i){a=[1/0,1/0],s=[-1/0,-1/0];for(var p=0,f=t.length;f>p;p++){ye(a,a,t[p]),ve(s,s,t[p]);}ye(a,a,i[0]),ve(s,s,i[1]);}for(var p=0,f=t.length;f>p;p++){var d=t[p];if(n)r=t[p?p-1:f-1],o=t[(p+1)%f];else{if(0===p||p===f-1){l.push(Q(t[p]));continue;}r=t[p-1],o=t[p+1];}ie(u,o,r),ue(u,u,e);var g=ce(d,r),y=ce(d,o),v=g+y;0!==v&&(g/=v,y/=v),ue(h,u,-g),ue(c,u,y);var m=ee([],d,h),_=ee([],d,c);i&&(ve(m,m,a),ye(m,m,s),ve(_,_,a),ye(_,_,s)),l.push(m),l.push(_);}return n&&l.push(l.shift()),l;}function Ua(t,e,n){var i=e.smooth,r=e.points;if(r&&r.length>=2){if(i&&"spline"!==i){var o=Wa(r,i,n,e.smoothConstraint);t.moveTo(r[0][0],r[0][1]);for(var a=r.length,s=0;(n?a:a-1)>s;s++){var l=o[2*s],u=o[2*s+1],h=r[(s+1)%a];t.bezierCurveTo(l[0],l[1],u[0],u[1],h[0],h[1]);}}else{"spline"===i&&(r=Ga(r,n)),t.moveTo(r[0][0],r[0][1]);for(var s=1,c=r.length;c>s;s++){t.lineTo(r[s][0],r[s][1]);}}n&&t.closePath();}}function Ya(t,e,n){var i=t.cpx2,r=t.cpy2;return null===i||null===r?[(n?Gr:Hr)(t.x1,t.cpx1,t.cpx2,t.x2,e),(n?Gr:Hr)(t.y1,t.cpy1,t.cpy2,t.y2,e)]:[(n?Zr:qr)(t.x1,t.cpx1,t.x2,e),(n?Zr:qr)(t.y1,t.cpy1,t.y2,e)];}function Xa(t){return lb.extend(t);}function ja(t,e){return Yw(t,e);}function qa(t,e){Uw[t]=e;}function Za(t){return Uw.hasOwnProperty(t)?Uw[t]:void 0;}function Ka(t,e,n,i){var r=Ea(t,e);return n&&("center"===i&&(n=Ja(n,r.getBoundingRect())),Qa(r,n)),r;}function $a(t,e,n){var i=new fb({style:{image:t,x:e.x,y:e.y,width:e.width,height:e.height},onload:function onload(t){if("center"===n){var r={width:t.width,height:t.height};i.setStyle(Ja(e,r));}}});return i;}function Ja(t,e){var n,i=e.width/e.height,r=t.height*i;r<=t.width?n=t.height:(r=t.width,n=r/i);var o=t.x+t.width/2,a=t.y+t.height/2;return{x:o-r/2,y:a-n/2,width:r,height:n};}function Qa(t,e){if(t.applyTransform){var n=t.getBoundingRect(),i=n.calculateTransform(e);t.applyTransform(i);}}function ts(t){return To(t.shape,t.shape,t.style),t;}function es(t){return Co(t.shape,t.shape,t.style),t;}function ns(t,e,n,i,r,o,a){var s,l=!1;"function"==typeof r?(a=o,o=r,r=null):k(r)&&(o=r.cb,a=r.during,l=r.isFrom,s=r.removeOpt,r=r.dataIndex);var u,h="update"===t,c="remove"===t;if(i&&i.ecModel){var p=i.ecModel.getUpdatePayload();u=p&&p.animation;}var f=i&&i.isAnimationEnabled();if(c||e.stopAnimation("remove"),f){var d=void 0,g=void 0,y=void 0;u?(d=u.duration||0,g=u.easing||"cubicOut",y=u.delay||0):c?(s=s||{},d=N(s.duration,200),g=N(s.easing,"cubicOut"),y=0):(d=i.getShallow(h?"animationDurationUpdate":"animationDuration"),g=i.getShallow(h?"animationEasingUpdate":"animationEasing"),y=i.getShallow(h?"animationDelayUpdate":"animationDelay")),"function"==typeof y&&(y=y(r,i.getAnimationDelayParams?i.getAnimationDelayParams(e,r):null)),"function"==typeof d&&(d=d(r)),d>0?l?e.animateFrom(n,{duration:d,delay:y||0,easing:g,done:o,force:!!o||!!a,scope:t,during:a}):e.animateTo(n,{duration:d,delay:y||0,easing:g,done:o,force:!!o||!!a,setToFinal:!0,scope:t,during:a}):(e.stopAnimation(),!l&&e.attr(n),o&&o());}else e.stopAnimation(),!l&&e.attr(n),a&&a(1),o&&o();}function is(t,e,n,i,r,o){ns("update",t,e,n,i,r,o);}function rs(t,e,n,i,r,o){ns("init",t,e,n,i,r,o);}function os(t,e,n,i,r,o){ls(t)||ns("remove",t,e,n,i,r,o);}function as(t,e,n,i){t.removeTextContent(),t.removeTextGuideLine(),os(t,{style:{opacity:0}},e,n,i);}function ss(t,e,n){function i(){t.parent&&t.parent.remove(t);}t.isGroup?t.traverse(function(t){t.isGroup||as(t,e,n,i);}):as(t,e,n,i);}function ls(t){if(!t.__zr)return!0;for(var e=0;e<t.animators.length;e++){var n=t.animators[e];if("remove"===n.scope)return!0;}return!1;}function us(t,e){for(var n=Fe([]);t&&t!==e;){He(n,t.getLocalTransform(),n),t=t.parent;}return n;}function hs(t,e,n){return e&&!g(e)&&(e=km.getLocalTransform(e)),n&&(e=Ye([],e)),ge([],t,e);}function cs(t,e,n){var i=0===e[4]||0===e[5]||0===e[0]?1:Math.abs(2*e[4]/e[0]),r=0===e[4]||0===e[5]||0===e[2]?1:Math.abs(2*e[4]/e[2]),o=["left"===t?-i:"right"===t?i:0,"top"===t?-r:"bottom"===t?r:0];return o=hs(o,e,n),Math.abs(o[0])>Math.abs(o[1])?o[0]>0?"right":"left":o[1]>0?"bottom":"top";}function ps(t){return!t.isGroup;}function fs(t){return null!=t.shape;}function ds(t,e,n){function i(t){var e={};return t.traverse(function(t){ps(t)&&t.anid&&(e[t.anid]=t);}),e;}function r(t){var e={x:t.x,y:t.y,rotation:t.rotation};return fs(t)&&(e.shape=h({},t.shape)),e;}if(t&&e){var o=i(t);e.traverse(function(t){if(ps(t)&&t.anid){var e=o[t.anid];if(e){var i=r(t);t.attr(r(e)),is(t,i,n,Mb(t).dataIndex);}}});}}function gs(t,e){return v(t,function(t){var n=t[0];n=Gw(n,e.x),n=Ww(n,e.x+e.width);var i=t[1];return i=Gw(i,e.y),i=Ww(i,e.y+e.height),[n,i];});}function ys(t,e){var n=Gw(t.x,e.x),i=Ww(t.x+t.width,e.x+e.width),r=Gw(t.y,e.y),o=Ww(t.y+t.height,e.y+e.height);return i>=n&&o>=r?{x:n,y:r,width:i-n,height:o-r}:void 0;}function vs(t,e,n){var i=h({rectHover:!0},e),r=i.style={strokeNoScale:!0};return n=n||{x:-1,y:-1,width:2,height:2},t?0===t.indexOf("image://")?(r.image=t.slice(8),c(r,n),new fb(i)):Ka(t.replace("path://",""),i,n,"center"):void 0;}function ms(t,e,n,i,r){for(var o=0,a=r[r.length-1];o<r.length;o++){var s=r[o];if(_s(t,e,n,i,s[0],s[1],a[0],a[1]))return!0;a=s;}}function _s(t,e,n,i,r,o,a,s){var l=n-t,u=i-e,h=a-r,c=s-o,p=xs(h,c,l,u);if(bs(p))return!1;var f=t-r,d=e-o,g=xs(f,d,l,u)/p;if(0>g||g>1)return!1;var y=xs(f,d,h,c)/p;return 0>y||y>1?!1:!0;}function xs(t,e,n,i){return t*i-n*e;}function bs(t){return 1e-6>=t&&t>=-1e-6;}function ws(t){var e=t.itemTooltipOption,n=t.componentModel,i=t.itemName,r=C(e)?{formatter:e}:e,o=n.mainType,a=n.componentIndex,s={componentType:o,name:i,$vars:["name"]};s[o+"Index"]=a;var l=t.formatterParamsExtra;l&&y(b(l),function(t){Z(s,t)||(s[t]=l[t],s.$vars.push(t));});var u=Mb(t.el);u.componentMainType=o,u.componentIndex=a,u.tooltipConfig={name:i,option:c({content:i,formatterParams:s},r)};}function Ss(t,e){for(var n=0;n<Lb.length;n++){var i=Lb[n],r=e[i],o=t.ensureState(i);o.style=o.style||{},o.style.text=r;}var a=t.currentStates.slice();t.clearStates(!0),t.setStyle({text:e.normal}),t.useStates(a,!0);}function Ms(t,e,n){var i,r=t.labelFetcher,o=t.labelDataIndex,a=t.labelDimIndex,s=e.normal;r&&(i=r.getFormattedLabel(o,"normal",null,a,s&&s.get("formatter"),null!=n?{interpolatedValue:n}:null)),null==i&&(i=T(t.defaultText)?t.defaultText(o,t,n):t.defaultText);for(var l={normal:i},u=0;u<Lb.length;u++){var h=Lb[u],c=e[h];l[h]=N(r?r.getFormattedLabel(o,h,null,a,c&&c.get("formatter")):null,i);}return l;}function Ts(t,e,n,i){n=n||Zw;for(var r=t instanceof bb,o=!1,a=0;a<Pb.length;a++){var s=e[Pb[a]];if(s&&s.getShallow("show")){o=!0;break;}}var l=r?t:t.getTextContent();if(o){r||(l||(l=new bb(),t.setTextContent(l)),t.stateProxy&&(l.stateProxy=t.stateProxy));var u=Ms(n,e),h=e.normal,c=!!h.getShallow("show"),p=Is(h,i&&i.normal,n,!1,!r);p.text=u.normal,r||t.setTextConfig(As(h,n,!1));for(var a=0;a<Lb.length;a++){var f=Lb[a],s=e[f];if(s){var d=l.ensureState(f),g=!!N(s.getShallow("show"),c);if(g!==c&&(d.ignore=!g),d.style=Is(s,i&&i[f],n,!0,!r),d.style.text=u[f],!r){var y=t.ensureState(f);y.textConfig=As(s,n,!0);}}}l.silent=!!h.getShallow("silent"),null!=l.style.x&&(p.x=l.style.x),null!=l.style.y&&(p.y=l.style.y),l.ignore=!c,l.useStyle(p),l.dirty(),n.enableTextSetter&&(Qw(l).setLabelText=function(t){var i=Ms(n,e,t);Ss(l,i);});}else l&&(l.ignore=!0);t.dirty();}function Cs(t,e){e=e||"label";for(var n={normal:t.getModel(e)},i=0;i<Lb.length;i++){var r=Lb[i];n[r]=t.getModel([r,e]);}return n;}function Is(t,e,n,i,r){var o={};return ks(o,t,n,i,r),e&&h(o,e),o;}function As(t,e,n){e=e||{};var i,r={},o=t.getShallow("rotate"),a=N(t.getShallow("distance"),n?null:5),s=t.getShallow("offset");return i=t.getShallow("position")||(n?null:"inside"),"outside"===i&&(i=e.defaultOutsidePosition||"top"),null!=i&&(r.position=i),null!=s&&(r.offset=s),null!=o&&(o*=Math.PI/180,r.rotation=o),null!=a&&(r.distance=a),r.outsideFill="inherit"===t.get("color")?e.inheritColor||null:"auto",r;}function ks(t,e,n,i,r){n=n||Zw;var o,a=e.ecModel,s=a&&a.option.textStyle,l=Ds(e);if(l){o={};for(var u in l){if(l.hasOwnProperty(u)){var h=e.getModel(["rich",u]);Ls(o[u]={},h,s,n,i,r,!1,!0);}}}o&&(t.rich=o);var c=e.get("overflow");c&&(t.overflow=c);var p=e.get("minMargin");null!=p&&(t.margin=p),Ls(t,e,s,n,i,r,!0,!1);}function Ds(t){for(var e;t&&t!==t.ecModel;){var n=(t.option||Zw).rich;if(n){e=e||{};for(var i=b(n),r=0;r<i.length;r++){var o=i[r];e[o]=1;}}t=t.parentModel;}return e;}function Ls(t,e,n,i,r,o,a,s){n=!r&&n||Zw;var l=i&&i.inheritColor,u=e.getShallow("color"),h=e.getShallow("textBorderColor"),c=N(e.getShallow("opacity"),n.opacity);("inherit"===u||"auto"===u)&&(u=l?l:null),("inherit"===h||"auto"===h)&&(h=l?l:null),o||(u=u||n.color,h=h||n.textBorderColor),null!=u&&(t.fill=u),null!=h&&(t.stroke=h);var p=N(e.getShallow("textBorderWidth"),n.textBorderWidth);null!=p&&(t.lineWidth=p);var f=N(e.getShallow("textBorderType"),n.textBorderType);null!=f&&(t.lineDash=f);var d=N(e.getShallow("textBorderDashOffset"),n.textBorderDashOffset);null!=d&&(t.lineDashOffset=d),r||null!=c||s||(c=i&&i.defaultOpacity),null!=c&&(t.opacity=c),r||o||null==t.fill&&i.inheritColor&&(t.fill=i.inheritColor);for(var g=0;g<Kw.length;g++){var y=Kw[g],v=N(e.getShallow(y),n[y]);null!=v&&(t[y]=v);}for(var g=0;g<$w.length;g++){var y=$w[g],v=e.getShallow(y);null!=v&&(t[y]=v);}if(null==t.verticalAlign){var m=e.getShallow("baseline");null!=m&&(t.verticalAlign=m);}if(!a||!i.disableBox){for(var g=0;g<Jw.length;g++){var y=Jw[g],v=e.getShallow(y);null!=v&&(t[y]=v);}var _=e.getShallow("borderType");null!=_&&(t.borderDash=_),"auto"!==t.backgroundColor&&"inherit"!==t.backgroundColor||!l||(t.backgroundColor=l),"auto"!==t.borderColor&&"inherit"!==t.borderColor||!l||(t.borderColor=l);}}function Ps(t,e){var n=e&&e.getModel("textStyle");return W([t.fontStyle||n&&n.getShallow("fontStyle")||"",t.fontWeight||n&&n.getShallow("fontWeight")||"",(t.fontSize||n&&n.getShallow("fontSize")||12)+"px",t.fontFamily||n&&n.getShallow("fontFamily")||"sans-serif"].join(" "));}function Os(t,e,n,i){if(t){var r=Qw(t);r.prevValue=r.value,r.value=n;var o=e.normal;r.valueAnimation=o.get("valueAnimation"),r.valueAnimation&&(r.precision=o.get("precision"),r.defaultInterpolatedText=i,r.statesModels=e);}}function Rs(t,e,n,i,r){function o(i){var o=pr(n,a.precision,l,u,i);a.interpolatedValue=1===i?null:o;var h=Ms({labelDataIndex:e,labelFetcher:r,defaultText:s?s(o):o+""},a.statesModels,o);Ss(t,h);}var a=Qw(t);if(a.valueAnimation){var s=a.defaultInterpolatedText,l=N(a.interpolatedValue,a.prevValue),u=a.value;(null==l?rs:is)(t,{},i,e,null,o);}}function Es(t){return[t||"",hS++].join("_");}function Bs(t){var e={};t.registerSubTypeDefaulter=function(t,n){var i=fr(t);e[i.main]=n;},t.determineSubType=function(n,i){var r=i.type;if(!r){var o=fr(n).main;t.hasSubTypes(n)&&e[o]&&(r=e[o](i));}return r;};}function zs(t,e){function n(t){var n={},o=[];return y(t,function(a){var s=i(n,a),l=s.originalDeps=e(a),u=r(l,t);s.entryCount=u.length,0===s.entryCount&&o.push(a),y(u,function(t){p(s.predecessor,t)<0&&s.predecessor.push(t);var e=i(n,t);p(e.successor,t)<0&&e.successor.push(a);});}),{graph:n,noEntryList:o};}function i(t,e){return t[e]||(t[e]={predecessor:[],successor:[]}),t[e];}function r(t,e){var n=[];return y(t,function(t){p(e,t)>=0&&n.push(t);}),n;}t.topologicalTravel=function(t,e,i,r){function o(t){l[t].entryCount--,0===l[t].entryCount&&u.push(t);}function a(t){h[t]=!0,o(t);}if(t.length){var s=n(e),l=s.graph,u=s.noEntryList,h={};for(y(t,function(t){h[t]=!0;});u.length;){var c=u.pop(),p=l[c],f=!!h[c];f&&(i.call(r,c,p.originalDeps.slice()),delete h[c]),y(p.successor,f?a:o);}y(h,function(){var t="";throw new Error(t);});}};}function Ns(t,e){return l(l({},t,!0),e,!0);}function Fs(t,e){t=t.toUpperCase(),vS[t]=new uS(e),yS[t]=e;}function Vs(t){if(C(t)){var e=yS[t.toUpperCase()]||{};return t===fS||t===dS?s(e):l(s(e),s(yS[gS]),!1);}return l(s(t),s(yS[gS]),!1);}function Hs(t){return vS[t];}function Gs(){return vS[gS];}function Ws(t,e){return t+="","0000".substr(0,e-t.length)+t;}function Us(t){switch(t){case"half-year":case"quarter":return"month";case"week":case"half-week":return"day";case"half-day":case"quarter-day":return"hour";default:return t;}}function Ys(t){return t===Us(t);}function Xs(t){switch(t){case"year":case"month":return"day";case"millisecond":return"millisecond";default:return"second";}}function js(t,e,n,i){var r=Ai(t),o=r[$s(n)](),a=r[Js(n)]()+1,s=Math.floor((a-1)/4)+1,l=r[Qs(n)](),u=r["get"+(n?"UTC":"")+"Day"](),h=r[tl(n)](),c=(h-1)%12+1,p=r[el(n)](),f=r[nl(n)](),d=r[il(n)](),g=i instanceof uS?i:Hs(i||mS)||Gs(),y=g.getModel("time"),v=y.get("month"),m=y.get("monthAbbr"),_=y.get("dayOfWeek"),x=y.get("dayOfWeekAbbr");return(e||"").replace(/{yyyy}/g,o+"").replace(/{yy}/g,o%100+"").replace(/{Q}/g,s+"").replace(/{MMMM}/g,v[a-1]).replace(/{MMM}/g,m[a-1]).replace(/{MM}/g,Ws(a,2)).replace(/{M}/g,a+"").replace(/{dd}/g,Ws(l,2)).replace(/{d}/g,l+"").replace(/{eeee}/g,_[u]).replace(/{ee}/g,x[u]).replace(/{e}/g,u+"").replace(/{HH}/g,Ws(h,2)).replace(/{H}/g,h+"").replace(/{hh}/g,Ws(c+"",2)).replace(/{h}/g,c+"").replace(/{mm}/g,Ws(p,2)).replace(/{m}/g,p+"").replace(/{ss}/g,Ws(f,2)).replace(/{s}/g,f+"").replace(/{SSS}/g,Ws(d,3)).replace(/{S}/g,d+"");}function qs(t,e,n,i,r){var o=null;if("string"==typeof n)o=n;else if("function"==typeof n)o=n(t.value,e,{level:t.level});else{var a=h({},MS);if(t.level>0)for(var s=0;s<IS.length;++s){a[IS[s]]="{primary|"+a[IS[s]]+"}";}var l=n?n.inherit===!1?n:c(n,a):a,u=Zs(t.value,r);if(l[u])o=l[u];else if(l.inherit){for(var p=AS.indexOf(u),s=p-1;s>=0;--s){if(l[u]){o=l[u];break;}}o=o||a.none;}if(M(o)){var f=null==t.level?0:t.level>=0?t.level:o.length+t.level;f=Math.min(f,o.length-1),o=o[f];}}return js(new Date(t.value),o,r,i);}function Zs(t,e){var n=Ai(t),i=n[Js(e)]()+1,r=n[Qs(e)](),o=n[tl(e)](),a=n[el(e)](),s=n[nl(e)](),l=n[il(e)](),u=0===l,h=u&&0===s,c=h&&0===a,p=c&&0===o,f=p&&1===r,d=f&&1===i;return d?"year":f?"month":p?"day":c?"hour":h?"minute":u?"second":"millisecond";}function Ks(t,e,n){var i="number"==typeof t?Ai(t):t;switch(e=e||Zs(t,n)){case"year":return i[$s(n)]();case"half-year":return i[Js(n)]()>=6?1:0;case"quarter":return Math.floor((i[Js(n)]()+1)/4);case"month":return i[Js(n)]();case"day":return i[Qs(n)]();case"half-day":return i[tl(n)]()/24;case"hour":return i[tl(n)]();case"minute":return i[el(n)]();case"second":return i[nl(n)]();case"millisecond":return i[il(n)]();}}function $s(t){return t?"getUTCFullYear":"getFullYear";}function Js(t){return t?"getUTCMonth":"getMonth";}function Qs(t){return t?"getUTCDate":"getDate";}function tl(t){return t?"getUTCHours":"getHours";}function el(t){return t?"getUTCMinutes":"getMinutes";}function nl(t){return t?"getUTCSeconds":"getSeconds";}function il(t){return t?"getUTCSeconds":"getSeconds";}function rl(t){return t?"setUTCFullYear":"setFullYear";}function ol(t){return t?"setUTCMonth":"setMonth";}function al(t){return t?"setUTCDate":"setDate";}function sl(t){return t?"setUTCHours":"setHours";}function ll(t){return t?"setUTCMinutes":"setMinutes";}function ul(t){return t?"setUTCSeconds":"setSeconds";}function hl(t){return t?"setUTCSeconds":"setSeconds";}function cl(t,e,n,i,r,o,a,s){var l=new bb({style:{text:t,font:e,align:n,verticalAlign:i,padding:r,rich:o,overflow:a?"truncate":null,lineHeight:s}});return l.getBoundingRect();}function pl(t){if(!Ei(t))return C(t)?t:"-";var e=(t+"").split(".");return e[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,")+(e.length>1?"."+e[1]:"");}function fl(t,e){return t=(t||"").toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase();}),e&&t&&(t=t.charAt(0).toUpperCase()+t.slice(1)),t;}function dl(t){return null==t?"":(t+"").replace(DS,function(t,e){return LS[e];});}function gl(t,e,n){function i(t){return t&&W(t)?t:"-";}function r(t){return!(null==t||isNaN(t)||!isFinite(t));}var o="{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}",a="time"===e,s=t instanceof Date;if(a||s){var l=a?Ai(t):t;if(!isNaN(+l))return js(l,o,n);if(s)return"-";}if("ordinal"===e)return I(t)?i(t):A(t)&&r(t)?t+"":"-";var u=Ri(t);return r(u)?pl(u):I(t)?i(t):"-";}function yl(t,e,n){M(e)||(e=[e]);var i=e.length;if(!i)return"";for(var r=e[0].$vars||[],o=0;o<r.length;o++){var a=PS[o];t=t.replace(OS(a),OS(a,0));}for(var s=0;i>s;s++){for(var l=0;l<r.length;l++){var u=e[s][r[l]];t=t.replace(OS(PS[l],s),n?dl(u):u);}}return t;}function vl(t,e){var n=C(t)?{color:t,extraCssText:e}:t||{},i=n.color,r=n.type;e=n.extraCssText;var o=n.renderMode||"html";if(!i)return"";if("html"===o)return"subItem"===r?'<span style="display:inline-block;vertical-align:middle;margin-right:8px;margin-left:3px;border-radius:4px;width:4px;height:4px;background-color:'+dl(i)+";"+(e||"")+'"></span>':'<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:'+dl(i)+";"+(e||"")+'"></span>';var a=n.markerId||"markerX";return{renderMode:o,content:"{"+a+"|}  ",style:"subItem"===r?{width:4,height:4,borderRadius:2,backgroundColor:i}:{width:10,height:10,borderRadius:5,backgroundColor:i}};}function ml(t,e,n){("week"===t||"month"===t||"quarter"===t||"half-year"===t||"year"===t)&&(t="MM-dd\nyyyy");var i=Ai(e),r=n?"UTC":"",o=i["get"+r+"FullYear"](),a=i["get"+r+"Month"]()+1,s=i["get"+r+"Date"](),l=i["get"+r+"Hours"](),u=i["get"+r+"Minutes"](),h=i["get"+r+"Seconds"](),c=i["get"+r+"Milliseconds"]();return t=t.replace("MM",Ws(a,2)).replace("M",a).replace("yyyy",o).replace("yy",o%100+"").replace("dd",Ws(s,2)).replace("d",s).replace("hh",Ws(l,2)).replace("h",l).replace("mm",Ws(u,2)).replace("m",u).replace("ss",Ws(h,2)).replace("s",h).replace("SSS",Ws(c,3));}function _l(t){return t?t.charAt(0).toUpperCase()+t.substr(1):t;}function xl(t,e){return e=e||"transparent",C(t)?t:k(t)?t.colorStops&&(t.colorStops[0]||{}).color||e:e;}function bl(t,e){if("_blank"===e||"blank"===e){var n=window.open();n.opener=null,n.location.href=t;}else window.open(t,e);}function wl(t,e,n,i,r){var o=0,a=0;null==i&&(i=1/0),null==r&&(r=1/0);var s=0;e.eachChild(function(l,u){var h,c,p=l.getBoundingRect(),f=e.childAt(u+1),d=f&&f.getBoundingRect();if("horizontal"===t){var g=p.width+(d?-d.x+p.x:0);h=o+g,h>i||l.newline?(o=0,h=g,a+=s+n,s=p.height):s=Math.max(s,p.height);}else{var y=p.height+(d?-d.y+p.y:0);c=a+y,c>r||l.newline?(o+=s+n,a=0,c=y,s=p.width):s=Math.max(s,p.width);}l.newline||(l.x=o,l.y=a,l.markRedraw(),"horizontal"===t?o=h+n:a=c+n);});}function Sl(t,e,n){n=kS(n||0);var i=e.width,r=e.height,o=_i(t.left,i),a=_i(t.top,r),s=_i(t.right,i),l=_i(t.bottom,r),u=_i(t.width,i),h=_i(t.height,r),c=n[2]+n[0],p=n[1]+n[3],f=t.aspect;switch(isNaN(u)&&(u=i-s-p-o),isNaN(h)&&(h=r-l-c-a),null!=f&&(isNaN(u)&&isNaN(h)&&(f>i/r?u=.8*i:h=.8*r),isNaN(u)&&(u=f*h),isNaN(h)&&(h=u/f)),isNaN(o)&&(o=i-s-u-p),isNaN(a)&&(a=r-l-h-c),t.left||t.right){case"center":o=i/2-u/2-n[3];break;case"right":o=i-u-p;}switch(t.top||t.bottom){case"middle":case"center":a=r/2-h/2-n[0];break;case"bottom":a=r-h-c;}o=o||0,a=a||0,isNaN(u)&&(u=i-p-o-(s||0)),isNaN(h)&&(h=r-c-a-(l||0));var d=new t_(o+n[3],a+n[0],u,h);return d.margin=n,d;}function Ml(t){var e=t.layoutMode||t.constructor.layoutMode;return k(e)?e:e?{type:e}:null;}function Tl(t,e,n){function i(n,i){var a={},l=0,u={},h=0,c=2;if(RS(n,function(e){u[e]=t[e];}),RS(n,function(t){r(e,t)&&(a[t]=u[t]=e[t]),o(a,t)&&l++,o(u,t)&&h++;}),s[i])return o(e,n[1])?u[n[2]]=null:o(e,n[2])&&(u[n[1]]=null),u;if(h!==c&&l){if(l>=c)return a;for(var p=0;p<n.length;p++){var f=n[p];if(!r(a,f)&&r(t,f)){a[f]=t[f];break;}}return a;}return u;}function r(t,e){return t.hasOwnProperty(e);}function o(t,e){return null!=t[e]&&"auto"!==t[e];}function a(t,e,n){RS(t,function(t){e[t]=n[t];});}var s=n&&n.ignoreSize;!M(s)&&(s=[s,s]);var l=i(BS[0],0),u=i(BS[1],1);a(BS[0],t,l),a(BS[1],t,u);}function Cl(t){return Il({},t);}function Il(t,e){return e&&t&&RS(ES,function(n){e.hasOwnProperty(n)&&(t[n]=e[n]);}),t;}function Al(t){var e=[];return y(FS.getClassesByMainType(t),function(t){e=e.concat(t.dependencies||t.prototype.dependencies||[]);}),e=v(e,function(t){return fr(t).main;}),"dataset"!==t&&p(e,"dataset")<=0&&e.unshift("dataset"),e;}function kl(t){eM(t).datasetMap=X();}function Dl(t,e,n){function i(t,e,n){for(var i=0;n>i;i++){t.push(e+i);}}function r(t){var e=t.dimsDef;return e?e.length:1;}var o={},a=Pl(e);if(!a||!t)return o;var s,l,u=[],h=[],c=e.ecModel,p=eM(c).datasetMap,f=a.uid+"_"+n.seriesLayoutBy;t=t.slice(),y(t,function(e,n){var i=k(e)?e:t[n]={name:e};"ordinal"===i.type&&null==s&&(s=n,l=r(i)),o[i.name]=[];});var d=p.get(f)||p.set(f,{categoryWayDim:l,valueWayDim:0});return y(t,function(t,e){var n=t.name,a=r(t);if(null==s){var l=d.valueWayDim;i(o[n],l,a),i(h,l,a),d.valueWayDim+=a;}else if(s===e)i(o[n],0,a),i(u,0,a);else{var l=d.categoryWayDim;i(o[n],l,a),i(h,l,a),d.categoryWayDim+=a;}}),u.length&&(o.itemName=u),h.length&&(o.seriesName=h),o;}function Ll(t,e,n){var i={},r=Pl(t);if(!r)return i;var o,a=e.sourceFormat,s=e.dimensionsDefine;(a===qS||a===ZS)&&y(s,function(t,e){"name"===(k(t)?t.name:t)&&(o=e);});var l=function(){function t(t){return null!=t.v&&null!=t.n;}for(var i={},r={},l=[],u=0,h=Math.min(5,n);h>u;u++){var c=El(e.data,a,e.seriesLayoutBy,s,e.startIndex,u);l.push(c);var p=c===tM.Not;if(p&&null==i.v&&u!==o&&(i.v=u),(null==i.n||i.n===i.v||!p&&l[i.n]===tM.Not)&&(i.n=u),t(i)&&l[i.n]!==tM.Not)return i;p||(c===tM.Might&&null==r.v&&u!==o&&(r.v=u),(null==r.n||r.n===r.v)&&(r.n=u));}return t(i)?i:t(r)?r:null;}();if(l){i.value=[l.v];var u=null!=o?o:l.n;i.itemName=[u],i.seriesName=[u];}return i;}function Pl(t){var e=t.get("data",!0);return e?void 0:lr(t.ecModel,"dataset",{index:t.get("datasetIndex",!0),id:t.get("datasetId",!0)},j_).models[0];}function Ol(t){return t.get("transform",!0)||t.get("fromTransformResult",!0)?lr(t.ecModel,"dataset",{index:t.get("fromDatasetIndex",!0),id:t.get("fromDatasetId",!0)},j_).models:[];}function Rl(t,e){return El(t.data,t.sourceFormat,t.seriesLayoutBy,t.dimensionsDefine,t.startIndex,e);}function El(t,e,n,i,r,o){function a(t){var e=C(t);return null!=t&&isFinite(t)&&""!==t?e?tM.Might:tM.Not:e&&"-"!==t?tM.Must:void 0;}var s,l=5;if(L(t))return tM.Not;var u,h;if(i){var c=i[o];k(c)?(u=c.name,h=c.type):C(c)&&(u=c);}if(null!=h)return"ordinal"===h?tM.Must:tM.Not;if(e===jS){var p=t;if(n===QS){for(var f=p[o],d=0;d<(f||[]).length&&l>d;d++){if(null!=(s=a(f[r+d])))return s;}}else for(var d=0;d<p.length&&l>d;d++){var g=p[r+d];if(g&&null!=(s=a(g[o])))return s;}}else if(e===qS){var y=t;if(!u)return tM.Not;for(var d=0;d<y.length&&l>d;d++){var v=y[d];if(v&&null!=(s=a(v[u])))return s;}}else if(e===ZS){var m=t;if(!u)return tM.Not;var f=m[u];if(!f||L(f))return tM.Not;for(var d=0;d<f.length&&l>d;d++){if(null!=(s=a(f[d])))return s;}}else if(e===XS)for(var _=t,d=0;d<_.length&&l>d;d++){var v=_[d],x=Gi(v);if(!M(x))return tM.Not;if(null!=(s=a(x[o])))return s;}return tM.Not;}function Bl(t,e,n){var i=nM.get(e);if(!i)return n;var r=i(t);return r?n.concat(r):n;}function zl(t,e){for(var n=t.length,i=0;n>i;i++){if(t[i].length>e)return t[i];}return t[n-1];}function Nl(t,e,n,i,r,o,a){o=o||t;var s=e(o),l=s.paletteIdx||0,u=s.paletteNameMap=s.paletteNameMap||{};if(u.hasOwnProperty(r))return u[r];var h=null!=a&&i?zl(i,a):n;if(h=h||n,h&&h.length){var c=h[l];return r&&(u[r]=c),s.paletteIdx=(l+1)%h.length,c;}}function Fl(t,e){e(t).paletteIdx=0,e(t).paletteNameMap={};}function Vl(t,e){if(e){var n=e.seriesIndex,i=e.seriesId,r=e.seriesName;return null!=n&&t.componentIndex!==n||null!=i&&t.id!==i||null!=r&&t.name!==r;}}function Hl(t,e){var n=t.color&&!t.colorLayer;y(e,function(e,i){"colorLayer"===i&&n||FS.hasClass(i)||("object"==typeof e?t[i]=t[i]?l(t[i],e,!1):s(e):null==t[i]&&(t[i]=e));});}function Gl(t,e,n){if(M(e)){var i=X();return y(e,function(t){if(null!=t){var e=Qi(t,null);null!=e&&i.set(t,!0);}}),_(n,function(e){return e&&i.get(e[t]);});}var r=Qi(e,null);return _(n,function(e){return e&&null!=r&&e[t]===r;});}function Wl(t,e){return e.hasOwnProperty("subType")?_(t,function(t){return t&&t.subType===e.subType;}):t;}function Ul(t){var e=X();return t&&y(Vi(t.replaceMerge),function(t){e.set(t,!0);}),{replaceMergeMainTypeMap:e};}function Yl(t,e,n){function i(t){y(e,function(e){e(t,n);});}var r,o,a=[],s=t.baseOption,l=t.timeline,u=t.options,h=t.media,c=!!t.media,p=!!(u||l||s&&s.timeline);return s?(o=s,o.timeline||(o.timeline=l)):((p||c)&&(t.options=t.media=null),o=t),c&&M(h)&&y(h,function(t){t&&t.option&&(t.query?a.push(t):r||(r=t));}),i(o),y(u,function(t){return i(t);}),y(a,function(t){return i(t.option);}),{baseOption:o,timelineOptions:u||[],mediaDefault:r,mediaList:a};}function Xl(t,e,n){var i={width:e,height:n,aspectratio:e/n},r=!0;return y(t,function(t,e){var n=e.match(vM);if(n&&n[1]&&n[2]){var o=n[1],a=n[2].toLowerCase();jl(i[a],t,o)||(r=!1);}}),r;}function jl(t,e,n){return"min"===n?t>=e:"max"===n?e>=t:t===e;}function ql(t,e){return t.join(",")===e.join(",");}function Zl(t){var e=t&&t.itemStyle;if(e)for(var n=0,i=bM.length;i>n;n++){var r=bM[n],o=e.normal,a=e.emphasis;o&&o[r]&&(t[r]=t[r]||{},t[r].normal?l(t[r].normal,o[r]):t[r].normal=o[r],o[r]=null),a&&a[r]&&(t[r]=t[r]||{},t[r].emphasis?l(t[r].emphasis,a[r]):t[r].emphasis=a[r],a[r]=null);}}function Kl(t,e,n){if(t&&t[e]&&(t[e].normal||t[e].emphasis)){var i=t[e].normal,r=t[e].emphasis;i&&(n?(t[e].normal=t[e].emphasis=null,c(t[e],i)):t[e]=i),r&&(t.emphasis=t.emphasis||{},t.emphasis[e]=r,r.focus&&(t.emphasis.focus=r.focus),r.blurScope&&(t.emphasis.blurScope=r.blurScope));}}function $l(t){Kl(t,"itemStyle"),Kl(t,"lineStyle"),Kl(t,"areaStyle"),Kl(t,"label"),Kl(t,"labelLine"),Kl(t,"upperLabel"),Kl(t,"edgeLabel");}function Jl(t,e){var n=xM(t)&&t[e],i=xM(n)&&n.textStyle;if(i)for(var r=0,o=Y_.length;o>r;r++){var a=Y_[r];i.hasOwnProperty(a)&&(n[a]=i[a]);}}function Ql(t){t&&($l(t),Jl(t,"label"),t.emphasis&&Jl(t.emphasis,"label"));}function tu(t){if(xM(t)){Zl(t),$l(t),Jl(t,"label"),Jl(t,"upperLabel"),Jl(t,"edgeLabel"),t.emphasis&&(Jl(t.emphasis,"label"),Jl(t.emphasis,"upperLabel"),Jl(t.emphasis,"edgeLabel"));var e=t.markPoint;e&&(Zl(e),Ql(e));var n=t.markLine;n&&(Zl(n),Ql(n));var i=t.markArea;i&&Ql(i);var r=t.data;if("graph"===t.type){r=r||t.nodes;var o=t.links||t.edges;if(o&&!L(o))for(var a=0;a<o.length;a++){Ql(o[a]);}y(t.categories,function(t){$l(t);});}if(r&&!L(r))for(var a=0;a<r.length;a++){Ql(r[a]);}if(e=t.markPoint,e&&e.data)for(var s=e.data,a=0;a<s.length;a++){Ql(s[a]);}if(n=t.markLine,n&&n.data)for(var l=n.data,a=0;a<l.length;a++){M(l[a])?(Ql(l[a][0]),Ql(l[a][1])):Ql(l[a]);}"gauge"===t.type?(Jl(t,"axisLabel"),Jl(t,"title"),Jl(t,"detail")):"treemap"===t.type?(Kl(t.breadcrumb,"itemStyle"),y(t.levels,function(t){$l(t);})):"tree"===t.type&&$l(t.leaves);}}function eu(t){return M(t)?t:t?[t]:[];}function nu(t){return(M(t)?t[0]:t)||{};}function iu(t,e){_M(eu(t.series),function(t){xM(t)&&tu(t);});var n=["xAxis","yAxis","radiusAxis","angleAxis","singleAxis","parallelAxis","radar"];e&&n.push("valueAxis","categoryAxis","logAxis","timeAxis"),_M(n,function(e){_M(eu(t[e]),function(t){t&&(Jl(t,"axisLabel"),Jl(t.axisPointer,"label"));});}),_M(eu(t.parallel),function(t){var e=t&&t.parallelAxisDefault;Jl(e,"axisLabel"),Jl(e&&e.axisPointer,"label");}),_M(eu(t.calendar),function(t){Kl(t,"itemStyle"),Jl(t,"dayLabel"),Jl(t,"monthLabel"),Jl(t,"yearLabel");}),_M(eu(t.radar),function(t){Jl(t,"name"),t.name&&null==t.axisName&&(t.axisName=t.name,delete t.name),null!=t.nameGap&&null==t.axisNameGap&&(t.axisNameGap=t.nameGap,delete t.nameGap);}),_M(eu(t.geo),function(t){xM(t)&&(Ql(t),_M(eu(t.regions),function(t){Ql(t);}));}),_M(eu(t.timeline),function(t){Ql(t),Kl(t,"label"),Kl(t,"itemStyle"),Kl(t,"controlStyle",!0);var e=t.data;M(e)&&y(e,function(t){k(t)&&(Kl(t,"label"),Kl(t,"itemStyle"));});}),_M(eu(t.toolbox),function(t){Kl(t,"iconStyle"),_M(t.feature,function(t){Kl(t,"iconStyle");});}),Jl(nu(t.axisPointer),"label"),Jl(nu(t.tooltip).axisPointer,"label");}function ru(t,e){for(var n=e.split(","),i=t,r=0;r<n.length&&(i=i&&i[n[r]],null!=i);r++){;}return i;}function ou(t,e,n,i){for(var r,o=e.split(","),a=t,s=0;s<o.length-1;s++){r=o[s],null==a[r]&&(a[r]={}),a=a[r];}(i||null==a[o[s]])&&(a[o[s]]=n);}function au(t){t&&y(wM,function(e){e[0]in t&&!(e[1]in t)&&(t[e[1]]=t[e[0]]);});}function su(t){var e=t&&t.itemStyle;if(e)for(var n=0;n<MM.length;n++){var i=MM[n][1],r=MM[n][0];null!=e[i]&&(e[r]=e[i]);}}function lu(t){t&&"edge"===t.alignTo&&null!=t.margin&&null==t.edgeDistance&&(t.edgeDistance=t.margin);}function uu(t){t&&t.downplay&&!t.blur&&(t.blur=t.downplay);}function hu(t){t&&null!=t.focusNodeAdjacency&&(t.emphasis=t.emphasis||{},null==t.emphasis.focus&&(t.emphasis.focus="adjacency"));}function cu(t,e){if(t)for(var n=0;n<t.length;n++){e(t[n]),t[n]&&cu(t[n].children,e);}}function pu(t,e){iu(t,e),t.series=Vi(t.series),y(t.series,function(t){if(k(t)){var e=t.type;if("line"===e)null!=t.clipOverflow&&(t.clip=t.clipOverflow);else if("pie"===e||"gauge"===e){null!=t.clockWise&&(t.clockwise=t.clockWise),lu(t.label);var n=t.data;if(n&&!L(n))for(var i=0;i<n.length;i++){lu(n[i]);}null!=t.hoverOffset&&(t.emphasis=t.emphasis||{},(t.emphasis.scaleSize=null)&&(t.emphasis.scaleSize=t.hoverOffset));}else if("gauge"===e){var r=ru(t,"pointer.color");null!=r&&ou(t,"itemStyle.color",r);}else if("bar"===e){su(t),su(t.backgroundStyle),su(t.emphasis);var n=t.data;if(n&&!L(n))for(var i=0;i<n.length;i++){"object"==typeof n[i]&&(su(n[i]),su(n[i]&&n[i].emphasis));}}else if("sunburst"===e){var o=t.highlightPolicy;o&&(t.emphasis=t.emphasis||{},t.emphasis.focus||(t.emphasis.focus=o)),uu(t),cu(t.data,uu);}else"graph"===e||"sankey"===e?hu(t):"map"===e&&(t.mapType&&!t.map&&(t.map=t.mapType),t.mapLocation&&c(t,t.mapLocation));null!=t.hoverAnimation&&(t.emphasis=t.emphasis||{},t.emphasis&&null==t.emphasis.scale&&(t.emphasis.scale=t.hoverAnimation)),au(t);}}),t.dataRange&&(t.visualMap=t.dataRange),y(SM,function(e){var n=t[e];n&&(M(n)||(n=[n]),y(n,function(t){au(t);}));});}function fu(t){var e=X();t.eachSeries(function(t){var n=t.get("stack");if(n){var i=e.get(n)||e.set(n,[]),r=t.getData(),o={stackResultDimension:r.getCalculationInfo("stackResultDimension"),stackedOverDimension:r.getCalculationInfo("stackedOverDimension"),stackedDimension:r.getCalculationInfo("stackedDimension"),stackedByDimension:r.getCalculationInfo("stackedByDimension"),isStackedByIndex:r.getCalculationInfo("isStackedByIndex"),data:r,seriesModel:t};if(!o.stackedDimension||!o.isStackedByIndex&&!o.stackedByDimension)return;i.length&&r.setCalculationInfo("stackedOnSeries",i[i.length-1].seriesModel),i.push(o);}}),e.each(du);}function du(t){y(t,function(e,n){var i=[],r=[0/0,0/0],o=[e.stackResultDimension,e.stackedOverDimension],a=e.data,s=e.isStackedByIndex,l=a.map(o,function(o,l,u){var h=a.get(e.stackedDimension,u);if(isNaN(h))return r;var c,p;s?p=a.getRawIndex(u):c=a.get(e.stackedByDimension,u);for(var f=0/0,d=n-1;d>=0;d--){var g=t[d];if(s||(p=g.data.rawIndexOf(g.stackedByDimension,c)),p>=0){var y=g.data.getByRawIndex(g.stackResultDimension,p);if(h>=0&&y>0||0>=h&&0>y){h+=y,f=y;break;}}}return i[0]=h,i[1]=f,i;});a.hostModel.setData(l),e.data=l;});}function gu(t){return t instanceof TM;}function yu(t,e,n,i){n=n||xu(t);var r=e.seriesLayoutBy,o=bu(t,n,r,e.sourceHeader,e.dimensions),a=new TM({data:t,sourceFormat:n,seriesLayoutBy:r,dimensionsDefine:o.dimensionsDefine,startIndex:o.startIndex,dimensionsDetectedCount:o.dimensionsDetectedCount,encodeDefine:_u(i),metaRawOption:s(e)});
return a;}function vu(t){return new TM({data:t,sourceFormat:L(t)?KS:XS});}function mu(t){return new TM({data:t.data,sourceFormat:t.sourceFormat,seriesLayoutBy:t.seriesLayoutBy,dimensionsDefine:s(t.dimensionsDefine),startIndex:t.startIndex,dimensionsDetectedCount:t.dimensionsDetectedCount,encodeDefine:_u(t.encodeDefine)});}function _u(t){return t?X(t):null;}function xu(t){var e=$S;if(L(t))e=KS;else if(M(t)){0===t.length&&(e=jS);for(var n=0,i=t.length;i>n;n++){var r=t[n];if(null!=r){if(M(r)){e=jS;break;}if(k(r)){e=qS;break;}}}}else if(k(t))for(var o in t){if(Z(t,o)&&g(t[o])){e=ZS;break;}}return e;}function bu(t,e,n,i,r){var o,a;if(!t)return{dimensionsDefine:Su(r),startIndex:a,dimensionsDetectedCount:o};if(e===jS){var s=t;"auto"===i||null==i?Mu(function(t){null!=t&&"-"!==t&&(C(t)?null==a&&(a=1):a=0);},n,s,10):a=A(i)?i:i?1:0,r||1!==a||(r=[],Mu(function(t,e){r[e]=null!=t?t+"":"";},n,s,1/0)),o=r?r.length:n===QS?s.length:s[0]?s[0].length:null;}else if(e===qS)r||(r=wu(t));else if(e===ZS)r||(r=[],y(t,function(t,e){r.push(e);}));else if(e===XS){var l=Gi(t[0]);o=M(l)&&l.length||1;}return{startIndex:a,dimensionsDefine:Su(r),dimensionsDetectedCount:o};}function wu(t){for(var e,n=0;n<t.length&&!(e=t[n++]);){;}if(e){var i=[];return y(e,function(t,e){i.push(e);}),i;}}function Su(t){if(t){var e=X();return v(t,function(t){t=k(t)?t:{name:t};var n={name:t.name,displayName:t.displayName,type:t.type};if(null==n.name)return n;n.name+="",null==n.displayName&&(n.displayName=n.name);var i=e.get(n.name);return i?n.name+="-"+i.count++:e.set(n.name,{count:1}),n;});}}function Mu(t,e,n,i){if(e===QS)for(var r=0;r<n.length&&i>r;r++){t(n[r]?n[r][0]:null,r);}else for(var o=n[0]||[],r=0;r<o.length&&i>r;r++){t(o[r],r);}}function Tu(t,e){var n=AM[Au(t,e)];return n;}function Cu(t,e){var n=DM[Au(t,e)];return n;}function Iu(t){var e=PM[t];return e;}function Au(t,e){return t===jS?t+"_"+e:t;}function ku(t,e,n){if(t){var i=t.getRawDataItem(e);if(null!=i){var r,o,a=t.getProvider().getSource().sourceFormat,s=t.getDimensionInfo(n);return s&&(r=s.name,o=s.index),Iu(a)(i,o,r);}}}function Du(t){var e,n;return k(t)?t.type&&(n=t):e=t,{markupText:e,markupFragment:n};}function Lu(t){return new EM(t);}function Pu(t,e){var n=e&&e.type;if("ordinal"===n){var i=e&&e.ordinalMeta;return i?i.parseAndCollect(t):t;}return"time"===n&&"number"!=typeof t&&null!=t&&"-"!==t&&(t=+Ai(t)),null==t||""===t?0/0:+t;}function Ou(t,e){var n=new FM(),i=t.data,r=n.sourceFormat=t.sourceFormat,o=t.startIndex,a="";t.seriesLayoutBy!==JS&&Fi(a);var s=[],l={},u=t.dimensionsDefine;if(u)y(u,function(t,e){var n=t.name,i={index:e,name:n,displayName:t.displayName};if(s.push(i),null!=n){var r="";Z(l,n)&&Fi(r),l[n]=i;}});else for(var h=0;h<t.dimensionsDetectedCount;h++){s.push({index:h});}var c=Tu(r,JS);e.__isBuiltIn&&(n.getRawDataItem=function(t){return c(i,o,s,t);},n.getRawData=qv(Ru,null,t)),n.cloneRawData=qv(Eu,null,t);var p=Cu(r,JS);n.count=qv(p,null,i,o,s);var f=Iu(r);n.retrieveValue=function(t,e){var n=c(i,o,s,t);return d(n,e);};var d=n.retrieveValueFromItem=function(t,e){if(null!=t){var n=s[e];return n?f(t,e,n.name):void 0;}};return n.getDimensionInfo=qv(Bu,null,s,l),n.cloneAllDimensionInfo=qv(zu,null,s),n;}function Ru(t){var e=t.sourceFormat;if(!Hu(e)){var n="";Fi(n);}return t.data;}function Eu(t){var e=t.sourceFormat,n=t.data;if(!Hu(e)){var i="";Fi(i);}if(e===jS){for(var r=[],o=0,a=n.length;a>o;o++){r.push(n[o].slice());}return r;}if(e===qS){for(var r=[],o=0,a=n.length;a>o;o++){r.push(h({},n[o]));}return r;}}function Bu(t,e,n){return null!=n?"number"==typeof n||!isNaN(n)&&!Z(e,n)?t[n]:Z(e,n)?e[n]:void 0:void 0;}function zu(t){return s(t);}function Nu(t){t=s(t);var e=t.type,n="";e||Fi(n);var i=e.split(":");2!==i.length&&Fi(n);var r=!1;"echarts"===i[0]&&(e=i[1],r=!0),t.__isBuiltIn=r,VM.set(e,t);}function Fu(t,e,n){var i=Vi(t),r=i.length,o="";r||Fi(o);for(var a=0,s=r;s>a;a++){var l=i[a];e=Vu(l,e,n,1===r?null:a),a!==s-1&&(e.length=Math.max(e.length,1));}return e;}function Vu(t,e){var n="";e.length||Fi(n),k(t)||Fi(n);var i=t.type,r=VM.get(i);r||Fi(n);var o=v(e,function(t){return Ou(t,r);}),a=Vi(r.transform({upstream:o[0],upstreamList:o,config:s(t.config)}));return v(a,function(t,n){var i="";k(t)||Fi(i),t.data||Fi(i);var r=xu(t.data);Hu(r)||Fi(i);var o,a=e[0];if(a&&0===n&&!t.dimensions){var s=a.startIndex;s&&(t.data=a.data.slice(0,s).concat(t.data)),o={seriesLayoutBy:JS,sourceHeader:s,dimensions:a.metaRawOption.dimensions};}else o={seriesLayoutBy:JS,sourceHeader:0,dimensions:t.dimensions};return yu(t.data,o,null,null);});}function Hu(t){return t===jS||t===qS;}function Gu(t){var e=t.option.transform;e&&U(t.option.transform);}function Wu(t){return"series"===t.mainType;}function Uu(t){throw new Error(t);}function Yu(t,e){var n=t.color||"#6e7079",i=t.fontSize||12,r=t.fontWeight||"400",o=t.color||"#464646",a=t.fontSize||14,s=t.fontWeight||"900";return"html"===e?{nameStyle:"font-size:"+dl(i+"")+"px;color:"+dl(n)+";font-weight:"+dl(r+""),valueStyle:"font-size:"+dl(a+"")+"px;color:"+dl(o)+";font-weight:"+dl(s+"")}:{nameStyle:{fontSize:i,fill:n,fontWeight:r},valueStyle:{fontSize:a,fill:o,fontWeight:s}};}function Xu(t,e){return e.type=t,e;}function ju(t){return Z(YM,t.type)&&YM[t.type];}function qu(t,e,n,i){var r=[],o=e.blocks||[];G(!o||M(o)),o=o||[];var a=t.orderMode;if(e.sortBlocks&&a){o=o.slice();var s={valueAsc:"asc",valueDesc:"desc"};if(Z(s,a)){var l=new NM(s[a],null);o.sort(function(t,e){return l.evaluate(t.sortParam,e.sortParam);});}else"seriesDesc"===a&&o.reverse();}var u=Ku(e);return y(o,function(e,n){var o=ju(e).build(t,e,n>0?u.html:0,i);null!=o&&r.push(o);}),r.length?"richText"===t.renderMode?r.join(u.richText):$u(r.join(""),n):void 0;}function Zu(t,e,n,i,r,o){if(t){var a=ju(t);a.planLayout(t);var s={useUTC:r,renderMode:n,orderMode:i,markupStyleCreator:e};return a.build(s,t,0,o);}}function Ku(t){var e=t.__gapLevelBetweenSubBlocks;return{html:WM[e],richText:UM[e]};}function $u(t,e){var n='<div style="clear:both"></div>',i="margin: "+e+"px 0 0";return'<div style="'+i+";"+GM+';">'+t+n+"</div>";}function Ju(t,e,n){var i=e?"margin-left:2px":"";return'<span style="'+n+";"+i+'">'+dl(t)+"</span>";}function Qu(t,e,n,i){var r=n?"10px":"20px",o=e?"float:right;margin-left:"+r:"";return'<span style="'+o+";"+i+'">'+v(t,function(t){return dl(t);}).join("&nbsp;&nbsp;")+"</span>";}function th(t,e,n){return t.markupStyleCreator.wrapRichTextStyle(e,n);}function eh(t,e,n,i,r){var o=[r],a=i?10:20;return n&&o.push({padding:[0,0,0,a],align:"right"}),t.markupStyleCreator.wrapRichTextStyle(e.join("  "),o);}function nh(t,e){var n=t.getData().getItemVisual(e,"style"),i=n[t.visualDrawType];return xl(i);}function ih(t,e){var n=t.get("padding");return null!=n?n:"richText"===e?[8,10]:10;}function rh(t){var e,n,i,r,o=t.series,a=t.dataIndex,s=t.multipleSeries,l=o.getData(),u=l.mapDimensionsAll("defaultedTooltip"),h=u.length,c=o.getRawValue(a),p=M(c),f=nh(o,a);if(h>1||p&&!h){var d=oh(c,o,a,u,f);e=d.inlineValues,n=d.inlineValueTypes,i=d.blocks,r=d.inlineValues[0];}else if(h){var g=l.getDimensionInfo(u[0]);r=e=ku(l,a,u[0]),n=g.type;}else r=e=p?c[0]:c;var y=tr(o),v=y&&o.name||"",m=l.getName(a),_=s?v:m;return Xu("section",{header:v,noHeader:s||!y,sortParam:r,blocks:[Xu("nameValue",{markerType:"item",markerColor:f,name:_,noName:!W(_),value:e,valueType:n})].concat(i||[])});}function oh(t,e,n,i,r){function o(t,e){var n=a.getDimensionInfo(e);n&&n.otherDims.tooltip!==!1&&(s?h.push(Xu("nameValue",{markerType:"subItem",markerColor:r,name:n.displayName,value:t,valueType:n.type})):(l.push(t),u.push(n.type)));}var a=e.getData(),s=m(t,function(t,e,n){var i=a.getDimensionInfo(n);return t=t||i&&i.tooltip!==!1&&null!=i.displayName;},!1),l=[],u=[],h=[];return i.length?y(i,function(t){o(ku(a,n,t),t);}):y(t,o),{inlineValues:l,inlineValueTypes:u,blocks:h};}function ah(t,e){return t.getName(e)||t.getId(e);}function sh(t){var e=t.name;tr(t)||(t.name=lh(t)||e);}function lh(t){var e=t.getRawData(),n=e.mapDimensionsAll("seriesName"),i=[];return y(n,function(t){var n=e.getDimensionInfo(t);n.displayName&&i.push(n.displayName);}),i.join(" ");}function uh(t){return t.model.getRawData().count();}function hh(t){var e=t.model;return e.setData(e.getRawData().cloneShallow()),ch;}function ch(t,e){e.outputData&&t.end>e.outputData.count()&&e.model.getRawData().cloneShallow(e.outputData);}function ph(t,e){y(n(t.CHANGABLE_METHODS,t.DOWNSAMPLE_METHODS),function(n){t.wrapMethod(n,S(fh,e));});}function fh(t,e){var n=dh(t);return n&&n.setOutputEnd((e||this).count()),e;}function dh(t){var e=(t.ecModel||{}).scheduler,n=e&&e.getPipeline(t.uid);if(n){var i=n.currentTask;if(i){var r=i.agentStubMap;r&&(i=r.get(t.uid));}return i;}}function gh(){var t=or();return function(e){var n=t(e),i=e.pipelineContext,r=!!n.large,o=!!n.progressiveRender,a=n.large=!(!i||!i.large),s=n.progressiveRender=!(!i||!i.progressiveRender);return!(r===a&&o===s)&&"reset";};}function yh(t,e,n){t&&("emphasis"===e?ea:na)(t,n);}function vh(t,e,n){var i=rr(t,e),r=e&&null!=e.highlightKey?Sa(e.highlightKey):null;null!=i?y(Vi(i),function(e){yh(t.getItemGraphicEl(e),n,r);}):t.eachItemGraphicEl(function(t){yh(t,n,r);});}function mh(t){return $M(t.model);}function _h(t){var e=t.model,n=t.ecModel,i=t.api,r=t.payload,o=e.pipelineContext.progressiveRender,a=t.view,s=r&&KM(r).updateMethod,l=o?"incrementalPrepareRender":s&&a[s]?s:"render";return"render"!==l&&a[l](e,n,i,r),tT[l];}function xh(t,e,n){function i(){h=new Date().getTime(),c=null,t.apply(a,s||[]);}var r,o,a,s,l,u=0,h=0,c=null;e=e||0;var p=function p(){for(var t=[],p=0;p<arguments.length;p++){t[p]=arguments[p];}r=new Date().getTime(),a=this,s=t;var f=l||e,d=l||n;l=null,o=r-(d?u:h)-f,clearTimeout(c),d?c=setTimeout(i,f):o>=0?i():c=setTimeout(i,-o),u=r;};return p.clear=function(){c&&(clearTimeout(c),c=null);},p.debounceNextCall=function(t){l=t;},p;}function bh(t,e,n,i){var r=t[e];if(r){var o=r[eT]||r,a=r[iT],s=r[nT];if(s!==n||a!==i){if(null==n||!i)return t[e]=o;r=t[e]=xh(o,n,"debounce"===i),r[eT]=o,r[iT]=i,r[nT]=n;}return r;}}function wh(t,e){var n=t.visualStyleMapper||oT[e];return n?n:(console.warn("Unkown style type '"+e+"'."),oT.itemStyle);}function Sh(t,e){var n=t.visualDrawType||aT[e];return n?n:(console.warn("Unkown style type '"+e+"'."),"fill");}function Mh(t,e){e=e||{},c(e,{text:"loading",textColor:"#000",fontSize:12,fontWeight:"normal",fontStyle:"normal",fontFamily:"sans-serif",maskColor:"rgba(255, 255, 255, 0.8)",showSpinner:!0,color:"#5470c6",spinnerRadius:10,lineWidth:5,zlevel:0});var n=new O_(),i=new vb({style:{fill:e.maskColor},zlevel:e.zlevel,z:1e4});n.add(i);var r=new bb({style:{text:e.text,fill:e.textColor,fontSize:e.fontSize,fontWeight:e.fontWeight,fontStyle:e.fontStyle,fontFamily:e.fontFamily},zlevel:e.zlevel,z:10001}),o=new vb({style:{fill:"none"},textContent:r,textConfig:{position:"right",distance:10},zlevel:e.zlevel,z:10001});n.add(o);var a;return e.showSpinner&&(a=new Dw({shape:{startAngle:-cT/2,endAngle:-cT/2+.1,r:e.spinnerRadius},style:{stroke:e.color,lineCap:"round",lineWidth:e.lineWidth},zlevel:e.zlevel,z:10001}),a.animateShape(!0).when(1e3,{endAngle:3*cT/2}).start("circularInOut"),a.animateShape(!0).when(1e3,{startAngle:3*cT/2}).delay(300).start("circularInOut"),n.add(a)),n.resize=function(){var n=r.getBoundingRect().width,s=e.showSpinner?e.spinnerRadius:0,l=(t.getWidth()-2*s-(e.showSpinner&&n?10:0)-n)/2-(e.showSpinner&&n?0:5+n/2)+(e.showSpinner?0:n/2)+(n?0:s),u=t.getHeight()/2;e.showSpinner&&a.setShape({cx:l,cy:u}),o.setShape({x:l-s,y:u-s,width:2*s,height:2*s}),i.setShape({x:0,y:0,width:t.getWidth(),height:t.getHeight()});},n.resize(),n;}function Th(t){t.overallReset(t.ecModel,t.api,t.payload);}function Ch(t){return t.overallProgress&&Ih;}function Ih(){this.agent.dirty(),this.getDownstream().dirty();}function Ah(){this.agent&&this.agent.dirty();}function kh(t){return t.plan?t.plan(t.model,t.ecModel,t.api,t.payload):null;}function Dh(t){t.useClearVisual&&t.data.clearAllVisual();var e=t.resetDefines=Vi(t.reset(t.model,t.ecModel,t.api,t.payload));return e.length>1?v(e,function(t,e){return Lh(e);}):fT;}function Lh(t){return function(e,n){var i=n.data,r=n.resetDefines[t];if(r&&r.dataEach)for(var o=e.start;o<e.end;o++){r.dataEach(i,o);}else r&&r.progress&&r.progress(e,i);};}function Ph(t){return t.data.count();}function Oh(t){QM=null;try{t(dT,gT);}catch(e){}return QM;}function Rh(t,e){for(var n in e.prototype){t[n]=K;}}function Eh(t,e,n){switch(n){case"color":var i=t.getItemVisual(e,"style");return i[t.getVisual("drawType")];case"opacity":return t.getItemVisual(e,"style").opacity;case"symbol":case"symbolSize":case"liftZ":return t.getItemVisual(e,n);}}function Bh(t,e){switch(e){case"color":var n=t.getVisual("style");return n[t.getVisual("drawType")];case"opacity":return t.getVisual("style").opacity;case"symbol":case"symbolSize":case"liftZ":return t.getVisual(e);}}function zh(t,e,n,i,r){var o=n.width,a=n.height;switch(t){case"top":i.set(n.x+o/2,n.y-e),r.set(0,-1);break;case"bottom":i.set(n.x+o/2,n.y+a+e),r.set(0,1);break;case"left":i.set(n.x-e,n.y+a/2),r.set(-1,0);break;case"right":i.set(n.x+o+e,n.y+a/2),r.set(1,0);}}function Nh(t,e,n,i,r,o,a,s,l){a-=t,s-=e;var u=Math.sqrt(a*a+s*s);a/=u,s/=u;var h=a*n+t,c=s*n+e;if(Math.abs(i-r)%CT<1e-4)return l[0]=h,l[1]=c,u-n;if(o){var p=i;i=co(r),r=co(p);}else i=co(i),r=co(r);i>r&&(r+=CT);var f=Math.atan2(s,a);if(0>f&&(f+=CT),f>=i&&r>=f||f+CT>=i&&r>=f+CT)return l[0]=h,l[1]=c,u-n;var d=n*Math.cos(i)+t,g=n*Math.sin(i)+e,y=n*Math.cos(r)+t,v=n*Math.sin(r)+e,m=(d-a)*(d-a)+(g-s)*(g-s),_=(y-a)*(y-a)+(v-s)*(v-s);return _>m?(l[0]=d,l[1]=g,Math.sqrt(m)):(l[0]=y,l[1]=v,Math.sqrt(_));}function Fh(t,e,n,i,r,o,a,s){var l=r-t,u=o-e,h=n-t,c=i-e,p=Math.sqrt(h*h+c*c);h/=p,c/=p;var f=l*h+u*c,d=f/p;s&&(d=Math.min(Math.max(d,0),1)),d*=p;var g=a[0]=t+d*h,y=a[1]=e+d*c;return Math.sqrt((g-r)*(g-r)+(y-o)*(y-o));}function Vh(t,e,n,i,r,o,a){0>n&&(t+=n,n=-n),0>i&&(e+=i,i=-i);var s=t+n,l=e+i,u=a[0]=Math.min(Math.max(r,t),s),h=a[1]=Math.min(Math.max(o,e),l);return Math.sqrt((u-r)*(u-r)+(h-o)*(h-o));}function Hh(t,e,n){var i=Vh(e.x,e.y,e.width,e.height,t.x,t.y,kT);return n.set(kT[0],kT[1]),i;}function Gh(t,e,n){for(var i,r,o=0,a=0,s=0,l=0,u=1/0,h=e.data,c=t.x,p=t.y,f=0;f<h.length;){var d=h[f++];1===f&&(o=h[f],a=h[f+1],s=o,l=a);var g=u;switch(d){case IT.M:s=h[f++],l=h[f++],o=s,a=l;break;case IT.L:g=Fh(o,a,h[f],h[f+1],c,p,kT,!0),o=h[f++],a=h[f++];break;case IT.C:g=Xr(o,a,h[f++],h[f++],h[f++],h[f++],h[f],h[f+1],c,p,kT),o=h[f++],a=h[f++];break;case IT.Q:g=Qr(o,a,h[f++],h[f++],h[f],h[f+1],c,p,kT),o=h[f++],a=h[f++];break;case IT.A:var y=h[f++],v=h[f++],m=h[f++],_=h[f++],x=h[f++],b=h[f++];f+=1;var w=!!(1-h[f++]);i=Math.cos(x)*m+y,r=Math.sin(x)*_+v,1>=f&&(s=i,l=r);var S=(c-y)*_/m+y;g=Nh(y,v,_,x,x+b,w,S,p,kT),o=Math.cos(x+b)*m+y,a=Math.sin(x+b)*_+v;break;case IT.R:s=o=h[f++],l=a=h[f++];var M=h[f++],T=h[f++];g=Vh(s,l,M,T,c,p,kT);break;case IT.Z:g=Fh(o,a,s,l,c,p,kT,!0),o=s,a=l;}u>g&&(u=g,n.set(kT[0],kT[1]));}return u;}function Wh(t,e){if(t){var n=t.getTextGuideLine(),i=t.getTextContent();if(i&&n){var r=t.textGuideLineConfig||{},o=[[0,0],[0,0],[0,0]],a=r.candidates||AT,s=i.getBoundingRect().clone();s.applyTransform(i.getComputedTransform());var l=1/0,u=r.anchor,h=t.getComputedTransform(),c=h&&Ye([],h),p=e.get("length2")||0;u&&PT.copy(u);for(var f=0;f<a.length;f++){var d=a[f];zh(d,0,s,DT,OT),Ym.scaleAndAdd(LT,DT,OT,p),LT.transform(c);var g=t.getBoundingRect(),y=u?u.distance(LT):t instanceof lb?Gh(LT,t.path,PT):Hh(LT,g,PT);l>y&&(l=y,LT.transform(h),PT.transform(h),PT.toArray(o[0]),LT.toArray(o[1]),DT.toArray(o[2]));}Uh(o,e.get("minTurnAngle")),n.setShape({points:o});}}}function Uh(t,e){if(180>=e&&e>0){e=e/180*Math.PI,DT.fromArray(t[0]),LT.fromArray(t[1]),PT.fromArray(t[2]),Ym.sub(OT,DT,LT),Ym.sub(RT,PT,LT);var n=OT.len(),i=RT.len();if(!(.001>n||.001>i)){OT.scale(1/n),RT.scale(1/i);var r=OT.dot(RT),o=Math.cos(e);if(r>o){var a=Fh(LT.x,LT.y,PT.x,PT.y,DT.x,DT.y,ET,!1);BT.fromArray(ET),BT.scaleAndAdd(RT,a/Math.tan(Math.PI-e));var s=PT.x!==LT.x?(BT.x-LT.x)/(PT.x-LT.x):(BT.y-LT.y)/(PT.y-LT.y);if(isNaN(s))return;0>s?Ym.copy(BT,LT):s>1&&Ym.copy(BT,PT),BT.toArray(t[1]);}}}}function Yh(t,e,n){if(180>=n&&n>0){n=n/180*Math.PI,DT.fromArray(t[0]),LT.fromArray(t[1]),PT.fromArray(t[2]),Ym.sub(OT,LT,DT),Ym.sub(RT,PT,LT);var i=OT.len(),r=RT.len();if(!(.001>i||.001>r)){OT.scale(1/i),RT.scale(1/r);var o=OT.dot(e),a=Math.cos(n);if(a>o){var s=Fh(LT.x,LT.y,PT.x,PT.y,DT.x,DT.y,ET,!1);BT.fromArray(ET);var l=Math.PI/2,u=Math.acos(RT.dot(e)),h=l+u-n;if(h>=l)Ym.copy(BT,PT);else{BT.scaleAndAdd(RT,s/Math.tan(Math.PI/2-h));var c=PT.x!==LT.x?(BT.x-LT.x)/(PT.x-LT.x):(BT.y-LT.y)/(PT.y-LT.y);if(isNaN(c))return;0>c?Ym.copy(BT,LT):c>1&&Ym.copy(BT,PT);}BT.toArray(t[1]);}}}}function Xh(t,e,n,i){var r="normal"===n,o=r?t:t.ensureState(n);o.ignore=e;var a=i.get("smooth");a&&a===!0&&(a=.3),o.shape=o.shape||{},a>0&&(o.shape.smooth=a);var s=i.getModel("lineStyle").getLineStyle();r?t.useStyle(s):o.style=s;}function jh(t,e){var n=e.smooth,i=e.points;if(i)if(t.moveTo(i[0][0],i[0][1]),n>0&&i.length>=3){var r=tm(i[0],i[1]),o=tm(i[1],i[2]);if(!r||!o)return t.lineTo(i[1][0],i[1][1]),void t.lineTo(i[2][0],i[2][1]);var a=Math.min(r,o)*n,s=de([],i[1],i[0],a/r),l=de([],i[1],i[2],a/o),u=de([],s,l,.5);t.bezierCurveTo(s[0],s[1],s[0],s[1],u[0],u[1]),t.bezierCurveTo(l[0],l[1],l[0],l[1],i[2][0],i[2][1]);}else for(var h=1;h<i.length;h++){t.lineTo(i[h][0],i[h][1]);}}function qh(t,e,n){var i=t.getTextGuideLine(),r=t.getTextContent();if(!r)return void(i&&t.removeTextGuideLine());for(var o=e.normal,a=o.get("show"),s=r.ignore,l=0;l<Pb.length;l++){var u=Pb[l],h=e[u],p="normal"===u;if(h){var f=h.get("show"),d=p?s:N(r.states[u]&&r.states[u].ignore,s);if(d||!N(f,a)){var g=p?i:i&&i.states.normal;g&&(g.ignore=!0);continue;}i||(i=new ww(),t.setTextGuideLine(i),p||!s&&a||Xh(i,!0,"normal",e.normal),t.stateProxy&&(i.stateProxy=t.stateProxy)),Xh(i,!1,u,h);}}if(i){c(i.style,n),i.style.fill=null;var y=o.get("showAbove"),v=t.textGuideLineConfig=t.textGuideLineConfig||{};v.showAbove=y||!1,i.buildPath=jh;}}function Zh(t,e){e=e||"labelLine";for(var n={normal:t.getModel(e)},i=0;i<Lb.length;i++){var r=Lb[i];n[r]=t.getModel([r,e]);}return n;}function Kh(t){for(var e=[],n=0;n<t.length;n++){var i=t[n];if(!i.defaultAttr.ignore){var r=i.label,o=r.getComputedTransform(),a=r.getBoundingRect(),s=!o||o[1]<1e-5&&o[2]<1e-5,l=r.style.margin||0,u=a.clone();u.applyTransform(o),u.x-=l/2,u.y-=l/2,u.width+=l,u.height+=l;var h=s?new Fw(a,o):null;e.push({label:r,labelLine:i.labelLine,rect:u,localRect:a,obb:h,priority:i.priority,defaultAttr:i.defaultAttr,layoutOption:i.computedLayoutOption,axisAligned:s,transform:o});}}return e;}function $h(t,e,n,i,r,o){function a(){b=S.rect[e]-i,w=r-M.rect[e]-M.rect[n];}function s(t,e,n){if(0>t){var i=Math.min(e,-t);if(i>0){l(i*n,0,c);var r=i+t;0>r&&u(-r*n,1);}else u(-t*n,1);}}function l(n,i,r){0!==n&&(d=!0);for(var o=i;r>o;o++){var a=t[o],s=a.rect;s[e]+=n,a.label[e]+=n;}}function u(i,r){for(var o=[],a=0,s=1;c>s;s++){var u=t[s-1].rect,h=Math.max(t[s].rect[e]-u[e]-u[n],0);o.push(h),a+=h;}if(a){var p=Math.min(Math.abs(i)/a,r);if(i>0)for(var s=0;c-1>s;s++){var f=o[s]*p;l(f,0,s+1);}else for(var s=c-1;s>0;s--){var f=o[s-1]*p;l(-f,s,c);}}}function h(t){var e=0>t?-1:1;t=Math.abs(t);for(var n=Math.ceil(t/(c-1)),i=0;c-1>i;i++){if(e>0?l(n,0,i+1):l(-n,c-i-1,c),t-=n,0>=t)return;}}var c=t.length;if(!(2>c)){t.sort(function(t,n){return t.rect[e]-n.rect[e];});for(var p,f=0,d=!1,g=[],y=0,v=0;c>v;v++){var m=t[v],_=m.rect;p=_[e]-f,0>p&&(_[e]-=p,m.label[e]-=p,d=!0);var x=Math.max(-p,0);g.push(x),y+=x,f=_[e]+_[n];}y>0&&o&&l(-y/c,0,c);var b,w,S=t[0],M=t[c-1];return a(),0>b&&u(-b,.8),0>w&&u(w,.8),a(),s(b,w,1),s(w,b,-1),a(),0>b&&h(-b),0>w&&h(w),d;}}function Jh(t,e,n,i){return $h(t,"x","width",e,n,i);}function Qh(t,e,n,i){return $h(t,"y","height",e,n,i);}function tc(t){function e(t){if(!t.ignore){var e=t.ensureState("emphasis");null==e.ignore&&(e.ignore=!1);}t.ignore=!0;}var n=[];t.sort(function(t,e){return e.priority-t.priority;});for(var i=new t_(0,0,0,0),r=0;r<t.length;r++){var o=t[r],a=o.axisAligned,s=o.localRect,l=o.transform,u=o.label,h=o.labelLine;i.copy(o.rect),i.width-=.1,i.height-=.1,i.x+=.05,i.y+=.05;for(var c=o.obb,p=!1,f=0;f<n.length;f++){var d=n[f];if(i.intersect(d.rect)){if(a&&d.axisAligned){p=!0;break;}if(d.obb||(d.obb=new Fw(d.localRect,d.transform)),c||(c=new Fw(s,l)),c.intersect(d.obb)){p=!0;break;}}}p?(e(u),h&&e(h)):(u.attr("ignore",o.defaultAttr.ignore),h&&h.attr("ignore",o.defaultAttr.labelGuideIgnore),n.push(o));}}function ec(t){if(t){for(var e=[],n=0;n<t.length;n++){e.push(t[n].slice());}return e;}}function nc(t,e){var n=t.label,i=e&&e.getTextGuideLine();return{dataIndex:t.dataIndex,dataType:t.dataType,seriesIndex:t.seriesModel.seriesIndex,text:t.label.style.text,rect:t.hostRect,labelRect:t.rect,align:n.style.align,verticalAlign:n.style.verticalAlign,labelLinePoints:ec(i&&i.shape.points)};}function ic(t,e,n){for(var i=0;i<n.length;i++){var r=n[i];null!=e[r]&&(t[r]=e[r]);}}function rc(t,e){function n(e,n){var i=[];return e.eachComponent({mainType:"series",subType:t,query:n},function(t){i.push(t.seriesIndex);}),i;}y([[t+"ToggleSelect","toggleSelect"],[t+"Select","select"],[t+"UnSelect","unselect"]],function(t){e(t[0],function(e,i,r){e=h({},e),r.dispatchAction(h(e,{type:t[1],seriesIndex:n(i,e)}));});});}function oc(t,e,n,i,r){var o=t+e;n.isSilent(o)||i.eachComponent({mainType:"series",subType:"pie"},function(t){for(var e=t.seriesIndex,i=r.selected,a=0;a<i.length;a++){if(i[a].seriesIndex===e){var s=t.getData(),l=rr(s,r.fromActionPayload);n.trigger(o,{type:o,seriesId:t.id,name:s.getName(M(l)?l[0]:l),selected:h({},t.option.selectedMap)});}}});}function ac(t,e,n){t.on("selectchanged",function(t){var i=n.getModel();t.isFromClick?(oc("map","selectchanged",e,i,t),oc("pie","selectchanged",e,i,t)):"select"===t.fromAction?(oc("map","selected",e,i,t),oc("pie","selected",e,i,t)):"unselect"===t.fromAction&&(oc("map","unselected",e,i,t),oc("pie","unselected",e,i,t));});}function sc(t,e,n){for(var i;t&&(!e(t)||(i=t,!n));){t=t.__hostTarget||t.parent;}return i;}function lc(t,e){if("image"!==this.type){var n=this.style;this.__isEmptyBrush?(n.stroke=t,n.fill=e||"#fff",n.lineWidth=2):"line"===this.shape.symbolType?n.stroke=t:n.fill=t,this.markRedraw();}}function uc(t,e,n,i,r,o,a){var s=0===t.indexOf("empty");s&&(t=t.substr(5,1).toLowerCase()+t.substr(6));var l;return l=0===t.indexOf("image://")?$a(t.slice(8),new t_(e,n,i,r),a?"center":"cover"):0===t.indexOf("path://")?Ka(t.slice(7),{},new t_(e,n,i,r),a?"center":"cover"):new QT({shape:{symbolType:t,x:e,y:n,width:i,height:r}}),l.__isEmptyBrush=s,l.setColor=lc,o&&l.setColor(o),l;}function hc(t,e,n){var i=null==e.x?0:e.x,r=null==e.x2?1:e.x2,o=null==e.y?0:e.y,a=null==e.y2?0:e.y2;e.global||(i=i*n.width+n.x,r=r*n.width+n.x,o=o*n.height+n.y,a=a*n.height+n.y),i=isNaN(i)?0:i,r=isNaN(r)?1:r,o=isNaN(o)?0:o,a=isNaN(a)?0:a;var s=t.createLinearGradient(i,o,r,a);return s;}function cc(t,e,n){var i=n.width,r=n.height,o=Math.min(i,r),a=null==e.x?.5:e.x,s=null==e.y?.5:e.y,l=null==e.r?.5:e.r;e.global||(a=a*i+n.x,s=s*r+n.y,l*=o);var u=t.createRadialGradient(a,s,0,a,s,l);return u;}function pc(t,e,n){for(var i="radial"===e.type?cc(t,e,n):hc(t,e,n),r=e.colorStops,o=0;o<r.length;o++){i.addColorStop(r[o].offset,r[o].color);}return i;}function fc(t,e){if(t===e||!t&&!e)return!1;if(!t||!e||t.length!==e.length)return!0;for(var n=0;n<t.length;n++){if(t[n]!==e[n])return!0;}return!1;}function dc(t,e){return t&&"solid"!==t&&e>0?(e=e||1,"dashed"===t?[4*e,2*e]:"dotted"===t?[e]:A(t)?[t]:M(t)?t:null):null;}function gc(t){var e=t.stroke;return!(null==e||"none"===e||!(t.lineWidth>0));}function yc(t){var e=t.fill;return null!=e&&"none"!==e;}function vc(t,e){if(null!=e.fillOpacity&&1!==e.fillOpacity){var n=t.globalAlpha;t.globalAlpha=e.fillOpacity*e.opacity,t.fill(),t.globalAlpha=n;}else t.fill();}function mc(t,e){if(null!=e.strokeOpacity&&1!==e.strokeOpacity){var n=t.globalAlpha;t.globalAlpha=e.strokeOpacity*e.opacity,t.stroke(),t.globalAlpha=n;}else t.stroke();}function _c(t,e,n){var i=Tr(e.image,e.__image,n);if(Ir(i)){var r=t.createPattern(i,e.repeat||"repeat");if("function"==typeof DOMMatrix&&r.setTransform){var o=new DOMMatrix();o.rotateSelf(0,0,(e.rotation||0)/Math.PI*180),o.scaleSelf(e.scaleX||1,e.scaleY||1),o.translateSelf(e.x||0,e.y||0),r.setTransform(o);}return r;}}function xc(t,e,n,i){var r=gc(n),o=yc(n),a=n.strokePercent,s=1>a,l=!e.path;e.silent&&!s||!l||e.createPathProxy();var u=e.path||tC;if(!i){var h=n.fill,c=n.stroke,p=o&&!!h.colorStops,f=r&&!!c.colorStops,d=o&&!!h.image,g=r&&!!c.image,y=void 0,m=void 0,_=void 0,x=void 0,b=void 0;(p||f)&&(b=e.getBoundingRect()),p&&(y=e.__dirty?pc(t,h,b):e.__canvasFillGradient,e.__canvasFillGradient=y),f&&(m=e.__dirty?pc(t,c,b):e.__canvasStrokeGradient,e.__canvasStrokeGradient=m),d&&(_=e.__dirty||!e.__canvasFillPattern?_c(t,h,e):e.__canvasFillPattern,e.__canvasFillPattern=_),g&&(x=e.__dirty||!e.__canvasStrokePattern?_c(t,c,e):e.__canvasStrokePattern,e.__canvasStrokePattern=_),p?t.fillStyle=y:d&&(_?t.fillStyle=_:o=!1),f?t.strokeStyle=m:g&&(x?t.strokeStyle=x:r=!1);}var w=n.lineDash&&n.lineWidth>0&&dc(n.lineDash,n.lineWidth),S=n.lineDashOffset,M=!!t.setLineDash,T=e.getGlobalScale();if(u.setScale(T[0],T[1],e.segmentIgnoreThreshold),w){var C=n.strokeNoScale&&e.getLineScale?e.getLineScale():1;C&&1!==C&&(w=v(w,function(t){return t/C;}),S/=C);}var I=!0;(l||e.__dirty&lb.SHAPE_CHANGED_BIT||w&&!M&&r)&&(u.setDPR(t.dpr),s?u.setContext(null):(u.setContext(t),I=!1),u.reset(),w&&!M&&(u.setLineDash(w),u.setLineDashOffset(S)),e.buildPath(u,e.shape,i),u.toStatic(),e.pathUpdated()),I&&u.rebuildPath(t,s?a:1),w&&M&&(t.setLineDash(w),t.lineDashOffset=S),i||(n.strokeFirst?(r&&mc(t,n),o&&vc(t,n)):(o&&vc(t,n),r&&mc(t,n))),w&&M&&t.setLineDash([]);}function bc(t,e,n){var i=e.__image=Tr(n.image,e.__image,e,e.onload);if(i&&Ir(i)){var r=n.x||0,o=n.y||0,a=e.getWidth(),s=e.getHeight(),l=i.width/i.height;if(null==a&&null!=s?a=s*l:null==s&&null!=a?s=a/l:null==a&&null==s&&(a=i.width,s=i.height),n.sWidth&&n.sHeight){var u=n.sx||0,h=n.sy||0;t.drawImage(i,u,h,n.sWidth,n.sHeight,r,o,a,s);}else if(n.sx&&n.sy){var u=n.sx,h=n.sy,c=a-u,p=s-h;t.drawImage(i,u,h,c,p,r,o,a,s);}else t.drawImage(i,r,o,a,s);}}function wc(t,e,n){var i=n.text;if(null!=i&&(i+=""),i){t.font=n.font||n_,t.textAlign=n.textAlign,t.textBaseline=n.textBaseline;var r=void 0;if(t.setLineDash){var o=n.lineDash&&n.lineWidth>0&&dc(n.lineDash,n.lineWidth),a=n.lineDashOffset;if(o){var s=n.strokeNoScale&&e.getLineScale?e.getLineScale():1;s&&1!==s&&(o=v(o,function(t){return t/s;}),a/=s),t.setLineDash(o),t.lineDashOffset=a,r=!0;}}n.strokeFirst?(gc(n)&&t.strokeText(i,n.x,n.y),yc(n)&&t.fillText(i,n.x,n.y)):(yc(n)&&t.fillText(i,n.x,n.y),gc(n)&&t.strokeText(i,n.x,n.y)),r&&t.setLineDash([]);}}function Sc(t,e,n,i,r){var o=!1;if(!i&&(n=n||{},e===n))return!1;if(i||e.opacity!==n.opacity){o||(Dc(t,r),o=!0);var a=Math.max(Math.min(e.opacity,1),0);t.globalAlpha=isNaN(a)?lx.opacity:a;}(i||e.blend!==n.blend)&&(o||(Dc(t,r),o=!0),t.globalCompositeOperation=e.blend||lx.blend);for(var s=0;s<eC.length;s++){var l=eC[s];(i||e[l]!==n[l])&&(o||(Dc(t,r),o=!0),t[l]=t.dpr*(e[l]||0));}return(i||e.shadowColor!==n.shadowColor)&&(o||(Dc(t,r),o=!0),t.shadowColor=e.shadowColor||lx.shadowColor),o;}function Mc(t,e,n,i,r){var o=Lc(e,r.inHover),a=i?null:n&&Lc(n,r.inHover)||{};if(o===a)return!1;var s=Sc(t,o,a,i,r);if((i||o.fill!==a.fill)&&(s||(Dc(t,r),s=!0),t.fillStyle=o.fill),(i||o.stroke!==a.stroke)&&(s||(Dc(t,r),s=!0),t.strokeStyle=o.stroke),(i||o.opacity!==a.opacity)&&(s||(Dc(t,r),s=!0),t.globalAlpha=null==o.opacity?1:o.opacity),e.hasStroke()){var l=o.lineWidth,u=l/(o.strokeNoScale&&e&&e.getLineScale?e.getLineScale():1);t.lineWidth!==u&&(s||(Dc(t,r),s=!0),t.lineWidth=u);}for(var h=0;h<nC.length;h++){var c=nC[h],p=c[0];(i||o[p]!==a[p])&&(s||(Dc(t,r),s=!0),t[p]=o[p]||c[1]);}return s;}function Tc(t,e,n,i,r){return Sc(t,Lc(e,r.inHover),n&&Lc(n,r.inHover),i,r);}function Cc(t,e){var n=e.transform,i=t.dpr||1;n?t.setTransform(i*n[0],i*n[1],i*n[2],i*n[3],i*n[4],i*n[5]):t.setTransform(i,0,0,i,0,0);}function Ic(t,e,n){for(var i=!1,r=0;r<t.length;r++){var o=t[r];i=i||o.isZeroArea(),Cc(e,o),e.beginPath(),o.buildPath(e,o.shape),e.clip();}n.allClipped=i;}function Ac(t,e){return t&&e?t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||t[4]!==e[4]||t[5]!==e[5]:t||e?!0:!1;}function kc(t){var e=yc(t),n=gc(t);return!(t.lineDash||!(+e^+n)||e&&"string"!=typeof t.fill||n&&"string"!=typeof t.stroke||t.strokePercent<1||t.strokeOpacity<1||t.fillOpacity<1);}function Dc(t,e){e.batchFill&&t.fill(),e.batchStroke&&t.stroke(),e.batchFill="",e.batchStroke="";}function Lc(t,e){return e?t.__hoverStyle||t.style:t.style;}function Pc(t,e){Oc(t,e,{inHover:!1,viewWidth:0,viewHeight:0},!0);}function Oc(t,e,n,i){var r=e.transform;if(!e.shouldBePainted(n.viewWidth,n.viewHeight,!1,!1))return e.__dirty&=~g_.REDARAW_BIT,void(e.__isRendered=!1);var o=e.__clipPaths,a=n.prevElClipPaths,s=!1,l=!1;if((!a||fc(o,a))&&(a&&a.length&&(Dc(t,n),t.restore(),l=s=!0,n.prevElClipPaths=null,n.allClipped=!1,n.prevEl=null),o&&o.length&&(Dc(t,n),t.save(),Ic(o,t,n),s=!0),n.prevElClipPaths=o),n.allClipped)return void(e.__isRendered=!1);e.beforeBrush&&e.beforeBrush(),e.innerBeforeBrush();var u=n.prevEl;u||(l=s=!0);var h=e instanceof lb&&e.autoBatch&&kc(e.style);s||Ac(r,u.transform)?(Dc(t,n),Cc(t,e)):h||Dc(t,n);var c=Lc(e,n.inHover);e instanceof lb?(n.lastDrawType!==iC&&(l=!0,n.lastDrawType=iC),Mc(t,e,u,l,n),h&&(n.batchFill||n.batchStroke)||t.beginPath(),xc(t,e,c,h),h&&(n.batchFill=c.fill||"",n.batchStroke=c.stroke||"")):e instanceof hb?(n.lastDrawType!==oC&&(l=!0,n.lastDrawType=oC),Mc(t,e,u,l,n),wc(t,e,c)):e instanceof fb?(n.lastDrawType!==rC&&(l=!0,n.lastDrawType=rC),Tc(t,e,u,l,n),bc(t,e,c)):e instanceof Hw&&(n.lastDrawType!==aC&&(l=!0,n.lastDrawType=aC),Rc(t,e,n)),h&&i&&Dc(t,n),e.innerAfterBrush(),e.afterBrush&&e.afterBrush(),n.prevEl=e,e.__dirty=0,e.__isRendered=!0;}function Rc(t,e,n){var i=e.getDisplayables(),r=e.getTemporalDisplayables();t.save();var o,a,s={prevElClipPaths:null,prevEl:null,allClipped:!1,viewWidth:n.viewWidth,viewHeight:n.viewHeight,inHover:n.inHover};for(o=e.getCursor(),a=i.length;a>o;o++){var l=i[o];l.beforeBrush&&l.beforeBrush(),l.innerBeforeBrush(),Oc(t,l,s,o===a-1),l.innerAfterBrush(),l.afterBrush&&l.afterBrush(),s.prevEl=l;}for(var u=0,h=r.length;h>u;u++){var l=r[u];l.beforeBrush&&l.beforeBrush(),l.innerBeforeBrush(),Oc(t,l,s,u===h-1),l.innerAfterBrush(),l.afterBrush&&l.afterBrush(),s.prevEl=l;}e.clearTemporalDisplayables(),e.notClear=!0,t.restore();}function Ec(t,e){function n(t){function e(){for(var t=1,e=0,n=m.length;n>e;++e){t=Ni(t,m[e]);}for(var i=1,e=0,n=v.length;n>e;++e){i=Ni(i,v[e].length);}t*=i;var r=_*m.length*v.length;return{width:Math.max(1,Math.min(t,s.maxTileWidth)),height:Math.max(1,Math.min(r,s.maxTileHeight))};}function n(){function t(t,e,n,a,l){var u=o?1:i,h=uc(l,t*u,e*u,n*u,a*u,s.color,s.symbolKeepAspect);o?b.appendChild(r.painter.paintOne(h)):Pc(d,h);}d&&(d.clearRect(0,0,x.width,x.height),s.backgroundColor&&(d.fillStyle=s.backgroundColor,d.fillRect(0,0,x.width,x.height)));for(var e=0,n=0;n<y.length;++n){e+=y[n];}if(!(0>=e))for(var a=-_,l=0,u=0,h=0;a<w.height;){if(l%2===0){for(var c=u/2%v.length,p=0,f=0,m=0;p<2*w.width;){for(var S=0,n=0;n<g[h].length;++n){S+=g[h][n];}if(0>=S)break;if(f%2===0){var M=.5*(1-s.symbolSize),T=p+g[h][f]*M,C=a+y[l]*M,I=g[h][f]*s.symbolSize,A=y[l]*s.symbolSize,k=m/2%v[c].length;t(T,C,I,A,v[c][k]);}p+=g[h][f],++m,++f,f===g[h].length&&(f=0);}++h,h===g.length&&(h=0);}a+=y[l],++u,++l,l===y.length&&(l=0);}}for(var a=[i],l=!0,u=0;u<uC.length;++u){var h=s[uC[u]],c=typeof h;if(null!=h&&!M(h)&&"string"!==c&&"number"!==c&&"boolean"!==c){l=!1;break;}a.push(h);}var p;if(l){p=a.join(",")+(o?"-svg":"");var f=lC.get(p);f&&(o?t.svgElement=f:t.image=f);}var d,g=zc(s.dashArrayX),y=Nc(s.dashArrayY),v=Bc(s.symbol),m=Fc(g),_=Vc(y),x=!o&&jv(),b=o&&r.painter.createSVGElement("g"),w=e();x&&(x.width=w.width*i,x.height=w.height*i,d=x.getContext("2d")),n(),l&&lC.put(p,x||b),t.image=x,t.svgElement=b,t.svgWidth=w.width,t.svgHeight=w.height;}if("none"===t)return null;var i=e.getDevicePixelRatio(),r=e.getZr(),o="svg"===r.painter.type;t.dirty&&sC["delete"](t);var a=sC.get(t);if(a)return a;var s=c(t,{symbol:"rect",symbolSize:1,symbolKeepAspect:!0,color:"rgba(0, 0, 0, 0.2)",backgroundColor:null,dashArrayX:5,dashArrayY:5,rotation:0,maxTileWidth:512,maxTileHeight:512});"none"===s.backgroundColor&&(s.backgroundColor=null);
var l={repeat:"repeat"};return n(l),l.rotation=s.rotation,l.scaleX=l.scaleY=o?1:1/i,sC.set(t,l),t.dirty=!1,l;}function Bc(t){if(!t||0===t.length)return[["rect"]];if("string"==typeof t)return[[t]];for(var e=!0,n=0;n<t.length;++n){if("string"!=typeof t[n]){e=!1;break;}}if(e)return Bc([t]);for(var i=[],n=0;n<t.length;++n){i.push("string"==typeof t[n]?[t[n]]:t[n]);}return i;}function zc(t){if(!t||0===t.length)return[[0,0]];if("number"==typeof t){var e=Math.ceil(t);return[[e,e]];}for(var n=!0,i=0;i<t.length;++i){if("number"!=typeof t[i]){n=!1;break;}}if(n)return zc([t]);for(var r=[],i=0;i<t.length;++i){if("number"==typeof t[i]){var e=Math.ceil(t[i]);r.push([e,e]);}else{var e=v(t[i],function(t){return Math.ceil(t);});r.push(e.length%2===1?e.concat(e):e);}}return r;}function Nc(t){if(!t||"object"==typeof t&&0===t.length)return[0,0];if("number"==typeof t){var e=Math.ceil(t);return[e,e];}var n=v(t,function(t){return Math.ceil(t);});return t.length%2?n.concat(n):n;}function Fc(t){return v(t,function(t){return Vc(t);});}function Vc(t){for(var e=0,n=0;n<t.length;++n){e+=t[n];}return t.length%2===1?2*e:e;}function Hc(t,e){t.eachRawSeries(function(n){if(!t.isSeriesFiltered(n)){var i=n.getData();i.hasItemVisual()&&i.each(function(t){var n=i.getItemVisual(t,"decal");if(n){var r=i.ensureUniqueItemVisual(t,"style");r.decal=Ec(n,e);}});var r=i.getVisual("decal");if(r){var o=i.getVisual("style");o.decal=Ec(r,e);}}});}function Gc(t){if(C(t)){var e=new DOMParser();t=e.parseFromString(t,"text/xml");}var n=t;for(9===n.nodeType&&(n=n.firstChild);"svg"!==n.nodeName.toLowerCase()||1!==n.nodeType;){n=n.nextSibling;}return n;}function Wc(t,e){var n=t.getAttribute("gradientUnits");"userSpaceOnUse"===n&&(e.global=!0);}function Uc(t,e){for(var n=t.firstChild;n;){if(1===n.nodeType&&"stop"===n.nodeName.toLocaleLowerCase()){var i=n.getAttribute("offset"),r=void 0;r=i&&i.indexOf("%")>0?parseInt(i,10)/100:i?parseFloat(i):0;var o={};Qc(n,o,o);var a=o.stopColor||n.getAttribute("stop-color")||"#000000";e.colorStops.push({offset:r,color:a});}n=n.nextSibling;}}function Yc(t,e){t&&t.__inheritedStyle&&(e.__inheritedStyle||(e.__inheritedStyle={}),c(e.__inheritedStyle,t.__inheritedStyle));}function Xc(t){for(var e=$c(t),n=[],i=0;i<e.length;i+=2){var r=parseFloat(e[i]),o=parseFloat(e[i+1]);n.push([r,o]);}return n;}function jc(t,e,n,i,r){var o=e,a=o.__inheritedStyle=o.__inheritedStyle||{},s={};1===t.nodeType&&(Jc(t,e),Qc(t,a,s),i||tp(t,a,s)),o.style=o.style||{},null!=a.fill&&(o.style.fill=Zc(o,"fill",a.fill,n)),null!=a.stroke&&(o.style.stroke=Zc(o,"stroke",a.stroke,n)),y(["lineWidth","opacity","fillOpacity","strokeOpacity","miterLimit","fontSize"],function(t){null!=a[t]&&(o.style[t]=parseFloat(a[t]));}),y(["lineDashOffset","lineCap","lineJoin","fontWeight","fontFamily","fontStyle","textAlign"],function(t){null!=a[t]&&(o.style[t]=a[t]);}),r&&(o.__selfStyle=s),a.lineDash&&(o.style.lineDash=v($c(a.lineDash),function(t){return parseFloat(t);})),("hidden"===a.visibility||"collapse"===a.visibility)&&(o.invisible=!0),"none"===a.display&&(o.ignore=!0),o.z=-1e4,o.z2=-1e3;}function qc(t,e){var n=e.__selfStyle;if(n){var i=n.textBaseline,r=i;i&&"auto"!==i?"baseline"===i?r="alphabetic":"before-edge"===i||"text-before-edge"===i?r="top":"after-edge"===i||"text-after-edge"===i?r="bottom":("central"===i||"mathematical"===i)&&(r="middle"):r="alphabetic",t.style.textBaseline=r;}var o=e.__inheritedStyle;if(o){var a=o.textAlign,s=a;a&&("middle"===a&&(s="center"),t.style.textAlign=s);}}function Zc(t,e,n,i){var r=n&&n.match(yC);if(r){var o=W(r[1]);return void i.push([t,e,o]);}return"none"===n&&(n=null),n;}function Kc(t,e){for(var n=0;n<e.length;n++){var i=e[n];i[0].style[i[1]]=t[i[2]];}}function $c(t){return t.match(vC)||[];}function Jc(t,e){var n=t.getAttribute("transform");if(n){n=n.replace(/,/g," ");var i=[],r=null;n.replace(mC,function(t,e,n){return i.push(e,n),"";});for(var o=i.length-1;o>0;o-=2){var a=i[o],s=i[o-1],l=void 0;switch(r=r||Ne(),s){case"translate":l=$c(a),Ge(r,r,[parseFloat(l[0]),parseFloat(l[1]||"0")]);break;case"scale":l=$c(a),Ue(r,r,[parseFloat(l[0]),parseFloat(l[1]||l[0])]);break;case"rotate":l=$c(a),We(r,r,-parseFloat(l[0])/180*Math.PI);break;case"skew":l=$c(a),console.warn("Skew transform is not supported yet");break;case"matrix":l=$c(a),r[0]=parseFloat(l[0]),r[1]=parseFloat(l[1]),r[2]=parseFloat(l[2]),r[3]=parseFloat(l[3]),r[4]=parseFloat(l[4]),r[5]=parseFloat(l[5]);}}e.setLocalTransform(r);}}function Qc(t,e,n){var i=t.getAttribute("style");if(i){_C.lastIndex=0;for(var r;null!=(r=_C.exec(i));){var o=r[1],a=Z(hC,o)?hC[o]:null;a&&(e[a]=r[2]);var s=Z(pC,o)?pC[o]:null;s&&(n[s]=r[2]);}}}function tp(t,e,n){for(var i=0;i<cC.length;i++){var r=cC[i],o=t.getAttribute(r);null!=o&&(e[hC[r]]=o);}for(var i=0;i<fC.length;i++){var r=fC[i],o=t.getAttribute(r);null!=o&&(n[pC[r]]=o);}}function ep(t,e){var n=e.width/t.width,i=e.height/t.height,r=Math.min(n,i);return{scale:r,x:-(t.x+t.width/2)*r+(e.x+e.width/2),y:-(t.y+t.height/2)*r+(e.y+e.height/2)};}function np(t,e){var n=new dC();return n.parse(t,e);}function ip(t,e){return Math.abs(t-e)<xC;}function rp(t,e,n){var i=0,r=t[0];if(!r)return!1;for(var o=1;o<t.length;o++){var a=t[o];i+=fo(r[0],r[1],a[0],a[1],e,n),r=a;}var s=t[0];return ip(r[0],s[0])&&ip(r[1],s[1])||(i+=fo(r[0],r[1],s[0],s[1],e,n)),0!==i;}function op(t){t.silent=!1,t.isGroup&&t.traverse(function(t){t.silent=!1;});}function ap(t){var e=[],n=X();return y(t,function(t){if(null==t.namedFrom){var i=new MC(t.name,t.el);e.push(i),n.set(t.name,i);}}),{regions:e,regionsMap:n};}function sp(t){if(!t.UTF8Encoding)return t;var e=t,n=e.UTF8Scale;null==n&&(n=1024);for(var i=e.features,r=0;r<i.length;r++){var o=i[r],a=o.geometry;if("Polygon"===a.type)for(var s=a.coordinates,l=0;l<s.length;l++){s[l]=lp(s[l],a.encodeOffsets[l],n);}else if("MultiPolygon"===a.type)for(var s=a.coordinates,l=0;l<s.length;l++){for(var u=s[l],h=0;h<u.length;h++){u[h]=lp(u[h],a.encodeOffsets[l][h],n);}}}return e.UTF8Encoding=!1,e;}function lp(t,e,n){for(var i=[],r=e[0],o=e[1],a=0;a<t.length;a+=2){var s=t.charCodeAt(a)-64,l=t.charCodeAt(a+1)-64;s=s>>1^-(1&s),l=l>>1^-(1&l),s+=r,l+=o,r=s,o=l,i.push([s/n,l/n]);}return i;}function up(t,e){return t=sp(t),v(_(t.features,function(t){return t.geometry&&t.properties&&t.geometry.coordinates.length>0;}),function(t){var n=t.properties,i=t.geometry,r=[];if("Polygon"===i.type){var o=i.coordinates;r.push({type:"polygon",exterior:o[0],interiors:o.slice(1)});}if("MultiPolygon"===i.type){var o=i.coordinates;y(o,function(t){t[0]&&r.push({type:"polygon",exterior:t[0],interiors:t.slice(1)});});}var a=new SC(n[e||"name"],r,n.cp);return a.properties=n,a;});}function hp(t,e){"china"===t&&e.push(new SC("南海诸岛",v(AC,function(t){return{type:"polygon",exterior:t};}),IC));}function cp(t,e){if("china"===t){var n=LC[e.name];if(n){var i=e.getCenter();i[0]+=n[0]/10.5,i[1]+=-n[1]/14,e.setCenter(i);}}}function pp(t,e){if("world"===t){var n=PC[e.name];if(n){var i=[n[0],n[1]];e.setCenter(i);}}}function fp(t,e){"china"===t&&"台湾"===e.name&&e.geometries.push({type:"polygon",exterior:OC[0]});}function dp(t){for(var e,n=0;n<t.length;n++){var i=t[n].getBoundingRect();e=e||i.clone(),e.union(i);}return e;}function gp(t){return C(t)?"undefined"!=typeof JSON&&JSON.parse?JSON.parse(t):new Function("return ("+t+");")():t;}function yp(t){return function(){for(var e=[],n=0;n<arguments.length;n++){e[n]=arguments[n];}return this.isDisposed()?void 0:mp(this,t,e);};}function vp(t){return function(){for(var e=[],n=0;n<arguments.length;n++){e[n]=arguments[n];}return mp(this,t,e);};}function mp(t,e,n){return n[0]=n[0]&&n[0].toLowerCase(),om.prototype[e].apply(t,n);}function _p(t,e,n){var i=Sp(t);if(i)return i;var r=new VI(t,e,n);return r.id="ec_"+tA++,JI[r.id]=r,ur(t,nA,r.id),BI(r),FC(jI,function(t){t(r);}),r;}function xp(t){if(M(t)){var e=t;t=null,FC(e,function(e){null!=e.group&&(t=e.group);}),t=t||"g_"+eA++,FC(e,function(e){e.group=t;});}return QI[t]=!0,t;}function bp(t){QI[t]=!1;}function wp(t){"string"==typeof t?t=JI[t]:t instanceof VI||(t=Sp(t)),t instanceof VI&&!t.isDisposed()&&t.dispose();}function Sp(t){return JI[hr(t,nA)];}function Mp(t){return JI[t];}function Tp(t,e){KI[t]=e;}function Cp(t){GC(XI,t)<0&&XI.push(t);}function Ip(t,e){Ep(YI,t,e,KC);}function Ap(t){GC(jI,t)<0&&t&&jI.push(t);}function kp(t){GC(qI,t)<0&&t&&qI.push(t);}function Dp(t,e,n){"function"==typeof e&&(n=e,e="");var i=HC(t)?t.type:[t,t={event:e}][0];t.event=(t.event||i).toLowerCase(),e=t.event,UI[e]||(NC(pI.test(i)&&pI.test(e)),WI[i]||(WI[i]={action:n,actionInfo:t}),UI[e]=i);}function Lp(t,e){yM.register(t,e);}function Pp(t){var e=yM.get(t);return e?e.getDimensionsInfo?e.getDimensionsInfo():e.dimensions.slice():void 0;}function Op(t,e){Ep(ZI,t,e,JC,"layout");}function Rp(t,e){Ep(ZI,t,e,eI,"visual");}function Ep(t,e,n,i,r){if((VC(e)||HC(e))&&(n=e,e=i),!(GC(rA,n)>=0)){rA.push(n);var o=pT.wrapStageHandler(n,r);o.__prio=e,o.__raw=n,t.push(o);}}function Bp(t,e){$I[t]=e;}function zp(t){r("createCanvas",t);}function Np(t,e,n){zC.registerMap(t,e,n);}function Fp(t){return zC.getMapForUser(t);}function Vp(t){return null==t?0:t.length||1;}function Hp(t){return t;}function Gp(t){var e={},n=e.encode={},i=X(),r=[],o=[],a=e.userOutput={dimensionNames:t.dimensions.slice(),encode:{}};y(t.dimensions,function(e){var s=t.getDimensionInfo(e),l=s.coordDim;if(l){var u=s.coordDimIndex;Wp(n,l)[u]=e,s.isExtraCoord||(i.set(l,1),Yp(s.type)&&(r[0]=e),Wp(a.encode,l)[u]=s.index),s.defaultTooltip&&o.push(e);}YS.each(function(t,e){var i=Wp(n,e),r=s.otherDims[e];null!=r&&r!==!1&&(i[r]=s.name);});});var s=[],l={};i.each(function(t,e){var i=n[e];l[e]=i[0],s=s.concat(i);}),e.dataDimsOnCoord=s,e.encodeFirstDimNotExtra=l;var u=n.label;u&&u.length&&(r=u.slice());var h=n.tooltip;return h&&h.length?o=h.slice():o.length||(o=r.slice()),n.defaultedLabel=r,n.defaultedTooltip=o,e;}function Wp(t,e){return t.hasOwnProperty(e)||(t[e]=[]),t[e];}function Up(t){return"category"===t?"ordinal":"time"===t?"time":"float";}function Yp(t){return!("ordinal"===t||"time"===t);}function Xp(t,e,n){function i(t,e,n){null!=YS.get(e)?t.otherDims[e]=n:(t.coordDim=e,t.coordDimIndex=n,a.set(e,!0));}gu(e)||(e=vu(e)),n=n||{},t=(t||[]).slice();for(var r=(n.dimsDef||[]).slice(),o=X(),a=X(),l=[],u=jp(e,t,r,n.dimCount),p=0;u>p;p++){var f=r[p],d=r[p]=h({},k(f)?f:{name:f}),g=d.name,v=l[p]=new wA();null!=g&&null==o.get(g)&&(v.name=v.displayName=g,o.set(g,p)),null!=d.type&&(v.type=d.type),null!=d.displayName&&(v.displayName=d.displayName);}var m=n.encodeDef;!m&&n.encodeDefaulter&&(m=n.encodeDefaulter(e,u));var _=X(m);_.each(function(t,e){var n=Vi(t).slice();if(1===n.length&&!C(n[0])&&n[0]<0)return void _.set(e,!1);var r=_.set(e,[]);y(n,function(t,n){var a=C(t)?o.get(t):t;null!=a&&u>a&&(r[n]=a,i(l[a],e,n));});});var x=0;y(t,function(t){var e,n,r,o;if(C(t))e=t,o={};else{o=t,e=o.name;var a=o.ordinalMeta;o.ordinalMeta=null,o=s(o),o.ordinalMeta=a,n=o.dimsDef,r=o.otherDims,o.name=o.coordDim=o.coordDimIndex=o.dimsDef=o.otherDims=null;}var u=_.get(e);if(u!==!1){if(u=Vi(u),!u.length)for(var h=0;h<(n&&n.length||1);h++){for(;x<l.length&&null!=l[x].coordDim;){x++;}x<l.length&&u.push(x++);}y(u,function(t,a){var s=l[t];if(i(c(s,o),e,a),null==s.name&&n){var u=n[a];!k(u)&&(u={name:u}),s.name=s.displayName=u.name,s.defaultTooltip=u.defaultTooltip;}r&&c(s.otherDims,r);});}});var b=n.generateCoord,w=n.generateCoordCount,S=null!=w;w=b?w||1:0;for(var M=b||"value",T=0;u>T;T++){var v=l[T]=l[T]||new wA(),I=v.coordDim;null==I&&(v.coordDim=qp(M,a,S),v.coordDimIndex=0,(!b||0>=w)&&(v.isExtraCoord=!0),w--),null==v.name&&(v.name=qp(v.coordDim,o,!1)),null!=v.type||Rl(e,T)!==tM.Must&&(!v.isExtraCoord||null==v.otherDims.itemName&&null==v.otherDims.seriesName)||(v.type="ordinal");}return l;}function jp(t,e,n,i){var r=Math.max(t.dimensionsDetectedCount||1,e.length,n.length,i||0);return y(e,function(t){var e;k(t)&&(e=t.dimsDef)&&(r=Math.max(r,e.length));}),r;}function qp(t,e,n){if(n||null!=e.get(t)){for(var i=0;null!=e.get(t+i);){i++;}t+=i;}return e.set(t,!0),t;}function Zp(t,e){return e=e||{},Xp(e.coordDimensions||[],t,{dimsDef:e.dimensionsDefine||t.dimensionsDefine,encodeDef:e.encodeDefine||t.encodeDefine,dimCount:e.dimensionsCount,encodeDefaulter:e.encodeDefaulter,generateCoord:e.generateCoord,generateCoordCount:e.generateCoordCount});}function Kp(t){var e=t.get("coordinateSystem"),n=new BA(e),i=zA[e];return i?(i(t,n,n.axisMap,n.categoryAxisMap),n):void 0;}function $p(t){return"category"===t.get("type");}function Jp(t,e,n){n=n||{};var i,r,o,a,s=n.byIndex,l=n.stackedCoordDimension,u=!(!t||!t.get("stack"));if(y(e,function(t,n){C(t)&&(e[n]=t={name:t}),u&&!t.isExtraCoord&&(s||i||!t.ordinalMeta||(i=t),r||"ordinal"===t.type||"time"===t.type||l&&l!==t.coordDim||(r=t));}),!r||s||i||(s=!0),r){o="__\x00ecstackresult",a="__\x00ecstackedover",i&&(i.createInvertedIndices=!0);var h=r.coordDim,c=r.type,p=0;y(e,function(t){t.coordDim===h&&p++;}),e.push({name:o,coordDim:h,coordDimIndex:p,type:c,isExtraCoord:!0,isCalculationCoord:!0}),p++,e.push({name:a,coordDim:a,coordDimIndex:p,type:c,isExtraCoord:!0,isCalculationCoord:!0});}return{stackedDimension:r&&r.name,stackedByDimension:i&&i.name,isStackedByIndex:s,stackedOverDimension:a,stackResultDimension:o};}function Qp(t,e){return!!e&&e===t.getCalculationInfo("stackedDimension");}function tf(t,e){return Qp(t,e)?t.getCalculationInfo("stackResultDimension"):e;}function ef(t,e,n){n=n||{},gu(t)||(t=vu(t));var i,r=e.get("coordinateSystem"),o=yM.get(r),a=Kp(e);a&&a.coordSysDims&&(i=v(a.coordSysDims,function(t){var e={name:t},n=a.axisMap.get(t);if(n){var i=n.get("type");e.type=Up(i);}return e;})),i||(i=o&&(o.getDimensionsInfo?o.getDimensionsInfo():o.dimensions.slice())||["x","y"]);var s,l,u=n.useEncodeDefaulter,h=Zp(t,{coordDimensions:i,generateCoord:n.generateCoord,encodeDefaulter:T(u)?u:u?S(Dl,i,e):null});a&&y(h,function(t,e){var i=t.coordDim,r=a.categoryAxisMap.get(i);r&&(null==s&&(s=e),t.ordinalMeta=r.getOrdinalMeta(),n.createInvertedIndices&&(t.createInvertedIndices=!0)),null!=t.otherDims.itemName&&(l=!0);}),l||null==s||(h[s].otherDims.itemName=0);var c=Jp(e,h),p=new EA(h,e);p.setCalculationInfo(c);var f=null!=s&&nf(t)?function(t,e,n,i){return i===s?n:this.defaultDimValueGetter(t,e,n,i);}:null;return p.hasItemOption=!1,p.initData(t,null,f),p;}function nf(t){if(t.sourceFormat===XS){var e=rf(t.data||[]);return null!=e&&!M(Gi(e));}}function rf(t){for(var e=0;e<t.length&&null==t[e];){e++;}return t[e];}function of(t){return k(t)&&null!=t.value?t.value:t+"";}function af(t,e,n,i){var r={},o=t[1]-t[0],a=r.interval=Li(o/e,!0);null!=n&&n>a&&(a=r.interval=n),null!=i&&a>i&&(a=r.interval=i);var s=r.intervalPrecision=sf(a),l=r.niceTickExtent=[VA(Math.ceil(t[0]/a)*a,s),VA(Math.floor(t[1]/a)*a,s)];return uf(l,t),r;}function sf(t){return Si(t)+2;}function lf(t,e,n){t[e]=Math.max(Math.min(t[e],n[1]),n[0]);}function uf(t,e){!isFinite(t[0])&&(t[0]=e[0]),!isFinite(t[1])&&(t[1]=e[1]),lf(t,0,e),lf(t,1,e),t[0]>t[1]&&(t[0]=t[1]);}function hf(t,e){return t>=e[0]&&t<=e[1];}function cf(t,e){return e[1]===e[0]?.5:(t-e[0])/(e[1]-e[0]);}function pf(t,e){return t*(e[1]-e[0])+e[0];}function ff(t){return t.get("stack")||UA+t.seriesIndex;}function df(t){return t.dim+t.index;}function gf(t,e){var n=[];return e.eachSeriesByType(t,function(t){bf(t)&&!wf(t)&&n.push(t);}),n;}function yf(t){var e={};y(t,function(t){var n=t.coordinateSystem,i=n.getBaseAxis();if("time"===i.type||"value"===i.type)for(var r=t.getData(),o=i.dim+"_"+i.index,a=r.mapDimension(i.dim),s=0,l=r.count();l>s;++s){var u=r.get(a,s);e[o]?e[o].push(u):e[o]=[u];}});var n={};for(var i in e){if(e.hasOwnProperty(i)){var r=e[i];if(r){r.sort(function(t,e){return t-e;});for(var o=null,a=1;a<r.length;++a){var s=r[a]-r[a-1];s>0&&(o=null===o?s:Math.min(o,s));}n[i]=o;}}}return n;}function vf(t){var e=yf(t),n=[];return y(t,function(t){var i,r=t.coordinateSystem,o=r.getBaseAxis(),a=o.getExtent();if("category"===o.type)i=o.getBandWidth();else if("value"===o.type||"time"===o.type){var s=o.dim+"_"+o.index,l=e[s],u=Math.abs(a[1]-a[0]),h=o.scale.getExtent(),c=Math.abs(h[1]-h[0]);i=l?u/c*l:u;}else{var p=t.getData();i=Math.abs(a[1]-a[0])/p.count();}var f=_i(t.get("barWidth"),i),d=_i(t.get("barMaxWidth"),i),g=_i(t.get("barMinWidth")||1,i),y=t.get("barGap"),v=t.get("barCategoryGap");n.push({bandWidth:i,barWidth:f,barMaxWidth:d,barMinWidth:g,barGap:y,barCategoryGap:v,axisKey:df(o),stackId:ff(t)});}),mf(n);}function mf(t){var e={};y(t,function(t){var n=t.axisKey,i=t.bandWidth,r=e[n]||{bandWidth:i,remainedWidth:i,autoWidthCount:0,categoryGap:null,gap:"20%",stacks:{}},o=r.stacks;e[n]=r;var a=t.stackId;o[a]||r.autoWidthCount++,o[a]=o[a]||{width:0,maxWidth:0};var s=t.barWidth;s&&!o[a].width&&(o[a].width=s,s=Math.min(r.remainedWidth,s),r.remainedWidth-=s);var l=t.barMaxWidth;l&&(o[a].maxWidth=l);var u=t.barMinWidth;u&&(o[a].minWidth=u);var h=t.barGap;null!=h&&(r.gap=h);var c=t.barCategoryGap;null!=c&&(r.categoryGap=c);});var n={};return y(e,function(t,e){n[e]={};var i=t.stacks,r=t.bandWidth,o=t.categoryGap;if(null==o){var a=b(i).length;o=Math.max(35-4*a,15)+"%";}var s=_i(o,r),l=_i(t.gap,1),u=t.remainedWidth,h=t.autoWidthCount,c=(u-s)/(h+(h-1)*l);c=Math.max(c,0),y(i,function(t){var e=t.maxWidth,n=t.minWidth;if(t.width){var i=t.width;e&&(i=Math.min(i,e)),n&&(i=Math.max(i,n)),t.width=i,u-=i+l*i,h--;}else{var i=c;e&&i>e&&(i=Math.min(e,u)),n&&n>i&&(i=n),i!==c&&(t.width=i,u-=i+l*i,h--);}}),c=(u-s)/(h+(h-1)*l),c=Math.max(c,0);var p,f=0;y(i,function(t){t.width||(t.width=c),p=t,f+=t.width*(1+l);}),p&&(f-=p.width*l);var d=-f/2;y(i,function(t,i){n[e][i]=n[e][i]||{bandWidth:r,offset:d,width:t.width},d+=t.width*(1+l);});}),n;}function _f(t,e,n){if(t&&e){var i=t[df(e)];return null!=i&&null!=n?i[ff(n)]:i;}}function xf(t,e){var n=gf(t,e),i=vf(n),r={};y(n,function(t){var e=t.getData(),n=t.coordinateSystem,o=n.getBaseAxis(),a=ff(t),s=i[df(o)][a],l=s.offset,u=s.width,h=n.getOtherAxis(o),c=t.get("barMinHeight")||0;r[a]=r[a]||[],e.setLayout({bandWidth:s.bandWidth,offset:l,size:u});for(var p=e.mapDimension(h.dim),f=e.mapDimension(o.dim),d=Qp(e,p),g=h.isHorizontal(),y=Sf(o,h,d),v=0,m=e.count();m>v;v++){var _=e.get(p,v),x=e.get(f,v),b=_>=0?"p":"n",w=y;d&&(r[a][x]||(r[a][x]={p:y,n:y}),w=r[a][x][b]);var S=void 0,M=void 0,T=void 0,C=void 0;if(g){var I=n.dataToPoint([_,x]);S=w,M=I[1]+l,T=I[0]-y,C=u,Math.abs(T)<c&&(T=(0>T?-1:1)*c),isNaN(T)||d&&(r[a][x][b]+=T);}else{var I=n.dataToPoint([x,_]);S=I[0]+l,M=w,T=u,C=I[1]-y,Math.abs(C)<c&&(C=(0>=C?-1:1)*c),isNaN(C)||d&&(r[a][x][b]+=C);}e.setItemLayout(v,{x:S,y:M,width:T,height:C});}});}function bf(t){return t.coordinateSystem&&"cartesian2d"===t.coordinateSystem.type;}function wf(t){return t.pipelineContext&&t.pipelineContext.large;}function Sf(t,e){return e.toGlobalCoord(e.dataToCoord("log"===e.type?1:0));}function Mf(t,e,n,i){var r=Ai(e),o=Ai(n),a=function a(t){return Ks(r,t,i)===Ks(o,t,i);},s=function s(){return a("year");},l=function l(){return s()&&a("month");},u=function u(){return l()&&a("day");},h=function h(){return u()&&a("hour");},c=function c(){return h()&&a("minute");},p=function p(){return c()&&a("second");},f=function f(){return p()&&a("millisecond");};switch(t){case"year":return s();case"month":return l();case"day":return u();case"hour":return h();case"minute":return c();case"second":return p();case"millisecond":return f();}}function Tf(t){return t/=wS,t>16?16:t>7.5?7:t>3.5?4:t>1.5?2:1;}function Cf(t){var e=30*wS;return t/=e,t>6?6:t>3?3:t>2?2:1;}function If(t){return t/=bS,t>12?12:t>6?6:t>3.5?4:t>2?2:1;}function Af(t,e){return t/=e?xS:_S,t>30?30:t>20?20:t>15?15:t>10?10:t>5?5:t>2?2:1;}function kf(t){return Li(t,!0);}function Df(t,e,n){var i=new Date(t);switch(Us(e)){case"year":case"month":i[ol(n)](0);case"day":i[al(n)](1);case"hour":i[sl(n)](0);case"minute":i[ll(n)](0);case"second":i[ul(n)](0),i[hl(n)](0);}return i.getTime();}function Lf(t,e,n,i){function r(t,e,n,r,o,a,s){for(var l=new Date(e),u=e,h=l[r]();n>u&&u<=i[1];){s.push({value:u}),h+=t,l[o](h),u=l.getTime();}s.push({value:u,notAdd:!0});}function o(t,o,a){var s=[],l=!o.length;if(!Mf(Us(t),i[0],i[1],n)){l&&(o=[{value:Df(new Date(i[0]),t,n)},{value:i[1]}]);for(var u=0;u<o.length-1;u++){var h=o[u].value,c=o[u+1].value;if(h!==c){var p=void 0,f=void 0,d=void 0,g=!1;switch(t){case"year":p=Math.max(1,Math.round(e/wS/365)),f=$s(n),d=rl(n);break;case"half-year":case"quarter":case"month":p=Cf(e),f=Js(n),d=ol(n);break;case"week":case"half-week":case"day":p=Tf(e,31),f=Qs(n),d=al(n),g=!0;break;case"half-day":case"quarter-day":case"hour":p=If(e),f=tl(n),d=sl(n);break;case"minute":p=Af(e,!0),f=el(n),d=ll(n);break;case"second":p=Af(e,!1),f=nl(n),d=ul(n);break;case"millisecond":p=kf(e),f=il(n),d=hl(n);}r(p,h,c,f,d,g,s),"year"===t&&a.length>1&&0===u&&a.unshift({value:a[0].value-p});}}for(var u=0;u<s.length;u++){a.push(s[u]);}return s;}}for(var a=1e4,s=AS,l=0,u=[],h=[],c=0,p=0,f=0;f<s.length&&l++<a;++f){var d=Us(s[f]);if(Ys(s[f])){o(s[f],u[u.length-1]||[],h);var g=s[f+1]?Us(s[f+1]):null;if(d!==g){if(h.length){p=c,h.sort(function(t,e){return t.value-e.value;});for(var y=[],m=0;m<h.length;++m){var x=h[m].value;(0===m||h[m-1].value!==x)&&(y.push(h[m]),x>=i[0]&&x<=i[1]&&c++);}var b=(i[1]-i[0])/e;if(c>1.5*b&&p>b/1.5)break;if(u.push(y),c>b||t===s[f])break;}h=[];}}}for(var w=_(v(u,function(t){return _(t,function(t){return t.value>=i[0]&&t.value<=i[1]&&!t.notAdd;});}),function(t){return t.length>0;}),S=[],M=w.length-1,f=0;f<w.length;++f){for(var T=w[f],C=0;C<T.length;++C){S.push({value:T[C].value,level:M-f});}}S.sort(function(t,e){return t.value-e.value;});for(var I=[],f=0;f<S.length;++f){(0===f||S[f].value!==S[f-1].value)&&I.push(S[f]);}return I;}function Pf(t,e){return tk(t,QA(e));}function Of(t,e,n){var i=t.rawExtentInfo;return i?i:(i=new sk(t,e,n),t.rawExtentInfo=i,i);}function Rf(t,e){return null==e?null:B(e)?0/0:t.parse(e);}function Ef(t,e){var n=t.type,i=Of(t,e,t.getExtent()).calculate();t.setBlank(i.isBlank);var r=i.min,o=i.max,a=e.ecModel;if(a&&"time"===n){var s=gf("bar",a),l=!1;if(y(s,function(t){l=l||t.getBaseAxis()===e.axis;}),l){var u=vf(s),h=Bf(r,o,e,u);r=h.min,o=h.max;}}return{extent:[r,o],fixMin:i.minFixed,fixMax:i.maxFixed};}function Bf(t,e,n,i){var r=n.axis.getExtent(),o=r[1]-r[0],a=_f(i,n.axis);if(void 0===a)return{min:t,max:e};var s=1/0;y(a,function(t){s=Math.min(t.offset,s);});var l=-1/0;y(a,function(t){l=Math.max(t.offset+t.width,l);}),s=Math.abs(s),l=Math.abs(l);var u=s+l,h=e-t,c=1-(s+l)/o,p=h/c-h;return e+=p*(l/u),t-=p*(s/u),{min:t,max:e};}function zf(t,e){var n=Ef(t,e),i=n.extent,r=e.get("splitNumber");t instanceof ok&&(t.base=e.get("logBase"));var o=t.type;t.setExtent(i[0],i[1]),t.niceExtent({splitNumber:r,fixMin:n.fixMin,fixMax:n.fixMax,minInterval:"interval"===o||"time"===o?e.get("minInterval"):null,maxInterval:"interval"===o||"time"===o?e.get("maxInterval"):null});var a=e.get("interval");null!=a&&t.setInterval&&t.setInterval(a);}function Nf(t,e){if(e=e||t.get("type"))switch(e){case"category":return new HA({ordinalMeta:t.getOrdinalMeta?t.getOrdinalMeta():t.getCategories(),extent:[1/0,-1/0]});case"time":return new ZA({locale:t.ecModel.getLocaleModel(),useUTC:t.ecModel.get("useUTC")});default:return new(NA.getClass(e)||WA)();}}function Ff(t){var e=t.scale.getExtent(),n=e[0],i=e[1];return!(n>0&&i>0||0>n&&0>i);}function Vf(t){var e=t.getLabelModel().get("formatter"),n="category"===t.type?t.scale.getExtent()[0]:null;return"time"===t.scale.type?function(e){return function(n,i){return t.scale.getFormattedLabel(n,i,e);};}(e):"string"==typeof e?function(e){return function(n){var i=t.scale.getLabel(n),r=e.replace("{value}",null!=i?i:"");return r;};}(e):"function"==typeof e?function(e){return function(i,r){return null!=n&&(r=i.value-n),e(Hf(t,i),r,null!=i.level?{level:i.level}:null);};}(e):function(e){return t.scale.getLabel(e);};}function Hf(t,e){return"category"===t.type?t.scale.getLabel(e):e.value;}function Gf(t){var e=t.model,n=t.scale;if(e.get(["axisLabel","show"])&&!n.isBlank()){var i,r,o=n.getExtent();n instanceof HA?r=n.count():(i=n.getTicks(),r=i.length);var a,s=t.getLabelModel(),l=Vf(t),u=1;r>40&&(u=Math.ceil(r/40));for(var h=0;r>h;h+=u){var c=i?i[h]:{value:o[0]+h},p=l(c,h),f=s.getTextRect(p),d=Wf(f,s.get("rotate")||0);a?a.union(d):a=d;}return a;}}function Wf(t,e){var n=e*Math.PI/180,i=t.width,r=t.height,o=i*Math.abs(Math.cos(n))+Math.abs(r*Math.sin(n)),a=i*Math.abs(Math.sin(n))+Math.abs(r*Math.cos(n)),s=new t_(t.x,t.y,o,a);return s;}function Uf(t){var e=t.get("interval");return null==e?"auto":e;}function Yf(t){return"category"===t.type&&0===Uf(t.getLabelModel());}function Xf(t,e){var n={};return y(t.mapDimensionsAll(e),function(e){n[tf(t,e)]=!0;}),b(n);}function jf(t){return ef(t.getSource(),t);}function qf(t,e){var n=e;e instanceof uS||(n=new uS(e));var i=Nf(n);return i.setExtent(t[0],t[1]),zf(i,n),i;}function Zf(t){d(t,hk);}function Kf(t,e){return e=e||{},Is(t,null,null,"normal"!==e.state);}function $f(t){return M(t)?void y(t,function(t){$f(t);}):void(p(fk,t)>=0||(fk.push(t),T(t)&&(t={install:t}),t.install(dk)));}function Jf(t){return"category"===t.type?td(t):id(t);}function Qf(t,e){return"category"===t.type?nd(t,e):{ticks:v(t.scale.getTicks(),function(t){return t.value;})};}function td(t){var e=t.getLabelModel(),n=ed(t,e);return!e.get("show")||t.scale.isBlank()?{labels:[],labelCategoryInterval:n.labelCategoryInterval}:n;}function ed(t,e){var n=rd(t,"labels"),i=Uf(e),r=od(n,i);if(r)return r;var o,a;return T(i)?o=cd(t,i):(a="auto"===i?sd(t):i,o=hd(t,a)),ad(n,i,{labels:o,labelCategoryInterval:a});}function nd(t,e){var n=rd(t,"ticks"),i=Uf(e),r=od(n,i);if(r)return r;var o,a;if((!e.get("show")||t.scale.isBlank())&&(o=[]),T(i))o=cd(t,i,!0);else if("auto"===i){var s=ed(t,t.getLabelModel());a=s.labelCategoryInterval,o=v(s.labels,function(t){return t.tickValue;});}else a=i,o=hd(t,a,!0);return ad(n,i,{ticks:o,tickCategoryInterval:a});}function id(t){var e=t.scale.getTicks(),n=Vf(t);return{labels:v(e,function(e,i){return{formattedLabel:n(e,i),rawLabel:t.scale.getLabel(e),tickValue:e.value};})};}function rd(t,e){return xk(t)[e]||(xk(t)[e]=[]);}function od(t,e){for(var n=0;n<t.length;n++){if(t[n].key===e)return t[n].value;}}function ad(t,e,n){return t.push({key:e,value:n}),n;}function sd(t){var e=xk(t).autoInterval;return null!=e?e:xk(t).autoInterval=t.calculateCategoryInterval();}function ld(t){var e=ud(t),n=Vf(t),i=(e.axisRotate-e.labelRotate)/180*Math.PI,r=t.scale,o=r.getExtent(),a=r.count();if(o[1]-o[0]<1)return 0;var s=1;a>40&&(s=Math.max(1,Math.floor(a/40)));for(var l=o[0],u=t.dataToCoord(l+1)-t.dataToCoord(l),h=Math.abs(u*Math.cos(i)),c=Math.abs(u*Math.sin(i)),p=0,f=0;l<=o[1];l+=s){var d=0,g=0,y=Rn(n({value:l}),e.font,"center","top");d=1.3*y.width,g=1.3*y.height,p=Math.max(p,d,7),f=Math.max(f,g,7);}var v=p/h,m=f/c;isNaN(v)&&(v=1/0),isNaN(m)&&(m=1/0);var _=Math.max(0,Math.floor(Math.min(v,m))),x=xk(t.model),b=t.getExtent(),w=x.lastAutoInterval,S=x.lastTickCount;return null!=w&&null!=S&&Math.abs(w-_)<=1&&Math.abs(S-a)<=1&&w>_&&x.axisExtent0===b[0]&&x.axisExtent1===b[1]?_=w:(x.lastTickCount=a,x.lastAutoInterval=_,x.axisExtent0=b[0],x.axisExtent1=b[1]),_;}function ud(t){var e=t.getLabelModel();return{axisRotate:t.getRotate?t.getRotate():t.isHorizontal&&!t.isHorizontal()?90:0,labelRotate:e.get("rotate")||0,font:e.getFont()};}function hd(t,e,n){function i(t){var e={value:t};l.push(n?t:{formattedLabel:r(e),rawLabel:o.getLabel(e),tickValue:t});}var r=Vf(t),o=t.scale,a=o.getExtent(),s=t.getLabelModel(),l=[],u=Math.max((e||0)+1,1),h=a[0],c=o.count();0!==h&&u>1&&c/u>2&&(h=Math.round(Math.ceil(h/u)*u));var p=Yf(t),f=s.get("showMinLabel")||p,d=s.get("showMaxLabel")||p;f&&h!==a[0]&&i(a[0]);for(var g=h;g<=a[1];g+=u){i(g);}return d&&g-u!==a[1]&&i(a[1]),l;}function cd(t,e,n){var i=t.scale,r=Vf(t),o=[];return y(i.getTicks(),function(t){var a=i.getLabel(t),s=t.value;e(t.value,a)&&o.push(n?s:{formattedLabel:r(t),rawLabel:a,tickValue:s});}),o;}function pd(t,e){var n=t[1]-t[0],i=e,r=n/i/2;t[0]+=r,t[1]-=r;}function fd(t,e,n,i){function r(t,e){return t=xi(t),e=xi(e),p?t>e:e>t;}var o=e.length;if(t.onBand&&!n&&o){var a,s,l=t.getExtent();if(1===o)e[0].coord=l[0],a=e[1]={coord:l[0]};else{var u=e[o-1].tickValue-e[0].tickValue,h=(e[o-1].coord-e[0].coord)/u;y(e,function(t){t.coord-=h/2;});var c=t.scale.getExtent();s=1+c[1]-e[o-1].tickValue,a={coord:e[o-1].coord+h*s},e.push(a);}var p=l[0]>l[1];r(e[0].coord,l[0])&&(i?e[0].coord=l[0]:e.shift()),i&&r(l[0],e[0].coord)&&e.unshift({coord:l[0]}),r(l[1],a.coord)&&(i?a.coord=l[1]:e.pop()),i&&r(a.coord,l[1])&&e.push({coord:l[1]});}}function dd(t){var e=FS.extend(t);return FS.registerClass(e),e;}function gd(t){var e=ZM.extend(t);return ZM.registerClass(e),e;}function yd(t){var e=qM.extend(t);return qM.registerClass(e),e;}function vd(t){var e=JM.extend(t);return JM.registerClass(e),e;}function md(){return!1;}function _d(t,e,n){var i=jv(),r=e.getWidth(),o=e.getHeight(),a=i.style;return a&&(a.position="absolute",a.left="0",a.top="0",a.width=r+"px",a.height=o+"px",i.setAttribute("data-zr-dom-id",t)),i.width=r*n,i.height=o*n,i;}function xd(t){return parseInt(t,10);}function bd(t){return t?t.__builtin__?!0:"function"!=typeof t.resize||"function"!=typeof t.refresh?!1:!0:!1;}function wd(t,e){var n=document.createElement("div");return n.style.cssText=["position:relative","width:"+t+"px","height:"+e+"px","padding:0","margin:0","border-width:0"].join(";")+";",n;}function Sd(t){t.registerPainter("canvas",Ak);}function Md(t){t.registerComponentModel(kk),t.registerComponentView(Dk);}function Td(t){return{seriesType:t,reset:function reset(t,e,n){var i=t.getData(),r=t.get("sampling"),o=t.coordinateSystem,a=i.count();if(a>10&&"cartesian2d"===o.type&&r){var s=o.getBaseAxis(),l=o.getOtherAxis(s),u=s.getExtent(),h=n.getDevicePixelRatio(),c=Math.abs(u[1]-u[0])*(h||1),p=Math.round(a/c);if(p>1){"lttb"===r&&t.setData(i.lttbDownSample(i.mapDimension(l.dim),1/p));var f=void 0;"string"==typeof r?f=Lk[r]:"function"==typeof r&&(f=r),f&&t.setData(i.downSample(i.mapDimension(l.dim),1/p,f,Pk));}}}};}function Cd(t,e,n,i,r){var o=t.getArea(),a=o.x,s=o.y,l=o.width,u=o.height,h=n.get(["lineStyle","width"])||2;a-=h/2,s-=h/2,l+=h,u+=h,a=Math.floor(a),l=Math.round(l);var c=new vb({shape:{x:a,y:s,width:l,height:u}});if(e){var p=t.getBaseAxis(),f=p.isHorizontal(),d=p.inverse;f?(d&&(c.shape.x+=l),c.shape.width=0):(d||(c.shape.y+=u),c.shape.height=0);var g="function"==typeof r?function(t){r(t,c);}:null;rs(c,{shape:{width:l,height:u,x:a,y:s}},n,null,i,g);}return c;}function Id(t,e,n){var i=t.getArea(),r=xi(i.r0,1),o=xi(i.r,1),a=new yw({shape:{cx:xi(t.cx,1),cy:xi(t.cy,1),r0:r,r:o,startAngle:i.startAngle,endAngle:i.endAngle,clockwise:i.clockwise}});if(e){var s="angle"===t.getBaseAxis().dim;s?a.shape.endAngle=i.startAngle:a.shape.r=r,rs(a,{shape:{endAngle:i.endAngle,r:o}},n);}return a;}function Ad(t,e,n,i,r){return t?"polar"===t.type?Id(t,e,n):"cartesian2d"===t.type?Cd(t,e,n,i,r):null:null;}function kd(t,e){return t.type===e;}function Dd(t,e){var n=t.mapDimensionsAll("defaultedLabel"),i=n.length;if(1===i){var r=ku(t,e,n[0]);return null!=r?r+"":null;}if(i){for(var o=[],a=0;a<n.length;a++){o.push(ku(t,e,n[a]));}return o.join(" ");}}function Ld(t,e){var n=t.mapDimensionsAll("defaultedLabel");if(!M(e))return e+"";for(var i=[],r=0;r<n.length;r++){var o=t.getDimensionInfo(n[r]);o&&i.push(e[o.index]);}return i.join(" ");}function Pd(t,e){var n=t.getArea&&t.getArea();if(kd(t,"cartesian2d")){var i=t.getBaseAxis();if("category"!==i.type||!i.onBand){var r=e.getLayout("bandWidth");i.isHorizontal()?(n.x-=r,n.width+=2*r):(n.y-=r,n.height+=2*r);}}return n;}function Od(t,e){var n=t.get("realtimeSort",!0),i=e.getBaseAxis();return n&&"category"===i.type&&"cartesian2d"===e.type?{baseAxis:i,otherAxis:e.getOtherAxis(i)}:void 0;}function Rd(t,e,n,i,r,o,a,s){var l,u;o?(u={x:i.x,width:i.width},l={y:i.y,height:i.height}):(u={y:i.y,height:i.height},l={x:i.x,width:i.width}),s||(a?is:rs)(n,{shape:l},e,r,null);var h=e?t.baseAxis.model:null;(a?is:rs)(n,{shape:u},h,r);}function Ed(t){return null!=t.startAngle&&null!=t.endAngle&&t.startAngle===t.endAngle;}function Bd(t,e,n,i,r,o,a,s){var l=e.getItemVisual(n,"style");s||t.setShape("r",i.get(["itemStyle","borderRadius"])||0),t.useStyle(l);var u=i.getShallow("cursor");if(u&&t.attr("cursor",u),!s){var h=a?r.height>0?"bottom":"top":r.width>0?"left":"right",c=Cs(i);Ts(t,c,{labelFetcher:o,labelDataIndex:n,defaultText:Dd(o.getData(),n),inheritColor:l.fill,defaultOpacity:l.opacity,defaultOutsidePosition:h});var p=t.getTextContent();Os(p,c,o.getRawValue(n),function(t){return Ld(e,t);});}var f=i.getModel(["emphasis"]);
ma(t,f.get("focus"),f.get("blurScope")),xa(t,i),Ed(r)&&(t.style.fill="none",t.style.stroke="none",y(t.states,function(t){t.style&&(t.style.fill=t.style.stroke="none");}));}function zd(t,e){var n=t.get(["itemStyle","borderColor"]);if(!n||"none"===n)return 0;var i=t.get(["itemStyle","borderWidth"])||0,r=isNaN(e.width)?Number.MAX_VALUE:Math.abs(e.width),o=isNaN(e.height)?Number.MAX_VALUE:Math.abs(e.height);return Math.min(i,r,o);}function Nd(t,e,n){var i=t.getData(),r=[],o=i.getLayout("valueAxisHorizontal")?1:0;r[1-o]=i.getLayout("valueAxisStart");var a=i.getLayout("largeDataIndices"),s=i.getLayout("barWidth"),l=t.getModel("backgroundStyle"),u=t.get("showBackground",!0);if(u){var h=i.getLayout("largeBackgroundPoints"),c=[];c[1-o]=i.getLayout("backgroundStart");var p=new Yk({shape:{points:h},incremental:!!n,silent:!0,z2:0});p.__startPoint=c,p.__baseDimIdx=o,p.__largeDataIndices=a,p.__barWidth=s,Hd(p,l,i),e.add(p);}var f=new Yk({shape:{points:i.getLayout("largePoints")},incremental:!!n});f.__startPoint=r,f.__baseDimIdx=o,f.__largeDataIndices=a,f.__barWidth=s,e.add(f),Vd(f,t,i),Mb(f).seriesIndex=t.seriesIndex,t.get("silent")||(f.on("mousedown",Xk),f.on("mousemove",Xk));}function Fd(t,e,n){var i=t.__baseDimIdx,r=1-i,o=t.shape.points,a=t.__largeDataIndices,s=Math.abs(t.__barWidth/2),l=t.__startPoint[r];zk[0]=e,zk[1]=n;for(var u=zk[i],h=zk[1-i],c=u-s,p=u+s,f=0,d=o.length/2;d>f;f++){var g=2*f,y=o[g+i],v=o[g+r];if(y>=c&&p>=y&&(v>=l?h>=l&&v>=h:h>=v&&l>=h))return a[f];}return-1;}function Vd(t,e,n){var i=n.getVisual("style");t.useStyle(h({},i)),t.style.fill=null,t.style.stroke=i.fill,t.style.lineWidth=n.getLayout("barWidth");}function Hd(t,e,n){var i=e.get("borderColor")||e.get("color"),r=e.getItemStyle();t.useStyle(r),t.style.fill=null,t.style.stroke=i,t.style.lineWidth=n.getLayout("barWidth");}function Gd(t,e,n){if(kd(n,"cartesian2d")){var i=e,r=n.getArea();return{x:t?i.x:r.x,y:t?r.y:i.y,width:t?i.width:r.width,height:t?r.height:i.height};}var r=n.getArea(),o=e;return{cx:r.cx,cy:r.cy,r0:t?r.r0:o.r0,r:t?r.r:o.r,startAngle:t?o.startAngle:0,endAngle:t?o.endAngle:2*Math.PI};}function Wd(t,e,n){var i="polar"===t.type?yw:vb;return new i({shape:Gd(e,n,t),silent:!0,z2:0});}function Ud(t){t.registerChartView(Vk),t.registerSeriesModel(Rk),t.registerLayout(t.PRIORITY.VISUAL.LAYOUT,S(xf,"bar")),t.registerLayout(t.PRIORITY.VISUAL.PROGRESSIVE_LAYOUT,jA),t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC,Td("bar")),t.registerAction({type:"changeAxisOrder",event:"changeAxisOrder",update:"update"},function(t,e){var n=t.componentType||"series";e.eachComponent({mainType:n,query:t},function(e){t.sortInfo&&e.axis.setCategorySortInfo(t.sortInfo);});});}function Yd(t,e){this.parent.drift(t,e);}function Xd(t,e,n,i){return!(!e||isNaN(e[0])||isNaN(e[1])||i.isIgnore&&i.isIgnore(n)||i.clipShape&&!i.clipShape.contain(e[0],e[1])||"none"===t.getItemVisual(n,"symbol"));}function jd(t){return null==t||k(t)||(t={isIgnore:t}),t||{};}function qd(t){var e=t.hostModel,n=e.getModel("emphasis");return{emphasisItemStyle:n.getModel("itemStyle").getItemStyle(),blurItemStyle:e.getModel(["blur","itemStyle"]).getItemStyle(),selectItemStyle:e.getModel(["select","itemStyle"]).getItemStyle(),focus:n.get("focus"),blurScope:n.get("blurScope"),hoverScale:n.get("scale"),labelStatesModels:Cs(e),cursorStyle:e.get("cursor")};}function Zd(t,e,n){var i=t.getBaseAxis(),r=t.getOtherAxis(i),o=Kd(r,n),a=i.dim,s=r.dim,l=e.mapDimension(s),u=e.mapDimension(a),h="x"===s||"radius"===s?1:0,c=v(t.dimensions,function(t){return e.mapDimension(t);}),p=!1,f=e.getCalculationInfo("stackResultDimension");return Qp(e,c[0])&&(p=!0,c[0]=f),Qp(e,c[1])&&(p=!0,c[1]=f),{dataDimsForPoint:c,valueStart:o,valueAxisDim:s,baseAxisDim:a,stacked:!!p,valueDim:l,baseDim:u,baseDataOffset:h,stackedOverDimension:e.getCalculationInfo("stackedOverDimension")};}function Kd(t,e){var n=0,i=t.scale.getExtent();return"start"===e?n=i[0]:"end"===e?n=i[1]:i[0]>0?n=i[0]:i[1]<0&&(n=i[1]),n;}function $d(t,e,n,i){var r=0/0;t.stacked&&(r=n.get(n.getCalculationInfo("stackedOverDimension"),i)),isNaN(r)&&(r=t.valueStart);var o=t.baseDataOffset,a=[];return a[o]=n.get(t.baseDim,i),a[1-o]=r,e.dataToPoint(a);}function Jd(t){return M(t)?Kk?new Float32Array(t):t:new $k(t);}function Qd(t,e){var n=[];return e.diff(t).add(function(t){n.push({cmd:"+",idx:t});}).update(function(t,e){n.push({cmd:"=",idx:e,idx1:t});}).remove(function(t){n.push({cmd:"-",idx:t});}).execute(),n;}function tg(t,e,n,i,r,o,a,s){for(var l=Qd(t,e),u=[],h=[],c=[],p=[],f=[],d=[],g=[],y=Zd(r,e,a),v=(Zd(o,t,s),t.getLayout("points")||[]),m=e.getLayout("points")||[],_=0;_<l.length;_++){var x=l[_],b=!0,w=void 0,S=void 0;switch(x.cmd){case"=":w=2*x.idx,S=2*x.idx1;var M=v[w],T=v[w+1],C=m[S],I=m[S+1];(isNaN(M)||isNaN(T))&&(M=C,T=I),u.push(M,T),h.push(C,I),c.push(n[w],n[w+1]),p.push(i[S],i[S+1]),g.push(e.getRawIndex(x.idx1));break;case"+":var A=x.idx,k=y.dataDimsForPoint,D=r.dataToPoint([e.get(k[0],A),e.get(k[1],A)]);S=2*A,u.push(D[0],D[1]),h.push(m[S],m[S+1]);var L=$d(y,r,e,A);c.push(L[0],L[1]),p.push(i[S],i[S+1]),g.push(e.getRawIndex(A));break;case"-":b=!1;}b&&(f.push(x),d.push(d.length));}d.sort(function(t,e){return g[t]-g[e];});for(var P=u.length,O=Jd(P),R=Jd(P),E=Jd(P),B=Jd(P),z=[],_=0;_<d.length;_++){var N=d[_],F=2*_,V=2*N;O[F]=u[V],O[F+1]=u[V+1],R[F]=h[V],R[F+1]=h[V+1],E[F]=c[V],E[F+1]=c[V+1],B[F]=p[V],B[F+1]=p[V+1],z[_]=f[N];}return{current:O,next:R,stackedOnCurrent:E,stackedOnNext:B,status:z};}function eg(t,e){return isNaN(t)||isNaN(e);}function ng(t,e,n,i,r,o,a,s,l){for(var u,h,c,p,f,d,g=n,y=0;i>y;y++){var v=e[2*g],m=e[2*g+1];if(g>=r||0>g)break;if(eg(v,m)){if(l){g+=o;continue;}break;}if(g===n)t[o>0?"moveTo":"lineTo"](v,m),c=v,p=m;else{var _=v-u,x=m-h;if(.5>_*_+x*x){g+=o;continue;}if(a>0){var b=g+o,w=e[2*b],S=e[2*b+1],M=y+1;if(l)for(;eg(w,S)&&i>M;){M++,b+=o,w=e[2*b],S=e[2*b+1];}var T=.5,C=0,I=0,A=void 0,k=void 0;if(M>=i||eg(w,S))f=v,d=m;else{C=w-u,I=S-h;var D=v-u,L=w-v,P=m-h,O=S-m,R=void 0,E=void 0;"x"===s?(R=Math.abs(D),E=Math.abs(L),f=v-R*a,d=m,A=v+R*a,k=m):"y"===s?(R=Math.abs(P),E=Math.abs(O),f=v,d=m-R*a,A=v,k=m+R*a):(R=Math.sqrt(D*D+P*P),E=Math.sqrt(L*L+O*O),T=E/(E+R),f=v-C*a*(1-T),d=m-I*a*(1-T),A=v+C*a*T,k=m+I*a*T,A=Jk(A,Qk(w,v)),k=Jk(k,Qk(S,m)),A=Qk(A,Jk(w,v)),k=Qk(k,Jk(S,m)),C=A-v,I=k-m,f=v-C*R/E,d=m-I*R/E,f=Jk(f,Qk(u,v)),d=Jk(d,Qk(h,m)),f=Qk(f,Jk(u,v)),d=Qk(d,Jk(h,m)),C=v-f,I=m-d,A=v+C*E/R,k=m+I*E/R);}t.bezierCurveTo(c,p,f,d,v,m),c=A,p=k;}else t.lineTo(v,m);}u=v,h=m,g+=o;}return y;}function ig(t,e){if(t.length===e.length){for(var n=0;n<t.length;n++){if(t[n]!==e[n])return;}return!0;}}function rg(t){for(var e=1/0,n=1/0,i=-1/0,r=-1/0,o=0;o<t.length;){var a=t[o++],s=t[o++];isNaN(a)||(e=Math.min(a,e),i=Math.max(a,i)),isNaN(s)||(n=Math.min(s,n),r=Math.max(s,r));}return[[e,n],[i,r]];}function og(t,e){var n=rg(t),i=n[0],r=n[1],o=rg(e),a=o[0],s=o[1];return Math.max(Math.abs(i[0]-a[0]),Math.abs(i[1]-a[1]),Math.abs(r[0]-s[0]),Math.abs(r[1]-s[1]));}function ag(t){return"number"==typeof t?t:t?.5:0;}function sg(t,e,n){if(!n.valueDim)return[];for(var i=e.count(),r=Jd(2*i),o=0;i>o;o++){var a=$d(n,t,e,o);r[2*o]=a[0],r[2*o+1]=a[1];}return r;}function lg(t,e,n){for(var i=e.getBaseAxis(),r="x"===i.dim||"radius"===i.dim?0:1,o=[],a=0,s=[],l=[],u=[];a<t.length-2;a+=2){switch(u[0]=t[a+2],u[1]=t[a+3],l[0]=t[a],l[1]=t[a+1],o.push(l[0],l[1]),n){case"end":s[r]=u[r],s[1-r]=l[1-r],o.push(s[0],s[1]);break;case"middle":var h=(l[r]+u[r])/2,c=[];s[r]=c[r]=h,s[1-r]=l[1-r],c[1-r]=u[1-r],o.push(s[0],s[1]),o.push(c[0],c[1]);break;default:s[r]=l[r],s[1-r]=u[1-r],o.push(s[0],s[1]);}}return o.push(t[a++],t[a++]),o;}function ug(t,e){var n=t.getVisual("visualMeta");if(n&&n.length&&t.count()&&"cartesian2d"===e.type){for(var i,r,o=n.length-1;o>=0;o--){var a=n[o].dimension,s=t.dimensions[a],l=t.getDimensionInfo(s);if(i=l&&l.coordDim,"x"===i||"y"===i){r=n[o];break;}}if(r){var u=e.getAxis(i),h=v(r.stops,function(t){return{offset:0,coord:u.toGlobalCoord(u.dataToCoord(t.value)),color:t.color};}),c=h.length,p=r.outerColors.slice();c&&h[0].coord>h[c-1].coord&&(h.reverse(),p.reverse());var f=10,d=h[0].coord-f,g=h[c-1].coord+f,m=g-d;if(.001>m)return"transparent";y(h,function(t){t.offset=(t.coord-d)/m;}),h.push({offset:c?h[c-1].offset:.5,color:p[1]||"transparent"}),h.unshift({offset:c?h[0].offset:.5,color:p[0]||"transparent"});var _=new Ow(0,0,0,0,h,!0);return _[i]=d,_[i+"2"]=g,_;}}}function hg(t,e,n){var i=t.get("showAllSymbol"),r="auto"===i;if(!i||r){var o=n.getAxesByScale("ordinal")[0];if(o&&(!r||!cg(o,e))){var a=e.mapDimension(o.dim),s={};return y(o.getViewLabels(),function(t){var e=o.scale.getRawOrdinalNumber(t.tickValue);s[e]=1;}),function(t){return!s.hasOwnProperty(e.get(a,t));};}}}function cg(t,e){var n=t.getExtent(),i=Math.abs(n[1]-n[0])/t.scale.count();isNaN(i)&&(i=0);for(var r=e.count(),o=Math.max(1,Math.round(r/5)),a=0;r>a;a+=o){if(1.5*qk.getSymbolSize(e,a)[t.isHorizontal()?1:0]>i)return!1;}return!0;}function pg(t,e){return isNaN(t)||isNaN(e);}function fg(t){for(var e=t.length/2;e>0&&pg(t[2*e-2],t[2*e-1]);e--){;}return e-1;}function dg(t,e){return[t[2*e],t[2*e+1]];}function gg(t,e,n){for(var i,r,o=t.length/2,a="x"===n?0:1,s=0,l=-1,u=0;o>u;u++){if(r=t[2*u+a],!isNaN(r)&&!isNaN(t[2*u+1-a]))if(0!==u){if(e>=i&&r>=e||i>=e&&e>=r){l=u;break;}s=u,i=r;}else i=r;}return{range:[s,l],t:(e-i)/(r-i)};}function yg(t,e,n,i){if(kd(e,"cartesian2d")){var r=i.getModel("endLabel"),o=r.get("show"),a=r.get("valueAnimation"),s=i.getData(),l={lastFrameIndex:0},u=o?function(n,i){t._endLabelOnDuring(n,i,s,l,a,r,e);}:null,h=e.getBaseAxis().isHorizontal(),c=Cd(e,n,i,function(){var e=t._endLabel;e&&n&&null!=l.originalX&&e.attr({x:l.originalX,y:l.originalY});},u);if(!i.get("clip",!0)){var p=c.shape,f=Math.max(p.width,p.height);h?(p.y-=f,p.height+=2*f):(p.x-=f,p.width+=2*f);}return u&&u(1,c),c;}return Id(e,n,i);}function vg(t,e){var n=e.getBaseAxis(),i=n.isHorizontal(),r=n.inverse,o=i?r?"right":"left":"center",a=i?"middle":r?"top":"bottom";return{normal:{align:t.get("align")||o,verticalAlign:t.get("verticalAlign")||a}};}function mg(t,e){return{seriesType:t,plan:gh(),reset:function reset(t){var n=t.getData(),i=t.coordinateSystem,r=t.pipelineContext,o=e||r.large;if(i){var a=v(i.dimensions,function(t){return n.mapDimension(t);}).slice(0,2),s=a.length,l=n.getCalculationInfo("stackResultDimension");Qp(n,a[0])&&(a[0]=l),Qp(n,a[1])&&(a[1]=l);var u=n.getDimensionInfo(a[0]),h=n.getDimensionInfo(a[1]),c=u&&u.index,p=h&&h.index;return s&&{progress:function progress(t,e){for(var n=t.end-t.start,r=o&&Jd(n*s),a=[],l=[],u=t.start,h=0;u<t.end;u++){var f=void 0;if(1===s){var d=e.getByDimIdx(c,u);f=i.dataToPoint(d,null,l);}else a[0]=e.getByDimIdx(c,u),a[1]=e.getByDimIdx(p,u),f=i.dataToPoint(a,null,l);o?(r[h++]=f[0],r[h++]=f[1]):e.setItemLayout(u,f.slice());}o&&e.setLayout("points",r);}};}}};}function _g(t){t.registerChartView(rD),t.registerSeriesModel(jk),t.registerLayout(mg("line",!0)),t.registerVisual({seriesType:"line",reset:function reset(t){var e=t.getData(),n=t.getModel("lineStyle").getLineStyle();n&&!n.stroke&&(n.stroke=e.getVisual("style").fill),e.setVisual("legendLineStyle",n);}}),t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC,Td("line"));}function xg(t,e){return Sl(t.getBoxLayoutParams(),{width:e.getWidth(),height:e.getHeight()});}function bg(t,e,n){e.eachSeriesByType(t,function(t){var e=t.getData(),i=e.mapDimension("value"),r=xg(t,n),o=t.get("center"),a=t.get("radius");M(a)||(a=[0,a]),M(o)||(o=[o,o]);var s=_i(r.width,n.getWidth()),l=_i(r.height,n.getHeight()),u=Math.min(s,l),h=_i(o[0],s)+r.x,c=_i(o[1],l)+r.y,p=_i(a[0],u/2),f=_i(a[1],u/2),d=-t.get("startAngle")*aD,g=t.get("minAngle")*aD,y=0;e.each(i,function(t){!isNaN(t)&&y++;});var v=e.getSum(i),m=Math.PI/(v||y)*2,_=t.get("clockwise"),x=t.get("roseType"),b=t.get("stillShowZeroSum"),w=e.getDataExtent(i);w[0]=0;var S=oD,T=0,C=d,I=_?1:-1;if(e.setLayout({viewRect:r,r:f}),e.each(i,function(t,n){var i;if(isNaN(t))return void e.setItemLayout(n,{angle:0/0,startAngle:0/0,endAngle:0/0,clockwise:_,cx:h,cy:c,r0:p,r:x?0/0:f});i="area"!==x?0===v&&b?m:t*m:oD/y,g>i?(i=g,S-=g):T+=t;var r=C+I*i;e.setItemLayout(n,{angle:i,startAngle:C,endAngle:r,clockwise:_,cx:h,cy:c,r0:p,r:x?mi(t,w,[p,f]):f}),C=r;}),oD>S&&y)if(.001>=S){var A=oD/y;e.each(i,function(t,n){if(!isNaN(t)){var i=e.getItemLayout(n);i.angle=A,i.startAngle=d+I*n*A,i.endAngle=d+I*(n+1)*A;}});}else m=S/T,C=d,e.each(i,function(t,n){if(!isNaN(t)){var i=e.getItemLayout(n),r=i.angle===g?g:t*m;i.startAngle=C,i.endAngle=C+I*r,C+=I*r;}});});}function wg(t){return{seriesType:t,reset:function reset(t,e){var n=e.findComponents({mainType:"legend"});if(n&&n.length){var i=t.getData();i.filterSelf(function(t){for(var e=i.getName(t),r=0;r<n.length;r++){if(!n[r].isSelected(e))return!1;}return!0;});}}};}function Sg(t,e,n,i,r,o,a,s,l,u){function h(t){for(var o=t.rB,a=o*o,s=0;s<t.list.length;s++){var l=t.list[s],u=Math.abs(l.label.y-n),h=i+l.len,c=h*h,p=Math.sqrt((1-Math.abs(u*u/a))*c);l.label.x=e+(p+l.len2)*r;}}function c(t){for(var o={list:[],maxY:0},a={list:[],maxY:0},s=0;s<t.length;s++){if("none"===t[s].labelAlignTo){var l=t[s],u=l.label.y>n?a:o,c=Math.abs(l.label.y-n);if(c>u.maxY){var p=l.label.x-e-l.len2*r,f=i+l.len,d=Math.abs(p)<f?Math.sqrt(c*c/(1-p*p/f/f)):f;u.rB=d,u.maxY=c;}u.list.push(l);}}h(o),h(a);}if(!(t.length<2)){for(var p=t.length,f=0;p>f;f++){if("outer"===t[f].position&&"labelLine"===t[f].labelAlignTo){var d=t[f].label.x-u;t[f].linePoints[1][0]+=d,t[f].label.x=u;}}Qh(t,l,l+a)&&c(t);}}function Mg(t,e,n,i,r,o,a,s){for(var l=[],u=[],h=Number.MAX_VALUE,c=-Number.MAX_VALUE,p=0;p<t.length;p++){var f=t[p].label;Tg(t[p])||(f.x<e?(h=Math.min(h,f.x),l.push(t[p])):(c=Math.max(c,f.x),u.push(t[p])));}Sg(u,e,n,i,1,r,o,a,s,c),Sg(l,e,n,i,-1,r,o,a,s,h);for(var p=0;p<t.length;p++){var d=t[p],f=d.label;if(!Tg(d)){var g=d.linePoints;if(g){var y="edge"===d.labelAlignTo,v=d.rect.width,m=void 0;m=y?f.x<e?g[2][0]-d.labelDistance-a-d.edgeDistance:a+r-d.edgeDistance-g[2][0]-d.labelDistance:f.x<e?f.x-a-d.bleedMargin:a+r-f.x-d.bleedMargin,m<d.rect.width&&(d.label.style.width=m,"edge"===d.labelAlignTo&&(v=m));var _=g[1][0]-g[2][0];y?g[2][0]=f.x<e?a+d.edgeDistance+v+d.labelDistance:a+r-d.edgeDistance-v-d.labelDistance:(g[2][0]=f.x<e?f.x+d.labelDistance:f.x-d.labelDistance,g[1][0]=g[2][0]+_),g[1][1]=g[2][1]=f.y;}}}}function Tg(t){return"center"===t.position;}function Cg(t){function e(t){t.ignore=!0;}function n(t){if(!t.ignore)return!0;for(var e in t.states){if(t.states[e].ignore===!1)return!0;}return!1;}var i,r,o=t.getData(),a=[],s=!1,l=(t.get("minShowLabelAngle")||0)*sD,u=o.getLayout("viewRect"),h=o.getLayout("r"),c=u.width,p=u.x,f=u.y,d=u.height;o.each(function(t){var u=o.getItemGraphicEl(t),f=u.shape,d=u.getTextContent(),g=u.getTextGuideLine(),v=o.getItemModel(t),m=v.getModel("label"),_=m.get("position")||v.get(["emphasis","label","position"]),x=m.get("distanceToLabelLine"),b=m.get("alignTo"),w=_i(m.get("edgeDistance"),c),S=m.get("bleedMargin"),M=v.getModel("labelLine"),T=M.get("length");T=_i(T,c);var C=M.get("length2");if(C=_i(C,c),Math.abs(f.endAngle-f.startAngle)<l)return y(d.states,e),void(d.ignore=!0);if(n(d)){var I,A,k,D,L=(f.startAngle+f.endAngle)/2,P=Math.cos(L),O=Math.sin(L);i=f.cx,r=f.cy;var R="inside"===_||"inner"===_;if("center"===_)I=f.cx,A=f.cy,D="center";else{var E=(R?(f.r+f.r0)/2*P:f.r*P)+i,B=(R?(f.r+f.r0)/2*O:f.r*O)+r;if(I=E+3*P,A=B+3*O,!R){var z=E+P*(T+h-f.r),N=B+O*(T+h-f.r),F=z+(0>P?-1:1)*C,V=N;I="edge"===b?0>P?p+w:p+c-w:F+(0>P?-x:x),A=V,k=[[E,B],[z,N],[F,V]];}D=R?"center":"edge"===b?P>0?"right":"left":P>0?"left":"right";}var H,G=m.get("rotate");if(H="number"==typeof G?G*(Math.PI/180):G?0>P?-L+Math.PI:-L:0,s=!!H,d.x=I,d.y=A,d.rotation=H,d.setStyle({verticalAlign:"middle"}),R){d.setStyle({align:D});var W=d.states.select;W&&(W.x+=d.x,W.y+=d.y);}else{var U=d.getBoundingRect().clone();U.applyTransform(d.getComputedTransform());var Y=(d.style.margin||0)+2.1;U.y-=Y/2,U.height+=Y,a.push({label:d,labelLine:g,position:_,len:T,len2:C,minTurnAngle:M.get("minTurnAngle"),maxSurfaceAngle:M.get("maxSurfaceAngle"),surfaceNormal:new Ym(P,O),linePoints:k,textAlign:D,labelDistance:x,labelAlignTo:b,edgeDistance:w,bleedMargin:S,rect:U});}u.setTextConfig({inside:R});}}),!s&&t.get("avoidLabelOverlap")&&Mg(a,i,r,h,c,d,p,f);for(var g=0;g<a.length;g++){var v=a[g],m=v.label,_=v.labelLine,x=isNaN(m.x)||isNaN(m.y);if(m){m.setStyle({align:v.textAlign}),x&&(y(m.states,e),m.ignore=!0);var b=m.states.select;b&&(b.x+=m.x,b.y+=m.y);}if(_){var w=v.linePoints;x||!w?(y(_.states,e),_.ignore=!0):(Uh(w,v.minTurnAngle),Yh(w,v.surfaceNormal,v.maxSurfaceAngle),_.setShape({points:w}),m.__hostTarget.textGuideLineConfig={anchor:new Ym(w[0][0],w[0][1])});}}}function Ig(t,e){var n=t.get("borderRadius");return null==n?null:(M(n)||(n=[n,n]),{innerCornerRadius:Nn(n[0],e.r0),cornerRadius:Nn(n[1],e.r)});}function Ag(t,e,n){e=M(e)&&{coordDimensions:e}||h({},e);var i=t.getSource(),r=Zp(i,e),o=new EA(r,t);return o.initData(i,n),o;}function kg(t){t.registerChartView(uD),t.registerSeriesModel(cD),rc("pie",t.registerAction),t.registerLayout(S(bg,"pie")),t.registerProcessor(wg("pie"));}function Dg(t,e){var n=t.get("center"),i=e.getWidth(),r=e.getHeight(),o=Math.min(i,r),a=_i(n[0],e.getWidth()),s=_i(n[1],e.getHeight()),l=_i(t.get("radius"),o/2);return{cx:a,cy:s,r:l};}function Lg(t,e){var n=null==t?"":t+"";return e&&("string"==typeof e?n=e.replace("{value}",n):"function"==typeof e&&(n=e(t))),n;}function Pg(t){t.registerChartView(gD),t.registerSeriesModel(yD);}function Og(t,n,i,r){y(TD,function(o,a){var s=l(l({},MD[a],!0),r,!0),u=function(t){function i(){for(var e=[],i=0;i<arguments.length;i++){e[i]=arguments[i];}var r=t.apply(this,e)||this;return r.type=n+"Axis."+a,r;}return e(i,t),i.prototype.mergeDefaultAndTheme=function(t,e){var n=Ml(this),i=n?Cl(t):{},r=e.getTheme();l(t,r.get(a+"Axis")),l(t,this.getDefaultOption()),t.type=Rg(t),n&&Tl(t,i,n);},i.prototype.optionUpdated=function(){var t=this.option;"category"===t.type&&(this.__ordinalMeta=FA.createByAxisModel(this));},i.prototype.getCategories=function(t){var e=this.option;return"category"===e.type?t?e.data:this.__ordinalMeta.categories:void 0;},i.prototype.getOrdinalMeta=function(){return this.__ordinalMeta;},i.type=n+"Axis."+a,i.defaultOption=s,i;}(i);t.registerComponentModel(u);}),t.registerSubTypeDefaulter(n+"Axis",Rg);}function Rg(t){return t.type||(t.data?"category":"value");}function Eg(t){return"interval"===t.type||"time"===t.type;}function Bg(t,e,n){n=n||{};var i=t.coordinateSystem,r=e.axis,o={},a=r.getAxesOnZeroOf()[0],s=r.position,l=a?"onZero":s,u=r.dim,h=i.getRect(),c=[h.x,h.x+h.width,h.y,h.y+h.height],p={left:0,right:1,top:0,bottom:1,onZero:2},f=e.get("offset")||0,d="x"===u?[c[2]-f,c[3]+f]:[c[0]-f,c[1]+f];if(a){var g=a.toGlobalCoord(a.dataToCoord(0));d[p.onZero]=Math.max(Math.min(g,d[1]),d[0]);}o.position=["y"===u?d[p[l]]:c[0],"x"===u?d[p[l]]:c[3]],o.rotation=Math.PI/2*("x"===u?0:1);var y={top:-1,bottom:1,left:-1,right:1};o.labelDirection=o.tickDirection=o.nameDirection=y[s],o.labelOffset=a?d[p[s]]-d[p.onZero]:0,e.get(["axisTick","inside"])&&(o.tickDirection=-o.tickDirection),z(n.labelInside,e.get(["axisLabel","inside"]))&&(o.labelDirection=-o.labelDirection);var v=e.get(["axisLabel","rotate"]);return o.labelRotate="top"===l?-v:v,o.z2=1,o;}function zg(t){return"cartesian2d"===t.get("coordinateSystem");}function Ng(t){var e={xAxisModel:null,yAxisModel:null};return y(e,function(n,i){var r=i.replace(/Model$/,""),o=t.getReferringComponents(r,j_).models[0];e[i]=o;}),e;}function Fg(t,e){return t.getCoordSysModel()===e;}function Vg(t,e,n,i){function r(t){return t.dim+"_"+t.index;}n.getAxesOnZeroOf=function(){return o?[o]:[];};var o,a=t[e],s=n.model,l=s.get(["axisLine","onZero"]),u=s.get(["axisLine","onZeroAxisIndex"]);if(l){if(null!=u)Hg(a[u])&&(o=a[u]);else for(var h in a){if(a.hasOwnProperty(h)&&Hg(a[h])&&!i[r(a[h])]){o=a[h];break;}}o&&(i[r(o)]=!0);}}function Hg(t){return t&&"category"!==t.type&&"time"!==t.type&&Ff(t);}function Gg(t,e){var n=t.getExtent(),i=n[0]+n[1];t.toGlobalCoord="x"===t.dim?function(t){return t+e;}:function(t){return i-t+e;},t.toLocalCoord="x"===t.dim?function(t){return t-e;}:function(t){return i-t+e;};}function Wg(t,e,n,i){var r,o,a=Ci(n-t),s=i[0]>i[1],l="start"===e&&!s||"start"!==e&&s;return Ii(a-LD/2)?(o=l?"bottom":"top",r="center"):Ii(a-1.5*LD)?(o=l?"top":"bottom",r="center"):(o="middle",r=1.5*LD>a&&a>LD/2?l?"left":"right":l?"right":"left"),{rotation:a,textAlign:r,textVerticalAlign:o};}function Ug(t,e,n){if(!Yf(t.axis)){var i=t.get(["axisLabel","showMinLabel"]),r=t.get(["axisLabel","showMaxLabel"]);e=e||[],n=n||[];var o=e[0],a=e[1],s=e[e.length-1],l=e[e.length-2],u=n[0],h=n[1],c=n[n.length-1],p=n[n.length-2];i===!1?(Yg(o),Yg(u)):Xg(o,a)&&(i?(Yg(a),Yg(h)):(Yg(o),Yg(u))),r===!1?(Yg(s),Yg(c)):Xg(l,s)&&(r?(Yg(l),Yg(p)):(Yg(s),Yg(c)));}}function Yg(t){t&&(t.ignore=!0);}function Xg(t,e){var n=t&&t.getBoundingRect().clone(),i=e&&e.getBoundingRect().clone();if(n&&i){var r=Fe([]);return We(r,r,-t.rotation),n.applyTransform(He([],r,t.getLocalTransform())),i.applyTransform(He([],r,e.getLocalTransform())),n.intersect(i);}}function jg(t){return"middle"===t||"center"===t;}function qg(t,e,n,i,r){for(var o=[],a=[],s=[],l=0;l<t.length;l++){var u=t[l].coord;a[0]=u,a[1]=0,s[0]=u,s[1]=n,e&&(ge(a,a,e),ge(s,s,e));var h=new Tw({subPixelOptimize:!0,shape:{x1:a[0],y1:a[1],x2:s[0],y2:s[1]},style:i,z2:2,autoBatch:!0,silent:!0});h.anid=r+"_"+t[l].tickValue,o.push(h);}return o;}function Zg(t,e,n,i){var r=n.axis,o=n.getModel("axisTick"),a=o.get("show");if("auto"===a&&i.handleAutoShown&&(a=i.handleAutoShown("axisTick")),a&&!r.scale.isBlank()){for(var s=o.getModel("lineStyle"),l=i.tickDirection*o.get("length"),u=r.getTicksCoords(),h=qg(u,e.transform,l,c(s.getLineStyle(),{stroke:n.get(["axisLine","lineStyle","color"])}),"ticks"),p=0;p<h.length;p++){t.add(h[p]);}return h;}}function Kg(t,e,n,i){var r=n.axis,o=n.getModel("minorTick");if(o.get("show")&&!r.scale.isBlank()){var a=r.getMinorTicksCoords();if(a.length)for(var s=o.getModel("lineStyle"),l=i*o.get("length"),u=c(s.getLineStyle(),c(n.getModel("axisTick").getLineStyle(),{stroke:n.get(["axisLine","lineStyle","color"])})),h=0;h<a.length;h++){for(var p=qg(a[h],e.transform,l,u,"minorticks_"+h),f=0;f<p.length;f++){t.add(p[f]);}}}}function $g(t,e,n,i){var r=n.axis,o=z(i.axisLabelShow,n.get(["axisLabel","show"]));if(o&&!r.scale.isBlank()){var a=n.getModel("axisLabel"),s=a.get("margin"),l=r.getViewLabels(),u=(z(i.labelRotate,a.get("rotate"))||0)*LD/180,h=PD.innerTextLayout(i.rotation,u,i.labelDirection),c=n.getCategories&&n.getCategories(!0),p=[],f=PD.isLabelSilent(n),d=n.get("triggerEvent");return y(l,function(o,l){var u="ordinal"===r.scale.type?r.scale.getRawOrdinalNumber(o.tickValue):o.tickValue,g=o.formattedLabel,y=o.rawLabel,v=a;if(c&&c[u]){var m=c[u];k(m)&&m.textStyle&&(v=new uS(m.textStyle,a,n.ecModel));}var _=v.getTextColor()||n.get(["axisLine","lineStyle","color"]),x=r.dataToCoord(u),b=new bb({x:x,y:i.labelOffset+i.labelDirection*s,rotation:h.rotation,silent:f,z2:10,style:Is(v,{text:g,align:v.getShallow("align",!0)||h.textAlign,verticalAlign:v.getShallow("verticalAlign",!0)||v.getShallow("baseline",!0)||h.textVerticalAlign,fill:"function"==typeof _?_("category"===r.type?y:"value"===r.type?u+"":u,l):_})});if(b.anid="label_"+u,d){var w=PD.makeAxisEventDataBase(n);w.targetType="axisLabel",w.value=y,Mb(b).eventData=w;}e.add(b),b.updateTransform(),p.push(b),t.add(b),b.decomposeTransform();}),p;}}function Jg(t,e){var n={axesInfo:{},seriesInvolved:!1,coordSysAxesInfo:{},coordSysMap:{}};return Qg(n,t,e),n.seriesInvolved&&ey(n,t),n;}function Qg(t,e,n){var i=e.getComponent("tooltip"),r=e.getComponent("axisPointer"),o=r.get("link",!0)||[],a=[];y(n.getCoordinateSystems(),function(n){function s(i,s,l){var h=l.model.getModel("axisPointer",r),p=h.get("show");if(p&&("auto"!==p||i||sy(h))){null==s&&(s=h.get("triggerTooltip")),h=i?ty(l,c,r,e,i,s):h;var f=h.get("snap"),d=ly(l.model),g=s||f||"category"===l.type,y=t.axesInfo[d]={key:d,axis:l,coordSys:n,axisPointerModel:h,triggerTooltip:s,involveSeries:g,snap:f,useHandle:sy(h),seriesModels:[],linkGroup:null};u[d]=y,t.seriesInvolved=t.seriesInvolved||g;var v=ny(o,l);if(null!=v){var m=a[v]||(a[v]={axesInfo:{}});m.axesInfo[d]=y,m.mapper=o[v].mapper,y.linkGroup=m;}}}if(n.axisPointerEnabled){var l=ly(n.model),u=t.coordSysAxesInfo[l]={};t.coordSysMap[l]=n;var h=n.model,c=h.getModel("tooltip",i);if(y(n.getAxes(),S(s,!1,null)),n.getTooltipAxes&&i&&c.get("show")){var p="axis"===c.get("trigger"),f="cross"===c.get(["axisPointer","type"]),d=n.getTooltipAxes(c.get(["axisPointer","axis"]));(p||f)&&y(d.baseAxes,S(s,f?"cross":!0,p)),f&&y(d.otherAxes,S(s,"cross",!1));}}});}function ty(t,e,n,i,r,o){var a=e.getModel("axisPointer"),l=["type","snap","lineStyle","shadowStyle","label","animation","animationDurationUpdate","animationEasingUpdate","z"],u={};y(l,function(t){u[t]=s(a.get(t));}),u.snap="category"!==t.type&&!!o,"cross"===a.get("type")&&(u.type="line");var h=u.label||(u.label={});if(null==h.show&&(h.show=!1),"cross"===r){var p=a.get(["label","show"]);if(h.show=null!=p?p:!0,!o){var f=u.lineStyle=a.get("crossStyle");f&&c(h,f.textStyle);}}return t.model.getModel("axisPointer",new uS(u,n,i));}function ey(t,e){e.eachSeries(function(e){var n=e.coordinateSystem,i=e.get(["tooltip","trigger"],!0),r=e.get(["tooltip","show"],!0);n&&"none"!==i&&i!==!1&&"item"!==i&&r!==!1&&e.get(["axisPointer","show"],!0)!==!1&&y(t.coordSysAxesInfo[ly(n.model)],function(t){var i=t.axis;n.getAxis(i.dim)===i&&(t.seriesModels.push(e),null==t.seriesDataCount&&(t.seriesDataCount=0),t.seriesDataCount+=e.getData().count());});});}function ny(t,e){for(var n=e.model,i=e.dim,r=0;r<t.length;r++){var o=t[r]||{};if(iy(o[i+"AxisId"],n.id)||iy(o[i+"AxisIndex"],n.componentIndex)||iy(o[i+"AxisName"],n.name))return r;}}function iy(t,e){return"all"===t||M(t)&&p(t,e)>=0||t===e;}function ry(t){var e=oy(t);if(e){var n=e.axisPointerModel,i=e.axis.scale,r=n.option,o=n.get("status"),a=n.get("value");null!=a&&(a=i.parse(a));var s=sy(n);null==o&&(r.status=s?"show":"hide");var l=i.getExtent().slice();l[0]>l[1]&&l.reverse(),(null==a||a>l[1])&&(a=l[1]),a<l[0]&&(a=l[0]),r.value=a,s&&(r.status=e.axis.scale.isBlank()?"hide":"show");}}function oy(t){var e=(t.ecModel.getComponent("axisPointer")||{}).coordSysAxesInfo;return e&&e.axesInfo[ly(t)];}function ay(t){var e=oy(t);return e&&e.axisPointerModel;}function sy(t){return!!t.get(["handle","show"]);}function ly(t){return t.type+"||"+t.id;}function uy(t,e,n,i){var r=n.axis;if(!r.scale.isBlank()){var o=n.getModel("splitArea"),a=o.getModel("areaStyle"),s=a.get("color"),l=i.coordinateSystem.getRect(),u=r.getTicksCoords({tickModel:o,clamp:!0});if(u.length){var h=s.length,p=BD(t).splitAreaColors,f=X(),d=0;if(p)for(var g=0;g<u.length;g++){var y=p.get(u[g].tickValue);if(null!=y){d=(y+(h-1)*g)%h;break;}}var v=r.toGlobalCoord(u[0].coord),m=a.getAreaStyle();s=M(s)?s:[s];for(var g=1;g<u.length;g++){var _=r.toGlobalCoord(u[g].coord),x=void 0,b=void 0,w=void 0,S=void 0;r.isHorizontal()?(x=v,b=l.y,w=_-x,S=l.height,v=x+w):(x=l.x,b=v,w=l.width,S=_-b,v=b+S);var T=u[g-1].tickValue;null!=T&&f.set(T,d),e.add(new vb({anid:null!=T?"area_"+T:null,shape:{x:x,y:b,width:w,height:S},style:c({fill:s[d]},m),autoBatch:!0,silent:!0})),d=(d+1)%h;}BD(t).splitAreaColors=f;}}}function hy(t){BD(t).splitAreaColors=null;}function cy(t){t.registerComponentView(WD),t.registerComponentModel(vD),t.registerCoordinateSystem("cartesian2d",DD),Og(t,"x",mD,UD),Og(t,"y",mD,UD),t.registerComponentView(HD),t.registerComponentView(GD),t.registerPreprocessor(function(t){t.xAxis&&t.yAxis&&!t.grid&&(t.grid={});});}function py(t){t.registerComponentModel(YD),t.registerComponentView(XD);}function fy(t,e){var n=kS(e.get("padding")),i=e.getItemStyle(["color","opacity"]);return i.fill=e.get("backgroundColor"),t=new vb({shape:{x:t.x-n[3],y:t.y-n[0],width:t.width+n[1]+n[3],height:t.height+n[0]+n[2],r:e.get("borderRadius")},style:i,silent:!0,z2:-1});}function dy(t,e,n,i,r,o,a){for(var s=e.getModel("itemStyle"),l=aS.concat([["decal"]]),u={},h=0;h<l.length;++h){var c=l[h][l[h].length-1],p=l[h][0],f=s.getShallow(c);if("inherit"===f)switch(p){case"fill":u.fill=r[o];break;case"stroke":u.stroke=r[t.startsWith("empty")?"fill":"stroke"];break;case"opacity":u.opacity=("fill"===o?r:i).opacity;break;default:u[p]=r[p];}else"auto"===f&&"lineWidth"===p?u.lineWidth=r.lineWidth>0?2:0:u[p]=f;}for(var d=e.getModel("lineStyle"),g=iS.concat([["inactiveColor"],["inactiveWidth"]]),y={},h=0;h<g.length;++h){var c=g[h][1],p=g[h][0],f=d.getShallow(c);"inherit"===f?y[p]=i[p]:"auto"===f&&"lineWidth"===p?y.lineWidth=i.lineWidth>0?2:0:y[p]=f;}if("auto"===u.fill&&(u.fill=r.fill),"auto"===u.stroke&&(u.stroke=r.fill),"auto"===y.stroke&&(y.stroke=r.fill),!a){var v=e.get("inactiveBorderWidth"),m=u[t.indexOf("empty")>-1?"fill":"stroke"];u.lineWidth="auto"===v?r.lineWidth>0&&m?2:0:u.lineWidth,u.fill=e.get("inactiveColor"),u.stroke=e.get("inactiveBorderColor"),y.stroke=n.get("inactiveColor"),y.lineWidth=n.get("inactiveWidth");}return{itemStyle:u,lineStyle:y};}function gy(t){var e=t.symbolType||"roundRect",n=uc(e,0,0,t.itemWidth,t.itemHeight,t.itemStyle.fill,t.symbolKeepAspect);return n.setStyle(t.itemStyle),e.indexOf("empty")>-1&&(n.style.stroke=n.style.fill,n.style.fill="#fff",n.style.lineWidth=2),n;}function yy(t,e,n,i){_y(t,e,n,i),n.dispatchAction({type:"legendToggleSelect",name:null!=t?t:e}),my(t,e,n,i);}function vy(t){for(var e,n=t.getZr().storage.getDisplayList(),i=0,r=n.length;r>i&&!(e=n[i].states.emphasis);){i++;}return e&&e.hoverLayer;}function my(t,e,n,i){vy(n)||n.dispatchAction({type:"highlight",seriesName:t,name:e,excludeSeriesId:i});}function _y(t,e,n,i){vy(n)||n.dispatchAction({type:"downplay",seriesName:t,name:e,excludeSeriesId:i});}function xy(t){var e=t.findComponents({mainType:"legend"});e&&e.length&&t.filterSeries(function(t){for(var n=0;n<e.length;n++){if(!e[n].isSelected(t.name))return!1;}return!0;});}function by(t,e,n){var i,r={},o="toggleSelected"===t;return n.eachComponent("legend",function(n){o&&null!=i?n[i?"select":"unSelect"](e.name):"allSelect"===t||"inverseSelect"===t?n[t]():(n[t](e.name),i=n.isSelected(e.name));var a=n.getData();y(a,function(t){var e=t.get("name");if("\n"!==e&&""!==e){var i=n.isSelected(e);r[e]=r.hasOwnProperty(e)?r[e]&&i:i;}});}),"allSelect"===t||"inverseSelect"===t?{selected:r}:{name:e.name,selected:r};}function wy(t){t.registerAction("legendToggleSelect","legendselectchanged",S(by,"toggleSelected")),t.registerAction("legendAllSelect","legendselectall",S(by,"allSelect")),t.registerAction("legendInverseSelect","legendinverseselect",S(by,"inverseSelect")),t.registerAction("legendSelect","legendselected",S(by,"select")),t.registerAction("legendUnSelect","legendunselected",S(by,"unSelect"));}function Sy(t){t.registerComponentModel(qD),t.registerComponentView(JD),t.registerProcessor(t.PRIORITY.PROCESSOR.SERIES_FILTER,xy),t.registerSubTypeDefaulter("legend",function(){return"plain";}),wy(t);}function My(t,e,n){var i=t.getOrient(),r=[1,1];r[i.index]=0,Tl(e,n,{type:"box",ignoreSize:!!r});}function Ty(t){t.registerAction("legendScroll","legendscroll",function(t,e){var n=t.scrollDataIndex;null!=n&&e.eachComponent({mainType:"legend",subType:"scroll",query:t},function(t){t.setScrollDataIndex(n);});});}function Cy(t){$f(Sy),t.registerComponentModel(QD),t.registerComponentView(iL),Ty(t);}function Iy(t,e,n,i){Ay(rL(n).lastProp,i)||(rL(n).lastProp=i,e?is(n,i,t):(n.stopAnimation(),n.attr(i)));}function Ay(t,e){if(k(t)&&k(e)){var n=!0;return y(e,function(e,i){n=n&&Ay(t[i],e);}),!!n;}return t===e;}function ky(t,e){t[e.get(["label","show"])?"show":"hide"]();}function Dy(t){return{x:t.x||0,y:t.y||0,rotation:t.rotation||0};}function Ly(t,e,n){var i=e.get("z"),r=e.get("zlevel");t&&t.traverse(function(t){"group"!==t.type&&(null!=i&&(t.z=i),null!=r&&(t.zlevel=r),t.silent=n);});}function Py(t){var e,n=t.get("type"),i=t.getModel(n+"Style");return"line"===n?(e=i.getLineStyle(),e.fill=null):"shadow"===n&&(e=i.getAreaStyle(),e.stroke=null),e;}function Oy(t,e,n,i,r){var o=n.get("value"),a=Ey(o,e.axis,e.ecModel,n.get("seriesDataIndices"),{precision:n.get(["label","precision"]),formatter:n.get(["label","formatter"])}),s=n.getModel("label"),l=kS(s.get("padding")||0),u=s.getFont(),h=Rn(a,u),c=r.position,p=h.width+l[1]+l[3],f=h.height+l[0]+l[2],d=r.align;"right"===d&&(c[0]-=p),"center"===d&&(c[0]-=p/2);var g=r.verticalAlign;"bottom"===g&&(c[1]-=f),"middle"===g&&(c[1]-=f/2),Ry(c,p,f,i);
var y=s.get("backgroundColor");y&&"auto"!==y||(y=e.get(["axisLine","lineStyle","color"])),t.label={x:c[0],y:c[1],style:Is(s,{text:a,font:u,fill:s.getTextColor(),padding:l,backgroundColor:y}),z2:10};}function Ry(t,e,n,i){var r=i.getWidth(),o=i.getHeight();t[0]=Math.min(t[0]+e,r)-e,t[1]=Math.min(t[1]+n,o)-n,t[0]=Math.max(t[0],0),t[1]=Math.max(t[1],0);}function Ey(t,e,n,i,r){t=e.scale.parse(t);var o=e.scale.getLabel({value:t},{precision:r.precision}),a=r.formatter;if(a){var s={value:Hf(e,{value:t}),axisDimension:e.dim,axisIndex:e.index,seriesData:[]};y(i,function(t){var e=n.getSeriesByIndex(t.seriesIndex),i=t.dataIndexInside,r=e&&e.getDataParams(i);r&&s.seriesData.push(r);}),C(a)?o=a.replace("{value}",o):T(a)&&(o=a(s));}return o;}function By(t,e,n){var i=Ne();return We(i,i,n.rotation),Ge(i,i,n.position),hs([t.dataToCoord(e),(n.labelOffset||0)+(n.labelDirection||1)*(n.labelMargin||0)],i);}function zy(t,e,n,i,r,o){var a=PD.innerTextLayout(n.rotation,0,n.labelDirection);n.labelMargin=r.get(["label","margin"]),Oy(e,i,r,o,{position:By(i.axis,t,n),align:a.textAlign,verticalAlign:a.textVerticalAlign});}function Ny(t,e,n){return n=n||0,{x1:t[n],y1:t[1-n],x2:e[n],y2:e[1-n]};}function Fy(t,e,n){return n=n||0,{x:t[n],y:t[1-n],width:e[n],height:e[1-n]};}function Vy(t,e){var n={};return n[e.dim+"AxisIndex"]=e.index,t.getCartesian(n);}function Hy(t){return"x"===t.dim?0:1;}function Gy(t,e,n){if(!Rv.node){var i=e.getZr();cL(i).records||(cL(i).records={}),Wy(i,e);var r=cL(i).records[t]||(cL(i).records[t]={});r.handler=n;}}function Wy(t,e){function n(n,i){t.on(n,function(n){var r=jy(e);pL(cL(t).records,function(t){t&&i(t,n,r.dispatchAction);}),Uy(r.pendings,e);});}cL(t).initialized||(cL(t).initialized=!0,n("click",S(Xy,"click")),n("mousemove",S(Xy,"mousemove")),n("globalout",Yy));}function Uy(t,e){var n,i=t.showTip.length,r=t.hideTip.length;i?n=t.showTip[i-1]:r&&(n=t.hideTip[r-1]),n&&(n.dispatchAction=null,e.dispatchAction(n));}function Yy(t,e,n){t.handler("leave",null,n);}function Xy(t,e,n,i){e.handler(t,n,i);}function jy(t){var e={showTip:[],hideTip:[]},n=function n(i){var r=e[i.type];r?r.push(i):(i.dispatchAction=n,t.dispatchAction(i));};return{dispatchAction:n,pendings:e};}function qy(t,e){if(!Rv.node){var n=e.getZr(),i=(cL(n).records||{})[t];i&&(cL(n).records[t]=null);}}function Zy(t,e){var n,i=[],r=t.seriesIndex;if(null==r||!(n=e.getSeriesByIndex(r)))return{point:[]};var o=n.getData(),a=rr(o,t);if(null==a||0>a||M(a))return{point:[]};var s=o.getItemGraphicEl(a),l=n.coordinateSystem;if(n.getTooltipPosition)i=n.getTooltipPosition(a)||[];else if(l&&l.dataToPoint){if(t.isStacked){var u=l.getBaseAxis(),h=l.getOtherAxis(u),c=h.dim,p=u.dim,f="x"===c||"radius"===c?1:0,d=o.mapDimension(p),g=[];g[f]=o.get(d,a),g[1-f]=o.get(o.getCalculationInfo("stackResultDimension"),a),i=l.dataToPoint(g)||[];}else i=l.dataToPoint(o.getValues(v(l.dimensions,function(t){return o.mapDimension(t);}),a))||[];}else if(s){var y=s.getBoundingRect().clone();y.applyTransform(s.transform),i=[y.x+y.width/2,y.y+y.height/2];}return{point:i,el:s};}function Ky(t,e,n){var i=t.currTrigger,r=[t.x,t.y],o=t,a=t.dispatchAction||qv(n.dispatchAction,n),s=e.getComponent("axisPointer").coordSysAxesInfo;if(s){av(r)&&(r=Zy({seriesIndex:o.seriesIndex,dataIndex:o.dataIndex},e).point);var l=av(r),u=o.axesInfo,h=s.axesInfo,c="leave"===i||av(r),p={},f={},d={list:[],map:{}},g={showPointer:S(Qy,f),showTooltip:S(tv,d)};y(s.coordSysMap,function(t,e){var n=l||t.containPoint(r);y(s.coordSysAxesInfo[e],function(t){var e=t.axis,i=rv(u,t);if(!c&&n&&(!u||i)){var o=i&&i.value;null!=o||l||(o=e.pointToData(r)),null!=o&&$y(t,o,g,!1,p);}});});var v={};return y(h,function(t,e){var n=t.linkGroup;n&&!f[e]&&y(n.axesInfo,function(e,i){var r=f[i];if(e!==t&&r){var o=r.value;n.mapper&&(o=t.axis.scale.parse(n.mapper(o,ov(e),ov(t)))),v[t.key]=o;}});}),y(v,function(t,e){$y(h[e],t,g,!0,p);}),ev(f,h,p),nv(d,r,t,a),iv(h,a,n),p;}}function $y(t,e,n,i,r){var o=t.axis;if(!o.scale.isBlank()&&o.containData(e)){if(!t.involveSeries)return void n.showPointer(t,e);var a=Jy(e,t),s=a.payloadBatch,l=a.snapToValue;s[0]&&null==r.seriesIndex&&h(r,s[0]),!i&&t.snap&&o.containData(l)&&null!=l&&(e=l),n.showPointer(t,e,s),n.showTooltip(t,a,l);}}function Jy(t,e){var n=e.axis,i=n.dim,r=t,o=[],a=Number.MAX_VALUE,s=-1;return y(e.seriesModels,function(e){var l,u,h=e.getData().mapDimensionsAll(i);if(e.getAxisTooltipData){var c=e.getAxisTooltipData(h,t,n);u=c.dataIndices,l=c.nestestValue;}else{if(u=e.getData().indicesOfNearest(h[0],t,"category"===n.type?.5:null),!u.length)return;l=e.getData().get(h[0],u[0]);}if(null!=l&&isFinite(l)){var p=t-l,f=Math.abs(p);a>=f&&((a>f||p>=0&&0>s)&&(a=f,s=p,r=l,o.length=0),y(u,function(t){o.push({seriesIndex:e.seriesIndex,dataIndexInside:t,dataIndex:e.getData().getRawIndex(t)});}));}}),{payloadBatch:o,snapToValue:r};}function Qy(t,e,n,i){t[e.key]={value:n,payloadBatch:i};}function tv(t,e,n,i){var r=n.payloadBatch,o=e.axis,a=o.model,s=e.axisPointerModel;if(e.triggerTooltip&&r.length){var l=e.coordSys.model,u=ly(l),h=t.map[u];h||(h=t.map[u]={coordSysId:l.id,coordSysIndex:l.componentIndex,coordSysType:l.type,coordSysMainType:l.mainType,dataByAxis:[]},t.list.push(h)),h.dataByAxis.push({axisDim:o.dim,axisIndex:a.componentIndex,axisType:a.type,axisId:a.id,value:i,valueLabelOpt:{precision:s.get(["label","precision"]),formatter:s.get(["label","formatter"])},seriesDataIndices:r.slice()});}}function ev(t,e,n){var i=n.axesInfo=[];y(e,function(e,n){var r=e.axisPointerModel.option,o=t[n];o?(!e.useHandle&&(r.status="show"),r.value=o.value,r.seriesDataIndices=(o.payloadBatch||[]).slice()):!e.useHandle&&(r.status="hide"),"show"===r.status&&i.push({axisDim:e.axis.dim,axisIndex:e.axis.model.componentIndex,value:r.value});});}function nv(t,e,n,i){if(av(e)||!t.list.length)return void i({type:"hideTip"});var r=((t.list[0].dataByAxis[0]||{}).seriesDataIndices||[])[0]||{};i({type:"showTip",escapeConnect:!0,x:e[0],y:e[1],tooltipOption:n.tooltipOption,position:n.position,dataIndexInside:r.dataIndexInside,dataIndex:r.dataIndex,seriesIndex:r.seriesIndex,dataByCoordSys:t.list});}function iv(t,e,n){var i=n.getZr(),r="axisPointerLastHighlights",o=dL(i)[r]||{},a=dL(i)[r]={};y(t,function(t){var e=t.axisPointerModel.option;"show"===e.status&&y(e.seriesDataIndices,function(t){var e=t.seriesIndex+" | "+t.dataIndex;a[e]=t;});});var s=[],l=[];y(o,function(t,e){!a[e]&&l.push(t);}),y(a,function(t,e){!o[e]&&s.push(t);}),l.length&&n.dispatchAction({type:"downplay",escapeConnect:!0,notBlur:!0,batch:l}),s.length&&n.dispatchAction({type:"highlight",escapeConnect:!0,notBlur:!0,batch:s});}function rv(t,e){for(var n=0;n<(t||[]).length;n++){var i=t[n];if(e.axis.dim===i.axisDim&&e.axis.model.componentIndex===i.axisIndex)return i;}}function ov(t){var e=t.axis.model,n={},i=n.axisDim=t.axis.dim;return n.axisIndex=n[i+"AxisIndex"]=e.componentIndex,n.axisName=n[i+"AxisName"]=e.name,n.axisId=n[i+"AxisId"]=e.id,n;}function av(t){return!t||null==t[0]||isNaN(t[0])||null==t[1]||isNaN(t[1]);}function sv(t){ED.registerAxisPointerClass("CartesianAxisPointer",lL),t.registerComponentModel(hL),t.registerComponentView(fL),t.registerPreprocessor(function(t){if(t){(!t.axisPointer||0===t.axisPointer.length)&&(t.axisPointer={});var e=t.axisPointer.link;e&&!M(e)&&(t.axisPointer.link=[e]);}}),t.registerProcessor(t.PRIORITY.PROCESSOR.STATISTIC,function(t,e){t.getComponent("axisPointer").coordSysAxesInfo=Jg(t,e);}),t.registerAction({type:"updateAxisPointer",event:"updateAxisPointer",update:":updateAxisPointer"},Ky);}function lv(t){var e=t.get("confine");return null!=e?!!e:"richText"===t.get("renderMode");}function uv(t){if(Rv.domSupported)for(var e=document.documentElement.style,n=0,i=t.length;i>n;n++){if(t[n]in e)return t[n];}}function hv(t,e){if(!t)return e;e=fl(e,!0);var n=t.indexOf(e);return t=-1===n?e:"-"+t.slice(0,n)+"-"+e,t.toLowerCase();}function cv(t,e){var n=t.currentStyle||document.defaultView&&document.defaultView.getComputedStyle(t);return n?e?n[e]:n:null;}function pv(t){return t="left"===t?"right":"right"===t?"left":"top"===t?"bottom":"top";}function fv(t,e,n){if(!C(n)||"inside"===n)return"";e=xl(e);var i=pv(n),r=i+":-6px;",o=_L+":";p(["left","right"],i)>-1?(r+="top:50%",o+="translateY(-50%) rotate("+("left"===i?-225:-45)+"deg)"):(r+="left:50%",o+="translateX(-50%) rotate("+("top"===i?225:45)+"deg)");var a=e+" solid 1px;",s=["position:absolute;width:10px;height:10px;",r+";"+o+";","border-bottom:"+a,"border-right:"+a,"background-color:"+t+";","box-shadow:8px 8px 16px -3px #000;"];return'<div style="'+s.join("")+'"></div>';}function dv(t,e){var n="cubic-bezier(0.23,1,0.32,1)",i=" "+t/2+"s "+n,r="opacity"+i+",visibility"+i;return e||(i=" "+t+"s "+n,r+=Rv.transformSupported?","+yL+i:",left"+i+",top"+i),mL+":"+r;}function gv(t,e,n){var i=t.toFixed(0)+"px",r=e.toFixed(0)+"px";if(!Rv.transformSupported)return n?"top:"+r+";left:"+i+";":[["top",r],["left",i]];var o=Rv.transform3dSupported,a="translate"+(o?"3d":"")+"("+i+","+r+(o?",0":"")+")";return n?"top:0;left:0;"+_L+":"+a+";":[["top",0],["left",0],[yL,a]];}function yv(t){var e=[],n=t.get("fontSize"),i=t.getTextColor();i&&e.push("color:"+i),e.push("font:"+t.getFont()),n&&e.push("line-height:"+Math.round(3*n/2)+"px");var r=t.get("textShadowColor"),o=t.get("textShadowBlur")||0,a=t.get("textShadowOffsetX")||0,s=t.get("textShadowOffsetY")||0;return r&&o&&e.push("text-shadow:"+a+"px "+s+"px "+o+"px "+r),y(["decoration","align"],function(n){var i=t.get(n);i&&e.push("text-"+n+":"+i);}),e.join(";");}function vv(t,e,n){var i=[],r=t.get("transitionDuration"),o=t.get("backgroundColor"),a=t.get("shadowBlur"),s=t.get("shadowColor"),l=t.get("shadowOffsetX"),u=t.get("shadowOffsetY"),h=t.getModel("textStyle"),c=ih(t,"html"),p=l+"px "+u+"px "+a+"px "+s;return i.push("box-shadow:"+p),e&&r&&i.push(dv(r,n)),o&&(Rv.canvasSupported?i.push("background-color:"+o):(i.push("background-color:#"+un(o)),i.push("filter:alpha(opacity=70)"))),y(["width","color","radius"],function(e){var n="border-"+e,r=fl(n),o=t.get(r);null!=o&&i.push(n+":"+o+("color"===e?"":"px"));}),i.push(yv(h)),null!=c&&i.push("padding:"+kS(c).join("px ")+"px"),i.join(";")+";";}function mv(t,e,n,i,r){var o=e&&e.painter;if(n){var a=o&&o.getViewportRoot();a&&xe(t,a,document.body,i,r);}else{t[0]=i,t[1]=r;var s=o&&o.getViewportRootOffset();s&&(t[0]+=s.offsetLeft,t[1]+=s.offsetTop);}t[2]=t[0]/e.getWidth(),t[3]=t[1]/e.getHeight();}function _v(t){return Math.max(0,t);}function xv(t){var e=_v(t.shadowBlur||0),n=_v(t.shadowOffsetX||0),i=_v(t.shadowOffsetY||0);return{left:_v(e-n),right:_v(e+n),top:_v(e-i),bottom:_v(e+i)};}function bv(t,e,n,i){t[0]=n,t[1]=i,t[2]=t[0]/e.getWidth(),t[3]=t[1]/e.getHeight();}function wv(t,e,n){var i,r=e.ecModel;n?(i=new uS(n,r,r),i=new uS(e.option,i,r)):i=e;for(var o=t.length-1;o>=0;o--){var a=t[o];a&&(a instanceof uS&&(a=a.get("tooltip",!0)),C(a)&&(a={formatter:a}),a&&(i=new uS(a,i,r)));}return i;}function Sv(t,e){return t.dispatchAction||qv(e.dispatchAction,e);}function Mv(t,e,n,i,r,o,a){var s=n.getOuterSize(),l=s.width,u=s.height;return null!=o&&(t+l+o+2>i?t-=l+o:t+=o),null!=a&&(e+u+a>r?e-=u+a:e+=a),[t,e];}function Tv(t,e,n,i,r){var o=n.getOuterSize(),a=o.width,s=o.height;return t=Math.min(t+a,i)-a,e=Math.min(e+s,r)-s,t=Math.max(t,0),e=Math.max(e,0),[t,e];}function Cv(t,e,n){var i=n[0],r=n[1],o=10,a=5,s=0,l=0,u=e.width,h=e.height;switch(t){case"inside":s=e.x+u/2-i/2,l=e.y+h/2-r/2;break;case"top":s=e.x+u/2-i/2,l=e.y-r-o;break;case"bottom":s=e.x+u/2-i/2,l=e.y+h+o;break;case"left":s=e.x-i-o-a,l=e.y+h/2-r/2;break;case"right":s=e.x+u+o+a,l=e.y+h/2-r/2;}return[s,l];}function Iv(t){return"center"===t||"middle"===t;}function Av(t,e,n){var i=sr(t).queryOptionMap,r=i.keys()[0];if(r&&"series"!==r){var o=lr(e,r,i.get(r),{useDefault:!1,enableAll:!1,enableNone:!1}),a=o.models[0];if(a){var s,l=n.getViewOfComponentModel(a);return l.group.traverse(function(e){var n=Mb(e).tooltipConfig;return n&&n.name===t.name?(s=e,!0):void 0;}),s?{componentMainType:r,componentIndex:a.componentIndex,el:s}:void 0;}}}function kv(t){$f(sv),t.registerComponentModel(gL),t.registerComponentView(IL),t.registerAction({type:"showTip",event:"showTip",update:"tooltip:manuallyShowTip"},function(){}),t.registerAction({type:"hideTip",event:"hideTip",update:"tooltip:manuallyHideTip"},function(){});}var _Dv=function Dv(t,e){return(_Dv=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var n in e){Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);}})(t,e);},_Lv=function Lv(){return _Lv=Object.assign||function(t){for(var e,n=1,i=arguments.length;i>n;n++){e=arguments[n];for(var r in e){Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);}}return t;},_Lv.apply(this,arguments);},Pv=function(){function t(){this.firefox=!1,this.ie=!1,this.edge=!1,this.newEdge=!1,this.weChat=!1;}return t;}(),Ov=function(){function t(){this.browser=new Pv(),this.node=!1,this.wxa=!1,this.worker=!1,this.canvasSupported=!1,this.svgSupported=!1,this.touchEventsSupported=!1,this.pointerEventsSupported=!1,this.domSupported=!1,this.transformSupported=!1,this.transform3dSupported=!1;}return t;}(),Rv=new Ov();"object"==typeof wx&&"function"==typeof wx.getSystemInfoSync?(Rv.wxa=!0,Rv.canvasSupported=!0,Rv.touchEventsSupported=!0):"undefined"==typeof document&&"undefined"!=typeof self?(Rv.worker=!0,Rv.canvasSupported=!0):"undefined"==typeof navigator?(Rv.node=!0,Rv.canvasSupported=!0,Rv.svgSupported=!0):i(navigator.userAgent,Rv);var Ev={"[object Function]":!0,"[object RegExp]":!0,"[object Date]":!0,"[object Error]":!0,"[object CanvasGradient]":!0,"[object CanvasPattern]":!0,"[object Image]":!0,"[object Canvas]":!0},Bv={"[object Int8Array]":!0,"[object Uint8Array]":!0,"[object Uint8ClampedArray]":!0,"[object Int16Array]":!0,"[object Uint16Array]":!0,"[object Int32Array]":!0,"[object Uint32Array]":!0,"[object Float32Array]":!0,"[object Float64Array]":!0},zv=Object.prototype.toString,Nv=Array.prototype,Fv=Nv.forEach,Vv=Nv.filter,Hv=Nv.slice,Gv=Nv.map,Wv=function(){}.constructor,Uv=Wv?Wv.prototype:null,Yv={},Xv=2311,jv=function jv(){return Yv.createCanvas();};Yv.createCanvas=function(){return document.createElement("canvas");};var qv=Uv&&T(Uv.bind)?Uv.call.bind(Uv.bind):w,Zv="__ec_primitive__",Kv=function(){function t(e){function n(t,e){i?r.set(t,e):r.set(e,t);}this.data={};var i=M(e);this.data={};var r=this;e instanceof t?e.each(n):e&&y(e,n);}return t.prototype.get=function(t){return this.data.hasOwnProperty(t)?this.data[t]:null;},t.prototype.set=function(t,e){return this.data[t]=e;},t.prototype.each=function(t,e){for(var n in this.data){this.data.hasOwnProperty(n)&&t.call(e,this.data[n],n);}},t.prototype.keys=function(){return b(this.data);},t.prototype.removeKey=function(t){delete this.data[t];},t;}(),$v=(Object.freeze||Object)({$override:r,guid:o,logError:a,clone:s,merge:l,mergeAll:u,extend:h,defaults:c,createCanvas:jv,indexOf:p,inherits:f,mixin:d,isArrayLike:g,each:y,map:v,reduce:m,filter:_,find:x,keys:b,bind:qv,curry:S,isArray:M,isFunction:T,isString:C,isStringSafe:I,isNumber:A,isObject:k,isBuiltInObject:D,isTypedArray:L,isDom:P,isGradientObject:O,isPatternObject:R,isRegExp:E,eqNaN:B,retrieve:z,retrieve2:N,retrieve3:F,slice:V,normalizeCssArray:H,assert:G,trim:W,setAsPrimitive:U,isPrimitive:Y,HashMap:Kv,createHashMap:X,concatArray:j,createObject:q,hasOwn:Z,noop:K}),Jv=re,Qv=oe,tm=ce,em=pe,nm=(Object.freeze||Object)({create:$,copy:J,clone:Q,set:te,add:ee,scaleAndAdd:ne,sub:ie,len:re,length:Jv,lenSquare:oe,lengthSquare:Qv,mul:ae,div:se,dot:le,scale:ue,normalize:he,distance:ce,dist:tm,distanceSquare:pe,distSquare:em,negate:fe,lerp:de,applyTransform:ge,min:ye,max:ve}),im=function(){function t(t,e){this.target=t,this.topTarget=e&&e.topTarget;}return t;}(),rm=function(){function t(t){this.handler=t,t.on("mousedown",this._dragStart,this),t.on("mousemove",this._drag,this),t.on("mouseup",this._dragEnd,this);}return t.prototype._dragStart=function(t){for(var e=t.target;e&&!e.draggable;){e=e.parent;}e&&(this._draggingTarget=e,e.dragging=!0,this._x=t.offsetX,this._y=t.offsetY,this.handler.dispatchToElement(new im(e,t),"dragstart",t.event));},t.prototype._drag=function(t){var e=this._draggingTarget;if(e){var n=t.offsetX,i=t.offsetY,r=n-this._x,o=i-this._y;this._x=n,this._y=i,e.drift(r,o,t),this.handler.dispatchToElement(new im(e,t),"drag",t.event);var a=this.handler.findHover(n,i,e).target,s=this._dropTarget;this._dropTarget=a,e!==a&&(s&&a!==s&&this.handler.dispatchToElement(new im(s,t),"dragleave",t.event),a&&a!==s&&this.handler.dispatchToElement(new im(a,t),"dragenter",t.event));}},t.prototype._dragEnd=function(t){var e=this._draggingTarget;e&&(e.dragging=!1),this.handler.dispatchToElement(new im(e,t),"dragend",t.event),this._dropTarget&&this.handler.dispatchToElement(new im(this._dropTarget,t),"drop",t.event),this._draggingTarget=null,this._dropTarget=null;},t;}(),om=function(){function t(t){t&&(this._$eventProcessor=t);}return t.prototype.on=function(t,e,n,i){this._$handlers||(this._$handlers={});var r=this._$handlers;if("function"==typeof e&&(i=n,n=e,e=null),!n||!t)return this;var o=this._$eventProcessor;null!=e&&o&&o.normalizeQuery&&(e=o.normalizeQuery(e)),r[t]||(r[t]=[]);for(var a=0;a<r[t].length;a++){if(r[t][a].h===n)return this;}var s={h:n,query:e,ctx:i||this,callAtLast:n.zrEventfulCallAtLast},l=r[t].length-1,u=r[t][l];return u&&u.callAtLast?r[t].splice(l,0,s):r[t].push(s),this;},t.prototype.isSilent=function(t){var e=this._$handlers;return!e||!e[t]||!e[t].length;},t.prototype.off=function(t,e){var n=this._$handlers;if(!n)return this;if(!t)return this._$handlers={},this;if(e){if(n[t]){for(var i=[],r=0,o=n[t].length;o>r;r++){n[t][r].h!==e&&i.push(n[t][r]);}n[t]=i;}n[t]&&0===n[t].length&&delete n[t];}else delete n[t];return this;},t.prototype.trigger=function(t){for(var e=[],n=1;n<arguments.length;n++){e[n-1]=arguments[n];}if(!this._$handlers)return this;var i=this._$handlers[t],r=this._$eventProcessor;if(i)for(var o=e.length,a=i.length,s=0;a>s;s++){var l=i[s];if(!r||!r.filter||null==l.query||r.filter(t,l.query))switch(o){case 0:l.h.call(l.ctx);break;case 1:l.h.call(l.ctx,e[0]);break;case 2:l.h.call(l.ctx,e[0],e[1]);break;default:l.h.apply(l.ctx,e);}}return r&&r.afterTrigger&&r.afterTrigger(t),this;},t.prototype.triggerWithContext=function(t){if(!this._$handlers)return this;var e=this._$handlers[t],n=this._$eventProcessor;if(e)for(var i=arguments,r=i.length,o=i[r-1],a=e.length,s=0;a>s;s++){var l=e[s];if(!n||!n.filter||null==l.query||n.filter(t,l.query))switch(r){case 0:l.h.call(o);break;case 1:l.h.call(o,i[0]);break;case 2:l.h.call(o,i[0],i[1]);break;default:l.h.apply(o,i.slice(1,r-1));}}return n&&n.afterTrigger&&n.afterTrigger(t),this;},t;}(),am=Math.log(2),sm="___zrEVENTSAVED",lm=[],um="undefined"!=typeof window&&!!window.addEventListener,hm=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,cm=[],pm=um?function(t){t.preventDefault(),t.stopPropagation(),t.cancelBubble=!0;}:function(t){t.returnValue=!1,t.cancelBubble=!0;},fm=function(){function t(){this._track=[];}return t.prototype.recognize=function(t,e,n){return this._doTrack(t,e,n),this._recognize(t);},t.prototype.clear=function(){return this._track.length=0,this;},t.prototype._doTrack=function(t,e,n){var i=t.touches;if(i){for(var r={points:[],touches:[],target:e,event:t},o=0,a=i.length;a>o;o++){var s=i[o],l=Te(n,s,{});r.points.push([l.zrX,l.zrY]),r.touches.push(s);}this._track.push(r);}},t.prototype._recognize=function(t){for(var e in dm){if(dm.hasOwnProperty(e)){var n=dm[e](this._track,t);if(n)return n;}}},t;}(),dm={pinch:function pinch(t,e){var n=t.length;if(n){var i=(t[n-1]||{}).points,r=(t[n-2]||{}).points||i;if(r&&r.length>1&&i&&i.length>1){var o=Pe(i)/Pe(r);!isFinite(o)&&(o=1),e.pinchScale=o;var a=Oe(i);return e.pinchX=a[0],e.pinchY=a[1],{type:"pinch",target:t[0].target,event:e};}}}},gm="silent",ym=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.handler=null,e;}return e(n,t),n.prototype.dispose=function(){},n.prototype.setCursor=function(){},n;}(om),vm=function(){function t(t,e){this.x=t,this.y=e;}return t;}(),mm=["click","dblclick","mousewheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],_m=function(t){function n(e,n,i,r){var o=t.call(this)||this;return o._hovered=new vm(0,0),o.storage=e,o.painter=n,o.painterRoot=r,i=i||new ym(),o.proxy=null,o.setHandlerProxy(i),o._draggingMgr=new rm(o),o;}return e(n,t),n.prototype.setHandlerProxy=function(t){this.proxy&&this.proxy.dispose(),t&&(y(mm,function(e){t.on&&t.on(e,this[e],this);},this),t.handler=this),this.proxy=t;},n.prototype.mousemove=function(t){var e=t.zrX,n=t.zrY,i=ze(this,e,n),r=this._hovered,o=r.target;o&&!o.__zr&&(r=this.findHover(r.x,r.y),o=r.target);var a=this._hovered=i?new vm(e,n):this.findHover(e,n),s=a.target,l=this.proxy;l.setCursor&&l.setCursor(s?s.cursor:"default"),o&&s!==o&&this.dispatchToElement(r,"mouseout",t),this.dispatchToElement(a,"mousemove",t),s&&s!==o&&this.dispatchToElement(a,"mouseover",t);},n.prototype.mouseout=function(t){var e=t.zrEventControl;"only_globalout"!==e&&this.dispatchToElement(this._hovered,"mouseout",t),"no_globalout"!==e&&this.trigger("globalout",{type:"globalout",event:t});},n.prototype.resize=function(){this._hovered=new vm(0,0);},n.prototype.dispatch=function(t,e){var n=this[t];n&&n.call(this,e);},n.prototype.dispose=function(){this.proxy.dispose(),this.storage=null,this.proxy=null,this.painter=null;},n.prototype.setCursorStyle=function(t){var e=this.proxy;e.setCursor&&e.setCursor(t);},n.prototype.dispatchToElement=function(t,e,n){t=t||{};var i=t.target;if(!i||!i.silent){for(var r="on"+e,o=Re(e,t,n);i&&(i[r]&&(o.cancelBubble=!!i[r].call(i,o)),i.trigger(e,o),i=i.__hostTarget?i.__hostTarget:i.parent,!o.cancelBubble);){;}o.cancelBubble||(this.trigger(e,o),this.painter&&this.painter.eachOtherLayer&&this.painter.eachOtherLayer(function(t){"function"==typeof t[r]&&t[r].call(t,o),t.trigger&&t.trigger(e,o);}));}},n.prototype.findHover=function(t,e,n){for(var i=this.storage.getDisplayList(),r=new vm(t,e),o=i.length-1;o>=0;o--){var a=void 0;if(i[o]!==n&&!i[o].ignore&&(a=Be(i[o],t,e))&&(!r.topTarget&&(r.topTarget=i[o]),a!==gm)){r.target=i[o];break;}}return r;},n.prototype.processGesture=function(t,e){this._gestureMgr||(this._gestureMgr=new fm());var n=this._gestureMgr;"start"===e&&n.clear();var i=n.recognize(t,this.findHover(t.zrX,t.zrY,null).target,this.proxy.dom);if("end"===e&&n.clear(),i){var r=i.type;t.gestureEvent=r;var o=new vm();o.target=i.target,this.dispatchToElement(o,r,i.event);}},n;}(om);y(["click","mousedown","mouseup","mousewheel","dblclick","contextmenu"],function(t){_m.prototype[t]=function(e){var n,i,r=e.zrX,o=e.zrY,a=ze(this,r,o);if("mouseup"===t&&a||(n=this.findHover(r,o),i=n.target),"mousedown"===t)this._downEl=i,this._downPoint=[e.zrX,e.zrY],this._upEl=i;else if("mouseup"===t)this._upEl=i;else if("click"===t){if(this._downEl!==this._upEl||!this._downPoint||tm(this._downPoint,[e.zrX,e.zrY])>4)return;this._downPoint=null;}this.dispatchToElement(n,t,e);};});var xm,bm,wm=(Object.freeze||Object)({create:Ne,identity:Fe,copy:Ve,mul:He,translate:Ge,rotate:We,scale:Ue,invert:Ye,clone:Xe}),Sm=Fe,Mm=5e-5,Tm=[],Cm=[],Im=Ne(),Am=Math.abs,km=function(){function t(){}return t.prototype.setPosition=function(t){this.x=t[0],this.y=t[1];},t.prototype.setScale=function(t){this.scaleX=t[0],this.scaleY=t[1];},t.prototype.setOrigin=function(t){this.originX=t[0],this.originY=t[1];},t.prototype.needLocalTransform=function(){return je(this.rotation)||je(this.x)||je(this.y)||je(this.scaleX-1)||je(this.scaleY-1);},t.prototype.updateTransform=function(){var t=this.parent,e=t&&t.transform,n=this.needLocalTransform(),i=this.transform;return n||e?(i=i||Ne(),n?this.getLocalTransform(i):Sm(i),e&&(n?He(i,t.transform,i):Ve(i,t.transform)),this.transform=i,void this._resolveGlobalScaleRatio(i)):void(i&&Sm(i));},t.prototype._resolveGlobalScaleRatio=function(t){var e=this.globalScaleRatio;if(null!=e&&1!==e){this.getGlobalScale(Tm);var n=Tm[0]<0?-1:1,i=Tm[1]<0?-1:1,r=((Tm[0]-n)*e+n)/Tm[0]||0,o=((Tm[1]-i)*e+i)/Tm[1]||0;t[0]*=r,t[1]*=r,t[2]*=o,t[3]*=o;}this.invTransform=this.invTransform||Ne(),Ye(this.invTransform,t);},t.prototype.getLocalTransform=function(e){return t.getLocalTransform(this,e);},t.prototype.getComputedTransform=function(){for(var t=this,e=[];t;){e.push(t),t=t.parent;}for(;t=e.pop();){t.updateTransform();}return this.transform;},t.prototype.setLocalTransform=function(t){if(t){var e=t[0]*t[0]+t[1]*t[1],n=t[2]*t[2]+t[3]*t[3];je(e-1)&&(e=Math.sqrt(e)),je(n-1)&&(n=Math.sqrt(n)),t[0]<0&&(e=-e),t[3]<0&&(n=-n),this.rotation=Math.atan2(-t[1]/n,t[0]/e),0>e&&0>n&&(this.rotation+=Math.PI,e=-e,n=-n),this.x=t[4],this.y=t[5],this.scaleX=e,this.scaleY=n;}},t.prototype.decomposeTransform=function(){if(this.transform){var t=this.parent,e=this.transform;t&&t.transform&&(He(Cm,t.invTransform,e),e=Cm);var n=this.originX,i=this.originY;(n||i)&&(Im[4]=n,Im[5]=i,He(Cm,e,Im),Cm[4]-=n,Cm[5]-=i,e=Cm),this.setLocalTransform(e);}},t.prototype.getGlobalScale=function(t){var e=this.transform;return t=t||[],e?(t[0]=Math.sqrt(e[0]*e[0]+e[1]*e[1]),t[1]=Math.sqrt(e[2]*e[2]+e[3]*e[3]),e[0]<0&&(t[0]=-t[0]),e[3]<0&&(t[1]=-t[1]),t):(t[0]=1,t[1]=1,t);},t.prototype.transformCoordToLocal=function(t,e){var n=[t,e],i=this.invTransform;return i&&ge(n,n,i),n;},t.prototype.transformCoordToGlobal=function(t,e){var n=[t,e],i=this.transform;return i&&ge(n,n,i),n;},t.prototype.getLineScale=function(){var t=this.transform;return t&&Am(t[0]-1)>1e-10&&Am(t[3]-1)>1e-10?Math.sqrt(Am(t[0]*t[3]-t[2]*t[1])):1;},t.getLocalTransform=function(t,e){e=e||[],Sm(e);var n=t.originX||0,i=t.originY||0,r=t.scaleX,o=t.scaleY,a=t.rotation||0,s=t.x,l=t.y;return e[4]-=n,e[5]-=i,e[0]*=r,e[1]*=o,e[2]*=r,e[3]*=o,e[4]*=r,e[5]*=o,a&&We(e,e,a),e[4]+=n,e[5]+=i,e[4]+=s,e[5]+=l,e;},t.initDefaultProps=function(){var e=t.prototype;e.x=0,e.y=0,e.scaleX=1,e.scaleY=1,e.originX=0,e.originY=0,e.rotation=0,e.globalScaleRatio=1;}(),t;}(),Dm={linear:function linear(t){return t;},quadraticIn:function quadraticIn(t){return t*t;},quadraticOut:function quadraticOut(t){return t*(2-t);},quadraticInOut:function quadraticInOut(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1);},cubicIn:function cubicIn(t){return t*t*t;},cubicOut:function cubicOut(t){return--t*t*t+1;},cubicInOut:function cubicInOut(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2);},quarticIn:function quarticIn(t){return t*t*t*t;},quarticOut:function quarticOut(t){return 1- --t*t*t*t;},quarticInOut:function quarticInOut(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2);},quinticIn:function quinticIn(t){return t*t*t*t*t;},quinticOut:function quinticOut(t){return--t*t*t*t*t+1;},quinticInOut:function quinticInOut(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2);},sinusoidalIn:function sinusoidalIn(t){return 1-Math.cos(t*Math.PI/2);},sinusoidalOut:function sinusoidalOut(t){return Math.sin(t*Math.PI/2);},sinusoidalInOut:function sinusoidalInOut(t){return .5*(1-Math.cos(Math.PI*t));},exponentialIn:function exponentialIn(t){return 0===t?0:Math.pow(1024,t-1);},exponentialOut:function exponentialOut(t){return 1===t?1:1-Math.pow(2,-10*t);},exponentialInOut:function exponentialInOut(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(-Math.pow(2,-10*(t-1))+2);},circularIn:function circularIn(t){return 1-Math.sqrt(1-t*t);},circularOut:function circularOut(t){return Math.sqrt(1- --t*t);},circularInOut:function circularInOut(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1);},elasticIn:function elasticIn(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),-(n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i)));},elasticOut:function elasticOut(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),n*Math.pow(2,-10*t)*Math.sin(2*(t-e)*Math.PI/i)+1);},elasticInOut:function elasticInOut(t){var e,n=.1,i=.4;return 0===t?0:1===t?1:(!n||1>n?(n=1,e=i/4):e=i*Math.asin(1/n)/(2*Math.PI),(t*=2)<1?-.5*n*Math.pow(2,10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i):n*Math.pow(2,-10*(t-=1))*Math.sin(2*(t-e)*Math.PI/i)*.5+1);},backIn:function backIn(t){var e=1.70158;return t*t*((e+1)*t-e);},backOut:function backOut(t){var e=1.70158;return--t*t*((e+1)*t+e)+1;},backInOut:function backInOut(t){var e=2.5949095;return(t*=2)<1?.5*t*t*((e+1)*t-e):.5*((t-=2)*t*((e+1)*t+e)+2);},bounceIn:function bounceIn(t){return 1-Dm.bounceOut(1-t);},bounceOut:function bounceOut(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375;},bounceInOut:function bounceInOut(t){return .5>t?.5*Dm.bounceIn(2*t):.5*Dm.bounceOut(2*t-1)+.5;}},Lm=function(){function t(t){this._initialized=!1,this._startTime=0,this._pausedTime=0,this._paused=!1,this._life=t.life||1e3,this._delay=t.delay||0,this.loop=null==t.loop?!1:t.loop,this.gap=t.gap||0,this.easing=t.easing||"linear",this.onframe=t.onframe,this.ondestroy=t.ondestroy,this.onrestart=t.onrestart;}return t.prototype.step=function(t,e){if(this._initialized||(this._startTime=t+this._delay,this._initialized=!0),this._paused)return void(this._pausedTime+=e);var n=(t-this._startTime-this._pausedTime)/this._life;0>n&&(n=0),n=Math.min(n,1);var i=this.easing,r="string"==typeof i?Dm[i]:i,o="function"==typeof r?r(n):n;if(this.onframe&&this.onframe(o),1===n){if(!this.loop)return!0;this._restart(t),this.onrestart&&this.onrestart();}return!1;},t.prototype._restart=function(t){var e=(t-this._startTime-this._pausedTime)%this._life;this._startTime=t-e+this.gap,this._pausedTime=0;},t.prototype.pause=function(){this._paused=!0;},t.prototype.resume=function(){this._paused=!1;},t;}(),Pm=function(){function t(t){this.value=t;}return t;}(),Om=function(){function t(){this._len=0;}return t.prototype.insert=function(t){var e=new Pm(t);return this.insertEntry(e),e;},t.prototype.insertEntry=function(t){this.head?(this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t):this.head=this.tail=t,this._len++;},t.prototype.remove=function(t){var e=t.prev,n=t.next;e?e.next=n:this.head=n,n?n.prev=e:this.tail=e,t.next=t.prev=null,this._len--;},t.prototype.len=function(){return this._len;},t.prototype.clear=function(){this.head=this.tail=null,this._len=0;},t;}(),Rm=function(){function t(t){this._list=new Om(),this._maxSize=10,this._map={},this._maxSize=t;}return t.prototype.put=function(t,e){var n=this._list,i=this._map,r=null;if(null==i[t]){var o=n.len(),a=this._lastRemovedEntry;if(o>=this._maxSize&&o>0){var s=n.head;n.remove(s),delete i[s.key],r=s.value,this._lastRemovedEntry=s;}a?a.value=e:a=new Pm(e),a.key=t,n.insertEntry(a),i[t]=a;}return r;},t.prototype.get=function(t){var e=this._map[t],n=this._list;return null!=e?(e!==n.tail&&(n.remove(e),n.insertEntry(e)),e.value):void 0;},t.prototype.clear=function(){this._list.clear(),this._map={};},t.prototype.len=function(){return this._list.len();},t;}(),Em={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]},Bm=new Rm(20),zm=null,Nm=hn,Fm=cn,Vm=(Object.freeze||Object)({parse:on,lift:ln,toHex:un,fastLerp:hn,fastMapToColor:Nm,lerp:cn,mapToColor:Fm,modifyHSL:pn,modifyAlpha:fn,stringify:dn,lum:gn,random:yn}),Hm=Array.prototype.slice,Gm=[0,0,0,0],Wm=function(){function t(t){this.keyframes=[],this.maxTime=0,this.arrDim=0,this.interpolable=!0,this._needsSort=!1,this._isAllValueEqual=!0,this._lastFrame=0,this._lastFramePercent=0,this.propName=t;
}return t.prototype.isFinished=function(){return this._finished;},t.prototype.setFinished=function(){this._finished=!0,this._additiveTrack&&this._additiveTrack.setFinished();},t.prototype.needsAnimate=function(){return!this._isAllValueEqual&&this.keyframes.length>=2&&this.interpolable;},t.prototype.getAdditiveTrack=function(){return this._additiveTrack;},t.prototype.addKeyframe=function(t,e){t>=this.maxTime?this.maxTime=t:this._needsSort=!0;var n=this.keyframes,i=n.length;if(this.interpolable)if(g(e)){var r=Dn(e);if(i>0&&this.arrDim!==r)return void(this.interpolable=!1);if(1===r&&"number"!=typeof e[0]||2===r&&"number"!=typeof e[0][0])return void(this.interpolable=!1);if(i>0){var o=n[i-1];this._isAllValueEqual&&(1===r?Mn(e,o.value)||(this._isAllValueEqual=!1):this._isAllValueEqual=!1);}this.arrDim=r;}else{if(this.arrDim>0)return void(this.interpolable=!1);if("string"==typeof e){var a=on(e);a?(e=a,this.isValueColor=!0):this.interpolable=!1;}else if("number"!=typeof e||isNaN(e))return void(this.interpolable=!1);if(this._isAllValueEqual&&i>0){var o=n[i-1];this.isValueColor&&!Mn(o.value,e)?this._isAllValueEqual=!1:o.value!==e&&(this._isAllValueEqual=!1);}}var s={time:t,value:e,percent:0};return this.keyframes.push(s),s;},t.prototype.prepare=function(t){var e=this.keyframes;this._needsSort&&e.sort(function(t,e){return t.time-e.time;});for(var n=this.arrDim,i=e.length,r=e[i-1],o=0;i>o;o++){e[o].percent=e[o].time/this.maxTime,n>0&&o!==i-1&&Sn(e[o].value,r.value,n);}if(t&&this.needsAnimate()&&t.needsAnimate()&&n===t.arrDim&&this.isValueColor===t.isValueColor&&!t._finished){this._additiveTrack=t;for(var a=e[0].value,o=0;i>o;o++){0===n?e[o].additiveValue=this.isValueColor?bn([],e[o].value,a,-1):e[o].value-a:1===n?e[o].additiveValue=bn([],e[o].value,a,-1):2===n&&(e[o].additiveValue=wn([],e[o].value,a,-1));}}},t.prototype.step=function(t,e){if(!this._finished){this._additiveTrack&&this._additiveTrack._finished&&(this._additiveTrack=null);var n,i=null!=this._additiveTrack,r=i?"additiveValue":"value",o=this.keyframes,a=this.keyframes.length,s=this.propName,l=this.arrDim,u=this.isValueColor;if(0>e)n=0;else if(e<this._lastFramePercent){var h=Math.min(this._lastFrame+1,a-1);for(n=h;n>=0&&!(o[n].percent<=e);n--){;}n=Math.min(n,a-2);}else{for(n=this._lastFrame;a>n&&!(o[n].percent>e);n++){;}n=Math.min(n-1,a-2);}var c=o[n+1],p=o[n];if(p&&c){this._lastFrame=n,this._lastFramePercent=e;var f=c.percent-p.percent;if(0!==f){var d=(e-p.percent)/f,g=i?this._additiveValue:u?Gm:t[s];if((l>0||u)&&!g&&(g=this._additiveValue=[]),this.useSpline){var y=o[n][r],v=o[0===n?n:n-1][r],m=o[n>a-2?a-1:n+1][r],_=o[n>a-3?a-1:n+2][r];if(l>0)1===l?Cn(g,v,y,m,_,d,d*d,d*d*d):In(g,v,y,m,_,d,d*d,d*d*d);else if(u)Cn(g,v,y,m,_,d,d*d,d*d*d),i||(t[s]=kn(g));else{var x=void 0;x=this.interpolable?Tn(v,y,m,_,d,d*d,d*d*d):m,i?this._additiveValue=x:t[s]=x;}}else if(l>0)1===l?_n(g,p[r],c[r],d):xn(g,p[r],c[r],d);else if(u)_n(g,p[r],c[r],d),i||(t[s]=kn(g));else{var x=void 0;x=this.interpolable?vn(p[r],c[r],d):mn(p[r],c[r],d),i?this._additiveValue=x:t[s]=x;}i&&this._addToTarget(t);}}}},t.prototype._addToTarget=function(t){var e=this.arrDim,n=this.propName,i=this._additiveValue;0===e?this.isValueColor?(on(t[n],Gm),bn(Gm,Gm,i,1),t[n]=kn(Gm)):t[n]=t[n]+i:1===e?bn(t[n],t[n],i,1):2===e&&wn(t[n],t[n],i,1);},t;}(),Um=function(){function t(t,e,n){return this._tracks={},this._trackKeys=[],this._delay=0,this._maxTime=0,this._paused=!1,this._started=0,this._clip=null,this._target=t,this._loop=e,e&&n?void a("Can' use additive animation on looped animation."):void(this._additiveAnimators=n);}return t.prototype.getTarget=function(){return this._target;},t.prototype.changeTarget=function(t){this._target=t;},t.prototype.when=function(t,e){return this.whenWithKeys(t,e,b(e));},t.prototype.whenWithKeys=function(t,e,n){for(var i=this._tracks,r=0;r<n.length;r++){var o=n[r],a=i[o];if(!a){a=i[o]=new Wm(o);var s=void 0,l=this._getAdditiveTrack(o);if(l){var u=l.keyframes[l.keyframes.length-1];s=u&&u.value,l.isValueColor&&s&&(s=kn(s));}else s=this._target[o];if(null==s)continue;0!==t&&a.addKeyframe(0,An(s)),this._trackKeys.push(o);}a.addKeyframe(t,An(e[o]));}return this._maxTime=Math.max(this._maxTime,t),this;},t.prototype.pause=function(){this._clip.pause(),this._paused=!0;},t.prototype.resume=function(){this._clip.resume(),this._paused=!1;},t.prototype.isPaused=function(){return!!this._paused;},t.prototype._doneCallback=function(){this._setTracksFinished(),this._clip=null;var t=this._doneList;if(t)for(var e=t.length,n=0;e>n;n++){t[n].call(this);}},t.prototype._abortedCallback=function(){this._setTracksFinished();var t=this.animation,e=this._abortedList;if(t&&t.removeClip(this._clip),this._clip=null,e)for(var n=0;n<e.length;n++){e[n].call(this);}},t.prototype._setTracksFinished=function(){for(var t=this._tracks,e=this._trackKeys,n=0;n<e.length;n++){t[e[n]].setFinished();}},t.prototype._getAdditiveTrack=function(t){var e,n=this._additiveAnimators;if(n)for(var i=0;i<n.length;i++){var r=n[i].getTrack(t);r&&(e=r);}return e;},t.prototype.start=function(t,e){if(!(this._started>0)){this._started=1;for(var n=this,i=[],r=0;r<this._trackKeys.length;r++){var o=this._trackKeys[r],a=this._tracks[o],s=this._getAdditiveTrack(o),l=a.keyframes;if(a.prepare(s),a.needsAnimate())i.push(a);else if(!a.interpolable){var u=l[l.length-1];u&&(n._target[a.propName]=u.value);}}if(i.length||e){var h=new Lm({life:this._maxTime,loop:this._loop,delay:this._delay,onframe:function onframe(t){n._started=2;var e=n._additiveAnimators;if(e){for(var r=!1,o=0;o<e.length;o++){if(e[o]._clip){r=!0;break;}}r||(n._additiveAnimators=null);}for(var o=0;o<i.length;o++){i[o].step(n._target,t);}var a=n._onframeList;if(a)for(var o=0;o<a.length;o++){a[o](n._target,t);}},ondestroy:function ondestroy(){n._doneCallback();}});this._clip=h,this.animation&&this.animation.addClip(h),t&&"spline"!==t&&(h.easing=t);}else this._doneCallback();return this;}},t.prototype.stop=function(t){if(this._clip){var e=this._clip;t&&e.onframe(1),this._abortedCallback();}},t.prototype.delay=function(t){return this._delay=t,this;},t.prototype.during=function(t){return t&&(this._onframeList||(this._onframeList=[]),this._onframeList.push(t)),this;},t.prototype.done=function(t){return t&&(this._doneList||(this._doneList=[]),this._doneList.push(t)),this;},t.prototype.aborted=function(t){return t&&(this._abortedList||(this._abortedList=[]),this._abortedList.push(t)),this;},t.prototype.getClip=function(){return this._clip;},t.prototype.getTrack=function(t){return this._tracks[t];},t.prototype.stopTracks=function(t,e){if(!t.length||!this._clip)return!0;for(var n=this._tracks,i=this._trackKeys,r=0;r<t.length;r++){var o=n[t[r]];o&&(e?o.step(this._target,1):1===this._started&&o.step(this._target,0),o.setFinished());}for(var a=!0,r=0;r<i.length;r++){if(!n[i[r]].isFinished()){a=!1;break;}}return a&&this._abortedCallback(),a;},t.prototype.saveFinalToTarget=function(t,e){if(t){e=e||this._trackKeys;for(var n=0;n<e.length;n++){var i=e[n],r=this._tracks[i];if(r&&!r.isFinished()){var o=r.keyframes,a=o[o.length-1];if(a){var s=An(a.value);r.isValueColor&&(s=kn(s)),t[i]=s;}}}}},t.prototype.__changeFinalValue=function(t,e){e=e||b(t);for(var n=0;n<e.length;n++){var i=e[n],r=this._tracks[i];if(r){var o=r.keyframes;if(o.length>1){var a=o.pop();r.addKeyframe(a.time,t[i]),r.prepare(r.getAdditiveTrack());}}}},t;}(),Ym=function(){function t(t,e){this.x=t||0,this.y=e||0;}return t.prototype.copy=function(t){return this.x=t.x,this.y=t.y,this;},t.prototype.clone=function(){return new t(this.x,this.y);},t.prototype.set=function(t,e){return this.x=t,this.y=e,this;},t.prototype.equal=function(t){return t.x===this.x&&t.y===this.y;},t.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this;},t.prototype.scale=function(t){this.x*=t,this.y*=t;},t.prototype.scaleAndAdd=function(t,e){this.x+=t.x*e,this.y+=t.y*e;},t.prototype.sub=function(t){return this.x-=t.x,this.y-=t.y,this;},t.prototype.dot=function(t){return this.x*t.x+this.y*t.y;},t.prototype.len=function(){return Math.sqrt(this.x*this.x+this.y*this.y);},t.prototype.lenSquare=function(){return this.x*this.x+this.y*this.y;},t.prototype.normalize=function(){var t=this.len();return this.x/=t,this.y/=t,this;},t.prototype.distance=function(t){var e=this.x-t.x,n=this.y-t.y;return Math.sqrt(e*e+n*n);},t.prototype.distanceSquare=function(t){var e=this.x-t.x,n=this.y-t.y;return e*e+n*n;},t.prototype.negate=function(){return this.x=-this.x,this.y=-this.y,this;},t.prototype.transform=function(t){if(t){var e=this.x,n=this.y;return this.x=t[0]*e+t[2]*n+t[4],this.y=t[1]*e+t[3]*n+t[5],this;}},t.prototype.toArray=function(t){return t[0]=this.x,t[1]=this.y,t;},t.prototype.fromArray=function(t){this.x=t[0],this.y=t[1];},t.set=function(t,e,n){t.x=e,t.y=n;},t.copy=function(t,e){t.x=e.x,t.y=e.y;},t.len=function(t){return Math.sqrt(t.x*t.x+t.y*t.y);},t.lenSquare=function(t){return t.x*t.x+t.y*t.y;},t.dot=function(t,e){return t.x*e.x+t.y*e.y;},t.add=function(t,e,n){t.x=e.x+n.x,t.y=e.y+n.y;},t.sub=function(t,e,n){t.x=e.x-n.x,t.y=e.y-n.y;},t.scale=function(t,e,n){t.x=e.x*n,t.y=e.y*n;},t.scaleAndAdd=function(t,e,n,i){t.x=e.x+n.x*i,t.y=e.y+n.y*i;},t.lerp=function(t,e,n,i){var r=1-i;t.x=r*e.x+i*n.x,t.y=r*e.y+i*n.y;},t;}(),Xm=Math.min,jm=Math.max,qm=new Ym(),Zm=new Ym(),Km=new Ym(),$m=new Ym(),Jm=new Ym(),Qm=new Ym(),t_=function(){function t(t,e,n,i){0>n&&isFinite(n)&&(t+=n,n=-n),0>i&&isFinite(i)&&(e+=i,i=-i),this.x=t,this.y=e,this.width=n,this.height=i;}return t.prototype.union=function(t){var e=Xm(t.x,this.x),n=Xm(t.y,this.y);this.width=isFinite(this.x)&&isFinite(this.width)?jm(t.x+t.width,this.x+this.width)-e:t.width,this.height=isFinite(this.y)&&isFinite(this.height)?jm(t.y+t.height,this.y+this.height)-n:t.height,this.x=e,this.y=n;},t.prototype.applyTransform=function(e){t.applyTransform(this,this,e);},t.prototype.calculateTransform=function(t){var e=this,n=t.width/e.width,i=t.height/e.height,r=Ne();return Ge(r,r,[-e.x,-e.y]),Ue(r,r,[n,i]),Ge(r,r,[t.x,t.y]),r;},t.prototype.intersect=function(e,n){if(!e)return!1;e instanceof t||(e=t.create(e));var i=this,r=i.x,o=i.x+i.width,a=i.y,s=i.y+i.height,l=e.x,u=e.x+e.width,h=e.y,c=e.y+e.height,p=!(l>o||r>u||h>s||a>c);if(n){var f=1/0,d=0,g=Math.abs(o-l),y=Math.abs(u-r),v=Math.abs(s-h),m=Math.abs(c-a),_=Math.min(g,y),x=Math.min(v,m);l>o||r>u?_>d&&(d=_,y>g?Ym.set(Qm,-g,0):Ym.set(Qm,y,0)):f>_&&(f=_,y>g?Ym.set(Jm,g,0):Ym.set(Jm,-y,0)),h>s||a>c?x>d&&(d=x,m>v?Ym.set(Qm,0,-v):Ym.set(Qm,0,m)):f>_&&(f=_,m>v?Ym.set(Jm,0,v):Ym.set(Jm,0,-m));}return n&&Ym.copy(n,p?Jm:Qm),p;},t.prototype.contain=function(t,e){var n=this;return t>=n.x&&t<=n.x+n.width&&e>=n.y&&e<=n.y+n.height;},t.prototype.clone=function(){return new t(this.x,this.y,this.width,this.height);},t.prototype.copy=function(e){t.copy(this,e);},t.prototype.plain=function(){return{x:this.x,y:this.y,width:this.width,height:this.height};},t.prototype.isFinite=function(){return isFinite(this.x)&&isFinite(this.y)&&isFinite(this.width)&&isFinite(this.height);},t.prototype.isZero=function(){return 0===this.width||0===this.height;},t.create=function(e){return new t(e.x,e.y,e.width,e.height);},t.copy=function(t,e){t.x=e.x,t.y=e.y,t.width=e.width,t.height=e.height;},t.applyTransform=function(e,n,i){if(!i)return void(e!==n&&t.copy(e,n));if(i[1]<1e-5&&i[1]>-1e-5&&i[2]<1e-5&&i[2]>-1e-5){var r=i[0],o=i[3],a=i[4],s=i[5];return e.x=n.x*r+a,e.y=n.y*o+s,e.width=n.width*r,e.height=n.height*o,e.width<0&&(e.x+=e.width,e.width=-e.width),void(e.height<0&&(e.y+=e.height,e.height=-e.height));}qm.x=Km.x=n.x,qm.y=$m.y=n.y,Zm.x=$m.x=n.x+n.width,Zm.y=Km.y=n.y+n.height,qm.transform(i),$m.transform(i),Zm.transform(i),Km.transform(i),e.x=Xm(qm.x,Zm.x,Km.x,$m.x),e.y=Xm(qm.y,Zm.y,Km.y,$m.y);var l=jm(qm.x,Zm.x,Km.x,$m.x),u=jm(qm.y,Zm.y,Km.y,$m.y);e.width=l-e.x,e.height=u-e.y;},t;}(),e_={},n_="12px sans-serif",i_={measureText:Ln},r_=1;"undefined"!=typeof window&&(r_=Math.max(window.devicePixelRatio||window.screen&&window.screen.deviceXDPI/window.screen.logicalXDPI||1,1));var o_=r_,a_=.4,s_="#333",l_="#ccc",u_="#eee",h_="__zr_normal__",c_=["x","y","scaleX","scaleY","originX","originY","rotation","ignore"],p_={x:!0,y:!0,scaleX:!0,scaleY:!0,originX:!0,originY:!0,rotation:!0,ignore:!1},f_={},d_=new t_(0,0,0,0),g_=function(){function t(t){this.id=o(),this.animators=[],this.currentStates=[],this.states={},this._init(t);}return t.prototype._init=function(t){this.attr(t);},t.prototype.drift=function(t,e){switch(this.draggable){case"horizontal":e=0;break;case"vertical":t=0;}var n=this.transform;n||(n=this.transform=[1,0,0,1,0,0]),n[4]+=t,n[5]+=e,this.decomposeTransform(),this.markRedraw();},t.prototype.beforeUpdate=function(){},t.prototype.afterUpdate=function(){},t.prototype.update=function(){this.updateTransform(),this.__dirty&&this.updateInnerText();},t.prototype.updateInnerText=function(t){var e=this._textContent;if(e&&(!e.ignore||t)){this.textConfig||(this.textConfig={});var n=this.textConfig,i=n.local,r=e.attachedTransform,o=void 0,a=void 0,s=!1;r.parent=i?this:null;var l=!1;if(r.x=e.x,r.y=e.y,r.originX=e.originX,r.originY=e.originY,r.rotation=e.rotation,r.scaleX=e.scaleX,r.scaleY=e.scaleY,null!=n.position){var u=d_;u.copy(n.layoutRect?n.layoutRect:this.getBoundingRect()),i||u.applyTransform(this.transform),this.calculateTextPosition?this.calculateTextPosition(f_,n,u):Fn(f_,n,u),r.x=f_.x,r.y=f_.y,o=f_.align,a=f_.verticalAlign;var h=n.origin;if(h&&null!=n.rotation){var c=void 0,p=void 0;"center"===h?(c=.5*u.width,p=.5*u.height):(c=Nn(h[0],u.width),p=Nn(h[1],u.height)),l=!0,r.originX=-r.x+c+(i?0:u.x),r.originY=-r.y+p+(i?0:u.y);}}null!=n.rotation&&(r.rotation=n.rotation);var f=n.offset;f&&(r.x+=f[0],r.y+=f[1],l||(r.originX=-f[0],r.originY=-f[1]));var d=null==n.inside?"string"==typeof n.position&&n.position.indexOf("inside")>=0:n.inside,g=this._innerTextDefaultStyle||(this._innerTextDefaultStyle={}),y=void 0,v=void 0,m=void 0;d&&this.canBeInsideText()?(y=n.insideFill,v=n.insideStroke,(null==y||"auto"===y)&&(y=this.getInsideTextFill()),(null==v||"auto"===v)&&(v=this.getInsideTextStroke(y),m=!0)):(y=n.outsideFill,v=n.outsideStroke,(null==y||"auto"===y)&&(y=this.getOutsideFill()),(null==v||"auto"===v)&&(v=this.getOutsideStroke(y),m=!0)),y=y||"#000",(y!==g.fill||v!==g.stroke||m!==g.autoStroke||o!==g.align||a!==g.verticalAlign)&&(s=!0,g.fill=y,g.stroke=v,g.autoStroke=m,g.align=o,g.verticalAlign=a,e.setDefaultTextStyle(g)),s&&e.dirtyStyle(),e.markRedraw();}},t.prototype.canBeInsideText=function(){return!0;},t.prototype.getInsideTextFill=function(){return"#fff";},t.prototype.getInsideTextStroke=function(){return"#000";},t.prototype.getOutsideFill=function(){return this.__zr&&this.__zr.isDarkMode()?l_:s_;},t.prototype.getOutsideStroke=function(){var t=this.__zr&&this.__zr.getBackgroundColor(),e="string"==typeof t&&on(t);e||(e=[255,255,255,1]);for(var n=e[3],i=this.__zr.isDarkMode(),r=0;3>r;r++){e[r]=e[r]*n+(i?0:255)*(1-n);}return e[3]=1,dn(e,"rgba");},t.prototype.traverse=function(){},t.prototype.attrKV=function(t,e){"textConfig"===t?this.setTextConfig(e):"textContent"===t?this.setTextContent(e):"clipPath"===t?this.setClipPath(e):"extra"===t?(this.extra=this.extra||{},h(this.extra,e)):this[t]=e;},t.prototype.hide=function(){this.ignore=!0,this.markRedraw();},t.prototype.show=function(){this.ignore=!1,this.markRedraw();},t.prototype.attr=function(t,e){if("string"==typeof t)this.attrKV(t,e);else if(k(t))for(var n=t,i=b(n),r=0;r<i.length;r++){var o=i[r];this.attrKV(o,t[o]);}return this.markRedraw(),this;},t.prototype.saveCurrentToNormalState=function(t){this._innerSaveToNormal(t);for(var e=this._normalState,n=0;n<this.animators.length;n++){var i=this.animators[n],r=i.__fromStateTransition;if(!r||r===h_){var o=i.targetName,a=o?e[o]:e;i.saveFinalToTarget(a);}}},t.prototype._innerSaveToNormal=function(t){var e=this._normalState;e||(e=this._normalState={}),t.textConfig&&!e.textConfig&&(e.textConfig=this.textConfig),this._savePrimaryToNormal(t,e,c_);},t.prototype._savePrimaryToNormal=function(t,e,n){for(var i=0;i<n.length;i++){var r=n[i];null==t[r]||r in e||(e[r]=this[r]);}},t.prototype.hasState=function(){return this.currentStates.length>0;},t.prototype.getState=function(t){return this.states[t];},t.prototype.ensureState=function(t){var e=this.states;return e[t]||(e[t]={}),e[t];},t.prototype.clearStates=function(t){this.useState(h_,!1,t);},t.prototype.useState=function(e,n,i){var r=e===h_,o=this.hasState();if(o||!r){var s=this.currentStates,l=this.stateTransition;if(!(p(s,e)>=0)||!n&&1!==s.length){var u;if(this.stateProxy&&!r&&(u=this.stateProxy(e)),u||(u=this.states&&this.states[e]),!u&&!r)return void a("State "+e+" not exists.");r||this.saveCurrentToNormalState(u);var h=!(!u||!u.hoverLayer);return h&&this._toggleHoverLayerFlag(!0),this._applyStateObj(e,u,this._normalState,n,!i&&!this.__inHover&&l&&l.duration>0,l),this._textContent&&this._textContent.useState(e,n),this._textGuide&&this._textGuide.useState(e,n),r?(this.currentStates=[],this._normalState={}):n?this.currentStates.push(e):this.currentStates=[e],this._updateAnimationTargets(),this.markRedraw(),!h&&this.__inHover&&(this._toggleHoverLayerFlag(!1),this.__dirty&=~t.REDARAW_BIT),u;}}},t.prototype.useStates=function(e,n){if(e.length){var i=[],r=this.currentStates,o=e.length,a=o===r.length;if(a)for(var s=0;o>s;s++){if(e[s]!==r[s]){a=!1;break;}}if(a)return;for(var s=0;o>s;s++){var l=e[s],u=void 0;this.stateProxy&&(u=this.stateProxy(l,e)),u||(u=this.states[l]),u&&i.push(u);}var h=!(!i[o-1]||!i[o-1].hoverLayer);h&&this._toggleHoverLayerFlag(!0);var c=this._mergeStates(i),p=this.stateTransition;this.saveCurrentToNormalState(c),this._applyStateObj(e.join(","),c,this._normalState,!1,!n&&!this.__inHover&&p&&p.duration>0,p),this._textContent&&this._textContent.useStates(e),this._textGuide&&this._textGuide.useStates(e),this._updateAnimationTargets(),this.currentStates=e.slice(),this.markRedraw(),!h&&this.__inHover&&(this._toggleHoverLayerFlag(!1),this.__dirty&=~t.REDARAW_BIT);}else this.clearStates();},t.prototype._updateAnimationTargets=function(){for(var t=0;t<this.animators.length;t++){var e=this.animators[t];e.targetName&&e.changeTarget(this[e.targetName]);}},t.prototype.removeState=function(t){var e=p(this.currentStates,t);if(e>=0){var n=this.currentStates.slice();n.splice(e,1),this.useStates(n);}},t.prototype.replaceState=function(t,e,n){var i=this.currentStates.slice(),r=p(i,t),o=p(i,e)>=0;r>=0?o?i.splice(r,1):i[r]=e:n&&!o&&i.push(e),this.useStates(i);},t.prototype.toggleState=function(t,e){e?this.useState(t,!0):this.removeState(t);},t.prototype._mergeStates=function(t){for(var e,n={},i=0;i<t.length;i++){var r=t[i];h(n,r),r.textConfig&&(e=e||{},h(e,r.textConfig));}return e&&(n.textConfig=e),n;},t.prototype._applyStateObj=function(t,e,n,i,r,o){var a=!(e&&i);e&&e.textConfig?(this.textConfig=h({},i?this.textConfig:n.textConfig),h(this.textConfig,e.textConfig)):a&&n.textConfig&&(this.textConfig=n.textConfig);for(var s={},l=!1,u=0;u<c_.length;u++){var c=c_[u],p=r&&p_[c];e&&null!=e[c]?p?(l=!0,s[c]=e[c]):this[c]=e[c]:a&&null!=n[c]&&(p?(l=!0,s[c]=n[c]):this[c]=n[c]);}if(!r)for(var u=0;u<this.animators.length;u++){var f=this.animators[u],d=f.targetName;f.__changeFinalValue(d?(e||n)[d]:e||n);}l&&this._transitionState(t,s,o);},t.prototype._attachComponent=function(t){if(t.__zr&&!t.__hostTarget)throw new Error("Text element has been added to zrender.");if(t===this)throw new Error("Recursive component attachment.");var e=this.__zr;e&&t.addSelfToZr(e),t.__zr=e,t.__hostTarget=this;},t.prototype._detachComponent=function(t){t.__zr&&t.removeSelfFromZr(t.__zr),t.__zr=null,t.__hostTarget=null;},t.prototype.getClipPath=function(){return this._clipPath;},t.prototype.setClipPath=function(t){this._clipPath&&this._clipPath!==t&&this.removeClipPath(),this._attachComponent(t),this._clipPath=t,this.markRedraw();},t.prototype.removeClipPath=function(){var t=this._clipPath;t&&(this._detachComponent(t),this._clipPath=null,this.markRedraw());},t.prototype.getTextContent=function(){return this._textContent;},t.prototype.setTextContent=function(t){var e=this._textContent;if(e!==t){if(e&&e!==t&&this.removeTextContent(),t.__zr&&!t.__hostTarget)throw new Error("Text element has been added to zrender.");t.attachedTransform=new km(),this._attachComponent(t),this._textContent=t,this.markRedraw();}},t.prototype.setTextConfig=function(t){this.textConfig||(this.textConfig={}),h(this.textConfig,t),this.markRedraw();},t.prototype.removeTextConfig=function(){this.textConfig=null,this.markRedraw();},t.prototype.removeTextContent=function(){var t=this._textContent;t&&(t.attachedTransform=null,this._detachComponent(t),this._textContent=null,this._innerTextDefaultStyle=null,this.markRedraw());},t.prototype.getTextGuideLine=function(){return this._textGuide;},t.prototype.setTextGuideLine=function(t){this._textGuide&&this._textGuide!==t&&this.removeTextGuideLine(),this._attachComponent(t),this._textGuide=t,this.markRedraw();},t.prototype.removeTextGuideLine=function(){var t=this._textGuide;t&&(this._detachComponent(t),this._textGuide=null,this.markRedraw());},t.prototype.markRedraw=function(){this.__dirty|=t.REDARAW_BIT;var e=this.__zr;e&&(this.__inHover?e.refreshHover():e.refresh()),this.__hostTarget&&this.__hostTarget.markRedraw();},t.prototype.dirty=function(){this.markRedraw();},t.prototype._toggleHoverLayerFlag=function(t){this.__inHover=t;var e=this._textContent,n=this._textGuide;e&&(e.__inHover=t),n&&(n.__inHover=t);},t.prototype.addSelfToZr=function(t){this.__zr=t;var e=this.animators;if(e)for(var n=0;n<e.length;n++){t.animation.addAnimator(e[n]);}this._clipPath&&this._clipPath.addSelfToZr(t),this._textContent&&this._textContent.addSelfToZr(t),this._textGuide&&this._textGuide.addSelfToZr(t);},t.prototype.removeSelfFromZr=function(t){this.__zr=null;var e=this.animators;if(e)for(var n=0;n<e.length;n++){t.animation.removeAnimator(e[n]);}this._clipPath&&this._clipPath.removeSelfFromZr(t),this._textContent&&this._textContent.removeSelfFromZr(t),this._textGuide&&this._textGuide.removeSelfFromZr(t);},t.prototype.animate=function(t,e){var n=t?this[t]:this;if(!n)return void a('Property "'+t+'" is not existed in element '+this.id);var i=new Um(n,e);return this.addAnimator(i,t),i;},t.prototype.addAnimator=function(t,e){var n=this.__zr,i=this;t.during(function(){i.updateDuringAnimation(e);}).done(function(){var e=i.animators,n=p(e,t);n>=0&&e.splice(n,1);}),this.animators.push(t),n&&n.animation.addAnimator(t),n&&n.wakeUp();},t.prototype.updateDuringAnimation=function(){this.markRedraw();},t.prototype.stopAnimation=function(t,e){for(var n=this.animators,i=n.length,r=[],o=0;i>o;o++){var a=n[o];t&&t!==a.scope?r.push(a):a.stop(e);}return this.animators=r,this;},t.prototype.animateTo=function(t,e,n){Vn(this,t,e,n);},t.prototype.animateFrom=function(t,e,n){Vn(this,t,e,n,!0);},t.prototype._transitionState=function(t,e,n,i){for(var r=Vn(this,e,n,i),o=0;o<r.length;o++){r[o].__fromStateTransition=t;}},t.prototype.getBoundingRect=function(){return null;},t.prototype.getPaintRect=function(){return null;},t.REDARAW_BIT=1,t.initDefaultProps=function(){function e(t,e,n){r[t+e+n]||(console.warn("DEPRECATED: '"+t+"' has been deprecated. use '"+e+"', '"+n+"' instead"),r[t+e+n]=!0);}function n(t,n,r,o){function a(t,e){Object.defineProperty(e,0,{get:function get(){return t[r];},set:function set(e){t[r]=e;}}),Object.defineProperty(e,1,{get:function get(){return t[o];},set:function set(e){t[o]=e;}});}Object.defineProperty(i,t,{get:function get(){if(e(t,r,o),!this[n]){var i=this[n]=[];a(this,i);}return this[n];},set:function set(i){e(t,r,o),this[r]=i[0],this[o]=i[1],this[n]=i,a(this,i);}});}var i=t.prototype;i.type="element",i.name="",i.ignore=!1,i.silent=!1,i.isGroup=!1,i.draggable=!1,i.dragging=!1,i.ignoreClip=!1,i.__inHover=!1,i.__dirty=t.REDARAW_BIT;var r={};Object.defineProperty&&(!Rv.browser.ie||Rv.browser.version>8)&&(n("position","_legacyPos","x","y"),n("scale","_legacyScale","scaleX","scaleY"),n("origin","_legacyOrigin","originX","originY"));}(),t;}();d(g_,om),d(g_,km);var y_,v_=32,m_=7,__=!1,x_=function(){function t(){this._roots=[],this._displayList=[],this._displayListLen=0,this.displayableSortFunc=ti;}return t.prototype.traverse=function(t,e){for(var n=0;n<this._roots.length;n++){this._roots[n].traverse(t,e);}},t.prototype.getDisplayList=function(t,e){e=e||!1;var n=this._displayList;return(t||!n.length)&&this.updateDisplayList(e),n;},t.prototype.updateDisplayList=function(t){this._displayListLen=0;for(var e=this._roots,n=this._displayList,i=0,r=e.length;r>i;i++){this._updateAndAddDisplayable(e[i],null,t);}n.length=this._displayListLen,Rv.canvasSupported&&Jn(n,ti);},t.prototype._updateAndAddDisplayable=function(t,e,n){if(!t.ignore||n){t.beforeUpdate(),t.update(),t.afterUpdate();var i=t.getClipPath();if(t.ignoreClip)e=null;else if(i){e=e?e.slice():[];for(var r=i,o=t;r;){r.parent=o,r.updateTransform(),e.push(r),o=r,r=r.getClipPath();}}if(t.childrenRef){for(var a=t.childrenRef(),s=0;s<a.length;s++){var l=a[s];t.__dirty&&(l.__dirty|=g_.REDARAW_BIT),this._updateAndAddDisplayable(l,e,n);}t.__dirty=0;}else{var u=t;e&&e.length?u.__clipPaths=e:u.__clipPaths&&u.__clipPaths.length>0&&(u.__clipPaths=[]),isNaN(u.z)&&(Qn(),u.z=0),isNaN(u.z2)&&(Qn(),u.z2=0),isNaN(u.zlevel)&&(Qn(),u.zlevel=0),this._displayList[this._displayListLen++]=u;}var h=t.getDecalElement&&t.getDecalElement();h&&this._updateAndAddDisplayable(h,e,n);var c=t.getTextGuideLine();c&&this._updateAndAddDisplayable(c,e,n);var p=t.getTextContent();p&&this._updateAndAddDisplayable(p,e,n);}},t.prototype.addRoot=function(t){t.__zr&&t.__zr.storage===this||this._roots.push(t);},t.prototype.delRoot=function(t){if(t instanceof Array)for(var e=0,n=t.length;n>e;e++){this.delRoot(t[e]);}else{var i=p(this._roots,t);i>=0&&this._roots.splice(i,1);}},t.prototype.delAllRoots=function(){this._roots=[],this._displayList=[],this._displayListLen=0;},t.prototype.getRoots=function(){return this._roots;},t.prototype.dispose=function(){this._displayList=null,this._roots=null;},t;}();y_="undefined"!=typeof window&&(window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.msRequestAnimationFrame&&window.msRequestAnimationFrame.bind(window)||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame)||function(t){return setTimeout(t,16);};var b_=y_,w_=function(t){function n(e){var n=t.call(this)||this;return n._running=!1,n._time=0,n._pausedTime=0,n._pauseStart=0,n._paused=!1,e=e||{},n.stage=e.stage||{},n.onframe=e.onframe||function(){},n;}return e(n,t),n.prototype.addClip=function(t){t.animation&&this.removeClip(t),this._clipsHead?(this._clipsTail.next=t,t.prev=this._clipsTail,t.next=null,this._clipsTail=t):this._clipsHead=this._clipsTail=t,t.animation=this;},n.prototype.addAnimator=function(t){t.animation=this;var e=t.getClip();e&&this.addClip(e);},n.prototype.removeClip=function(t){if(t.animation){var e=t.prev,n=t.next;e?e.next=n:this._clipsHead=n,n?n.prev=e:this._clipsTail=e,t.next=t.prev=t.animation=null;}},n.prototype.removeAnimator=function(t){var e=t.getClip();e&&this.removeClip(e),t.animation=null;},n.prototype.update=function(t){for(var e=new Date().getTime()-this._pausedTime,n=e-this._time,i=this._clipsHead;i;){var r=i.next,o=i.step(e,n);o?(i.ondestroy&&i.ondestroy(),this.removeClip(i),i=r):i=r;}this._time=e,t||(this.onframe(n),this.trigger("frame",n),this.stage.update&&this.stage.update());},n.prototype._startLoop=function(){function t(){e._running&&(b_(t),!e._paused&&e.update());}var e=this;this._running=!0,b_(t);},n.prototype.start=function(){this._running||(this._time=new Date().getTime(),this._pausedTime=0,this._startLoop());},n.prototype.stop=function(){this._running=!1;},n.prototype.pause=function(){this._paused||(this._pauseStart=new Date().getTime(),this._paused=!0);},n.prototype.resume=function(){this._paused&&(this._pausedTime+=new Date().getTime()-this._pauseStart,this._paused=!1);},n.prototype.clear=function(){for(var t=this._clipsHead;t;){var e=t.next;t.prev=t.next=t.animation=null,t=e;}this._clipsHead=this._clipsTail=null;},n.prototype.isFinished=function(){return null==this._clipsHead;},n.prototype.animate=function(t,e){e=e||{},this.start();var n=new Um(t,e.loop);return this.addAnimator(n),n;},n;}(om),S_=300,M_=Rv.domSupported,T_=function(){var t=["click","dblclick","mousewheel","wheel","mouseout","mouseup","mousedown","mousemove","contextmenu"],e=["touchstart","touchend","touchmove"],n={pointerdown:1,pointerup:1,pointermove:1,pointerout:1},i=v(t,function(t){var e=t.replace("mouse","pointer");return n.hasOwnProperty(e)?e:t;});return{mouse:t,touch:e,pointer:i};}(),C_={mouse:["mousemove","mouseup"],pointer:["pointermove","pointerup"]},I_=!1,A_=function(){function t(t,e){this.stopPropagation=K,this.stopImmediatePropagation=K,this.preventDefault=K,this.type=e.type,this.target=this.currentTarget=t.dom,this.pointerType=e.pointerType,this.clientX=e.clientX,this.clientY=e.clientY;}return t;}(),k_={mousedown:function mousedown(t){t=Ae(this.dom,t),this.__mayPointerCapture=[t.zrX,t.zrY],this.trigger("mousedown",t);},mousemove:function mousemove(t){t=Ae(this.dom,t);var e=this.__mayPointerCapture;!e||t.zrX===e[0]&&t.zrY===e[1]||this.__togglePointerCapture(!0),this.trigger("mousemove",t);},mouseup:function mouseup(t){t=Ae(this.dom,t),this.__togglePointerCapture(!1),this.trigger("mouseup",t);},mouseout:function mouseout(t){t=Ae(this.dom,t);var e=t.toElement||t.relatedTarget;oi(this,e)||(this.__pointerCapturing&&(t.zrEventControl="no_globalout"),this.trigger("mouseout",t));},wheel:function wheel(t){I_=!0,t=Ae(this.dom,t),this.trigger("mousewheel",t);},mousewheel:function mousewheel(t){I_||(t=Ae(this.dom,t),this.trigger("mousewheel",t));},touchstart:function touchstart(t){t=Ae(this.dom,t),ii(t),this.__lastTouchMoment=new Date(),this.handler.processGesture(t,"start"),k_.mousemove.call(this,t),k_.mousedown.call(this,t);},touchmove:function touchmove(t){t=Ae(this.dom,t),ii(t),this.handler.processGesture(t,"change"),k_.mousemove.call(this,t);},touchend:function touchend(t){t=Ae(this.dom,t),ii(t),this.handler.processGesture(t,"end"),k_.mouseup.call(this,t),+new Date()-+this.__lastTouchMoment<S_&&k_.click.call(this,t);},pointerdown:function pointerdown(t){k_.mousedown.call(this,t);},pointermove:function pointermove(t){ei(t)||k_.mousemove.call(this,t);},pointerup:function pointerup(t){k_.mouseup.call(this,t);},pointerout:function pointerout(t){ei(t)||k_.mouseout.call(this,t);}};y(["click","dblclick","contextmenu"],function(t){k_[t]=function(e){e=Ae(this.dom,e),this.trigger(t,e);};});var D_={pointermove:function pointermove(t){ei(t)||D_.mousemove.call(this,t);},pointerup:function pointerup(t){D_.mouseup.call(this,t);},mousemove:function mousemove(t){this.trigger("mousemove",t);},mouseup:function mouseup(t){var e=this.__pointerCapturing;this.__togglePointerCapture(!1),this.trigger("mouseup",t),e&&(t.zrEventControl="only_globalout",this.trigger("mouseout",t));}},L_=function(){function t(t,e){this.mounted={},this.listenerOpts={},this.touching=!1,this.domTarget=t,this.domHandlers=e;}return t;}(),P_=function(t){function n(e,n){var i=t.call(this)||this;return i.__pointerCapturing=!1,i.dom=e,i.painterRoot=n,i._localHandlerScope=new L_(e,k_),M_&&(i._globalHandlerScope=new L_(document,D_)),ai(i,i._localHandlerScope),i;}return e(n,t),n.prototype.dispose=function(){ui(this._localHandlerScope),M_&&ui(this._globalHandlerScope);},n.prototype.setCursor=function(t){this.dom.style&&(this.dom.style.cursor=t||"default");},n.prototype.__togglePointerCapture=function(t){if(this.__mayPointerCapture=null,M_&&+this.__pointerCapturing^+t){this.__pointerCapturing=t;var e=this._globalHandlerScope;t?si(this,e):ui(e);}},n;}(om),O_=function(t){function n(e){var n=t.call(this)||this;return n.isGroup=!0,n._children=[],n.attr(e),n;}return e(n,t),n.prototype.childrenRef=function(){return this._children;},n.prototype.children=function(){return this._children.slice();},n.prototype.childAt=function(t){return this._children[t];},n.prototype.childOfName=function(t){for(var e=this._children,n=0;n<e.length;n++){if(e[n].name===t)return e[n];}},n.prototype.childCount=function(){return this._children.length;},n.prototype.add=function(t){if(t&&(t!==this&&t.parent!==this&&(this._children.push(t),this._doAdd(t)),t.__hostTarget))throw"This elemenet has been used as an attachment";return this;},n.prototype.addBefore=function(t,e){if(t&&t!==this&&t.parent!==this&&e&&e.parent===this){var n=this._children,i=n.indexOf(e);i>=0&&(n.splice(i,0,t),this._doAdd(t));}return this;},n.prototype.replaceAt=function(t,e){var n=this._children,i=n[e];if(t&&t!==this&&t.parent!==this&&t!==i){n[e]=t,i.parent=null;
var r=this.__zr;r&&i.removeSelfFromZr(r),this._doAdd(t);}return this;},n.prototype._doAdd=function(t){t.parent&&t.parent.remove(t),t.parent=this;var e=this.__zr;e&&e!==t.__zr&&t.addSelfToZr(e),e&&e.refresh();},n.prototype.remove=function(t){var e=this.__zr,n=this._children,i=p(n,t);return 0>i?this:(n.splice(i,1),t.parent=null,e&&t.removeSelfFromZr(e),e&&e.refresh(),this);},n.prototype.removeAll=function(){for(var t=this._children,e=this.__zr,n=0;n<t.length;n++){var i=t[n];e&&i.removeSelfFromZr(e),i.parent=null;}return t.length=0,this;},n.prototype.eachChild=function(t,e){for(var n=this._children,i=0;i<n.length;i++){var r=n[i];t.call(e,r,i);}return this;},n.prototype.traverse=function(t,e){for(var n=0;n<this._children.length;n++){var i=this._children[n],r=t.call(e,i);i.isGroup&&!r&&i.traverse(t,e);}return this;},n.prototype.addSelfToZr=function(e){t.prototype.addSelfToZr.call(this,e);for(var n=0;n<this._children.length;n++){var i=this._children[n];i.addSelfToZr(e);}},n.prototype.removeSelfFromZr=function(e){t.prototype.removeSelfFromZr.call(this,e);for(var n=0;n<this._children.length;n++){var i=this._children[n];i.removeSelfFromZr(e);}},n.prototype.getBoundingRect=function(t){for(var e=new t_(0,0,0,0),n=t||this._children,i=[],r=null,o=0;o<n.length;o++){var a=n[o];if(!a.ignore&&!a.invisible){var s=a.getBoundingRect(),l=a.getLocalTransform(i);l?(t_.applyTransform(e,s,l),r=r||e.clone(),r.union(e)):(r=r||s.clone(),r.union(s));}}return r||e;},n;}(g_);O_.prototype.type="group";var R_=!Rv.canvasSupported,E_={},B_={},z_=function(){function t(t,e,n){var i=this;this._sleepAfterStill=10,this._stillFrameAccum=0,this._needsRefresh=!0,this._needsRefreshHover=!0,this._darkMode=!1,n=n||{},this.dom=e,this.id=t;var r=new x_(),o=n.renderer||"canvas";if(R_)throw new Error("IE8 support has been dropped since 5.0");if(E_[o]||(o=b(E_)[0]),!E_[o])throw new Error("Renderer '"+o+"' is not imported. Please import it first.");n.useDirtyRect=null==n.useDirtyRect?!1:n.useDirtyRect;var a=new E_[o](e,r,n,t);this.storage=r,this.painter=a;var s=Rv.node||Rv.worker?null:new P_(a.getViewportRoot(),a.root);this.handler=new _m(r,a,s,a.root),this.animation=new w_({stage:{update:function update(){return i._flush(!0);}}}),this.animation.start();}return t.prototype.add=function(t){t&&(this.storage.addRoot(t),t.addSelfToZr(this),this.refresh());},t.prototype.remove=function(t){t&&(this.storage.delRoot(t),t.removeSelfFromZr(this),this.refresh());},t.prototype.configLayer=function(t,e){this.painter.configLayer&&this.painter.configLayer(t,e),this.refresh();},t.prototype.setBackgroundColor=function(t){this.painter.setBackgroundColor&&this.painter.setBackgroundColor(t),this.refresh(),this._backgroundColor=t,this._darkMode=ci(t);},t.prototype.getBackgroundColor=function(){return this._backgroundColor;},t.prototype.setDarkMode=function(t){this._darkMode=t;},t.prototype.isDarkMode=function(){return this._darkMode;},t.prototype.refreshImmediately=function(t){t||this.animation.update(!0),this._needsRefresh=!1,this.painter.refresh(),this._needsRefresh=!1;},t.prototype.refresh=function(){this._needsRefresh=!0,this.animation.start();},t.prototype.flush=function(){this._flush(!1);},t.prototype._flush=function(t){var e,n=new Date().getTime();this._needsRefresh&&(e=!0,this.refreshImmediately(t)),this._needsRefreshHover&&(e=!0,this.refreshHoverImmediately());var i=new Date().getTime();e?(this._stillFrameAccum=0,this.trigger("rendered",{elapsedTime:i-n})):this._sleepAfterStill>0&&(this._stillFrameAccum++,this._stillFrameAccum>this._sleepAfterStill&&this.animation.stop());},t.prototype.setSleepAfterStill=function(t){this._sleepAfterStill=t;},t.prototype.wakeUp=function(){this.animation.start(),this._stillFrameAccum=0;},t.prototype.addHover=function(){},t.prototype.removeHover=function(){},t.prototype.clearHover=function(){},t.prototype.refreshHover=function(){this._needsRefreshHover=!0;},t.prototype.refreshHoverImmediately=function(){this._needsRefreshHover=!1,this.painter.refreshHover&&"canvas"===this.painter.getType()&&this.painter.refreshHover();},t.prototype.resize=function(t){t=t||{},this.painter.resize(t.width,t.height),this.handler.resize();},t.prototype.clearAnimation=function(){this.animation.clear();},t.prototype.getWidth=function(){return this.painter.getWidth();},t.prototype.getHeight=function(){return this.painter.getHeight();},t.prototype.pathToImage=function(t,e){return this.painter.pathToImage?this.painter.pathToImage(t,e):void 0;},t.prototype.setCursorStyle=function(t){this.handler.setCursorStyle(t);},t.prototype.findHover=function(t,e){return this.handler.findHover(t,e);},t.prototype.on=function(t,e,n){return this.handler.on(t,e,n),this;},t.prototype.off=function(t,e){this.handler.off(t,e);},t.prototype.trigger=function(t,e){this.handler.trigger(t,e);},t.prototype.clear=function(){for(var t=this.storage.getRoots(),e=0;e<t.length;e++){t[e]instanceof O_&&t[e].removeSelfFromZr(this);}this.storage.delAllRoots(),this.painter.clear();},t.prototype.dispose=function(){this.animation.stop(),this.clear(),this.storage.dispose(),this.painter.dispose(),this.handler.dispose(),this.animation=this.storage=this.painter=this.handler=null,hi(this.id);},t;}(),N_="5.1.0",F_=(Object.freeze||Object)({init:pi,dispose:fi,disposeAll:di,getInstance:gi,registerPainter:yi,version:N_}),V_=1e-4,H_=9007199254740991,G_=/^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/,W_=("undefined"!=typeof console&&console.warn&&console.log,"series\x00"),U_="\x00_ec_\x00",Y_=["fontStyle","fontWeight","fontSize","fontFamily","rich","tag","color","textBorderColor","textBorderWidth","width","height","lineHeight","align","verticalAlign","baseline","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY","textShadowColor","textShadowBlur","textShadowOffsetX","textShadowOffsetY","backgroundColor","borderColor","borderWidth","borderRadius","padding"],X_=Bi(),j_={useDefault:!0,enableAll:!1,enableNone:!1},q_=".",Z_="___EC__COMPONENT__CONTAINER___",K_="___EC__EXTENDED_CLASS___",$_=Math.round(10*Math.random()),J_=[["fill","color"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["opacity"],["shadowColor"]],Q_=Sr(J_),tx=function(){function t(){}return t.prototype.getAreaStyle=function(t,e){return Q_(this,t,e);},t;}(),ex=new Rm(50),nx=/\{([a-zA-Z0-9_]+)\|([^}]*)\}/g,ix=function(){function t(){}return t;}(),rx=function(){function t(t){this.tokens=[],t&&(this.tokens=t);}return t;}(),ox=function(){function t(){this.width=0,this.height=0,this.contentWidth=0,this.contentHeight=0,this.outerWidth=0,this.outerHeight=0,this.lines=[];}return t;}(),ax=m(",&?/;] ".split(""),function(t,e){return t[e]=!0,t;},{}),sx="__zr_style_"+Math.round(10*Math.random()),lx={shadowBlur:0,shadowOffsetX:0,shadowOffsetY:0,shadowColor:"#000",opacity:1,blend:"source-over"},ux={style:{shadowBlur:!0,shadowOffsetX:!0,shadowOffsetY:!0,shadowColor:!0,opacity:!0}};lx[sx]=!0;var hx=["z","z2","invisible"],cx=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype._init=function(e){for(var n=b(e),i=0;i<n.length;i++){var r=n[i];"style"===r?this.useStyle(e[r]):t.prototype.attrKV.call(this,r,e[r]);}this.style||this.useStyle({});},n.prototype.beforeBrush=function(){},n.prototype.afterBrush=function(){},n.prototype.innerBeforeBrush=function(){},n.prototype.innerAfterBrush=function(){},n.prototype.shouldBePainted=function(t,e,n,i){var r=this.transform;if(this.ignore||this.invisible||0===this.style.opacity||this.culling&&Nr(this,t,e)||r&&!r[0]&&!r[3])return!1;if(n&&this.__clipPaths)for(var o=0;o<this.__clipPaths.length;++o){if(this.__clipPaths[o].isZeroArea())return!1;}if(i&&this.parent)for(var a=this.parent;a;){if(a.ignore)return!1;a=a.parent;}return!0;},n.prototype.contain=function(t,e){return this.rectContain(t,e);},n.prototype.traverse=function(t,e){t.call(e,this);},n.prototype.rectContain=function(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect();return i.contain(n[0],n[1]);},n.prototype.getPaintRect=function(){var t=this._paintRect;if(!this._paintRect||this.__dirty){var e=this.transform,n=this.getBoundingRect(),i=this.style,r=i.shadowBlur||0,o=i.shadowOffsetX||0,a=i.shadowOffsetY||0;t=this._paintRect||(this._paintRect=new t_(0,0,0,0)),e?t_.applyTransform(t,n,e):t.copy(n),(r||o||a)&&(t.width+=2*r+Math.abs(o),t.height+=2*r+Math.abs(a),t.x=Math.min(t.x,t.x+o-r),t.y=Math.min(t.y,t.y+a-r));var s=this.dirtyRectTolerance;t.isZero()||(t.x=Math.floor(t.x-s),t.y=Math.floor(t.y-s),t.width=Math.ceil(t.width+1+2*s),t.height=Math.ceil(t.height+1+2*s));}return t;},n.prototype.setPrevPaintRect=function(t){t?(this._prevPaintRect=this._prevPaintRect||new t_(0,0,0,0),this._prevPaintRect.copy(t)):this._prevPaintRect=null;},n.prototype.getPrevPaintRect=function(){return this._prevPaintRect;},n.prototype.animateStyle=function(t){return this.animate("style",t);},n.prototype.updateDuringAnimation=function(t){"style"===t?this.dirtyStyle():this.markRedraw();},n.prototype.attrKV=function(e,n){"style"!==e?t.prototype.attrKV.call(this,e,n):this.style?this.setStyle(n):this.useStyle(n);},n.prototype.setStyle=function(t,e){return"string"==typeof t?this.style[t]=e:h(this.style,t),this.dirtyStyle(),this;},n.prototype.dirtyStyle=function(){this.markRedraw(),this.__dirty|=n.STYLE_CHANGED_BIT,this._rect&&(this._rect=null);},n.prototype.dirty=function(){this.dirtyStyle();},n.prototype.styleChanged=function(){return!!(this.__dirty&n.STYLE_CHANGED_BIT);},n.prototype.styleUpdated=function(){this.__dirty&=~n.STYLE_CHANGED_BIT;},n.prototype.createStyle=function(t){return q(lx,t);},n.prototype.useStyle=function(t){t[sx]||(t=this.createStyle(t)),this.__inHover?this.__hoverStyle=t:this.style=t,this.dirtyStyle();},n.prototype.isStyleObject=function(t){return t[sx];},n.prototype._innerSaveToNormal=function(e){t.prototype._innerSaveToNormal.call(this,e);var n=this._normalState;e.style&&!n.style&&(n.style=this._mergeStyle(this.createStyle(),this.style)),this._savePrimaryToNormal(e,n,hx);},n.prototype._applyStateObj=function(e,n,i,r,o,a){t.prototype._applyStateObj.call(this,e,n,i,r,o,a);var s,l=!(n&&r);if(n&&n.style?o?r?s=n.style:(s=this._mergeStyle(this.createStyle(),i.style),this._mergeStyle(s,n.style)):(s=this._mergeStyle(this.createStyle(),r?this.style:i.style),this._mergeStyle(s,n.style)):l&&(s=i.style),s)if(o){var u=this.style;if(this.style=this.createStyle(l?{}:u),l)for(var h=b(u),c=0;c<h.length;c++){var p=h[c];p in s&&(s[p]=s[p],this.style[p]=u[p]);}for(var f=b(s),c=0;c<f.length;c++){var p=f[c];this.style[p]=this.style[p];}this._transitionState(e,{style:s},a,this.getAnimationStyleProps());}else this.useStyle(s);for(var c=0;c<hx.length;c++){var p=hx[c];n&&null!=n[p]?this[p]=n[p]:l&&null!=i[p]&&(this[p]=i[p]);}},n.prototype._mergeStates=function(e){for(var n,i=t.prototype._mergeStates.call(this,e),r=0;r<e.length;r++){var o=e[r];o.style&&(n=n||{},this._mergeStyle(n,o.style));}return n&&(i.style=n),i;},n.prototype._mergeStyle=function(t,e){return h(t,e),t;},n.prototype.getAnimationStyleProps=function(){return ux;},n.STYLE_CHANGED_BIT=2,n.initDefaultProps=function(){var t=n.prototype;t.type="displayable",t.invisible=!1,t.z=0,t.z2=0,t.zlevel=0,t.culling=!1,t.cursor="pointer",t.rectHover=!1,t.incremental=!1,t._rect=null,t.dirtyRectTolerance=0,t.__dirty=g_.REDARAW_BIT|n.STYLE_CHANGED_BIT;}(),n;}(g_),px=new t_(0,0,0,0),fx=new t_(0,0,0,0),dx=Math.pow,gx=Math.sqrt,yx=1e-8,vx=1e-4,mx=gx(3),_x=1/3,xx=$(),bx=$(),Sx=$(),Mx=Math.min,Tx=Math.max,Cx=Math.sin,Ix=Math.cos,Ax=2*Math.PI,kx=$(),Dx=$(),Lx=$(),Px=[],Ox=[],Rx={M:1,L:2,C:3,Q:4,A:5,Z:6,R:7},Ex=[],Bx=[],zx=[],Nx=[],Fx=[],Vx=[],Hx=Math.min,Gx=Math.max,Wx=Math.cos,Ux=Math.sin,Yx=Math.sqrt,Xx=Math.abs,jx=Math.PI,qx=2*jx,Zx="undefined"!=typeof Float32Array,Kx=[],$x=function(){function t(t){this.dpr=1,this._version=0,this._xi=0,this._yi=0,this._x0=0,this._y0=0,this._len=0,t&&(this._saveData=!1),this._saveData&&(this.data=[]);}return t.prototype.increaseVersion=function(){this._version++;},t.prototype.getVersion=function(){return this._version;},t.prototype.setScale=function(t,e,n){n=n||0,n>0&&(this._ux=Xx(n/o_/t)||0,this._uy=Xx(n/o_/e)||0);},t.prototype.setDPR=function(t){this.dpr=t;},t.prototype.setContext=function(t){this._ctx=t;},t.prototype.getContext=function(){return this._ctx;},t.prototype.beginPath=function(){return this._ctx&&this._ctx.beginPath(),this.reset(),this;},t.prototype.reset=function(){this._saveData&&(this._len=0),this._lineDash&&(this._lineDash=null,this._dashOffset=0),this._pathSegLen&&(this._pathSegLen=null,this._pathLen=0),this._version++;},t.prototype.moveTo=function(t,e){return this.addData(Rx.M,t,e),this._ctx&&this._ctx.moveTo(t,e),this._x0=t,this._y0=e,this._xi=t,this._yi=e,this;},t.prototype.lineTo=function(t,e){var n=Xx(t-this._xi)>this._ux||Xx(e-this._yi)>this._uy||this._len<5;return this.addData(Rx.L,t,e),this._ctx&&n&&(this._needsDash?this._dashedLineTo(t,e):this._ctx.lineTo(t,e)),n&&(this._xi=t,this._yi=e),this;},t.prototype.bezierCurveTo=function(t,e,n,i,r,o){return this.addData(Rx.C,t,e,n,i,r,o),this._ctx&&(this._needsDash?this._dashedBezierTo(t,e,n,i,r,o):this._ctx.bezierCurveTo(t,e,n,i,r,o)),this._xi=r,this._yi=o,this;},t.prototype.quadraticCurveTo=function(t,e,n,i){return this.addData(Rx.Q,t,e,n,i),this._ctx&&(this._needsDash?this._dashedQuadraticTo(t,e,n,i):this._ctx.quadraticCurveTo(t,e,n,i)),this._xi=n,this._yi=i,this;},t.prototype.arc=function(t,e,n,i,r,o){Kx[0]=i,Kx[1]=r,so(Kx,o),i=Kx[0],r=Kx[1];var a=r-i;return this.addData(Rx.A,t,e,n,n,i,a,0,o?0:1),this._ctx&&this._ctx.arc(t,e,n,i,r,o),this._xi=Wx(r)*n+t,this._yi=Ux(r)*n+e,this;},t.prototype.arcTo=function(t,e,n,i,r){return this._ctx&&this._ctx.arcTo(t,e,n,i,r),this;},t.prototype.rect=function(t,e,n,i){return this._ctx&&this._ctx.rect(t,e,n,i),this.addData(Rx.R,t,e,n,i),this;},t.prototype.closePath=function(){this.addData(Rx.Z);var t=this._ctx,e=this._x0,n=this._y0;return t&&(this._needsDash&&this._dashedLineTo(e,n),t.closePath()),this._xi=e,this._yi=n,this;},t.prototype.fill=function(t){t&&t.fill(),this.toStatic();},t.prototype.stroke=function(t){t&&t.stroke(),this.toStatic();},t.prototype.setLineDash=function(t){if(t instanceof Array){this._lineDash=t,this._dashIdx=0;for(var e=0,n=0;n<t.length;n++){e+=t[n];}this._dashSum=e,this._needsDash=!0;}else this._lineDash=null,this._needsDash=!1;return this;},t.prototype.setLineDashOffset=function(t){return this._dashOffset=t,this;},t.prototype.len=function(){return this._len;},t.prototype.setData=function(t){var e=t.length;this.data&&this.data.length===e||!Zx||(this.data=new Float32Array(e));for(var n=0;e>n;n++){this.data[n]=t[n];}this._len=e;},t.prototype.appendPath=function(t){t instanceof Array||(t=[t]);for(var e=t.length,n=0,i=this._len,r=0;e>r;r++){n+=t[r].len();}Zx&&this.data instanceof Float32Array&&(this.data=new Float32Array(i+n));for(var r=0;e>r;r++){for(var o=t[r].data,a=0;a<o.length;a++){this.data[i++]=o[a];}}this._len=i;},t.prototype.addData=function(){if(this._saveData){var t=this.data;this._len+arguments.length>t.length&&(this._expandData(),t=this.data);for(var e=0;e<arguments.length;e++){t[this._len++]=arguments[e];}}},t.prototype._expandData=function(){if(!(this.data instanceof Array)){for(var t=[],e=0;e<this._len;e++){t[e]=this.data[e];}this.data=t;}},t.prototype._dashedLineTo=function(t,e){var n,i,r=this._dashSum,o=this._lineDash,a=this._ctx,s=this._dashOffset,l=this._xi,u=this._yi,h=t-l,c=e-u,p=Yx(h*h+c*c),f=l,d=u,g=o.length;for(h/=p,c/=p,0>s&&(s=r+s),s%=r,f-=s*h,d-=s*c;h>0&&t>=f||0>h&&f>=t||0===h&&(c>0&&e>=d||0>c&&d>=e);){i=this._dashIdx,n=o[i],f+=h*n,d+=c*n,this._dashIdx=(i+1)%g,h>0&&l>f||0>h&&f>l||c>0&&u>d||0>c&&d>u||a[i%2?"moveTo":"lineTo"](h>=0?Hx(f,t):Gx(f,t),c>=0?Hx(d,e):Gx(d,e));}h=f-t,c=d-e,this._dashOffset=-Yx(h*h+c*c);},t.prototype._dashedBezierTo=function(t,e,n,i,r,o){var a,s,l,u,h,c=this._ctx,p=this._dashSum,f=this._dashOffset,d=this._lineDash,g=this._xi,y=this._yi,v=0,m=this._dashIdx,_=d.length,x=0;for(0>f&&(f=p+f),f%=p,a=0;1>a;a+=.1){s=Hr(g,t,n,r,a+.1)-Hr(g,t,n,r,a),l=Hr(y,e,i,o,a+.1)-Hr(y,e,i,o,a),v+=Yx(s*s+l*l);}for(;_>m&&(x+=d[m],!(x>f));m++){;}for(a=(x-f)/v;1>=a;){u=Hr(g,t,n,r,a),h=Hr(y,e,i,o,a),m%2?c.moveTo(u,h):c.lineTo(u,h),a+=d[m]/v,m=(m+1)%_;}m%2!==0&&c.lineTo(r,o),s=r-u,l=o-h,this._dashOffset=-Yx(s*s+l*l);},t.prototype._dashedQuadraticTo=function(t,e,n,i){var r=n,o=i;n=(n+2*t)/3,i=(i+2*e)/3,t=(this._xi+2*t)/3,e=(this._yi+2*e)/3,this._dashedBezierTo(t,e,n,i,r,o);},t.prototype.toStatic=function(){if(this._saveData){var t=this.data;t instanceof Array&&(t.length=this._len,Zx&&this._len>11&&(this.data=new Float32Array(t)));}},t.prototype.getBoundingRect=function(){zx[0]=zx[1]=Fx[0]=Fx[1]=Number.MAX_VALUE,Nx[0]=Nx[1]=Vx[0]=Vx[1]=-Number.MAX_VALUE;var t,e=this.data,n=0,i=0,r=0,o=0;for(t=0;t<this._len;){var a=e[t++],s=1===t;switch(s&&(n=e[t],i=e[t+1],r=n,o=i),a){case Rx.M:n=r=e[t++],i=o=e[t++],Fx[0]=r,Fx[1]=o,Vx[0]=r,Vx[1]=o;break;case Rx.L:no(n,i,e[t],e[t+1],Fx,Vx),n=e[t++],i=e[t++];break;case Rx.C:io(n,i,e[t++],e[t++],e[t++],e[t++],e[t],e[t+1],Fx,Vx),n=e[t++],i=e[t++];break;case Rx.Q:ro(n,i,e[t++],e[t++],e[t],e[t+1],Fx,Vx),n=e[t++],i=e[t++];break;case Rx.A:var l=e[t++],u=e[t++],h=e[t++],c=e[t++],p=e[t++],f=e[t++]+p;t+=1;var d=!e[t++];s&&(r=Wx(p)*h+l,o=Ux(p)*c+u),oo(l,u,h,c,p,f,d,Fx,Vx),n=Wx(f)*h+l,i=Ux(f)*c+u;break;case Rx.R:r=n=e[t++],o=i=e[t++];var g=e[t++],y=e[t++];no(r,o,r+g,o+y,Fx,Vx);break;case Rx.Z:n=r,i=o;}ye(zx,zx,Fx),ve(Nx,Nx,Vx);}return 0===t&&(zx[0]=zx[1]=Nx[0]=Nx[1]=0),new t_(zx[0],zx[1],Nx[0]-zx[0],Nx[1]-zx[1]);},t.prototype._calculateLength=function(){var t=this.data,e=this._len,n=this._ux,i=this._uy,r=0,o=0,a=0,s=0;this._pathSegLen||(this._pathSegLen=[]);for(var l=this._pathSegLen,u=0,h=0,c=0;e>c;){var p=t[c++],f=1===c;f&&(r=t[c],o=t[c+1],a=r,s=o);var d=-1;switch(p){case Rx.M:r=a=t[c++],o=s=t[c++];break;case Rx.L:var g=t[c++],y=t[c++],v=g-r,m=y-o;(Xx(v)>n||Xx(m)>i||c===e-1)&&(d=Math.sqrt(v*v+m*m),r=g,o=y);break;case Rx.C:var _=t[c++],x=t[c++],g=t[c++],y=t[c++],b=t[c++],w=t[c++];d=jr(r,o,_,x,g,y,b,w,10),r=b,o=w;break;case Rx.Q:var _=t[c++],x=t[c++],g=t[c++],y=t[c++];d=to(r,o,_,x,g,y,10),r=g,o=y;break;case Rx.A:var S=t[c++],M=t[c++],T=t[c++],C=t[c++],I=t[c++],A=t[c++],k=A+I;c+=1;{!t[c++];}f&&(a=Wx(I)*T+S,s=Ux(I)*C+M),d=Gx(T,C)*Hx(qx,Math.abs(A)),r=Wx(k)*T+S,o=Ux(k)*C+M;break;case Rx.R:a=r=t[c++],s=o=t[c++];var D=t[c++],L=t[c++];d=2*D+2*L;break;case Rx.Z:var v=a-r,m=s-o;d=Math.sqrt(v*v+m*m),r=a,o=s;}d>=0&&(l[h++]=d,u+=d);}return this._pathLen=u,u;},t.prototype.rebuildPath=function(t,e){var n,i,r,o,a,s,l,u,h,c=this.data,p=this._ux,f=this._uy,d=this._len,g=1>e,y=0,v=0;if(!g||(this._pathSegLen||this._calculateLength(),l=this._pathSegLen,u=this._pathLen,h=e*u))t:for(var m=0;d>m;){var _=c[m++],x=1===m;switch(x&&(r=c[m],o=c[m+1],n=r,i=o),_){case Rx.M:n=r=c[m++],i=o=c[m++],t.moveTo(r,o);break;case Rx.L:if(a=c[m++],s=c[m++],Xx(a-r)>p||Xx(s-o)>f||m===d-1){if(g){var b=l[v++];if(y+b>h){var w=(h-y)/b;t.lineTo(r*(1-w)+a*w,o*(1-w)+s*w);break t;}y+=b;}t.lineTo(a,s),r=a,o=s;}break;case Rx.C:var S=c[m++],M=c[m++],T=c[m++],C=c[m++],I=c[m++],A=c[m++];if(g){var b=l[v++];if(y+b>h){var w=(h-y)/b;Yr(r,S,T,I,w,Ex),Yr(o,M,C,A,w,Bx),t.bezierCurveTo(Ex[1],Bx[1],Ex[2],Bx[2],Ex[3],Bx[3]);break t;}y+=b;}t.bezierCurveTo(S,M,T,C,I,A),r=I,o=A;break;case Rx.Q:var S=c[m++],M=c[m++],T=c[m++],C=c[m++];if(g){var b=l[v++];if(y+b>h){var w=(h-y)/b;Jr(r,S,T,w,Ex),Jr(o,M,C,w,Bx),t.quadraticCurveTo(Ex[1],Bx[1],Ex[2],Bx[2]);break t;}y+=b;}t.quadraticCurveTo(S,M,T,C),r=T,o=C;break;case Rx.A:var k=c[m++],D=c[m++],L=c[m++],P=c[m++],O=c[m++],R=c[m++],E=c[m++],B=!c[m++],z=L>P?L:P,N=Xx(L-P)>.001,F=O+R,V=!1;if(g){var b=l[v++];y+b>h&&(F=O+R*(h-y)/b,V=!0),y+=b;}if(N&&t.ellipse?t.ellipse(k,D,L,P,E,O,F,B):t.arc(k,D,z,O,F,B),V)break t;x&&(n=Wx(O)*L+k,i=Ux(O)*P+D),r=Wx(F)*L+k,o=Ux(F)*P+D;break;case Rx.R:n=r=c[m],i=o=c[m+1],a=c[m++],s=c[m++];var H=c[m++],G=c[m++];if(g){var b=l[v++];if(y+b>h){var W=h-y;t.moveTo(a,s),t.lineTo(a+Hx(W,H),s),W-=H,W>0&&t.lineTo(a+H,s+Hx(W,G)),W-=G,W>0&&t.lineTo(a+Gx(H-W,0),s+G),W-=H,W>0&&t.lineTo(a,s+Gx(G-W,0));break t;}y+=b;}t.rect(a,s,H,G);break;case Rx.Z:if(g){var b=l[v++];if(y+b>h){var w=(h-y)/b;t.lineTo(r*(1-w)+n*w,o*(1-w)+i*w);break t;}y+=b;}t.closePath(),r=n,o=i;}}},t.CMD=Rx,t.initDefaultProps=function(){var e=t.prototype;e._saveData=!0,e._needsDash=!1,e._dashOffset=0,e._dashIdx=0,e._dashSum=0,e._ux=0,e._uy=0;}(),t;}(),Jx=2*Math.PI,Qx=2*Math.PI,tb=$x.CMD,eb=2*Math.PI,nb=1e-4,ib=[-1,-1,-1],rb=[-1,-1],ob=c({fill:"#000",stroke:null,strokePercent:1,fillOpacity:1,strokeOpacity:1,lineDashOffset:0,lineWidth:1,lineCap:"butt",miterLimit:10,strokeNoScale:!1,strokeFirst:!1},lx),ab={style:c({fill:!0,stroke:!0,strokePercent:!0,fillOpacity:!0,strokeOpacity:!0,lineDashOffset:!0,lineWidth:!0,miterLimit:!0},ux.style)},sb=["x","y","rotation","scaleX","scaleY","originX","originY","invisible","culling","z","z2","zlevel","parent"],lb=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.update=function(){var e=this;t.prototype.update.call(this);var i=this.style;if(i.decal){var r=this._decalEl=this._decalEl||new n();r.buildPath===n.prototype.buildPath&&(r.buildPath=function(t){e.buildPath(t,e.shape);}),r.silent=!0;var o=r.style;for(var a in i){o[a]!==i[a]&&(o[a]=i[a]);}o.fill=i.fill?i.decal:null,o.decal=null,o.shadowColor=null,i.strokeFirst&&(o.stroke=null);for(var s=0;s<sb.length;++s){r[sb[s]]=this[sb[s]];}r.__dirty|=g_.REDARAW_BIT;}else this._decalEl&&(this._decalEl=null);},n.prototype.getDecalElement=function(){return this._decalEl;},n.prototype._init=function(e){var n=b(e);this.shape=this.getDefaultShape();var i=this.getDefaultStyle();i&&this.useStyle(i);for(var r=0;r<n.length;r++){var o=n[r],a=e[o];"style"===o?this.style?h(this.style,a):this.useStyle(a):"shape"===o?h(this.shape,a):t.prototype.attrKV.call(this,o,a);}this.style||this.useStyle({});},n.prototype.getDefaultStyle=function(){return null;},n.prototype.getDefaultShape=function(){return{};},n.prototype.canBeInsideText=function(){return this.hasFill();},n.prototype.getInsideTextFill=function(){var t=this.style.fill;if("none"!==t){if(C(t)){var e=gn(t,0);return e>.5?s_:e>.2?u_:l_;}if(t)return l_;}return s_;},n.prototype.getInsideTextStroke=function(t){var e=this.style.fill;if(C(e)){var n=this.__zr,i=!(!n||!n.isDarkMode()),r=gn(t,0)<a_;if(i===r)return e;}},n.prototype.buildPath=function(){},n.prototype.pathUpdated=function(){this.__dirty&=~n.SHAPE_CHANGED_BIT;},n.prototype.createPathProxy=function(){this.path=new $x(!1);},n.prototype.hasStroke=function(){var t=this.style,e=t.stroke;return!(null==e||"none"===e||!(t.lineWidth>0));},n.prototype.hasFill=function(){var t=this.style,e=t.fill;return null!=e&&"none"!==e;},n.prototype.getBoundingRect=function(){var t=this._rect,e=this.style,i=!t;if(i){var r=!1;this.path||(r=!0,this.createPathProxy());var o=this.path;(r||this.__dirty&n.SHAPE_CHANGED_BIT)&&(o.beginPath(),this.buildPath(o,this.shape,!1),this.pathUpdated()),t=o.getBoundingRect();}if(this._rect=t,this.hasStroke()&&this.path&&this.path.len()>0){var a=this._rectWithStroke||(this._rectWithStroke=t.clone());if(this.__dirty||i){a.copy(t);var s=e.strokeNoScale?this.getLineScale():1,l=e.lineWidth;if(!this.hasFill()){var u=this.strokeContainThreshold;l=Math.max(l,null==u?4:u);}s>1e-10&&(a.width+=l/s,a.height+=l/s,a.x-=l/s/2,a.y-=l/s/2);}return a;}return t;},n.prototype.contain=function(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect(),r=this.style;if(t=n[0],e=n[1],i.contain(t,e)){var o=this.path;if(this.hasStroke()){var a=r.lineWidth,s=r.strokeNoScale?this.getLineScale():1;if(s>1e-10&&(this.hasFill()||(a=Math.max(a,this.strokeContainThreshold)),wo(o,a/s,t,e)))return!0;}if(this.hasFill())return bo(o,t,e);}return!1;},n.prototype.dirtyShape=function(){this.__dirty|=n.SHAPE_CHANGED_BIT,this._rect&&(this._rect=null),this._decalEl&&this._decalEl.dirtyShape(),this.markRedraw();},n.prototype.dirty=function(){this.dirtyStyle(),this.dirtyShape();},n.prototype.animateShape=function(t){return this.animate("shape",t);},n.prototype.updateDuringAnimation=function(t){"style"===t?this.dirtyStyle():"shape"===t?this.dirtyShape():this.markRedraw();},n.prototype.attrKV=function(e,n){"shape"===e?this.setShape(n):t.prototype.attrKV.call(this,e,n);},n.prototype.setShape=function(t,e){var n=this.shape;return n||(n=this.shape={}),"string"==typeof t?n[t]=e:h(n,t),this.dirtyShape(),this;},n.prototype.shapeChanged=function(){return!!(this.__dirty&n.SHAPE_CHANGED_BIT);},n.prototype.createStyle=function(t){return q(ob,t);},n.prototype._innerSaveToNormal=function(e){t.prototype._innerSaveToNormal.call(this,e);var n=this._normalState;e.shape&&!n.shape&&(n.shape=h({},this.shape));},n.prototype._applyStateObj=function(e,n,i,r,o,a){t.prototype._applyStateObj.call(this,e,n,i,r,o,a);var s,l=!(n&&r);if(n&&n.shape?o?r?s=n.shape:(s=h({},i.shape),h(s,n.shape)):(s=h({},r?this.shape:i.shape),h(s,n.shape)):l&&(s=i.shape),s)if(o){this.shape=h({},this.shape);for(var u={},c=b(s),p=0;p<c.length;p++){var f=c[p];"object"==typeof s[f]?this.shape[f]=s[f]:u[f]=s[f];}this._transitionState(e,{shape:u},a);}else this.shape=s,this.dirtyShape();},n.prototype._mergeStates=function(e){for(var n,i=t.prototype._mergeStates.call(this,e),r=0;r<e.length;r++){var o=e[r];o.shape&&(n=n||{},this._mergeStyle(n,o.shape));}return n&&(i.shape=n),i;},n.prototype.getAnimationStyleProps=function(){return ab;},n.prototype.isZeroArea=function(){return!1;},n.extend=function(t){var i=function(n){function i(e){var i=n.call(this,e)||this;return t.init&&t.init.call(i,e),i;}return e(i,n),i.prototype.getDefaultStyle=function(){return s(t.style);},i.prototype.getDefaultShape=function(){return s(t.shape);},i;}(n);for(var r in t){"function"==typeof t[r]&&(i.prototype[r]=t[r]);}return i;},n.SHAPE_CHANGED_BIT=4,n.initDefaultProps=function(){var t=n.prototype;t.type="path",t.strokeContainThreshold=5,t.segmentIgnoreThreshold=0,t.subPixelOptimize=!1,t.autoBatch=!1,t.__dirty=g_.REDARAW_BIT|cx.STYLE_CHANGED_BIT|n.SHAPE_CHANGED_BIT;}(),n;}(cx),ub=c({strokeFirst:!0,font:n_,x:0,y:0,textAlign:"left",textBaseline:"top",miterLimit:2},ob),hb=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n.prototype.hasStroke=function(){var t=this.style,e=t.stroke;return null!=e&&"none"!==e&&t.lineWidth>0;},n.prototype.hasFill=function(){var t=this.style,e=t.fill;return null!=e&&"none"!==e;},n.prototype.createStyle=function(t){return q(ub,t);},n.prototype.setBoundingRect=function(t){this._rect=t;},n.prototype.getBoundingRect=function(){var t=this.style;if(!this._rect){var e=t.text;null!=e?e+="":e="";var n=Rn(e,t.font,t.textAlign,t.textBaseline);if(n.x+=t.x||0,n.y+=t.y||0,this.hasStroke()){var i=t.lineWidth;n.x-=i/2,n.y-=i/2,n.width+=i,n.height+=i;}this._rect=n;}return this._rect;},n.initDefaultProps=function(){var t=n.prototype;t.dirtyRectTolerance=10;}(),n;}(cx);hb.prototype.type="tspan";var cb=c({x:0,y:0},lx),pb={style:c({x:!0,y:!0,width:!0,height:!0,sx:!0,sy:!0,sWidth:!0,sHeight:!0},ux.style)},fb=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n.prototype.createStyle=function(t){return q(cb,t);},n.prototype._getSize=function(t){var e=this.style,n=e[t];if(null!=n)return n;var i=So(e.image)?e.image:this.__image;if(!i)return 0;var r="width"===t?"height":"width",o=e[r];return null==o?i[t]:i[t]/i[r]*o;},n.prototype.getWidth=function(){return this._getSize("width");},n.prototype.getHeight=function(){return this._getSize("height");},n.prototype.getAnimationStyleProps=function(){return pb;},n.prototype.getBoundingRect=function(){var t=this.style;return this._rect||(this._rect=new t_(t.x||0,t.y||0,this.getWidth(),this.getHeight())),this._rect;},n;}(cx);fb.prototype.type="image";var db=Math.round,gb=function(){function t(){this.x=0,this.y=0,this.width=0,this.height=0;}return t;}(),yb={},vb=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultShape=function(){return new gb();},n.prototype.buildPath=function(t,e){var n,i,r,o;if(this.subPixelOptimize){var a=Co(yb,e,this.style);n=a.x,i=a.y,r=a.width,o=a.height,a.r=e.r,e=a;}else n=e.x,i=e.y,r=e.width,o=e.height;e.r?Mo(t,e):t.rect(n,i,r,o);},n.prototype.isZeroArea=function(){return!this.shape.width||!this.shape.height;},n;}(lb);vb.prototype.type="rect";var mb={fill:"#000"},_b=2,xb={style:c({fill:!0,stroke:!0,fillOpacity:!0,strokeOpacity:!0,lineWidth:!0,fontSize:!0,lineHeight:!0,width:!0,height:!0,textShadowColor:!0,textShadowBlur:!0,textShadowOffsetX:!0,textShadowOffsetY:!0,backgroundColor:!0,padding:!0,borderColor:!0,borderWidth:!0,borderRadius:!0},ux.style)},bb=function(t){function n(e){var n=t.call(this)||this;return n.type="text",n._children=[],n._defaultStyle=mb,n.attr(e),n;}return e(n,t),n.prototype.childrenRef=function(){return this._children;},n.prototype.update=function(){this.styleChanged()&&this._updateSubTexts();for(var e=0;e<this._children.length;e++){var n=this._children[e];n.zlevel=this.zlevel,n.z=this.z,n.z2=this.z2,n.culling=this.culling,n.cursor=this.cursor,n.invisible=this.invisible;}var i=this.attachedTransform;if(i){i.updateTransform();var r=i.transform;r?(this.transform=this.transform||[],Ve(this.transform,r)):this.transform=null;}else t.prototype.update.call(this);},n.prototype.getComputedTransform=function(){return this.__hostTarget&&(this.__hostTarget.getComputedTransform(),this.__hostTarget.updateInnerText(!0)),this.attachedTransform?this.attachedTransform.getComputedTransform():t.prototype.getComputedTransform.call(this);},n.prototype._updateSubTexts=function(){this._childCursor=0,Ao(this.style),this.style.rich?this._updateRichTexts():this._updatePlainTexts(),this._children.length=this._childCursor,this.styleUpdated();},n.prototype.addSelfToZr=function(e){t.prototype.addSelfToZr.call(this,e);for(var n=0;n<this._children.length;n++){this._children[n].__zr=e;}},n.prototype.removeSelfFromZr=function(e){t.prototype.removeSelfFromZr.call(this,e);for(var n=0;n<this._children.length;n++){this._children[n].__zr=null;}},n.prototype.getBoundingRect=function(){if(this.styleChanged()&&this._updateSubTexts(),!this._rect){for(var t=new t_(0,0,0,0),e=this._children,n=[],i=null,r=0;r<e.length;r++){var o=e[r],a=o.getBoundingRect(),s=o.getLocalTransform(n);s?(t.copy(a),t.applyTransform(s),i=i||t.clone(),i.union(t)):(i=i||a.clone(),i.union(a));}this._rect=i||t;}return this._rect;},n.prototype.setDefaultTextStyle=function(t){this._defaultStyle=t||mb;},n.prototype.setTextContent=function(){throw new Error("Can't attach text on another text");},n.prototype._mergeStyle=function(t,e){if(!e)return t;var n=e.rich,i=t.rich||n&&{};return h(t,e),n&&i?(this._mergeRich(i,n),t.rich=i):i&&(t.rich=i),t;},n.prototype._mergeRich=function(t,e){for(var n=b(e),i=0;i<n.length;i++){var r=n[i];t[r]=t[r]||{},h(t[r],e[r]);}},n.prototype.getAnimationStyleProps=function(){return xb;},n.prototype._getOrCreateChild=function(t){var e=this._children[this._childCursor];return e&&e instanceof t||(e=new t()),this._children[this._childCursor++]=e,e.__zr=this.__zr,e.parent=this,e;},n.prototype._updatePlainTexts=function(){var t=this.style,e=t.font||n_,n=t.padding,i=Oo(t),r=Pr(i,t),o=Ro(t),a=!!t.backgroundColor,s=r.outerHeight,l=r.lines,u=r.lineHeight,h=this._defaultStyle,c=t.x||0,p=t.y||0,f=t.align||h.align||"left",d=t.verticalAlign||h.verticalAlign||"top",g=c,y=Bn(p,r.contentHeight,d);if(o||n){var v=r.width;n&&(v+=n[1]+n[3]);var m=En(c,v,f),_=Bn(p,s,d);o&&this._renderBackground(t,t,m,_,v,s);}y+=u/2,n&&(g=Po(c,f,n),"top"===d?y+=n[0]:"bottom"===d&&(y-=n[2]));for(var x=0,b=!1,w=Lo(("fill"in t)?t.fill:(b=!0,h.fill)),S=Do(("stroke"in t)?t.stroke:a||h.autoStroke&&!b?null:(x=_b,h.stroke)),M=t.textShadowBlur>0,T=null!=t.width&&("truncate"===t.overflow||"break"===t.overflow||"breakAll"===t.overflow),C=r.calculatedLineHeight,I=0;I<l.length;I++){var A=this._getOrCreateChild(hb),k=A.createStyle();A.useStyle(k),k.text=l[I],k.x=g,k.y=y,f&&(k.textAlign=f),k.textBaseline="middle",k.opacity=t.opacity,k.strokeFirst=!0,M&&(k.shadowBlur=t.textShadowBlur||0,k.shadowColor=t.textShadowColor||"transparent",k.shadowOffsetX=t.textShadowOffsetX||0,k.shadowOffsetY=t.textShadowOffsetY||0),S&&(k.stroke=S,k.lineWidth=t.lineWidth||x,k.lineDash=t.lineDash,k.lineDashOffset=t.lineDashOffset||0),w&&(k.fill=w),k.font=e,y+=u,T&&A.setBoundingRect(new t_(En(k.x,t.width,k.textAlign),Bn(k.y,C,k.textBaseline),t.width,C));
}},n.prototype._updateRichTexts=function(){var t=this.style,e=Oo(t),n=Or(e,t),i=n.width,r=n.outerWidth,o=n.outerHeight,a=t.padding,s=t.x||0,l=t.y||0,u=this._defaultStyle,h=t.align||u.align,c=t.verticalAlign||u.verticalAlign,p=En(s,r,h),f=Bn(l,o,c),d=p,g=f;a&&(d+=a[3],g+=a[0]);var y=d+i;Ro(t)&&this._renderBackground(t,t,p,f,r,o);for(var v=!!t.backgroundColor,m=0;m<n.lines.length;m++){for(var _=n.lines[m],x=_.tokens,b=x.length,w=_.lineHeight,S=_.width,M=0,T=d,C=y,I=b-1,A=void 0;b>M&&(A=x[M],!A.align||"left"===A.align);){this._placeToken(A,t,w,g,T,"left",v),S-=A.width,T+=A.width,M++;}for(;I>=0&&(A=x[I],"right"===A.align);){this._placeToken(A,t,w,g,C,"right",v),S-=A.width,C-=A.width,I--;}for(T+=(i-(T-d)-(y-C)-S)/2;I>=M;){A=x[M],this._placeToken(A,t,w,g,T+A.width/2,"center",v),T+=A.width,M++;}g+=w;}},n.prototype._placeToken=function(t,e,n,i,r,o,a){var s=e.rich[t.styleName]||{};s.text=t.text;var l=t.verticalAlign,u=i+n/2;"top"===l?u=i+t.height/2:"bottom"===l&&(u=i+n-t.height/2);var h=!t.isLineHolder&&Ro(s);h&&this._renderBackground(s,e,"right"===o?r-t.width:"center"===o?r-t.width/2:r,u-t.height/2,t.width,t.height);var c=!!s.backgroundColor,p=t.textPadding;p&&(r=Po(r,o,p),u-=t.height/2-p[0]-t.innerHeight/2);var f=this._getOrCreateChild(hb),d=f.createStyle();f.useStyle(d);var g=this._defaultStyle,y=!1,v=0,m=Do("fill"in s?s.fill:"fill"in e?e.fill:(y=!0,g.fill)),_=Do("stroke"in s?s.stroke:"stroke"in e?e.stroke:c||a||g.autoStroke&&!y?null:(v=_b,g.stroke)),x=s.textShadowBlur>0||e.textShadowBlur>0;d.text=t.text,d.x=r,d.y=u,x&&(d.shadowBlur=s.textShadowBlur||e.textShadowBlur||0,d.shadowColor=s.textShadowColor||e.textShadowColor||"transparent",d.shadowOffsetX=s.textShadowOffsetX||e.textShadowOffsetX||0,d.shadowOffsetY=s.textShadowOffsetY||e.textShadowOffsetY||0),d.textAlign=o,d.textBaseline="middle",d.font=t.font||n_,d.opacity=F(s.opacity,e.opacity,1),_&&(d.lineWidth=F(s.lineWidth,e.lineWidth,v),d.lineDash=N(s.lineDash,e.lineDash),d.lineDashOffset=e.lineDashOffset||0,d.stroke=_),m&&(d.fill=m);var b=t.contentWidth,w=t.contentHeight;f.setBoundingRect(new t_(En(d.x,b,d.textAlign),Bn(d.y,w,d.textBaseline),b,w));},n.prototype._renderBackground=function(t,e,n,i,r,o){var a,s,l=t.backgroundColor,u=t.borderWidth,h=t.borderColor,c=C(l),p=t.borderRadius,f=this;if(c||u&&h){a=this._getOrCreateChild(vb),a.useStyle(a.createStyle()),a.style.fill=null;var d=a.shape;d.x=n,d.y=i,d.width=r,d.height=o,d.r=p,a.dirtyShape();}if(c){var g=a.style;g.fill=l||null,g.fillOpacity=N(t.fillOpacity,1);}else if(l&&l.image){s=this._getOrCreateChild(fb),s.onload=function(){f.dirtyStyle();};var y=s.style;y.image=l.image,y.x=n,y.y=i,y.width=r,y.height=o;}if(u&&h){var g=a.style;g.lineWidth=u,g.stroke=h,g.strokeOpacity=N(t.strokeOpacity,1),g.lineDash=t.borderDash,g.lineDashOffset=t.borderDashOffset||0,a.strokeContainThreshold=0,a.hasFill()&&a.hasStroke()&&(g.strokeFirst=!0,g.lineWidth*=2);}var v=(a||s).style;v.shadowBlur=t.shadowBlur||0,v.shadowColor=t.shadowColor||"transparent",v.shadowOffsetX=t.shadowOffsetX||0,v.shadowOffsetY=t.shadowOffsetY||0,v.opacity=F(t.opacity,e.opacity,1);},n.makeFont=function(t){var e="";if(t.fontSize||t.fontFamily||t.fontWeight){var n="";n="string"!=typeof t.fontSize||-1===t.fontSize.indexOf("px")&&-1===t.fontSize.indexOf("rem")&&-1===t.fontSize.indexOf("em")?isNaN(+t.fontSize)?"12px":t.fontSize+"px":t.fontSize,e=[t.fontStyle,t.fontWeight,n,t.fontFamily||"sans-serif"].join(" ");}return e&&W(e)||t.textFont||t.font;},n;}(cx),wb={left:!0,right:1,center:1},Sb={top:1,bottom:1,middle:1},Mb=or(),Tb=1,Cb={},Ib=or(),Ab=0,kb=1,Db=2,Lb=["emphasis","blur","select"],Pb=["normal","emphasis","blur","select"],Ob=10,Rb=9,Eb="highlight",Bb="downplay",zb="select",Nb="unselect",Fb="toggleSelect",Vb=new Rm(100),Hb=["emphasis","blur","select"],Gb={itemStyle:"getItemStyle",lineStyle:"getLineStyle",areaStyle:"getAreaStyle"},Wb=$x.CMD,Ub=[[],[],[]],Yb=Math.sqrt,Xb=Math.atan2,jb=Math.sqrt,qb=Math.sin,Zb=Math.cos,Kb=Math.PI,$b=/([mlvhzcqtsa])([^mlvhzcqtsa]*)/gi,Jb=/-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g,Qb=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n.prototype.applyTransform=function(){},n;}(lb),tw=function(){function t(){this.cx=0,this.cy=0,this.r=0;}return t;}(),ew=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultShape=function(){return new tw();},n.prototype.buildPath=function(t,e,n){n&&t.moveTo(e.cx+e.r,e.cy),t.arc(e.cx,e.cy,e.r,0,2*Math.PI);},n;}(lb);ew.prototype.type="circle";var nw=function(){function t(){this.cx=0,this.cy=0,this.rx=0,this.ry=0;}return t;}(),iw=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultShape=function(){return new nw();},n.prototype.buildPath=function(t,e){var n=.5522848,i=e.cx,r=e.cy,o=e.rx,a=e.ry,s=o*n,l=a*n;t.moveTo(i-o,r),t.bezierCurveTo(i-o,r-l,i-s,r-a,i,r-a),t.bezierCurveTo(i+s,r-a,i+o,r-l,i+o,r),t.bezierCurveTo(i+o,r+l,i+s,r+a,i,r+a),t.bezierCurveTo(i-s,r+a,i-o,r+l,i-o,r),t.closePath();},n;}(lb);iw.prototype.type="ellipse";var rw=Math.PI,ow=2*rw,aw=Math.sin,sw=Math.cos,lw=Math.acos,uw=Math.atan2,hw=Math.abs,cw=Math.sqrt,pw=Math.max,fw=Math.min,dw=1e-4,gw=function(){function t(){this.cx=0,this.cy=0,this.r0=0,this.r=0,this.startAngle=0,this.endAngle=2*Math.PI,this.clockwise=!0,this.cornerRadius=0,this.innerCornerRadius=0;}return t;}(),yw=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultShape=function(){return new gw();},n.prototype.buildPath=function(t,e){Va(t,e);},n.prototype.isZeroArea=function(){return this.shape.startAngle===this.shape.endAngle||this.shape.r===this.shape.r0;},n;}(lb);yw.prototype.type="sector";var vw=function(){function t(){this.cx=0,this.cy=0,this.r=0,this.r0=0;}return t;}(),mw=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultShape=function(){return new vw();},n.prototype.buildPath=function(t,e){var n=e.cx,i=e.cy,r=2*Math.PI;t.moveTo(n+e.r,i),t.arc(n,i,e.r,0,r,!1),t.moveTo(n+e.r0,i),t.arc(n,i,e.r0,0,r,!0);},n;}(lb);mw.prototype.type="ring";var _w=function(){function t(){this.points=null,this.smooth=0,this.smoothConstraint=null;}return t;}(),xw=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultShape=function(){return new _w();},n.prototype.buildPath=function(t,e){Ua(t,e,!0);},n;}(lb);xw.prototype.type="polygon";var bw=function(){function t(){this.points=null,this.percent=1,this.smooth=0,this.smoothConstraint=null;}return t;}(),ww=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultStyle=function(){return{stroke:"#000",fill:null};},n.prototype.getDefaultShape=function(){return new bw();},n.prototype.buildPath=function(t,e){Ua(t,e,!1);},n;}(lb);ww.prototype.type="polyline";var Sw={},Mw=function(){function t(){this.x1=0,this.y1=0,this.x2=0,this.y2=0,this.percent=1;}return t;}(),Tw=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultStyle=function(){return{stroke:"#000",fill:null};},n.prototype.getDefaultShape=function(){return new Mw();},n.prototype.buildPath=function(t,e){var n,i,r,o;if(this.subPixelOptimize){var a=To(Sw,e,this.style);n=a.x1,i=a.y1,r=a.x2,o=a.y2;}else n=e.x1,i=e.y1,r=e.x2,o=e.y2;var s=e.percent;0!==s&&(t.moveTo(n,i),1>s&&(r=n*(1-s)+r*s,o=i*(1-s)+o*s),t.lineTo(r,o));},n.prototype.pointAt=function(t){var e=this.shape;return[e.x1*(1-t)+e.x2*t,e.y1*(1-t)+e.y2*t];},n;}(lb);Tw.prototype.type="line";var Cw=[],Iw=function(){function t(){this.x1=0,this.y1=0,this.x2=0,this.y2=0,this.cpx1=0,this.cpy1=0,this.percent=1;}return t;}(),Aw=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultStyle=function(){return{stroke:"#000",fill:null};},n.prototype.getDefaultShape=function(){return new Iw();},n.prototype.buildPath=function(t,e){var n=e.x1,i=e.y1,r=e.x2,o=e.y2,a=e.cpx1,s=e.cpy1,l=e.cpx2,u=e.cpy2,h=e.percent;0!==h&&(t.moveTo(n,i),null==l||null==u?(1>h&&(Jr(n,a,r,h,Cw),a=Cw[1],r=Cw[2],Jr(i,s,o,h,Cw),s=Cw[1],o=Cw[2]),t.quadraticCurveTo(a,s,r,o)):(1>h&&(Yr(n,a,l,r,h,Cw),a=Cw[1],l=Cw[2],r=Cw[3],Yr(i,s,u,o,h,Cw),s=Cw[1],u=Cw[2],o=Cw[3]),t.bezierCurveTo(a,s,l,u,r,o)));},n.prototype.pointAt=function(t){return Ya(this.shape,t,!1);},n.prototype.tangentAt=function(t){var e=Ya(this.shape,t,!0);return he(e,e);},n;}(lb);Aw.prototype.type="bezier-curve";var kw=function(){function t(){this.cx=0,this.cy=0,this.r=0,this.startAngle=0,this.endAngle=2*Math.PI,this.clockwise=!0;}return t;}(),Dw=function(t){function n(e){return t.call(this,e)||this;}return e(n,t),n.prototype.getDefaultStyle=function(){return{stroke:"#000",fill:null};},n.prototype.getDefaultShape=function(){return new kw();},n.prototype.buildPath=function(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r,0),o=e.startAngle,a=e.endAngle,s=e.clockwise,l=Math.cos(o),u=Math.sin(o);t.moveTo(l*r+n,u*r+i),t.arc(n,i,r,o,a,!s);},n;}(lb);Dw.prototype.type="arc";var Lw=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type="compound",e;}return e(n,t),n.prototype._updatePathDirty=function(){for(var t=this.shape.paths,e=this.shapeChanged(),n=0;n<t.length;n++){e=e||t[n].shapeChanged();}e&&this.dirtyShape();},n.prototype.beforeBrush=function(){this._updatePathDirty();for(var t=this.shape.paths||[],e=this.getGlobalScale(),n=0;n<t.length;n++){t[n].path||t[n].createPathProxy(),t[n].path.setScale(e[0],e[1],t[n].segmentIgnoreThreshold);}},n.prototype.buildPath=function(t,e){for(var n=e.paths||[],i=0;i<n.length;i++){n[i].buildPath(t,n[i].shape,!0);}},n.prototype.afterBrush=function(){for(var t=this.shape.paths||[],e=0;e<t.length;e++){t[e].pathUpdated();}},n.prototype.getBoundingRect=function(){return this._updatePathDirty.call(this),lb.prototype.getBoundingRect.call(this);},n;}(lb),Pw=function(){function t(t){this.colorStops=t||[];}return t.prototype.addColorStop=function(t,e){this.colorStops.push({offset:t,color:e});},t;}(),Ow=function(t){function n(e,n,i,r,o,a){var s=t.call(this,o)||this;return s.x=null==e?0:e,s.y=null==n?0:n,s.x2=null==i?1:i,s.y2=null==r?0:r,s.type="linear",s.global=a||!1,s;}return e(n,t),n;}(Pw),Rw=function(t){function n(e,n,i,r,o){var a=t.call(this,r)||this;return a.x=null==e?.5:e,a.y=null==n?.5:n,a.r=null==i?.5:i,a.type="radial",a.global=o||!1,a;}return e(n,t),n;}(Pw),Ew=[0,0],Bw=[0,0],zw=new Ym(),Nw=new Ym(),Fw=function(){function t(t,e){this._corners=[],this._axes=[],this._origin=[0,0];for(var n=0;4>n;n++){this._corners[n]=new Ym();}for(var n=0;2>n;n++){this._axes[n]=new Ym();}t&&this.fromBoundingRect(t,e);}return t.prototype.fromBoundingRect=function(t,e){var n=this._corners,i=this._axes,r=t.x,o=t.y,a=r+t.width,s=o+t.height;if(n[0].set(r,o),n[1].set(a,o),n[2].set(a,s),n[3].set(r,s),e)for(var l=0;4>l;l++){n[l].transform(e);}Ym.sub(i[0],n[1],n[0]),Ym.sub(i[1],n[3],n[0]),i[0].normalize(),i[1].normalize();for(var l=0;2>l;l++){this._origin[l]=i[l].dot(n[0]);}},t.prototype.intersect=function(t,e){var n=!0,i=!e;return zw.set(1/0,1/0),Nw.set(0,0),!this._intersectCheckOneSide(this,t,zw,Nw,i,1)&&(n=!1,i)?n:!this._intersectCheckOneSide(t,this,zw,Nw,i,-1)&&(n=!1,i)?n:(i||Ym.copy(e,n?zw:Nw),n);},t.prototype._intersectCheckOneSide=function(t,e,n,i,r,o){for(var a=!0,s=0;2>s;s++){var l=this._axes[s];if(this._getProjMinMaxOnAxis(s,t._corners,Ew),this._getProjMinMaxOnAxis(s,e._corners,Bw),Ew[1]<Bw[0]||Ew[0]>Bw[1]){if(a=!1,r)return a;var u=Math.abs(Bw[0]-Ew[1]),h=Math.abs(Ew[0]-Bw[1]);Math.min(u,h)>i.len()&&(h>u?Ym.scale(i,l,-u*o):Ym.scale(i,l,h*o));}else if(n){var u=Math.abs(Bw[0]-Ew[1]),h=Math.abs(Ew[0]-Bw[1]);Math.min(u,h)<n.len()&&(h>u?Ym.scale(n,l,u*o):Ym.scale(n,l,-h*o));}}return a;},t.prototype._getProjMinMaxOnAxis=function(t,e,n){for(var i=this._axes[t],r=this._origin,o=e[0].dot(i)+r[t],a=o,s=o,l=1;l<e.length;l++){var u=e[l].dot(i)+r[t];a=Math.min(u,a),s=Math.max(u,s);}n[0]=a,n[1]=s;},t;}(),Vw=[],Hw=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.notClear=!0,e.incremental=!0,e._displayables=[],e._temporaryDisplayables=[],e._cursor=0,e;}return e(n,t),n.prototype.traverse=function(t,e){t.call(e,this);},n.prototype.useStyle=function(){this.style={};},n.prototype.getCursor=function(){return this._cursor;},n.prototype.innerAfterBrush=function(){this._cursor=this._displayables.length;},n.prototype.clearDisplaybles=function(){this._displayables=[],this._temporaryDisplayables=[],this._cursor=0,this.markRedraw(),this.notClear=!1;},n.prototype.clearTemporalDisplayables=function(){this._temporaryDisplayables=[];},n.prototype.addDisplayable=function(t,e){e?this._temporaryDisplayables.push(t):this._displayables.push(t),this.markRedraw();},n.prototype.addDisplayables=function(t,e){e=e||!1;for(var n=0;n<t.length;n++){this.addDisplayable(t[n],e);}},n.prototype.getDisplayables=function(){return this._displayables;},n.prototype.getTemporalDisplayables=function(){return this._temporaryDisplayables;},n.prototype.eachPendingDisplayable=function(t){for(var e=this._cursor;e<this._displayables.length;e++){t&&t(this._displayables[e]);}for(var e=0;e<this._temporaryDisplayables.length;e++){t&&t(this._temporaryDisplayables[e]);}},n.prototype.update=function(){this.updateTransform();for(var t=this._cursor;t<this._displayables.length;t++){var e=this._displayables[t];e.parent=this,e.update(),e.parent=null;}for(var t=0;t<this._temporaryDisplayables.length;t++){var e=this._temporaryDisplayables[t];e.parent=this,e.update(),e.parent=null;}},n.prototype.getBoundingRect=function(){if(!this._rect){for(var t=new t_(1/0,1/0,-1/0,-1/0),e=0;e<this._displayables.length;e++){var n=this._displayables[e],i=n.getBoundingRect().clone();n.needLocalTransform()&&i.applyTransform(n.getLocalTransform(Vw)),t.union(i);}this._rect=t;}return this._rect;},n.prototype.contain=function(t,e){var n=this.transformCoordToLocal(t,e),i=this.getBoundingRect();if(i.contain(n[0],n[1]))for(var r=0;r<this._displayables.length;r++){var o=this._displayables[r];if(o.contain(t,e))return!0;}return!1;},n;}(cx),Gw=Math.max,Ww=Math.min,Uw={},Yw=Ba,Xw=za,jw=Io;qa("circle",ew),qa("ellipse",iw),qa("sector",yw),qa("ring",mw),qa("polygon",xw),qa("polyline",ww),qa("rect",vb),qa("line",Tw),qa("bezierCurve",Aw),qa("arc",Dw);var qw=(Object.freeze||Object)({extendShape:Xa,extendPath:ja,registerShape:qa,getShapeClass:Za,makePath:Ka,makeImage:$a,mergePath:Xw,resizePath:Qa,subPixelOptimizeLine:ts,subPixelOptimizeRect:es,subPixelOptimize:jw,updateProps:is,initProps:rs,removeElement:os,removeElementWithFadeOut:ss,isElementRemoved:ls,getTransform:us,applyTransform:hs,transformDirection:cs,groupTransition:ds,clipPointsByRect:gs,clipRectByRect:ys,createIcon:vs,linePolygonIntersect:ms,lineLineIntersect:_s,setTooltipConfig:ws,Group:O_,Image:fb,Text:bb,Circle:ew,Ellipse:iw,Sector:yw,Ring:mw,Polygon:xw,Polyline:ww,Rect:vb,Line:Tw,BezierCurve:Aw,Arc:Dw,IncrementalDisplayable:Hw,CompoundPath:Lw,LinearGradient:Ow,RadialGradient:Rw,BoundingRect:t_,OrientedBoundingRect:Fw,Point:Ym,Path:lb}),Zw={},Kw=["fontStyle","fontWeight","fontSize","fontFamily","textShadowColor","textShadowBlur","textShadowOffsetX","textShadowOffsetY"],$w=["align","lineHeight","width","height","tag","verticalAlign"],Jw=["padding","borderWidth","borderRadius","borderDashOffset","backgroundColor","borderColor","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY"],Qw=or(),tS=["textStyle","color"],eS=new bb(),nS=function(){function t(){}return t.prototype.getTextColor=function(t){var e=this.ecModel;return this.getShallow("color")||(!t&&e?e.get(tS):null);},t.prototype.getFont=function(){return Ps({fontStyle:this.getShallow("fontStyle"),fontWeight:this.getShallow("fontWeight"),fontSize:this.getShallow("fontSize"),fontFamily:this.getShallow("fontFamily")},this.ecModel);},t.prototype.getTextRect=function(t){return eS.useStyle({text:t,fontStyle:this.getShallow("fontStyle"),fontWeight:this.getShallow("fontWeight"),fontSize:this.getShallow("fontSize"),fontFamily:this.getShallow("fontFamily"),verticalAlign:this.getShallow("verticalAlign")||this.getShallow("baseline"),padding:this.getShallow("padding"),lineHeight:this.getShallow("lineHeight"),rich:this.getShallow("rich")}),eS.update(),eS.getBoundingRect();},t;}(),iS=[["lineWidth","width"],["stroke","color"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"],["lineDash","type"],["lineDashOffset","dashOffset"],["lineCap","cap"],["lineJoin","join"],["miterLimit"]],rS=Sr(iS),oS=function(){function t(){}return t.prototype.getLineStyle=function(t){return rS(this,t);},t;}(),aS=[["fill","color"],["stroke","borderColor"],["lineWidth","borderWidth"],["opacity"],["shadowBlur"],["shadowOffsetX"],["shadowOffsetY"],["shadowColor"],["lineDash","borderType"],["lineDashOffset","borderDashOffset"],["lineCap","borderCap"],["lineJoin","borderJoin"],["miterLimit","borderMiterLimit"]],sS=Sr(aS),lS=function(){function t(){}return t.prototype.getItemStyle=function(t,e){return sS(this,t,e);},t;}(),uS=function(){function t(t,e,n){this.parentModel=e,this.ecModel=n,this.option=t;}return t.prototype.init=function(){for(var t=[],e=3;e<arguments.length;e++){t[e-3]=arguments[e];}},t.prototype.mergeOption=function(t){l(this.option,t,!0);},t.prototype.get=function(t,e){return null==t?this.option:this._doGet(this.parsePath(t),!e&&this.parentModel);},t.prototype.getShallow=function(t,e){var n=this.option,i=null==n?n:n[t];if(null==i&&!e){var r=this.parentModel;r&&(i=r.getShallow(t));}return i;},t.prototype.getModel=function(e,n){var i=null!=e,r=i?this.parsePath(e):null,o=i?this._doGet(r):this.option;return n=n||this.parentModel&&this.parentModel.getModel(this.resolveParentPath(r)),new t(o,n,this.ecModel);},t.prototype.isEmpty=function(){return null==this.option;},t.prototype.restoreData=function(){},t.prototype.clone=function(){var t=this.constructor;return new t(s(this.option));},t.prototype.parsePath=function(t){return"string"==typeof t?t.split("."):t;},t.prototype.resolveParentPath=function(t){return t;},t.prototype.isAnimationEnabled=function(){if(!Rv.node&&this.option){if(null!=this.option.animation)return!!this.option.animation;if(this.parentModel)return this.parentModel.isAnimationEnabled();}},t.prototype._doGet=function(t,e){var n=this.option;if(!t)return n;for(var i=0;i<t.length&&(!t[i]||(n=n&&"object"==typeof n?n[t[i]]:null,null!=n));i++){;}return null==n&&e&&(n=e._doGet(this.resolveParentPath(t),e.parentModel)),n;},t;}();yr(uS),_r(uS),d(uS,oS),d(uS,lS),d(uS,tx),d(uS,nS);var hS=Math.round(10*Math.random()),cS={time:{month:["January","February","March","April","May","June","July","August","September","October","November","December"],monthAbbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayOfWeek:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayOfWeekAbbr:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},legend:{selector:{all:"All",inverse:"Inv"}},toolbox:{brush:{title:{rect:"Box Select",polygon:"Lasso Select",lineX:"Horizontally Select",lineY:"Vertically Select",keep:"Keep Selections",clear:"Clear Selections"}},dataView:{title:"Data View",lang:["Data View","Close","Refresh"]},dataZoom:{title:{zoom:"Zoom",back:"Zoom Reset"}},magicType:{title:{line:"Switch to Line Chart",bar:"Switch to Bar Chart",stack:"Stack",tiled:"Tile"}},restore:{title:"Restore"},saveAsImage:{title:"Save as Image",lang:["Right Click to Save Image"]}},series:{typeNames:{pie:"Pie chart",bar:"Bar chart",line:"Line chart",scatter:"Scatter plot",effectScatter:"Ripple scatter plot",radar:"Radar chart",tree:"Tree",treemap:"Treemap",boxplot:"Boxplot",candlestick:"Candlestick",k:"K line chart",heatmap:"Heat map",map:"Map",parallel:"Parallel coordinate map",lines:"Line graph",graph:"Relationship graph",sankey:"Sankey diagram",funnel:"Funnel chart",gauge:"Guage",pictorialBar:"Pictorial bar",themeRiver:"Theme River Map",sunburst:"Sunburst"}},aria:{general:{withTitle:'This is a chart about "{title}"',withoutTitle:"This is a chart"},series:{single:{prefix:"",withName:" with type {seriesType} named {seriesName}.",withoutName:" with type {seriesType}."},multiple:{prefix:". It consists of {seriesCount} series count.",withName:" The {seriesId} series is a {seriesType} representing {seriesName}.",withoutName:" The {seriesId} series is a {seriesType}.",separator:{middle:"",end:""}}},data:{allData:"The data is as follows: ",partialData:"The first {displayCnt} items are: ",withName:"the data for {name} is {value}",withoutName:"{value}",separator:{middle:", ",end:". "}}}},pS={time:{month:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],monthAbbr:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],dayOfWeek:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],dayOfWeekAbbr:["日","一","二","三","四","五","六"]},legend:{selector:{all:"全选",inverse:"反选"}},toolbox:{brush:{title:{rect:"矩形选择",polygon:"圈选",lineX:"横向选择",lineY:"纵向选择",keep:"保持选择",clear:"清除选择"}},dataView:{title:"数据视图",lang:["数据视图","关闭","刷新"]},dataZoom:{title:{zoom:"区域缩放",back:"区域缩放还原"}},magicType:{title:{line:"切换为折线图",bar:"切换为柱状图",stack:"切换为堆叠",tiled:"切换为平铺"}},restore:{title:"还原"},saveAsImage:{title:"保存为图片",lang:["右键另存为图片"]}},series:{typeNames:{pie:"饼图",bar:"柱状图",line:"折线图",scatter:"散点图",effectScatter:"涟漪散点图",radar:"雷达图",tree:"树图",treemap:"矩形树图",boxplot:"箱型图",candlestick:"K线图",k:"K线图",heatmap:"热力图",map:"地图",parallel:"平行坐标图",lines:"线图",graph:"关系图",sankey:"桑基图",funnel:"漏斗图",gauge:"仪表盘图",pictorialBar:"象形柱图",themeRiver:"主题河流图",sunburst:"旭日图"}},aria:{general:{withTitle:"这是一个关于“{title}”的图表。",withoutTitle:"这是一个图表，"},series:{single:{prefix:"",withName:"图表类型是{seriesType}，表示{seriesName}。",withoutName:"图表类型是{seriesType}。"},multiple:{prefix:"它由{seriesCount}个图表系列组成。",withName:"第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",withoutName:"第{seriesId}个系列是一个{seriesType}，",separator:{middle:"；",end:"。"}}},data:{allData:"其数据是——",partialData:"其中，前{displayCnt}项是——",withName:"{name}的数据是{value}",withoutName:"{value}",separator:{middle:"，",end:""}}}},fS="ZH",dS="EN",gS=dS,yS={},vS={},mS=Rv.domSupported?function(){var t=(document.documentElement.lang||navigator.language||navigator.browserLanguage).toUpperCase();return t.indexOf(fS)>-1?fS:gS;}():gS;Fs(dS,cS),Fs(fS,pS);var _S=1e3,xS=60*_S,bS=60*xS,wS=24*bS,SS=365*wS,MS={year:"{yyyy}",month:"{MMM}",day:"{d}",hour:"{HH}:{mm}",minute:"{HH}:{mm}",second:"{HH}:{mm}:{ss}",millisecond:"{hh}:{mm}:{ss} {SSS}",none:"{yyyy}-{MM}-{dd} {hh}:{mm}:{ss} {SSS}"},TS="{yyyy}-{MM}-{dd}",CS={year:"{yyyy}",month:"{yyyy}-{MM}",day:TS,hour:TS+" "+MS.hour,minute:TS+" "+MS.minute,second:TS+" "+MS.second,millisecond:MS.none},IS=["year","month","day","hour","minute","second","millisecond"],AS=["year","half-year","quarter","month","week","half-week","day","half-day","quarter-day","hour","minute","second","millisecond"],kS=H,DS=/([&<>"'])/g,LS={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},PS=["a","b","c","d","e","f","g"],OS=function OS(t,e){return"{"+t+(null==e?"":e)+"}";},RS=y,ES=["left","right","top","bottom","width","height"],BS=[["width","left","right"],["height","top","bottom"]],zS=wl,NS=(S(wl,"vertical"),S(wl,"horizontal"),or()),FS=function(t){function n(e,n,i){var r=t.call(this,e,n,i)||this;return r.uid=Es("ec_cpt_model"),r;}return e(n,t),n.prototype.init=function(t,e,n){this.mergeDefaultAndTheme(t,n);},n.prototype.mergeDefaultAndTheme=function(t,e){var n=Ml(this),i=n?Cl(t):{},r=e.getTheme();l(t,r.get(this.mainType)),l(t,this.getDefaultOption()),n&&Tl(t,i,n);},n.prototype.mergeOption=function(t){l(this.option,t,!0);var e=Ml(this);e&&Tl(this.option,t,e);},n.prototype.optionUpdated=function(){},n.prototype.getDefaultOption=function(){var t=this.constructor;if(!gr(t))return t.defaultOption;var e=NS(this);if(!e.defaultOption){for(var n=[],i=t;i;){var r=i.prototype.defaultOption;r&&n.push(r),i=i.superClass;}for(var o={},a=n.length-1;a>=0;a--){o=l(o,n[a],!0);}e.defaultOption=o;}return e.defaultOption;},n.prototype.getReferringComponents=function(t,e){var n=t+"Index",i=t+"Id";return lr(this.ecModel,t,{index:this.get(n,!0),id:this.get(i,!0)},e);},n.prototype.getBoxLayoutParams=function(){var t=this;return{left:t.get("left"),top:t.get("top"),right:t.get("right"),bottom:t.get("bottom"),width:t.get("width"),height:t.get("height")};},n.protoInitialize=function(){var t=n.prototype;t.type="component",t.id="",t.name="",t.mainType="",t.subType="",t.componentIndex=0;}(),n;}(uS);mr(FS,uS),wr(FS),Bs(FS),zs(FS,Al);var VS="";"undefined"!=typeof navigator&&(VS=navigator.platform||"");var HS,GS,WS="rgba(0, 0, 0, 0.2)",US={darkMode:"auto",color:["#5470c6","#91cc75","#fac858","#ee6666","#73c0de","#3ba272","#fc8452","#9a60b4","#ea7ccc"],gradientColor:["#f6efa6","#d88273","#bf444c"],aria:{decal:{decals:[{color:WS,dashArrayX:[1,0],dashArrayY:[2,5],symbolSize:1,rotation:Math.PI/6},{color:WS,symbol:"circle",dashArrayX:[[8,8],[0,8,8,0]],dashArrayY:[6,0],symbolSize:.8},{color:WS,dashArrayX:[1,0],dashArrayY:[4,3],rotation:-Math.PI/4},{color:WS,dashArrayX:[[6,6],[0,6,6,0]],dashArrayY:[6,0]},{color:WS,dashArrayX:[[1,0],[1,6]],dashArrayY:[1,0,6,0],rotation:Math.PI/4},{color:WS,symbol:"triangle",dashArrayX:[[9,9],[0,9,9,0]],dashArrayY:[7,2],symbolSize:.75}]}},textStyle:{fontFamily:VS.match(/^Win/)?"Microsoft YaHei":"sans-serif",fontSize:12,fontStyle:"normal",fontWeight:"normal"},blendMode:null,stateAnimation:{duration:300,easing:"cubicOut"},animation:"auto",animationDuration:1e3,animationDurationUpdate:500,animationEasing:"cubicInOut",animationEasingUpdate:"cubicInOut",animationThreshold:2e3,progressiveThreshold:3e3,progressive:400,hoverLayerThreshold:3e3,useUTC:!1},YS=X(["tooltip","label","itemName","itemId","seriesName"]),XS="original",jS="arrayRows",qS="objectRows",ZS="keyedColumns",KS="typedArray",$S="unknown",JS="column",QS="row",tM={Must:1,Might:2,Not:3},eM=or(),nM=X(),iM=or(),rM=(or(),function(){function t(){}return t.prototype.getColorFromPalette=function(t,e,n){var i=Vi(this.get("color",!0)),r=this.get("colorLayer",!0);return Nl(this,iM,i,r,t,e,n);},t.prototype.clearColorPalette=function(){Fl(this,iM);},t;}()),oM="\x00_ec_inner",aM=1,sM=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n.prototype.init=function(t,e,n,i,r,o){i=i||{},this.option=null,this._theme=new uS(i),this._locale=new uS(r),this._optionManager=o;},n.prototype.setOption=function(t,e,n){var i=Ul(e);this._optionManager.setOption(t,n,i),this._resetOption(null,i);},n.prototype.resetOption=function(t,e){return this._resetOption(t,Ul(e));},n.prototype._resetOption=function(t,e){var n=!1,i=this._optionManager;if(!t||"recreate"===t){var r=i.mountOption("recreate"===t);this.option&&"recreate"!==t?(this.restoreData(),this._mergeOption(r,e)):GS(this,r),n=!0;}if(("timeline"===t||"media"===t)&&this.restoreData(),!t||"recreate"===t||"timeline"===t){var o=i.getTimelineOption(this);o&&(n=!0,this._mergeOption(o,e));}if(!t||"recreate"===t||"media"===t){var a=i.getMediaOption(this);a.length&&y(a,function(t){n=!0,this._mergeOption(t,e);},this);}return n;},n.prototype.mergeOption=function(t){this._mergeOption(t,null);},n.prototype._mergeOption=function(t,e){function n(e){var n=Bl(this,e,Vi(t[e])),a=r.get(e),s=a?c&&c.get(e)?"replaceMerge":"normalMerge":"replaceAll",l=Ui(a,n,s);nr(l,e,FS),i[e]=null,r.set(e,null),o.set(e,0);var u=[],p=[],f=0;y(l,function(t,n){var i=t.existing,r=t.newOption;if(r){var o="series"===e,a=FS.getClass(e,t.keyInfo.subType,!o);if(!a)return;if(i&&i.constructor===a)i.name=t.keyInfo.name,i.mergeOption(r,this),i.optionUpdated(r,!1);else{var s=h({componentIndex:n},t.keyInfo);i=new a(r,this,this,s),h(i,s),t.brandNew&&(i.__requireNewView=!0),i.init(r,this,this),i.optionUpdated(null,!0);}}else i&&(i.mergeOption({},this),i.optionUpdated({},!1));i?(u.push(i.option),p.push(i),f++):(u.push(void 0),p.push(void 0));},this),i[e]=u,r.set(e,p),o.set(e,f),"series"===e&&HS(this);}var i=this.option,r=this._componentsMap,o=this._componentsCount,a=[],u=X(),c=e&&e.replaceMergeMainTypeMap;kl(this),y(t,function(t,e){null!=t&&(FS.hasClass(e)?e&&(a.push(e),u.set(e,!0)):i[e]=null==i[e]?s(t):l(i[e],t,!0));}),c&&c.each(function(t,e){FS.hasClass(e)&&!u.get(e)&&(a.push(e),u.set(e,!0));}),FS.topologicalTravel(a,FS.getAllClassMainTypes(),n,this),this._seriesIndices||HS(this);},n.prototype.getOption=function(){var t=s(this.option);return y(t,function(e,n){if(FS.hasClass(n)){for(var i=Vi(e),r=i.length,o=!1,a=r-1;a>=0;a--){i[a]&&!er(i[a])?o=!0:(i[a]=null,!o&&r--);}i.length=r,t[n]=i;}}),delete t[oM],t;},n.prototype.getTheme=function(){return this._theme;},n.prototype.getLocaleModel=function(){return this._locale;},n.prototype.getLocale=function(t){var e=this.getLocaleModel();return e.get(t);},n.prototype.setUpdatePayload=function(t){this._payload=t;},n.prototype.getUpdatePayload=function(){return this._payload;},n.prototype.getComponent=function(t,e){var n=this._componentsMap.get(t);if(n){var i=n[e||0];if(i)return i;if(null==e)for(var r=0;r<n.length;r++){if(n[r])return n[r];}}},n.prototype.queryComponents=function(t){var e=t.mainType;if(!e)return[];var n=t.index,i=t.id,r=t.name,o=this._componentsMap.get(e);if(!o||!o.length)return[];var a;return null!=n?(a=[],y(Vi(n),function(t){o[t]&&a.push(o[t]);})):a=null!=i?Gl("id",i,o):null!=r?Gl("name",r,o):_(o,function(t){return!!t;}),Wl(a,t);},n.prototype.findComponents=function(t){function e(t){var e=r+"Index",n=r+"Id",i=r+"Name";return!t||null==t[e]&&null==t[n]&&null==t[i]?null:{mainType:r,index:t[e],id:t[n],name:t[i]};}function n(e){return t.filter?_(e,t.filter):e;}var i=t.query,r=t.mainType,o=e(i),a=o?this.queryComponents(o):_(this._componentsMap.get(r),function(t){return!!t;});return n(Wl(a,t));},n.prototype.eachComponent=function(t,e,n){var i=this._componentsMap;if(T(t)){var r=e,o=t;i.each(function(t,e){for(var n=0;t&&n<t.length;n++){var i=t[n];i&&o.call(r,e,i,i.componentIndex);}});}else for(var a=C(t)?i.get(t):k(t)?this.findComponents(t):null,s=0;a&&s<a.length;s++){var l=a[s];l&&e.call(n,l,l.componentIndex);}},n.prototype.getSeriesByName=function(t){var e=Qi(t,null);return _(this._componentsMap.get("series"),function(t){return!!t&&null!=e&&t.name===e;});},n.prototype.getSeriesByIndex=function(t){return this._componentsMap.get("series")[t];},n.prototype.getSeriesByType=function(t){return _(this._componentsMap.get("series"),function(e){return!!e&&e.subType===t;});},n.prototype.getSeries=function(){return _(this._componentsMap.get("series").slice(),function(t){return!!t;});},n.prototype.getSeriesCount=function(){return this._componentsCount.get("series");},n.prototype.eachSeries=function(t,e){y(this._seriesIndices,function(n){var i=this._componentsMap.get("series")[n];t.call(e,i,n);},this);},n.prototype.eachRawSeries=function(t,e){y(this._componentsMap.get("series"),function(n){n&&t.call(e,n,n.componentIndex);});},n.prototype.eachSeriesByType=function(t,e,n){y(this._seriesIndices,function(i){var r=this._componentsMap.get("series")[i];r.subType===t&&e.call(n,r,i);},this);},n.prototype.eachRawSeriesByType=function(t,e,n){return y(this.getSeriesByType(t),e,n);},n.prototype.isSeriesFiltered=function(t){return null==this._seriesIndicesMap.get(t.componentIndex);},n.prototype.getCurrentSeriesIndices=function(){return(this._seriesIndices||[]).slice();},n.prototype.filterSeries=function(t,e){var n=[];y(this._seriesIndices,function(i){var r=this._componentsMap.get("series")[i];t.call(e,r,i)&&n.push(i);},this),this._seriesIndices=n,this._seriesIndicesMap=X(n);},n.prototype.restoreData=function(t){HS(this);var e=this._componentsMap,n=[];e.each(function(t,e){FS.hasClass(e)&&n.push(e);}),FS.topologicalTravel(n,FS.getAllClassMainTypes(),function(n){y(e.get(n),function(e){!e||"series"===n&&Vl(e,t)||e.restoreData();});});},n.internalField=function(){HS=function HS(t){var e=t._seriesIndices=[];y(t._componentsMap.get("series"),function(t){t&&e.push(t.componentIndex);}),t._seriesIndicesMap=X(e);},GS=function GS(t,e){t.option={},t.option[oM]=aM,t._componentsMap=X({series:[]}),t._componentsCount=X();var n=e.aria;k(n)&&null==n.enabled&&(n.enabled=!0),Hl(e,t._theme.option),l(e,US,!1),t._mergeOption(e,null);};}(),n;}(uS);d(sM,rM);var lM,uM,hM,cM,pM,fM=["getDom","getZr","getWidth","getHeight","getDevicePixelRatio","dispatchAction","isDisposed","on","off","getDataURL","getConnectedDataURL","getOption","getId","updateLabelLayout"],dM=function(){function t(t){y(fM,function(e){this[e]=qv(t[e],t);},this);}return t;}(),gM={},yM=function(){function t(){this._coordinateSystems=[];}return t.prototype.create=function(t,e){var n=[];
y(gM,function(i){var r=i.create(t,e);n=n.concat(r||[]);}),this._coordinateSystems=n;},t.prototype.update=function(t,e){y(this._coordinateSystems,function(n){n.update&&n.update(t,e);});},t.prototype.getCoordinateSystems=function(){return this._coordinateSystems.slice();},t.register=function(t,e){gM[t]=e;},t.get=function(t){return gM[t];},t;}(),vM=/^(min|max)?(.+)$/,mM=function(){function t(t){this._timelineOptions=[],this._mediaList=[],this._currentMediaIndices=[],this._api=t;}return t.prototype.setOption=function(t,e){t&&(y(Vi(t.series),function(t){t&&t.data&&L(t.data)&&U(t.data);}),y(Vi(t.dataset),function(t){t&&t.source&&L(t.source)&&U(t.source);})),t=s(t);var n=this._optionBackup,i=Yl(t,e,!n);this._newBaseOption=i.baseOption,n?(i.timelineOptions.length&&(n.timelineOptions=i.timelineOptions),i.mediaList.length&&(n.mediaList=i.mediaList),i.mediaDefault&&(n.mediaDefault=i.mediaDefault)):this._optionBackup=i;},t.prototype.mountOption=function(t){var e=this._optionBackup;return this._timelineOptions=e.timelineOptions,this._mediaList=e.mediaList,this._mediaDefault=e.mediaDefault,this._currentMediaIndices=[],s(t?e.baseOption:this._newBaseOption);},t.prototype.getTimelineOption=function(t){var e,n=this._timelineOptions;if(n.length){var i=t.getComponent("timeline");i&&(e=s(n[i.getCurrentIndex()]));}return e;},t.prototype.getMediaOption=function(){var t=this._api.getWidth(),e=this._api.getHeight(),n=this._mediaList,i=this._mediaDefault,r=[],o=[];if(!n.length&&!i)return o;for(var a=0,l=n.length;l>a;a++){Xl(n[a].query,t,e)&&r.push(a);}return!r.length&&i&&(r=[-1]),r.length&&!ql(r,this._currentMediaIndices)&&(o=v(r,function(t){return s(-1===t?i.option:n[t].option);})),this._currentMediaIndices=r,o;},t;}(),_M=y,xM=k,bM=["areaStyle","lineStyle","nodeStyle","linkStyle","chordStyle","label","labelLine"],wM=[["x","left"],["y","top"],["x2","right"],["y2","bottom"]],SM=["grid","geo","parallel","legend","toolbox","title","visualMap","dataZoom","timeline"],MM=[["borderRadius","barBorderRadius"],["borderColor","barBorderColor"],["borderWidth","barBorderWidth"]],TM=function(){function t(t){this.data=t.data||(t.sourceFormat===ZS?{}:[]),this.sourceFormat=t.sourceFormat||$S,this.seriesLayoutBy=t.seriesLayoutBy||JS,this.startIndex=t.startIndex||0,this.dimensionsDefine=t.dimensionsDefine,this.dimensionsDetectedCount=t.dimensionsDetectedCount,this.encodeDefine=t.encodeDefine,this.metaRawOption=t.metaRawOption;}return t;}(),CM=function(){function t(t,e){var n=gu(t)?t:vu(t);this._source=n;var i=this._data=n.data;n.sourceFormat===KS&&(this._offset=0,this._dimSize=e,this._data=i),pM(this,i,n);}return t.prototype.getSource=function(){return this._source;},t.prototype.count=function(){return 0;},t.prototype.getItem=function(){},t.prototype.appendData=function(){},t.prototype.clean=function(){},t.protoInitialize=function(){var e=t.prototype;e.pure=!1,e.persistent=!0;}(),t.internalField=function(){function t(t){for(var e=0;e<t.length;e++){this._data.push(t[e]);}}var e;pM=function pM(t,e,o){var a=o.sourceFormat,s=o.seriesLayoutBy,l=o.startIndex,u=o.dimensionsDefine,c=cM[Au(a,s)];if(h(t,c),a===KS)t.getItem=n,t.count=r,t.fillStorage=i;else{var p=Tu(a,s);t.getItem=qv(p,null,e,l,u);var f=Cu(a,s);t.count=qv(f,null,e,l,u);}};var n=function n(t,e){t-=this._offset,e=e||[];for(var n=this._data,i=this._dimSize,r=i*t,o=0;i>o;o++){e[o]=n[r+o];}return e;},i=function i(t,e,n,_i2){for(var r=this._data,o=this._dimSize,a=0;o>a;a++){for(var s=_i2[a],l=null==s[0]?1/0:s[0],u=null==s[1]?-1/0:s[1],h=e-t,c=n[a],p=0;h>p;p++){var f=r[p*o+a];c[t+p]=f,l>f&&(l=f),f>u&&(u=f);}s[0]=l,s[1]=u;}},r=function r(){return this._data?this._data.length/this._dimSize:0;};e={},e[jS+"_"+JS]={pure:!0,appendData:t},e[jS+"_"+QS]={pure:!0,appendData:function appendData(){throw new Error('Do not support appendData when set seriesLayoutBy: "row".');}},e[qS]={pure:!0,appendData:t},e[ZS]={pure:!0,appendData:function appendData(t){var e=this._data;y(t,function(t,n){for(var i=e[n]||(e[n]=[]),r=0;r<(t||[]).length;r++){i.push(t[r]);}});}},e[XS]={appendData:t},e[KS]={persistent:!1,pure:!0,appendData:function appendData(t){this._data=t;},clean:function clean(){this._offset+=this.count(),this._data=null;}},cM=e;}(),t;}(),IM=function IM(t,e,n,i){return t[i];},AM=(lM={},lM[jS+"_"+JS]=function(t,e,n,i){return t[i+e];},lM[jS+"_"+QS]=function(t,e,n,i){i+=e;for(var r=[],o=t,a=0;a<o.length;a++){var s=o[a];r.push(s?s[i]:null);}return r;},lM[qS]=IM,lM[ZS]=function(t,e,n,i){for(var r=[],o=0;o<n.length;o++){var a=n[o].name,s=t[a];r.push(s?s[i]:null);}return r;},lM[XS]=IM,lM),kM=function kM(t){return t.length;},DM=(uM={},uM[jS+"_"+JS]=function(t,e){return Math.max(0,t.length-e);},uM[jS+"_"+QS]=function(t,e){var n=t[0];return n?Math.max(0,n.length-e):0;},uM[qS]=kM,uM[ZS]=function(t,e,n){var i=n[0].name,r=t[i];return r?r.length:0;},uM[XS]=kM,uM),LM=function LM(t,e){return null!=e?t[e]:t;},PM=(hM={},hM[jS]=LM,hM[qS]=function(t,e,n){return null!=e?t[n]:t;},hM[ZS]=LM,hM[XS]=function(t,e){var n=Gi(t);return null!=e&&n instanceof Array?n[e]:n;},hM[KS]=LM,hM),OM=/\{@(.+?)\}/g,RM=function(){function t(){}return t.prototype.getDataParams=function(t,e){var n=this.getData(e),i=this.getRawValue(t,e),r=n.getRawIndex(t),o=n.getName(t),a=n.getRawDataItem(t),s=n.getItemVisual(t,"style"),l=s&&s[n.getItemVisual(t,"drawType")||"fill"],u=s&&s.stroke,h=this.mainType,c="series"===h,p=n.userOutput;return{componentType:h,componentSubType:this.subType,componentIndex:this.componentIndex,seriesType:c?this.subType:null,seriesIndex:this.seriesIndex,seriesId:c?this.id:null,seriesName:c?this.name:null,name:o,dataIndex:r,data:a,dataType:e,value:i,color:l,borderColor:u,dimensionNames:p?p.dimensionNames:null,encode:p?p.encode:null,$vars:["seriesName","name","value"]};},t.prototype.getFormattedLabel=function(t,e,n,i,r,o){e=e||"normal";var a=this.getData(n),s=this.getDataParams(t,n);if(o&&(s.value=o.interpolatedValue),null!=i&&M(s.value)&&(s.value=s.value[i]),!r){var l=a.getItemModel(t);r=l.get("normal"===e?["label","formatter"]:[e,"label","formatter"]);}if("function"==typeof r)return s.status=e,s.dimensionIndex=i,r(s);if("string"==typeof r){var u=yl(r,s);return u.replace(OM,function(e,n){var i=n.length,r="["===n.charAt(0)&&"]"===n.charAt(i-1)?+n.slice(1,i-1):n,s=ku(a,t,r);if(o&&M(o.interpolatedValue)){var l=a.getDimensionInfo(r);l&&(s=o.interpolatedValue[l.index]);}return null!=s?s+"":"";});}},t.prototype.getRawValue=function(t,e){return ku(this.getData(e),t);},t.prototype.formatTooltip=function(){},t;}(),EM=function(){function t(t){t=t||{},this._reset=t.reset,this._plan=t.plan,this._count=t.count,this._onDirty=t.onDirty,this._dirty=!0;}return t.prototype.perform=function(t){function e(t){return!(t>=1)&&(t=1),t;}var n=this._upstream,i=t&&t.skip;if(this._dirty&&n){var r=this.context;r.data=r.outputData=n.context.outputData;}this.__pipeline&&(this.__pipeline.currentTask=this);var o;this._plan&&!i&&(o=this._plan(this.context));var a=e(this._modBy),s=this._modDataCount||0,l=e(t&&t.modBy),u=t&&t.modDataCount||0;(a!==l||s!==u)&&(o="reset");var h;(this._dirty||"reset"===o)&&(this._dirty=!1,h=this._doReset(i)),this._modBy=l,this._modDataCount=u;var c=t&&t.step;if(this._dueEnd=n?n._outputDueEnd:this._count?this._count(this.context):1/0,this._progress){var p=this._dueIndex,f=Math.min(null!=c?this._dueIndex+c:1/0,this._dueEnd);if(!i&&(h||f>p)){var d=this._progress;if(M(d))for(var g=0;g<d.length;g++){this._doProgress(d[g],p,f,l,u);}else this._doProgress(d,p,f,l,u);}this._dueIndex=f;var y=null!=this._settedOutputEnd?this._settedOutputEnd:f;this._outputDueEnd=y;}else this._dueIndex=this._outputDueEnd=null!=this._settedOutputEnd?this._settedOutputEnd:this._dueEnd;return this.unfinished();},t.prototype.dirty=function(){this._dirty=!0,this._onDirty&&this._onDirty(this.context);},t.prototype._doProgress=function(t,e,n,i,r){BM.reset(e,n,i,r),this._callingProgress=t,this._callingProgress({start:e,end:n,count:n-e,next:BM.next},this.context);},t.prototype._doReset=function(t){this._dueIndex=this._outputDueEnd=this._dueEnd=0,this._settedOutputEnd=null;var e,n;!t&&this._reset&&(e=this._reset(this.context),e&&e.progress&&(n=e.forceFirstProgress,e=e.progress),M(e)&&!e.length&&(e=null)),this._progress=e,this._modBy=this._modDataCount=null;var i=this._downstream;return i&&i.dirty(),n;},t.prototype.unfinished=function(){return this._progress&&this._dueIndex<this._dueEnd;},t.prototype.pipe=function(t){(this._downstream!==t||this._dirty)&&(this._downstream=t,t._upstream=this,t.dirty());},t.prototype.dispose=function(){this._disposed||(this._upstream&&(this._upstream._downstream=null),this._downstream&&(this._downstream._upstream=null),this._dirty=!1,this._disposed=!0);},t.prototype.getUpstream=function(){return this._upstream;},t.prototype.getDownstream=function(){return this._downstream;},t.prototype.setOutputEnd=function(t){this._outputDueEnd=this._settedOutputEnd=t;},t;}(),BM=function(){function t(){return n>i?i++:null;}function e(){var t=i%a*r+Math.ceil(i/a),e=i>=n?null:o>t?t:i;return i++,e;}var n,i,r,o,a,s={reset:function reset(l,u,h,c){i=l,n=u,r=h,o=c,a=Math.ceil(o/r),s.next=r>1&&o>0?e:t;}};return s;}(),zM=(X({number:function number(t){return parseFloat(t);},time:function time(t){return+Ai(t);},trim:function trim(t){return"string"==typeof t?W(t):t;}}),{lt:function lt(t,e){return e>t;},lte:function lte(t,e){return e>=t;},gt:function gt(t,e){return t>e;},gte:function gte(t,e){return t>=e;}}),NM=(function(){function t(t,e){if("number"!=typeof e){var n="";Fi(n);}this._opFn=zM[t],this._rvalFloat=Ri(e);}return t.prototype.evaluate=function(t){return"number"==typeof t?this._opFn(t,this._rvalFloat):this._opFn(Ri(t),this._rvalFloat);},t;}(),function(){function t(t,e){var n="desc"===t;this._resultLT=n?1:-1,null==e&&(e=n?"min":"max"),this._incomparable="min"===e?-1/0:1/0;}return t.prototype.evaluate=function(t,e){var n=typeof t,i=typeof e,r="number"===n?t:Ri(t),o="number"===i?e:Ri(e),a=isNaN(r),s=isNaN(o);if(a&&(r=this._incomparable),s&&(o=this._incomparable),a&&s){var l="string"===n,u="string"===i;l&&(r=u?t:0),u&&(o=l?e:0);}return o>r?this._resultLT:r>o?-this._resultLT:0;},t;}()),FM=(function(){function t(t,e){this._rval=e,this._isEQ=t,this._rvalTypeof=typeof e,this._rvalFloat=Ri(e);}return t.prototype.evaluate=function(t){var e=t===this._rval;if(!e){var n=typeof t;n===this._rvalTypeof||"number"!==n&&"number"!==this._rvalTypeof||(e=Ri(t)===this._rvalFloat);}return this._isEQ?e:!e;},t;}(),function(){function t(){}return t.prototype.getRawData=function(){throw new Error("not supported");},t.prototype.getRawDataItem=function(){throw new Error("not supported");},t.prototype.cloneRawData=function(){},t.prototype.getDimensionInfo=function(){},t.prototype.cloneAllDimensionInfo=function(){},t.prototype.count=function(){},t.prototype.retrieveValue=function(){},t.prototype.retrieveValueFromItem=function(){},t.prototype.convertValue=function(t,e){return Pu(t,e);},t;}()),VM=X(),HM=function(){function t(t){this._sourceList=[],this._upstreamSignList=[],this._versionSignBase=0,this._sourceHost=t;}return t.prototype.dirty=function(){this._setLocalSource([],[]);},t.prototype._setLocalSource=function(t,e){this._sourceList=t,this._upstreamSignList=e,this._versionSignBase++,this._versionSignBase>9e10&&(this._versionSignBase=0);},t.prototype._getVersionSign=function(){return this._sourceHost.uid+"_"+this._versionSignBase;},t.prototype.prepareSource=function(){this._isDirty()&&this._createSource();},t.prototype._createSource=function(){this._setLocalSource([],[]);var t,e,n=this._sourceHost,i=this._getUpstreamSourceManagers(),r=!!i.length;if(Wu(n)){var o=n,a=void 0,s=void 0,l=void 0;if(r){var u=i[0];u.prepareSource(),l=u.getSource(),a=l.data,s=l.sourceFormat,e=[u._getVersionSign()];}else a=o.get("data",!0),s=L(a)?KS:XS,e=[];var h=this._getSourceMetaRawOption(),c=l?l.metaRawOption:null,p=N(h.seriesLayoutBy,c?c.seriesLayoutBy:null),f=N(h.sourceHeader,c?c.sourceHeader:null),d=N(h.dimensions,c?c.dimensions:null);t=[yu(a,{seriesLayoutBy:p,sourceHeader:f,dimensions:d},s,o.get("encode",!0))];}else{var g=n;if(r){var y=this._applyTransform(i);t=y.sourceList,e=y.upstreamSignList;}else{var v=g.get("source",!0);t=[yu(v,this._getSourceMetaRawOption(),null,null)],e=[];}}this._setLocalSource(t,e);},t.prototype._applyTransform=function(t){var e=this._sourceHost,n=e.get("transform",!0),i=e.get("fromTransformResult",!0);if(null!=i){var r="";1!==t.length&&Uu(r);}var o,a=[],s=[];return y(t,function(t){t.prepareSource();var e=t.getSource(i||0),n="";null==i||e||Uu(n),a.push(e),s.push(t._getVersionSign());}),n?o=Fu(n,a,{datasetIndex:e.componentIndex}):null!=i&&(o=[mu(a[0])]),{sourceList:o,upstreamSignList:s};},t.prototype._isDirty=function(){var t=this._sourceList;if(!t.length)return!0;for(var e=this._getUpstreamSourceManagers(),n=0;n<e.length;n++){var i=e[n];if(i._isDirty()||this._upstreamSignList[n]!==i._getVersionSign())return!0;}},t.prototype.getSource=function(t){return this._sourceList[t||0];},t.prototype._getUpstreamSourceManagers=function(){var t=this._sourceHost;if(Wu(t)){var e=Pl(t);return e?[e.getSourceManager()]:[];}return v(Ol(t),function(t){return t.getSourceManager();});},t.prototype._getSourceMetaRawOption=function(){var t,e,n,i=this._sourceHost;if(Wu(i))t=i.get("seriesLayoutBy",!0),e=i.get("sourceHeader",!0),n=i.get("dimensions",!0);else if(!this._getUpstreamSourceManagers().length){var r=i;t=r.get("seriesLayoutBy",!0),e=r.get("sourceHeader",!0),n=r.get("dimensions",!0);}return{seriesLayoutBy:t,sourceHeader:e,dimensions:n};},t;}(),GM="line-height:1",WM=[0,10,20,30],UM=["","\n","\n\n","\n\n\n"],YM={section:{planLayout:function planLayout(t){var e=t.blocks.length,n=e>1||e>0&&!t.noHeader,i=0;y(t.blocks,function(t){ju(t).planLayout(t);var e=t.__gapLevelBetweenSubBlocks;e>=i&&(i=e+(!n||e&&("section"!==t.type||t.noHeader)?0:1));}),t.__gapLevelBetweenSubBlocks=i;},build:function build(t,e,n,i){var r=e.noHeader,o=Ku(e),a=qu(t,e,r?n:o.html,i);if(r)return a;var s=gl(e.header,"ordinal",t.useUTC),l=Yu(i,t.renderMode).nameStyle;return"richText"===t.renderMode?th(t,s,l)+o.richText+a:$u('<div style="'+l+";"+GM+';">'+dl(s)+"</div>"+a,n);}},nameValue:{planLayout:function planLayout(t){t.__gapLevelBetweenSubBlocks=0;},build:function build(t,e,n,i){var r=t.renderMode,o=e.noName,a=e.noValue,s=!e.markerType,l=e.name,u=e.value,h=t.useUTC;if(!o||!a){var c=s?"":t.markupStyleCreator.makeTooltipMarker(e.markerType,e.markerColor||"#333",r),p=o?"":gl(l,"ordinal",h),f=e.valueType,d=a?[]:M(u)?v(u,function(t,e){return gl(t,M(f)?f[e]:f,h);}):[gl(u,M(f)?f[0]:f,h)],g=!s||!o,y=!s&&o,m=Yu(i,r),_=m.nameStyle,x=m.valueStyle;return"richText"===r?(s?"":c)+(o?"":th(t,p,_))+(a?"":eh(t,d,g,y,x)):$u((s?"":c)+(o?"":Ju(p,!s,_))+(a?"":Qu(d,g,y,x)),n);}}}},XM=function(){function t(){this.richTextStyles={},this._nextStyleNameId=Bi();}return t.prototype._generateStyleName=function(){return"__EC_aUTo_"+this._nextStyleNameId++;},t.prototype.makeTooltipMarker=function(t,e,n){var i="richText"===n?this._generateStyleName():null,r=vl({color:e,type:t,renderMode:n,markerId:i});return C(r)?r:(this.richTextStyles[i]=r.style,r.content);},t.prototype.wrapRichTextStyle=function(t,e){var n={};M(e)?y(e,function(t){return h(n,t);}):h(n,e);var i=this._generateStyleName();return this.richTextStyles[i]=n,"{"+i+"|"+t+"}";},t;}(),jM=or(),qM=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e._selectedDataIndicesMap={},e;}return e(n,t),n.prototype.init=function(t,e,n){this.seriesIndex=this.componentIndex,this.dataTask=Lu({count:uh,reset:hh}),this.dataTask.context={model:this},this.mergeDefaultAndTheme(t,n);var i=jM(this).sourceManager=new HM(this);i.prepareSource();var r=this.getInitialData(t,n);ph(r,this),this.dataTask.context.data=r,jM(this).dataBeforeProcessed=r,sh(this),this._initSelectedMapFromData(r);},n.prototype.mergeDefaultAndTheme=function(t,e){var n=Ml(this),i=n?Cl(t):{},r=this.subType;FS.hasClass(r)&&(r+="Series"),l(t,e.getTheme().get(this.subType)),l(t,this.getDefaultOption()),Hi(t,"label",["show"]),this.fillDataTextStyle(t.data),n&&Tl(t,i,n);},n.prototype.mergeOption=function(t,e){t=l(this.option,t,!0),this.fillDataTextStyle(t.data);var n=Ml(this);n&&Tl(this.option,t,n);var i=jM(this).sourceManager;i.dirty(),i.prepareSource();var r=this.getInitialData(t,e);ph(r,this),this.dataTask.dirty(),this.dataTask.context.data=r,jM(this).dataBeforeProcessed=r,sh(this),this._initSelectedMapFromData(r);},n.prototype.fillDataTextStyle=function(t){if(t&&!L(t))for(var e=["show"],n=0;n<t.length;n++){t[n]&&t[n].label&&Hi(t[n],"label",e);}},n.prototype.getInitialData=function(){},n.prototype.appendData=function(t){var e=this.getRawData();e.appendData(t.data);},n.prototype.getData=function(t){var e=dh(this);if(e){var n=e.context.data;return null==t?n:n.getLinkedData(t);}return jM(this).data;},n.prototype.getAllData=function(){var t=this.getData();return t&&t.getLinkedDataAll?t.getLinkedDataAll():[{data:t}];},n.prototype.setData=function(t){var e=dh(this);if(e){var n=e.context;n.outputData=t,e!==this.dataTask&&(n.data=t);}jM(this).data=t;},n.prototype.getSource=function(){return jM(this).sourceManager.getSource();},n.prototype.getRawData=function(){return jM(this).dataBeforeProcessed;},n.prototype.getBaseAxis=function(){var t=this.coordinateSystem;return t&&t.getBaseAxis&&t.getBaseAxis();},n.prototype.formatTooltip=function(t,e){return rh({series:this,dataIndex:t,multipleSeries:e});},n.prototype.isAnimationEnabled=function(){if(Rv.node)return!1;var t=this.getShallow("animation");return t&&this.getData().count()>this.getShallow("animationThreshold")&&(t=!1),!!t;},n.prototype.restoreData=function(){this.dataTask.dirty();},n.prototype.getColorFromPalette=function(t,e,n){var i=this.ecModel,r=rM.prototype.getColorFromPalette.call(this,t,e,n);return r||(r=i.getColorFromPalette(t,e,n)),r;},n.prototype.coordDimToDataDim=function(t){return this.getRawData().mapDimensionsAll(t);},n.prototype.getProgressive=function(){return this.get("progressive");},n.prototype.getProgressiveThreshold=function(){return this.get("progressiveThreshold");},n.prototype.select=function(t,e){this._innerSelect(this.getData(e),t);},n.prototype.unselect=function(t,e){var n=this.option.selectedMap;if(n)for(var i=this.getData(e),r=0;r<t.length;r++){var o=t[r],a=ah(i,o);n[a]=!1,this._selectedDataIndicesMap[a]=-1;}},n.prototype.toggleSelect=function(t,e){for(var n=[],i=0;i<t.length;i++){n[0]=t[i],this.isSelected(t[i],e)?this.unselect(n,e):this.select(n,e);}},n.prototype.getSelectedDataIndices=function(){for(var t=this._selectedDataIndicesMap,e=b(t),n=[],i=0;i<e.length;i++){var r=t[e[i]];r>=0&&n.push(r);}return n;},n.prototype.isSelected=function(t,e){var n=this.option.selectedMap;if(!n)return!1;var i=this.getData(e),r=ah(i,t);return n[r]||!1;},n.prototype._innerSelect=function(t,e){var n,i,r=this.option.selectedMode,o=e.length;if(r&&o)if("multiple"===r)for(var a=this.option.selectedMap||(this.option.selectedMap={}),s=0;o>s;s++){var l=e[s],u=ah(t,l);a[u]=!0,this._selectedDataIndicesMap[u]=t.getRawIndex(l);}else if("single"===r||r===!0){var h=e[o-1],u=ah(t,h);this.option.selectedMap=(n={},n[u]=!0,n),this._selectedDataIndicesMap=(i={},i[u]=t.getRawIndex(h),i);}},n.prototype._initSelectedMapFromData=function(t){if(!this.option.selectedMap){var e=[];t.hasItemOption&&t.each(function(n){var i=t.getRawDataItem(n);i&&i.selected&&e.push(n);}),e.length>0&&this._innerSelect(t,e);}},n.registerClass=function(t){return FS.registerClass(t);},n.protoInitialize=function(){var t=n.prototype;t.type="series.__base__",t.seriesIndex=0,t.useColorPaletteOnData=!1,t.ignoreStyleOnData=!1,t.hasSymbolVisual=!1,t.defaultSymbol="circle",t.visualStyleAccessPath="itemStyle",t.visualDrawType="fill";}(),n;}(FS);d(qM,RM),d(qM,rM),mr(qM,FS);var ZM=function(){function t(){this.group=new O_(),this.uid=Es("viewComponent");}return t.prototype.init=function(){},t.prototype.render=function(){},t.prototype.dispose=function(){},t.prototype.updateView=function(){},t.prototype.updateLayout=function(){},t.prototype.updateVisual=function(){},t.prototype.blurSeries=function(){},t;}();yr(ZM),wr(ZM);var KM=or(),$M=gh(),JM=function(){function t(){this.group=new O_(),this.uid=Es("viewChart"),this.renderTask=Lu({plan:mh,reset:_h}),this.renderTask.context={view:this};}return t.prototype.init=function(){},t.prototype.render=function(){},t.prototype.highlight=function(t,e,n,i){vh(t.getData(),i,"emphasis");},t.prototype.downplay=function(t,e,n,i){vh(t.getData(),i,"normal");},t.prototype.remove=function(){this.group.removeAll();},t.prototype.dispose=function(){},t.prototype.updateView=function(t,e,n,i){this.render(t,e,n,i);},t.prototype.updateLayout=function(t,e,n,i){this.render(t,e,n,i);},t.prototype.updateVisual=function(t,e,n,i){this.render(t,e,n,i);},t.markUpdateMethod=function(t,e){KM(t).updateMethod=e;},t.protoInitialize=function(){var e=t.prototype;e.type="chart";}(),t;}();yr(JM,["dispose"]),wr(JM);var QM,tT={incrementalPrepareRender:{progress:function progress(t,e){e.view.incrementalRender(t,e.model,e.ecModel,e.api,e.payload);}},render:{forceFirstProgress:!0,progress:function progress(t,e){e.view.render(e.model,e.ecModel,e.api,e.payload);}}},eT="\x00__throttleOriginMethod",nT="\x00__throttleRate",iT="\x00__throttleType",rT=or(),oT={itemStyle:Sr(aS,!0),lineStyle:Sr(iS,!0)},aT={lineStyle:"stroke",itemStyle:"fill"},sT={createOnAllSeries:!0,performRawSeries:!0,reset:function reset(t,e){var n=t.getData(),i=t.visualStyleAccessPath||"itemStyle",r=t.getModel(i),o=wh(t,i),a=o(r),s=r.getShallow("decal");s&&(n.setVisual("decal",s),s.dirty=!0);var l=Sh(t,i),u=a[l],c=T(u)?u:null,p="auto"===a.fill||"auto"===a.stroke;if(!a[l]||c||p){var f=t.getColorFromPalette(t.name,null,e.getSeriesCount());a[l]||(a[l]=f,n.setVisual("colorFromPalette",!0)),a.fill="auto"===a.fill||"function"==typeof a.fill?f:a.fill,a.stroke="auto"===a.stroke||"function"==typeof a.stroke?f:a.stroke;}return n.setVisual("style",a),n.setVisual("drawType",l),!e.isSeriesFiltered(t)&&c?(n.setVisual("colorFromPalette",!1),{dataEach:function dataEach(e,n){var i=t.getDataParams(n),r=h({},a);r[l]=c(i),e.setItemVisual(n,"style",r);}}):void 0;}},lT=new uS(),uT={createOnAllSeries:!0,performRawSeries:!0,reset:function reset(t,e){if(!t.ignoreStyleOnData&&!e.isSeriesFiltered(t)){var n=t.getData(),i=t.visualStyleAccessPath||"itemStyle",r=wh(t,i),o=n.getVisual("drawType");return{dataEach:n.hasItemOption?function(t,e){var n=t.getRawDataItem(e);if(n&&n[i]){lT.option=n[i];var a=r(lT),s=t.ensureUniqueItemVisual(e,"style");h(s,a),lT.option.decal&&(t.setItemVisual(e,"decal",lT.option.decal),lT.option.decal.dirty=!0),o in a&&t.setItemVisual(e,"colorFromPalette",!1);}}:null};}}},hT={performRawSeries:!0,overallReset:function overallReset(t){var e=X();t.eachSeries(function(t){if(t.useColorPaletteOnData){var n=e.get(t.type);n||(n={},e.set(t.type,n)),rT(t).scope=n;}}),t.eachSeries(function(e){if(e.useColorPaletteOnData&&!t.isSeriesFiltered(e)){var n=e.getRawData(),i={},r=e.getData(),o=rT(e).scope,a=e.visualStyleAccessPath||"itemStyle",s=Sh(e,a);r.each(function(t){var e=r.getRawIndex(t);i[e]=t;}),n.each(function(t){var a=i[t],l=r.getItemVisual(a,"colorFromPalette");if(l){var u=r.ensureUniqueItemVisual(a,"style"),h=n.getName(t)||t+"",c=n.count();u[s]=e.getColorFromPalette(h,o,c);}});}});}},cT=Math.PI,pT=function(){function t(t,e,n,i){this._stageTaskMap=X(),this.ecInstance=t,this.api=e,n=this._dataProcessorHandlers=n.slice(),i=this._visualHandlers=i.slice(),this._allHandlers=n.concat(i);}return t.prototype.restoreData=function(t,e){t.restoreData(e),this._stageTaskMap.each(function(t){var e=t.overallTask;e&&e.dirty();});},t.prototype.getPerformArgs=function(t,e){if(t.__pipeline){var n=this._pipelineMap.get(t.__pipeline.id),i=n.context,r=!e&&n.progressiveEnabled&&(!i||i.progressiveRender)&&t.__idxInPipeline>n.blockIndex,o=r?n.step:null,a=i&&i.modDataCount,s=null!=a?Math.ceil(a/o):null;return{step:o,modBy:s,modDataCount:a};}},t.prototype.getPipeline=function(t){return this._pipelineMap.get(t);},t.prototype.updateStreamModes=function(t,e){var n=this._pipelineMap.get(t.uid),i=t.getData(),r=i.count(),o=n.progressiveEnabled&&e.incrementalPrepareRender&&r>=n.threshold,a=t.get("large")&&r>=t.get("largeThreshold"),s="mod"===t.get("progressiveChunkMode")?r:null;t.pipelineContext=n.context={progressiveRender:o,modDataCount:s,large:a};},t.prototype.restorePipelines=function(t){var e=this,n=e._pipelineMap=X();t.eachSeries(function(t){var i=t.getProgressive(),r=t.uid;n.set(r,{id:r,head:null,tail:null,threshold:t.getProgressiveThreshold(),progressiveEnabled:i&&!(t.preventIncremental&&t.preventIncremental()),blockIndex:-1,step:Math.round(i||700),count:0}),e._pipe(t,t.dataTask);});},t.prototype.prepareStageTasks=function(){var t=this._stageTaskMap,e=this.api.getModel(),n=this.api;y(this._allHandlers,function(i){var r=t.get(i.uid)||t.set(i.uid,{}),o="";G(!(i.reset&&i.overallReset),o),i.reset&&this._createSeriesStageTask(i,r,e,n),i.overallReset&&this._createOverallStageTask(i,r,e,n);},this);},t.prototype.prepareView=function(t,e,n,i){var r=t.renderTask,o=r.context;o.model=e,o.ecModel=n,o.api=i,r.__block=!t.incrementalPrepareRender,this._pipe(e,r);},t.prototype.performDataProcessorTasks=function(t,e){this._performStageTasks(this._dataProcessorHandlers,t,e,{block:!0});},t.prototype.performVisualTasks=function(t,e,n){this._performStageTasks(this._visualHandlers,t,e,n);},t.prototype._performStageTasks=function(t,e,n,i){function r(t,e){return t.setDirty&&(!t.dirtyMap||t.dirtyMap.get(e.__pipeline.id));}i=i||{};var o=!1,a=this;y(t,function(t){if(!i.visualType||i.visualType===t.visualType){var s=a._stageTaskMap.get(t.uid),l=s.seriesTaskMap,u=s.overallTask;if(u){var h,c=u.agentStubMap;c.each(function(t){r(i,t)&&(t.dirty(),h=!0);}),h&&u.dirty(),a.updatePayload(u,n);var p=a.getPerformArgs(u,i.block);c.each(function(t){t.perform(p);}),u.perform(p)&&(o=!0);}else l&&l.each(function(s){r(i,s)&&s.dirty();var l=a.getPerformArgs(s,i.block);l.skip=!t.performRawSeries&&e.isSeriesFiltered(s.context.model),a.updatePayload(s,n),s.perform(l)&&(o=!0);});}}),this.unfinished=o||this.unfinished;},t.prototype.performSeriesTasks=function(t){var e;t.eachSeries(function(t){e=t.dataTask.perform()||e;}),this.unfinished=e||this.unfinished;},t.prototype.plan=function(){this._pipelineMap.each(function(t){var e=t.tail;do{if(e.__block){t.blockIndex=e.__idxInPipeline;break;}e=e.getUpstream();}while(e);});},t.prototype.updatePayload=function(t,e){"remain"!==e&&(t.context.payload=e);},t.prototype._createSeriesStageTask=function(t,e,n,i){function r(e){var r=e.uid,l=s.set(r,a&&a.get(r)||Lu({plan:kh,reset:Dh,count:Ph}));l.context={model:e,ecModel:n,api:i,useClearVisual:t.isVisual&&!t.isLayout,plan:t.plan,reset:t.reset,scheduler:o},o._pipe(e,l);}var o=this,a=e.seriesTaskMap,s=e.seriesTaskMap=X(),l=t.seriesType,u=t.getTargetSeries;t.createOnAllSeries?n.eachRawSeries(r):l?n.eachRawSeriesByType(l,r):u&&u(n,i).each(r);},t.prototype._createOverallStageTask=function(t,e,n,i){function r(t){var e=t.uid,n=l.set(e,s&&s.get(e)||(p=!0,Lu({reset:Ch,onDirty:Ah})));n.context={model:t,overallProgress:c},n.agent=a,n.__block=c,o._pipe(t,n);}var o=this,a=e.overallTask=e.overallTask||Lu({reset:Th});a.context={ecModel:n,api:i,overallReset:t.overallReset,scheduler:o};var s=a.agentStubMap,l=a.agentStubMap=X(),u=t.seriesType,h=t.getTargetSeries,c=!0,p=!1,f="";G(!t.createOnAllSeries,f),u?n.eachRawSeriesByType(u,r):h?h(n,i).each(r):(c=!1,y(n.getSeries(),r)),p&&a.dirty();},t.prototype._pipe=function(t,e){var n=t.uid,i=this._pipelineMap.get(n);!i.head&&(i.head=e),i.tail&&i.tail.pipe(e),i.tail=e,e.__idxInPipeline=i.count++,e.__pipeline=i;},t.wrapStageHandler=function(t,e){return T(t)&&(t={overallReset:t,seriesType:Oh(t)}),t.uid=Es("stageHandler"),e&&(t.visualType=e),t;},t;}(),fT=Lh(0),dT={},gT={};Rh(dT,sM),Rh(gT,dM),dT.eachSeriesByType=dT.eachRawSeriesByType=function(t){QM=t;},dT.eachComponent=function(t){"series"===t.mainType&&t.subType&&(QM=t.subType);};var yT=["#37A2DA","#32C5E9","#67E0E3","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#E062AE","#E690D1","#e7bcf3","#9d96f5","#8378EA","#96BFFF"],vT={color:yT,colorLayer:[["#37A2DA","#ffd85c","#fd7b5f"],["#37A2DA","#67E0E3","#FFDB5C","#ff9f7f","#E062AE","#9d96f5"],["#37A2DA","#32C5E9","#9FE6B8","#FFDB5C","#ff9f7f","#fb7293","#e7bcf3","#8378EA","#96BFFF"],yT]},mT="#B9B8CE",_T="#100C2A",xT=function xT(){return{axisLine:{lineStyle:{color:mT}},splitLine:{lineStyle:{color:"#484753"}},splitArea:{areaStyle:{color:["rgba(255,255,255,0.02)","rgba(255,255,255,0.05)"]}},minorSplitLine:{lineStyle:{color:"#20203B"}}};},bT=["#4992ff","#7cffb2","#fddd60","#ff6e76","#58d9f9","#05c091","#ff8a45","#8d48e3","#dd79ff"],wT={darkMode:!0,color:bT,backgroundColor:_T,axisPointer:{lineStyle:{color:"#817f91"},crossStyle:{color:"#817f91"},label:{color:"#fff"}},legend:{textStyle:{color:mT}},textStyle:{color:mT},title:{textStyle:{color:"#EEF1FA"},subtextStyle:{color:"#B9B8CE"}},toolbox:{iconStyle:{borderColor:mT}},dataZoom:{borderColor:"#71708A",textStyle:{color:mT},brushStyle:{color:"rgba(135,163,206,0.3)"},handleStyle:{color:"#353450",borderColor:"#C5CBE3"},moveHandleStyle:{color:"#B0B6C3",opacity:.3},fillerColor:"rgba(135,163,206,0.2)",emphasis:{handleStyle:{borderColor:"#91B7F2",color:"#4D587D"},moveHandleStyle:{color:"#636D9A",opacity:.7}},dataBackground:{lineStyle:{color:"#71708A",width:1},areaStyle:{color:"#71708A"}},selectedDataBackground:{lineStyle:{color:"#87A3CE"},areaStyle:{color:"#87A3CE"}}},visualMap:{textStyle:{color:mT}},timeline:{lineStyle:{color:mT},label:{color:mT},controlStyle:{color:mT,borderColor:mT}},calendar:{itemStyle:{color:_T},dayLabel:{color:mT},monthLabel:{color:mT},yearLabel:{color:mT}},timeAxis:xT(),logAxis:xT(),valueAxis:xT(),categoryAxis:xT(),line:{symbol:"circle"},graph:{color:bT},gauge:{title:{color:mT},axisLine:{lineStyle:{color:[[1,"rgba(207,212,219,0.2)"]]}},axisLabel:{color:mT},detail:{color:"#EEF1FA"}},candlestick:{itemStyle:{color:"#f64e56",color0:"#54ea92",borderColor:"#f64e56",borderColor0:"#54ea92"}}};wT.categoryAxis.splitLine.show=!1;var ST=function(){function t(){}return t.prototype.normalizeQuery=function(t){var e={},n={},i={};if(C(t)){var r=fr(t);e.mainType=r.main||null,e.subType=r.sub||null;}else{var o=["Index","Name","Id"],a={name:1,dataIndex:1,dataType:1};y(t,function(t,r){for(var s=!1,l=0;l<o.length;l++){var u=o[l],h=r.lastIndexOf(u);if(h>0&&h===r.length-u.length){var c=r.slice(0,h);"data"!==c&&(e.mainType=c,e[u.toLowerCase()]=t,s=!0);}}a.hasOwnProperty(r)&&(n[r]=t,s=!0),s||(i[r]=t);});}return{cptQuery:e,dataQuery:n,otherQuery:i};},t.prototype.filter=function(t,e){function n(t,e,n,i){return null==t[n]||e[i||n]===t[n];}var i=this.eventInfo;if(!i)return!0;var r=i.targetEl,o=i.packedEvent,a=i.model,s=i.view;if(!a||!s)return!0;var l=e.cptQuery,u=e.dataQuery;return n(l,a,"mainType")&&n(l,a,"subType")&&n(l,a,"index","componentIndex")&&n(l,a,"name")&&n(l,a,"id")&&n(u,o,"name")&&n(u,o,"dataIndex")&&n(u,o,"dataType")&&(!s.filterForExposedEvent||s.filterForExposedEvent(t,e.otherQuery,r,o));},t.prototype.afterTrigger=function(){this.eventInfo=null;},t;}(),MT={createOnAllSeries:!0,performRawSeries:!0,reset:function reset(t,e){function n(e,n){var i=t.getRawValue(n),a=t.getDataParams(n);u&&e.setItemVisual(n,"symbol",r(i,a)),h&&e.setItemVisual(n,"symbolSize",o(i,a)),c&&e.setItemVisual(n,"symbolRotate",s(i,a)),p&&e.setItemVisual(n,"symbolOffset",l(i,a));}var i=t.getData();if(t.legendSymbol&&i.setVisual("legendSymbol",t.legendSymbol),t.hasSymbolVisual){var r=t.get("symbol"),o=t.get("symbolSize"),a=t.get("symbolKeepAspect"),s=t.get("symbolRotate"),l=t.get("symbolOffset"),u=T(r),h=T(o),c=T(s),p=T(l),f=u||h||c||p,d=!u&&r?r:t.defaultSymbol,g=h?null:o,y=c?null:s,v=p?null:l;if(i.setVisual({legendSymbol:t.legendSymbol||d,symbol:d,symbolSize:g,symbolKeepAspect:a,symbolRotate:y,symbolOffset:v}),!e.isSeriesFiltered(t))return{dataEach:f?n:null};}}},TT={createOnAllSeries:!0,performRawSeries:!0,reset:function reset(t,e){function n(t,e){var n=t.getItemModel(e),i=n.getShallow("symbol",!0),r=n.getShallow("symbolSize",!0),o=n.getShallow("symbolRotate",!0),a=n.getShallow("symbolOffset",!0),s=n.getShallow("symbolKeepAspect",!0);null!=i&&t.setItemVisual(e,"symbol",i),null!=r&&t.setItemVisual(e,"symbolSize",r),null!=o&&t.setItemVisual(e,"symbolRotate",o),null!=a&&t.setItemVisual(e,"symbolOffset",a),null!=s&&t.setItemVisual(e,"symbolKeepAspect",s);}if(t.hasSymbolVisual&&!e.isSeriesFiltered(t)){var i=t.getData();return{dataEach:i.hasItemOption?n:null};}}},CT=2*Math.PI,IT=$x.CMD,AT=["top","right","bottom","left"],kT=[],DT=new Ym(),LT=new Ym(),PT=new Ym(),OT=new Ym(),RT=new Ym(),ET=[],BT=new Ym(),zT=["align","verticalAlign","width","height","fontSize"],NT=new km(),FT=or(),VT=or(),HT=["x","y","rotation"],GT=function(){function t(){this._labelList=[],this._chartViewList=[];
}return t.prototype.clearLabels=function(){this._labelList=[],this._chartViewList=[];},t.prototype._addLabel=function(t,e,n,i,r){var o=i.style,a=i.__hostTarget,s=a.textConfig||{},l=i.getComputedTransform(),u=i.getBoundingRect().plain();t_.applyTransform(u,u,l),l?NT.setLocalTransform(l):(NT.x=NT.y=NT.rotation=NT.originX=NT.originY=0,NT.scaleX=NT.scaleY=1);var h,c=i.__hostTarget;if(c){h=c.getBoundingRect().plain();var p=c.getComputedTransform();t_.applyTransform(h,h,p);}var f=h&&c.getTextGuideLine();this._labelList.push({label:i,labelLine:f,seriesModel:n,dataIndex:t,dataType:e,layoutOption:r,computedLayoutOption:null,rect:u,hostRect:h,priority:h?h.width*h.height:0,defaultAttr:{ignore:i.ignore,labelGuideIgnore:f&&f.ignore,x:NT.x,y:NT.y,scaleX:NT.scaleX,scaleY:NT.scaleY,rotation:NT.rotation,style:{x:o.x,y:o.y,align:o.align,verticalAlign:o.verticalAlign,width:o.width,height:o.height,fontSize:o.fontSize},cursor:i.cursor,attachedPos:s.position,attachedRot:s.rotation}});},t.prototype.addLabelsOfSeries=function(t){var e=this;this._chartViewList.push(t);var n=t.__model,i=n.get("labelLayout");(T(i)||b(i).length)&&t.group.traverse(function(t){if(t.ignore)return!0;var r=t.getTextContent(),o=Mb(t);r&&!r.disableLabelLayout&&e._addLabel(o.dataIndex,o.dataType,n,r,i);});},t.prototype.updateLayoutConfig=function(t){function e(t,e){return function(){Wh(t,e);};}for(var n=t.getWidth(),i=t.getHeight(),r=0;r<this._labelList.length;r++){var o=this._labelList[r],a=o.label,s=a.__hostTarget,l=o.defaultAttr,u=void 0;u="function"==typeof o.layoutOption?o.layoutOption(nc(o,s)):o.layoutOption,u=u||{},o.computedLayoutOption=u;var h=Math.PI/180;s&&s.setTextConfig({local:!1,position:null!=u.x||null!=u.y?null:l.attachedPos,rotation:null!=u.rotate?u.rotate*h:l.attachedRot,offset:[u.dx||0,u.dy||0]});var c=!1;if(null!=u.x?(a.x=_i(u.x,n),a.setStyle("x",0),c=!0):(a.x=l.x,a.setStyle("x",l.style.x)),null!=u.y?(a.y=_i(u.y,i),a.setStyle("y",0),c=!0):(a.y=l.y,a.setStyle("y",l.style.y)),u.labelLinePoints){var p=s.getTextGuideLine();p&&(p.setShape({points:u.labelLinePoints}),c=!1);}var f=FT(a);f.needsUpdateLabelLine=c,a.rotation=null!=u.rotate?u.rotate*h:l.rotation,a.scaleX=l.scaleX,a.scaleY=l.scaleY;for(var d=0;d<zT.length;d++){var g=zT[d];a.setStyle(g,null!=u[g]?u[g]:l.style[g]);}if(u.draggable){if(a.draggable=!0,a.cursor="move",s){var y=o.seriesModel;if(null!=o.dataIndex){var v=o.seriesModel.getData(o.dataType);y=v.getItemModel(o.dataIndex);}a.on("drag",e(s,y.getModel("labelLine")));}}else a.off("drag"),a.cursor=l.cursor;}},t.prototype.layout=function(t){var e=t.getWidth(),n=t.getHeight(),i=Kh(this._labelList),r=_(i,function(t){return"shiftX"===t.layoutOption.moveOverlap;}),o=_(i,function(t){return"shiftY"===t.layoutOption.moveOverlap;});Jh(r,0,e),Qh(o,0,n);var a=_(i,function(t){return t.layoutOption.hideOverlap;});tc(a);},t.prototype.processLabelsOverall=function(){var t=this;y(this._chartViewList,function(e){var n=e.__model,i=e.ignoreLabelLineUpdate,r=n.isAnimationEnabled();e.group.traverse(function(e){if(e.ignore)return!0;var o=!i,a=e.getTextContent();!o&&a&&(o=FT(a).needsUpdateLabelLine),o&&t._updateLabelLine(e,n),r&&t._animateLabels(e,n);});});},t.prototype._updateLabelLine=function(t,e){var n=t.getTextContent(),i=Mb(t),r=i.dataIndex;if(n&&null!=r){var o=e.getData(i.dataType),a=o.getItemModel(r),s={},l=o.getItemVisual(r,"style"),u=o.getVisual("drawType");s.stroke=l[u];var h=a.getModel("labelLine");qh(t,Zh(a),s),Wh(t,h);}},t.prototype._animateLabels=function(t,e){var n=t.getTextContent(),i=t.getTextGuideLine();if(n&&!n.ignore&&!n.invisible&&!t.disableLabelAnimation&&!ls(t)){var r=FT(n),o=r.oldLayout,a=Mb(t),s=a.dataIndex,l={x:n.x,y:n.y,rotation:n.rotation},u=e.getData(a.dataType);if(o){n.attr(o);var h=t.prevStates;h&&(p(h,"select")>=0&&n.attr(r.oldLayoutSelect),p(h,"emphasis")>=0&&n.attr(r.oldLayoutEmphasis)),is(n,l,e,s);}else if(n.attr(l),!Qw(n).valueAnimation){var c=N(n.style.opacity,1);n.style.opacity=0,rs(n,{style:{opacity:c}},e,s);}if(r.oldLayout=l,n.states.select){var f=r.oldLayoutSelect={};ic(f,l,HT),ic(f,n.states.select,HT);}if(n.states.emphasis){var d=r.oldLayoutEmphasis={};ic(d,l,HT),ic(d,n.states.emphasis,HT);}Rs(n,s,u,e,e);}if(i&&!i.ignore&&!i.invisible){var r=VT(i),o=r.oldLayout,g={points:i.shape.points};o?(i.attr({shape:o}),is(i,{shape:g},e)):(i.setShape(g),i.style.strokePercent=0,rs(i,{style:{strokePercent:1}},e)),r.oldLayout=g;}},t;}(),WT=Math.round(9*Math.random()),UT=function(){function t(){this._id="__ec_inner_"+WT++;}return t.prototype.get=function(t){return this._guard(t)[this._id];},t.prototype.set=function(t,e){var n=this._guard(t);return"function"==typeof Object.defineProperty?Object.defineProperty(n,this._id,{value:e,enumerable:!1,configurable:!0}):n[this._id]=e,this;},t.prototype["delete"]=function(t){return this.has(t)?(delete this._guard(t)[this._id],!0):!1;},t.prototype.has=function(t){return!!this._guard(t)[this._id];},t.prototype._guard=function(t){if(t!==Object(t))throw TypeError("Value of WeakMap is not a non-null object.");return t;},t;}(),YT=lb.extend({type:"triangle",shape:{cx:0,cy:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=e.width/2,o=e.height/2;t.moveTo(n,i-o),t.lineTo(n+r,i+o),t.lineTo(n-r,i+o),t.closePath();}}),XT=lb.extend({type:"diamond",shape:{cx:0,cy:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.cx,i=e.cy,r=e.width/2,o=e.height/2;t.moveTo(n,i-o),t.lineTo(n+r,i),t.lineTo(n,i+o),t.lineTo(n-r,i),t.closePath();}}),jT=lb.extend({type:"pin",shape:{x:0,y:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.x,i=e.y,r=e.width/5*3,o=Math.max(r,e.height),a=r/2,s=a*a/(o-a),l=i-o+a+s,u=Math.asin(s/a),h=Math.cos(u)*a,c=Math.sin(u),p=Math.cos(u),f=.6*a,d=.7*a;t.moveTo(n-h,l+s),t.arc(n,l,a,Math.PI-u,2*Math.PI+u),t.bezierCurveTo(n+h-c*f,l+s+p*f,n,i-d,n,i),t.bezierCurveTo(n,i-d,n-h+c*f,l+s+p*f,n-h,l+s),t.closePath();}}),qT=lb.extend({type:"arrow",shape:{x:0,y:0,width:0,height:0},buildPath:function buildPath(t,e){var n=e.height,i=e.width,r=e.x,o=e.y,a=i/3*2;t.moveTo(r,o),t.lineTo(r+a,o+n),t.lineTo(r,o+n/4*3),t.lineTo(r-a,o+n),t.lineTo(r,o),t.closePath();}}),ZT={line:Tw,rect:vb,roundRect:vb,square:vb,circle:ew,diamond:XT,pin:jT,arrow:qT,triangle:YT},KT={line:function line(t,e,n,i,r){r.x1=t,r.y1=e+i/2,r.x2=t+n,r.y2=e+i/2;},rect:function rect(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i;},roundRect:function roundRect(t,e,n,i,r){r.x=t,r.y=e,r.width=n,r.height=i,r.r=Math.min(n,i)/4;},square:function square(t,e,n,i,r){var o=Math.min(n,i);r.x=t,r.y=e,r.width=o,r.height=o;},circle:function circle(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.r=Math.min(n,i)/2;},diamond:function diamond(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i;},pin:function pin(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i;},arrow:function arrow(t,e,n,i,r){r.x=t+n/2,r.y=e+i/2,r.width=n,r.height=i;},triangle:function triangle(t,e,n,i,r){r.cx=t+n/2,r.cy=e+i/2,r.width=n,r.height=i;}},$T={};y(ZT,function(t,e){$T[e]=new t();});for(var JT,QT=lb.extend({type:"symbol",shape:{symbolType:"",x:0,y:0,width:0,height:0},calculateTextPosition:function calculateTextPosition(t,e,n){var i=Fn(t,e,n),r=this.shape;return r&&"pin"===r.symbolType&&"inside"===e.position&&(i.y=n.y+.4*n.height),i;},buildPath:function buildPath(t,e,n){var i=e.symbolType;if("none"!==i){var r=$T[i];r||(i="rect",r=$T[i]),KT[i](e.x,e.y,e.width,e.height,r.shape),r.buildPath(t,r.shape,n);}}}),tC=new $x(!0),eC=["shadowBlur","shadowOffsetX","shadowOffsetY"],nC=[["lineCap","butt"],["lineJoin","miter"],["miterLimit",10]],iC=1,rC=2,oC=3,aC=4,sC=new UT(),lC=new Rm(100),uC=["symbol","symbolSize","symbolKeepAspect","color","backgroundColor","dashArrayX","dashArrayY","maxTileWidth","maxTileHeight"],hC={fill:"fill",stroke:"stroke","stroke-width":"lineWidth",opacity:"opacity","fill-opacity":"fillOpacity","stroke-opacity":"strokeOpacity","stroke-dasharray":"lineDash","stroke-dashoffset":"lineDashOffset","stroke-linecap":"lineCap","stroke-linejoin":"lineJoin","stroke-miterlimit":"miterLimit","font-family":"fontFamily","font-size":"fontSize","font-style":"fontStyle","font-weight":"fontWeight","text-anchor":"textAlign",visibility:"visibility",display:"display"},cC=b(hC),pC={"alignment-baseline":"textBaseline","stop-color":"stopColor"},fC=b(pC),dC=function(){function t(){this._defs={},this._root=null;}return t.prototype.parse=function(t,e){e=e||{};var n=Gc(t);if(!n)throw new Error("Illegal svg");this._defsUsePending=[];var i=new O_();this._root=i;var r=[],o=n.getAttribute("viewBox")||"",a=parseFloat(n.getAttribute("width")||e.width),s=parseFloat(n.getAttribute("height")||e.height);isNaN(a)&&(a=null),isNaN(s)&&(s=null),jc(n,i,null,!0,!1);for(var l=n.firstChild;l;){this._parseNode(l,i,r,null,!1,!1),l=l.nextSibling;}Kc(this._defs,this._defsUsePending),this._defsUsePending=[];var u,h;if(o){var c=$c(o);c.length>=4&&(u={x:parseFloat(c[0]||0),y:parseFloat(c[1]||0),width:parseFloat(c[2]),height:parseFloat(c[3])});}if(u&&null!=a&&null!=s&&(h=ep(u,{x:0,y:0,width:a,height:s}),!e.ignoreViewBox)){var p=i;i=new O_(),i.add(p),p.scaleX=p.scaleY=h.scale,p.x=h.x,p.y=h.y;}return e.ignoreRootClip||null==a||null==s||i.setClipPath(new vb({shape:{x:0,y:0,width:a,height:s}})),{root:i,width:a,height:s,viewBoxRect:u,viewBoxTransform:h,named:r};},t.prototype._parseNode=function(t,e,n,i,r,o){var a,s=t.nodeName.toLowerCase(),l=i;if("defs"===s&&(r=!0),"text"===s&&(o=!0),"defs"===s||"switch"===s)a=e;else{if(!r){var u=JT[s];if(u&&Z(JT,s)){a=u.call(this,t,e);var h=t.getAttribute("name");if(h){var c={name:h,namedFrom:null,svgNodeTagLower:s,el:a};n.push(c),"g"===s&&(l=c);}else i&&n.push({name:i.name,namedFrom:i,svgNodeTagLower:s,el:a});e.add(a);}}var p=gC[s];if(p&&Z(gC,s)){var f=p.call(this,t),d=t.getAttribute("id");d&&(this._defs[d]=f);}}if(a&&a.isGroup)for(var g=t.firstChild;g;){1===g.nodeType?this._parseNode(g,a,n,l,r,o):3===g.nodeType&&o&&this._parseText(g,a),g=g.nextSibling;}},t.prototype._parseText=function(t,e){var n=new hb({style:{text:t.textContent},silent:!0,x:this._textX||0,y:this._textY||0});Yc(e,n),jc(t,n,this._defsUsePending,!1,!1),qc(n,e);var i=n.style,r=i.fontSize;r&&9>r&&(i.fontSize=9,n.scaleX*=r/9,n.scaleY*=r/9);var o=(i.fontSize||i.fontFamily)&&[i.fontStyle,i.fontWeight,(i.fontSize||12)+"px",i.fontFamily||"sans-serif"].join(" ");i.font=o;var a=n.getBoundingRect();return this._textX+=a.width,e.add(n),n;},t.internalField=function(){JT={g:function g(t,e){var n=new O_();return Yc(e,n),jc(t,n,this._defsUsePending,!1,!1),n;},rect:function rect(t,e){var n=new vb();return Yc(e,n),jc(t,n,this._defsUsePending,!1,!1),n.setShape({x:parseFloat(t.getAttribute("x")||"0"),y:parseFloat(t.getAttribute("y")||"0"),width:parseFloat(t.getAttribute("width")||"0"),height:parseFloat(t.getAttribute("height")||"0")}),n.silent=!0,n;},circle:function circle(t,e){var n=new ew();return Yc(e,n),jc(t,n,this._defsUsePending,!1,!1),n.setShape({cx:parseFloat(t.getAttribute("cx")||"0"),cy:parseFloat(t.getAttribute("cy")||"0"),r:parseFloat(t.getAttribute("r")||"0")}),n.silent=!0,n;},line:function line(t,e){var n=new Tw();return Yc(e,n),jc(t,n,this._defsUsePending,!1,!1),n.setShape({x1:parseFloat(t.getAttribute("x1")||"0"),y1:parseFloat(t.getAttribute("y1")||"0"),x2:parseFloat(t.getAttribute("x2")||"0"),y2:parseFloat(t.getAttribute("y2")||"0")}),n.silent=!0,n;},ellipse:function ellipse(t,e){var n=new iw();return Yc(e,n),jc(t,n,this._defsUsePending,!1,!1),n.setShape({cx:parseFloat(t.getAttribute("cx")||"0"),cy:parseFloat(t.getAttribute("cy")||"0"),rx:parseFloat(t.getAttribute("rx")||"0"),ry:parseFloat(t.getAttribute("ry")||"0")}),n.silent=!0,n;},polygon:function polygon(t,e){var n,i=t.getAttribute("points");i&&(n=Xc(i));var r=new xw({shape:{points:n||[]},silent:!0});return Yc(e,r),jc(t,r,this._defsUsePending,!1,!1),r;},polyline:function polyline(t,e){var n,i=t.getAttribute("points");i&&(n=Xc(i));var r=new ww({shape:{points:n||[]},silent:!0});return Yc(e,r),jc(t,r,this._defsUsePending,!1,!1),r;},image:function image(t,e){var n=new fb();return Yc(e,n),jc(t,n,this._defsUsePending,!1,!1),n.setStyle({image:t.getAttribute("xlink:href"),x:+t.getAttribute("x"),y:+t.getAttribute("y"),width:+t.getAttribute("width"),height:+t.getAttribute("height")}),n.silent=!0,n;},text:function text(t,e){var n=t.getAttribute("x")||"0",i=t.getAttribute("y")||"0",r=t.getAttribute("dx")||"0",o=t.getAttribute("dy")||"0";this._textX=parseFloat(n)+parseFloat(r),this._textY=parseFloat(i)+parseFloat(o);var a=new O_();return Yc(e,a),jc(t,a,this._defsUsePending,!1,!0),a;},tspan:function tspan(t,e){var n=t.getAttribute("x"),i=t.getAttribute("y");null!=n&&(this._textX=parseFloat(n)),null!=i&&(this._textY=parseFloat(i));var r=t.getAttribute("dx")||"0",o=t.getAttribute("dy")||"0",a=new O_();return Yc(e,a),jc(t,a,this._defsUsePending,!1,!0),this._textX+=parseFloat(r),this._textY+=parseFloat(o),a;},path:function path(t,e){var n=t.getAttribute("d")||"",i=Ea(n);return Yc(e,i),jc(t,i,this._defsUsePending,!1,!1),i.silent=!0,i;}};}(),t;}(),gC={lineargradient:function lineargradient(t){var e=parseInt(t.getAttribute("x1")||"0",10),n=parseInt(t.getAttribute("y1")||"0",10),i=parseInt(t.getAttribute("x2")||"10",10),r=parseInt(t.getAttribute("y2")||"0",10),o=new Ow(e,n,i,r);return Wc(t,o),Uc(t,o),o;},radialgradient:function radialgradient(t){var e=parseInt(t.getAttribute("cx")||"0",10),n=parseInt(t.getAttribute("cy")||"0",10),i=parseInt(t.getAttribute("r")||"0",10),r=new Rw(e,n,i);return Wc(t,r),Uc(t,r),r;}},yC=/^url\(\s*#(.*?)\)/,vC=/-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g,mC=/(translate|scale|rotate|skewX|skewY|matrix)\(([\-\s0-9\.eE,]*)\)/g,_C=/([^\s:;]+)\s*:\s*([^:;]+)/g,xC=1e-8,bC=[],wC=function(){function t(t){this.name=t;}return t.prototype.getCenter=function(){},t;}(),SC=function(t){function n(e,n,i){var r=t.call(this,e)||this;if(r.type="geoJSON",r.geometries=n,i)i=[i[0],i[1]];else{var o=r.getBoundingRect();i=[o.x+o.width/2,o.y+o.height/2];}return r._center=i,r;}return e(n,t),n.prototype.getBoundingRect=function(){var t=this._rect;if(t)return t;for(var e=Number.MAX_VALUE,n=[e,e],i=[-e,-e],r=[],o=[],a=this.geometries,s=0;s<a.length;s++){if("polygon"===a[s].type){var l=a[s].exterior;eo(l,r,o),ye(n,n,r),ve(i,i,o);}}return 0===s&&(n[0]=n[1]=i[0]=i[1]=0),this._rect=new t_(n[0],n[1],i[0]-n[0],i[1]-n[1]);},n.prototype.contain=function(t){var e=this.getBoundingRect(),n=this.geometries;if(!e.contain(t[0],t[1]))return!1;t:for(var i=0,r=n.length;r>i;i++){if("polygon"===n[i].type){var o=n[i].exterior,a=n[i].interiors;if(rp(o,t[0],t[1])){for(var s=0;s<(a?a.length:0);s++){if(rp(a[s],t[0],t[1]))continue t;}return!0;}}}return!1;},n.prototype.transformTo=function(t,e,n,i){var r=this.getBoundingRect(),o=r.width/r.height;n?i||(i=n/o):n=o*i;for(var a=new t_(t,e,n,i),s=r.calculateTransform(a),l=this.geometries,u=0;u<l.length;u++){if("polygon"===l[u].type){for(var h=l[u].exterior,c=l[u].interiors,p=0;p<h.length;p++){ge(h[p],h[p],s);}for(var f=0;f<(c?c.length:0);f++){for(var p=0;p<c[f].length;p++){ge(c[f][p],c[f][p],s);}}}}r=this._rect,r.copy(a),this._center=[r.x+r.width/2,r.y+r.height/2];},n.prototype.cloneShallow=function(t){null==t&&(t=this.name);var e=new n(t,this.geometries,this._center);return e._rect=this._rect,e.transformTo=null,e;},n.prototype.getCenter=function(){return this._center;},n.prototype.setCenter=function(t){this._center=t;},n;}(wC),MC=function(t){function n(e,n){var i=t.call(this,e)||this;return i.type="geoSVG",i._elOnlyForCalculate=n,i;}return e(n,t),n.prototype.getCenter=function(){var t=this._center;return t||(t=this._center=this._calculateCenter()),t;},n.prototype._calculateCenter=function(){for(var t=this._elOnlyForCalculate,e=t.getBoundingRect(),n=[e.x+e.width/2,e.y+e.height/2],i=Fe(bC),r=t;r&&!r.isGeoSVGGraphicRoot;){He(i,r.getLocalTransform(),i),r=r.parent;}return Ye(i,i),ge(n,n,i),n;},n;}(wC),TC=X(["rect","circle","line","ellipse","polygon","polyline","path","text","tspan","g"]),CC=function(){function t(t,e){this.type="geoSVG",this._usedGraphicMap=X(),this._freedGraphics=[],this._mapName=t,this._parsedXML=Gc(e);}return t.prototype.load=function(){var t=this._firstGraphic;if(!t){t=this._firstGraphic=this._buildGraphic(this._parsedXML),this._freedGraphics.push(t),this._boundingRect=this._firstGraphic.boundingRect.clone();var e=ap(t.named),n=e.regions,i=e.regionsMap;this._regions=n,this._regionsMap=i;}return{boundingRect:this._boundingRect,regions:this._regions,regionsMap:this._regionsMap};},t.prototype._buildGraphic=function(t){var e,n;try{e=t&&np(t,{ignoreViewBox:!0,ignoreRootClip:!0})||{},n=e.root,G(null!=n);}catch(i){throw new Error("Invalid svg format\n"+i.message);}var r=new O_();r.add(n),r.isGeoSVGGraphicRoot=!0;var o=e.width,a=e.height,s=e.viewBoxRect,l=this._boundingRect;if(!l){var u=void 0,h=void 0,c=void 0,p=void 0;if(null!=o?(u=0,c=o):s&&(u=s.x,c=s.width),null!=a?(h=0,p=a):s&&(h=s.y,p=s.height),null==u||null==h){var f=n.getBoundingRect();null==u&&(u=f.x,c=f.width),null==h&&(h=f.y,p=f.height);}l=this._boundingRect=new t_(u,h,c,p);}if(s){var d=ep(s,l);n.scaleX=n.scaleY=d.scale,n.x=d.x,n.y=d.y;}r.setClipPath(new vb({shape:l.plain()}));var g=[];return y(e.named,function(t){null!=TC.get(t.svgNodeTagLower)&&(g.push(t),op(t.el));}),{root:r,boundingRect:l,named:g};},t.prototype.useGraphic=function(t){var e=this._usedGraphicMap,n=e.get(t);return n?n:(n=this._freedGraphics.pop()||this._buildGraphic(this._parsedXML),e.set(t,n),n);},t.prototype.freeGraphic=function(t){var e=this._usedGraphicMap,n=e.get(t);n&&(e.removeKey(t),this._freedGraphics.push(n));},t;}(),IC=[126,25],AC=[[[0,3.5],[7,11.2],[15,11.9],[30,7],[42,.7],[52,.7],[56,7.7],[59,.7],[64,.7],[64,0],[5,0],[0,3.5]],[[13,16.1],[19,14.7],[16,21.7],[11,23.1],[13,16.1]],[[12,32.2],[14,38.5],[15,38.5],[13,32.2],[12,32.2]],[[16,47.6],[12,53.2],[13,53.2],[18,47.6],[16,47.6]],[[6,64.4],[8,70],[9,70],[8,64.4],[6,64.4]],[[23,82.6],[29,79.8],[30,79.8],[25,82.6],[23,82.6]],[[37,70.7],[43,62.3],[44,62.3],[39,70.7],[37,70.7]],[[48,51.1],[51,45.5],[53,45.5],[50,51.1],[48,51.1]],[[51,35],[51,28.7],[53,28.7],[53,35],[51,35]],[[52,22.4],[55,17.5],[56,17.5],[53,22.4],[52,22.4]],[[58,12.6],[62,7],[63,7],[60,12.6],[58,12.6]],[[0,3.5],[0,93.1],[64,93.1],[64,0],[63,0],[63,92.4],[1,92.4],[1,3.5],[0,3.5]]],kC=0;kC<AC.length;kC++){for(var DC=0;DC<AC[kC].length;DC++){AC[kC][DC][0]/=10.5,AC[kC][DC][1]/=-14,AC[kC][DC][0]+=IC[0],AC[kC][DC][1]+=IC[1];}}var LC={"南海诸岛":[32,80],"广东":[0,-10],"香港":[10,5],"澳门":[-10,10],"天津":[5,5]},PC={Russia:[100,60],"United States":[-99,38],"United States of America":[-99,38]},OC=[[[123.45165252685547,25.73527164402261],[123.49731445312499,25.73527164402261],[123.49731445312499,25.750734064600884],[123.45165252685547,25.750734064600884],[123.45165252685547,25.73527164402261]]],RC="name",EC=function(){function t(t,e,n){this.type="geoJSON",this._parsedMap=X(),this._mapName=t,this._specialAreas=n,this._geoJSON=gp(e);}return t.prototype.load=function(t,e){e=e||RC;var n=this._parsedMap.get(e);if(!n){var i=this._parseToRegions(e);n=this._parsedMap.set(e,{regions:i,boundingRect:dp(i)});}var r=X(),o=[];return y(n.regions,function(e){var n=e.name;t&&t.hasOwnProperty(n)&&(e=e.cloneShallow(n=t[n])),o.push(e),r.set(n,e);}),{regions:o,boundingRect:n.boundingRect||new t_(0,0,0,0),regionsMap:r};},t.prototype._parseToRegions=function(t){var e,n=this._mapName,i=this._geoJSON;try{e=i?up(i,t):[];}catch(r){throw new Error("Invalid geoJson format\n"+r.message);}return hp(n,e),y(e,function(t){var e=t.name;cp(n,t),pp(n,t),fp(n,t);var i=this._specialAreas&&this._specialAreas[e];i&&t.transformTo(i.left,i.top,i.width,i.height);},this),e;},t.prototype.getMapForUser=function(){return{geoJson:this._geoJSON,geoJSON:this._geoJSON,specialAreas:this._specialAreas};},t;}(),BC=X(),zC={registerMap:function registerMap(t,e,n){if(e.svg){var i=new CC(t,e.svg);BC.set(t,i);}else{var r=e.geoJson||e.geoJSON;r&&!e.features?n=e.specialAreas:r=e;var i=new EC(t,r,n);BC.set(t,i);}},getGeoResource:function getGeoResource(t){return BC.get(t);},getMapForUser:function getMapForUser(t){var e=BC.get(t);return e&&"geoJSON"===e.type&&e.getMapForUser();},load:function load(t,e,n){var i=BC.get(t);if(i)return i.load(e,n);}},NC=G,FC=y,VC=T,HC=k,GC=p,WC="undefined"!=typeof window,UC="5.1.1",YC={zrender:"5.1.0"},XC=1,jC=800,qC=900,ZC=1e3,KC=2e3,$C=5e3,JC=1e3,QC=1100,tI=2e3,eI=3e3,nI=4e3,iI=4500,rI=4600,oI=5e3,aI=6e3,sI=7e3,lI={PROCESSOR:{FILTER:ZC,SERIES_FILTER:jC,STATISTIC:$C},VISUAL:{LAYOUT:JC,PROGRESSIVE_LAYOUT:QC,GLOBAL:tI,CHART:eI,POST_CHART_LAYOUT:rI,COMPONENT:nI,BRUSH:oI,CHART_ITEM:iI,ARIA:aI,DECAL:sI}},uI="__flagInMainProcess",hI="__optionUpdated",cI="__needsUpdateStatus",pI=/^[a-zA-Z0-9_]+$/,fI="__connectUpdateStatus",dI=0,gI=1,yI=2,vI=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n;}(om),mI=vI.prototype;mI.on=vp("on"),mI.off=vp("off");var _I,xI,bI,wI,SI,MI,TI,CI,II,AI,kI,DI,LI,PI,OI,RI,EI,BI,zI,NI,FI,VI=function(t){function n(e,n,i){function r(t,e){return t.__prio-e.__prio;}var o=t.call(this,new ST())||this;o._chartsViews=[],o._chartsMap={},o._componentsViews=[],o._componentsMap={},o._pendingActions=[],i=i||{},"string"==typeof n&&(n=KI[n]),o._dom=e;var a="canvas",l=!1,u=o._zr=pi(e,{renderer:i.renderer||a,devicePixelRatio:i.devicePixelRatio,width:i.width,height:i.height,useDirtyRect:null==i.useDirtyRect?l:i.useDirtyRect});o._throttledZrFlush=xh(qv(u.flush,u),17),n=s(n),n&&pu(n,!0),o._theme=n,o._locale=Vs(i.locale||mS),o._coordSysMgr=new yM();var h=o._api=EI(o);return Jn(ZI,r),Jn(YI,r),o._scheduler=new pT(o,h,YI,ZI),o._messageCenter=new vI(),o._labelManager=new GT(),o._initEvents(),o.resize=qv(o.resize,o),u.animation.on("frame",o._onframe,o),AI(u,o),kI(u,o),U(o),o;}return e(n,t),n.prototype._onframe=function(){if(!this._disposed){FI(this);var t=this._scheduler;if(this[hI]){var e=this[hI].silent;this[uI]=!0,_I(this),wI.update.call(this),this._zr.flush(),this[uI]=!1,this[hI]=!1,CI.call(this,e),II.call(this,e);}else if(t.unfinished){var n=XC,i=this._model,r=this._api;t.unfinished=!1;do{var o=+new Date();t.performSeriesTasks(i),t.performDataProcessorTasks(i),MI(this,i),t.performVisualTasks(i),OI(this,this._model,r,"remain"),n-=+new Date()-o;}while(n>0&&t.unfinished);t.unfinished||this._zr.flush();}}},n.prototype.getDom=function(){return this._dom;},n.prototype.getId=function(){return this.id;},n.prototype.getZr=function(){return this._zr;},n.prototype.setOption=function(t,e,n){if(!this._disposed){var i,r,o;if(HC(e)&&(n=e.lazyUpdate,i=e.silent,r=e.replaceMerge,o=e.transition,e=e.notMerge),this[uI]=!0,!this._model||e){var a=new mM(this._api),s=this._theme,l=this._model=new sM();l.scheduler=this._scheduler,l.init(null,null,null,s,this._locale,a);}this._model.setOption(t,{replaceMerge:r},XI),zI(this,o),n?(this[hI]={silent:i},this[uI]=!1,this.getZr().wakeUp()):(_I(this),wI.update.call(this),this._zr.flush(),this[hI]=!1,this[uI]=!1,CI.call(this,i),II.call(this,i));}},n.prototype.setTheme=function(){console.error("ECharts#setTheme() is DEPRECATED in ECharts 3.0");},n.prototype.getModel=function(){return this._model;},n.prototype.getOption=function(){return this._model&&this._model.getOption();},n.prototype.getWidth=function(){return this._zr.getWidth();},n.prototype.getHeight=function(){return this._zr.getHeight();},n.prototype.getDevicePixelRatio=function(){return this._zr.painter.dpr||WC&&window.devicePixelRatio||1;},n.prototype.getRenderedCanvas=function(t){if(Rv.canvasSupported){t=h({},t||{}),t.pixelRatio=t.pixelRatio||this.getDevicePixelRatio(),t.backgroundColor=t.backgroundColor||this._model.get("backgroundColor");var e=this._zr;return e.painter.getRenderedCanvas(t);}},n.prototype.getSvgDataURL=function(){if(Rv.svgSupported){var t=this._zr,e=t.storage.getDisplayList();return y(e,function(t){t.stopAnimation(null,!0);}),t.painter.toDataURL();}},n.prototype.getDataURL=function(t){if(!this._disposed){t=t||{};var e=t.excludeComponents,n=this._model,i=[],r=this;FC(e,function(t){n.eachComponent({mainType:t},function(t){var e=r._componentsMap[t.__viewId];e.group.ignore||(i.push(e),e.group.ignore=!0);});});var o="svg"===this._zr.painter.getType()?this.getSvgDataURL():this.getRenderedCanvas(t).toDataURL("image/"+(t&&t.type||"png"));return FC(i,function(t){t.group.ignore=!1;}),o;}},n.prototype.getConnectedDataURL=function(t){if(!this._disposed&&Rv.canvasSupported){var e="svg"===t.type,n=this.group,i=Math.min,r=Math.max,o=1/0;if(QI[n]){var a=o,l=o,u=-o,h=-o,c=[],p=t&&t.pixelRatio||this.getDevicePixelRatio();y(JI,function(o){if(o.group===n){var p=e?o.getZr().painter.getSvgDom().innerHTML:o.getRenderedCanvas(s(t)),f=o.getDom().getBoundingClientRect();a=i(f.left,a),l=i(f.top,l),u=r(f.right,u),h=r(f.bottom,h),c.push({dom:p,left:f.left,top:f.top});}}),a*=p,l*=p,u*=p,h*=p;var f=u-a,d=h-l,g=jv(),v=pi(g,{renderer:e?"svg":"canvas"});if(v.resize({width:f,height:d}),e){var m="";return FC(c,function(t){var e=t.left-a,n=t.top-l;m+='<g transform="translate('+e+","+n+')">'+t.dom+"</g>";}),v.painter.getSvgRoot().innerHTML=m,t.connectedBackgroundColor&&v.painter.setBackgroundColor(t.connectedBackgroundColor),v.refreshImmediately(),v.painter.toDataURL();}return t.connectedBackgroundColor&&v.add(new vb({shape:{x:0,y:0,width:f,height:d},style:{fill:t.connectedBackgroundColor}})),FC(c,function(t){var e=new fb({style:{x:t.left*p-a,y:t.top*p-l,image:t.dom}});v.add(e);}),v.refreshImmediately(),g.toDataURL("image/"+(t&&t.type||"png"));}return this.getDataURL(t);}},n.prototype.convertToPixel=function(t,e){return SI(this,"convertToPixel",t,e);},n.prototype.convertFromPixel=function(t,e){return SI(this,"convertFromPixel",t,e);},n.prototype.containPixel=function(t,e){if(!this._disposed){var n,i=this._model,r=ar(i,t);return y(r,function(t,i){i.indexOf("Models")>=0&&y(t,function(t){var r=t.coordinateSystem;if(r&&r.containPoint)n=n||!!r.containPoint(e);else if("seriesModels"===i){var o=this._chartsMap[t.__viewId];o&&o.containPoint&&(n=n||o.containPoint(e,t));}},this);},this),!!n;}},n.prototype.getVisual=function(t,e){var n=this._model,i=ar(n,t,{defaultMainType:"series"}),r=i.seriesModel,o=r.getData(),a=i.hasOwnProperty("dataIndexInside")?i.dataIndexInside:i.hasOwnProperty("dataIndex")?o.indexOfRawIndex(i.dataIndex):null;return null!=a?Eh(o,a,e):Bh(o,e);},n.prototype.getViewOfComponentModel=function(t){return this._componentsMap[t.__viewId];},n.prototype.getViewOfSeriesModel=function(t){return this._chartsMap[t.__viewId];},n.prototype._initEvents=function(){var t=this;FC(GI,function(e){var n=function n(_n2){var i,r=t.getModel(),o=_n2.target,a="globalout"===e;if(a?i={}:o&&sc(o,function(t){var e=Mb(t);if(e&&null!=e.dataIndex){var n=e.dataModel||r.getSeriesByIndex(e.seriesIndex);return i=n&&n.getDataParams(e.dataIndex,e.dataType)||{},!0;}return e.eventData?(i=h({},e.eventData),!0):void 0;},!0),i){var s=i.componentType,l=i.componentIndex;("markLine"===s||"markPoint"===s||"markArea"===s)&&(s="series",l=i.seriesIndex);var u=s&&null!=l&&r.getComponent(s,l),c=u&&t["series"===u.mainType?"_chartsMap":"_componentsMap"][u.__viewId];i.event=_n2,i.type=e,t._$eventProcessor.eventInfo={targetEl:o,packedEvent:i,model:u,view:c},t.trigger(e,i);}};n.zrEventfulCallAtLast=!0,t._zr.on(e,n,t);}),FC(UI,function(e,n){t._messageCenter.on(n,function(t){this.trigger(n,t);},t);}),FC(["selectchanged"],function(e){t._messageCenter.on(e,function(t){this.trigger(e,t);},t);}),ac(this._messageCenter,this,this._api);},n.prototype.isDisposed=function(){return this._disposed;},n.prototype.clear=function(){this._disposed||this.setOption({series:[]},!0);},n.prototype.dispose=function(){if(!this._disposed){this._disposed=!0,ur(this.getDom(),nA,"");var t=this._api,e=this._model;FC(this._componentsViews,function(n){n.dispose(e,t);}),FC(this._chartsViews,function(n){n.dispose(e,t);}),this._zr.dispose(),delete JI[this.id];}},n.prototype.resize=function(t){if(!this._disposed){this._zr.resize(t);var e=this._model;if(this._loadingFX&&this._loadingFX.resize(),e){var n=e.resetOption("media"),i=t&&t.silent;this[uI]=!0,n&&_I(this),wI.update.call(this,{type:"resize",animation:h({duration:0},t&&t.animation)}),this[uI]=!1,CI.call(this,i),II.call(this,i);}}},n.prototype.showLoading=function(t,e){if(!this._disposed&&(HC(t)&&(e=t,t=""),t=t||"default",this.hideLoading(),$I[t])){var n=$I[t](this._api,e),i=this._zr;this._loadingFX=n,i.add(n);}},n.prototype.hideLoading=function(){this._disposed||(this._loadingFX&&this._zr.remove(this._loadingFX),this._loadingFX=null);},n.prototype.makeActionFromEvent=function(t){var e=h({},t);return e.type=UI[t.type],e;},n.prototype.dispatchAction=function(t,e){if(!this._disposed&&(HC(e)||(e={silent:!!e}),WI[t.type]&&this._model)){if(this[uI])return void this._pendingActions.push(t);var n=e.silent;TI.call(this,t,n);var i=e.flush;i?this._zr.flush():i!==!1&&Rv.browser.weChat&&this._throttledZrFlush(),CI.call(this,n),II.call(this,n);}},n.prototype.updateLabelLayout=function(){var t=this._labelManager;t.updateLayoutConfig(this._api),t.layout(this._api),t.processLabelsOverall();},n.prototype.appendData=function(t){if(!this._disposed){var e=t.seriesIndex,n=this.getModel(),i=n.getSeriesByIndex(e);i.appendData(t),this._scheduler.unfinished=!0,this.getZr().wakeUp();}},n.internalField=function(){function t(t){for(var e=[],n=t.currentStates,i=0;i<n.length;i++){var r=n[i];"emphasis"!==r&&"blur"!==r&&"select"!==r&&e.push(r);}t.selected&&t.states.select&&e.push("select"),t.hoverState===Db&&t.states.emphasis?e.push("emphasis"):t.hoverState===kb&&t.states.blur&&e.push("blur"),t.useStates(e);}function n(t,e){var n=t._zr,i=n.storage,r=0;i.traverse(function(t){t.isGroup||r++;}),r>e.get("hoverLayerThreshold")&&!Rv.node&&!Rv.worker&&e.eachSeries(function(e){if(!e.preventUsingHoverLayer){var n=t._chartsMap[e.__viewId];n.__alive&&n.group.traverse(function(t){t.states.emphasis&&(t.states.emphasis.hoverLayer=!0);});}});}function i(t,e){var n=t.get("blendMode")||null;e.group.traverse(function(t){t.isGroup||(t.style.blend=n),t.eachPendingDisplayable&&t.eachPendingDisplayable(function(t){t.style.blend=n;});});}function r(t,e){t.preventAutoZ||o(e.group,t.get("z")||0,t.get("zlevel")||0,-1/0);}function o(t,e,n,i){var r=t.getTextContent(),a=t.getTextGuideLine(),s=t.isGroup;if(s)for(var l=t.childrenRef(),u=0;u<l.length;u++){i=Math.max(o(l[u],e,n,i),i);}else t.z=e,t.zlevel=n,i=Math.max(t.z2,i);if(r&&(r.z=e,r.zlevel=n,isFinite(i)&&(r.z2=i+2)),a){var h=t.textGuideLineConfig;a.z=e,a.zlevel=n,isFinite(i)&&(a.z2=i+(h&&h.showAbove?1:-1));}return i;}function a(t,e){e.group.traverse(function(t){if(!ls(t)){var e=t.getTextContent(),n=t.getTextGuideLine();t.stateTransition&&(t.stateTransition=null),e&&e.stateTransition&&(e.stateTransition=null),n&&n.stateTransition&&(n.stateTransition=null),t.hasState()?(t.prevStates=t.currentStates,t.clearStates()):t.prevStates&&(t.prevStates=null);}});}function s(e,n){var i=e.getModel("stateAnimation"),r=e.isAnimationEnabled(),o=i.get("duration"),a=o>0?{duration:o,delay:i.get("delay"),easing:i.get("easing")}:null;n.group.traverse(function(e){if(e.states&&e.states.emphasis){if(ls(e))return;if(e instanceof lb&&Ca(e),e.__dirty){var n=e.prevStates;n&&e.useStates(n);}if(r){e.stateTransition=a;var i=e.getTextContent(),o=e.getTextGuideLine();i&&(i.stateTransition=a),o&&(o.stateTransition=a);}e.__dirty&&t(e);}});}_I=function _I(t){var e=t._scheduler;e.restorePipelines(t._model),e.prepareStageTasks(),xI(t,!0),xI(t,!1),e.plan();},xI=function xI(t,e){function n(t){var n=t.__requireNewView;t.__requireNewView=!1;var u="_ec_"+t.id+"_"+t.type,h=!n&&a[u];if(!h){var c=fr(t.type),p=e?ZM.getClass(c.main,c.sub):JM.getClass(c.sub);h=new p(),h.init(i,l),a[u]=h,o.push(h),s.add(h.group);}t.__viewId=h.__id=u,h.__alive=!0,h.__model=t,h.group.__ecComponentInfo={mainType:t.mainType,index:t.componentIndex},!e&&r.prepareView(h,t,i,l);}for(var i=t._model,r=t._scheduler,o=e?t._componentsViews:t._chartsViews,a=e?t._componentsMap:t._chartsMap,s=t._zr,l=t._api,u=0;u<o.length;u++){o[u].__alive=!1;}e?i.eachComponent(function(t,e){"series"!==t&&n(e);}):i.eachSeries(n);for(var u=0;u<o.length;){var h=o[u];h.__alive?u++:(!e&&h.renderTask.dispose(),s.remove(h.group),h.dispose(i,l),o.splice(u,1),a[h.__id]===h&&delete a[h.__id],h.__id=h.group.__ecComponentInfo=null);}},bI=function bI(t,e,n,i,r){function o(i){i&&i.__alive&&i[e]&&i[e](i.__model,a,t._api,n);}var a=t._model;if(a.setUpdatePayload(n),!i)return void FC([].concat(t._componentsViews).concat(t._chartsViews),o);var s={};s[i+"Id"]=n[i+"Id"],s[i+"Index"]=n[i+"Index"],s[i+"Name"]=n[i+"Name"];var l={mainType:i,query:s};r&&(l.subType=r);var u,h=n.excludeSeriesId;null!=h&&(u=X(),FC(Vi(h),function(t){var e=Qi(t,null);null!=e&&u.set(e,!0);})),Ta(n)&&la(t._api),a&&a.eachComponent(l,function(e){if(!u||null==u.get(e.id)){if(Ta(n)){if(e instanceof qM)n.type!==Eb||n.notBlur||ca(e,n,t._api);else
{var r=pa(e.mainType,e.componentIndex,n.name,t._api),a=r.focusSelf,s=r.dispatchers;n.type===Eb&&a&&!n.notBlur&&ha(e.mainType,e.componentIndex,t._api),s&&FC(s,function(t){n.type===Eb?ea(t):na(t);});}}else Ma(n)&&e instanceof qM&&(ga(e,n,t._api),ya(e),NI(t));o(t["series"===i?"_chartsMap":"_componentsMap"][e.__viewId]);}},t);},wI={prepareAndUpdate:function prepareAndUpdate(t){_I(this),wI.update.call(this,t);},update:function update(t){var e=this._model,n=this._api,i=this._zr,r=this._coordSysMgr,o=this._scheduler;if(e){e.setUpdatePayload(t),o.restoreData(e,t),o.performSeriesTasks(e),r.create(e,n),o.performDataProcessorTasks(e,t),MI(this,e),r.update(e,n),DI(e),o.performVisualTasks(e,t),LI(this,e,n,t);var a=e.get("backgroundColor")||"transparent",s=e.get("darkMode");if(Rv.canvasSupported)i.setBackgroundColor(a),null!=s&&"auto"!==s&&i.setDarkMode(s);else{var l=on(a);a=dn(l,"rgb"),0===l[3]&&(a="transparent");}RI(e,n);}},updateTransform:function updateTransform(t){var e=this,n=this._model,i=this._api;if(n){n.setUpdatePayload(t);var r=[];n.eachComponent(function(o,a){if("series"!==o){var s=e.getViewOfComponentModel(a);if(s&&s.__alive)if(s.updateTransform){var l=s.updateTransform(a,n,i,t);l&&l.update&&r.push(s);}else r.push(s);}});var o=X();n.eachSeries(function(r){var a=e._chartsMap[r.__viewId];if(a.updateTransform){var s=a.updateTransform(r,n,i,t);s&&s.update&&o.set(r.uid,1);}else o.set(r.uid,1);}),DI(n),this._scheduler.performVisualTasks(n,t,{setDirty:!0,dirtyMap:o}),OI(this,n,i,t,o),RI(n,this._api);}},updateView:function updateView(t){var e=this._model;e&&(e.setUpdatePayload(t),JM.markUpdateMethod(t,"updateView"),DI(e),this._scheduler.performVisualTasks(e,t,{setDirty:!0}),LI(this,this._model,this._api,t),RI(e,this._api));},updateVisual:function updateVisual(t){var e=this,n=this._model;n&&(n.setUpdatePayload(t),n.eachSeries(function(t){t.getData().clearAllVisual();}),JM.markUpdateMethod(t,"updateVisual"),DI(n),this._scheduler.performVisualTasks(n,t,{visualType:"visual",setDirty:!0}),n.eachComponent(function(i,r){if("series"!==i){var o=e.getViewOfComponentModel(r);o&&o.__alive&&o.updateVisual(r,n,e._api,t);}}),n.eachSeries(function(i){var r=e._chartsMap[i.__viewId];r.updateVisual(i,n,e._api,t);}),RI(n,this._api));},updateLayout:function updateLayout(t){wI.update.call(this,t);}},SI=function SI(t,e,n,i){if(!t._disposed)for(var r,o=t._model,a=t._coordSysMgr.getCoordinateSystems(),s=ar(o,n),l=0;l<a.length;l++){var u=a[l];if(u[e]&&null!=(r=u[e](o,s,i)))return r;}},MI=function MI(t,e){var n=t._chartsMap,i=t._scheduler;e.eachSeries(function(t){i.updateStreamModes(t,n[t.__viewId]);});},TI=function TI(t,e){var n=this,i=this.getModel(),r=t.type,o=t.escapeConnect,a=WI[r],s=a.actionInfo,l=(s.update||"update").split(":"),u=l.pop(),p=null!=l[0]&&fr(l[0]);this[uI]=!0;var f=[t],d=!1;t.batch&&(d=!0,f=v(t.batch,function(e){return e=c(h({},e),t),e.batch=null,e;}));var g,y=[],m=Ma(t),_=Ta(t);if(FC(f,function(e){if(g=a.action(e,n._model,n._api),g=g||h({},e),g.type=s.event||g.type,y.push(g),_){var i=sr(t),r=i.queryOptionMap,o=i.mainTypeSpecified,l=o?r.keys()[0]:"series";bI(n,u,e,l),NI(n);}else m?(bI(n,u,e,"series"),NI(n)):p&&bI(n,u,e,p.main,p.sub);}),"none"===u||_||m||p||(this[hI]?(_I(this),wI.update.call(this,t),this[hI]=!1):wI[u].call(this,t)),g=d?{type:s.event||r,escapeConnect:o,batch:y}:y[0],this[uI]=!1,!e){var x=this._messageCenter;if(x.trigger(g.type,g),m){var b={type:"selectchanged",escapeConnect:o,selected:va(i),isFromClick:t.isFromClick||!1,fromAction:t.type,fromActionPayload:t};x.trigger(b.type,b);}}},CI=function CI(t){for(var e=this._pendingActions;e.length;){var n=e.shift();TI.call(this,n,t);}},II=function II(t){!t&&this.trigger("updated");},AI=function AI(t,e){t.on("rendered",function(n){e.trigger("rendered",n),!t.animation.isFinished()||e[hI]||e._scheduler.unfinished||e._pendingActions.length||e.trigger("finished");});},kI=function kI(t,e){t.on("mouseover",function(t){var n=t.target,i=sc(n,wa);i&&(fa(i,t,e._api),NI(e));}).on("mouseout",function(t){var n=t.target,i=sc(n,wa);i&&(da(i,t,e._api),NI(e));}).on("click",function(t){var n=t.target,i=sc(n,function(t){return null!=Mb(t).dataIndex;},!0);if(i){var r=i.selected?"unselect":"select",o=Mb(i);e._api.dispatchAction({type:r,dataType:o.dataType,dataIndexInside:o.dataIndex,seriesIndex:o.seriesIndex,isFromClick:!0});}});},DI=function DI(t){t.clearColorPalette(),t.eachSeries(function(t){t.clearColorPalette();});},LI=function LI(t,e,n,i){PI(t,e,n,i),FC(t._chartsViews,function(t){t.__alive=!1;}),OI(t,e,n,i),FC(t._chartsViews,function(t){t.__alive||t.remove(e,n);});},PI=function PI(t,e,n,i,o){FC(o||t._componentsViews,function(t){var o=t.__model;a(o,t),t.render(o,e,n,i),r(o,t),s(o,t);});},OI=function OI(t,e,o,l,u){var h=t._scheduler,c=t._labelManager;c.clearLabels();var p=!1;e.eachSeries(function(e){var n=t._chartsMap[e.__viewId];n.__alive=!0;var r=n.renderTask;h.updatePayload(r,l),a(e,n),u&&u.get(e.uid)&&r.dirty(),r.perform(h.getPerformArgs(r))&&(p=!0),e.__transientTransitionOpt=null,n.group.silent=!!e.get("silent"),i(e,n),ya(e),c.addLabelsOfSeries(n);}),h.unfinished=p||h.unfinished,c.updateLayoutConfig(o),c.layout(o),c.processLabelsOverall(),e.eachSeries(function(e){var n=t._chartsMap[e.__viewId];r(e,n),s(e,n);}),n(t,e);},RI=function RI(t,e){FC(qI,function(n){n(t,e);});},NI=function NI(t){t[cI]=!0,t.getZr().wakeUp();},FI=function FI(e){e[cI]&&(e.getZr().storage.traverse(function(e){ls(e)||t(e);}),e[cI]=!1);},EI=function EI(t){return new(function(n){function i(){return null!==n&&n.apply(this,arguments)||this;}return e(i,n),i.prototype.getCoordinateSystems=function(){return t._coordSysMgr.getCoordinateSystems();},i.prototype.getComponentByElement=function(e){for(;e;){var n=e.__ecComponentInfo;if(null!=n)return t._model.getComponent(n.mainType,n.index);e=e.parent;}},i.prototype.enterEmphasis=function(e,n){ea(e,n),NI(t);},i.prototype.leaveEmphasis=function(e,n){na(e,n),NI(t);},i.prototype.enterBlur=function(e){ia(e),NI(t);},i.prototype.leaveBlur=function(e){ra(e),NI(t);},i.prototype.enterSelect=function(e){oa(e),NI(t);},i.prototype.leaveSelect=function(e){aa(e),NI(t);},i.prototype.getModel=function(){return t.getModel();},i.prototype.getViewOfComponentModel=function(e){return t.getViewOfComponentModel(e);},i.prototype.getViewOfSeriesModel=function(e){return t.getViewOfSeriesModel(e);},i;}(dM))(t);},BI=function BI(t){function e(t,e){for(var n=0;n<t.length;n++){var i=t[n];i[fI]=e;}}FC(UI,function(n,i){t._messageCenter.on(i,function(n){if(QI[t.group]&&t[fI]!==dI){if(n&&n.escapeConnect)return;var i=t.makeActionFromEvent(n),r=[];FC(JI,function(e){e!==t&&e.group===t.group&&r.push(e);}),e(r,dI),FC(r,function(t){t[fI]!==gI&&t.dispatchAction(i);}),e(r,yI);}});});},zI=function zI(t,e){var n=t._model;y(Vi(e),function(t){var e,i=t.from,r=t.to;null==r&&Fi(e);var o={includeMainTypes:["series"],enableAll:!1,enableNone:!1},a=i?ar(n,i,o):null,s=ar(n,r,o),l=s.seriesModel;null==l&&(e=""),a&&a.seriesModel!==l&&(e=""),null!=e&&Fi(e),l.__transientTransitionOpt={from:i?i.dimension:null,to:r.dimension,dividingMethod:t.dividingMethod};});};}(),n;}(om),HI=VI.prototype;HI.on=yp("on"),HI.off=yp("off"),HI.one=function(t,e,n){function i(){for(var n=[],o=0;o<arguments.length;o++){n[o]=arguments[o];}e&&e.apply&&e.apply(this,n),r.off(t,i);}var r=this;this.on.call(this,t,i,n);};var GI=["click","dblclick","mouseover","mouseout","mousemove","mousedown","mouseup","globalout","contextmenu"],WI={},UI={},YI=[],XI=[],jI=[],qI=[],ZI=[],KI={},$I={},JI={},QI={},tA=+new Date()-0,eA=+new Date()-0,nA="_echarts_instance_",iA=bp,rA=[],oA=Nu;Rp(tI,sT),Rp(iI,uT),Rp(iI,hT),Rp(tI,MT),Rp(iI,TT),Rp(sI,Hc),Cp(pu),Ip(qC,fu),Bp("default",Mh),Dp({type:Eb,event:Eb,update:Eb},K),Dp({type:Bb,event:Bb,update:Bb},K),Dp({type:zb,event:zb,update:zb},K),Dp({type:Nb,event:Nb,update:Nb},K),Dp({type:Fb,event:Fb,update:Fb},K),Tp("light",vT),Tp("dark",wT);var aA,sA,lA,uA,hA,cA,pA,fA,dA,gA,yA,vA,mA,_A,xA={},bA=function(){function t(t,e,n,i,r,o){this._old=t,this._new=e,this._oldKeyGetter=n||Hp,this._newKeyGetter=i||Hp,this.context=r,this._diffModeMultiple="multiple"===o;}return t.prototype.add=function(t){return this._add=t,this;},t.prototype.update=function(t){return this._update=t,this;},t.prototype.updateManyToOne=function(t){return this._updateManyToOne=t,this;},t.prototype.updateOneToMany=function(t){return this._updateOneToMany=t,this;},t.prototype.remove=function(t){return this._remove=t,this;},t.prototype.execute=function(){this[this._diffModeMultiple?"_executeMultiple":"_executeOneToOne"]();},t.prototype._executeOneToOne=function(){var t=this._old,e=this._new,n={},i=new Array(t.length),r=new Array(e.length);this._initIndexMap(t,null,i,"_oldKeyGetter"),this._initIndexMap(e,n,r,"_newKeyGetter");for(var o=0;o<t.length;o++){var a=i[o],s=n[a],l=Vp(s);if(l>1){var u=s.shift();1===s.length&&(n[a]=s[0]),this._update&&this._update(u,o);}else 1===l?(n[a]=null,this._update&&this._update(s,o)):this._remove&&this._remove(o);}this._performRestAdd(r,n);},t.prototype._executeMultiple=function(){var t=this._old,e=this._new,n={},i={},r=[],o=[];this._initIndexMap(t,n,r,"_oldKeyGetter"),this._initIndexMap(e,i,o,"_newKeyGetter");for(var a=0;a<r.length;a++){var s=r[a],l=n[s],u=i[s],h=Vp(l),c=Vp(u);if(h>1&&1===c)this._updateManyToOne&&this._updateManyToOne(u,l),i[s]=null;else if(1===h&&c>1)this._updateOneToMany&&this._updateOneToMany(u,l),i[s]=null;else if(1===h&&1===c)this._update&&this._update(u,l),i[s]=null;else if(h>1)for(var p=0;h>p;p++){this._remove&&this._remove(l[p]);}else this._remove&&this._remove(l);}this._performRestAdd(o,i);},t.prototype._performRestAdd=function(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=e[i],o=Vp(r);if(o>1)for(var a=0;o>a;a++){this._add&&this._add(r[a]);}else 1===o&&this._add&&this._add(r);e[i]=null;}},t.prototype._initIndexMap=function(t,e,n,i){for(var r=this._diffModeMultiple,o=0;o<t.length;o++){var a="_ec_"+this[i](t[o],o);if(r||(n[o]=a),e){var s=e[a],l=Vp(s);0===l?(e[a]=o,r&&n.push(a)):1===l?e[a]=[s,o]:s.push(o);}}},t;}(),wA=function(){function t(t){this.otherDims={},null!=t&&h(this,t);}return t;}(),SA=Math.floor,MA=k,TA=v,CA="undefined",IA=-1,AA="e\x00\x00",kA={"float":typeof Float64Array===CA?Array:Float64Array,"int":typeof Int32Array===CA?Array:Int32Array,ordinal:Array,number:Array,time:Array},DA=typeof Uint32Array===CA?Array:Uint32Array,LA=typeof Int32Array===CA?Array:Int32Array,PA=typeof Uint16Array===CA?Array:Uint16Array,OA=["hasItemOption","_nameList","_idList","_invertedIndicesMap","_rawData","_dimValueGetter","_count","_rawCount","_nameDimIdx","_idDimIdx","_nameRepeatCount"],RA=["_extent","_approximateExtent","_rawExtent"],EA=function(){function t(t,e){this.type="list",this._count=0,this._rawCount=0,this._storage={},this._storageArr=[],this._nameList=[],this._idList=[],this._visual={},this._layout={},this._itemVisuals=[],this._itemLayouts=[],this._graphicEls=[],this._rawExtent={},this._extent={},this._approximateExtent={},this._calculationInfo={},this.hasItemOption=!0,this.TRANSFERABLE_METHODS=["cloneShallow","downSample","lttbDownSample","map"],this.CHANGABLE_METHODS=["filterSelf","selectRange"],this.DOWNSAMPLE_METHODS=["downSample","lttbDownSample"],this.getRawIndex=hA,t=t||["x","y"];for(var n={},i=[],r={},o=0;o<t.length;o++){var a=t[o],s=C(a)?new wA({name:a}):a instanceof wA?a:new wA(a),l=s.name;s.type=s.type||"float",s.coordDim||(s.coordDim=l,s.coordDimIndex=0);var u=s.otherDims=s.otherDims||{};i.push(l),n[l]=s,s.index=o,s.createInvertedIndices&&(r[l]=[]),0===u.itemName&&(this._nameDimIdx=o,this._nameOrdinalMeta=s.ordinalMeta),0===u.itemId&&(this._idDimIdx=o,this._idOrdinalMeta=s.ordinalMeta);}this.dimensions=i,this._dimensionInfos=n,this.hostModel=e,this._dimensionsSummary=Gp(this),this._invertedIndicesMap=r,this.userOutput=this._dimensionsSummary.userOutput;}return t.prototype.getDimension=function(t){return("number"==typeof t||!isNaN(t)&&!this._dimensionInfos.hasOwnProperty(t))&&(t=this.dimensions[t]),t;},t.prototype.getDimensionInfo=function(t){return this._dimensionInfos[this.getDimension(t)];},t.prototype.getDimensionsOnCoord=function(){return this._dimensionsSummary.dataDimsOnCoord.slice();},t.prototype.mapDimension=function(t,e){var n=this._dimensionsSummary;if(null==e)return n.encodeFirstDimNotExtra[t];var i=n.encode[t];return i?i[e]:null;},t.prototype.mapDimensionsAll=function(t){var e=this._dimensionsSummary,n=e.encode[t];return(n||[]).slice();},t.prototype.initData=function(t,e,n){var i=gu(t)||g(t),r=i?new CM(t,this.dimensions.length):t;this._rawData=r;var o=r.getSource().sourceFormat;this._storage={},this._indices=null,this._dontMakeIdFromName=null!=this._idDimIdx||o===KS||!!r.fillStorage,this._nameList=(e||[]).slice(),this._idList=[],this._nameRepeatCount={},n||(this.hasItemOption=!1),this.defaultDimValueGetter=aA[o],this._dimValueGetter=n=n||this.defaultDimValueGetter,this._dimValueGetterArrayRows=aA.arrayRows,this._rawExtent={},this._initDataFromProvider(0,r.count()),r.pure&&(this.hasItemOption=!1);},t.prototype.getProvider=function(){return this._rawData;},t.prototype.appendData=function(t){var e=this._rawData,n=this.count();e.appendData(t);var i=e.count();e.persistent||(i+=n),this._initDataFromProvider(n,i,!0);},t.prototype.appendValues=function(t,e){for(var n=this._storage,i=this.dimensions,r=i.length,o=this._rawExtent,a=this.count(),s=a+Math.max(t.length,e?e.length:0),l=0;r>l;l++){var u=i[l];o[u]||(o[u]=vA()),uA(n,this._dimensionInfos[u],s,!0);}for(var h=TA(i,function(t){return o[t];}),c=this._storageArr=TA(i,function(t){return n[t];}),p=[],f=a;s>f;f++){for(var d=f-a,g=0;r>g;g++){var u=i[g],y=this._dimValueGetterArrayRows(t[d]||p,u,d,g);c[g][f]=y;var v=h[g];y<v[0]&&(v[0]=y),y>v[1]&&(v[1]=y);}e&&(this._nameList[f]=e[d],this._dontMakeIdFromName||dA(this,f));}this._rawCount=this._count=s,this._extent={},sA(this);},t.prototype._initDataFromProvider=function(t,e,n){if(!(t>=e)){for(var i=this._rawData,r=this._storage,o=this.dimensions,a=o.length,s=this._dimensionInfos,l=this._nameList,u=this._idList,h=this._rawExtent,c=i.getSource().sourceFormat,p=c===XS,f=0;a>f;f++){var d=o[f];h[d]||(h[d]=vA()),uA(r,s[d],e,n);}var g=this._storageArr=TA(o,function(t){return r[t];}),y=TA(o,function(t){return h[t];});if(i.fillStorage)i.fillStorage(t,e,g,y);else for(var v=[],m=t;e>m;m++){v=i.getItem(m,v);for(var _=0;a>_;_++){var d=o[_],x=g[_],b=this._dimValueGetter(v,d,m,_);x[m]=b;var w=y[_];b<w[0]&&(w[0]=b),b>w[1]&&(w[1]=b);}if(p&&!i.pure&&v){var S=v.name;null==l[m]&&null!=S&&(l[m]=Qi(S,null));var M=v.id;null==u[m]&&null!=M&&(u[m]=Qi(M,null));}this._dontMakeIdFromName||dA(this,m);}!i.persistent&&i.clean&&i.clean(),this._rawCount=this._count=e,this._extent={},sA(this);}},t.prototype.count=function(){return this._count;},t.prototype.getIndices=function(){var t,e=this._indices;if(e){var n=e.constructor,i=this._count;if(n===Array){t=new n(i);for(var r=0;i>r;r++){t[r]=e[r];}}else t=new n(e.buffer,0,i);}else{var n=lA(this);t=new n(this.count());for(var r=0;r<t.length;r++){t[r]=r;}}return t;},t.prototype.getByDimIdx=function(t,e){if(!(e>=0&&e<this._count))return 0/0;var n=this._storageArr[t];return n?n[this.getRawIndex(e)]:0/0;},t.prototype.get=function(t,e){if(!(e>=0&&e<this._count))return 0/0;var n=this._storage[t];return n?n[this.getRawIndex(e)]:0/0;},t.prototype.getByRawIndex=function(t,e){if(!(e>=0&&e<this._rawCount))return 0/0;var n=this._storage[t];return n?n[e]:0/0;},t.prototype.getValues=function(t,e){var n=[];M(t)||(e=t,t=this.dimensions);for(var i=0,r=t.length;r>i;i++){n.push(this.get(t[i],e));}return n;},t.prototype.hasValue=function(t){for(var e=this._dimensionsSummary.dataDimsOnCoord,n=0,i=e.length;i>n;n++){if(isNaN(this.get(e[n],t)))return!1;}return!0;},t.prototype.getDataExtent=function(t){t=this.getDimension(t);var e=this._storage[t],n=vA();if(!e)return n;var i,r=this.count(),o=!this._indices;if(o)return this._rawExtent[t].slice();if(i=this._extent[t])return i.slice();i=n;for(var a=i[0],s=i[1],l=0;r>l;l++){var u=this.getRawIndex(l),h=e[u];a>h&&(a=h),h>s&&(s=h);}return i=[a,s],this._extent[t]=i,i;},t.prototype.getApproximateExtent=function(t){return t=this.getDimension(t),this._approximateExtent[t]||this.getDataExtent(t);},t.prototype.setApproximateExtent=function(t,e){e=this.getDimension(e),this._approximateExtent[e]=t.slice();},t.prototype.getCalculationInfo=function(t){return this._calculationInfo[t];},t.prototype.setCalculationInfo=function(t,e){MA(t)?h(this._calculationInfo,t):this._calculationInfo[t]=e;},t.prototype.getSum=function(t){var e=this._storage[t],n=0;if(e)for(var i=0,r=this.count();r>i;i++){var o=this.get(t,i);isNaN(o)||(n+=o);}return n;},t.prototype.getMedian=function(t){var e=[];this.each(t,function(t){isNaN(t)||e.push(t);});var n=e.sort(function(t,e){return t-e;}),i=this.count();return 0===i?0:i%2===1?n[(i-1)/2]:(n[i/2]+n[i/2-1])/2;},t.prototype.rawIndexOf=function(t,e){var n=t&&this._invertedIndicesMap[t],i=n[e];return null==i||isNaN(i)?IA:i;},t.prototype.indexOfName=function(t){for(var e=0,n=this.count();n>e;e++){if(this.getName(e)===t)return e;}return-1;},t.prototype.indexOfRawIndex=function(t){if(t>=this._rawCount||0>t)return-1;if(!this._indices)return t;var e=this._indices,n=e[t];if(null!=n&&n<this._count&&n===t)return t;for(var i=0,r=this._count-1;r>=i;){var o=(i+r)/2|0;if(e[o]<t)i=o+1;else{if(!(e[o]>t))return o;r=o-1;}}return-1;},t.prototype.indicesOfNearest=function(t,e,n){var i=this._storage,r=i[t],o=[];if(!r)return o;null==n&&(n=1/0);for(var a=1/0,s=-1,l=0,u=0,h=this.count();h>u;u++){var c=this.getRawIndex(u),p=e-r[c],f=Math.abs(p);n>=f&&((a>f||f===a&&p>=0&&0>s)&&(a=f,s=p,l=0),p===s&&(o[l++]=u));}return o.length=l,o;},t.prototype.getRawDataItem=function(t){if(this._rawData.persistent)return this._rawData.getItem(this.getRawIndex(t));for(var e=[],n=0;n<this.dimensions.length;n++){var i=this.dimensions[n];e.push(this.get(i,t));}return e;},t.prototype.getName=function(t){var e=this.getRawIndex(t),n=this._nameList[e];return null==n&&null!=this._nameDimIdx&&(n=fA(this,this._nameDimIdx,this._nameOrdinalMeta,e)),null==n&&(n=""),n;},t.prototype.getId=function(t){return pA(this,this.getRawIndex(t));},t.prototype.each=function(t,e,n,i){var r=this;if(this._count){"function"==typeof t&&(i=n,n=e,e=t,t=[]);for(var o=n||i||this,a=TA(gA(t),this.getDimension,this),s=a.length,l=TA(a,function(t){return r._dimensionInfos[t].index;}),u=this._storageArr,h=0,c=this.count();c>h;h++){var p=this.getRawIndex(h);switch(s){case 0:e.call(o,h);break;case 1:e.call(o,u[l[0]][p],h);break;case 2:e.call(o,u[l[0]][p],u[l[1]][p],h);break;default:for(var f=0,d=[];s>f;f++){d[f]=u[l[f]][p];}d[f]=h,e.apply(o,d);}}}},t.prototype.filterSelf=function(t,e,n,i){var r=this;if(this._count){"function"==typeof t&&(i=n,n=e,e=t,t=[]);for(var o=n||i||this,a=TA(gA(t),this.getDimension,this),s=this.count(),l=lA(this),u=new l(s),h=[],c=a.length,p=0,f=TA(a,function(t){return r._dimensionInfos[t].index;}),d=f[0],g=this._storageArr,y=0;s>y;y++){var v=void 0,m=this.getRawIndex(y);if(0===c)v=e.call(o,y);else if(1===c){var _=g[d][m];v=e.call(o,_,y);}else{for(var x=0;c>x;x++){h[x]=g[f[x]][m];}h[x]=y,v=e.apply(o,h);}v&&(u[p++]=m);}return s>p&&(this._indices=u),this._count=p,this._extent={},this.getRawIndex=this._indices?cA:hA,this;}},t.prototype.selectRange=function(t){var e=this,n=this._count;if(n){var i=[];for(var r in t){t.hasOwnProperty(r)&&i.push(r);}var o=i.length;if(o){var a=this.count(),s=lA(this),l=new s(a),u=0,h=i[0],c=TA(i,function(t){return e._dimensionInfos[t].index;}),p=t[h][0],f=t[h][1],d=this._storageArr,g=!1;if(!this._indices){var y=0;if(1===o){for(var v=d[c[0]],m=0;n>m;m++){var _=v[m];(_>=p&&f>=_||isNaN(_))&&(l[u++]=y),y++;}g=!0;}else if(2===o){for(var v=d[c[0]],x=d[c[1]],b=t[i[1]][0],w=t[i[1]][1],m=0;n>m;m++){var _=v[m],S=x[m];(_>=p&&f>=_||isNaN(_))&&(S>=b&&w>=S||isNaN(S))&&(l[u++]=y),y++;}g=!0;}}if(!g)if(1===o)for(var m=0;a>m;m++){var M=this.getRawIndex(m),_=d[c[0]][M];(_>=p&&f>=_||isNaN(_))&&(l[u++]=M);}else for(var m=0;a>m;m++){for(var T=!0,M=this.getRawIndex(m),C=0;o>C;C++){var I=i[C],_=d[c[C]][M];(_<t[I][0]||_>t[I][1])&&(T=!1);}T&&(l[u++]=this.getRawIndex(m));}return a>u&&(this._indices=l),this._count=u,this._extent={},this.getRawIndex=this._indices?cA:hA,this;}}},t.prototype.mapArray=function(t,e,n,i){"function"==typeof t&&(i=n,n=e,e=t,t=[]),n=n||i||this;var r=[];return this.each(t,function(){r.push(e&&e.apply(this,arguments));},n),r;},t.prototype.map=function(t,e,n,i){var r=n||i||this,o=TA(gA(t),this.getDimension,this),a=yA(this,o),s=a._storage;a._indices=this._indices,a.getRawIndex=a._indices?cA:hA;for(var l=[],u=o.length,h=this.count(),c=[],p=a._rawExtent,f=0;h>f;f++){for(var d=0;u>d;d++){c[d]=this.get(o[d],f);}c[u]=f;var g=e&&e.apply(r,c);if(null!=g){"object"!=typeof g&&(l[0]=g,g=l);for(var y=this.getRawIndex(f),v=0;v<g.length;v++){var m=o[v],_=g[v],x=p[m],b=s[m];b&&(b[y]=_),_<x[0]&&(x[0]=_),_>x[1]&&(x[1]=_);}}}return a;},t.prototype.downSample=function(t,e,n,i){for(var r=yA(this,[t]),o=r._storage,a=[],s=SA(1/e),l=o[t],u=this.count(),h=r._rawExtent[t],c=new(lA(this))(u),p=0,f=0;u>f;f+=s){s>u-f&&(s=u-f,a.length=s);for(var d=0;s>d;d++){var g=this.getRawIndex(f+d);a[d]=l[g];}var y=n(a),v=this.getRawIndex(Math.min(f+i(a,y)||0,u-1));l[v]=y,y<h[0]&&(h[0]=y),y>h[1]&&(h[1]=y),c[p++]=v;}return r._count=p,r._indices=c,r.getRawIndex=cA,r;},t.prototype.lttbDownSample=function(t,e){var n,i,r,o=yA(this,[]),a=o._storage,s=a[t],l=this.count(),u=new(lA(this))(l),h=0,c=SA(1/e),p=this.getRawIndex(0);u[h++]=p;for(var f=1;l-1>f;f+=c){for(var d=Math.min(f+c,l-1),g=Math.min(f+2*c,l),y=(g+d)/2,v=0,m=d;g>m;m++){var _=this.getRawIndex(m),x=s[_];isNaN(x)||(v+=x);}v/=g-d;var b=f,w=Math.min(f+c,l),S=f-1,M=s[p];n=-1,r=b;for(var m=b;w>m;m++){var _=this.getRawIndex(m),x=s[_];isNaN(x)||(i=Math.abs((S-y)*(x-M)-(S-m)*(v-M)),i>n&&(n=i,r=_));}u[h++]=r,p=r;}return u[h++]=this.getRawIndex(l-1),o._count=h,o._indices=u,o.getRawIndex=cA,o;},t.prototype.getItemModel=function(t){var e=this.hostModel,n=this.getRawDataItem(t);return new uS(n,e,e&&e.ecModel);},t.prototype.diff=function(t){var e=this;return new bA(t?t.getIndices():[],this.getIndices(),function(e){return pA(t,e);},function(t){return pA(e,t);});},t.prototype.getVisual=function(t){var e=this._visual;return e&&e[t];},t.prototype.setVisual=function(t,e){this._visual=this._visual||{},MA(t)?h(this._visual,t):this._visual[t]=e;},t.prototype.getItemVisual=function(t,e){var n=this._itemVisuals[t],i=n&&n[e];return null==i?this.getVisual(e):i;},t.prototype.hasItemVisual=function(){return this._itemVisuals.length>0;},t.prototype.ensureUniqueItemVisual=function(t,e){var n=this._itemVisuals,i=n[t];i||(i=n[t]={});var r=i[e];return null==r&&(r=this.getVisual(e),M(r)?r=r.slice():MA(r)&&(r=h({},r)),i[e]=r),r;},t.prototype.setItemVisual=function(t,e,n){var i=this._itemVisuals[t]||{};this._itemVisuals[t]=i,MA(e)?h(i,e):i[e]=n;},t.prototype.clearAllVisual=function(){this._visual={},this._itemVisuals=[];},t.prototype.setLayout=function(t,e){if(MA(t))for(var n in t){t.hasOwnProperty(n)&&this.setLayout(n,t[n]);}else this._layout[t]=e;},t.prototype.getLayout=function(t){return this._layout[t];},t.prototype.getItemLayout=function(t){return this._itemLayouts[t];},t.prototype.setItemLayout=function(t,e,n){this._itemLayouts[t]=n?h(this._itemLayouts[t]||{},e):e;},t.prototype.clearItemLayouts=function(){this._itemLayouts.length=0;},t.prototype.setItemGraphicEl=function(t,e){var n=this.hostModel;if(e){var i=Mb(e);i.dataIndex=t,i.dataType=this.dataType,i.seriesIndex=n&&n.seriesIndex,"group"===e.type&&e.traverse(mA,e);}this._graphicEls[t]=e;},t.prototype.getItemGraphicEl=function(t){return this._graphicEls[t];},t.prototype.eachItemGraphicEl=function(t,e){y(this._graphicEls,function(n,i){n&&t&&t.call(e,n,i);});},t.prototype.cloneShallow=function(e){if(!e){var n=TA(this.dimensions,this.getDimensionInfo,this);e=new t(n,this.hostModel);}if(e._storage=this._storage,e._storageArr=this._storageArr,_A(e,this),this._indices){var i=this._indices.constructor;if(i===Array){var r=this._indices.length;e._indices=new i(r);for(var o=0;r>o;o++){e._indices[o]=this._indices[o];}}else e._indices=new i(this._indices);}else e._indices=null;return e.getRawIndex=e._indices?cA:hA,e;},t.prototype.wrapMethod=function(t,e){var n=this[t];"function"==typeof n&&(this.__wrappedMethods=this.__wrappedMethods||[],this.__wrappedMethods.push(t),this[t]=function(){var t=n.apply(this,arguments);return e.apply(this,[t].concat(V(arguments)));});},t.internalField=function(){function e(t,e,n,i){return Pu(t[i],this._dimensionInfos[e]);}function n(t){var e=t.constructor;return e===Array?t.slice():new e(t);}aA={arrayRows:e,objectRows:function objectRows(t,e){return Pu(t[e],this._dimensionInfos[e]);},keyedColumns:e,original:function original(t,e,n,i){var r=t&&(null==t.value?t:t.value);return!this._rawData.pure&&Wi(t)&&(this.hasItemOption=!0),Pu(r instanceof Array?r[i]:r,this._dimensionInfos[e]);},typedArray:function typedArray(t,e,n,i){return t[i];}},sA=function sA(t){var e=t._invertedIndicesMap;y(e,function(n,i){var r=t._dimensionInfos[i],o=r.ordinalMeta;if(o){n=e[i]=new LA(o.categories.length);for(var a=0;a<n.length;a++){n[a]=IA;}for(var a=0;a<t._count;a++){n[t.get(i,a)]=a;}}});},fA=function fA(t,e,n,i){var r,o=t._storageArr[e];return o&&(r=o[i],n&&n.categories.length&&(r=n.categories[r])),Qi(r,null);},lA=function lA(t){return t._rawCount>65535?DA:PA;},uA=function uA(t,e,n,i){var r=kA[e.type],o=e.name;if(i){var a=t[o],s=a&&a.length;if(s!==n){for(var l=new r(n),u=0;s>u;u++){l[u]=a[u];}t[o]=l;}}else t[o]=new r(n);},hA=function hA(t){return t;},cA=function cA(t){return t<this._count&&t>=0?this._indices[t]:-1;},pA=function pA(t,e){var n=t._idList[e];return null==n&&null!=t._idDimIdx&&(n=fA(t,t._idDimIdx,t._idOrdinalMeta,e)),null==n&&(n=AA+e),n;},gA=function gA(t){return M(t)||(t=null!=t?[t]:[]),t;},yA=function yA(e,i){var r=e.dimensions,o=new t(TA(r,e.getDimensionInfo,e),e.hostModel);_A(o,e);for(var a=o._storage={},s=e._storage,l=o._storageArr=[],u=0;u<r.length;u++){var h=r[u];s[h]&&(p(i,h)>=0?(a[h]=n(s[h]),o._rawExtent[h]=vA(),o._extent[h]=null):a[h]=s[h],l.push(a[h]));}return o;},vA=function vA(){return[1/0,-1/0];},mA=function mA(t){var e=Mb(t),n=Mb(this);e.seriesIndex=n.seriesIndex,e.dataIndex=n.dataIndex,e.dataType=n.dataType;},_A=function _A(t,e){y(OA.concat(e.__wrappedMethods||[]),function(n){e.hasOwnProperty(n)&&(t[n]=e[n]);}),t.__wrappedMethods=e.__wrappedMethods,y(RA,function(n){t[n]=s(e[n]);}),t._calculationInfo=h({},e._calculationInfo);},dA=function dA(t,e){var n=t._nameList,i=t._idList,r=t._nameDimIdx,o=t._idDimIdx,a=n[e],s=i[e];if(null==a&&null!=r&&(n[e]=a=fA(t,r,t._nameOrdinalMeta,e)),null==s&&null!=o&&(i[e]=s=fA(t,o,t._idOrdinalMeta,e)),null==s&&null!=a){var l=t._nameRepeatCount,u=l[a]=(l[a]||0)+1;s=a,u>1&&(s+="__ec__"+u),i[e]=s;}};}(),t;}(),BA=function(){function t(t){this.coordSysDims=[],this.axisMap=X(),this.categoryAxisMap=X(),this.coordSysName=t;}return t;}(),zA={cartesian2d:function cartesian2d(t,e,n,i){var r=t.getReferringComponents("xAxis",j_).models[0],o=t.getReferringComponents("yAxis",j_).models[0];e.coordSysDims=["x","y"],n.set("x",r),n.set("y",o),$p(r)&&(i.set("x",r),e.firstCategoryDimIndex=0),$p(o)&&(i.set("y",o),null==e.firstCategoryDimIndex&&(e.firstCategoryDimIndex=1));},singleAxis:function singleAxis(t,e,n,i){var r=t.getReferringComponents("singleAxis",j_).models[0];e.coordSysDims=["single"],n.set("single",r),$p(r)&&(i.set("single",r),e.firstCategoryDimIndex=0);},polar:function polar(t,e,n,i){var r=t.getReferringComponents("polar",j_).models[0],o=r.findAxisModel("radiusAxis"),a=r.findAxisModel("angleAxis");e.coordSysDims=["radius","angle"],n.set("radius",o),n.set("angle",a),$p(o)&&(i.set("radius",o),e.firstCategoryDimIndex=0),$p(a)&&(i.set("angle",a),null==e.firstCategoryDimIndex&&(e.firstCategoryDimIndex=1));},geo:function geo(t,e){e.coordSysDims=["lng","lat"];},parallel:function parallel(t,e,n,i){var r=t.ecModel,o=r.getComponent("parallel",t.get("parallelIndex")),a=e.coordSysDims=o.dimensions.slice();y(o.parallelAxisIndex,function(t,o){var s=r.getComponent("parallelAxis",t),l=a[o];n.set(l,s),$p(s)&&(i.set(l,s),null==e.firstCategoryDimIndex&&(e.firstCategoryDimIndex=o));});}},NA=function(){function t(t){this._setting=t||{},this._extent=[1/0,-1/0];}return t.prototype.getSetting=function(t){return this._setting[t];},t.prototype.unionExtent=function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]);},t.prototype.unionExtentFromData=function(t,e){this.unionExtent(t.getApproximateExtent(e));},t.prototype.getExtent=function(){return this._extent.slice();},t.prototype.setExtent=function(t,e){var n=this._extent;isNaN(t)||(n[0]=t),isNaN(e)||(n[1]=e);},t.prototype.isInExtentRange=function(t){return this._extent[0]<=t&&this._extent[1]>=t;},t.prototype.isBlank=function(){return this._isBlank;},t.prototype.setBlank=function(t){this._isBlank=t;},t;}();wr(NA);var FA=function(){function t(t){this.categories=t.categories||[],this._needCollect=t.needCollect,this._deduplication=t.deduplication;}return t.createByAxisModel=function(e){var n=e.option,i=n.data,r=i&&v(i,of);return new t({categories:r,needCollect:!r,deduplication:n.dedplication!==!1});},t.prototype.getOrdinal=function(t){return this._getOrCreateMap().get(t);},t.prototype.parseAndCollect=function(t){var e,n=this._needCollect;if("string"!=typeof t&&!n)return t;if(n&&!this._deduplication)return e=this.categories.length,this.categories[e]=t,e;var i=this._getOrCreateMap();return e=i.get(t),null==e&&(n?(e=this.categories.length,this.categories[e]=t,i.set(t,e)):e=0/0),e;},t.prototype._getOrCreateMap=function(){return this._map||(this._map=X(this.categories));},t;}(),VA=xi,HA=function(t){function n(e){var n=t.call(this,e)||this;n.type="ordinal";var i=n.getSetting("ordinalMeta");return i||(i=new FA({})),M(i)&&(i=new FA({categories:v(i,function(t){return k(t)?t.value:t;})})),n._ordinalMeta=i,n._extent=n.getSetting("extent")||[0,i.categories.length-1],n;}return e(n,t),n.prototype.parse=function(t){return"string"==typeof t?this._ordinalMeta.getOrdinal(t):Math.round(t);},n.prototype.contain=function(t){return t=this.parse(t),hf(t,this._extent)&&null!=this._ordinalMeta.categories[t];},n.prototype.normalize=function(t){return t=this._getTickNumber(this.parse(t)),cf(t,this._extent);},n.prototype.scale=function(t){return t=Math.round(pf(t,this._extent)),this.getRawOrdinalNumber(t);},n.prototype.getTicks=function(){for(var t=[],e=this._extent,n=e[0];n<=e[1];){t.push({value:n}),n++;}return t;},n.prototype.getMinorTicks=function(){},n.prototype.setSortInfo=function(t){if(null==t)return void(this._ordinalNumbersByTick=this._ticksByOrdinalNumber=null);for(var e=t.ordinalNumbers,n=this._ordinalNumbersByTick=[],i=this._ticksByOrdinalNumber=[],r=0,o=this._ordinalMeta.categories.length,a=Math.min(o,e.length);a>r;++r){var s=e[r];n[r]=s,i[s]=r;}for(var l=0;o>r;++r){for(;null!=i[l];){l++;}n.push(l),i[l]=r;}},n.prototype._getTickNumber=function(t){var e=this._ticksByOrdinalNumber;return e&&t>=0&&t<e.length?e[t]:t;},n.prototype.getRawOrdinalNumber=function(t){var e=this._ordinalNumbersByTick;return e&&t>=0&&t<e.length?e[t]:t;},n.prototype.getLabel=function(t){if(!this.isBlank()){var e=this.getRawOrdinalNumber(t.value),n=this._ordinalMeta.categories[e];return null==n?"":n+"";}},n.prototype.count=function(){return this._extent[1]-this._extent[0]+1;},n.prototype.unionExtentFromData=function(t,e){this.unionExtent(t.getApproximateExtent(e));},n.prototype.isInExtentRange=function(t){return t=this._getTickNumber(t),this._extent[0]<=t&&this._extent[1]>=t;},n.prototype.getOrdinalMeta=function(){return this._ordinalMeta;},n.prototype.niceTicks=function(){},n.prototype.niceExtent=function(){},n.type="ordinal",n;}(NA);NA.registerClass(HA);var GA=xi,WA=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type="interval",e._interval=0,e._intervalPrecision=2,e;}return e(n,t),n.prototype.parse=function(t){return t;},n.prototype.contain=function(t){return hf(t,this._extent);},n.prototype.normalize=function(t){return cf(t,this._extent);},n.prototype.scale=function(t){return pf(t,this._extent);},n.prototype.setExtent=function(t,e){var n=this._extent;isNaN(t)||(n[0]=parseFloat(t)),isNaN(e)||(n[1]=parseFloat(e));},n.prototype.unionExtent=function(t){var e=this._extent;t[0]<e[0]&&(e[0]=t[0]),t[1]>e[1]&&(e[1]=t[1]),this.setExtent(e[0],e[1]);},n.prototype.getInterval=function(){return this._interval;},n.prototype.setInterval=function(t){this._interval=t,this._niceExtent=this._extent.slice(),this._intervalPrecision=sf(t);},n.prototype.getTicks=function(t){var e=this._interval,n=this._extent,i=this._niceExtent,r=this._intervalPrecision,o=[];
if(!e)return o;var a=1e4;n[0]<i[0]&&o.push(t?{value:GA(i[0]-e,r)}:{value:n[0]});for(var s=i[0];s<=i[1]&&(o.push({value:s}),s=GA(s+e,r),s!==o[o.length-1].value);){if(o.length>a)return[];}var l=o.length?o[o.length-1].value:i[1];return n[1]>l&&o.push(t?{value:GA(l+e,r)}:{value:n[1]}),o;},n.prototype.getMinorTicks=function(t){for(var e=this.getTicks(!0),n=[],i=this.getExtent(),r=1;r<e.length;r++){for(var o=e[r],a=e[r-1],s=0,l=[],u=o.value-a.value,h=u/t;t-1>s;){var c=GA(a.value+(s+1)*h);c>i[0]&&c<i[1]&&l.push(c),s++;}n.push(l);}return n;},n.prototype.getLabel=function(t,e){if(null==t)return"";var n=e&&e.precision;null==n?n=Si(t.value)||0:"auto"===n&&(n=this._intervalPrecision);var i=GA(t.value,n,!0);return pl(i);},n.prototype.niceTicks=function(t,e,n){t=t||5;var i=this._extent,r=i[1]-i[0];if(isFinite(r)){0>r&&(r=-r,i.reverse());var o=af(i,t,e,n);this._intervalPrecision=o.intervalPrecision,this._interval=o.interval,this._niceExtent=o.niceTickExtent;}},n.prototype.niceExtent=function(t){var e=this._extent;if(e[0]===e[1])if(0!==e[0]){var n=e[0];t.fixMax?e[0]-=n/2:(e[1]+=n/2,e[0]-=n/2);}else e[1]=1;var i=e[1]-e[0];isFinite(i)||(e[0]=0,e[1]=1),this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);var r=this._interval;t.fixMin||(e[0]=GA(Math.floor(e[0]/r)*r)),t.fixMax||(e[1]=GA(Math.ceil(e[1]/r)*r));},n.type="interval",n;}(NA);NA.registerClass(WA);var UA="__ec_stack_",YA=.5,XA="undefined"!=typeof Float32Array?Float32Array:Array,jA={seriesType:"bar",plan:gh(),reset:function reset(t){if(bf(t)&&wf(t)){var e=t.getData(),n=t.coordinateSystem,i=n.master.getRect(),r=n.getBaseAxis(),o=n.getOtherAxis(r),a=e.mapDimension(o.dim),s=e.mapDimension(r.dim),l=o.isHorizontal(),u=l?0:1,h=_f(vf([t]),r,t).width;return h>YA||(h=YA),{progress:function progress(t,e){for(var c,p=t.count,f=new XA(2*p),d=new XA(2*p),g=new XA(p),y=[],v=[],m=0,_=0;null!=(c=t.next());){v[u]=e.get(a,c),v[1-u]=e.get(s,c),y=n.dataToPoint(v,null,y),d[m]=l?i.x+i.width:y[0],f[m++]=y[0],d[m]=l?y[1]:i.y+i.height,f[m++]=y[1],g[_++]=c;}e.setLayout({largePoints:f,largeDataIndices:g,largeBackgroundPoints:d,barWidth:h,valueAxisStart:Sf(r,o,!1),backgroundStart:l?i.x:i.y,valueAxisHorizontal:l});}};}}},qA=function qA(t,e,n,i){for(;i>n;){var r=n+i>>>1;t[r][1]<e?n=r+1:i=r;}return n;},ZA=function(t){function n(e){var n=t.call(this,e)||this;return n.type="time",n;}return e(n,t),n.prototype.getLabel=function(t){var e=this.getSetting("useUTC");return js(t.value,CS[Xs(Us(this._minLevelUnit))]||CS.second,e,this.getSetting("locale"));},n.prototype.getFormattedLabel=function(t,e,n){var i=this.getSetting("useUTC"),r=this.getSetting("locale");return qs(t,e,n,r,i);},n.prototype.getTicks=function(){var t=this._interval,e=this._extent,n=[];if(!t)return n;n.push({value:e[0],level:0});var i=this.getSetting("useUTC"),r=Lf(this._minLevelUnit,this._approxInterval,i,e);return n=n.concat(r),n.push({value:e[1],level:0}),n;},n.prototype.niceExtent=function(t){var e=this._extent;if(e[0]===e[1]&&(e[0]-=wS,e[1]+=wS),e[1]===-1/0&&1/0===e[0]){var n=new Date();e[1]=+new Date(n.getFullYear(),n.getMonth(),n.getDate()),e[0]=e[1]-wS;}this.niceTicks(t.splitNumber,t.minInterval,t.maxInterval);},n.prototype.niceTicks=function(t,e,n){t=t||10;var i=this._extent,r=i[1]-i[0];this._approxInterval=r/t,null!=e&&this._approxInterval<e&&(this._approxInterval=e),null!=n&&this._approxInterval>n&&(this._approxInterval=n);var o=KA.length,a=Math.min(qA(KA,this._approxInterval,0,o),o-1);this._interval=KA[a][1],this._minLevelUnit=KA[Math.max(a-1,0)][0];},n.prototype.parse=function(t){return"number"==typeof t?t:+Ai(t);},n.prototype.contain=function(t){return hf(this.parse(t),this._extent);},n.prototype.normalize=function(t){return cf(this.parse(t),this._extent);},n.prototype.scale=function(t){return pf(t,this._extent);},n.type="time",n;}(WA),KA=[["second",_S],["minute",xS],["hour",bS],["quarter-day",6*bS],["half-day",12*bS],["day",1.2*wS],["half-week",3.5*wS],["week",7*wS],["month",31*wS],["quarter",95*wS],["half-year",SS/2],["year",SS]];NA.registerClass(ZA);var $A=NA.prototype,JA=WA.prototype,QA=Si,tk=xi,ek=Math.floor,nk=Math.ceil,ik=Math.pow,rk=Math.log,ok=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type="log",e.base=10,e._originalScale=new WA(),e._interval=0,e;}return e(n,t),n.prototype.getTicks=function(t){var e=this._originalScale,n=this._extent,i=e.getExtent(),r=JA.getTicks.call(this,t);return v(r,function(t){var e=t.value,r=xi(ik(this.base,e));return r=e===n[0]&&this._fixMin?Pf(r,i[0]):r,r=e===n[1]&&this._fixMax?Pf(r,i[1]):r,{value:r};},this);},n.prototype.setExtent=function(t,e){var n=this.base;t=rk(t)/rk(n),e=rk(e)/rk(n),JA.setExtent.call(this,t,e);},n.prototype.getExtent=function(){var t=this.base,e=$A.getExtent.call(this);e[0]=ik(t,e[0]),e[1]=ik(t,e[1]);var n=this._originalScale,i=n.getExtent();return this._fixMin&&(e[0]=Pf(e[0],i[0])),this._fixMax&&(e[1]=Pf(e[1],i[1])),e;},n.prototype.unionExtent=function(t){this._originalScale.unionExtent(t);var e=this.base;t[0]=rk(t[0])/rk(e),t[1]=rk(t[1])/rk(e),$A.unionExtent.call(this,t);},n.prototype.unionExtentFromData=function(t,e){this.unionExtent(t.getApproximateExtent(e));},n.prototype.niceTicks=function(t){t=t||10;var e=this._extent,n=e[1]-e[0];if(!(1/0===n||0>=n)){var i=ki(n),r=t/n*i;for(.5>=r&&(i*=10);!isNaN(i)&&Math.abs(i)<1&&Math.abs(i)>0;){i*=10;}var o=[xi(nk(e[0]/i)*i),xi(ek(e[1]/i)*i)];this._interval=i,this._niceExtent=o;}},n.prototype.niceExtent=function(t){JA.niceExtent.call(this,t),this._fixMin=t.fixMin,this._fixMax=t.fixMax;},n.prototype.parse=function(t){return t;},n.prototype.contain=function(t){return t=rk(t)/rk(this.base),hf(t,this._extent);},n.prototype.normalize=function(t){return t=rk(t)/rk(this.base),cf(t,this._extent);},n.prototype.scale=function(t){return t=pf(t,this._extent),ik(this.base,t);},n.type="log",n;}(NA),ak=ok.prototype;ak.getMinorTicks=JA.getMinorTicks,ak.getLabel=JA.getLabel,NA.registerClass(ok);var sk=function(){function t(t,e,n){this._prepareParams(t,e,n);}return t.prototype._prepareParams=function(t,e,n){n[1]<n[0]&&(n=[0/0,0/0]),this._dataMin=n[0],this._dataMax=n[1];var i=this._isOrdinal="ordinal"===t.type;this._needCrossZero=e.getNeedCrossZero&&e.getNeedCrossZero();var r=this._modelMinRaw=e.get("min",!0);T(r)?this._modelMinNum=Rf(t,r({min:n[0],max:n[1]})):"dataMin"!==r&&(this._modelMinNum=Rf(t,r));var o=this._modelMaxRaw=e.get("max",!0);if(T(o)?this._modelMaxNum=Rf(t,o({min:n[0],max:n[1]})):"dataMax"!==o&&(this._modelMaxNum=Rf(t,o)),i)this._axisDataLen=e.getCategories().length;else{var a=e.get("boundaryGap"),s=M(a)?a:[a||0,a||0];this._boundaryGapInner="boolean"==typeof s[0]||"boolean"==typeof s[1]?[0,0]:[Nn(s[0],1),Nn(s[1],1)];}},t.prototype.calculate=function(){var t=this._isOrdinal,e=this._dataMin,n=this._dataMax,i=this._axisDataLen,r=this._boundaryGapInner,o=t?null:n-e||Math.abs(e),a="dataMin"===this._modelMinRaw?e:this._modelMinNum,s="dataMax"===this._modelMaxRaw?n:this._modelMaxNum,l=null!=a,u=null!=s;null==a&&(a=t?i?0:0/0:e-r[0]*o),null==s&&(s=t?i?i-1:0/0:n+r[1]*o),(null==a||!isFinite(a))&&(a=0/0),(null==s||!isFinite(s))&&(s=0/0),a>s&&(a=0/0,s=0/0);var h=B(a)||B(s)||t&&!i;this._needCrossZero&&(a>0&&s>0&&!l&&(a=0),0>a&&0>s&&!u&&(s=0));var c=this._determinedMin,p=this._determinedMax;return null!=c&&(a=c,l=!0),null!=p&&(s=p,u=!0),{min:a,max:s,minFixed:l,maxFixed:u,isBlank:h};},t.prototype.modifyDataMinMax=function(t,e){this[uk[t]]=e;},t.prototype.setDeterminedMinMax=function(t,e){var n=lk[t];this[n]=e;},t.prototype.freeze=function(){this.frozen=!0;},t;}(),lk={min:"_determinedMin",max:"_determinedMax"},uk={min:"_dataMin",max:"_dataMax"},hk=function(){function t(){}return t.prototype.getNeedCrossZero=function(){var t=this.option;return!t.scale;},t.prototype.getCoordSysModel=function(){},t;}(),ck={isDimensionStacked:Qp,enableDataStack:Jp,getStackedDimension:tf},pk=(Object.freeze||Object)({createList:jf,getLayoutRect:Sl,dataStack:ck,createScale:qf,mixinAxisModelCommonMethods:Zf,getECData:Mb,createTextStyle:Kf,createDimensions:Zp,createSymbol:uc,enableHoverEmphasis:ma}),fk=[],dk={registerPreprocessor:Cp,registerProcessor:Ip,registerPostInit:Ap,registerPostUpdate:kp,registerAction:Dp,registerCoordinateSystem:Lp,registerLayout:Op,registerVisual:Rp,registerTransform:oA,registerLoading:Bp,registerMap:Np,PRIORITY:lI,ComponentModel:FS,ComponentView:ZM,SeriesModel:qM,ChartView:JM,registerComponentModel:function registerComponentModel(t){FS.registerClass(t);},registerComponentView:function registerComponentView(t){ZM.registerClass(t);},registerSeriesModel:function registerSeriesModel(t){qM.registerClass(t);},registerChartView:function registerChartView(t){JM.registerClass(t);},registerSubTypeDefaulter:function registerSubTypeDefaulter(t,e){FS.registerSubTypeDefaulter(t,e);},registerPainter:function registerPainter(t,e){yi(t,e);}},gk=(Object.freeze||Object)({linearMap:mi,round:xi,asc:bi,getPrecision:wi,getPrecisionSafe:Si,getPixelPrecision:Mi,getPercentWithPrecision:Ti,MAX_SAFE_INTEGER:H_,remRadian:Ci,isRadianAroundZero:Ii,parseDate:Ai,quantity:ki,quantityExponent:Di,nice:Li,quantile:Pi,reformIntervals:Oi,isNumeric:Ei,numericToNumber:Ri}),yk=(Object.freeze||Object)({parse:Ai,format:js}),vk=(Object.freeze||Object)({extendShape:Xa,extendPath:ja,makePath:Ka,makeImage:$a,mergePath:Xw,resizePath:Qa,createIcon:vs,updateProps:is,initProps:rs,getTransform:us,clipPointsByRect:gs,clipRectByRect:ys,registerShape:qa,getShapeClass:Za,Group:O_,Image:fb,Text:bb,Circle:ew,Ellipse:iw,Sector:yw,Ring:mw,Polygon:xw,Polyline:ww,Rect:vb,Line:Tw,BezierCurve:Aw,Arc:Dw,IncrementalDisplayable:Hw,CompoundPath:Lw,LinearGradient:Ow,RadialGradient:Rw,BoundingRect:t_}),mk=(Object.freeze||Object)({addCommas:pl,toCamelCase:fl,normalizeCssArray:kS,encodeHTML:dl,formatTpl:yl,getTooltipMarker:vl,formatTime:ml,capitalFirst:_l,truncateText:Ar,getTextRect:cl}),_k=(Object.freeze||Object)({map:v,each:y,indexOf:p,inherits:f,reduce:m,filter:_,bind:qv,curry:S,isArray:M,isString:C,isObject:k,isFunction:T,extend:h,defaults:c,clone:s,merge:l}),xk=or(),bk=[0,1],wk=function(){function t(t,e,n){this.onBand=!1,this.inverse=!1,this.dim=t,this.scale=e,this._extent=n||[0,0];}return t.prototype.contain=function(t){var e=this._extent,n=Math.min(e[0],e[1]),i=Math.max(e[0],e[1]);return t>=n&&i>=t;},t.prototype.containData=function(t){return this.scale.contain(t);},t.prototype.getExtent=function(){return this._extent.slice();},t.prototype.getPixelPrecision=function(t){return Mi(t||this.scale.getExtent(),this._extent);},t.prototype.setExtent=function(t,e){var n=this._extent;n[0]=t,n[1]=e;},t.prototype.dataToCoord=function(t,e){var n=this._extent,i=this.scale;return t=i.normalize(t),this.onBand&&"ordinal"===i.type&&(n=n.slice(),pd(n,i.count())),mi(t,bk,n,e);},t.prototype.coordToData=function(t,e){var n=this._extent,i=this.scale;this.onBand&&"ordinal"===i.type&&(n=n.slice(),pd(n,i.count()));var r=mi(t,n,bk,e);return this.scale.scale(r);},t.prototype.pointToData=function(){},t.prototype.getTicksCoords=function(t){t=t||{};var e=t.tickModel||this.getTickModel(),n=Qf(this,e),i=n.ticks,r=v(i,function(t){return{coord:this.dataToCoord("ordinal"===this.scale.type?this.scale.getRawOrdinalNumber(t):t),tickValue:t};},this),o=e.get("alignWithLabel");return fd(this,r,o,t.clamp),r;},t.prototype.getMinorTicksCoords=function(){if("ordinal"===this.scale.type)return[];var t=this.model.getModel("minorTick"),e=t.get("splitNumber");e>0&&100>e||(e=5);var n=this.scale.getMinorTicks(e),i=v(n,function(t){return v(t,function(t){return{coord:this.dataToCoord(t),tickValue:t};},this);},this);return i;},t.prototype.getViewLabels=function(){return Jf(this).labels;},t.prototype.getLabelModel=function(){return this.model.getModel("axisLabel");},t.prototype.getTickModel=function(){return this.model.getModel("axisTick");},t.prototype.getBandWidth=function(){var t=this._extent,e=this.scale.getExtent(),n=e[1]-e[0]+(this.onBand?1:0);0===n&&(n=1);var i=Math.abs(t[1]-t[0]);return Math.abs(i)/n;},t.prototype.calculateCategoryInterval=function(){return ld(this);},t;}(),Sk=function(t){function n(e,n,i){var r=t.call(this)||this;r.motionBlur=!1,r.lastFrameAlpha=.7,r.dpr=1,r.virtual=!1,r.config={},r.incremental=!1,r.zlevel=0,r.maxRepaintRectCount=5,r.__dirty=!0,r.__firstTimePaint=!0,r.__used=!1,r.__drawIndex=0,r.__startIndex=0,r.__endIndex=0,r.__prevStartIndex=null,r.__prevEndIndex=null;var o;i=i||o_,"string"==typeof e?o=_d(e,n,i):k(e)&&(o=e,e=o.id),r.id=e,r.dom=o;var a=o.style;return a&&(o.onselectstart=md,a.webkitUserSelect="none",a.userSelect="none",a.webkitTapHighlightColor="rgba(0,0,0,0)",a["-webkit-touch-callout"]="none",a.padding="0",a.margin="0",a.borderWidth="0"),r.domBack=null,r.ctxBack=null,r.painter=n,r.config=null,r.dpr=i,r;}return e(n,t),n.prototype.getElementCount=function(){return this.__endIndex-this.__startIndex;},n.prototype.afterBrush=function(){this.__prevStartIndex=this.__startIndex,this.__prevEndIndex=this.__endIndex;},n.prototype.initContext=function(){this.ctx=this.dom.getContext("2d"),this.ctx.dpr=this.dpr;},n.prototype.setUnpainted=function(){this.__firstTimePaint=!0;},n.prototype.createBackBuffer=function(){var t=this.dpr;this.domBack=_d("back-"+this.id,this.painter,t),this.ctxBack=this.domBack.getContext("2d"),1!==t&&this.ctxBack.scale(t,t);},n.prototype.createRepaintRects=function(t,e,n,i){function r(t){if(t.isFinite()&&!t.isZero())if(0===o.length){var e=new t_(0,0,0,0);e.copy(t),o.push(e);}else{for(var n=!1,i=1/0,r=0,u=0;u<o.length;++u){var h=o[u];if(h.intersect(t)){var c=new t_(0,0,0,0);c.copy(h),c.union(t),o[u]=c,n=!0;break;}if(s){l.copy(t),l.union(h);var p=t.width*t.height,f=h.width*h.height,d=l.width*l.height,g=d-p-f;i>g&&(i=g,r=u);}}if(s&&(o[r].union(t),n=!0),!n){var e=new t_(0,0,0,0);e.copy(t),o.push(e);}s||(s=o.length>=a);}}if(this.__firstTimePaint)return this.__firstTimePaint=!1,null;for(var o=[],a=this.maxRepaintRectCount,s=!1,l=new t_(0,0,0,0),u=this.__startIndex;u<this.__endIndex;++u){var h=t[u];if(h){var c=h.shouldBePainted(n,i,!0,!0),p=h.__isRendered&&(h.__dirty&g_.REDARAW_BIT||!c)?h.getPrevPaintRect():null;p&&r(p);var f=c&&(h.__dirty&g_.REDARAW_BIT||!h.__isRendered)?h.getPaintRect():null;f&&r(f);}}for(var u=this.__prevStartIndex;u<this.__prevEndIndex;++u){var h=e[u],c=h.shouldBePainted(n,i,!0,!0);if(h&&(!c||!h.__zr)&&h.__isRendered){var p=h.getPrevPaintRect();p&&r(p);}}var d;do{d=!1;for(var u=0;u<o.length;){if(o[u].isZero())o.splice(u,1);else{for(var g=u+1;g<o.length;){o[u].intersect(o[g])?(d=!0,o[u].union(o[g]),o.splice(g,1)):g++;}u++;}}}while(d);return this._paintRects=o,o;},n.prototype.debugGetPaintRects=function(){return(this._paintRects||[]).slice();},n.prototype.resize=function(t,e){var n=this.dpr,i=this.dom,r=i.style,o=this.domBack;r&&(r.width=t+"px",r.height=e+"px"),i.width=t*n,i.height=e*n,o&&(o.width=t*n,o.height=e*n,1!==n&&this.ctxBack.scale(n,n));},n.prototype.clear=function(t,e,n){function i(t,n,i,r){if(o.clearRect(t,n,i,r),e&&"transparent"!==e){var a=void 0;O(e)?(a=e.__canvasGradient||pc(o,e,{x:0,y:0,width:i,height:r}),e.__canvasGradient=a):R(e)&&(a=_c(o,e,{dirty:function dirty(){c.setUnpainted(),c.__painter.refresh();}})),o.save(),o.fillStyle=a||e,o.fillRect(t,n,i,r),o.restore();}l&&(o.save(),o.globalAlpha=u,o.drawImage(p,t,n,i,r),o.restore());}var r=this.dom,o=this.ctx,a=r.width,s=r.height;e=e||this.clearColor;var l=this.motionBlur&&!t,u=this.lastFrameAlpha,h=this.dpr,c=this;l&&(this.domBack||this.createBackBuffer(),this.ctxBack.globalCompositeOperation="copy",this.ctxBack.drawImage(r,0,0,a/h,s/h));var p=this.domBack;!n||l?i(0,0,a,s):n.length&&y(n,function(t){i(t.x*h,t.y*h,t.width*h,t.height*h);});},n;}(om),Mk=1e5,Tk=314159,Ck=.01,Ik=.001,Ak=function(){function t(t,e,n){this.type="canvas",this._zlevelList=[],this._prevDisplayList=[],this._layers={},this._layerConfig={},this._needsManuallyCompositing=!1,this.type="canvas";var i=!t.nodeName||"CANVAS"===t.nodeName.toUpperCase();this._opts=n=h({},n||{}),this.dpr=n.devicePixelRatio||o_,this._singleCanvas=i,this.root=t;var r=t.style;r&&(r.webkitTapHighlightColor="transparent",r.webkitUserSelect="none",r.userSelect="none",r["-webkit-touch-callout"]="none",t.innerHTML=""),this.storage=e;var o=this._zlevelList;this._prevDisplayList=[];var a=this._layers;if(i){var s=t,l=s.width,u=s.height;null!=n.width&&(l=n.width),null!=n.height&&(u=n.height),this.dpr=n.devicePixelRatio||1,s.width=l*this.dpr,s.height=u*this.dpr,this._width=l,this._height=u;var c=new Sk(s,this,this.dpr);c.__builtin__=!0,c.initContext(),a[Tk]=c,c.zlevel=Tk,o.push(Tk),this._domRoot=t;}else{this._width=this._getSize(0),this._height=this._getSize(1);var p=this._domRoot=wd(this._width,this._height);t.appendChild(p);}}return t.prototype.getType=function(){return"canvas";},t.prototype.isSingleCanvas=function(){return this._singleCanvas;},t.prototype.getViewportRoot=function(){return this._domRoot;},t.prototype.getViewportRootOffset=function(){var t=this.getViewportRoot();return t?{offsetLeft:t.offsetLeft||0,offsetTop:t.offsetTop||0}:void 0;},t.prototype.refresh=function(t){var e=this.storage.getDisplayList(!0),n=this._prevDisplayList,i=this._zlevelList;this._redrawId=Math.random(),this._paintList(e,n,t,this._redrawId);for(var r=0;r<i.length;r++){var o=i[r],a=this._layers[o];if(!a.__builtin__&&a.refresh){var s=0===r?this._backgroundColor:null;a.refresh(s);}}return this._opts.useDirtyRect&&(this._prevDisplayList=e.slice()),this;},t.prototype.refreshHover=function(){this._paintHoverList(this.storage.getDisplayList(!1));},t.prototype._paintHoverList=function(t){var e=t.length,n=this._hoverlayer;if(n&&n.clear(),e){for(var i,r={inHover:!0,viewWidth:this._width,viewHeight:this._height},o=0;e>o;o++){var a=t[o];a.__inHover&&(n||(n=this._hoverlayer=this.getLayer(Mk)),i||(i=n.ctx,i.save()),Oc(i,a,r,o===e-1));}i&&i.restore();}},t.prototype.getHoverLayer=function(){return this.getLayer(Mk);},t.prototype.paintOne=function(t,e){Pc(t,e);},t.prototype._paintList=function(t,e,n,i){if(this._redrawId===i){n=n||!1,this._updateLayerStatus(t);var r=this._doPaintList(t,e,n),o=r.finished,a=r.needsRefreshHover;if(this._needsManuallyCompositing&&this._compositeManually(),a&&this._paintHoverList(t),o)this.eachLayer(function(t){t.afterBrush&&t.afterBrush();});else{var s=this;b_(function(){s._paintList(t,e,n,i);});}}},t.prototype._compositeManually=function(){var t=this.getLayer(Tk).ctx,e=this._domRoot.width,n=this._domRoot.height;t.clearRect(0,0,e,n),this.eachBuiltinLayer(function(i){i.virtual&&t.drawImage(i.dom,0,0,e,n);});},t.prototype._doPaintList=function(t,e,n){for(var i=this,r=[],o=this._opts.useDirtyRect,a=0;a<this._zlevelList.length;a++){var s=this._zlevelList[a],l=this._layers[s];l.__builtin__&&l!==this._hoverlayer&&(l.__dirty||n)&&r.push(l);}for(var u=!0,h=!1,c=function c(a){var s=r[a],l=s.ctx,c=o&&s.createRepaintRects(t,e,p._width,p._height);l.save();var f=n?s.__startIndex:s.__drawIndex,d=!n&&s.incremental&&Date.now,g=d&&Date.now(),y=s.zlevel===p._zlevelList[0]?p._backgroundColor:null;if(s.__startIndex===s.__endIndex)s.clear(!1,y,c);else if(f===s.__startIndex){var v=t[f];v.incremental&&v.notClear&&!n||s.clear(!1,y,c);}-1===f&&(console.error("For some unknown reason. drawIndex is -1"),f=s.__startIndex);var m,_=function _(e){var n={inHover:!1,allClipped:!1,prevEl:null,viewWidth:i._width,viewHeight:i._height};for(m=f;m<s.__endIndex;m++){var r=t[m];if(r.__inHover&&(h=!0),i._doPaintEl(r,s,o,e,n,m===s.__endIndex-1),d){var a=Date.now()-g;if(a>15)break;}}n.prevElClipPaths&&l.restore();};if(c){if(0===c.length)m=s.__endIndex;else for(var x=p.dpr,b=0;b<c.length;++b){var w=c[b];l.save(),l.beginPath(),l.rect(w.x*x,w.y*x,w.width*x,w.height*x),l.clip(),_(w),l.restore();}}else l.save(),_(),l.restore();s.__drawIndex=m,s.__drawIndex<s.__endIndex&&(u=!1);},p=this,f=0;f<r.length;f++){c(f);}return Rv.wxa&&y(this._layers,function(t){t&&t.ctx&&t.ctx.draw&&t.ctx.draw();}),{finished:u,needsRefreshHover:h};},t.prototype._doPaintEl=function(t,e,n,i,r,o){var a=e.ctx;if(n){var s=t.getPaintRect();(!i||s&&s.intersect(i))&&(Oc(a,t,r,o),t.setPrevPaintRect(s));}else Oc(a,t,r,o);},t.prototype.getLayer=function(t,e){this._singleCanvas&&!this._needsManuallyCompositing&&(t=Tk);var n=this._layers[t];return n||(n=new Sk("zr_"+t,this,this.dpr),n.zlevel=t,n.__builtin__=!0,this._layerConfig[t]?l(n,this._layerConfig[t],!0):this._layerConfig[t-Ck]&&l(n,this._layerConfig[t-Ck],!0),e&&(n.virtual=e),this.insertLayer(t,n),n.initContext()),n;},t.prototype.insertLayer=function(t,e){var n=this._layers,i=this._zlevelList,r=i.length,o=this._domRoot,s=null,l=-1;if(n[t])return void a("ZLevel "+t+" has been used already");if(!bd(e))return void a("Layer of zlevel "+t+" is not valid");if(r>0&&t>i[0]){for(l=0;r-1>l&&!(i[l]<t&&i[l+1]>t);l++){;}s=n[i[l]];}if(i.splice(l+1,0,t),n[t]=e,!e.virtual)if(s){var u=s.dom;u.nextSibling?o.insertBefore(e.dom,u.nextSibling):o.appendChild(e.dom);}else o.firstChild?o.insertBefore(e.dom,o.firstChild):o.appendChild(e.dom);e.__painter=this;},t.prototype.eachLayer=function(t,e){for(var n=this._zlevelList,i=0;i<n.length;i++){var r=n[i];t.call(e,this._layers[r],r);}},t.prototype.eachBuiltinLayer=function(t,e){for(var n=this._zlevelList,i=0;i<n.length;i++){var r=n[i],o=this._layers[r];o.__builtin__&&t.call(e,o,r);}},t.prototype.eachOtherLayer=function(t,e){for(var n=this._zlevelList,i=0;i<n.length;i++){var r=n[i],o=this._layers[r];o.__builtin__||t.call(e,o,r);}},t.prototype.getLayers=function(){return this._layers;},t.prototype._updateLayerStatus=function(t){function e(t){s&&(s.__endIndex!==t&&(s.__dirty=!0),s.__endIndex=t);}if(this.eachBuiltinLayer(function(t){t.__dirty=t.__used=!1;}),this._singleCanvas)for(var n=1;n<t.length;n++){var i=t[n];if(i.zlevel!==t[n-1].zlevel||i.incremental){this._needsManuallyCompositing=!0;break;}}var r,o,s=null,l=0;for(o=0;o<t.length;o++){var i=t[o],u=i.zlevel,h=void 0;r!==u&&(r=u,l=0),i.incremental?(h=this.getLayer(u+Ik,this._needsManuallyCompositing),h.incremental=!0,l=1):h=this.getLayer(u+(l>0?Ck:0),this._needsManuallyCompositing),h.__builtin__||a("ZLevel "+u+" has been used by unkown layer "+h.id),h!==s&&(h.__used=!0,h.__startIndex!==o&&(h.__dirty=!0),h.__startIndex=o,h.__drawIndex=h.incremental?-1:o,e(o),s=h),i.__dirty&g_.REDARAW_BIT&&!i.__inHover&&(h.__dirty=!0,h.incremental&&h.__drawIndex<0&&(h.__drawIndex=o));}e(o),this.eachBuiltinLayer(function(t){!t.__used&&t.getElementCount()>0&&(t.__dirty=!0,t.__startIndex=t.__endIndex=t.__drawIndex=0),t.__dirty&&t.__drawIndex<0&&(t.__drawIndex=t.__startIndex);});},t.prototype.clear=function(){return this.eachBuiltinLayer(this._clearLayer),this;},t.prototype._clearLayer=function(t){t.clear();},t.prototype.setBackgroundColor=function(t){this._backgroundColor=t,y(this._layers,function(t){t.setUnpainted();});},t.prototype.configLayer=function(t,e){if(e){var n=this._layerConfig;n[t]?l(n[t],e,!0):n[t]=e;for(var i=0;i<this._zlevelList.length;i++){var r=this._zlevelList[i];if(r===t||r===t+Ck){var o=this._layers[r];l(o,n[t],!0);}}}},t.prototype.delLayer=function(t){var e=this._layers,n=this._zlevelList,i=e[t];i&&(i.dom.parentNode.removeChild(i.dom),delete e[t],n.splice(p(n,t),1));},t.prototype.resize=function(t,e){if(this._domRoot.style){var n=this._domRoot;n.style.display="none";var i=this._opts;if(null!=t&&(i.width=t),null!=e&&(i.height=e),t=this._getSize(0),e=this._getSize(1),n.style.display="",this._width!==t||e!==this._height){n.style.width=t+"px",n.style.height=e+"px";for(var r in this._layers){this._layers.hasOwnProperty(r)&&this._layers[r].resize(t,e);}this.refresh(!0);}this._width=t,this._height=e;}else{if(null==t||null==e)return;this._width=t,this._height=e,this.getLayer(Tk).resize(t,e);}return this;},t.prototype.clearLayer=function(t){var e=this._layers[t];e&&e.clear();},t.prototype.dispose=function(){this.root.innerHTML="",this.root=this.storage=this._domRoot=this._layers=null;},t.prototype.getRenderedCanvas=function(t){if(t=t||{},this._singleCanvas&&!this._compositeManually)return this._layers[Tk].dom;var e=new Sk("image",this,t.pixelRatio||this.dpr);e.initContext(),e.clear(!1,t.backgroundColor||this._backgroundColor);var n=e.ctx;if(t.pixelRatio<=this.dpr){this.refresh();var i=e.dom.width,r=e.dom.height;this.eachLayer(function(t){t.__builtin__?n.drawImage(t.dom,0,0,i,r):t.renderToCanvas&&(n.save(),t.renderToCanvas(n),n.restore());});}else for(var o={inHover:!1,viewWidth:this._width,viewHeight:this._height},a=this.storage.getDisplayList(!0),s=0,l=a.length;l>s;s++){var u=a[s];Oc(n,u,o,s===l-1);}return e.dom;},t.prototype.getWidth=function(){return this._width;},t.prototype.getHeight=function(){return this._height;},t.prototype._getSize=function(t){var e=this._opts,n=["width","height"][t],i=["clientWidth","clientHeight"][t],r=["paddingLeft","paddingTop"][t],o=["paddingRight","paddingBottom"][t];if(null!=e[n]&&"auto"!==e[n])return parseFloat(e[n]);var a=this.root,s=document.defaultView.getComputedStyle(a);return(a[i]||xd(s[n])||xd(a.style[n]))-(xd(s[r])||0)-(xd(s[o])||0)|0;},t.prototype.pathToImage=function(t,e){e=e||this.dpr;var n=document.createElement("canvas"),i=n.getContext("2d"),r=t.getBoundingRect(),o=t.style,a=o.shadowBlur*e,s=o.shadowOffsetX*e,l=o.shadowOffsetY*e,u=t.hasStroke()?o.lineWidth:0,c=Math.max(u/2,-s+a),p=Math.max(u/2,s+a),f=Math.max(u/2,-l+a),d=Math.max(u/2,l+a),g=r.width+c+p,y=r.height+f+d;n.width=g*e,n.height=y*e,i.scale(e,e),i.clearRect(0,0,g,y),i.dpr=e;var v={x:t.x,y:t.y,scaleX:t.scaleX,scaleY:t.scaleY,rotation:t.rotation,originX:t.originX,originY:t.originY};t.x=c-r.x,t.y=f-r.y,t.rotation=0,t.scaleX=1,t.scaleY=1,t.updateTransform(),t&&Oc(i,t,{inHover:!1,viewWidth:this._width,viewHeight:this._height},!0);var m=new fb({style:{x:0,y:0,image:n}});return h(t,v),m;},t;}(),kk=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type="dataset",e;}return e(n,t),n.prototype.init=function(e,n,i){t.prototype.init.call(this,e,n,i),this._sourceManager=new HM(this),Gu(this);},n.prototype.mergeOption=function(e,n){t.prototype.mergeOption.call(this,e,n),Gu(this);},n.prototype.optionUpdated=function(){this._sourceManager.dirty();},n.prototype.getSourceManager=function(){return this._sourceManager;},n.type="dataset",n.defaultOption={seriesLayoutBy:JS},n;}(FS),Dk=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type="dataset",e;}return e(n,t),n.type="dataset",n;}(ZM);$f([Sd,Md]);var Lk={average:function average(t){for(var e=0,n=0,i=0;i<t.length;i++){isNaN(t[i])||(e+=t[i],n++);}return 0===n?0/0:e/n;},sum:function sum(t){for(var e=0,n=0;n<t.length;n++){e+=t[n]||0;}return e;},max:function max(t){for(var e=-1/0,n=0;n<t.length;n++){t[n]>e&&(e=t[n]);}return isFinite(e)?e:0/0;},min:function min(t){for(var e=1/0,n=0;n<t.length;n++){t[n]<e&&(e=t[n]);}return isFinite(e)?e:0/0;},nearest:function nearest(t){return t[0];}},Pk=function Pk(t){return Math.round(t.length/2);},Ok=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.prototype.getInitialData=function(){return ef(this.getSource(),this,{useEncodeDefaulter:!0});},n.prototype.getMarkerPosition=function(t){var e=this.coordinateSystem;if(e){var n=e.dataToPoint(e.clampData(t)),i=this.getData(),r=i.getLayout("offset"),o=i.getLayout("size"),a=e.getBaseAxis().isHorizontal()?0:1;return n[a]+=r+o/2,n;}return[0/0,0/0];},n.type="series.__base_bar__",n.defaultOption={zlevel:0,z:2,coordinateSystem:"cartesian2d",legendHoverLink:!0,barMinHeight:0,barMinAngle:0,large:!1,largeThreshold:400,progressive:3e3,progressiveChunkMode:"mod"},n;}(qM);qM.registerClass(Ok);var Rk=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.prototype.getInitialData=function(){return ef(this.getSource(),this,{useEncodeDefaulter:!0,createInvertedIndices:!!this.get("realtimeSort",!0)||null});},n.prototype.getProgressive=function(){return this.get("large")?this.get("progressive"):!1;},n.prototype.getProgressiveThreshold=function(){var t=this.get("progressiveThreshold"),e=this.get("largeThreshold");return e>t&&(t=e),t;},n.prototype.brushSelector=function(t,e,n){return n.rect(e.getItemLayout(t));},n.type="series.bar",n.dependencies=["grid","polar"],n.defaultOption=Ns(Ok.defaultOption,{clip:!0,roundCap:!1,showBackground:!1,backgroundStyle:{color:"rgba(180, 180, 180, 0.2)",borderColor:null,borderWidth:0,borderType:"solid",borderRadius:0,shadowBlur:0,shadowColor:null,shadowOffsetX:0,shadowOffsetY:0,opacity:1},select:{itemStyle:{borderColor:"#212121"}},realtimeSort:!1}),n;}(Ok),Ek=function(){function t(){this.cx=0,this.cy=0,this.r0=0,this.r=0,this.startAngle=0,this.endAngle=2*Math.PI,this.clockwise=!0;}return t;}(),Bk=function(t){function n(e){var n=t.call(this,e)||this;return n.type="sausage",n;}return e(n,t),n.prototype.getDefaultShape=function(){return new Ek();},n.prototype.buildPath=function(t,e){var n=e.cx,i=e.cy,r=Math.max(e.r0||0,0),o=Math.max(e.r,0),a=.5*(o-r),s=r+a,l=e.startAngle,u=e.endAngle,h=e.clockwise,c=Math.cos(l),p=Math.sin(l),f=Math.cos(u),d=Math.sin(u),g=h?u-l<2*Math.PI:l-u<2*Math.PI;g&&(t.moveTo(c*r+n,p*r+i),t.arc(c*s+n,p*s+i,a,-Math.PI+l,l,!h)),t.arc(n,i,o,l,u,!h),t.moveTo(f*o+n,d*o+i),t.arc(f*s+n,d*s+i,a,u-2*Math.PI,u-Math.PI,!h),0!==r&&(t.arc(n,i,r,u,l,h),t.moveTo(c*r+n,d*r+i)),t.closePath();},n;}(lb),zk=[0,0],Nk=Math.max,Fk=Math.min,Vk=function(t){function n(){var e=t.call(this)||this;return e.type=n.type,e._isFirstFrame=!0,e;}return e(n,t),n.prototype.render=function(t,e,n,i){this._model=t,this._removeOnRenderedListener(n),this._updateDrawMode(t);var r=t.get("coordinateSystem");("cartesian2d"===r||"polar"===r)&&(this._isLargeDraw?this._renderLarge(t,e,n):this._renderNormal(t,e,n,i));},n.prototype.incrementalPrepareRender=function(t){this._clear(),this._updateDrawMode(t),this._updateLargeClip(t);},n.prototype.incrementalRender=function(t,e){this._incrementalRenderLarge(t,e);},n.prototype._updateDrawMode=function(t){var e=t.pipelineContext.large;(null==this._isLargeDraw||e!==this._isLargeDraw)&&(this._isLargeDraw=e,this._clear());},n.prototype._renderNormal=function(t,e,n,i){function r(t){var e=Wk[u.type](s,t),n=Wd(u,o,e);return n.useStyle(v.getItemStyle()),"cartesian2d"===u.type&&n.setShape("r",m),_[t]=n,n;}var o,a=this.group,s=t.getData(),l=this._data,u=t.coordinateSystem,h=u.getBaseAxis();"cartesian2d"===u.type?o=h.isHorizontal():"polar"===u.type&&(o="angle"===h.dim);var c=t.isAnimationEnabled()?t:null,p=Od(t,u);p&&this._enableRealtimeSort(p,s,n);var f=t.get("clip",!0)||p,d=Pd(u,s);a.removeClipPath();var g=t.get("roundCap",!0),y=t.get("showBackground",!0),v=t.getModel("backgroundStyle"),m=v.get("borderRadius")||0,_=[],x=this._backgroundEls,b=i&&i.isInitSort,w=i&&"changeAxisOrder"===i.type;s.diff(l).add(function(e){var n=s.getItemModel(e),i=Wk[u.type](s,e,n);if(y&&r(e),s.hasValue(e)){var l=!1;f&&(l=Hk[u.type](d,i));var v=Gk[u.type](t,s,e,i,o,c,h.model,!1,g);Bd(v,s,e,n,i,t,o,"polar"===u.type),b?v.attr({shape:i}):p?Rd(p,c,v,i,e,o,!1,!1):rs(v,{shape:i},t,e),s.setItemGraphicEl(e,v),a.add(v),v.ignore=l;}}).update(function(e,n){var i=s.getItemModel(e),S=Wk[u.type](s,e,i);if(y){var M=void 0;0===x.length?M=r(n):(M=x[n],M.useStyle(v.getItemStyle()),"cartesian2d"===u.type&&M.setShape("r",m),_[e]=M);var T=Wk[u.type](s,e),C=Gd(o,T,u);is(M,{shape:C},c,e);}var I=l.getItemGraphicEl(n);if(!s.hasValue(e))return a.remove(I),void(I=null);var A=!1;f&&(A=Hk[u.type](d,S),A&&a.remove(I)),I||(I=Gk[u.type](t,s,e,S,o,c,h.model,!!I,g)),w||Bd(I,s,e,i,S,t,o,"polar"===u.type),b?I.attr({shape:S}):p?Rd(p,c,I,S,e,o,!0,w):is(I,{shape:S},t,e,null),s.setItemGraphicEl(e,I),I.ignore=A,a.add(I);}).remove(function(e){var n=l.getItemGraphicEl(e);n&&ss(n,t,e);}).execute();var S=this._backgroundGroup||(this._backgroundGroup=new O_());S.removeAll();for(var M=0;M<_.length;++M){S.add(_[M]);}a.add(S),this._backgroundEls=_,this._data=s;},n.prototype._renderLarge=function(t){this._clear(),Nd(t,this.group),this._updateLargeClip(t);},n.prototype._incrementalRenderLarge=function(t,e){this._removeBackground(),Nd(e,this.group,!0);},n.prototype._updateLargeClip=function(t){var e=t.get("clip",!0)?Ad(t.coordinateSystem,!1,t):null;e?this.group.setClipPath(e):this.group.removeClipPath();},n.prototype._enableRealtimeSort=function(t,e,n){var i=this;if(e.count()){var r=t.baseAxis;if(this._isFirstFrame)this._dispatchInitSort(e,t,n),this._isFirstFrame=!1;else{var o=function o(t){var n=e.getItemGraphicEl(t);if(n){var i=n.shape;return Math.abs(r.isHorizontal()?i.height:i.width)||0;}return 0;};this._onRendered=function(){i._updateSortWithinSameData(e,o,r,n);},n.getZr().on("rendered",this._onRendered);
}}},n.prototype._dataSort=function(t,e,n){var i=[];return t.each(t.mapDimension(e.dim),function(t,e){var r=n(e);r=null==r?0/0:r,i.push({dataIndex:e,mappedValue:r,ordinalNumber:t});}),i.sort(function(t,e){return e.mappedValue-t.mappedValue;}),{ordinalNumbers:v(i,function(t){return t.ordinalNumber;})};},n.prototype._isOrderChangedWithinSameData=function(t,e,n){for(var i=n.scale,r=t.mapDimension(n.dim),o=Number.MAX_VALUE,a=0,s=i.getOrdinalMeta().categories.length;s>a;++a){var l=t.rawIndexOf(r,i.getRawOrdinalNumber(a)),u=0>l?Number.MIN_VALUE:e(t.indexOfRawIndex(l));if(u>o)return!0;o=u;}return!1;},n.prototype._isOrderDifferentInView=function(t,e){for(var n=e.scale,i=n.getExtent(),r=Math.max(0,i[0]),o=Math.min(i[1],n.getOrdinalMeta().categories.length-1);o>=r;++r){if(t.ordinalNumbers[r]!==n.getRawOrdinalNumber(r))return!0;}},n.prototype._updateSortWithinSameData=function(t,e,n,i){if(this._isOrderChangedWithinSameData(t,e,n)){var r=this._dataSort(t,n,e);this._isOrderDifferentInView(r,n)&&(this._removeOnRenderedListener(i),i.dispatchAction({type:"changeAxisOrder",componentType:n.dim+"Axis",axisId:n.index,sortInfo:r}));}},n.prototype._dispatchInitSort=function(t,e,n){var i=e.baseAxis,r=this._dataSort(t,i,function(n){return t.get(t.mapDimension(e.otherAxis.dim),n);});n.dispatchAction({type:"changeAxisOrder",componentType:i.dim+"Axis",isInitSort:!0,axisId:i.index,sortInfo:r,animation:{duration:0}});},n.prototype.remove=function(t,e){this._clear(this._model),this._removeOnRenderedListener(e);},n.prototype.dispose=function(t,e){this._removeOnRenderedListener(e);},n.prototype._removeOnRenderedListener=function(t){this._onRendered&&(t.getZr().off("rendered",this._onRendered),this._onRendered=null);},n.prototype._clear=function(t){var e=this.group,n=this._data;t&&t.isAnimationEnabled()&&n&&!this._isLargeDraw?(this._removeBackground(),this._backgroundEls=[],n.eachItemGraphicEl(function(e){ss(e,t,Mb(e).dataIndex);})):e.removeAll(),this._data=null,this._isFirstFrame=!0;},n.prototype._removeBackground=function(){this.group.remove(this._backgroundGroup),this._backgroundGroup=null;},n.type="bar",n;}(JM),Hk={cartesian2d:function cartesian2d(t,e){var n=e.width<0?-1:1,i=e.height<0?-1:1;0>n&&(e.x+=e.width,e.width=-e.width),0>i&&(e.y+=e.height,e.height=-e.height);var r=t.x+t.width,o=t.y+t.height,a=Nk(e.x,t.x),s=Fk(e.x+e.width,r),l=Nk(e.y,t.y),u=Fk(e.y+e.height,o),h=a>s,c=l>u;return e.x=h&&a>r?s:a,e.y=c&&l>o?u:l,e.width=h?0:s-a,e.height=c?0:u-l,0>n&&(e.x+=e.width,e.width=-e.width),0>i&&(e.y+=e.height,e.height=-e.height),h||c;},polar:function polar(t,e){var n=e.r0<=e.r?1:-1;if(0>n){var i=e.r;e.r=e.r0,e.r0=i;}var r=Fk(e.r,t.r),o=Nk(e.r0,t.r0);e.r=r,e.r0=o;var a=0>r-o;if(0>n){var i=e.r;e.r=e.r0,e.r0=i;}return a;}},Gk={cartesian2d:function cartesian2d(t,e,n,i,r,o){var a=new vb({shape:h({},i),z2:1});if(a.__dataIndex=n,a.name="item",o){var s=a.shape,l=r?"height":"width";s[l]=0;}return a;},polar:function polar(t,e,n,i,r,o,a,s,l){var u=i.startAngle<i.endAngle,h=!r&&l?Bk:yw,p=new h({shape:c({clockwise:u},i),z2:1});if(p.name="item",o){var f=p.shape,d=r?"r":"endAngle",g={};f[d]=r?0:i.startAngle,g[d]=i[d],(s?is:rs)(p,{shape:g},o);}return p;}},Wk={cartesian2d:function cartesian2d(t,e,n){var i=t.getItemLayout(e),r=n?zd(n,i):0,o=i.width>0?1:-1,a=i.height>0?1:-1;return{x:i.x+o*r/2,y:i.y+a*r/2,width:i.width-o*r,height:i.height-a*r};},polar:function polar(t,e){var n=t.getItemLayout(e);return{cx:n.cx,cy:n.cy,r0:n.r0,r:n.r,startAngle:n.startAngle,endAngle:n.endAngle};}},Uk=function(){function t(){}return t;}(),Yk=function(t){function n(e){var n=t.call(this,e)||this;return n.type="largeBar",n;}return e(n,t),n.prototype.getDefaultShape=function(){return new Uk();},n.prototype.buildPath=function(t,e){for(var n=e.points,i=this.__startPoint,r=this.__baseDimIdx,o=0;o<n.length;o+=2){i[r]=n[o+r],t.moveTo(i[0],i[1]),t.lineTo(n[o],n[o+1]);}},n;}(lb),Xk=xh(function(t){var e=this,n=Fd(e,t.offsetX,t.offsetY);Mb(e).dataIndex=n>=0?n:null;},30,!1);$f(Ud);var jk=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e.hasSymbolVisual=!0,e;}return e(n,t),n.prototype.getInitialData=function(){return ef(this.getSource(),this,{useEncodeDefaulter:!0});},n.prototype.getLegendIcon=function(t){var e=new O_(),n=uc("line",0,t.itemHeight/2,t.itemWidth,0,t.lineStyle.stroke,!1);e.add(n),n.setStyle(t.lineStyle);var i=this.getData().getVisual("symbol"),r="none"===i?"circle":i,o=.8*t.itemHeight,a=uc(r,(t.itemWidth-o)/2,(t.itemHeight-o)/2,o,o,t.itemStyle.fill,t.symbolKeepAspect);return e.add(a),a.setStyle(t.itemStyle),r.indexOf("empty")>-1&&(a.style.stroke=a.style.fill,a.style.fill="#fff",a.style.lineWidth=2),e;},n.type="series.line",n.dependencies=["grid","polar"],n.defaultOption={zlevel:0,z:3,coordinateSystem:"cartesian2d",legendHoverLink:!0,clip:!0,label:{position:"top"},endLabel:{show:!1,valueAnimation:!0,distance:8},lineStyle:{width:2,type:"solid"},emphasis:{scale:!0,lineStyle:{width:"bolder"}},step:!1,smooth:!1,smoothMonotone:null,symbol:"emptyCircle",symbolSize:4,symbolRotate:null,showSymbol:!0,showAllSymbol:"auto",connectNulls:!1,sampling:"none",animationEasing:"linear",progressive:0,hoverLayerThreshold:1/0},n;}(qM),qk=function(t){function n(e,n,i,r){var o=t.call(this)||this;return o.updateData(e,n,i,r),o;}return e(n,t),n.prototype._createSymbol=function(t,e,n,i,r){this.removeAll();var o=uc(t,-1,-1,2,2,null,r);o.attr({z2:100,culling:!0,scaleX:i[0]/2,scaleY:i[1]/2}),o.drift=Yd,this._symbolType=t,this.add(o);},n.prototype.stopSymbolAnimation=function(t){this.childAt(0).stopAnimation(null,t);},n.prototype.getSymbolPath=function(){return this.childAt(0);},n.prototype.highlight=function(){ea(this.childAt(0));},n.prototype.downplay=function(){na(this.childAt(0));},n.prototype.setZ=function(t,e){var n=this.childAt(0);n.zlevel=t,n.z=e;},n.prototype.setDraggable=function(t){var e=this.childAt(0);e.draggable=t,e.cursor=t?"move":e.cursor;},n.prototype.updateData=function(t,e,i,r){this.silent=!1;var o=t.getItemVisual(e,"symbol")||"circle",a=t.hostModel,s=n.getSymbolSize(t,e),l=o!==this._symbolType,u=r&&r.disableAnimation;if(l){var h=t.getItemVisual(e,"symbolKeepAspect");this._createSymbol(o,t,e,s,h);}else{var c=this.childAt(0);c.silent=!1;var p={scaleX:s[0]/2,scaleY:s[1]/2};u?c.attr(p):is(c,p,a,e);}if(this._updateCommon(t,e,s,i,r),l){var c=this.childAt(0);if(!u){var p={scaleX:this._sizeX,scaleY:this._sizeY,style:{opacity:c.style.opacity}};c.scaleX=c.scaleY=0,c.style.opacity=0,rs(c,p,a,e);}}u&&this.childAt(0).stopAnimation("remove"),this._seriesModel=a;},n.prototype._updateCommon=function(t,e,n,i,r){function o(e){return I?t.getName(e):Dd(t,e);}var a,s,l,u,c,p,f,d,g=this.childAt(0),y=t.hostModel;if(i&&(a=i.emphasisItemStyle,s=i.blurItemStyle,l=i.selectItemStyle,u=i.focus,c=i.blurScope,p=i.labelStatesModels,f=i.hoverScale,d=i.cursorStyle),!i||t.hasItemOption){var v=i&&i.itemModel?i.itemModel:t.getItemModel(e),m=v.getModel("emphasis");a=m.getModel("itemStyle").getItemStyle(),l=v.getModel(["select","itemStyle"]).getItemStyle(),s=v.getModel(["blur","itemStyle"]).getItemStyle(),u=m.get("focus"),c=m.get("blurScope"),p=Cs(v),f=m.getShallow("scale"),d=v.getShallow("cursor");}var _=t.getItemVisual(e,"symbolRotate");g.attr("rotation",(_||0)*Math.PI/180||0);var x=t.getItemVisual(e,"symbolOffset")||0;x&&(M(x)||(x=[x,x]),g.x=_i(x[0],n[0]),g.y=_i(N(x[1],x[0])||0,n[1])),d&&g.attr("cursor",d);var b=t.getItemVisual(e,"style"),w=b.fill;if(g instanceof fb){var S=g.style;g.useStyle(h({image:S.image,x:S.x,y:S.y,width:S.width,height:S.height},b));}else g.useStyle(g.__isEmptyBrush?h({},b):b),g.style.decal=null,g.setColor(w,r&&r.symbolInnerColor),g.style.strokeNoScale=!0;var T=t.getItemVisual(e,"liftZ"),C=this._z2;null!=T?null==C&&(this._z2=g.z2,g.z2+=T):null!=C&&(g.z2=C,this._z2=null);var I=r&&r.useNameLabel;Ts(g,p,{labelFetcher:y,labelDataIndex:e,defaultText:o,inheritColor:w,defaultOpacity:b.opacity}),this._sizeX=n[0]/2,this._sizeY=n[1]/2;var A=g.ensureState("emphasis");if(A.style=a,g.ensureState("select").style=l,g.ensureState("blur").style=s,f){var k=Math.max(1.1,3/this._sizeY);A.scaleX=this._sizeX*k,A.scaleY=this._sizeY*k;}this.setSymbolScale(1),ma(this,u,c);},n.prototype.setSymbolScale=function(t){this.scaleX=this.scaleY=t;},n.prototype.fadeOut=function(t,e){var n=this.childAt(0),i=this._seriesModel,r=Mb(this).dataIndex,o=e&&e.animation;if(this.silent=n.silent=!0,e&&e.fadeLabel){var a=n.getTextContent();a&&os(a,{style:{opacity:0}},i,{dataIndex:r,removeOpt:o,cb:function cb(){n.removeTextContent();}});}else n.removeTextContent();os(n,{style:{opacity:0},scaleX:0,scaleY:0},i,{dataIndex:r,cb:t,removeOpt:o});},n.getSymbolSize=function(t,e){var n=t.getItemVisual(e,"symbolSize");return M(n)?n.slice():[+n,+n];},n;}(O_),Zk=function(){function t(t){this.group=new O_(),this._SymbolCtor=t||qk;}return t.prototype.updateData=function(t,e){e=jd(e);var n=this.group,i=t.hostModel,r=this._data,o=this._SymbolCtor,a=e.disableAnimation,s=qd(t),l={disableAnimation:a},u=e.getSymbolPoint||function(e){return t.getItemLayout(e);};r||n.removeAll(),t.diff(r).add(function(i){var r=u(i);if(Xd(t,r,i,e)){var a=new o(t,i,s,l);a.setPosition(r),t.setItemGraphicEl(i,a),n.add(a);}}).update(function(h,c){var p=r.getItemGraphicEl(c),f=u(h);if(!Xd(t,f,h,e))return void n.remove(p);if(p){p.updateData(t,h,s,l);var d={x:f[0],y:f[1]};a?p.attr(d):is(p,d,i);}else p=new o(t,h),p.setPosition(f);n.add(p),t.setItemGraphicEl(h,p);}).remove(function(t){var e=r.getItemGraphicEl(t);e&&e.fadeOut(function(){n.remove(e);});}).execute(),this._getSymbolPoint=u,this._data=t;},t.prototype.isPersistent=function(){return!0;},t.prototype.updateLayout=function(){var t=this,e=this._data;e&&e.eachItemGraphicEl(function(e,n){var i=t._getSymbolPoint(n);e.setPosition(i),e.markRedraw();});},t.prototype.incrementalPrepareUpdate=function(t){this._seriesScope=qd(t),this._data=null,this.group.removeAll();},t.prototype.incrementalUpdate=function(t,e,n){function i(t){t.isGroup||(t.incremental=!0,t.ensureState("emphasis").hoverLayer=!0);}n=jd(n);for(var r=t.start;r<t.end;r++){var o=e.getItemLayout(r);if(Xd(e,o,r,n)){var a=new this._SymbolCtor(e,r,this._seriesScope);a.traverse(i),a.setPosition(o),this.group.add(a),e.setItemGraphicEl(r,a);}}},t.prototype.remove=function(t){var e=this.group,n=this._data;n&&t?n.eachItemGraphicEl(function(t){t.fadeOut(function(){e.remove(t);});}):e.removeAll();},t;}(),Kk="undefined"!=typeof Float32Array,$k=Kk?Float32Array:Array,Jk=Math.min,Qk=Math.max,tD=function(){function t(){this.smooth=0,this.smoothConstraint=!0;}return t;}(),eD=function(t){function n(e){var n=t.call(this,e)||this;return n.type="ec-polyline",n;}return e(n,t),n.prototype.getDefaultStyle=function(){return{stroke:"#000",fill:null};},n.prototype.getDefaultShape=function(){return new tD();},n.prototype.buildPath=function(t,e){var n=e.points,i=0,r=n.length/2;if(e.connectNulls){for(;r>0&&eg(n[2*r-2],n[2*r-1]);r--){;}for(;r>i&&eg(n[2*i],n[2*i+1]);i++){;}}for(;r>i;){i+=ng(t,n,i,r,r,1,e.smooth,e.smoothMonotone,e.connectNulls)+1;}},n.prototype.getPointOn=function(t,e){this.path||(this.createPathProxy(),this.buildPath(this.path,this.shape));for(var n,i,r=this.path,o=r.data,a=$x.CMD,s="x"===e,l=[],u=0;u<o.length;){var h=o[u++],c=void 0,p=void 0,f=void 0,d=void 0,g=void 0,y=void 0,v=void 0;switch(h){case a.M:n=o[u++],i=o[u++];break;case a.L:if(c=o[u++],p=o[u++],v=s?(t-n)/(c-n):(t-i)/(p-i),1>=v&&v>=0){var m=s?(p-i)*v+i:(c-n)*v+n;return s?[t,m]:[m,t];}n=c,i=p;break;case a.C:c=o[u++],p=o[u++],f=o[u++],d=o[u++],g=o[u++],y=o[u++];var _=s?Wr(n,c,f,g,t,l):Wr(i,p,d,y,t,l);if(_>0)for(var x=0;_>x;x++){var b=l[x];if(1>=b&&b>=0){var m=s?Hr(i,p,d,y,b):Hr(n,c,f,g,b);return s?[t,m]:[m,t];}}n=g,i=y;}}},n;}(lb),nD=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n;}(tD),iD=function(t){function n(e){var n=t.call(this,e)||this;return n.type="ec-polygon",n;}return e(n,t),n.prototype.getDefaultShape=function(){return new nD();},n.prototype.buildPath=function(t,e){var n=e.points,i=e.stackedOnPoints,r=0,o=n.length/2,a=e.smoothMonotone;if(e.connectNulls){for(;o>0&&eg(n[2*o-2],n[2*o-1]);o--){;}for(;o>r&&eg(n[2*r],n[2*r+1]);r++){;}}for(;o>r;){var s=ng(t,n,r,o,o,1,e.smooth,a,e.connectNulls);ng(t,i,r+s-1,s,o,-1,e.stackedOnSmooth,a,e.connectNulls),r+=s+1,t.closePath();}},n;}(lb),rD=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n.prototype.init=function(){var t=new O_(),e=new Zk();this.group.add(e.group),this._symbolDraw=e,this._lineGroup=t;},n.prototype.render=function(t,e,n){var i=this,r=t.coordinateSystem,o=this.group,a=t.getData(),s=t.getModel("lineStyle"),l=t.getModel("areaStyle"),u=a.getLayout("points")||[],h="polar"===r.type,p=this._coordSys,f=this._symbolDraw,d=this._polyline,g=this._polygon,y=this._lineGroup,v=t.get("animation"),m=!l.isEmpty(),_=l.get("origin"),x=Zd(r,a,_),b=m&&sg(r,a,x),w=t.get("showSymbol"),S=w&&!h&&hg(t,a,r),M=this._data;M&&M.eachItemGraphicEl(function(t,e){t.__temp&&(o.remove(t),M.setItemGraphicEl(e,null));}),w||f.remove(),o.add(y);var T,C=h?!1:t.get("step");r&&r.getArea&&t.get("clip",!0)&&(T=r.getArea(),null!=T.width?(T.x-=.1,T.y-=.1,T.width+=.2,T.height+=.2):T.r0&&(T.r0-=.5,T.r+=.5)),this._clipShapeForSymbol=T;var I=ug(a,r)||a.getVisual("style")[a.getVisual("drawType")];d&&p.type===r.type&&C===this._step?(m&&!g?g=this._newPolygon(u,b):g&&!m&&(y.remove(g),g=this._polygon=null),h||this._initOrUpdateEndLabel(t,r,xl(I)),y.setClipPath(yg(this,r,!1,t)),w&&f.updateData(a,{isIgnore:S,clipShape:T,disableAnimation:!0,getSymbolPoint:function getSymbolPoint(t){return[u[2*t],u[2*t+1]];}}),ig(this._stackedOnPoints,b)&&ig(this._points,u)||(v?this._doUpdateAnimation(a,b,r,n,C,_):(C&&(u=lg(u,r,C),b&&(b=lg(b,r,C))),d.setShape({points:u}),g&&g.setShape({points:u,stackedOnPoints:b})))):(w&&f.updateData(a,{isIgnore:S,clipShape:T,disableAnimation:!0,getSymbolPoint:function getSymbolPoint(t){return[u[2*t],u[2*t+1]];}}),v&&this._initSymbolLabelAnimation(a,r,T),C&&(u=lg(u,r,C),b&&(b=lg(b,r,C))),d=this._newPolyline(u),m&&(g=this._newPolygon(u,b)),h||this._initOrUpdateEndLabel(t,r,xl(I)),y.setClipPath(yg(this,r,!0,t)));var A=t.get(["emphasis","focus"]),k=t.get(["emphasis","blurScope"]);if(d.useStyle(c(s.getLineStyle(),{fill:"none",stroke:I,lineJoin:"bevel"})),xa(d,t,"lineStyle"),d.style.lineWidth>0&&"bolder"===t.get(["emphasis","lineStyle","width"])){var D=d.getState("emphasis").style;D.lineWidth=+d.style.lineWidth+1;}Mb(d).seriesIndex=t.seriesIndex,ma(d,A,k);var L=ag(t.get("smooth")),P=t.get("smoothMonotone"),O=t.get("connectNulls");if(d.setShape({smooth:L,smoothMonotone:P,connectNulls:O}),g){var R=a.getCalculationInfo("stackedOnSeries"),E=0;g.useStyle(c(l.getAreaStyle(),{fill:I,opacity:.7,lineJoin:"bevel",decal:a.getVisual("style").decal})),R&&(E=ag(R.get("smooth"))),g.setShape({smooth:L,stackedOnSmooth:E,smoothMonotone:P,connectNulls:O}),xa(g,t,"areaStyle"),Mb(g).seriesIndex=t.seriesIndex,ma(g,A,k);}var B=function B(t){i._changePolyState(t);};a.eachItemGraphicEl(function(t){t&&(t.onHoverStateChange=B);}),this._polyline.onHoverStateChange=B,this._data=a,this._coordSys=r,this._stackedOnPoints=b,this._points=u,this._step=C,this._valueOrigin=_;},n.prototype.dispose=function(){},n.prototype.highlight=function(t,e,n,i){var r=t.getData(),o=rr(r,i);if(this._changePolyState("emphasis"),!(o instanceof Array)&&null!=o&&o>=0){var a=r.getLayout("points"),s=r.getItemGraphicEl(o);if(!s){var l=a[2*o],u=a[2*o+1];if(isNaN(l)||isNaN(u))return;if(this._clipShapeForSymbol&&!this._clipShapeForSymbol.contain(l,u))return;s=new qk(r,o),s.x=l,s.y=u,s.setZ(t.get("zlevel"),t.get("z"));var h=s.getSymbolPath().getTextContent();h&&(h.z2=this._polyline.z2+1),s.__temp=!0,r.setItemGraphicEl(o,s),s.stopSymbolAnimation(!0),this.group.add(s);}s.highlight();}else JM.prototype.highlight.call(this,t,e,n,i);},n.prototype.downplay=function(t,e,n,i){var r=t.getData(),o=rr(r,i);if(this._changePolyState("normal"),null!=o&&o>=0){var a=r.getItemGraphicEl(o);a&&(a.__temp?(r.setItemGraphicEl(o,null),this.group.remove(a)):a.downplay());}else JM.prototype.downplay.call(this,t,e,n,i);},n.prototype._changePolyState=function(t){var e=this._polygon;Xo(this._polyline,t),e&&Xo(e,t);},n.prototype._newPolyline=function(t){var e=this._polyline;return e&&this._lineGroup.remove(e),e=new eD({shape:{points:t},segmentIgnoreThreshold:2,z2:10}),this._lineGroup.add(e),this._polyline=e,e;},n.prototype._newPolygon=function(t,e){var n=this._polygon;return n&&this._lineGroup.remove(n),n=new iD({shape:{points:t,stackedOnPoints:e},segmentIgnoreThreshold:2}),this._lineGroup.add(n),this._polygon=n,n;},n.prototype._initSymbolLabelAnimation=function(t,e,n){var i,r,o=e.getBaseAxis(),a=o.inverse;"cartesian2d"===e.type?(i=o.isHorizontal(),r=!1):"polar"===e.type&&(i="angle"===o.dim,r=!0);var s=t.hostModel,l=s.get("animationDuration");"function"==typeof l&&(l=l(null));var u=s.get("animationDelay")||0,h="function"==typeof u?u(null):u;t.eachItemGraphicEl(function(t,o){var s=t;if(s){var c=[t.x,t.y],p=void 0,f=void 0,d=void 0;if(r){var g=n,y=e.pointToCoord(c);i?(p=g.startAngle,f=g.endAngle,d=-y[1]/180*Math.PI):(p=g.r0,f=g.r,d=y[0]);}else{var v=n;i?(p=v.x,f=v.x+v.width,d=t.x):(p=v.y+v.height,f=v.y,d=t.y);}var m=f===p?0:(d-p)/(f-p);a&&(m=1-m);var _="function"==typeof u?u(o):l*m+h,x=s.getSymbolPath(),b=x.getTextContent();s.attr({scaleX:0,scaleY:0}),s.animateTo({scaleX:1,scaleY:1},{duration:200,delay:_}),b&&b.animateFrom({style:{opacity:0}},{duration:300,delay:_}),x.disableLabelAnimation=!0;}});},n.prototype._initOrUpdateEndLabel=function(t,e,n){var i=t.getModel("endLabel");if(i.get("show")){var r=t.getData(),o=this._polyline,a=this._endLabel;a||(a=this._endLabel=new bb({z2:200}),a.ignoreClip=!0,o.setTextContent(this._endLabel),o.disableLabelAnimation=!0);var s=fg(r.getLayout("points"));s>=0&&(Ts(o,Cs(t,"endLabel"),{inheritColor:n,labelFetcher:t,labelDataIndex:s,defaultText:function defaultText(t,e,n){return null!=n?Ld(r,n):Dd(r,t);},enableTextSetter:!0},vg(i,e)),o.textConfig.position=null);}else this._endLabel&&(this._polyline.removeTextContent(),this._endLabel=null);},n.prototype._endLabelOnDuring=function(t,e,n,i,r,o,a){var s=this._endLabel,l=this._polyline;if(s){1>t&&null==i.originalX&&(i.originalX=s.x,i.originalY=s.y);var u=n.getLayout("points"),h=n.hostModel,c=h.get("connectNulls"),p=o.get("precision"),f=o.get("distance")||0,d=a.getBaseAxis(),g=d.isHorizontal(),y=d.inverse,v=e.shape,m=y?g?v.x:v.y+v.height:g?v.x+v.width:v.y,_=(g?f:0)*(y?-1:1),x=(g?0:-f)*(y?-1:1),b=g?"x":"y",w=gg(u,m,b),S=w.range,M=S[1]-S[0],T=void 0;if(M>=1){if(M>1&&!c){var C=dg(u,S[0]);s.attr({x:C[0]+_,y:C[1]+x}),r&&(T=h.getRawValue(S[0]));}else{var C=l.getPointOn(m,b);C&&s.attr({x:C[0]+_,y:C[1]+x});var I=h.getRawValue(S[0]),A=h.getRawValue(S[1]);r&&(T=pr(n,p,I,A,w.t));}i.lastFrameIndex=S[0];}else{var k=1===t||i.lastFrameIndex>0?S[0]:0,C=dg(u,k);r&&(T=h.getRawValue(k)),s.attr({x:C[0]+_,y:C[1]+x});}r&&Qw(s).setLabelText(T);}},n.prototype._doUpdateAnimation=function(t,e,n,i,r,o){var a=this._polyline,s=this._polygon,l=t.hostModel,u=tg(this._data,t,this._stackedOnPoints,e,this._coordSys,n,this._valueOrigin,o),h=u.current,c=u.stackedOnCurrent,p=u.next,f=u.stackedOnNext;if(r&&(h=lg(u.current,n,r),c=lg(u.stackedOnCurrent,n,r),p=lg(u.next,n,r),f=lg(u.stackedOnNext,n,r)),og(h,p)>3e3||s&&og(c,f)>3e3)return a.setShape({points:p}),void(s&&s.setShape({points:p,stackedOnPoints:f}));a.shape.__points=u.current,a.shape.points=h;var d={shape:{points:p}};u.current!==h&&(d.shape.__points=u.next),a.stopAnimation(),is(a,d,l),s&&(s.setShape({points:h,stackedOnPoints:c}),s.stopAnimation(),is(s,{shape:{stackedOnPoints:f}},l),a.shape.points!==s.shape.points&&(s.shape.points=a.shape.points));for(var g=[],y=u.status,v=0;v<y.length;v++){var m=y[v].cmd;if("="===m){var _=t.getItemGraphicEl(y[v].idx1);_&&g.push({el:_,ptIdx:v});}}a.animators&&a.animators.length&&a.animators[0].during(function(){s&&s.dirtyShape();for(var t=a.shape.__points,e=0;e<g.length;e++){var n=g[e].el,i=2*g[e].ptIdx;n.x=t[i],n.y=t[i+1],n.markRedraw();}});},n.prototype.remove=function(){var t=this.group,e=this._data;this._lineGroup.removeAll(),this._symbolDraw.remove(!0),e&&e.eachItemGraphicEl(function(n,i){n.__temp&&(t.remove(n),e.setItemGraphicEl(i,null));}),this._polyline=this._polygon=this._coordSys=this._points=this._stackedOnPoints=this._endLabel=this._data=null;},n.type="line",n;}(JM);$f(_g);var oD=2*Math.PI,aD=Math.PI/180,sD=Math.PI/180,lD=function(t){function n(e,n,i){var r=t.call(this)||this;r.z2=2;var o=new bb();return r.setTextContent(o),r.updateData(e,n,i,!0),r;}return e(n,t),n.prototype.updateData=function(t,e,n,i){var r=this,o=t.hostModel,a=t.getItemModel(e),s=a.getModel("emphasis"),l=t.getItemLayout(e),u=h(Ig(a.getModel("itemStyle"),l)||{},l);if(isNaN(u.startAngle))return void r.setShape(u);if(i){r.setShape(u);var c=o.getShallow("animationType");"scale"===c?(r.shape.r=l.r0,rs(r,{shape:{r:l.r}},o,e)):null!=n?(r.setShape({startAngle:n,endAngle:n}),rs(r,{shape:{startAngle:l.startAngle,endAngle:l.endAngle}},o,e)):(r.shape.endAngle=l.startAngle,is(r,{shape:{endAngle:l.endAngle}},o,e));}else is(r,{shape:u},o,e);r.useStyle(t.getItemVisual(e,"style")),xa(r,a);var p=(l.startAngle+l.endAngle)/2,f=o.get("selectedOffset"),d=Math.cos(p)*f,g=Math.sin(p)*f,y=a.getShallow("cursor");y&&r.attr("cursor",y),this._updateLabel(o,t,e),r.ensureState("emphasis").shape=_Lv({r:l.r+(s.get("scale")?s.get("scaleSize")||0:0)},Ig(s.getModel("itemStyle"),l)),h(r.ensureState("select"),{x:d,y:g,shape:Ig(a.getModel(["select","itemStyle"]),l)}),h(r.ensureState("blur"),{shape:Ig(a.getModel(["blur","itemStyle"]),l)});var v=r.getTextGuideLine(),m=r.getTextContent();v&&h(v.ensureState("select"),{x:d,y:g}),h(m.ensureState("select"),{x:d,y:g}),ma(this,s.get("focus"),s.get("blurScope"));},n.prototype._updateLabel=function(t,e,n){var i=this,r=e.getItemModel(n),o=r.getModel("labelLine"),a=e.getItemVisual(n,"style"),s=a&&a.fill,l=a&&a.opacity;Ts(i,Cs(r),{labelFetcher:e.hostModel,labelDataIndex:n,inheritColor:s,defaultOpacity:l,defaultText:t.getFormattedLabel(n,"normal")||e.getName(n)});var u=i.getTextContent();i.setTextConfig({position:null,rotation:null}),u.attr({z2:10});var h=t.get(["label","position"]);if("outside"!==h&&"outer"!==h)i.removeTextGuideLine();else{var c=this.getTextGuideLine();c||(c=new ww(),this.setTextGuideLine(c)),qh(this,Zh(r),{stroke:s,opacity:F(o.get(["lineStyle","opacity"]),l,1)});}},n;}(yw),uD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.ignoreLabelLineUpdate=!0,e;}return e(n,t),n.prototype.init=function(){var t=new O_();this._sectorGroup=t;},n.prototype.render=function(t){var e,n=t.getData(),i=this._data,r=this.group;if(!i&&n.count()>0){for(var o=n.getItemLayout(0),a=1;isNaN(o&&o.startAngle)&&a<n.count();++a){o=n.getItemLayout(a);}o&&(e=o.startAngle);}n.diff(i).add(function(t){var i=new lD(n,t,e);n.setItemGraphicEl(t,i),r.add(i);}).update(function(t,o){var a=i.getItemGraphicEl(o);a.updateData(n,t,e),a.off("click"),r.add(a),n.setItemGraphicEl(t,a);}).remove(function(e){var n=i.getItemGraphicEl(e);ss(n,t,e);}).execute(),Cg(t),"expansion"!==t.get("animationTypeUpdate")&&(this._data=n);},n.prototype.dispose=function(){},n.prototype.containPoint=function(t,e){var n=e.getData(),i=n.getItemLayout(0);if(i){var r=t[0]-i.cx,o=t[1]-i.cy,a=Math.sqrt(r*r+o*o);return a<=i.r&&a>=i.r0;}},n.type="pie",n;}(JM),hD=function(){function t(t,e){this._getDataWithEncodedVisual=t,this._getRawData=e;}return t.prototype.getAllNames=function(){var t=this._getRawData();return t.mapArray(t.getName);},t.prototype.containName=function(t){var e=this._getRawData();return e.indexOfName(t)>=0;},t.prototype.indexOfName=function(t){var e=this._getDataWithEncodedVisual();return e.indexOfName(t);},t.prototype.getItemVisual=function(t,e){var n=this._getDataWithEncodedVisual();return n.getItemVisual(t,e);},t;}(),cD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.useColorPaletteOnData=!0,e;}return e(n,t),n.prototype.init=function(e){t.prototype.init.apply(this,arguments),this.legendVisualProvider=new hD(qv(this.getData,this),qv(this.getRawData,this)),this._defaultLabelLine(e);},n.prototype.mergeOption=function(){t.prototype.mergeOption.apply(this,arguments);},n.prototype.getInitialData=function(){return Ag(this,{coordDimensions:["value"],encodeDefaulter:S(Ll,this)});},n.prototype.getDataParams=function(e){var n=this.getData(),i=t.prototype.getDataParams.call(this,e),r=[];return n.each(n.mapDimension("value"),function(t){r.push(t);}),i.percent=Ti(r,e,n.hostModel.get("percentPrecision")),i.$vars.push("percent"),i;},n.prototype._defaultLabelLine=function(t){Hi(t,"labelLine",["show"]);var e=t.labelLine,n=t.emphasis.labelLine;e.show=e.show&&t.label.show,n.show=n.show&&t.emphasis.label.show;},n.type="series.pie",n.defaultOption={zlevel:0,z:2,legendHoverLink:!0,center:["50%","50%"],radius:[0,"75%"],clockwise:!0,startAngle:90,minAngle:0,minShowLabelAngle:0,selectedOffset:10,percentPrecision:2,stillShowZeroSum:!0,left:0,top:0,right:0,bottom:0,width:null,height:null,label:{rotate:0,show:!0,overflow:"truncate",position:"outer",alignTo:"none",edgeDistance:"25%",bleedMargin:10,distanceToLabelLine:5},labelLine:{show:!0,length:15,length2:15,smooth:!1,minTurnAngle:90,maxSurfaceAngle:90,lineStyle:{width:1,type:"solid"}},itemStyle:{borderWidth:1},labelLayout:{hideOverlap:!0},emphasis:{scale:!0,scaleSize:5},avoidLabelOverlap:!0,animationType:"expansion",animationDuration:1e3,animationTypeUpdate:"transition",animationEasingUpdate:"cubicInOut",animationDurationUpdate:500,animationEasing:"cubicInOut"},n;}(qM);$f(kg);var pD=function(){function t(){this.angle=0,this.width=10,this.r=10,this.x=0,this.y=0;}return t;}(),fD=function(t){function n(e){var n=t.call(this,e)||this;return n.type="pointer",n;}return e(n,t),n.prototype.getDefaultShape=function(){return new pD();},n.prototype.buildPath=function(t,e){var n=Math.cos,i=Math.sin,r=e.r,o=e.width,a=e.angle,s=e.x-n(a)*o*(o>=r/3?1:2),l=e.y-i(a)*o*(o>=r/3?1:2);a=e.angle-Math.PI/2,t.moveTo(s,l),t.lineTo(e.x+n(a)*o,e.y+i(a)*o),t.lineTo(e.x+n(e.angle)*r,e.y+i(e.angle)*r),t.lineTo(e.x-n(a)*o,e.y-i(a)*o),t.lineTo(s,l);},n;}(lb),dD=2*Math.PI,gD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.prototype.render=function(t,e,n){this.group.removeAll();var i=t.get(["axisLine","lineStyle","color"]),r=Dg(t,n);this._renderMain(t,e,n,i,r),this._data=t.getData();},n.prototype.dispose=function(){},n.prototype._renderMain=function(t,e,n,i,r){for(var o=this.group,a=t.get("clockwise"),s=-t.get("startAngle")/180*Math.PI,l=-t.get("endAngle")/180*Math.PI,u=t.getModel("axisLine"),h=u.get("roundCap"),c=h?Bk:yw,p=u.get("show"),f=u.getModel("lineStyle"),d=f.get("width"),g=(l-s)%dD||l===s?(l-s)%dD:dD,y=s,v=0;p&&v<i.length;v++){var m=Math.min(Math.max(i[v][0],0),1);l=s+g*m;var _=new c({shape:{startAngle:y,endAngle:l,cx:r.cx,cy:r.cy,clockwise:a,r0:r.r-d,r:r.r},silent:!0});_.setStyle({fill:i[v][1]}),_.setStyle(f.getLineStyle(["color","width"])),o.add(_),y=l;}var x=function x(t){if(0>=t)return i[0][1];var e;for(e=0;e<i.length;e++){if(i[e][0]>=t&&(0===e?0:i[e-1][0])<t)return i[e][1];}return i[e-1][1];};if(!a){var b=s;s=l,l=b;}this._renderTicks(t,e,n,x,r,s,l,a,d),this._renderTitleAndDetail(t,e,n,x,r),this._renderAnchor(t,r),this._renderPointer(t,e,n,x,r,s,l,a,d);},n.prototype._renderTicks=function(t,e,n,i,r,o,a,s,l){for(var u,h,c=this.group,p=r.cx,f=r.cy,d=r.r,g=+t.get("min"),y=+t.get("max"),v=t.getModel("splitLine"),m=t.getModel("axisTick"),_=t.getModel("axisLabel"),x=t.get("splitNumber"),b=m.get("splitNumber"),w=_i(v.get("length"),d),S=_i(m.get("length"),d),M=o,T=(a-o)/x,C=T/b,I=v.getModel("lineStyle").getLineStyle(),A=m.getModel("lineStyle").getLineStyle(),k=v.get("distance"),D=0;x>=D;D++){if(u=Math.cos(M),h=Math.sin(M),v.get("show")){var L=k?k+l:l,P=new Tw({shape:{x1:u*(d-L)+p,y1:h*(d-L)+f,x2:u*(d-w-L)+p,y2:h*(d-w-L)+f},style:I,silent:!0});"auto"===I.stroke&&P.setStyle({stroke:i(D/x)}),c.add(P);}if(_.get("show")){var L=_.get("distance")+k,O=Lg(xi(D/x*(y-g)+g),_.get("formatter")),R=i(D/x);c.add(new bb({style:Is(_,{text:O,x:u*(d-w-L)+p,y:h*(d-w-L)+f,verticalAlign:-.8>h?"top":h>.8?"bottom":"middle",align:-.4>u?"left":u>.4?"right":"center"},{inheritColor:R}),silent:!0}));}if(m.get("show")&&D!==x){var L=m.get("distance");L=L?L+l:l;for(var E=0;b>=E;E++){u=Math.cos(M),h=Math.sin(M);var B=new Tw({shape:{x1:u*(d-L)+p,y1:h*(d-L)+f,x2:u*(d-S-L)+p,y2:h*(d-S-L)+f},silent:!0,style:A});"auto"===A.stroke&&B.setStyle({stroke:i((D+E/b)/x)}),c.add(B),M+=C;}M-=C;}else M+=T;}},n.prototype._renderPointer=function(t,e,n,i,r,o,a,s,l){function u(e,n){var i,o=_.getItemModel(e),a=o.getModel("pointer"),s=_i(a.get("width"),r.r),l=_i(a.get("length"),r.r),u=t.get(["pointer","icon"]),h=a.get("offsetCenter"),c=_i(h[0],r.r),p=_i(h[1],r.r),f=a.get("keepAspect");return i=u?uc(u,c-s/2,p-l,s,l,null,f):new fD({shape:{angle:-Math.PI/2,width:s,r:l,x:c,y:p}}),i.rotation=-(n+Math.PI/2),i.x=r.cx,i.y=r.cy,i;}function c(t,e){var n=v.get("roundCap"),i=n?Bk:yw,a=v.get("overlap"),u=a?v.get("width"):l/_.count(),h=a?r.r-u:r.r-(t+1)*u,c=a?r.r:r.r-t*u,p=new i({shape:{startAngle:o,endAngle:e,cx:r.cx,cy:r.cy,clockwise:s,r0:h,r:c}});return a&&(p.z2=w-_.get(x,t)%w),p;}var p=this.group,f=this._data,d=this._progressEls,g=[],y=t.get(["pointer","show"]),v=t.getModel("progress"),m=v.get("show"),_=t.getData(),x=_.mapDimension("value"),b=+t.get("min"),w=+t.get("max"),S=[b,w],M=[o,a];(m||y)&&(_.diff(f).add(function(e){if(y){var n=u(e,o);rs(n,{rotation:-(mi(_.get(x,e),S,M,!0)+Math.PI/2)},t),p.add(n),_.setItemGraphicEl(e,n);}if(m){var i=c(e,o),r=v.get("clip");rs(i,{shape:{endAngle:mi(_.get(x,e),S,M,r)}},t),p.add(i),g[e]=i;}}).update(function(e,n){if(y){var i=f.getItemGraphicEl(n),r=i?i.rotation:o,a=u(e,r);a.rotation=r,is(a,{rotation:-(mi(_.get(x,e),S,M,!0)+Math.PI/2)},t),p.add(a),_.setItemGraphicEl(e,a);}if(m){var s=d[n],l=s?s.shape.endAngle:o,h=c(e,l),b=v.get("clip");is(h,{shape:{endAngle:mi(_.get(x,e),S,M,b)}},t),p.add(h),g[e]=h;}}).execute(),_.each(function(t){var e=_.getItemModel(t),n=e.getModel("emphasis");if(y){var r=_.getItemGraphicEl(t),o=_.getItemVisual(t,"style"),a=o.fill;if(r instanceof fb){var s=r.style;r.useStyle(h({image:s.image,x:s.x,y:s.y,width:s.width,height:s.height},o));}else r.useStyle(o),"pointer"!==r.type&&r.setColor(a);r.setStyle(e.getModel(["pointer","itemStyle"]).getItemStyle()),"auto"===r.style.fill&&r.setStyle("fill",i(mi(_.get(x,t),S,[0,1],!0))),r.z2EmphasisLift=0,xa(r,e),ma(r,n.get("focus"),n.get("blurScope"));}if(m){var l=g[t];l.useStyle(_.getItemVisual(t,"style")),l.setStyle(e.getModel(["progress","itemStyle"]).getItemStyle()),l.z2EmphasisLift=0,xa(l,e),ma(l,n.get("focus"),n.get("blurScope"));}}),this._progressEls=g);},n.prototype._renderAnchor=function(t,e){var n=t.getModel("anchor"),i=n.get("show");if(i){var r=n.get("size"),o=n.get("icon"),a=n.get("offsetCenter"),s=n.get("keepAspect"),l=uc(o,e.cx-r/2+_i(a[0],e.r),e.cy-r/2+_i(a[1],e.r),r,r,null,s);l.z2=n.get("showAbove")?1:0,l.setStyle(n.getModel("itemStyle").getItemStyle()),this.group.add(l);}},n.prototype._renderTitleAndDetail=function(t,e,n,i,r){var o=this,a=t.getData(),s=a.mapDimension("value"),l=+t.get("min"),u=+t.get("max"),h=new O_(),c=[],p=[],f=t.isAnimationEnabled();a.diff(this._data).add(function(t){c[t]=new bb({silent:!0}),p[t]=new bb({silent:!0});}).update(function(t,e){c[t]=o._titleEls[e],p[t]=o._detailEls[e];}).execute(),a.each(function(e){var n=a.getItemModel(e),o=a.get(s,e),d=new O_(),g=i(mi(o,[l,u],[0,1],!0)),y=n.getModel("title");if(y.get("show")){var v=y.get("offsetCenter"),m=r.cx+_i(v[0],r.r),_=r.cy+_i(v[1],r.r),x=c[e];x.attr({style:Is(y,{x:m,y:_,text:a.getName(e),align:"center",verticalAlign:"middle"},{inheritColor:g})}),d.add(x);}var b=n.getModel("detail");if(b.get("show")){var w=b.get("offsetCenter"),S=r.cx+_i(w[0],r.r),M=r.cy+_i(w[1],r.r),T=_i(b.get("width"),r.r),C=_i(b.get("height"),r.r),I=t.get(["progress","show"])?a.getItemVisual(e,"style").fill:g,x=p[e],A=b.get("formatter");x.attr({style:Is(b,{x:S,y:M,text:Lg(o,A),width:isNaN(T)?null:T,height:isNaN(C)?null:C,align:"center",verticalAlign:"middle"},{inheritColor:I})}),Os(x,{normal:b},o,function(t){return Lg(t,A);}),f&&Rs(x,e,a,t,{getFormattedLabel:function getFormattedLabel(t,e,n,i,r,a){return Lg(a?a.interpolatedValue:o,A);}}),d.add(x);}h.add(d);}),this.group.add(h),this._titleEls=c,this._detailEls=p;},n.type="gauge",n;}(JM),yD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;
return e.type=n.type,e.visualStyleAccessPath="itemStyle",e.useColorPaletteOnData=!0,e;}return e(n,t),n.prototype.getInitialData=function(){return Ag(this,["value"]);},n.type="series.gauge",n.defaultOption={zlevel:0,z:2,center:["50%","50%"],legendHoverLink:!0,radius:"75%",startAngle:225,endAngle:-45,clockwise:!0,min:0,max:100,splitNumber:10,axisLine:{show:!0,roundCap:!1,lineStyle:{color:[[1,"#E6EBF8"]],width:10}},progress:{show:!1,overlap:!0,width:10,roundCap:!1,clip:!0},splitLine:{show:!0,length:10,distance:10,lineStyle:{color:"#63677A",width:3,type:"solid"}},axisTick:{show:!0,splitNumber:5,length:6,distance:10,lineStyle:{color:"#63677A",width:1,type:"solid"}},axisLabel:{show:!0,distance:15,color:"#464646",fontSize:12},pointer:{icon:null,offsetCenter:[0,0],show:!0,length:"60%",width:6,keepAspect:!1},anchor:{show:!1,showAbove:!1,size:6,icon:"circle",offsetCenter:[0,0],keepAspect:!1,itemStyle:{color:"#fff",borderWidth:0,borderColor:"#5470c6"}},title:{show:!0,offsetCenter:[0,"20%"],color:"#464646",fontSize:16,valueAnimation:!1},detail:{show:!0,backgroundColor:"rgba(0,0,0,0)",borderWidth:0,borderColor:"#ccc",width:100,height:null,padding:[5,10],offsetCenter:[0,"40%"],color:"#464646",fontSize:30,fontWeight:"bold",lineHeight:30,valueAnimation:!1}},n;}(qM);$f(Pg);var vD=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n.type="grid",n.dependencies=["xAxis","yAxis"],n.layoutMode="box",n.defaultOption={show:!1,zlevel:0,z:0,left:"10%",top:60,right:"10%",bottom:70,containLabel:!1,backgroundColor:"rgba(0,0,0,0)",borderWidth:1,borderColor:"#ccc"},n;}(FS),mD=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n.prototype.getCoordSysModel=function(){return this.getReferringComponents("grid",j_).models[0];},n.type="cartesian2dAxis",n;}(FS);d(mD,hk);var _D={show:!0,zlevel:0,z:0,inverse:!1,name:"",nameLocation:"end",nameRotate:null,nameTruncate:{maxWidth:null,ellipsis:"...",placeholder:"."},nameTextStyle:{},nameGap:15,silent:!1,triggerEvent:!1,tooltip:{show:!1},axisPointer:{},axisLine:{show:!0,onZero:!0,onZeroAxisIndex:null,lineStyle:{color:"#6E7079",width:1,type:"solid"},symbol:["none","none"],symbolSize:[10,15]},axisTick:{show:!0,inside:!1,length:5,lineStyle:{width:1}},axisLabel:{show:!0,inside:!1,rotate:0,showMinLabel:null,showMaxLabel:null,margin:8,fontSize:12},splitLine:{show:!0,lineStyle:{color:["#E0E6F1"],width:1,type:"solid"}},splitArea:{show:!1,areaStyle:{color:["rgba(250,250,250,0.2)","rgba(210,219,238,0.2)"]}}},xD=l({boundaryGap:!0,deduplication:null,splitLine:{show:!1},axisTick:{alignWithLabel:!1,interval:"auto"},axisLabel:{interval:"auto"}},_D),bD=l({boundaryGap:[0,0],axisLine:{show:"auto"},axisTick:{show:"auto"},splitNumber:5,minorTick:{show:!1,splitNumber:5,length:3,lineStyle:{}},minorSplitLine:{show:!1,lineStyle:{color:"#F4F7FD",width:1}}},_D),wD=l({scale:!0,splitNumber:6,axisLabel:{showMinLabel:!1,showMaxLabel:!1,rich:{primary:{fontWeight:"bold"}}},splitLine:{show:!1}},bD),SD=c({scale:!0,logBase:10},bD),MD={category:xD,value:bD,time:wD,log:SD},TD={value:1,category:1,time:1,log:1},CD=function(){function t(t){this.type="cartesian",this._dimList=[],this._axes={},this.name=t||"";}return t.prototype.getAxis=function(t){return this._axes[t];},t.prototype.getAxes=function(){return v(this._dimList,function(t){return this._axes[t];},this);},t.prototype.getAxesByScale=function(t){return t=t.toLowerCase(),_(this.getAxes(),function(e){return e.scale.type===t;});},t.prototype.addAxis=function(t){var e=t.dim;this._axes[e]=t,this._dimList.push(e);},t;}(),ID=["x","y"],AD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type="cartesian2d",e.dimensions=ID,e;}return e(n,t),n.prototype.calcAffineTransform=function(){this._transform=this._invTransform=null;var t=this.getAxis("x").scale,e=this.getAxis("y").scale;if(Eg(t)&&Eg(e)){var n=t.getExtent(),i=e.getExtent(),r=this.dataToPoint([n[0],i[0]]),o=this.dataToPoint([n[1],i[1]]),a=n[1]-n[0],s=i[1]-i[0];if(a&&s){var l=(o[0]-r[0])/a,u=(o[1]-r[1])/s,h=r[0]-n[0]*l,c=r[1]-i[0]*u,p=this._transform=[l,0,0,u,h,c];this._invTransform=Ye([],p);}}},n.prototype.getBaseAxis=function(){return this.getAxesByScale("ordinal")[0]||this.getAxesByScale("time")[0]||this.getAxis("x");},n.prototype.containPoint=function(t){var e=this.getAxis("x"),n=this.getAxis("y");return e.contain(e.toLocalCoord(t[0]))&&n.contain(n.toLocalCoord(t[1]));},n.prototype.containData=function(t){return this.getAxis("x").containData(t[0])&&this.getAxis("y").containData(t[1]);},n.prototype.dataToPoint=function(t,e,n){n=n||[];var i=t[0],r=t[1];if(this._transform&&null!=i&&isFinite(i)&&null!=r&&isFinite(r))return ge(n,t,this._transform);var o=this.getAxis("x"),a=this.getAxis("y");return n[0]=o.toGlobalCoord(o.dataToCoord(i)),n[1]=a.toGlobalCoord(a.dataToCoord(r)),n;},n.prototype.clampData=function(t,e){var n=this.getAxis("x").scale,i=this.getAxis("y").scale,r=n.getExtent(),o=i.getExtent(),a=n.parse(t[0]),s=i.parse(t[1]);return e=e||[],e[0]=Math.min(Math.max(Math.min(r[0],r[1]),a),Math.max(r[0],r[1])),e[1]=Math.min(Math.max(Math.min(o[0],o[1]),s),Math.max(o[0],o[1])),e;},n.prototype.pointToData=function(t,e){if(e=e||[],this._invTransform)return ge(e,t,this._invTransform);var n=this.getAxis("x"),i=this.getAxis("y");return e[0]=n.coordToData(n.toLocalCoord(t[0])),e[1]=i.coordToData(i.toLocalCoord(t[1])),e;},n.prototype.getOtherAxis=function(t){return this.getAxis("x"===t.dim?"y":"x");},n.prototype.getArea=function(){var t=this.getAxis("x").getGlobalExtent(),e=this.getAxis("y").getGlobalExtent(),n=Math.min(t[0],t[1]),i=Math.min(e[0],e[1]),r=Math.max(t[0],t[1])-n,o=Math.max(e[0],e[1])-i;return new t_(n,i,r,o);},n;}(CD),kD=function(t){function n(e,n,i,r,o){var a=t.call(this,e,n,i)||this;return a.index=0,a.type=r||"value",a.position=o||"bottom",a;}return e(n,t),n.prototype.isHorizontal=function(){var t=this.position;return"top"===t||"bottom"===t;},n.prototype.getGlobalExtent=function(t){var e=this.getExtent();return e[0]=this.toGlobalCoord(e[0]),e[1]=this.toGlobalCoord(e[1]),t&&e[0]>e[1]&&e.reverse(),e;},n.prototype.pointToData=function(t,e){return this.coordToData(this.toLocalCoord(t["x"===this.dim?0:1]),e);},n.prototype.setCategorySortInfo=function(t){return"category"!==this.type?!1:(this.model.option.categorySortInfo=t,void this.scale.setSortInfo(t));},n;}(wk),DD=function(){function t(t,e,n){this.type="grid",this._coordsMap={},this._coordsList=[],this._axesMap={},this._axesList=[],this.axisPointerEnabled=!0,this.dimensions=ID,this._initCartesian(t,e,n),this.model=t;}return t.prototype.getRect=function(){return this._rect;},t.prototype.update=function(t,e){var n=this._axesMap;this._updateScale(t,this.model),y(n.x,function(t){zf(t.scale,t.model);}),y(n.y,function(t){zf(t.scale,t.model);});var i={};y(n.x,function(t){Vg(n,"y",t,i);}),y(n.y,function(t){Vg(n,"x",t,i);}),this.resize(this.model,e);},t.prototype.resize=function(t,e,n){function i(){y(s,function(t){var e=t.isHorizontal(),n=e?[0,a.width]:[0,a.height],i=t.inverse?1:0;t.setExtent(n[i],n[1-i]),Gg(t,e?a.x:a.y);});}var r=t.getBoxLayoutParams(),o=!n&&t.get("containLabel"),a=Sl(r,{width:e.getWidth(),height:e.getHeight()});this._rect=a;var s=this._axesList;i(),o&&(y(s,function(t){if(!t.model.get(["axisLabel","inside"])){var e=Gf(t);if(e){var n=t.isHorizontal()?"height":"width",i=t.model.get(["axisLabel","margin"]);a[n]-=e[n]+i,"top"===t.position?a.y+=e.height+i:"left"===t.position&&(a.x+=e.width+i);}}}),i()),y(this._coordsList,function(t){t.calcAffineTransform();});},t.prototype.getAxis=function(t,e){var n=this._axesMap[t];return null!=n?n[e||0]:void 0;},t.prototype.getAxes=function(){return this._axesList.slice();},t.prototype.getCartesian=function(t,e){if(null!=t&&null!=e){var n="x"+t+"y"+e;return this._coordsMap[n];}k(t)&&(e=t.yAxisIndex,t=t.xAxisIndex);for(var i=0,r=this._coordsList;i<r.length;i++){if(r[i].getAxis("x").index===t||r[i].getAxis("y").index===e)return r[i];}},t.prototype.getCartesians=function(){return this._coordsList.slice();},t.prototype.convertToPixel=function(t,e,n){var i=this._findConvertTarget(e);return i.cartesian?i.cartesian.dataToPoint(n):i.axis?i.axis.toGlobalCoord(i.axis.dataToCoord(n)):null;},t.prototype.convertFromPixel=function(t,e,n){var i=this._findConvertTarget(e);return i.cartesian?i.cartesian.pointToData(n):i.axis?i.axis.coordToData(i.axis.toLocalCoord(n)):null;},t.prototype._findConvertTarget=function(t){var e,n,i=t.seriesModel,r=t.xAxisModel||i&&i.getReferringComponents("xAxis",j_).models[0],o=t.yAxisModel||i&&i.getReferringComponents("yAxis",j_).models[0],a=t.gridModel,s=this._coordsList;if(i)e=i.coordinateSystem,p(s,e)<0&&(e=null);else if(r&&o)e=this.getCartesian(r.componentIndex,o.componentIndex);else if(r)n=this.getAxis("x",r.componentIndex);else if(o)n=this.getAxis("y",o.componentIndex);else if(a){var l=a.coordinateSystem;l===this&&(e=this._coordsList[0]);}return{cartesian:e,axis:n};},t.prototype.containPoint=function(t){var e=this._coordsList[0];return e?e.containPoint(t):void 0;},t.prototype._initCartesian=function(t,e){function n(e){return function(n,i){if(Fg(n,t)){var l=n.get("position");"x"===e?"top"!==l&&"bottom"!==l&&(l=o.bottom?"top":"bottom"):"left"!==l&&"right"!==l&&(l=o.left?"right":"left"),o[l]=!0;var u=new kD(e,Nf(n),[0,0],n.get("type"),l),h="category"===u.type;u.onBand=h&&n.get("boundaryGap"),u.inverse=n.get("inverse"),n.axis=u,u.model=n,u.grid=r,u.index=i,r._axesList.push(u),a[e][i]=u,s[e]++;}};}var i=this,r=this,o={left:!1,right:!1,top:!1,bottom:!1},a={x:{},y:{}},s={x:0,y:0};return e.eachComponent("xAxis",n("x"),this),e.eachComponent("yAxis",n("y"),this),s.x&&s.y?(this._axesMap=a,void y(a.x,function(e,n){y(a.y,function(r,o){var a="x"+n+"y"+o,s=new AD(a);s.master=i,s.model=t,i._coordsMap[a]=s,i._coordsList.push(s),s.addAxis(e),s.addAxis(r);});})):(this._axesMap={},void(this._axesList=[]));},t.prototype._updateScale=function(t,e){function n(t,e){y(Xf(t,e.dim),function(n){e.scale.unionExtentFromData(t,n);});}y(this._axesList,function(t){if(t.scale.setExtent(1/0,-1/0),"category"===t.type){var e=t.model.get("categorySortInfo");t.scale.setSortInfo(e);}}),t.eachSeries(function(t){if(zg(t)){var i=Ng(t),r=i.xAxisModel,o=i.yAxisModel;if(!Fg(r,e)||!Fg(o,e))return;var a=this.getCartesian(r.componentIndex,o.componentIndex),s=t.getData(),l=a.getAxis("x"),u=a.getAxis("y");"list"===s.type&&(n(s,l),n(s,u));}},this);},t.prototype.getTooltipAxes=function(t){var e=[],n=[];return y(this.getCartesians(),function(i){var r=null!=t&&"auto"!==t?i.getAxis(t):i.getBaseAxis(),o=i.getOtherAxis(r);p(e,r)<0&&e.push(r),p(n,o)<0&&n.push(o);}),{baseAxes:e,otherAxes:n};},t.create=function(e,n){var i=[];return e.eachComponent("grid",function(r,o){var a=new t(r,e,n);a.name="grid_"+o,a.resize(r,n,!0),r.coordinateSystem=a,i.push(a);}),e.eachSeries(function(t){if(zg(t)){var e=Ng(t),n=e.xAxisModel,i=e.yAxisModel,r=n.getCoordSysModel(),o=r.coordinateSystem;t.coordinateSystem=o.getCartesian(n.componentIndex,i.componentIndex);}}),i;},t.dimensions=ID,t;}(),LD=Math.PI,PD=function(){function t(t,e){this.group=new O_(),this.opt=e,this.axisModel=t,c(e,{labelOffset:0,nameDirection:1,tickDirection:1,labelDirection:1,silent:!0,handleAutoShown:function handleAutoShown(){return!0;}});var n=new O_({x:e.position[0],y:e.position[1],rotation:e.rotation});n.updateTransform(),this._transformGroup=n;}return t.prototype.hasBuilder=function(t){return!!OD[t];},t.prototype.add=function(t){OD[t](this.opt,this.axisModel,this.group,this._transformGroup);},t.prototype.getGroup=function(){return this.group;},t.innerTextLayout=function(t,e,n){var i,r,o=Ci(e-t);return Ii(o)?(r=n>0?"top":"bottom",i="center"):Ii(o-LD)?(r=n>0?"bottom":"top",i="center"):(r="middle",i=o>0&&LD>o?n>0?"right":"left":n>0?"left":"right"),{rotation:o,textAlign:i,textVerticalAlign:r};},t.makeAxisEventDataBase=function(t){var e={componentType:t.mainType,componentIndex:t.componentIndex};return e[t.mainType+"Index"]=t.componentIndex,e;},t.isLabelSilent=function(t){var e=t.get("tooltip");return t.get("silent")||!(t.get("triggerEvent")||e&&e.show);},t;}(),OD={axisLine:function axisLine(t,e,n,i){var r=e.get(["axisLine","show"]);if("auto"===r&&t.handleAutoShown&&(r=t.handleAutoShown("axisLine")),r){var o=e.axis.getExtent(),a=i.transform,s=[o[0],0],l=[o[1],0];a&&(ge(s,s,a),ge(l,l,a));var u=h({lineCap:"round"},e.getModel(["axisLine","lineStyle"]).getLineStyle()),c=new Tw({subPixelOptimize:!0,shape:{x1:s[0],y1:s[1],x2:l[0],y2:l[1]},style:u,strokeContainThreshold:t.strokeContainThreshold||5,silent:!0,z2:1});c.anid="line",n.add(c);var p=e.get(["axisLine","symbol"]),f=e.get(["axisLine","symbolSize"]),d=e.get(["axisLine","symbolOffset"])||0;if("number"==typeof d&&(d=[d,d]),null!=p){"string"==typeof p&&(p=[p,p]),("string"==typeof f||"number"==typeof f)&&(f=[f,f]);var g=f[0],v=f[1];y([{rotate:t.rotation+Math.PI/2,offset:d[0],r:0},{rotate:t.rotation-Math.PI/2,offset:d[1],r:Math.sqrt((s[0]-l[0])*(s[0]-l[0])+(s[1]-l[1])*(s[1]-l[1]))}],function(e,i){if("none"!==p[i]&&null!=p[i]){var r=uc(p[i],-g/2,-v/2,g,v,u.stroke,!0),o=e.r+e.offset;r.attr({rotation:e.rotate,x:s[0]+o*Math.cos(t.rotation),y:s[1]-o*Math.sin(t.rotation),silent:!0,z2:11}),n.add(r);}});}}},axisTickLabel:function axisTickLabel(t,e,n,i){var r=Zg(n,i,e,t),o=$g(n,i,e,t);Ug(e,o,r),Kg(n,i,e,t.tickDirection);},axisName:function axisName(t,e,n,i){var r=z(t.axisName,e.get("name"));if(r){var o,a=e.get("nameLocation"),s=t.nameDirection,l=e.getModel("nameTextStyle"),u=e.get("nameGap")||0,h=e.axis.getExtent(),c=h[0]>h[1]?-1:1,p=["start"===a?h[0]-c*u:"end"===a?h[1]+c*u:(h[0]+h[1])/2,jg(a)?t.labelOffset+s*u:0],f=e.get("nameRotate");null!=f&&(f=f*LD/180);var d;jg(a)?o=PD.innerTextLayout(t.rotation,null!=f?f:t.rotation,s):(o=Wg(t.rotation,a,f||0,h),d=t.axisNameAvailableWidth,null!=d&&(d=Math.abs(d/Math.sin(o.rotation)),!isFinite(d)&&(d=null)));var g=l.getFont(),y=e.get("nameTruncate",!0)||{},v=y.ellipsis,m=z(t.nameTruncateMaxWidth,y.maxWidth,d),_=new bb({x:p[0],y:p[1],rotation:o.rotation,silent:PD.isLabelSilent(e),style:Is(l,{text:r,font:g,overflow:"truncate",width:m,ellipsis:v,fill:l.getTextColor()||e.get(["axisLine","lineStyle","color"]),align:l.get("align")||o.textAlign,verticalAlign:l.get("verticalAlign")||o.textVerticalAlign}),z2:1});if(ws({el:_,componentModel:e,itemName:r}),_.__fullText=r,_.anid="name",e.get("triggerEvent")){var x=PD.makeAxisEventDataBase(e);x.targetType="axisName",x.name=r,Mb(_).eventData=x;}i.add(_),_.updateTransform(),n.add(_),_.decomposeTransform();}}},RD={},ED=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.prototype.render=function(e,n,i){this.axisPointerClass&&ry(e),t.prototype.render.apply(this,arguments),this._doUpdateAxisPointerClass(e,i,!0);},n.prototype.updateAxisPointer=function(t,e,n){this._doUpdateAxisPointerClass(t,n,!1);},n.prototype.remove=function(t,e){var n=this._axisPointer;n&&n.remove(e);},n.prototype.dispose=function(e,n){this._disposeAxisPointer(n),t.prototype.dispose.apply(this,arguments);},n.prototype._doUpdateAxisPointerClass=function(t,e,i){var r=n.getAxisPointerClass(this.axisPointerClass);if(r){var o=ay(t);o?(this._axisPointer||(this._axisPointer=new r())).render(t,o,e,i):this._disposeAxisPointer(e);}},n.prototype._disposeAxisPointer=function(t){this._axisPointer&&this._axisPointer.dispose(t),this._axisPointer=null;},n.registerAxisPointerClass=function(t,e){RD[t]=e;},n.getAxisPointerClass=function(t){return t&&RD[t];},n.type="axis",n;}(ZM),BD=or(),zD=["axisLine","axisTickLabel","axisName"],ND=["splitArea","splitLine","minorSplitLine"],FD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e.axisPointerClass="CartesianAxisPointer",e;}return e(n,t),n.prototype.render=function(e,n,i,r){this.group.removeAll();var o=this._axisGroup;if(this._axisGroup=new O_(),this.group.add(this._axisGroup),e.get("show")){var a=e.getCoordSysModel(),s=Bg(a,e),l=new PD(e,h({handleAutoShown:function handleAutoShown(){for(var t=a.coordinateSystem.getCartesians(),n=0;n<t.length;n++){var i=t[n].getOtherAxis(e.axis).type;if("value"===i||"log"===i)return!0;}return!1;}},s));y(zD,l.add,l),this._axisGroup.add(l.getGroup()),y(ND,function(t){e.get([t,"show"])&&VD[t](this,this._axisGroup,e,a);},this),ds(o,this._axisGroup,e),t.prototype.render.call(this,e,n,i,r);}},n.prototype.remove=function(){hy(this);},n.type="cartesianAxis",n;}(ED),VD={splitLine:function splitLine(t,e,n,i){var r=n.axis;if(!r.scale.isBlank()){var o=n.getModel("splitLine"),a=o.getModel("lineStyle"),s=a.get("color");s=M(s)?s:[s];for(var l=i.coordinateSystem.getRect(),u=r.isHorizontal(),h=0,p=r.getTicksCoords({tickModel:o}),f=[],d=[],g=a.getLineStyle(),y=0;y<p.length;y++){var v=r.toGlobalCoord(p[y].coord);u?(f[0]=v,f[1]=l.y,d[0]=v,d[1]=l.y+l.height):(f[0]=l.x,f[1]=v,d[0]=l.x+l.width,d[1]=v);var m=h++%s.length,_=p[y].tickValue;e.add(new Tw({anid:null!=_?"line_"+p[y].tickValue:null,subPixelOptimize:!0,autoBatch:!0,shape:{x1:f[0],y1:f[1],x2:d[0],y2:d[1]},style:c({stroke:s[m]},g),silent:!0}));}}},minorSplitLine:function minorSplitLine(t,e,n,i){var r=n.axis,o=n.getModel("minorSplitLine"),a=o.getModel("lineStyle"),s=i.coordinateSystem.getRect(),l=r.isHorizontal(),u=r.getMinorTicksCoords();if(u.length)for(var h=[],c=[],p=a.getLineStyle(),f=0;f<u.length;f++){for(var d=0;d<u[f].length;d++){var g=r.toGlobalCoord(u[f][d].coord);l?(h[0]=g,h[1]=s.y,c[0]=g,c[1]=s.y+s.height):(h[0]=s.x,h[1]=g,c[0]=s.x+s.width,c[1]=g),e.add(new Tw({anid:"minor_line_"+u[f][d].tickValue,subPixelOptimize:!0,autoBatch:!0,shape:{x1:h[0],y1:h[1],x2:c[0],y2:c[1]},style:p,silent:!0}));}}},splitArea:function splitArea(t,e,n,i){uy(t,e,n,i);}},HD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.type="xAxis",n;}(FD),GD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=HD.type,e;}return e(n,t),n.type="yAxis",n;}(FD),WD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type="grid",e;}return e(n,t),n.prototype.render=function(t){this.group.removeAll(),t.get("show")&&this.group.add(new vb({shape:t.coordinateSystem.getRect(),style:c({fill:t.get("backgroundColor")},t.getItemStyle()),silent:!0,z2:-1}));},n.type="grid",n;}(ZM),UD={offset:0};$f(cy);var YD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e.layoutMode={type:"box",ignoreSize:!0},e;}return e(n,t),n.type="title",n.defaultOption={zlevel:0,z:6,show:!0,text:"",target:"blank",subtext:"",subtarget:"blank",left:0,top:0,backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderWidth:0,padding:5,itemGap:10,textStyle:{fontSize:18,fontWeight:"bold",color:"#464646"},subtextStyle:{fontSize:12,color:"#6E7079"}},n;}(FS),XD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.prototype.render=function(t,e,n){if(this.group.removeAll(),t.get("show")){var i=this.group,r=t.getModel("textStyle"),o=t.getModel("subtextStyle"),a=t.get("textAlign"),s=N(t.get("textBaseline"),t.get("textVerticalAlign")),l=new bb({style:Is(r,{text:t.get("text"),fill:r.getTextColor()},{disableBox:!0}),z2:10}),u=l.getBoundingRect(),h=t.get("subtext"),c=new bb({style:Is(o,{text:h,fill:o.getTextColor(),y:u.height+t.get("itemGap"),verticalAlign:"top"},{disableBox:!0}),z2:10}),p=t.get("link"),f=t.get("sublink"),d=t.get("triggerEvent",!0);l.silent=!p&&!d,c.silent=!f&&!d,p&&l.on("click",function(){bl(p,"_"+t.get("target"));}),f&&c.on("click",function(){bl(f,"_"+t.get("subtarget"));}),Mb(l).eventData=Mb(c).eventData=d?{componentType:"title",componentIndex:t.componentIndex}:null,i.add(l),h&&i.add(c);var g=i.getBoundingRect(),y=t.getBoxLayoutParams();y.width=g.width,y.height=g.height;var v=Sl(y,{width:n.getWidth(),height:n.getHeight()},t.get("padding"));a||(a=t.get("left")||t.get("right"),"middle"===a&&(a="center"),"right"===a?v.x+=v.width:"center"===a&&(v.x+=v.width/2)),s||(s=t.get("top")||t.get("bottom"),"center"===s&&(s="middle"),"bottom"===s?v.y+=v.height:"middle"===s&&(v.y+=v.height/2),s=s||"top"),i.x=v.x,i.y=v.y,i.markRedraw();var m={align:a,verticalAlign:s};l.setStyle(m),c.setStyle(m),g=i.getBoundingRect();var _=v.margin,x=t.getItemStyle(["color","opacity"]);x.fill=t.get("backgroundColor");var b=new vb({shape:{x:g.x-_[3],y:g.y-_[0],width:g.width+_[1]+_[3],height:g.height+_[0]+_[2],r:t.get("borderRadius")},style:x,subPixelOptimize:!0,silent:!0});i.add(b);}},n.type="title",n;}(ZM);$f(py);var jD=function jD(t,e){return"all"===e?{type:"all",title:t.getLocale(["legend","selector","all"])}:"inverse"===e?{type:"inverse",title:t.getLocale(["legend","selector","inverse"])}:void 0;},qD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e.layoutMode={type:"box",ignoreSize:!0},e;}return e(n,t),n.prototype.init=function(t,e,n){this.mergeDefaultAndTheme(t,n),t.selected=t.selected||{},this._updateSelector(t);},n.prototype.mergeOption=function(e,n){t.prototype.mergeOption.call(this,e,n),this._updateSelector(e);},n.prototype._updateSelector=function(t){var e=t.selector,n=this.ecModel;e===!0&&(e=t.selector=["all","inverse"]),M(e)&&y(e,function(t,i){C(t)&&(t={type:t}),e[i]=l(t,jD(n,t.type));});},n.prototype.optionUpdated=function(){this._updateData(this.ecModel);var t=this._data;if(t[0]&&"single"===this.get("selectedMode")){for(var e=!1,n=0;n<t.length;n++){var i=t[n].get("name");if(this.isSelected(i)){this.select(i),e=!0;break;}}!e&&this.select(t[0].get("name"));}},n.prototype._updateData=function(t){var e=[],n=[];t.eachRawSeries(function(i){var r=i.name;n.push(r);var o;if(i.legendVisualProvider){var a=i.legendVisualProvider,s=a.getAllNames();t.isSeriesFiltered(i)||(n=n.concat(s)),s.length?e=e.concat(s):o=!0;}else o=!0;o&&tr(i)&&e.push(i.name);}),this._availableNames=n;var i=this.get("data")||e,r=v(i,function(t){return("string"==typeof t||"number"==typeof t)&&(t={name:t}),new uS(t,this,this.ecModel);},this);this._data=r;},n.prototype.getData=function(){return this._data;},n.prototype.select=function(t){var e=this.option.selected,n=this.get("selectedMode");if("single"===n){var i=this._data;y(i,function(t){e[t.get("name")]=!1;});}e[t]=!0;},n.prototype.unSelect=function(t){"single"!==this.get("selectedMode")&&(this.option.selected[t]=!1);},n.prototype.toggleSelected=function(t){var e=this.option.selected;e.hasOwnProperty(t)||(e[t]=!0),this[e[t]?"unSelect":"select"](t);},n.prototype.allSelect=function(){var t=this._data,e=this.option.selected;y(t,function(t){e[t.get("name",!0)]=!0;});},n.prototype.inverseSelect=function(){var t=this._data,e=this.option.selected;y(t,function(t){var n=t.get("name",!0);e.hasOwnProperty(n)||(e[n]=!0),e[n]=!e[n];});},n.prototype.isSelected=function(t){var e=this.option.selected;return!(e.hasOwnProperty(t)&&!e[t])&&p(this._availableNames,t)>=0;},n.prototype.getOrient=function(){return"vertical"===this.get("orient")?{index:1,name:"vertical"}:{index:0,name:"horizontal"};},n.type="legend.plain",n.dependencies=["series"],n.defaultOption={zlevel:0,z:4,show:!0,orient:"horizontal",left:"center",top:0,align:"auto",backgroundColor:"rgba(0,0,0,0)",borderColor:"#ccc",borderRadius:0,borderWidth:0,padding:5,itemGap:10,itemWidth:25,itemHeight:14,symbolSize:"auto",inactiveColor:"#ccc",inactiveBorderColor:"#ccc",inactiveBorderWidth:"auto",itemStyle:{color:"inherit",opacity:"inherit",decal:"inherit",shadowBlur:0,shadowColor:null,shadowOffsetX:0,shadowOffsetY:0,borderColor:"inherit",borderWidth:"auto",borderCap:"inherit",borderJoin:"inherit",borderDashOffset:"inherit",borderMiterLimit:"inherit"},lineStyle:{width:"auto",color:"inherit",inactiveColor:"#ccc",inactiveWidth:2,opacity:"inherit",type:"inherit",cap:"inherit",join:"inherit",dashOffset:"inherit",miterLimit:"inherit",shadowBlur:0,shadowColor:null,shadowOffsetX:0,shadowOffsetY:0},textStyle:{color:"#333"},selectedMode:!0,selector:!1,selectorLabel:{show:!0,borderRadius:10,padding:[3,5,3,5],fontSize:12,fontFamily:" sans-serif",color:"#666",borderWidth:1,borderColor:"#666"},emphasis:{selectorLabel:{show:!0,color:"#eee",backgroundColor:"#666"}},selectorPosition:"auto",selectorItemGap:7,selectorButtonGap:10,tooltip:{show:!1}},n;}(FS),ZD=S,KD=y,$D=O_,JD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e.newlineDisabled=!1,e;}return e(n,t),n.prototype.init=function(){this.group.add(this._contentGroup=new $D()),this.group.add(this._selectorGroup=new $D()),this._isFirstRender=!0;},n.prototype.getContentGroup=function(){return this._contentGroup;},n.prototype.getSelectorGroup=function(){return this._selectorGroup;},n.prototype.render=function(t,e,n){var i=this._isFirstRender;if(this._isFirstRender=!1,this.resetInner(),t.get("show",!0)){var r=t.get("align"),o=t.get("orient");r&&"auto"!==r||(r="right"===t.get("left")&&"vertical"===o?"right":"left");var a=t.get("selector",!0),s=t.get("selectorPosition",!0);!a||s&&"auto"!==s||(s="horizontal"===o?"end":"start"),this.renderInner(r,t,e,n,a,o,s);var l=t.getBoxLayoutParams(),u={width:n.getWidth(),height:n.getHeight()},h=t.get("padding"),p=Sl(l,u,h),f=this.layoutInner(t,r,p,i,a,s),d=Sl(c({width:f.width,height:f.height},l),u,h);this.group.x=d.x-f.x,this.group.y=d.y-f.y,this.group.markRedraw(),this.group.add(this._backgroundEl=fy(f,t));}},n.prototype.resetInner=function(){this.getContentGroup().removeAll(),this._backgroundEl&&this.group.remove(this._backgroundEl),this.getSelectorGroup().removeAll();},n.prototype.renderInner=function(t,e,n,i,r,o,a){var s=this.getContentGroup(),l=X(),u=e.get("selectedMode"),h=[];n.eachRawSeries(function(t){!t.get("legendHoverLink")&&h.push(t.id);}),KD(e.getData(),function(r,o){var a=r.get("name");if(!this.newlineDisabled&&(""===a||"\n"===a)){var c=new $D();return c.newline=!0,void s.add(c);}var p=n.getSeriesByName(a)[0];if(!l.get(a))if(p){var f=p.getData(),d=f.getVisual("legendLineStyle")||{},g=f.getVisual("legendSymbol"),y=f.getVisual("style");f.getVisual("symbolSize");var v=this._createItem(p,a,o,r,e,t,d,y,g,u);v.on("click",ZD(yy,a,null,i,h)).on("mouseover",ZD(my,p.name,null,i,h)).on("mouseout",ZD(_y,p.name,null,i,h)),l.set(a,!0);}else n.eachRawSeries(function(n){if(!l.get(a)&&n.legendVisualProvider){var s=n.legendVisualProvider;if(!s.containName(a))return;var c=s.indexOfName(a),p=s.getItemVisual(c,"style"),f=s.getItemVisual(c,"legendSymbol"),d=on(p.fill);d&&0===d[3]&&(d[3]=.2,p.fill=dn(d,"rgba"));var g=this._createItem(n,a,o,r,e,t,{},p,f,u);g.on("click",ZD(yy,null,a,i,h)).on("mouseover",ZD(my,null,a,i,h)).on("mouseout",ZD(_y,null,a,i,h)),l.set(a,!0);}},this);},this),r&&this._createSelector(r,e,i,o,a);},n.prototype._createSelector=function(t,e,n){var i=this.getSelectorGroup();KD(t,function(t){var r=t.type,o=new bb({style:{x:0,y:0,align:"center",verticalAlign:"middle"},onclick:function onclick(){n.dispatchAction({type:"all"===r?"legendAllSelect":"legendInverseSelect"});}});i.add(o);var a=e.getModel("selectorLabel"),s=e.getModel(["emphasis","selectorLabel"]);Ts(o,{normal:a,emphasis:s},{defaultText:t.title}),ma(o);});},n.prototype._createItem=function(t,e,n,i,r,o,a,s,l,u){var h=t.visualDrawType,c=r.get("itemWidth"),p=r.get("itemHeight"),f=r.isSelected(e),d=i.get("symbolKeepAspect"),g=i.get("icon");l=g||l||"roundRect";var y=r.getModel("lineStyle"),v=dy(l,i,y,a,s,h,f),m=new $D(),_=i.getModel("textStyle");m.add("function"!=typeof t.getLegendIcon||g?gy({itemWidth:c,itemHeight:p,symbolType:l,symbolKeepAspect:d,itemStyle:v.itemStyle,lineStyle:v.lineStyle}):t.getLegendIcon({itemWidth:c,itemHeight:p,symbolType:l,symbolKeepAspect:d,itemStyle:v.itemStyle,lineStyle:v.lineStyle}));var x="left"===o?c+5:-5,b=o,w=r.get("formatter"),S=e;"string"==typeof w&&w?S=w.replace("{name}",null!=e?e:""):"function"==typeof w&&(S=w(e));var M=i.get("inactiveColor");m.add(new bb({style:Is(_,{text:S,x:x,y:p/2,fill:f?_.getTextColor():M,align:b,verticalAlign:"middle"})}));var T=new vb({shape:m.getBoundingRect(),invisible:!0}),C=i.getModel("tooltip");return C.get("show")&&ws({el:T,componentModel:r,itemName:e,itemTooltipOption:C.option}),m.add(T),m.eachChild(function(t){t.silent=!0;}),T.silent=!u,this.getContentGroup().add(m),ma(m),m.__legendDataIndex=n,m;},n.prototype.layoutInner=function(t,e,n,i,r,o){var a=this.getContentGroup(),s=this.getSelectorGroup();zS(t.get("orient"),a,t.get("itemGap"),n.width,n.height);var l=a.getBoundingRect(),u=[-l.x,-l.y];if(s.markRedraw(),a.markRedraw(),r){zS("horizontal",s,t.get("selectorItemGap",!0));var h=s.getBoundingRect(),c=[-h.x,-h.y],p=t.get("selectorButtonGap",!0),f=t.getOrient().index,d=0===f?"width":"height",g=0===f?"height":"width",y=0===f?"y":"x";"end"===o?c[f]+=l[d]+p:u[f]+=h[d]+p,c[1-f]+=l[g]/2-h[g]/2,s.x=c[0],s.y=c[1],a.x=u[0],a.y=u[1];var v={x:0,y:0};return v[d]=l[d]+p+h[d],v[g]=Math.max(l[g],h[g]),v[y]=Math.min(0,h[y]+c[1-f]),v;}return a.x=u[0],a.y=u[1],this.group.getBoundingRect();},n.prototype.remove=function(){this.getContentGroup().removeAll(),this._isFirstRender=!0;},n.type="legend.plain",n;}(ZM),QD=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.prototype.setScrollDataIndex=function(t){this.option.scrollDataIndex=t;},n.prototype.init=function(e,n,i){var r=Cl(e);t.prototype.init.call(this,e,n,i),My(this,e,r);},n.prototype.mergeOption=function(e,n){t.prototype.mergeOption.call(this,e,n),My(this,this.option,e);},n.type="legend.scroll",n.defaultOption=Ns(qD.defaultOption,{scrollDataIndex:0,pageButtonItemGap:5,pageButtonGap:null,pageButtonPosition:"end",pageFormatter:"{current}/{total}",pageIcons:{horizontal:["M0,0L12,-10L12,10z","M0,0L-12,-10L-12,10z"],vertical:["M0,0L20,0L10,-20z","M0,0L20,0L10,20z"]},pageIconColor:"#2f4554",pageIconInactiveColor:"#aaa",pageIconSize:15,pageTextStyle:{color:"#333"},animationDurationUpdate:800}),n;}(qD),tL=O_,eL=["width","height"],nL=["x","y"],iL=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e.newlineDisabled=!0,e._currentIndex=0,e;}return e(n,t),n.prototype.init=function(){t.prototype.init.call(this),this.group.add(this._containerGroup=new tL()),this._containerGroup.add(this.getContentGroup()),this.group.add(this._controllerGroup=new tL());},n.prototype.resetInner=function(){t.prototype.resetInner.call(this),this._controllerGroup.removeAll(),this._containerGroup.removeClipPath(),this._containerGroup.__rectSize=null;},n.prototype.renderInner=function(e,n,i,r,o,a,s){function l(t,e){var i=t+"DataIndex",o=vs(n.get("pageIcons",!0)[n.getOrient().name][e],{onclick:qv(u._pageGo,u,i,n,r)},{x:-p[0]/2,y:-p[1]/2,width:p[0],height:p[1]});o.name=t,h.add(o);}var u=this;t.prototype.renderInner.call(this,e,n,i,r,o,a,s);var h=this._controllerGroup,c=n.get("pageIconSize",!0),p=M(c)?c:[c,c];l("pagePrev",0);var f=n.getModel("pageTextStyle");h.add(new bb({name:"pageText",style:{text:"xx/xx",fill:f.getTextColor(),font:f.getFont(),verticalAlign:"middle",align:"center"},silent:!0})),l("pageNext",1);},n.prototype.layoutInner=function(t,e,n,i,r,o){var a=this.getSelectorGroup(),l=t.getOrient().index,u=eL[l],h=nL[l],c=eL[1-l],p=nL[1-l];r&&zS("horizontal",a,t.get("selectorItemGap",!0));var f=t.get("selectorButtonGap",!0),d=a.getBoundingRect(),g=[-d.x,-d.y],y=s(n);r&&(y[u]=n[u]-d[u]-f);var v=this._layoutContentAndController(t,i,y,l,u,c,p,h);if(r){if("end"===o)g[l]+=v[u]+f;else{var m=d[u]+f;g[l]-=m,v[h]-=m;}v[u]+=d[u]+f,g[1-l]+=v[p]+v[c]/2-d[c]/2,v[c]=Math.max(v[c],d[c]),v[p]=Math.min(v[p],d[p]+g[1-l]),a.x=g[0],a.y=g[1],a.markRedraw();}return v;},n.prototype._layoutContentAndController=function(t,e,n,i,r,o,a,s){var l=this.getContentGroup(),u=this._containerGroup,h=this._controllerGroup;zS(t.get("orient"),l,t.get("itemGap"),i?n.width:null,i?null:n.height),zS("horizontal",h,t.get("pageButtonItemGap",!0));var c=l.getBoundingRect(),p=h.getBoundingRect(),f=this._showController=c[r]>n[r],d=[-c.x,-c.y];e||(d[i]=l[s]);var g=[0,0],y=[-p.x,-p.y],v=N(t.get("pageButtonGap",!0),t.get("itemGap",!0));if(f){var m=t.get("pageButtonPosition",!0);"end"===m?y[i]+=n[r]-p[r]:g[i]+=p[r]+v;}y[1-i]+=c[o]/2-p[o]/2,l.setPosition(d),u.setPosition(g),h.setPosition(y);var _={x:0,y:0};if(_[r]=f?n[r]:c[r],_[o]=Math.max(c[o],p[o]),_[a]=Math.min(0,p[a]+y[1-i]),u.__rectSize=n[r],f){var x={x:0,y:0};x[r]=Math.max(n[r]-p[r]-v,0),x[o]=_[o],u.setClipPath(new vb({shape:x})),u.__rectSize=x[r];}else h.eachChild(function(t){t.attr({invisible:!0,silent:!0});
});var b=this._getPageInfo(t);return null!=b.pageIndex&&is(l,{x:b.contentPosition[0],y:b.contentPosition[1]},f?t:null),this._updatePageInfoView(t,b),_;},n.prototype._pageGo=function(t,e,n){var i=this._getPageInfo(e)[t];null!=i&&n.dispatchAction({type:"legendScroll",scrollDataIndex:i,legendId:e.id});},n.prototype._updatePageInfoView=function(t,e){var n=this._controllerGroup;y(["pagePrev","pageNext"],function(i){var r=i+"DataIndex",o=null!=e[r],a=n.childOfName(i);a&&(a.setStyle("fill",o?t.get("pageIconColor",!0):t.get("pageIconInactiveColor",!0)),a.cursor=o?"pointer":"default");});var i=n.childOfName("pageText"),r=t.get("pageFormatter"),o=e.pageIndex,a=null!=o?o+1:0,s=e.pageCount;i&&r&&i.setStyle("text",C(r)?r.replace("{current}",null==a?"":a+"").replace("{total}",null==s?"":s+""):r({current:a,total:s}));},n.prototype._getPageInfo=function(t){function e(t){if(t){var e=t.getBoundingRect(),n=e[l]+t[l];return{s:n,e:n+e[s],i:t.__legendDataIndex};}}function n(t,e){return t.e>=e&&t.s<=e+o;}var i=t.get("scrollDataIndex",!0),r=this.getContentGroup(),o=this._containerGroup.__rectSize,a=t.getOrient().index,s=eL[a],l=nL[a],u=this._findTargetItemIndex(i),h=r.children(),c=h[u],p=h.length,f=p?1:0,d={contentPosition:[r.x,r.y],pageCount:f,pageIndex:f-1,pagePrevDataIndex:null,pageNextDataIndex:null};if(!c)return d;var g=e(c);d.contentPosition[a]=-g.s;for(var y=u+1,v=g,m=g,_=null;p>=y;++y){_=e(h[y]),(!_&&m.e>v.s+o||_&&!n(_,v.s))&&(v=m.i>v.i?m:_,v&&(null==d.pageNextDataIndex&&(d.pageNextDataIndex=v.i),++d.pageCount)),m=_;}for(var y=u-1,v=g,m=g,_=null;y>=-1;--y){_=e(h[y]),_&&n(m,_.s)||!(v.i<m.i)||(m=v,null==d.pagePrevDataIndex&&(d.pagePrevDataIndex=v.i),++d.pageCount,++d.pageIndex),v=_;}return d;},n.prototype._findTargetItemIndex=function(t){if(!this._showController)return 0;var e,n,i=this.getContentGroup();return i.eachChild(function(i,r){var o=i.__legendDataIndex;null==n&&null!=o&&(n=r),o===t&&(e=r);}),null!=e?e:n;},n.type="legend.scroll",n;}(JD);$f(Cy);var rL=or(),oL=s,aL=qv,sL=function(){function t(){this._dragging=!1,this.animationThreshold=15;}return t.prototype.render=function(t,e,n,i){var r=e.get("value"),o=e.get("status");if(this._axisModel=t,this._axisPointerModel=e,this._api=n,i||this._lastValue!==r||this._lastStatus!==o){this._lastValue=r,this._lastStatus=o;var a=this._group,s=this._handle;if(!o||"hide"===o)return a&&a.hide(),void(s&&s.hide());a&&a.show(),s&&s.show();var l={};this.makeElOption(l,r,t,e,n);var u=l.graphicKey;u!==this._lastGraphicKey&&this.clear(n),this._lastGraphicKey=u;var h=this._moveAnimation=this.determineAnimation(t,e);if(a){var c=S(Iy,e,h);this.updatePointerEl(a,l,c),this.updateLabelEl(a,l,c,e);}else a=this._group=new O_(),this.createPointerEl(a,l,t,e),this.createLabelEl(a,l,t,e),n.getZr().add(a);Ly(a,e,!0),this._renderHandle(r);}},t.prototype.remove=function(t){this.clear(t);},t.prototype.dispose=function(t){this.clear(t);},t.prototype.determineAnimation=function(t,e){var n=e.get("animation"),i=t.axis,r="category"===i.type,o=e.get("snap");if(!o&&!r)return!1;if("auto"===n||null==n){var a=this.animationThreshold;if(r&&i.getBandWidth()>a)return!0;if(o){var s=oy(t).seriesDataCount,l=i.getExtent();return Math.abs(l[0]-l[1])/s>a;}return!1;}return n===!0;},t.prototype.makeElOption=function(){},t.prototype.createPointerEl=function(t,e){var n=e.pointer;if(n){var i=rL(t).pointerEl=new qw[n.type](oL(e.pointer));t.add(i);}},t.prototype.createLabelEl=function(t,e,n,i){if(e.label){var r=rL(t).labelEl=new bb(oL(e.label));t.add(r),ky(r,i);}},t.prototype.updatePointerEl=function(t,e,n){var i=rL(t).pointerEl;i&&e.pointer&&(i.setStyle(e.pointer.style),n(i,{shape:e.pointer.shape}));},t.prototype.updateLabelEl=function(t,e,n,i){var r=rL(t).labelEl;r&&(r.setStyle(e.label.style),n(r,{x:e.label.x,y:e.label.y}),ky(r,i));},t.prototype._renderHandle=function(t){if(!this._dragging&&this.updateHandleTransform){var e=this._axisPointerModel,n=this._api.getZr(),i=this._handle,r=e.getModel("handle"),o=e.get("status");if(!r.get("show")||!o||"hide"===o)return i&&n.remove(i),void(this._handle=null);var a;this._handle||(a=!0,i=this._handle=vs(r.get("icon"),{cursor:"move",draggable:!0,onmousemove:function onmousemove(t){pm(t.event);},onmousedown:aL(this._onHandleDragMove,this,0,0),drift:aL(this._onHandleDragMove,this),ondragend:aL(this._onHandleDragEnd,this)}),n.add(i)),Ly(i,e,!1),i.setStyle(r.getItemStyle(null,["color","borderColor","borderWidth","opacity","shadowColor","shadowBlur","shadowOffsetX","shadowOffsetY"]));var s=r.get("size");M(s)||(s=[s,s]),i.scaleX=s[0]/2,i.scaleY=s[1]/2,bh(this,"_doDispatchAxisPointer",r.get("throttle")||0,"fixRate"),this._moveHandleToValue(t,a);}},t.prototype._moveHandleToValue=function(t,e){Iy(this._axisPointerModel,!e&&this._moveAnimation,this._handle,Dy(this.getHandleTransform(t,this._axisModel,this._axisPointerModel)));},t.prototype._onHandleDragMove=function(t,e){var n=this._handle;if(n){this._dragging=!0;var i=this.updateHandleTransform(Dy(n),[t,e],this._axisModel,this._axisPointerModel);this._payloadInfo=i,n.stopAnimation(),n.attr(Dy(i)),rL(n).lastProp=null,this._doDispatchAxisPointer();}},t.prototype._doDispatchAxisPointer=function(){var t=this._handle;if(t){var e=this._payloadInfo,n=this._axisModel;this._api.dispatchAction({type:"updateAxisPointer",x:e.cursorPoint[0],y:e.cursorPoint[1],tooltipOption:e.tooltipOption,axesInfo:[{axisDim:n.axis.dim,axisIndex:n.componentIndex}]});}},t.prototype._onHandleDragEnd=function(){this._dragging=!1;var t=this._handle;if(t){var e=this._axisPointerModel.get("value");this._moveHandleToValue(e),this._api.dispatchAction({type:"hideTip"});}},t.prototype.clear=function(t){this._lastValue=null,this._lastStatus=null;var e=t.getZr(),n=this._group,i=this._handle;e&&n&&(this._lastGraphicKey=null,n&&e.remove(n),i&&e.remove(i),this._group=null,this._handle=null,this._payloadInfo=null);},t.prototype.doClear=function(){},t.prototype.buildLabel=function(t,e,n){return n=n||0,{x:t[n],y:t[1-n],width:e[n],height:e[1-n]};},t;}(),lL=function(t){function n(){return null!==t&&t.apply(this,arguments)||this;}return e(n,t),n.prototype.makeElOption=function(t,e,n,i,r){var o=n.axis,a=o.grid,s=i.get("type"),l=Vy(a,o).getOtherAxis(o).getGlobalExtent(),u=o.toGlobalCoord(o.dataToCoord(e,!0));if(s&&"none"!==s){var h=Py(i),c=uL[s](o,u,l);c.style=h,t.graphicKey=c.type,t.pointer=c;}var p=Bg(a.model,n);zy(e,t,p,n,i,r);},n.prototype.getHandleTransform=function(t,e,n){var i=Bg(e.axis.grid.model,e,{labelInside:!1});i.labelMargin=n.get(["handle","margin"]);var r=By(e.axis,t,i);return{x:r[0],y:r[1],rotation:i.rotation+(i.labelDirection<0?Math.PI:0)};},n.prototype.updateHandleTransform=function(t,e,n){var i=n.axis,r=i.grid,o=i.getGlobalExtent(!0),a=Vy(r,i).getOtherAxis(i).getGlobalExtent(),s="x"===i.dim?0:1,l=[t.x,t.y];l[s]+=e[s],l[s]=Math.min(o[1],l[s]),l[s]=Math.max(o[0],l[s]);var u=(a[1]+a[0])/2,h=[u,u];h[s]=l[s];var c=[{verticalAlign:"middle"},{align:"center"}];return{x:l[0],y:l[1],rotation:t.rotation,cursorPoint:h,tooltipOption:c[s]};},n;}(sL),uL={line:function line(t,e,n){var i=Ny([e,n[0]],[e,n[1]],Hy(t));return{type:"Line",subPixelOptimize:!0,shape:i};},shadow:function shadow(t,e,n){var i=Math.max(1,t.getBandWidth()),r=n[1]-n[0];return{type:"Rect",shape:Fy([e-i/2,n[0]],[i,r],Hy(t))};}},hL=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.type="axisPointer",n.defaultOption={show:"auto",zlevel:0,z:50,type:"line",snap:!1,triggerTooltip:!0,value:null,status:null,link:[],animation:null,animationDurationUpdate:200,lineStyle:{color:"#B9BEC9",width:1,type:"dashed"},shadowStyle:{color:"rgba(210,219,238,0.2)"},label:{show:!0,formatter:null,precision:"auto",margin:3,color:"#fff",padding:[5,7,5,7],backgroundColor:"auto",borderColor:null,borderWidth:0,borderRadius:3},handle:{show:!1,icon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",size:45,margin:50,color:"#333",shadowBlur:3,shadowColor:"#aaa",shadowOffsetX:0,shadowOffsetY:2,throttle:40}},n;}(FS),cL=or(),pL=y,fL=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.prototype.render=function(t,e,n){var i=e.getComponent("tooltip"),r=t.get("triggerOn")||i&&i.get("triggerOn")||"mousemove|click";Gy("axisPointer",n,function(t,e,n){"none"!==r&&("leave"===t||r.indexOf(t)>=0)&&n({type:"updateAxisPointer",currTrigger:t,x:e&&e.offsetX,y:e&&e.offsetY});});},n.prototype.remove=function(t,e){qy("axisPointer",e);},n.prototype.dispose=function(t,e){qy("axisPointer",e);},n.type="axisPointer",n;}(ZM),dL=or(),gL=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.type="tooltip",n.dependencies=["axisPointer"],n.defaultOption={zlevel:0,z:60,show:!0,showContent:!0,trigger:"item",triggerOn:"mousemove|click",alwaysShowContent:!1,displayMode:"single",renderMode:"auto",confine:null,showDelay:0,hideDelay:100,transitionDuration:.4,enterable:!1,backgroundColor:"#fff",shadowBlur:10,shadowColor:"rgba(0, 0, 0, .2)",shadowOffsetX:1,shadowOffsetY:2,borderRadius:4,borderWidth:1,padding:null,extraCssText:"",axisPointer:{type:"line",axis:"auto",animation:"auto",animationDurationUpdate:200,animationEasingUpdate:"exponentialOut",crossStyle:{color:"#999",width:1,type:"dashed",textStyle:{}}},textStyle:{color:"#666",fontSize:14}},n;}(FS),yL=uv(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),vL=uv(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),mL=hv(vL,"transition"),_L=hv(yL,"transform"),xL="position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;"+(Rv.transform3dSupported?"will-change:transform;":""),bL=function(){function t(t,e,n){if(this._show=!1,this._styleCoord=[0,0,0,0],this._enterable=!0,this._firstShow=!0,this._longHide=!0,Rv.wxa)return null;var i=document.createElement("div");i.domBelongToZr=!0,this.el=i;var r=this._zr=e.getZr(),o=this._appendToBody=n&&n.appendToBody;mv(this._styleCoord,r,o,e.getWidth()/2,e.getHeight()/2),o?document.body.appendChild(i):t.appendChild(i),this._container=t;var a=this;i.onmouseenter=function(){a._enterable&&(clearTimeout(a._hideTimeout),a._show=!0),a._inContent=!0;},i.onmousemove=function(t){if(t=t||window.event,!a._enterable){var e=r.handler,n=r.painter.getViewportRoot();Ae(n,t,!0),e.dispatch("mousemove",t);}},i.onmouseleave=function(){a._inContent=!1,a._enterable&&a._show&&a.hideLater(a._hideDelay);};}return t.prototype.update=function(t){var e=this._container,n=cv(e,"position"),i=e.style;"absolute"!==i.position&&"absolute"!==n&&(i.position="relative");var r=t.get("alwaysShowContent");r&&this._moveIfResized(),this.el.className=t.get("className")||"";},t.prototype.show=function(t,e){clearTimeout(this._hideTimeout),clearTimeout(this._longHideTimeout);var n=this.el,i=n.style,r=this._styleCoord;n.innerHTML?i.cssText=xL+vv(t,!this._firstShow,this._longHide)+gv(r[0],r[1],!0)+("border-color:"+xl(e)+";")+(t.get("extraCssText")||"")+(";pointer-event:"+(this._enterable?"auto":"none")):i.display="none",this._show=!0,this._firstShow=!1,this._longHide=!1;},t.prototype.setContent=function(t,e,n,i,r){if(null!=t){var o=this.el;if(C(r)&&"item"===n.get("trigger")&&!lv(n)&&(t+=fv(n.get("backgroundColor"),i,r)),C(t))o.innerHTML=t;else if(t){o.innerHTML="",M(t)||(t=[t]);for(var a=0;a<t.length;a++){P(t[a])&&t[a].parentNode!==o&&o.appendChild(t[a]);}}}},t.prototype.setEnterable=function(t){this._enterable=t;},t.prototype.getSize=function(){var t=this.el;return[t.clientWidth,t.clientHeight];},t.prototype.moveTo=function(t,e){var n=this._styleCoord;if(mv(n,this._zr,this._appendToBody,t,e),null!=n[0]&&null!=n[1]){var i=this.el.style,r=gv(n[0],n[1]);y(r,function(t){i[t[0]]=t[1];});}},t.prototype._moveIfResized=function(){var t=this._styleCoord[2],e=this._styleCoord[3];this.moveTo(t*this._zr.getWidth(),e*this._zr.getHeight());},t.prototype.hide=function(){var t=this,e=this.el.style;e.visibility="hidden",e.opacity="0",Rv.transform3dSupported&&(e.willChange=""),this._show=!1,this._longHideTimeout=setTimeout(function(){return t._longHide=!0;},500);},t.prototype.hideLater=function(t){!this._show||this._inContent&&this._enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(qv(this.hide,this),t)):this.hide());},t.prototype.isShow=function(){return this._show;},t.prototype.dispose=function(){this.el.parentNode.removeChild(this.el);},t.prototype.getOuterSize=function(){var t=this.el.clientWidth,e=this.el.clientHeight,n=cv(this.el);return n&&(t+=parseInt(n.borderLeftWidth,10)+parseInt(n.borderRightWidth,10),e+=parseInt(n.borderTopWidth,10)+parseInt(n.borderBottomWidth,10)),{width:t,height:e};},t;}(),wL=function(){function t(t){this._show=!1,this._styleCoord=[0,0,0,0],this._enterable=!0,this._zr=t.getZr(),bv(this._styleCoord,this._zr,t.getWidth()/2,t.getHeight()/2);}return t.prototype.update=function(t){var e=t.get("alwaysShowContent");e&&this._moveIfResized();},t.prototype.show=function(){this._hideTimeout&&clearTimeout(this._hideTimeout),this.el.show(),this._show=!0;},t.prototype.setContent=function(t,e,n,i){k(t)&&Fi(""),this.el&&this._zr.remove(this.el);var r=n.getModel("textStyle");this.el=new bb({style:{rich:e.richTextStyles,text:t,lineHeight:22,backgroundColor:n.get("backgroundColor"),borderRadius:n.get("borderRadius"),borderWidth:1,borderColor:i,shadowColor:n.get("shadowColor"),shadowBlur:n.get("shadowBlur"),shadowOffsetX:n.get("shadowOffsetX"),shadowOffsetY:n.get("shadowOffsetY"),textShadowColor:r.get("textShadowColor"),textShadowBlur:r.get("textShadowBlur")||0,textShadowOffsetX:r.get("textShadowOffsetX")||0,textShadowOffsetY:r.get("textShadowOffsetY")||0,fill:n.get(["textStyle","color"]),padding:ih(n,"richText"),verticalAlign:"top",align:"left"},z:n.get("z")}),this._zr.add(this.el);var o=this;this.el.on("mouseover",function(){o._enterable&&(clearTimeout(o._hideTimeout),o._show=!0),o._inContent=!0;}),this.el.on("mouseout",function(){o._enterable&&o._show&&o.hideLater(o._hideDelay),o._inContent=!1;});},t.prototype.setEnterable=function(t){this._enterable=t;},t.prototype.getSize=function(){var t=this.el,e=this.el.getBoundingRect(),n=xv(t.style);return[e.width+n.left+n.right,e.height+n.top+n.bottom];},t.prototype.moveTo=function(t,e){var n=this.el;if(n){var i=this._styleCoord;bv(i,this._zr,t,e),t=i[0],e=i[1];var r=n.style,o=_v(r.borderWidth||0),a=xv(r);n.x=t+o+a.left,n.y=e+o+a.top,n.markRedraw();}},t.prototype._moveIfResized=function(){var t=this._styleCoord[2],e=this._styleCoord[3];this.moveTo(t*this._zr.getWidth(),e*this._zr.getHeight());},t.prototype.hide=function(){this.el&&this.el.hide(),this._show=!1;},t.prototype.hideLater=function(t){!this._show||this._inContent&&this._enterable||(t?(this._hideDelay=t,this._show=!1,this._hideTimeout=setTimeout(qv(this.hide,this),t)):this.hide());},t.prototype.isShow=function(){return this._show;},t.prototype.getOuterSize=function(){var t=this.getSize();return{width:t[0],height:t[1]};},t.prototype.dispose=function(){this._zr.remove(this.el);},t;}(),SL=qv,ML=y,TL=_i,CL=new vb({shape:{x:-1,y:-1,width:2,height:2}}),IL=function(t){function n(){var e=null!==t&&t.apply(this,arguments)||this;return e.type=n.type,e;}return e(n,t),n.prototype.init=function(t,e){if(!Rv.node){var n=t.getComponent("tooltip"),i=n.get("renderMode");this._renderMode=cr(i),this._tooltipContent="richText"===this._renderMode?new wL(e):new bL(e.getDom(),e,{appendToBody:n.get("appendToBody",!0)});}},n.prototype.render=function(t,e,n){if(!Rv.node){this.group.removeAll(),this._tooltipModel=t,this._ecModel=e,this._api=n,this._alwaysShowContent=t.get("alwaysShowContent");var i=this._tooltipContent;i.update(t),i.setEnterable(t.get("enterable")),this._initGlobalListener(),this._keepShow();}},n.prototype._initGlobalListener=function(){var t=this._tooltipModel,e=t.get("triggerOn");Gy("itemTooltip",this._api,SL(function(t,n,i){"none"!==e&&(e.indexOf(t)>=0?this._tryShow(n,i):"leave"===t&&this._hide(i));},this));},n.prototype._keepShow=function(){var t=this._tooltipModel,e=this._ecModel,n=this._api;if(null!=this._lastX&&null!=this._lastY&&"none"!==t.get("triggerOn")){var i=this;clearTimeout(this._refreshUpdateTimeout),this._refreshUpdateTimeout=setTimeout(function(){!n.isDisposed()&&i.manuallyShowTip(t,e,n,{x:i._lastX,y:i._lastY,dataByCoordSys:i._lastDataByCoordSys});});}},n.prototype.manuallyShowTip=function(t,e,n,i){if(i.from!==this.uid&&!Rv.node){var r=Sv(i,n);this._ticket="";var o=i.dataByCoordSys,a=Av(i,e,n);if(a){var s=a.el.getBoundingRect().clone();s.applyTransform(a.el.transform),this._tryShow({offsetX:s.x+s.width/2,offsetY:s.y+s.height/2,target:a.el,position:i.position,positionDefault:"bottom"},r);}else if(i.tooltip&&null!=i.x&&null!=i.y){var l=CL;l.x=i.x,l.y=i.y,l.update(),Mb(l).tooltipConfig={name:null,option:i.tooltip},this._tryShow({offsetX:i.x,offsetY:i.y,target:l},r);}else if(o)this._tryShow({offsetX:i.x,offsetY:i.y,position:i.position,dataByCoordSys:o,tooltipOption:i.tooltipOption},r);else if(null!=i.seriesIndex){if(this._manuallyAxisShowTip(t,e,n,i))return;var u=Zy(i,e),h=u.point[0],c=u.point[1];null!=h&&null!=c&&this._tryShow({offsetX:h,offsetY:c,target:u.el,position:i.position,positionDefault:"bottom"},r);}else null!=i.x&&null!=i.y&&(n.dispatchAction({type:"updateAxisPointer",x:i.x,y:i.y}),this._tryShow({offsetX:i.x,offsetY:i.y,position:i.position,target:n.getZr().findHover(i.x,i.y).target},r));}},n.prototype.manuallyHideTip=function(t,e,n,i){var r=this._tooltipContent;!this._alwaysShowContent&&this._tooltipModel&&r.hideLater(this._tooltipModel.get("hideDelay")),this._lastX=this._lastY=this._lastDataByCoordSys=null,i.from!==this.uid&&this._hide(Sv(i,n));},n.prototype._manuallyAxisShowTip=function(t,e,n,i){var r=i.seriesIndex,o=i.dataIndex,a=e.getComponent("axisPointer").coordSysAxesInfo;if(null!=r&&null!=o&&null!=a){var s=e.getSeriesByIndex(r);if(s){var l=s.getData(),u=wv([l.getItemModel(o),s,(s.coordinateSystem||{}).model],this._tooltipModel);if("axis"===u.get("trigger"))return n.dispatchAction({type:"updateAxisPointer",seriesIndex:r,dataIndex:o,position:i.position}),!0;}}},n.prototype._tryShow=function(t,e){var n=t.target,i=this._tooltipModel;if(i){this._lastX=t.offsetX,this._lastY=t.offsetY;var r=t.dataByCoordSys;if(r&&r.length)this._showAxisTooltip(r,t);else if(n){this._lastDataByCoordSys=null;var o,a;sc(n,function(t){return null!=Mb(t).dataIndex?(o=t,!0):null!=Mb(t).tooltipConfig?(a=t,!0):void 0;},!0),o?this._showSeriesItemTooltip(t,o,e):a?this._showComponentItemTooltip(t,a,e):this._hide(e);}else this._lastDataByCoordSys=null,this._hide(e);}},n.prototype._showOrMove=function(t,e){var n=t.get("showDelay");e=qv(e,this),clearTimeout(this._showTimout),n>0?this._showTimout=setTimeout(e,n):e();},n.prototype._showAxisTooltip=function(t,e){var n=this._ecModel,i=this._tooltipModel,r=[e.offsetX,e.offsetY],o=wv([e.tooltipOption],i),a=this._renderMode,s=[],l=Xu("section",{blocks:[],noHeader:!0}),u=[],h=new XM();ML(t,function(t){ML(t.dataByAxis,function(t){var e=n.getComponent(t.axisDim+"Axis",t.axisIndex),i=t.value;if(e&&null!=i){var r=Ey(i,e.axis,n,t.seriesDataIndices,t.valueLabelOpt),o=Xu("section",{header:r,noHeader:!W(r),sortBlocks:!0,blocks:[]});l.blocks.push(o),y(t.seriesDataIndices,function(l){var c=n.getSeriesByIndex(l.seriesIndex),p=l.dataIndexInside,f=c.getDataParams(p);f.axisDim=t.axisDim,f.axisIndex=t.axisIndex,f.axisType=t.axisType,f.axisId=t.axisId,f.axisValue=Hf(e.axis,{value:i}),f.axisValueLabel=r,f.marker=h.makeTooltipMarker("item",xl(f.color),a);var d=Du(c.formatTooltip(p,!0,null));d.markupFragment&&o.blocks.push(d.markupFragment),d.markupText&&u.push(d.markupText),s.push(f);});}});}),l.blocks.reverse(),u.reverse();var c=e.position,p=o.get("order"),f=Zu(l,h,a,p,n.get("useUTC"),o.get("textStyle"));f&&u.unshift(f);var d="richText"===a?"\n\n":"<br/>",g=u.join(d);this._showOrMove(o,function(){this._updateContentNotChangedOnAxis(t)?this._updatePosition(o,c,r[0],r[1],this._tooltipContent,s):this._showTooltipContent(o,g,s,Math.random()+"",r[0],r[1],c,null,h);});},n.prototype._showSeriesItemTooltip=function(t,e,n){var i=this._ecModel,r=Mb(e),o=r.seriesIndex,a=i.getSeriesByIndex(o),s=r.dataModel||a,l=r.dataIndex,u=r.dataType,h=s.getData(u),c=this._renderMode,p=t.positionDefault,f=wv([h.getItemModel(l),s,a&&(a.coordinateSystem||{}).model],this._tooltipModel,p?{position:p}:null),d=f.get("trigger");if(null==d||"item"===d){var g=s.getDataParams(l,u),y=new XM();g.marker=y.makeTooltipMarker("item",xl(g.color),c);var v=Du(s.formatTooltip(l,!1,u)),m=f.get("order"),_=v.markupFragment?Zu(v.markupFragment,y,c,m,i.get("useUTC"),f.get("textStyle")):v.markupText,x="item_"+s.name+"_"+l;this._showOrMove(f,function(){this._showTooltipContent(f,_,g,x,t.offsetX,t.offsetY,t.position,t.target,y);}),n({type:"showTip",dataIndexInside:l,dataIndex:h.getRawIndex(l),seriesIndex:o,from:this.uid});}},n.prototype._showComponentItemTooltip=function(t,e,n){var i=Mb(e),r=i.tooltipConfig,o=r.option;if(C(o)){var a=o;o={content:a,formatter:a};}var l=[o],u=this._ecModel.getComponent(i.componentMainType,i.componentIndex);u&&l.push(u);var h=t.positionDefault,c=wv(l,this._tooltipModel,h?{position:h}:null),p=c.get("content"),f=Math.random()+"",d=new XM();this._showOrMove(c,function(){var n=s(c.get("formatterParams")||{});this._showTooltipContent(c,p,n,f,t.offsetX,t.offsetY,t.position,e,d);}),n({type:"showTip",from:this.uid});},n.prototype._showTooltipContent=function(t,e,n,i,r,o,a,s,l){if(this._ticket="",t.get("showContent")&&t.get("show")){var u=this._tooltipContent,h=t.get("formatter");a=a||t.get("position");var c=e,p=this._getNearestPoint([r,o],n,t.get("trigger"),t.get("borderColor")),f=p.color;if(h&&C(h)){var d=t.ecModel.get("useUTC"),g=M(n)?n[0]:n,y=g&&g.axisType&&g.axisType.indexOf("time")>=0;c=h,y&&(c=js(g.axisValue,c,d)),c=yl(c,n,!0);}else if(T(h)){var v=SL(function(e,i){e===this._ticket&&(u.setContent(i,l,t,f,a),this._updatePosition(t,a,r,o,u,n,s));},this);this._ticket=i,c=h(n,i,v);}u.setContent(c,l,t,f,a),u.show(t,f),this._updatePosition(t,a,r,o,u,n,s);}},n.prototype._getNearestPoint=function(t,e,n,i){return"axis"===n||M(e)?{color:i||("html"===this._renderMode?"#fff":"none")}:M(e)?void 0:{color:i||e.color||e.borderColor};},n.prototype._updatePosition=function(t,e,n,i,r,o,a){var s=this._api.getWidth(),l=this._api.getHeight();e=e||t.get("position");var u=r.getSize(),h=t.get("align"),c=t.get("verticalAlign"),p=a&&a.getBoundingRect().clone();if(a&&p.applyTransform(a.transform),T(e)&&(e=e([n,i],o,r.el,p,{viewSize:[s,l],contentSize:u.slice()})),M(e))n=TL(e[0],s),i=TL(e[1],l);else if(k(e)){var f=e;f.width=u[0],f.height=u[1];var d=Sl(f,{width:s,height:l});n=d.x,i=d.y,h=null,c=null;}else if(C(e)&&a){var g=Cv(e,p,u);n=g[0],i=g[1];}else{var g=Mv(n,i,r,s,l,h?null:20,c?null:20);n=g[0],i=g[1];}if(h&&(n-=Iv(h)?u[0]/2:"right"===h?u[0]:0),c&&(i-=Iv(c)?u[1]/2:"bottom"===c?u[1]:0),lv(t)){var g=Tv(n,i,r,s,l);n=g[0],i=g[1];}r.moveTo(n,i);},n.prototype._updateContentNotChangedOnAxis=function(t){var e=this._lastDataByCoordSys,n=!!e&&e.length===t.length;return n&&ML(e,function(e,i){var r=e.dataByAxis||[],o=t[i]||{},a=o.dataByAxis||[];n=n&&r.length===a.length,n&&ML(r,function(t,e){var i=a[e]||{},r=t.seriesDataIndices||[],o=i.seriesDataIndices||[];n=n&&t.value===i.value&&t.axisType===i.axisType&&t.axisId===i.axisId&&r.length===o.length,n&&ML(r,function(t,e){var i=o[e];n=n&&t.seriesIndex===i.seriesIndex&&t.dataIndex===i.dataIndex;});});}),this._lastDataByCoordSys=t,!!n;},n.prototype._hide=function(t){this._lastDataByCoordSys=null,t({type:"hideTip",from:this.uid});},n.prototype.dispose=function(t,e){Rv.node||(this._tooltipContent.dispose(),qy("itemTooltip",e));},n.type="tooltip",n;}(ZM);$f(kv),t.version=UC,t.dependencies=YC,t.PRIORITY=lI,t.init=_p,t.connect=xp,t.disConnect=bp,t.disconnect=iA,t.dispose=wp,t.getInstanceByDom=Sp,t.getInstanceById=Mp,t.registerTheme=Tp,t.registerPreprocessor=Cp,t.registerProcessor=Ip,t.registerPostInit=Ap,t.registerPostUpdate=kp,t.registerAction=Dp,t.registerCoordinateSystem=Lp,t.getCoordinateSystemDimensions=Pp,t.registerLayout=Op,t.registerVisual=Rp,t.registerLoading=Bp,t.setCanvasCreator=zp,t.registerMap=Np,t.getMap=Fp,t.registerTransform=oA,t.dataTool=xA,t.registerLocale=Fs,t.zrender=F_,t.matrix=wm,t.vector=nm,t.zrUtil=$v,t.color=Vm,t.helper=pk,t.number=gk,t.time=yk,t.graphic=vk,t.format=mk,t.util=_k,t.ComponentModel=FS,t.ComponentView=ZM,t.SeriesModel=qM,t.ChartView=JM,t.extendComponentModel=dd,t.extendComponentView=gd,t.extendSeriesModel=yd,t.extendChartView=vd,t.throttle=xh,t.use=$f,t.parseGeoJSON=up,t.parseGeoJson=up,t.env=Rv,t.List=EA,t.Model=uS,t.Axis=wk,t.innerDrawElementOnCanvas=Pc;});

/***/ }),

/***/ 63:
/*!*********************************************************************************!*\
  !*** D:/projects/kyu/uni-thermometer/components/mpvue-echarts/src/wx-canvas.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var WxCanvas = /*#__PURE__*/function () {
  function WxCanvas(ctx, canvasId) {_classCallCheck(this, WxCanvas);
    this.ctx = ctx;
    this.canvasId = canvasId;
    this.chart = null;

    WxCanvas.initStyle(ctx);
    this.initEvent();
  }_createClass(WxCanvas, [{ key: "getContext", value: function getContext(

    contextType) {
      return contextType === '2d' ? this.ctx : null;
    } }, { key: "setChart", value: function setChart(

    chart) {
      this.chart = chart;
    } }, { key: "attachEvent", value: function attachEvent()

    {
      // noop
    } }, { key: "detachEvent", value: function detachEvent()

    {
      // noop
    } }, { key: "initEvent", value: function initEvent()





















    {var _this = this;
      this.event = {};
      var eventNames = [{
        wxName: 'touchStart',
        ecName: 'mousedown' },
      {
        wxName: 'touchMove',
        ecName: 'mousemove' },
      {
        wxName: 'touchEnd',
        ecName: 'mouseup' },
      {
        wxName: 'touchEnd',
        ecName: 'click' }];


      eventNames.forEach(function (name) {
        _this.event[name.wxName] = function (e) {
          var touch = e.mp.touches[0];
          _this.chart.getZr().handler.dispatch(name.ecName, {
            zrX: name.wxName === 'tap' ? touch.clientX : touch.x,
            zrY: name.wxName === 'tap' ? touch.clientY : touch.y });

        };
      });
    } }], [{ key: "initStyle", value: function initStyle(ctx) {var _arguments = arguments;var styles = ['fillStyle', 'strokeStyle', 'globalAlpha', 'textAlign', 'textBaseAlign', 'shadow', 'lineWidth', 'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];styles.forEach(function (style) {Object.defineProperty(ctx, style, { set: function set(value) {if (style !== 'fillStyle' && style !== 'strokeStyle' || value !== 'none' && value !== null) {ctx["set".concat(style.charAt(0).toUpperCase()).concat(style.slice(1))](value);}} });});ctx.createRadialGradient = function () {return ctx.createCircularGradient(_arguments);};} }]);return WxCanvas;}();exports.default = WxCanvas;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map
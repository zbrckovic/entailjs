(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("immutable"));
	else if(typeof define === 'function' && define.amd)
		define("theoremCore", ["immutable"], factory);
	else if(typeof exports === 'object')
		exports["theoremCore"] = factory(require("immutable"));
	else
		root["theoremCore"] = factory(root[undefined]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_immutable__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/abstract-structures/expression/error.ts":
/*!*****************************************************!*\
  !*** ./src/abstract-structures/expression/error.ts ***!
  \*****************************************************/
/*! exports provided: ExpressionError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpressionError", function() { return ExpressionError; });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error */ "./src/error.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var ExpressionError = /*#__PURE__*/function (_BaseError) {
  _inherits(ExpressionError, _BaseError);

  var _super = _createSuper(ExpressionError);

  function ExpressionError() {
    _classCallCheck(this, ExpressionError);

    return _super.apply(this, arguments);
  }

  return ExpressionError;
}(_error__WEBPACK_IMPORTED_MODULE_0__["BaseError"]);

/***/ }),

/***/ "./src/abstract-structures/expression/expression-pointer.ts":
/*!******************************************************************!*\
  !*** ./src/abstract-structures/expression/expression-pointer.ts ***!
  \******************************************************************/
/*! exports provided: ExpressionPointer, CantGetParentOfRootError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpressionPointer", function() { return ExpressionPointer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CantGetParentOfRootError", function() { return CantGetParentOfRootError; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./src/abstract-structures/expression/error.ts");
/* harmony import */ var _expression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expression */ "./src/abstract-structures/expression/expression.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




/**
 * Pointer to the specific subexpression of the base expression.
 *
 * Contains the base `expression` and the `position` which is a path to some subexpression. This
 * subexpression is called a 'target'.
 */

var ExpressionPointer = /*#__PURE__*/function (_Record) {
  _inherits(ExpressionPointer, _Record);

  var _super = _createSuper(ExpressionPointer);

  function ExpressionPointer() {
    _classCallCheck(this, ExpressionPointer);

    return _super.apply(this, arguments);
  }

  _createClass(ExpressionPointer, [{
    key: "findBindingOccurrence",

    /**
     * Return a path to the ancestor subexpression which binds `sym` at the target position.
     *
     * In other words, find the closest target's ancestor which has `sym` as its `boundSym`. If
     * `sym` is not specified, `mainSym` at target is assumed.
     */
    value: function findBindingOccurrence(sym) {
      var _sym;

      if (this.isRoot) return undefined;
      sym = (_sym = sym) !== null && _sym !== void 0 ? _sym : this.target.sym;
      var parentPointer = this.parent;
      var boundSym = parentPointer.target.boundSym;
      return (boundSym === null || boundSym === void 0 ? void 0 : boundSym.equals(sym)) ? parentPointer.position : parentPointer.findBindingOccurrence(sym);
    }
  }, {
    key: "findFreeOccurrences",
    value: function findFreeOccurrences(sym) {
      var _this = this;

      return this.target.findFreeOccurrences(sym).map(function (position) {
        return _this.position.concat(position);
      });
    }
  }, {
    key: "findBoundOccurrences",
    value: function findBoundOccurrences() {
      var _this2 = this;

      return this.target.findBoundOccurrences().map(function (position) {
        return _this2.position.concat(position);
      });
    }
  }, {
    key: "getSubexpressionsOnPath",
    value: function getSubexpressionsOnPath() {
      return this.expression.getSubexpressionsOnPath(this.position);
    }
    /**
     * Find all symbols which are bound by ancestors.
     *
     * It doesn't necessarily search for symbols which actually appear in the target. It
     * searches for all symbols `S` which would be bound by some ancestor if we replaced the target
     * with some formula containing `S` as free symbol.
     */

  }, {
    key: "getBoundSyms",
    value: function getBoundSyms() {
      if (this.isRoot) return Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])();
      var parent = this.parent;
      var boundSym = parent.target.boundSym;
      return Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])().withMutations(function (mutable) {
        if (boundSym !== undefined) mutable.add(boundSym);
      }).union(parent.getBoundSyms());
    }
  }, {
    key: "isRoot",
    get: function get() {
      return this.position.isEmpty();
    }
  }, {
    key: "target",
    get: function get() {
      return this.expression.getSubexpression(this.position);
    }
  }, {
    key: "parent",
    get: function get() {
      if (this.isRoot) throw new CantGetParentOfRootError();
      return this.update('position', function (position) {
        return position.butLast();
      });
    }
  }]);

  return ExpressionPointer;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  expression: new _expression__WEBPACK_IMPORTED_MODULE_2__["Expression"](),
  position: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])()
}, 'ExpressionPointer'));
var CantGetParentOfRootError = /*#__PURE__*/function (_ExpressionError) {
  _inherits(CantGetParentOfRootError, _ExpressionError);

  var _super2 = _createSuper(CantGetParentOfRootError);

  function CantGetParentOfRootError() {
    _classCallCheck(this, CantGetParentOfRootError);

    return _super2.apply(this, arguments);
  }

  return CantGetParentOfRootError;
}(_error__WEBPACK_IMPORTED_MODULE_1__["ExpressionError"]);

/***/ }),

/***/ "./src/abstract-structures/expression/expression-util.ts":
/*!***************************************************************!*\
  !*** ./src/abstract-structures/expression/expression-util.ts ***!
  \***************************************************************/
/*! exports provided: connectWithBinarySym, NotEnoughExpressionsError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "connectWithBinarySym", function() { return connectWithBinarySym; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotEnoughExpressionsError", function() { return NotEnoughExpressionsError; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./src/abstract-structures/expression/error.ts");
/* harmony import */ var _expression__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expression */ "./src/abstract-structures/expression/expression.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




/**
 * Reduce `expressions` to a single expression using binary connective. Reduction is performed from
 * left to right.
 *
 * From A, B, C we will get ((A, B), C), not (A, (B, C)).
 */

var connectWithBinarySym = function connectWithBinarySym(expressions, sym) {
  if (expressions.length < 2) throw new NotEnoughExpressionsError();

  var _expressions = _toArray(expressions),
      first = _expressions[0],
      second = _expressions[1],
      rest = _expressions.slice(2);

  var connect = function connect(first, second) {
    return new _expression__WEBPACK_IMPORTED_MODULE_2__["Expression"]({
      sym: sym,
      children: immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(first, second)
    });
  };

  return rest.reduce(connect, connect(first, second));
};
var NotEnoughExpressionsError = /*#__PURE__*/function (_ExpressionError) {
  _inherits(NotEnoughExpressionsError, _ExpressionError);

  var _super = _createSuper(NotEnoughExpressionsError);

  function NotEnoughExpressionsError() {
    _classCallCheck(this, NotEnoughExpressionsError);

    return _super.apply(this, arguments);
  }

  return NotEnoughExpressionsError;
}(_error__WEBPACK_IMPORTED_MODULE_1__["ExpressionError"]);

/***/ }),

/***/ "./src/abstract-structures/expression/expression.ts":
/*!**********************************************************!*\
  !*** ./src/abstract-structures/expression/expression.ts ***!
  \**********************************************************/
/*! exports provided: Expression, ExpressionDoesntBindError, NoChildAtIndexError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Expression", function() { return Expression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpressionDoesntBindError", function() { return ExpressionDoesntBindError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoChildAtIndexError", function() { return NoChildAtIndexError; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sym_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sym/kind */ "./src/abstract-structures/sym/kind.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error */ "./src/abstract-structures/expression/error.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




/**
 * Abstract tree-like structure which is used to represents formulas and terms.
 */

var Expression = /*#__PURE__*/function (_Record) {
  _inherits(Expression, _Record);

  var _super = _createSuper(Expression);

  function Expression() {
    _classCallCheck(this, Expression);

    return _super.apply(this, arguments);
  }

  _createClass(Expression, [{
    key: "getChild",
    value: function getChild(i) {
      var child = this.children.get(i);
      if (child === undefined) throw new NoChildAtIndexError(this, i);
      return child;
    }
  }, {
    key: "getSubexpression",
    value: function getSubexpression(pos) {
      return pos.isEmpty() ? this : this.getChild(pos.first()).getSubexpression(pos.slice(1));
    }
  }, {
    key: "replaceSubexpression",
    value: function replaceSubexpression(pos, exp) {
      return pos.isEmpty() ? exp : this.update('children', function (children) {
        return children.update(pos.first(), function (child) {
          return child.replaceSubexpression(pos.slice(1), exp);
        });
      });
    }
  }, {
    key: "updateSubexpression",
    value: function updateSubexpression(pos, update) {
      var subexp = this.getSubexpression(pos);
      var newSubexp = update(subexp);
      return this.replaceSubexpression(pos, newSubexp);
    }
  }, {
    key: "getSubexpressionsOnPath",
    value: function getSubexpressionsOnPath(pos) {
      var res = immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(this);

      if (!pos.isEmpty()) {
        var child = this.getChild(pos.first());
        res = res.concat(child.getSubexpressionsOnPath(pos.slice(1)));
      }

      return res;
    }
  }, {
    key: "replaceSymAt",
    value: function replaceSymAt(pos, newSym, getBoundSym, getChild) {
      return this.updateSubexpression(pos, function (exp) {
        var sym = exp.sym,
            boundSym = exp.boundSym,
            children = exp.children;
        var newBoundSym = newSym.binds ? boundSym !== null && boundSym !== void 0 ? boundSym : getBoundSym === null || getBoundSym === void 0 ? void 0 : getBoundSym() : undefined;
        var newChildren = resolveChildren(sym, newSym, children, getChild);
        return exp.withMutations(function (mutableSubexp) {
          mutableSubexp.set('sym', newSym);
          mutableSubexp.set('boundSym', newBoundSym);
          mutableSubexp.set('children', newChildren);
        });
      });
    }
  }, {
    key: "findFreeOccurrences",
    value: function findFreeOccurrences(sym) {
      var _this = this;

      return Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])().withMutations(function (mutableRes) {
        var _this$boundSym;

        if (_this.sym.equals(sym)) mutableRes.push(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])());

        if (!((_this$boundSym = _this.boundSym) === null || _this$boundSym === void 0 ? void 0 : _this$boundSym.equals(sym))) {
          var resultsForChildren = _this.children.flatMap(function (child, i) {
            return child.findFreeOccurrences(sym).map(function (position) {
              return position.unshift(i);
            });
          });

          mutableRes.concat(resultsForChildren);
        }
      });
    }
  }, {
    key: "findBoundOccurrences",
    value: function findBoundOccurrences() {
      var boundSym = this.boundSym;
      if (boundSym === undefined) throw new ExpressionDoesntBindError(this);
      return this.children.flatMap(function (child, i) {
        return child.findFreeOccurrences(boundSym).map(function (childResult) {
          return childResult.unshift(i);
        });
      });
    }
  }, {
    key: "replaceFreeOccurrences",
    value: function replaceFreeOccurrences(sym, newSym, getBoundSym, getChild) {
      return this.findFreeOccurrences(sym).reduce(function (acc, position) {
        return acc.replaceSymAt(position, newSym, getBoundSym === undefined ? undefined : function () {
          return getBoundSym(position);
        }, getChild === undefined ? undefined : function () {
          return getChild(position);
        });
      }, this);
    }
  }, {
    key: "replaceBoundOccurrences",
    value: function replaceBoundOccurrences(newSym) {
      return this.findBoundOccurrences().reduce(function (acc, pos) {
        return acc.replaceSymAt(pos, newSym);
      }, this).set('boundSym', newSym);
    }
  }, {
    key: "replaceBoundOccurrencesAt",
    value: function replaceBoundOccurrencesAt(pos, newSym) {
      return this.updateSubexpression(pos, function (exp) {
        return exp.replaceBoundOccurrences(newSym);
      });
    }
  }, {
    key: "getSyms",
    value: function getSyms() {
      var _this2 = this;

      return Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])().withMutations(function (mutableSyms) {
        mutableSyms.add(_this2.sym);
        if (_this2.boundSym !== undefined) mutableSyms.add(_this2.boundSym);

        _this2.children.forEach(function (child) {
          mutableSyms.union(child.getSyms());
        });
      });
    }
  }, {
    key: "getFreeSyms",
    value: function getFreeSyms() {
      var _this3 = this;

      var boundSyms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])();
      return Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])().withMutations(function (mutableSyms) {
        if (!boundSyms.contains(_this3.sym)) mutableSyms.add(_this3.sym);
        if (_this3.boundSym !== undefined) boundSyms = boundSyms.add(_this3.boundSym);

        _this3.children.forEach(function (child) {
          mutableSyms.union(child.getFreeSyms(boundSyms));
        });
      });
    }
  }, {
    key: "getFreeTerms",
    value: function getFreeTerms() {
      var boundSyms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])();
      return this.getFreeSyms(boundSyms).filter(function (sym) {
        return sym.kind === _sym_kind__WEBPACK_IMPORTED_MODULE_1__["Kind"].Term;
      });
    }
  }, {
    key: "findBoundSymsAtFreeOccurrencesOfSym",
    value: function findBoundSymsAtFreeOccurrencesOfSym(sym) {
      return this._findBoundSymsAtFreeOccurrencesOfSym(sym);
    }
  }, {
    key: "_findBoundSymsAtFreeOccurrencesOfSym",
    value: function _findBoundSymsAtFreeOccurrencesOfSym(sym) {
      var bound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])();
      var result = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])();
      if (this.sym.equals(sym)) result = bound;

      if (this.boundSym !== undefined) {
        if (this.boundSym.equals(sym)) return result;
        bound = bound.add(this.boundSym);
      }

      return this.children.reduce(function (acc, child) {
        return acc.union(child._findBoundSymsAtFreeOccurrencesOfSym(sym, bound));
      }, result);
    }
  }]);

  return Expression;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  sym: undefined,
  boundSym: undefined,
  children: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])()
}, 'Expression'));

var resolveChildren = function resolveChildren(oldSym, newSym, oldChildren, getChild) {
  if (oldSym.argumentKind !== newSym.argumentKind) {
    if (getChild === undefined) throw new Error('getChild not present');
    return Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Range"])(0, newSym.arity).map(getChild).toList();
  }

  if (oldChildren.size >= newSym.arity) {
    return oldChildren.slice(0, newSym.arity);
  } else {
    if (getChild === undefined) throw new Error('getChild not present');
    return oldChildren.concat(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Range"])(oldChildren.size, newSym.arity).map(getChild));
  }
};

var ExpressionDoesntBindError = /*#__PURE__*/function (_ExpressionError) {
  _inherits(ExpressionDoesntBindError, _ExpressionError);

  var _super2 = _createSuper(ExpressionDoesntBindError);

  function ExpressionDoesntBindError(expression) {
    var _this4;

    _classCallCheck(this, ExpressionDoesntBindError);

    _this4 = _super2.call(this, "expression ".concat(expression, " doesn't bind"));
    _this4.expression = expression;
    return _this4;
  }

  return ExpressionDoesntBindError;
}(_error__WEBPACK_IMPORTED_MODULE_2__["ExpressionError"]);
var NoChildAtIndexError = /*#__PURE__*/function (_ExpressionError2) {
  _inherits(NoChildAtIndexError, _ExpressionError2);

  var _super3 = _createSuper(NoChildAtIndexError);

  function NoChildAtIndexError(expression, index) {
    var _this5;

    _classCallCheck(this, NoChildAtIndexError);

    _this5 = _super3.call(this, "can't get child of ".concat(expression, " at index ").concat(index));
    _this5.expression = expression;
    _this5.index = index;
    return _this5;
  }

  return NoChildAtIndexError;
}(_error__WEBPACK_IMPORTED_MODULE_2__["ExpressionError"]);

/***/ }),

/***/ "./src/abstract-structures/expression/index.ts":
/*!*****************************************************!*\
  !*** ./src/abstract-structures/expression/index.ts ***!
  \*****************************************************/
/*! exports provided: Expression, ExpressionDoesntBindError, NoChildAtIndexError, ExpressionPointer, CantGetParentOfRootError, connectWithBinarySym, NotEnoughExpressionsError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _expression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./expression */ "./src/abstract-structures/expression/expression.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Expression", function() { return _expression__WEBPACK_IMPORTED_MODULE_0__["Expression"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpressionDoesntBindError", function() { return _expression__WEBPACK_IMPORTED_MODULE_0__["ExpressionDoesntBindError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NoChildAtIndexError", function() { return _expression__WEBPACK_IMPORTED_MODULE_0__["NoChildAtIndexError"]; });

/* harmony import */ var _expression_pointer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expression-pointer */ "./src/abstract-structures/expression/expression-pointer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExpressionPointer", function() { return _expression_pointer__WEBPACK_IMPORTED_MODULE_1__["ExpressionPointer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CantGetParentOfRootError", function() { return _expression_pointer__WEBPACK_IMPORTED_MODULE_1__["CantGetParentOfRootError"]; });

/* harmony import */ var _expression_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expression-util */ "./src/abstract-structures/expression/expression-util.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "connectWithBinarySym", function() { return _expression_util__WEBPACK_IMPORTED_MODULE_2__["connectWithBinarySym"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotEnoughExpressionsError", function() { return _expression_util__WEBPACK_IMPORTED_MODULE_2__["NotEnoughExpressionsError"]; });





/***/ }),

/***/ "./src/abstract-structures/sym/category.ts":
/*!*************************************************!*\
  !*** ./src/abstract-structures/sym/category.ts ***!
  \*************************************************/
/*! exports provided: Category, order */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Category", function() { return Category; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "order", function() { return order; });
var _precedence;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents four possible categories of symbol depending on the kind of expression it forms and
 * the kind of expressions it accepts as arguments.
 */
var Category;

(function (Category) {
  Category["FF"] = "FF";
  Category["FT"] = "FT";
  Category["TT"] = "TT";
  Category["TF"] = "TF";
})(Category || (Category = {}));

var precedence = (_precedence = {}, _defineProperty(_precedence, Category.FF, 0), _defineProperty(_precedence, Category.FT, 1), _defineProperty(_precedence, Category.TT, 2), _defineProperty(_precedence, Category.TF, 3), _precedence);
var order = function order(c1, c2) {
  return precedence[c1] - precedence[c2];
};

/***/ }),

/***/ "./src/abstract-structures/sym/index.ts":
/*!**********************************************!*\
  !*** ./src/abstract-structures/sym/index.ts ***!
  \**********************************************/
/*! exports provided: Sym */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sym__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sym */ "./src/abstract-structures/sym/sym.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sym", function() { return _sym__WEBPACK_IMPORTED_MODULE_0__["Sym"]; });



/***/ }),

/***/ "./src/abstract-structures/sym/kind.ts":
/*!*********************************************!*\
  !*** ./src/abstract-structures/sym/kind.ts ***!
  \*********************************************/
/*! exports provided: Kind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kind", function() { return Kind; });
/**
 * Represents two possible kinds of expressions.
 *
 * By extension `Sym` will also be of a specific kind depending on whether it forms a formula or a
 * term.
 */
var Kind;

(function (Kind) {
  Kind["Formula"] = "Formula";
  Kind["Term"] = "Term";
})(Kind || (Kind = {}));

/***/ }),

/***/ "./src/abstract-structures/sym/sym.ts":
/*!********************************************!*\
  !*** ./src/abstract-structures/sym/sym.ts ***!
  \********************************************/
/*! exports provided: Sym */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sym", function() { return Sym; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _category__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./category */ "./src/abstract-structures/sym/category.ts");
/* harmony import */ var _kind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kind */ "./src/abstract-structures/sym/kind.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




/**
 * `Sym` (short for `Symbol`) represents the main syntactic entity from which expression tree
 * structure is built.
 *
 * Word `symbol` has been avoided because it's the name of the builtin type in ES6.
 */

var Sym = /*#__PURE__*/function (_Record) {
  _inherits(Sym, _Record);

  var _super = _createSuper(Sym);

  function Sym() {
    _classCallCheck(this, Sym);

    return _super.apply(this, arguments);
  }

  _createClass(Sym, [{
    key: "getCategory",
    value: function getCategory() {
      switch (this.kind) {
        case _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula:
          switch (this.argumentKind) {
            case _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula:
              return _category__WEBPACK_IMPORTED_MODULE_1__["Category"].FF;

            case _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Term:
              return _category__WEBPACK_IMPORTED_MODULE_1__["Category"].FT;
          }

          break;

        case _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Term:
          switch (this.argumentKind) {
            case _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula:
              return _category__WEBPACK_IMPORTED_MODULE_1__["Category"].TF;

            case _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Term:
              return _category__WEBPACK_IMPORTED_MODULE_1__["Category"].TT;
          }

          break;
      }
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.id, "-").concat(this.getCategory()).concat(this.binds ? 'b' : '').concat(this.arity);
    }
  }, {
    key: "order",
    value: function order(_ref) {
      var id = _ref.id;
      return this.id - id;
    }
  }], [{
    key: "fromCategory",
    value: function fromCategory(c) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Sym(_objectSpread(_objectSpread({}, props), Sym.getKindsFromCategory(c)));
    }
  }, {
    key: "ff",
    value: function ff() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Sym.fromCategory(_category__WEBPACK_IMPORTED_MODULE_1__["Category"].FF, props);
    }
  }, {
    key: "ft",
    value: function ft() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Sym.fromCategory(_category__WEBPACK_IMPORTED_MODULE_1__["Category"].FT, props);
    }
  }, {
    key: "tf",
    value: function tf() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Sym.fromCategory(_category__WEBPACK_IMPORTED_MODULE_1__["Category"].TF, props);
    }
  }, {
    key: "tt",
    value: function tt() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Sym.fromCategory(_category__WEBPACK_IMPORTED_MODULE_1__["Category"].TT, props);
    }
  }, {
    key: "getCategoriesWithKind",
    value: function getCategoriesWithKind(kind) {
      switch (kind) {
        case _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula:
          return [_category__WEBPACK_IMPORTED_MODULE_1__["Category"].FF, _category__WEBPACK_IMPORTED_MODULE_1__["Category"].FT];

        case _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Term:
          return [_category__WEBPACK_IMPORTED_MODULE_1__["Category"].TF, _category__WEBPACK_IMPORTED_MODULE_1__["Category"].TT];
      }
    }
  }, {
    key: "getKindsFromCategory",
    value: function getKindsFromCategory(category) {
      switch (category) {
        case _category__WEBPACK_IMPORTED_MODULE_1__["Category"].FF:
          return {
            kind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula,
            argumentKind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula
          };

        case _category__WEBPACK_IMPORTED_MODULE_1__["Category"].FT:
          return {
            kind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula,
            argumentKind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Term
          };

        case _category__WEBPACK_IMPORTED_MODULE_1__["Category"].TF:
          return {
            kind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Term,
            argumentKind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula
          };

        case _category__WEBPACK_IMPORTED_MODULE_1__["Category"].TT:
          return {
            kind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Term,
            argumentKind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Term
          };
      }
    }
  }]);

  return Sym;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  id: 0,
  kind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula,
  argumentKind: _kind__WEBPACK_IMPORTED_MODULE_2__["Kind"].Formula,
  arity: 0,
  binds: false
}, 'Sym'));

/***/ }),

/***/ "./src/deduction-interface/deduction-interface.ts":
/*!********************************************************!*\
  !*** ./src/deduction-interface/deduction-interface.ts ***!
  \********************************************************/
/*! exports provided: DeductionInterface, StepOrdinalOutOfRangeError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeductionInterface", function() { return DeductionInterface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StepOrdinalOutOfRangeError", function() { return StepOrdinalOutOfRangeError; });
/* harmony import */ var _deduction_structure__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../deduction-structure */ "./src/deduction-structure/index.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ "./src/deduction-interface/error.ts");
/* harmony import */ var _rules_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rules-interface */ "./src/deduction-interface/rules-interface/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




/**
 * Interface which can be used to perform deduction by repeatedly applying available rules.
 *
 * Validity of deduction is ensured on each step. Validity of the resulting deduction is guaranteed
 * if initial deduction (if any) provided at the start os valid.
 */

var DeductionInterface = /*#__PURE__*/function () {
  _createClass(DeductionInterface, null, [{
    key: "start",
    value: function start() {
      var deduction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _deduction_structure__WEBPACK_IMPORTED_MODULE_0__["Deduction"]();
      return new DeductionInterface(deduction);
    }
  }]);

  function DeductionInterface(deduction) {
    _classCallCheck(this, DeductionInterface);

    this.deduction = deduction;
  }
  /** Select steps (formulas) to use as premises in the next rule. */


  _createClass(DeductionInterface, [{
    key: "selectSteps",
    value: function selectSteps() {
      var indexes = this.createIndexes.apply(this, arguments);
      return _rules_interface__WEBPACK_IMPORTED_MODULE_2__["RulesInterface"].apply(void 0, [this.deduction].concat(_toConsumableArray(indexes)));
    }
  }, {
    key: "createIndexes",
    value: function createIndexes() {
      var _this = this;

      for (var _len = arguments.length, ordinals = new Array(_len), _key = 0; _key < _len; _key++) {
        ordinals[_key] = arguments[_key];
      }

      var stepOrdinalOutOfRange = ordinals.find(function (ordinal) {
        return !(Number.isInteger(ordinal) && ordinal >= 1 && ordinal <= _this.deduction.size);
      });

      if (stepOrdinalOutOfRange !== undefined) {
        throw new StepOrdinalOutOfRangeError(stepOrdinalOutOfRange, this.deduction.size);
      }

      return ordinals.map(function (ordinal) {
        return ordinal - 1;
      });
    }
  }]);

  return DeductionInterface;
}();
var StepOrdinalOutOfRangeError = /*#__PURE__*/function (_DeductionInterfaceEr) {
  _inherits(StepOrdinalOutOfRangeError, _DeductionInterfaceEr);

  var _super = _createSuper(StepOrdinalOutOfRangeError);

  function StepOrdinalOutOfRangeError(stepOrdinal, maxStepOrdinal) {
    var _this2;

    _classCallCheck(this, StepOrdinalOutOfRangeError);

    _this2 = _super.call(this, "step ordinal ".concat(stepOrdinal, " is out of range [1 - ").concat(maxStepOrdinal, "]"));
    _this2.stepOrdinal = stepOrdinal;
    _this2.maxStepOrdinal = maxStepOrdinal;
    return _this2;
  }

  return StepOrdinalOutOfRangeError;
}(_error__WEBPACK_IMPORTED_MODULE_1__["DeductionInterfaceError"]);

/***/ }),

/***/ "./src/deduction-interface/error.ts":
/*!******************************************!*\
  !*** ./src/deduction-interface/error.ts ***!
  \******************************************/
/*! exports provided: DeductionInterfaceError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeductionInterfaceError", function() { return DeductionInterfaceError; });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../error */ "./src/error.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var DeductionInterfaceError = /*#__PURE__*/function (_BaseError) {
  _inherits(DeductionInterfaceError, _BaseError);

  var _super = _createSuper(DeductionInterfaceError);

  function DeductionInterfaceError() {
    _classCallCheck(this, DeductionInterfaceError);

    return _super.apply(this, arguments);
  }

  return DeductionInterfaceError;
}(_error__WEBPACK_IMPORTED_MODULE_0__["BaseError"]);

/***/ }),

/***/ "./src/deduction-interface/index.ts":
/*!******************************************!*\
  !*** ./src/deduction-interface/index.ts ***!
  \******************************************/
/*! exports provided: DeductionInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deduction-interface */ "./src/deduction-interface/deduction-interface.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeductionInterface", function() { return _deduction_interface__WEBPACK_IMPORTED_MODULE_0__["DeductionInterface"]; });



/***/ }),

/***/ "./src/deduction-interface/rules-interface/deduction-rule-interface.ts":
/*!*****************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/deduction-rule-interface.ts ***!
  \*****************************************************************************/
/*! exports provided: DeductionRuleInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeductionRuleInterface", function() { return DeductionRuleInterface; });
/* harmony import */ var _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../deduction-structure/rule-application-spec */ "./src/deduction-structure/rule-application-spec/index.ts");
/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../deduction-interface */ "./src/deduction-interface/deduction-interface.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DeductionRuleInterface = /*#__PURE__*/function () {
  function DeductionRuleInterface(deduction, firstStepIndex, secondStepIndex) {
    _classCallCheck(this, DeductionRuleInterface);

    this.deduction = deduction;
    this.firstStepIndex = firstStepIndex;
    this.secondStepIndex = secondStepIndex;
  }

  _createClass(DeductionRuleInterface, [{
    key: "apply",
    value: function apply() {
      var ruleApplicationSpec = _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__["RegularRuleApplicationSpec"].deduction(this.deduction.getStep(this.firstStepIndex).formula, this.firstStepIndex, this.deduction.getStep(this.secondStepIndex).formula, this.secondStepIndex);
      var newDeduction = this.deduction.applyRule(ruleApplicationSpec);
      return new _deduction_interface__WEBPACK_IMPORTED_MODULE_1__["DeductionInterface"](newDeduction);
    }
  }]);

  return DeductionRuleInterface;
}();

/***/ }),

/***/ "./src/deduction-interface/rules-interface/index.ts":
/*!**********************************************************!*\
  !*** ./src/deduction-interface/rules-interface/index.ts ***!
  \**********************************************************/
/*! exports provided: RulesInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rules_interface_rules_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rules-interface/rules-interface */ "./src/deduction-interface/rules-interface/rules-interface.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RulesInterface", function() { return _rules_interface_rules_interface__WEBPACK_IMPORTED_MODULE_0__["RulesInterface"]; });



/***/ }),

/***/ "./src/deduction-interface/rules-interface/premise-rule-interface.ts":
/*!***************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/premise-rule-interface.ts ***!
  \***************************************************************************/
/*! exports provided: PremiseRuleInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PremiseRuleInterface", function() { return PremiseRuleInterface; });
/* harmony import */ var _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../deduction-structure/rule-application-spec */ "./src/deduction-structure/rule-application-spec/index.ts");
/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../deduction-interface */ "./src/deduction-interface/deduction-interface.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var PremiseRuleInterface = /*#__PURE__*/function () {
  function PremiseRuleInterface(deduction) {
    _classCallCheck(this, PremiseRuleInterface);

    this.deduction = deduction;
  }

  _createClass(PremiseRuleInterface, [{
    key: "apply",
    value: function apply(formula) {
      var ruleApplicationSpec = _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__["RegularRuleApplicationSpec"].premise(formula);
      var newDeduction = this.deduction.applyRule(ruleApplicationSpec);
      return new _deduction_interface__WEBPACK_IMPORTED_MODULE_1__["DeductionInterface"](newDeduction);
    }
  }]);

  return PremiseRuleInterface;
}();

/***/ }),

/***/ "./src/deduction-interface/rules-interface/quantification/existential-generalization-rule-interface.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/quantification/existential-generalization-rule-interface.ts ***!
  \*************************************************************************************************************/
/*! exports provided: ExistentialGeneralizationRuleInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExistentialGeneralizationRuleInterface", function() { return ExistentialGeneralizationRuleInterface; });
/* harmony import */ var _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../deduction-structure/rule-application-spec */ "./src/deduction-structure/rule-application-spec/index.ts");
/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../deduction-interface */ "./src/deduction-interface/deduction-interface.ts");
/* harmony import */ var _generalization_rule_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./generalization-rule-interface */ "./src/deduction-interface/rules-interface/quantification/generalization-rule-interface.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var ExistentialGeneralizationRuleInterface = /*#__PURE__*/function (_GeneralizationRuleIn) {
  _inherits(ExistentialGeneralizationRuleInterface, _GeneralizationRuleIn);

  var _super = _createSuper(ExistentialGeneralizationRuleInterface);

  function ExistentialGeneralizationRuleInterface() {
    _classCallCheck(this, ExistentialGeneralizationRuleInterface);

    return _super.apply(this, arguments);
  }

  _createClass(ExistentialGeneralizationRuleInterface, [{
    key: "concreteApply",
    value: function concreteApply(newTerm, oldTerm) {
      var ruleApplicationSpec = _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__["RegularRuleApplicationSpec"].existentialGeneralization(this.premise, this.stepIndex, newTerm, oldTerm);
      var newDeduction = this.deduction.applyRule(ruleApplicationSpec);
      return new _deduction_interface__WEBPACK_IMPORTED_MODULE_1__["DeductionInterface"](newDeduction);
    }
  }]);

  return ExistentialGeneralizationRuleInterface;
}(_generalization_rule_interface__WEBPACK_IMPORTED_MODULE_2__["GeneralizationRuleInterface"]);

/***/ }),

/***/ "./src/deduction-interface/rules-interface/quantification/existential-instantiation-rule-interface.ts":
/*!************************************************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/quantification/existential-instantiation-rule-interface.ts ***!
  \************************************************************************************************************/
/*! exports provided: ExistentialInstantiationRuleInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExistentialInstantiationRuleInterface", function() { return ExistentialInstantiationRuleInterface; });
/* harmony import */ var _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../deduction-structure/rule-application-spec */ "./src/deduction-structure/rule-application-spec/index.ts");
/* harmony import */ var _deduction_structure_term_dependency_graph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../deduction-structure/term-dependency-graph */ "./src/deduction-structure/term-dependency-graph/index.ts");
/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../deduction-interface */ "./src/deduction-interface/deduction-interface.ts");
/* harmony import */ var _instantiation_rule_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instantiation-rule-interface */ "./src/deduction-interface/rules-interface/quantification/instantiation-rule-interface.ts");
/* harmony import */ var _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./quantification-rule-interface */ "./src/deduction-interface/rules-interface/quantification/quantification-rule-interface.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var ExistentialInstantiationRuleInterface = /*#__PURE__*/function (_InstantiationRuleInt) {
  _inherits(ExistentialInstantiationRuleInterface, _InstantiationRuleInt);

  var _super = _createSuper(ExistentialInstantiationRuleInterface);

  function ExistentialInstantiationRuleInterface() {
    _classCallCheck(this, ExistentialInstantiationRuleInterface);

    return _super.apply(this, arguments);
  }

  _createClass(ExistentialInstantiationRuleInterface, [{
    key: "concreteApply",
    value: function concreteApply(newTerm) {
      var ruleApplicationSpec = _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__["RegularRuleApplicationSpec"].existentialInstantiation(this.premise, this.stepIndex, newTerm);

      try {
        var newDeduction = this.deduction.applyRule(ruleApplicationSpec);
        return new _deduction_interface__WEBPACK_IMPORTED_MODULE_2__["DeductionInterface"](newDeduction);
      } catch (e) {
        if (e instanceof _deduction_structure_term_dependency_graph__WEBPACK_IMPORTED_MODULE_1__["TermAlreadyUsedError"]) {
          throw new _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_4__["TermAlreadyUsedError"](e.term);
        } else if (e instanceof _deduction_structure_term_dependency_graph__WEBPACK_IMPORTED_MODULE_1__["CyclicDependenciesError"]) {
          throw new _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_4__["TermsCyclicDependenciesError"](e.dependentTerm, e.dependencyTerm);
        }

        throw e;
      }
    }
  }]);

  return ExistentialInstantiationRuleInterface;
}(_instantiation_rule_interface__WEBPACK_IMPORTED_MODULE_3__["InstantiationRuleInterface"]);

/***/ }),

/***/ "./src/deduction-interface/rules-interface/quantification/generalization-rule-interface.ts":
/*!*************************************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/quantification/generalization-rule-interface.ts ***!
  \*************************************************************************************************/
/*! exports provided: GeneralizationRuleInterface, GeneralizedTermIllegallyBindsError, GeneralizedTermBecomesIllegallyBoundError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralizationRuleInterface", function() { return GeneralizationRuleInterface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralizedTermIllegallyBindsError", function() { return GeneralizedTermIllegallyBindsError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralizedTermBecomesIllegallyBoundError", function() { return GeneralizedTermBecomesIllegallyBoundError; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../abstract-structures/expression */ "./src/abstract-structures/expression/index.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../error */ "./src/deduction-interface/error.ts");
/* harmony import */ var _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./quantification-rule-interface */ "./src/deduction-interface/rules-interface/quantification/quantification-rule-interface.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var GeneralizationRuleInterface = /*#__PURE__*/function (_QuantificationRuleIn) {
  _inherits(GeneralizationRuleInterface, _QuantificationRuleIn);

  var _super = _createSuper(GeneralizationRuleInterface);

  function GeneralizationRuleInterface() {
    _classCallCheck(this, GeneralizationRuleInterface);

    return _super.apply(this, arguments);
  }

  _createClass(GeneralizationRuleInterface, [{
    key: "apply",

    /**
     * @param newTerm - Generalized term which will be the substituent of the substitution.
     * @param oldTerm - Instance term which if provided will be the substituendum of the
     * substitution. If it's not provided generalization will be is vacuous.
     */
    value: function apply(newTerm, oldTerm) {
      var premise = this.premise;
      var substitutionRequired = !Object(immutable__WEBPACK_IMPORTED_MODULE_0__["is"])(newTerm, oldTerm);

      if (substitutionRequired) {
        if (premise.getFreeSyms().contains(newTerm)) {
          throw new GeneralizedTermIllegallyBindsError();
        }

        if (oldTerm !== undefined && premise.findBoundSymsAtFreeOccurrencesOfSym(oldTerm).contains(newTerm)) {
          throw new GeneralizedTermBecomesIllegallyBoundError();
        }
      }

      return this.concreteApply(newTerm, oldTerm);
    }
  }, {
    key: "determineSubstitutionInPotentialResult",

    /**
     * Under assumption that `formula` is a result of an application of this rule determine which
     * term was introduced in substitution.
     */
    value: function determineSubstitutionInPotentialResult(formula) {
      var newTerm = formula.boundSym;
      if (newTerm === undefined) throw new _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_3__["InvalidSubstitutionResultError"]();

      try {
        var firstBoundOccurrencePosition = formula.findBoundOccurrences().first(undefined);
        if (firstBoundOccurrencePosition === undefined) return {
          newTerm: newTerm
        };
        var oldTerm = this.premise.getSubexpression(firstBoundOccurrencePosition.shift()).sym;
        return {
          oldTerm: oldTerm,
          newTerm: newTerm
        };
      } catch (e) {
        if (e instanceof _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["NoChildAtIndexError"]) {
          throw new _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_3__["InvalidSubstitutionResultError"]();
        }

        throw e;
      }
    }
  }]);

  return GeneralizationRuleInterface;
}(_quantification_rule_interface__WEBPACK_IMPORTED_MODULE_3__["QuantificationRuleInterface"]);
var GeneralizedTermIllegallyBindsError = /*#__PURE__*/function (_DeductionInterfaceEr) {
  _inherits(GeneralizedTermIllegallyBindsError, _DeductionInterfaceEr);

  var _super2 = _createSuper(GeneralizedTermIllegallyBindsError);

  function GeneralizedTermIllegallyBindsError() {
    _classCallCheck(this, GeneralizedTermIllegallyBindsError);

    return _super2.apply(this, arguments);
  }

  return GeneralizedTermIllegallyBindsError;
}(_error__WEBPACK_IMPORTED_MODULE_2__["DeductionInterfaceError"]);
var GeneralizedTermBecomesIllegallyBoundError = /*#__PURE__*/function (_DeductionInterfaceEr2) {
  _inherits(GeneralizedTermBecomesIllegallyBoundError, _DeductionInterfaceEr2);

  var _super3 = _createSuper(GeneralizedTermBecomesIllegallyBoundError);

  function GeneralizedTermBecomesIllegallyBoundError() {
    _classCallCheck(this, GeneralizedTermBecomesIllegallyBoundError);

    return _super3.apply(this, arguments);
  }

  return GeneralizedTermBecomesIllegallyBoundError;
}(_error__WEBPACK_IMPORTED_MODULE_2__["DeductionInterfaceError"]);

/***/ }),

/***/ "./src/deduction-interface/rules-interface/quantification/index.ts":
/*!*************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/quantification/index.ts ***!
  \*************************************************************************/
/*! exports provided: UniversalGeneralizationRuleInterface, ExistentialGeneralizationRuleInterface, UniversalInstantiationRuleInterface, ExistentialInstantiationRuleInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _universal_generalization_rule_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./universal-generalization-rule-interface */ "./src/deduction-interface/rules-interface/quantification/universal-generalization-rule-interface.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UniversalGeneralizationRuleInterface", function() { return _universal_generalization_rule_interface__WEBPACK_IMPORTED_MODULE_0__["UniversalGeneralizationRuleInterface"]; });

/* harmony import */ var _existential_generalization_rule_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./existential-generalization-rule-interface */ "./src/deduction-interface/rules-interface/quantification/existential-generalization-rule-interface.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExistentialGeneralizationRuleInterface", function() { return _existential_generalization_rule_interface__WEBPACK_IMPORTED_MODULE_1__["ExistentialGeneralizationRuleInterface"]; });

/* harmony import */ var _universal_instantiation_rule_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./universal-instantiation-rule-interface */ "./src/deduction-interface/rules-interface/quantification/universal-instantiation-rule-interface.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UniversalInstantiationRuleInterface", function() { return _universal_instantiation_rule_interface__WEBPACK_IMPORTED_MODULE_2__["UniversalInstantiationRuleInterface"]; });

/* harmony import */ var _existential_instantiation_rule_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./existential-instantiation-rule-interface */ "./src/deduction-interface/rules-interface/quantification/existential-instantiation-rule-interface.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExistentialInstantiationRuleInterface", function() { return _existential_instantiation_rule_interface__WEBPACK_IMPORTED_MODULE_3__["ExistentialInstantiationRuleInterface"]; });






/***/ }),

/***/ "./src/deduction-interface/rules-interface/quantification/instantiation-rule-interface.ts":
/*!************************************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/quantification/instantiation-rule-interface.ts ***!
  \************************************************************************************************/
/*! exports provided: InstantiationRuleInterface, TermNotProvidedForNonVacuousQuantificationError, InstanceTermBecomesIllegallyBoundError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstantiationRuleInterface", function() { return InstantiationRuleInterface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermNotProvidedForNonVacuousQuantificationError", function() { return TermNotProvidedForNonVacuousQuantificationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstanceTermBecomesIllegallyBoundError", function() { return InstanceTermBecomesIllegallyBoundError; });
/* harmony import */ var _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../abstract-structures/expression */ "./src/abstract-structures/expression/index.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error */ "./src/deduction-interface/error.ts");
/* harmony import */ var _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quantification-rule-interface */ "./src/deduction-interface/rules-interface/quantification/quantification-rule-interface.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var InstantiationRuleInterface = /*#__PURE__*/function (_QuantificationRuleIn) {
  _inherits(InstantiationRuleInterface, _QuantificationRuleIn);

  var _super = _createSuper(InstantiationRuleInterface);

  function InstantiationRuleInterface() {
    _classCallCheck(this, InstantiationRuleInterface);

    return _super.apply(this, arguments);
  }

  _createClass(InstantiationRuleInterface, [{
    key: "apply",

    /**
     * @param newTerm - Instance term which if provided will be the substituendum of the
     * substitution. If instantiation is vacuous newTerm doesn't need to be provided.
     */
    value: function apply(newTerm) {
      var premise = this.premise;

      if (newTerm === undefined) {
        if (!premise.findBoundOccurrences().isEmpty()) {
          throw new TermNotProvidedForNonVacuousQuantificationError();
        }
      } else {
        var oldTerm = premise.boundSym;
        var child = premise.children.first();

        if (child.findBoundSymsAtFreeOccurrencesOfSym(oldTerm).contains(newTerm)) {
          throw new InstanceTermBecomesIllegallyBoundError();
        }
      }

      return this.concreteApply(newTerm);
    }
  }, {
    key: "determineNewTermInPotentialResult",

    /**
     * Under assumption that `formula` is a result of an application of this rule determine which
     * term was introduced in substitution. If instantiation was vacuous return `undefined`.
     */
    value: function determineNewTermInPotentialResult(formula) {
      var firstOccurrence = this.premise.findBoundOccurrences().first();
      if (firstOccurrence === undefined) return undefined;

      try {
        return formula.getSubexpression(firstOccurrence.shift()).sym;
      } catch (e) {
        if (e instanceof _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_0__["NoChildAtIndexError"]) {
          throw new _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_2__["InvalidSubstitutionResultError"]();
        }

        throw e;
      }
    }
  }]);

  return InstantiationRuleInterface;
}(_quantification_rule_interface__WEBPACK_IMPORTED_MODULE_2__["QuantificationRuleInterface"]);
var TermNotProvidedForNonVacuousQuantificationError = /*#__PURE__*/function (_DeductionInterfaceEr) {
  _inherits(TermNotProvidedForNonVacuousQuantificationError, _DeductionInterfaceEr);

  var _super2 = _createSuper(TermNotProvidedForNonVacuousQuantificationError);

  function TermNotProvidedForNonVacuousQuantificationError() {
    _classCallCheck(this, TermNotProvidedForNonVacuousQuantificationError);

    return _super2.apply(this, arguments);
  }

  return TermNotProvidedForNonVacuousQuantificationError;
}(_error__WEBPACK_IMPORTED_MODULE_1__["DeductionInterfaceError"]);
var InstanceTermBecomesIllegallyBoundError = /*#__PURE__*/function (_DeductionInterfaceEr2) {
  _inherits(InstanceTermBecomesIllegallyBoundError, _DeductionInterfaceEr2);

  var _super3 = _createSuper(InstanceTermBecomesIllegallyBoundError);

  function InstanceTermBecomesIllegallyBoundError() {
    _classCallCheck(this, InstanceTermBecomesIllegallyBoundError);

    return _super3.apply(this, arguments);
  }

  return InstanceTermBecomesIllegallyBoundError;
}(_error__WEBPACK_IMPORTED_MODULE_1__["DeductionInterfaceError"]);

/***/ }),

/***/ "./src/deduction-interface/rules-interface/quantification/quantification-rule-interface.ts":
/*!*************************************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/quantification/quantification-rule-interface.ts ***!
  \*************************************************************************************************/
/*! exports provided: QuantificationRuleInterface, InvalidSubstitutionResultError, TermAlreadyUsedError, TermsCyclicDependenciesError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuantificationRuleInterface", function() { return QuantificationRuleInterface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidSubstitutionResultError", function() { return InvalidSubstitutionResultError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermAlreadyUsedError", function() { return TermAlreadyUsedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermsCyclicDependenciesError", function() { return TermsCyclicDependenciesError; });
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../error */ "./src/deduction-interface/error.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var QuantificationRuleInterface = /*#__PURE__*/function () {
  function QuantificationRuleInterface(deduction, stepIndex) {
    _classCallCheck(this, QuantificationRuleInterface);

    this.deduction = deduction;
    this.stepIndex = stepIndex;
  }

  _createClass(QuantificationRuleInterface, [{
    key: "premise",
    get: function get() {
      return this.deduction.getStep(this.stepIndex).formula;
    }
  }]);

  return QuantificationRuleInterface;
}();
var InvalidSubstitutionResultError = /*#__PURE__*/function (_DeductionInterfaceEr) {
  _inherits(InvalidSubstitutionResultError, _DeductionInterfaceEr);

  var _super = _createSuper(InvalidSubstitutionResultError);

  function InvalidSubstitutionResultError() {
    _classCallCheck(this, InvalidSubstitutionResultError);

    return _super.apply(this, arguments);
  }

  return InvalidSubstitutionResultError;
}(_error__WEBPACK_IMPORTED_MODULE_0__["DeductionInterfaceError"]);
var TermAlreadyUsedError = /*#__PURE__*/function (_DeductionInterfaceEr2) {
  _inherits(TermAlreadyUsedError, _DeductionInterfaceEr2);

  var _super2 = _createSuper(TermAlreadyUsedError);

  function TermAlreadyUsedError(term) {
    var _this;

    _classCallCheck(this, TermAlreadyUsedError);

    _this = _super2.call(this, "term ".concat(term, " is already used"));
    _this.term = term;
    return _this;
  }

  return TermAlreadyUsedError;
}(_error__WEBPACK_IMPORTED_MODULE_0__["DeductionInterfaceError"]);
var TermsCyclicDependenciesError = /*#__PURE__*/function (_DeductionInterfaceEr3) {
  _inherits(TermsCyclicDependenciesError, _DeductionInterfaceEr3);

  var _super3 = _createSuper(TermsCyclicDependenciesError);

  function TermsCyclicDependenciesError(dependentTerm, dependencyTerm) {
    var _this2;

    _classCallCheck(this, TermsCyclicDependenciesError);

    _this2 = _super3.call(this, "term ".concat(dependentTerm, " forms a cycle by depending on ").concat(dependencyTerm));
    _this2.dependentTerm = dependentTerm;
    _this2.dependencyTerm = dependencyTerm;
    return _this2;
  }

  return TermsCyclicDependenciesError;
}(_error__WEBPACK_IMPORTED_MODULE_0__["DeductionInterfaceError"]);

/***/ }),

/***/ "./src/deduction-interface/rules-interface/quantification/universal-generalization-rule-interface.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/quantification/universal-generalization-rule-interface.ts ***!
  \***********************************************************************************************************/
/*! exports provided: UniversalGeneralizationRuleInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UniversalGeneralizationRuleInterface", function() { return UniversalGeneralizationRuleInterface; });
/* harmony import */ var _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../deduction-structure/rule-application-spec */ "./src/deduction-structure/rule-application-spec/index.ts");
/* harmony import */ var _deduction_structure_term_dependency_graph__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../deduction-structure/term-dependency-graph */ "./src/deduction-structure/term-dependency-graph/index.ts");
/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../deduction-interface */ "./src/deduction-interface/deduction-interface.ts");
/* harmony import */ var _generalization_rule_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generalization-rule-interface */ "./src/deduction-interface/rules-interface/quantification/generalization-rule-interface.ts");
/* harmony import */ var _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./quantification-rule-interface */ "./src/deduction-interface/rules-interface/quantification/quantification-rule-interface.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






var UniversalGeneralizationRuleInterface = /*#__PURE__*/function (_GeneralizationRuleIn) {
  _inherits(UniversalGeneralizationRuleInterface, _GeneralizationRuleIn);

  var _super = _createSuper(UniversalGeneralizationRuleInterface);

  function UniversalGeneralizationRuleInterface() {
    _classCallCheck(this, UniversalGeneralizationRuleInterface);

    return _super.apply(this, arguments);
  }

  _createClass(UniversalGeneralizationRuleInterface, [{
    key: "concreteApply",
    value: function concreteApply(newTerm, oldTerm) {
      var ruleApplicationSpec = _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__["RegularRuleApplicationSpec"].universalGeneralization(this.premise, this.stepIndex, newTerm, oldTerm);

      try {
        var newDeduction = this.deduction.applyRule(ruleApplicationSpec);
        return new _deduction_interface__WEBPACK_IMPORTED_MODULE_2__["DeductionInterface"](newDeduction);
      } catch (e) {
        if (e instanceof _deduction_structure_term_dependency_graph__WEBPACK_IMPORTED_MODULE_1__["TermAlreadyUsedError"]) {
          throw new _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_4__["TermAlreadyUsedError"](e.term);
        } else if (e instanceof _deduction_structure_term_dependency_graph__WEBPACK_IMPORTED_MODULE_1__["CyclicDependenciesError"]) {
          throw new _quantification_rule_interface__WEBPACK_IMPORTED_MODULE_4__["TermsCyclicDependenciesError"](e.dependentTerm, e.dependencyTerm);
        }

        throw e;
      }
    }
  }]);

  return UniversalGeneralizationRuleInterface;
}(_generalization_rule_interface__WEBPACK_IMPORTED_MODULE_3__["GeneralizationRuleInterface"]);

/***/ }),

/***/ "./src/deduction-interface/rules-interface/quantification/universal-instantiation-rule-interface.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/quantification/universal-instantiation-rule-interface.ts ***!
  \**********************************************************************************************************/
/*! exports provided: UniversalInstantiationRuleInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UniversalInstantiationRuleInterface", function() { return UniversalInstantiationRuleInterface; });
/* harmony import */ var _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../deduction-structure/rule-application-spec */ "./src/deduction-structure/rule-application-spec/index.ts");
/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../deduction-interface */ "./src/deduction-interface/deduction-interface.ts");
/* harmony import */ var _instantiation_rule_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instantiation-rule-interface */ "./src/deduction-interface/rules-interface/quantification/instantiation-rule-interface.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var UniversalInstantiationRuleInterface = /*#__PURE__*/function (_InstantiationRuleInt) {
  _inherits(UniversalInstantiationRuleInterface, _InstantiationRuleInt);

  var _super = _createSuper(UniversalInstantiationRuleInterface);

  function UniversalInstantiationRuleInterface() {
    _classCallCheck(this, UniversalInstantiationRuleInterface);

    return _super.apply(this, arguments);
  }

  _createClass(UniversalInstantiationRuleInterface, [{
    key: "concreteApply",
    value: function concreteApply(newTerm) {
      var ruleApplicationSpec = _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__["RegularRuleApplicationSpec"].universalInstantiation(this.premise, this.stepIndex, newTerm);
      var newDeduction = this.deduction.applyRule(ruleApplicationSpec);
      return new _deduction_interface__WEBPACK_IMPORTED_MODULE_1__["DeductionInterface"](newDeduction);
    }
  }]);

  return UniversalInstantiationRuleInterface;
}(_instantiation_rule_interface__WEBPACK_IMPORTED_MODULE_2__["InstantiationRuleInterface"]);

/***/ }),

/***/ "./src/deduction-interface/rules-interface/rules-interface.ts":
/*!********************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/rules-interface.ts ***!
  \********************************************************************/
/*! exports provided: RulesInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RulesInterface", function() { return RulesInterface; });
/* harmony import */ var _deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../deduction-structure/rule */ "./src/deduction-structure/rule.ts");
/* harmony import */ var _primitive_syms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../primitive-syms */ "./src/primitive-syms.ts");
/* harmony import */ var _deduction_rule_interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deduction-rule-interface */ "./src/deduction-interface/rules-interface/deduction-rule-interface.ts");
/* harmony import */ var _premise_rule_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./premise-rule-interface */ "./src/deduction-interface/rules-interface/premise-rule-interface.ts");
/* harmony import */ var _quantification__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./quantification */ "./src/deduction-interface/rules-interface/quantification/index.ts");
/* harmony import */ var _tautological_implication_rule_interface__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tautological-implication-rule-interface */ "./src/deduction-interface/rules-interface/tautological-implication-rule-interface.ts");
/* harmony import */ var _theorem_rule_interface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./theorem-rule-interface */ "./src/deduction-interface/rules-interface/theorem-rule-interface.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








/**
 * Accept deduction and selected steps (step indexes), determine possible rules which could be
 * applied and return interfaces for their application.
 */

var RulesInterface = function RulesInterface(deduction) {
  var result = {};

  for (var _len = arguments.length, steps = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    steps[_key - 1] = arguments[_key];
  }

  result[_deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__["Rule"].TautologicalImplication] = new _tautological_implication_rule_interface__WEBPACK_IMPORTED_MODULE_5__["TautologicalImplicationRuleInterface"](deduction, steps);

  if (steps.length === 0) {
    result[_deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__["Rule"].Premise] = new _premise_rule_interface__WEBPACK_IMPORTED_MODULE_3__["PremiseRuleInterface"](deduction);
    result[_deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__["Rule"].Theorem] = new _theorem_rule_interface__WEBPACK_IMPORTED_MODULE_6__["TheoremRuleInterface"](deduction);
  } else if (steps.length == 1) {
    var step = steps[0];
    var premise = deduction.getStep(step).formula;

    if (premise.sym.equals(_primitive_syms__WEBPACK_IMPORTED_MODULE_1__["universalQuantifier"])) {
      result[_deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__["Rule"].UniversalInstantiation] = new _quantification__WEBPACK_IMPORTED_MODULE_4__["UniversalInstantiationRuleInterface"](deduction, step);
    } else if (premise.sym.equals(_primitive_syms__WEBPACK_IMPORTED_MODULE_1__["existentialQuantifier"])) {
      result[_deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__["Rule"].ExistentialInstantiation] = new _quantification__WEBPACK_IMPORTED_MODULE_4__["ExistentialInstantiationRuleInterface"](deduction, step);
    }

    result[_deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__["Rule"].UniversalGeneralization] = new _quantification__WEBPACK_IMPORTED_MODULE_4__["UniversalGeneralizationRuleInterface"](deduction, step);
    result[_deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__["Rule"].ExistentialGeneralization] = new _quantification__WEBPACK_IMPORTED_MODULE_4__["ExistentialGeneralizationRuleInterface"](deduction, step);
  } else if (steps.length === 2) {
    var firstStepIndex = steps[0],
        secondStepIndex = steps[1];

    var _steps$map = steps.map(function (i) {
      return deduction.getStep(i);
    }),
        _steps$map2 = _slicedToArray(_steps$map, 2),
        firstStep = _steps$map2[0],
        secondStep = _steps$map2[1];

    var firstStepIsPremise = firstStep.ruleApplicationSummary.rule === _deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__["Rule"].Premise;
    var firstIsAssumptionForSecond = secondStep.assumptions.contains(firstStepIndex);

    if (firstStepIsPremise && firstIsAssumptionForSecond) {
      result[_deduction_structure_rule__WEBPACK_IMPORTED_MODULE_0__["Rule"].Deduction] = new _deduction_rule_interface__WEBPACK_IMPORTED_MODULE_2__["DeductionRuleInterface"](deduction, firstStepIndex, secondStepIndex);
    }
  }

  return result;
};

/***/ }),

/***/ "./src/deduction-interface/rules-interface/tautological-implication-rule-interface.ts":
/*!********************************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/tautological-implication-rule-interface.ts ***!
  \********************************************************************************************/
/*! exports provided: TautologicalImplicationRuleInterface, InvalidTautologicalImplicationError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TautologicalImplicationRuleInterface", function() { return TautologicalImplicationRuleInterface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidTautologicalImplicationError", function() { return InvalidTautologicalImplicationError; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../deduction-structure/rule-application-spec */ "./src/deduction-structure/rule-application-spec/index.ts");
/* harmony import */ var _propositional_logic_propositional_logic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../propositional-logic/propositional-logic */ "./src/propositional-logic/propositional-logic.ts");
/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../deduction-interface */ "./src/deduction-interface/deduction-interface.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../error */ "./src/deduction-interface/error.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var TautologicalImplicationRuleInterface = /*#__PURE__*/function () {
  function TautologicalImplicationRuleInterface(deduction) {
    var stepIndexes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, TautologicalImplicationRuleInterface);

    this.deduction = deduction;
    this.stepIndexes = stepIndexes;
  }

  _createClass(TautologicalImplicationRuleInterface, [{
    key: "apply",
    value: function apply(formula) {
      var _this = this;

      var assumptions = this.stepIndexes.map(function (i) {
        return _this.deduction.getStep(i).formula;
      });

      if (!Object(_propositional_logic_propositional_logic__WEBPACK_IMPORTED_MODULE_2__["isLogicalConsequence"])(assumptions, formula)) {
        throw new InvalidTautologicalImplicationError(assumptions, formula);
      }

      var ruleApplicationSpec = _deduction_structure_rule_application_spec__WEBPACK_IMPORTED_MODULE_1__["RegularRuleApplicationSpec"].tautologicalImplication(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedSet"])(this.stepIndexes), formula);
      var newDeduction = this.deduction.applyRule(ruleApplicationSpec);
      return new _deduction_interface__WEBPACK_IMPORTED_MODULE_3__["DeductionInterface"](newDeduction);
    }
  }]);

  return TautologicalImplicationRuleInterface;
}();
var InvalidTautologicalImplicationError = /*#__PURE__*/function (_DeductionInterfaceEr) {
  _inherits(InvalidTautologicalImplicationError, _DeductionInterfaceEr);

  var _super = _createSuper(InvalidTautologicalImplicationError);

  function InvalidTautologicalImplicationError(assumptions, consequence) {
    var _this2;

    _classCallCheck(this, InvalidTautologicalImplicationError);

    _this2 = _super.call(this, "assumption(s) ".concat(assumptions.join(', '), " do(es)n't entail ").concat(consequence));
    _this2.assumptions = assumptions;
    _this2.consequence = consequence;
    return _this2;
  }

  return InvalidTautologicalImplicationError;
}(_error__WEBPACK_IMPORTED_MODULE_4__["DeductionInterfaceError"]);

/***/ }),

/***/ "./src/deduction-interface/rules-interface/theorem-rule-interface.ts":
/*!***************************************************************************!*\
  !*** ./src/deduction-interface/rules-interface/theorem-rule-interface.ts ***!
  \***************************************************************************/
/*! exports provided: TheoremRuleInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TheoremRuleInterface", function() { return TheoremRuleInterface; });
/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../deduction-interface */ "./src/deduction-interface/deduction-interface.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var TheoremRuleInterface = /*#__PURE__*/function () {
  function TheoremRuleInterface(deduction) {
    _classCallCheck(this, TheoremRuleInterface);

    this.deduction = deduction;
  }

  _createClass(TheoremRuleInterface, [{
    key: "apply",
    value: function apply() {
      return new _deduction_interface__WEBPACK_IMPORTED_MODULE_0__["DeductionInterface"](this.deduction);
    }
  }]);

  return TheoremRuleInterface;
}();

/***/ }),

/***/ "./src/deduction-structure/deduction.ts":
/*!**********************************************!*\
  !*** ./src/deduction-structure/deduction.ts ***!
  \**********************************************/
/*! exports provided: Deduction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deduction", function() { return Deduction; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rule */ "./src/deduction-structure/rule.ts");
/* harmony import */ var _rule_application_summary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rule-application-summary */ "./src/deduction-structure/rule-application-summary/index.ts");
/* harmony import */ var _step__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./step */ "./src/deduction-structure/step.ts");
/* harmony import */ var _term_dependency_graph__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./term-dependency-graph */ "./src/deduction-structure/term-dependency-graph/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







/**
 * Structure containing all relevant information about some deduction (proof) carried out as a
 * sequence of steps.
 */
var Deduction = /*#__PURE__*/function (_Record) {
  _inherits(Deduction, _Record);

  var _super = _createSuper(Deduction);

  function Deduction() {
    _classCallCheck(this, Deduction);

    return _super.apply(this, arguments);
  }

  _createClass(Deduction, [{
    key: "applyRule",

    /**
     * Derive new deduction by applying rule.
     *
     * @param ruleApplicationSpec - Specification of the rule to apply.
     */
    value: function applyRule(ruleApplicationSpec) {
      return ruleApplicationSpec.rule === _rule__WEBPACK_IMPORTED_MODULE_1__["Rule"].Theorem ? this.applyTheoremRule(ruleApplicationSpec) : this.applyRegularRule(ruleApplicationSpec);
    }
  }, {
    key: "applyTheoremRule",
    value: function applyTheoremRule(_ref) {
      var formula = _ref.theorem,
          theoremId = _ref.theoremId;
      var ruleApplicationSummary = new _rule_application_summary__WEBPACK_IMPORTED_MODULE_2__["TheoremRuleApplicationSummary"]({
        rule: _rule__WEBPACK_IMPORTED_MODULE_1__["Rule"].Theorem,
        theoremId: theoremId
      });
      var step = new _step__WEBPACK_IMPORTED_MODULE_3__["Step"]({
        formula: formula,
        ruleApplicationSummary: ruleApplicationSummary
      });
      return this.addStep(step);
    }
  }, {
    key: "applyRegularRule",
    value: function applyRegularRule(_ref2) {
      var rule = _ref2.rule,
          premises = _ref2.premises,
          conclusion = _ref2.conclusion,
          termDependencies = _ref2.termDependencies,
          assumptionToRemove = _ref2.assumptionToRemove;
      var assumptions = this.calculateAssumptions(premises, assumptionToRemove);
      var ruleApplicationSummary = new _rule_application_summary__WEBPACK_IMPORTED_MODULE_2__["RegularRuleApplicationSummary"]({
        rule: rule,
        premises: premises,
        termDependencies: termDependencies
      });
      var step = new _step__WEBPACK_IMPORTED_MODULE_3__["Step"]({
        assumptions: assumptions,
        formula: conclusion,
        ruleApplicationSummary: ruleApplicationSummary
      });
      var graph = termDependencies === undefined ? this.termDependencyGraph : this.updateGraph(termDependencies);
      return this.addStep(step).setGraph(graph);
    }
    /**
     * Get step by its ordinal number.
     *
     * From regular user's perspective steps are referenced by positive integers starting from 1.
     * Internally we use list indexes which start from 0.
     */

  }, {
    key: "getStepByOrdinal",
    value: function getStepByOrdinal(ordinal) {
      return this.getStep(ordinal - 1);
    }
  }, {
    key: "getStep",
    value: function getStep(stepIndex) {
      var step = this.steps.get(stepIndex);
      if (step === undefined) throw new Error("no step at index ".concat(stepIndex));
      return step;
    }
  }, {
    key: "getLastStep",
    value: function getLastStep() {
      var step = this.steps.last(undefined);
      if (step === undefined) throw new Error('no last step');
      return step;
    }
    /**
     * Calculate which assumptions must be added according to the specified rule premises.
     *
     * Assumptions are inherited from all premises. In addition to that if premise was introduced
     * by `Premise` or `Theorem` rule, its index is also added as an assumption.
     */

  }, {
    key: "calculateAssumptions",
    value: function calculateAssumptions(premises, toRemove) {
      var _this = this;

      var assumptions = premises.toIndexedSeq().map(function (premise) {
        return _this.getStep(premise);
      }).flatMap(function (_ref3, i) {
        var assumptions = _ref3.assumptions,
            rule = _ref3.ruleApplicationSummary.rule;

        if (rule === _rule__WEBPACK_IMPORTED_MODULE_1__["Rule"].Premise || rule === _rule__WEBPACK_IMPORTED_MODULE_1__["Rule"].Theorem) {
          assumptions = assumptions.add(i);
        }

        return assumptions;
      }).toSet();
      if (toRemove !== undefined) assumptions = assumptions.remove(toRemove);
      return assumptions;
    }
    /** Calculate new graph according to changes required by the rule. */

  }, {
    key: "updateGraph",
    value: function updateGraph(_ref4) {
      var _this$termDependencyG;

      var dependent = _ref4.dependent,
          dependencies = _ref4.dependencies;
      return (_this$termDependencyG = this.termDependencyGraph).addDependencies.apply(_this$termDependencyG, [dependent].concat(_toConsumableArray(dependencies.toArray())));
    }
  }, {
    key: "addStep",
    value: function addStep(step) {
      return this.update('steps', function (steps) {
        return steps.push(step);
      });
    }
  }, {
    key: "setGraph",
    value: function setGraph(graph) {
      return this.set('termDependencyGraph', graph);
    }
  }, {
    key: "size",
    get: function get() {
      return this.steps.size;
    }
  }]);

  return Deduction;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  steps: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])(),
  termDependencyGraph: new _term_dependency_graph__WEBPACK_IMPORTED_MODULE_4__["TermDependencyGraph"]()
}, 'Deduction'));

/***/ }),

/***/ "./src/deduction-structure/index.ts":
/*!******************************************!*\
  !*** ./src/deduction-structure/index.ts ***!
  \******************************************/
/*! exports provided: Deduction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deduction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deduction */ "./src/deduction-structure/deduction.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Deduction", function() { return _deduction__WEBPACK_IMPORTED_MODULE_0__["Deduction"]; });



/***/ }),

/***/ "./src/deduction-structure/rule-application-spec/index.ts":
/*!****************************************************************!*\
  !*** ./src/deduction-structure/rule-application-spec/index.ts ***!
  \****************************************************************/
/*! exports provided: RegularRuleApplicationSpec, TheoremRuleApplicationSpec */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regular_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regular-rule-application-spec */ "./src/deduction-structure/rule-application-spec/regular-rule-application-spec.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegularRuleApplicationSpec", function() { return _regular_rule_application_spec__WEBPACK_IMPORTED_MODULE_0__["RegularRuleApplicationSpec"]; });

/* harmony import */ var _theorem_rule_application_spec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./theorem-rule-application-spec */ "./src/deduction-structure/rule-application-spec/theorem-rule-application-spec.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TheoremRuleApplicationSpec", function() { return _theorem_rule_application_spec__WEBPACK_IMPORTED_MODULE_1__["TheoremRuleApplicationSpec"]; });




/***/ }),

/***/ "./src/deduction-structure/rule-application-spec/regular-rule-application-spec.ts":
/*!****************************************************************************************!*\
  !*** ./src/deduction-structure/rule-application-spec/regular-rule-application-spec.ts ***!
  \****************************************************************************************/
/*! exports provided: RegularRuleApplicationSpec */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegularRuleApplicationSpec", function() { return RegularRuleApplicationSpec; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../abstract-structures/expression */ "./src/abstract-structures/expression/index.ts");
/* harmony import */ var _primitive_syms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../primitive-syms */ "./src/primitive-syms.ts");
/* harmony import */ var _rule__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rule */ "./src/deduction-structure/rule.ts");
/* harmony import */ var _term_dependency_graph_term_dependencies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../term-dependency-graph/term-dependencies */ "./src/deduction-structure/term-dependency-graph/term-dependencies.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }






/**
 * Contains all information necessary to apply a regular rule (not theorem rule) against a
 * deduction.
 *
 * Notes:
 * - Deduction to which the rule will be applied we will call 'target deduction'.
 * - In the following lines we sometimes refer to formulas by numbers. Number in such contexts is
 *   the index of the target deduction's step which introduced the formula in question (as a result
 *   of the premise rule or theorem rule).
 *
 * All rules (except theorem) are reduced to this object. It contains all data necessary to
 * construct the next step of the target deduction. This object can be considered as some sort of a
 * common denominator of all regular rules.
 *
 * Note: static factory methods don't validate data!
 */

var RegularRuleApplicationSpec = /*#__PURE__*/function (_Record) {
  _inherits(RegularRuleApplicationSpec, _Record);

  var _super = _createSuper(RegularRuleApplicationSpec);

  function RegularRuleApplicationSpec() {
    _classCallCheck(this, RegularRuleApplicationSpec);

    return _super.apply(this, arguments);
  }

  _createClass(RegularRuleApplicationSpec, null, [{
    key: "premise",
    value: function premise(_premise) {
      return new RegularRuleApplicationSpec({
        rule: _rule__WEBPACK_IMPORTED_MODULE_3__["Rule"].Premise,
        conclusion: _premise
      });
    }
  }, {
    key: "deduction",
    value: function deduction(antecedent, antecedentIndex, consequent, consequentIndex) {
      return new RegularRuleApplicationSpec({
        rule: _rule__WEBPACK_IMPORTED_MODULE_3__["Rule"].Deduction,
        premises: immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedSet"].of(antecedentIndex, consequentIndex),
        conclusion: new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"]({
          sym: _primitive_syms__WEBPACK_IMPORTED_MODULE_2__["implication"],
          children: immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(antecedent, consequent)
        }),
        assumptionToRemove: antecedentIndex
      });
    }
  }, {
    key: "tautologicalImplication",
    value: function tautologicalImplication(premises, conclusion) {
      return new RegularRuleApplicationSpec({
        rule: _rule__WEBPACK_IMPORTED_MODULE_3__["Rule"].TautologicalImplication,
        premises: premises,
        conclusion: conclusion
      });
    }
  }, {
    key: "universalInstantiation",
    value: function universalInstantiation(_ref, premiseIndex, newTerm) {
      var boundSym = _ref.boundSym,
          children = _ref.children;
      var child = children.get(0);
      var conclusion = newTerm !== undefined ? child.replaceFreeOccurrences(boundSym, newTerm) : child;
      return new RegularRuleApplicationSpec({
        rule: _rule__WEBPACK_IMPORTED_MODULE_3__["Rule"].UniversalInstantiation,
        premises: immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedSet"].of(premiseIndex),
        conclusion: conclusion
      });
    }
  }, {
    key: "universalGeneralization",
    value: function universalGeneralization(premise, premiseIndex, newTerm, oldTerm) {
      var child = oldTerm !== undefined ? premise.replaceFreeOccurrences(oldTerm, newTerm) : premise;
      return new RegularRuleApplicationSpec({
        rule: _rule__WEBPACK_IMPORTED_MODULE_3__["Rule"].UniversalGeneralization,
        premises: immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedSet"].of(premiseIndex),
        conclusion: new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"]({
          sym: _primitive_syms__WEBPACK_IMPORTED_MODULE_2__["universalQuantifier"],
          boundSym: newTerm,
          children: immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(child)
        }),
        termDependencies: oldTerm !== undefined ? premise.getFreeTerms().remove(oldTerm).reduce(function (acc, dependencyTerm) {
          return acc.addDependency(dependencyTerm);
        }, new _term_dependency_graph_term_dependencies__WEBPACK_IMPORTED_MODULE_4__["TermDependencies"]({
          dependent: oldTerm
        })) : undefined
      });
    }
  }, {
    key: "existentialInstantiation",
    value: function existentialInstantiation(_ref2, premiseIndex, newTerm) {
      var boundSym = _ref2.boundSym,
          children = _ref2.children;
      var child = children.get(0);
      var conclusion = newTerm !== undefined ? child.replaceFreeOccurrences(boundSym, newTerm) : child;
      return new RegularRuleApplicationSpec({
        rule: _rule__WEBPACK_IMPORTED_MODULE_3__["Rule"].ExistentialInstantiation,
        premises: immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedSet"].of(premiseIndex),
        conclusion: conclusion,
        termDependencies: newTerm !== undefined ? conclusion.getFreeTerms().remove(newTerm).reduce(function (acc, dependencyTerm) {
          return acc.addDependency(dependencyTerm);
        }, new _term_dependency_graph_term_dependencies__WEBPACK_IMPORTED_MODULE_4__["TermDependencies"]({
          dependent: newTerm
        })) : undefined
      });
    }
  }, {
    key: "existentialGeneralization",
    value: function existentialGeneralization(premise, premiseIndex, newTerm, oldTerm) {
      var child = oldTerm !== undefined ? premise.replaceFreeOccurrences(oldTerm, newTerm) : premise;
      return new RegularRuleApplicationSpec({
        rule: _rule__WEBPACK_IMPORTED_MODULE_3__["Rule"].ExistentialGeneralization,
        premises: immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedSet"].of(premiseIndex),
        conclusion: new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"]({
          sym: _primitive_syms__WEBPACK_IMPORTED_MODULE_2__["existentialQuantifier"],
          boundSym: newTerm,
          children: immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(child)
        })
      });
    }
  }]);

  return RegularRuleApplicationSpec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  rule: _rule__WEBPACK_IMPORTED_MODULE_3__["Rule"].Premise,
  premises: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedSet"])(),
  conclusion: new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"](),
  termDependencies: undefined,
  assumptionToRemove: undefined
}, 'RegularRuleApplicationSpec'));

/***/ }),

/***/ "./src/deduction-structure/rule-application-spec/theorem-rule-application-spec.ts":
/*!****************************************************************************************!*\
  !*** ./src/deduction-structure/rule-application-spec/theorem-rule-application-spec.ts ***!
  \****************************************************************************************/
/*! exports provided: TheoremRuleApplicationSpec */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TheoremRuleApplicationSpec", function() { return TheoremRuleApplicationSpec; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../abstract-structures/expression */ "./src/abstract-structures/expression/index.ts");
/* harmony import */ var _rule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rule */ "./src/deduction-structure/rule.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




/** Contains all information necessary to apply the theorem rule against a deduction. */

var TheoremRuleApplicationSpec = /*#__PURE__*/function (_Record) {
  _inherits(TheoremRuleApplicationSpec, _Record);

  var _super = _createSuper(TheoremRuleApplicationSpec);

  function TheoremRuleApplicationSpec() {
    _classCallCheck(this, TheoremRuleApplicationSpec);

    return _super.apply(this, arguments);
  }

  return TheoremRuleApplicationSpec;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  rule: _rule__WEBPACK_IMPORTED_MODULE_2__["Rule"].Theorem,
  theoremId: '',
  theorem: new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"]()
}, 'TheoremRuleApplicationSpec'));

/***/ }),

/***/ "./src/deduction-structure/rule-application-summary/index.ts":
/*!*******************************************************************!*\
  !*** ./src/deduction-structure/rule-application-summary/index.ts ***!
  \*******************************************************************/
/*! exports provided: RegularRuleApplicationSummary, TheoremRuleApplicationSummary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _regular_rule_application_summary__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regular-rule-application-summary */ "./src/deduction-structure/rule-application-summary/regular-rule-application-summary.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegularRuleApplicationSummary", function() { return _regular_rule_application_summary__WEBPACK_IMPORTED_MODULE_0__["RegularRuleApplicationSummary"]; });

/* harmony import */ var _theorem_rule_application_summary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./theorem-rule-application-summary */ "./src/deduction-structure/rule-application-summary/theorem-rule-application-summary.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TheoremRuleApplicationSummary", function() { return _theorem_rule_application_summary__WEBPACK_IMPORTED_MODULE_1__["TheoremRuleApplicationSummary"]; });




/***/ }),

/***/ "./src/deduction-structure/rule-application-summary/regular-rule-application-summary.ts":
/*!**********************************************************************************************!*\
  !*** ./src/deduction-structure/rule-application-summary/regular-rule-application-summary.ts ***!
  \**********************************************************************************************/
/*! exports provided: RegularRuleApplicationSummary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegularRuleApplicationSummary", function() { return RegularRuleApplicationSummary; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rule */ "./src/deduction-structure/rule.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var RegularRuleApplicationSummary = /*#__PURE__*/function (_Record) {
  _inherits(RegularRuleApplicationSummary, _Record);

  var _super = _createSuper(RegularRuleApplicationSummary);

  function RegularRuleApplicationSummary() {
    _classCallCheck(this, RegularRuleApplicationSummary);

    return _super.apply(this, arguments);
  }

  return RegularRuleApplicationSummary;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  rule: _rule__WEBPACK_IMPORTED_MODULE_1__["Rule"].Premise,
  premises: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["OrderedSet"])(),
  termDependencies: undefined
}, 'RegularRuleApplicationSummary'));

/***/ }),

/***/ "./src/deduction-structure/rule-application-summary/theorem-rule-application-summary.ts":
/*!**********************************************************************************************!*\
  !*** ./src/deduction-structure/rule-application-summary/theorem-rule-application-summary.ts ***!
  \**********************************************************************************************/
/*! exports provided: TheoremRuleApplicationSummary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TheoremRuleApplicationSummary", function() { return TheoremRuleApplicationSummary; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _rule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rule */ "./src/deduction-structure/rule.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var TheoremRuleApplicationSummary = /*#__PURE__*/function (_Record) {
  _inherits(TheoremRuleApplicationSummary, _Record);

  var _super = _createSuper(TheoremRuleApplicationSummary);

  function TheoremRuleApplicationSummary() {
    _classCallCheck(this, TheoremRuleApplicationSummary);

    return _super.apply(this, arguments);
  }

  return TheoremRuleApplicationSummary;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  rule: _rule__WEBPACK_IMPORTED_MODULE_1__["Rule"].Theorem,
  theoremId: ''
}, 'TheoremRuleApplicationSummary'));

/***/ }),

/***/ "./src/deduction-structure/rule.ts":
/*!*****************************************!*\
  !*** ./src/deduction-structure/rule.ts ***!
  \*****************************************/
/*! exports provided: Rule, RuleAbbreviation, getAbbreviation, getRule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rule", function() { return Rule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuleAbbreviation", function() { return RuleAbbreviation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAbbreviation", function() { return getAbbreviation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRule", function() { return getRule; });
var _ruleToAbbreviation, _abbreviationToRule;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Fixed set of rule names/identifiers available in deduction.
 */
var Rule;

(function (Rule) {
  Rule["Premise"] = "Premise";
  Rule["Deduction"] = "Deduction";
  Rule["TautologicalImplication"] = "TautologicalImplication";
  Rule["UniversalInstantiation"] = "UniversalInstantiation";
  Rule["UniversalGeneralization"] = "UniversalGeneralization";
  Rule["ExistentialInstantiation"] = "ExistentialInstantiation";
  Rule["ExistentialGeneralization"] = "ExistentialGeneralization";
  Rule["Theorem"] = "Theorem";
})(Rule || (Rule = {}));

var RuleAbbreviation;

(function (RuleAbbreviation) {
  RuleAbbreviation["P"] = "P";
  RuleAbbreviation["D"] = "D";
  RuleAbbreviation["TI"] = "TI";
  RuleAbbreviation["UI"] = "UI";
  RuleAbbreviation["UG"] = "UG";
  RuleAbbreviation["EI"] = "EI";
  RuleAbbreviation["EG"] = "EG";
  RuleAbbreviation["T"] = "T";
})(RuleAbbreviation || (RuleAbbreviation = {}));

var getAbbreviation = function getAbbreviation(rule) {
  return ruleToAbbreviation[rule];
};
var getRule = function getRule(abbreviation) {
  return abbreviationToRule[abbreviation];
};
var ruleToAbbreviation = (_ruleToAbbreviation = {}, _defineProperty(_ruleToAbbreviation, Rule.Premise, RuleAbbreviation.P), _defineProperty(_ruleToAbbreviation, Rule.Deduction, RuleAbbreviation.D), _defineProperty(_ruleToAbbreviation, Rule.TautologicalImplication, RuleAbbreviation.TI), _defineProperty(_ruleToAbbreviation, Rule.UniversalInstantiation, RuleAbbreviation.UI), _defineProperty(_ruleToAbbreviation, Rule.UniversalGeneralization, RuleAbbreviation.UG), _defineProperty(_ruleToAbbreviation, Rule.ExistentialInstantiation, RuleAbbreviation.EI), _defineProperty(_ruleToAbbreviation, Rule.ExistentialGeneralization, RuleAbbreviation.EG), _defineProperty(_ruleToAbbreviation, Rule.Theorem, RuleAbbreviation.T), _ruleToAbbreviation);
var abbreviationToRule = (_abbreviationToRule = {}, _defineProperty(_abbreviationToRule, RuleAbbreviation.P, Rule.Premise), _defineProperty(_abbreviationToRule, RuleAbbreviation.D, Rule.Deduction), _defineProperty(_abbreviationToRule, RuleAbbreviation.TI, Rule.TautologicalImplication), _defineProperty(_abbreviationToRule, RuleAbbreviation.UI, Rule.UniversalInstantiation), _defineProperty(_abbreviationToRule, RuleAbbreviation.UG, Rule.UniversalGeneralization), _defineProperty(_abbreviationToRule, RuleAbbreviation.EI, Rule.ExistentialInstantiation), _defineProperty(_abbreviationToRule, RuleAbbreviation.EG, Rule.ExistentialGeneralization), _defineProperty(_abbreviationToRule, RuleAbbreviation.T, Rule.Theorem), _abbreviationToRule);

/***/ }),

/***/ "./src/deduction-structure/step.ts":
/*!*****************************************!*\
  !*** ./src/deduction-structure/step.ts ***!
  \*****************************************/
/*! exports provided: Step */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Step", function() { return Step; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract-structures/expression */ "./src/abstract-structures/expression/index.ts");
/* harmony import */ var _rule_application_summary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rule-application-summary */ "./src/deduction-structure/rule-application-summary/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




var Step = /*#__PURE__*/function (_Record) {
  _inherits(Step, _Record);

  var _super = _createSuper(Step);

  function Step() {
    _classCallCheck(this, Step);

    return _super.apply(this, arguments);
  }

  return Step;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  assumptions: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])(),
  formula: new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"](),
  ruleApplicationSummary: new _rule_application_summary__WEBPACK_IMPORTED_MODULE_2__["RegularRuleApplicationSummary"]()
}, 'Step'));

/***/ }),

/***/ "./src/deduction-structure/term-dependency-graph/index.ts":
/*!****************************************************************!*\
  !*** ./src/deduction-structure/term-dependency-graph/index.ts ***!
  \****************************************************************/
/*! exports provided: TermDependencyGraph, TermDependencyGraphError, TermAlreadyUsedError, CyclicDependenciesError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _term_dependency_graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./term-dependency-graph */ "./src/deduction-structure/term-dependency-graph/term-dependency-graph.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TermDependencyGraph", function() { return _term_dependency_graph__WEBPACK_IMPORTED_MODULE_0__["TermDependencyGraph"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TermDependencyGraphError", function() { return _term_dependency_graph__WEBPACK_IMPORTED_MODULE_0__["TermDependencyGraphError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TermAlreadyUsedError", function() { return _term_dependency_graph__WEBPACK_IMPORTED_MODULE_0__["TermAlreadyUsedError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CyclicDependenciesError", function() { return _term_dependency_graph__WEBPACK_IMPORTED_MODULE_0__["CyclicDependenciesError"]; });



/***/ }),

/***/ "./src/deduction-structure/term-dependency-graph/term-dependencies.ts":
/*!****************************************************************************!*\
  !*** ./src/deduction-structure/term-dependency-graph/term-dependencies.ts ***!
  \****************************************************************************/
/*! exports provided: TermDependencies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermDependencies", function() { return TermDependencies; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../abstract-structures/sym */ "./src/abstract-structures/sym/index.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



/** Dependencies for a single term. */

var TermDependencies = /*#__PURE__*/function (_Record) {
  _inherits(TermDependencies, _Record);

  var _super = _createSuper(TermDependencies);

  function TermDependencies() {
    _classCallCheck(this, TermDependencies);

    return _super.apply(this, arguments);
  }

  _createClass(TermDependencies, [{
    key: "addDependency",
    value: function addDependency(dependency) {
      return this.update('dependencies', function (dependencies) {
        return dependencies.add(dependency);
      });
    }
  }]);

  return TermDependencies;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  dependent: new _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__["Sym"](),
  dependencies: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])()
}));

/***/ }),

/***/ "./src/deduction-structure/term-dependency-graph/term-dependency-graph.ts":
/*!********************************************************************************!*\
  !*** ./src/deduction-structure/term-dependency-graph/term-dependency-graph.ts ***!
  \********************************************************************************/
/*! exports provided: TermDependencyGraph, TermDependencyGraphError, TermAlreadyUsedError, CyclicDependenciesError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermDependencyGraph", function() { return TermDependencyGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermDependencyGraphError", function() { return TermDependencyGraphError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TermAlreadyUsedError", function() { return TermAlreadyUsedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CyclicDependenciesError", function() { return CyclicDependenciesError; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../error */ "./src/error.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



/**
 * Graph of dependencies between free terms of a deduction.
 *
 * This graph is maintained as a part of deduction. It's updated on each application of UG and
 * EI rule.
 */

var TermDependencyGraph = /*#__PURE__*/function (_Record) {
  _inherits(TermDependencyGraph, _Record);

  var _super = _createSuper(TermDependencyGraph);

  function TermDependencyGraph() {
    _classCallCheck(this, TermDependencyGraph);

    return _super.apply(this, arguments);
  }

  _createClass(TermDependencyGraph, [{
    key: "addDependencies",

    /**
     * Add direct dependency and normalize graph (remove redundant direct dependencies which now
     * became transitive).
     */
    value: function addDependencies(dependent) {
      var _this = this;

      for (var _len = arguments.length, dependencies = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        dependencies[_key - 1] = arguments[_key];
      }

      var dependenciesSet = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])(dependencies);

      if (this.dependencies.has(dependent)) {
        throw new TermAlreadyUsedError(dependent);
      }

      var cycleInducingDependency = dependenciesSet.find(function (dependency) {
        return _this.hasDependency(dependency, dependent);
      });

      if (cycleInducingDependency !== undefined) {
        throw new CyclicDependenciesError(dependent, cycleInducingDependency);
      }

      return dependenciesSet.reduce(function (acc, dependency) {
        return acc.normalize(dependent, dependency).update('dependencies', function (map) {
          return map.update(dependent, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])(), function (values) {
            return values.add(dependency);
          });
        });
      }, this.update('dependencies', function (map) {
        return map.set(dependent, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])());
      }));
    }
  }, {
    key: "getDirectDependents",
    value: function getDirectDependents(sym) {
      return this.dependencies.entrySeq().filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            dependencies = _ref2[1];

        return dependencies.contains(sym);
      }).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1),
            dependent = _ref4[0];

        return dependent;
      }).toSet();
    }
  }, {
    key: "getDependents",
    value: function getDependents(sym) {
      return this._getDependents(sym);
    }
  }, {
    key: "_getDependents",
    value: function _getDependents(sym) {
      var _this2 = this;

      var traversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])();
      if (traversed.contains(sym)) throw new Error('Infinite recursion error');
      traversed = traversed.add(sym);
      var directDependents = this.getDirectDependents(sym);
      return directDependents.reduce(function (acc, dependent) {
        return acc.union(_this2._getDependents(dependent, traversed));
      }, directDependents);
    }
  }, {
    key: "getDependencies",
    value: function getDependencies(sym) {
      return this._getDependencies(sym);
    }
  }, {
    key: "_getDependencies",
    value: function _getDependencies(sym) {
      var _this3 = this;

      var traversed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])();
      if (traversed.contains(sym)) throw new Error('Infinite recursion error');
      traversed = traversed.add(sym);
      var directDependencies = this.dependencies.get(sym, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])());
      return directDependencies.reduce(function (acc, dependent) {
        return acc.union(_this3._getDependencies(dependent, traversed));
      }, directDependencies);
    }
  }, {
    key: "hasDirectDependency",
    value: function hasDirectDependency(dependent, dependency) {
      var _this$dependencies$ge;

      return ((_this$dependencies$ge = this.dependencies.get(dependent)) === null || _this$dependencies$ge === void 0 ? void 0 : _this$dependencies$ge.contains(dependency)) || false;
    }
  }, {
    key: "hasDependency",
    value: function hasDependency(dependent, dependency) {
      return this._hasDependency(dependent, dependency);
    }
  }, {
    key: "_hasDependency",
    value: function _hasDependency(dependent, dependency) {
      var _this4 = this;

      var traversed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])();
      if (traversed.contains(dependent)) throw new Error('Infinite recursion error');
      traversed = traversed.add(dependent);
      var sym1Dependencies = this.dependencies.get(dependent, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])());
      return sym1Dependencies.contains(dependency) || sym1Dependencies.some(function (sym) {
        return _this4._hasDependency(sym, dependency, traversed);
      });
    }
  }, {
    key: "normalize",
    value: function normalize(dependent, dependency) {
      var normalizedDownwards = this.normalizeDownwards(dependent, dependency, true);
      return normalizedDownwards.getDirectDependents(dependent).reduce(function (graph, furtherDependent) {
        return graph.normalizeDownwards(furtherDependent, dependency);
      }, normalizedDownwards);
    }
  }, {
    key: "normalizeDownwards",
    value: function normalizeDownwards(dependent, dependency) {
      var _this$dependencies$ge2;

      var isRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!isRoot && this.hasDirectDependency(dependent, dependency)) {
        return this.removeDirectDependency(dependent, dependency);
      }

      return ((_this$dependencies$ge2 = this.dependencies.get(dependency)) === null || _this$dependencies$ge2 === void 0 ? void 0 : _this$dependencies$ge2.reduce(function (graph, furtherDependency) {
        return graph.normalizeDownwards(dependent, furtherDependency);
      }, this)) || this;
    }
  }, {
    key: "removeDirectDependency",
    value: function removeDirectDependency(dependent, dependency) {
      var dependencyTerms = this.dependencies.get(dependent);
      if (dependencyTerms === undefined) return this;
      var newDependencyTerms = dependencyTerms.remove(dependency);
      return this.set('dependencies', newDependencyTerms.isEmpty() ? this.dependencies.remove(dependent) : this.dependencies.set(dependent, newDependencyTerms));
    }
  }]);

  return TermDependencyGraph;
}(Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Record"])({
  dependencies: Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])()
}, 'TermDependencyGraph'));
var TermDependencyGraphError = /*#__PURE__*/function (_BaseError) {
  _inherits(TermDependencyGraphError, _BaseError);

  var _super2 = _createSuper(TermDependencyGraphError);

  function TermDependencyGraphError() {
    _classCallCheck(this, TermDependencyGraphError);

    return _super2.apply(this, arguments);
  }

  return TermDependencyGraphError;
}(_error__WEBPACK_IMPORTED_MODULE_1__["BaseError"]);
var TermAlreadyUsedError = /*#__PURE__*/function (_TermDependencyGraphE) {
  _inherits(TermAlreadyUsedError, _TermDependencyGraphE);

  var _super3 = _createSuper(TermAlreadyUsedError);

  function TermAlreadyUsedError(term) {
    var _this5;

    _classCallCheck(this, TermAlreadyUsedError);

    _this5 = _super3.call(this, "term ".concat(term, " is already used"));
    _this5.term = term;
    return _this5;
  }

  return TermAlreadyUsedError;
}(TermDependencyGraphError);
var CyclicDependenciesError = /*#__PURE__*/function (_TermDependencyGraphE2) {
  _inherits(CyclicDependenciesError, _TermDependencyGraphE2);

  var _super4 = _createSuper(CyclicDependenciesError);

  function CyclicDependenciesError(dependentTerm, dependencyTerm) {
    var _this6;

    _classCallCheck(this, CyclicDependenciesError);

    _this6 = _super4.call(this, "term ".concat(dependentTerm, " forms a cycle by depending on ").concat(dependencyTerm));
    _this6.dependentTerm = dependentTerm;
    _this6.dependencyTerm = dependencyTerm;
    return _this6;
  }

  return CyclicDependenciesError;
}(TermDependencyGraphError);

/***/ }),

/***/ "./src/error.ts":
/*!**********************!*\
  !*** ./src/error.ts ***!
  \**********************/
/*! exports provided: BaseError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseError", function() { return BaseError; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Base error of the whole project.
 *
 * Whenever we throw an error which should be caught, that error should inherit this base class.
 */
var BaseError = /*#__PURE__*/function (_Error) {
  _inherits(BaseError, _Error);

  var _super = _createSuper(BaseError);

  function BaseError(message) {
    var _this;

    _classCallCheck(this, BaseError);

    _this = _super.call(this, message); // This might create problems if code is minified.

    _this.name = _this.constructor.name;
    return _this;
  }

  return BaseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

/***/ }),

/***/ "./src/formula-construction-util.ts":
/*!******************************************!*\
  !*** ./src/formula-construction-util.ts ***!
  \******************************************/
/*! exports provided: createConjunction, createImplicationWithAntecedentsAsConjunction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createConjunction", function() { return createConjunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createImplicationWithAntecedentsAsConjunction", function() { return createImplicationWithAntecedentsAsConjunction; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-structures/expression */ "./src/abstract-structures/expression/index.ts");
/* harmony import */ var _primitive_syms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./primitive-syms */ "./src/primitive-syms.ts");



/**
 * Create conjunction of `formulas`. If there's only one formula return it.
 */

var createConjunction = function createConjunction(formulas) {
  return formulas.length === 1 ? formulas[0] : Object(_abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["connectWithBinarySym"])(formulas, _primitive_syms__WEBPACK_IMPORTED_MODULE_2__["conjunction"]);
};
var createImplicationWithAntecedentsAsConjunction = function createImplicationWithAntecedentsAsConjunction(antecedents, consequent) {
  return new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"]({
    sym: _primitive_syms__WEBPACK_IMPORTED_MODULE_2__["implication"],
    children: immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(createConjunction(antecedents), consequent)
  });
};

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: DeductionInterface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _deduction_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deduction-interface */ "./src/deduction-interface/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeductionInterface", function() { return _deduction_interface__WEBPACK_IMPORTED_MODULE_0__["DeductionInterface"]; });


var kita = 3;
module.exports = {
  kita: kita
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/primitive-syms.ts":
/*!*******************************!*\
  !*** ./src/primitive-syms.ts ***!
  \*******************************/
/*! exports provided: negation, conjunction, disjunction, implication, equivalence, universalQuantifier, existentialQuantifier, primitiveSyms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negation", function() { return negation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conjunction", function() { return conjunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disjunction", function() { return disjunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "implication", function() { return implication; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equivalence", function() { return equivalence; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "universalQuantifier", function() { return universalQuantifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "existentialQuantifier", function() { return existentialQuantifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "primitiveSyms", function() { return primitiveSyms; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-structures/sym */ "./src/abstract-structures/sym/index.ts");


var negation = _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__["Sym"].ff({
  id: 0,
  arity: 1
});
var conjunction = _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__["Sym"].ff({
  id: 1,
  arity: 2
});
var disjunction = _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__["Sym"].ff({
  id: 2,
  arity: 2
});
var implication = _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__["Sym"].ff({
  id: 3,
  arity: 2
});
var equivalence = _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__["Sym"].ff({
  id: 4,
  arity: 2
});
var universalQuantifier = _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__["Sym"].ff({
  id: 5,
  arity: 1,
  binds: true
});
var existentialQuantifier = _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_1__["Sym"].ff({
  id: 6,
  arity: 1,
  binds: true
});
var primitiveSyms = immutable__WEBPACK_IMPORTED_MODULE_0__["Set"].of(negation, conjunction, disjunction, implication, equivalence, universalQuantifier, existentialQuantifier);

/***/ }),

/***/ "./src/propositional-logic/primitive-truth-functions.ts":
/*!**************************************************************!*\
  !*** ./src/propositional-logic/primitive-truth-functions.ts ***!
  \**************************************************************/
/*! exports provided: primitiveTruthFunctions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "primitiveTruthFunctions", function() { return primitiveTruthFunctions; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _primitive_syms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../primitive-syms */ "./src/primitive-syms.ts");


var primitiveTruthFunctions = Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])([[_primitive_syms__WEBPACK_IMPORTED_MODULE_1__["negation"], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])([[immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(true), false], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(false), true]])], [_primitive_syms__WEBPACK_IMPORTED_MODULE_1__["conjunction"], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])([[immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(true, true), true], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(true, false), false], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(false, true), false], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(false, false), false]])], [_primitive_syms__WEBPACK_IMPORTED_MODULE_1__["disjunction"], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])([[immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(true, true), true], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(true, false), true], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(false, true), true], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(false, false), false]])], [_primitive_syms__WEBPACK_IMPORTED_MODULE_1__["implication"], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])([[immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(true, true), true], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(true, false), false], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(false, true), true], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(false, false), true]])], [_primitive_syms__WEBPACK_IMPORTED_MODULE_1__["equivalence"], Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])([[immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(true, true), true], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(true, false), false], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(false, true), false], [immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(false, false), true]])]]);

/***/ }),

/***/ "./src/propositional-logic/propositional-logic-util.ts":
/*!*************************************************************!*\
  !*** ./src/propositional-logic/propositional-logic-util.ts ***!
  \*************************************************************/
/*! exports provided: evaluate, findInterpretations, EvaluationError, NotTruthFunctionalError, NoAssignedValueError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "evaluate", function() { return evaluate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findInterpretations", function() { return findInterpretations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EvaluationError", function() { return EvaluationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotTruthFunctionalError", function() { return NotTruthFunctionalError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoAssignedValueError", function() { return NoAssignedValueError; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_sym_category__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract-structures/sym/category */ "./src/abstract-structures/sym/category.ts");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../error */ "./src/error.ts");
/* harmony import */ var _primitive_truth_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./primitive-truth-functions */ "./src/propositional-logic/primitive-truth-functions.ts");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var evaluate = function evaluate(_ref) {
  var sym = _ref.sym,
      children = _ref.children;
  var interpretation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();
  if (sym.getCategory() !== _abstract_structures_sym_category__WEBPACK_IMPORTED_MODULE_1__["Category"].FF) throw new NotTruthFunctionalError();

  if (sym.arity === 0) {
    var value = interpretation.get(sym);
    if (value === undefined) throw new NoAssignedValueError();
    return value;
  }

  var childrenValues = children.map(function (child) {
    return evaluate(child, interpretation);
  });
  return getTruthTable(sym).get(childrenValues);
};
/**
 * Find all interpretations of `formula` which make the value of formula equal to `value`.
 */

var findInterpretations = function findInterpretations(formula, value) {
  return findInterpretationsLimitedByBaseInterpretation(formula, value);
};
/**
 * Find interpretations which are extensions of `interpretation`.
 */

var findInterpretationsLimitedByBaseInterpretation = function findInterpretationsLimitedByBaseInterpretation(_ref2, value) {
  var sym = _ref2.sym,
      children = _ref2.children;
  var interpretation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();

  if (sym.getCategory() !== _abstract_structures_sym_category__WEBPACK_IMPORTED_MODULE_1__["Category"].FF || sym.binds) {
    throw new NotTruthFunctionalError();
  }

  if (sym.arity === 0) {
    var fixedValue = interpretation.get(sym);
    if (fixedValue !== undefined) return fixedValue !== value ? Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])() : immutable__WEBPACK_IMPORTED_MODULE_0__["Set"].of(interpretation);
    return immutable__WEBPACK_IMPORTED_MODULE_0__["Set"].of(interpretation.set(sym, value));
  }

  return getTruthTable(sym).entrySeq().filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        tableValue = _ref4[1];

    return tableValue === value;
  }).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1),
        tableArgs = _ref6[0];

    return tableArgs;
  }).map(function (tableArgs) {
    return children.reduce(function (interpretations, child, i) {
      return findInterpretationsLimitedByBaseInterpretations(child, tableArgs.get(i), interpretations);
    }, immutable__WEBPACK_IMPORTED_MODULE_0__["Set"].of(interpretation));
  }).reduce(function (result, interpretations) {
    return result.union(interpretations);
  }, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])());
};
/**
 * Find interpretations which are extensions of `interpretations`.
 */


var findInterpretationsLimitedByBaseInterpretations = function findInterpretationsLimitedByBaseInterpretations(formula, value, interpretations) {
  return interpretations.reduce(function (result, interpretation) {
    return result.union(findInterpretationsLimitedByBaseInterpretation(formula, value, interpretation));
  }, Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Set"])());
};

var getTruthTable = function getTruthTable(sym) {
  var truthFunction = _primitive_truth_functions__WEBPACK_IMPORTED_MODULE_3__["primitiveTruthFunctions"].get(sym);
  if (truthFunction === undefined) throw new NoAssignedValueError();
  return truthFunction;
};

var EvaluationError = /*#__PURE__*/function (_BaseError) {
  _inherits(EvaluationError, _BaseError);

  var _super = _createSuper(EvaluationError);

  function EvaluationError() {
    _classCallCheck(this, EvaluationError);

    return _super.apply(this, arguments);
  }

  return EvaluationError;
}(_error__WEBPACK_IMPORTED_MODULE_2__["BaseError"]);
var NotTruthFunctionalError = /*#__PURE__*/function (_EvaluationError) {
  _inherits(NotTruthFunctionalError, _EvaluationError);

  var _super2 = _createSuper(NotTruthFunctionalError);

  function NotTruthFunctionalError() {
    _classCallCheck(this, NotTruthFunctionalError);

    return _super2.apply(this, arguments);
  }

  return NotTruthFunctionalError;
}(EvaluationError);
var NoAssignedValueError = /*#__PURE__*/function (_EvaluationError2) {
  _inherits(NoAssignedValueError, _EvaluationError2);

  var _super3 = _createSuper(NoAssignedValueError);

  function NoAssignedValueError() {
    _classCallCheck(this, NoAssignedValueError);

    return _super3.apply(this, arguments);
  }

  return NoAssignedValueError;
}(EvaluationError);

/***/ }),

/***/ "./src/propositional-logic/propositional-logic.ts":
/*!********************************************************!*\
  !*** ./src/propositional-logic/propositional-logic.ts ***!
  \********************************************************/
/*! exports provided: isSatisfiable, isFalsifiable, isContingent, isTautology, isContradiction, isLogicalConsequence */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSatisfiable", function() { return isSatisfiable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFalsifiable", function() { return isFalsifiable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isContingent", function() { return isContingent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTautology", function() { return isTautology; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isContradiction", function() { return isContradiction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLogicalConsequence", function() { return isLogicalConsequence; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract-structures/expression */ "./src/abstract-structures/expression/index.ts");
/* harmony import */ var _formula_construction_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../formula-construction-util */ "./src/formula-construction-util.ts");
/* harmony import */ var _primitive_syms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../primitive-syms */ "./src/primitive-syms.ts");
/* harmony import */ var _propositional_logic_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./propositional-logic-util */ "./src/propositional-logic/propositional-logic-util.ts");
/* harmony import */ var _reduce_to_truth_functional__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reduce-to-truth-functional */ "./src/propositional-logic/reduce-to-truth-functional.ts");






var isSatisfiable = function isSatisfiable(formula) {
  return hasInterpretations(formula, true);
};
var isFalsifiable = function isFalsifiable(formula) {
  return hasInterpretations(formula, false);
};
var isContingent = function isContingent(formula) {
  return isSatisfiable(formula) && isFalsifiable(formula);
};
var isTautology = function isTautology(formula) {
  return !isFalsifiable(formula);
};
var isContradiction = function isContradiction(formula) {
  return !isSatisfiable(formula);
};
var isLogicalConsequence = function isLogicalConsequence(assumptions, consequence) {
  if (assumptions.length === 0) return isTautology(consequence);

  if (assumptions.length === 1) {
    return isTautology(new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"]({
      sym: _primitive_syms__WEBPACK_IMPORTED_MODULE_3__["implication"],
      children: immutable__WEBPACK_IMPORTED_MODULE_0__["List"].of(assumptions[0], consequence)
    }));
  }

  return isTautology(Object(_formula_construction_util__WEBPACK_IMPORTED_MODULE_2__["createImplicationWithAntecedentsAsConjunction"])(assumptions, consequence));
};

var hasInterpretations = function hasInterpretations(formula, value) {
  return !findInterpretations(formula, value).isEmpty();
};

var findInterpretations = function findInterpretations(formula, value) {
  var reducedFormula = Object(_reduce_to_truth_functional__WEBPACK_IMPORTED_MODULE_5__["reduceToTruthFunctional"])(formula);
  return _propositional_logic_util__WEBPACK_IMPORTED_MODULE_4__["findInterpretations"](reducedFormula, value);
};

/***/ }),

/***/ "./src/propositional-logic/reduce-to-truth-functional.ts":
/*!***************************************************************!*\
  !*** ./src/propositional-logic/reduce-to-truth-functional.ts ***!
  \***************************************************************/
/*! exports provided: reduceToTruthFunctional */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduceToTruthFunctional", function() { return reduceToTruthFunctional; });
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immutable */ "immutable");
/* harmony import */ var immutable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immutable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../abstract-structures/expression */ "./src/abstract-structures/expression/index.ts");
/* harmony import */ var _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../abstract-structures/sym */ "./src/abstract-structures/sym/index.ts");
/* harmony import */ var _abstract_structures_sym_category__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../abstract-structures/sym/category */ "./src/abstract-structures/sym/category.ts");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





/**
 * Traverse `formula` and replace each non-truth-functional subformula with a generated
 * truth-functional symbol using successive negative ids (to avoid collision with existing symbols).
 * This is a mid-step before doing truth-functional operations on any formula.
 */

var reduceToTruthFunctional = function reduceToTruthFunctional(formula) {
  return reduceToTruthFunctionalWithSubstitutions(formula)[0];
};

var reduceToTruthFunctionalWithSubstitutions = function reduceToTruthFunctionalWithSubstitutions(formula) {
  var substitutions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object(immutable__WEBPACK_IMPORTED_MODULE_0__["Map"])();
  var sym = formula.sym,
      children = formula.children;

  if (sym.getCategory() === _abstract_structures_sym_category__WEBPACK_IMPORTED_MODULE_3__["Category"].FF && !sym.binds) {
    var _children$reduce = children.reduce(function (_ref, child) {
      var _ref2 = _slicedToArray(_ref, 2),
          currentChildren = _ref2[0],
          currentAssignments = _ref2[1];

      var _reduceToTruthFunctio = reduceToTruthFunctionalWithSubstitutions(child, currentAssignments),
          _reduceToTruthFunctio2 = _slicedToArray(_reduceToTruthFunctio, 2),
          newChild = _reduceToTruthFunctio2[0],
          newAssignments = _reduceToTruthFunctio2[1];

      return [currentChildren.push(newChild), newAssignments];
    }, [Object(immutable__WEBPACK_IMPORTED_MODULE_0__["List"])(), substitutions]),
        _children$reduce2 = _slicedToArray(_children$reduce, 2),
        newChildren = _children$reduce2[0],
        newAssignments = _children$reduce2[1];

    return [new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"]({
      sym: sym,
      children: newChildren
    }), newAssignments];
  }

  var assignmentsToReturn = substitutions;
  var substitutedSym = substitutions.get(formula);

  if (substitutedSym === undefined) {
    substitutedSym = _abstract_structures_sym__WEBPACK_IMPORTED_MODULE_2__["Sym"].ff({
      id: -assignmentsToReturn.size
    });
    assignmentsToReturn = assignmentsToReturn.set(formula, substitutedSym);
  }

  return [new _abstract_structures_expression__WEBPACK_IMPORTED_MODULE_1__["Expression"]({
    sym: substitutedSym
  }), assignmentsToReturn];
};

/***/ }),

/***/ "immutable":
/*!***********************************************************************************!*\
  !*** external {"commonjs":"immutable","commonjs2":"immutable","amd":"immutable"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_immutable__;

/***/ })

/******/ });
});
//# sourceMappingURL=theoremCore.js.map
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

/***/ "./src/Model/Model.ts":
/*!****************************!*\
  !*** ./src/Model/Model.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Model = /** @class */ (function () {
    function Model(start, range) {
        var _this = this;
        this.getRange = function () { return _this.range; };
        this.getStart = function () { return _this.start; };
        this.throwError = function (errorMsg) {
            throw new Error(errorMsg);
        };
        var min = range.min, max = range.max;
        if (range.min > range.max) {
            this.throwError('range.min не может быть > range.max');
        }
        this.start = start;
        this.range = {
            min: min,
            max: max,
        };
    }
    return Model;
}());
exports.Model = Model;


/***/ }),

/***/ "./src/Presenter/Presenter.ts":
/*!************************************!*\
  !*** ./src/Presenter/Presenter.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = __webpack_require__(/*! ../Model/Model */ "./src/Model/Model.ts");
var View_1 = __webpack_require__(/*! ../View/View */ "./src/View/View.ts");
var Presenter = /** @class */ (function () {
    function Presenter(options) {
        var _this = this;
        this.init = function () {
            var model = new Model_1.Model(_this.start, _this.range);
            var view = new View_1.default(model.getStart(), model.getRange());
            view.render();
        };
        this.start = options.start;
        this.range = options.range;
    }
    return Presenter;
}());
exports.Presenter = Presenter;


/***/ }),

/***/ "./src/View/View.ts":
/*!**************************!*\
  !*** ./src/View/View.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var View = /** @class */ (function () {
    function View(start, range) {
        var _this = this;
        this.render = function () {
            var startHTML = document.createElement('p');
            startHTML.textContent = "\u043D\u0430\u0447\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: " + _this.start;
            document.body.appendChild(startHTML);
            var p = document.createElement('p');
            p.textContent = "\u0440\u0435\u0439\u043D\u0434\u0436: " + _this.range.min + " --- " + _this.range.max;
            document.body.appendChild(p);
        };
        this.start = start;
        this.range = range;
    }
    return View;
}());
exports.default = View;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable func-names */
var Presenter_1 = __webpack_require__(/*! ./Presenter/Presenter */ "./src/Presenter/Presenter.ts");
(function (jquery) {
    var $ = jquery;
    $.fn.rangeSlider = function (options) {
        var sliderOptions = options;
        // Устанавливаем значения по умолчанию
        sliderOptions = $.extend({
            start: 0,
            range: {
                min: 0,
                max: 100,
            },
        }, sliderOptions);
        // Выбранный элемент будет в this, т.е. это уже объект JQuery, а не элемент DOM
        // Код плагина (может быть на JS)
        var presenter = new Presenter_1.Presenter(sliderOptions);
        presenter.init();
    };
}(jQuery));


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9QcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hFQTtJQUtFLGVBQVksS0FBYSxFQUFFLEtBQWE7UUFBeEMsaUJBWUM7UUFFRCxhQUFRLEdBQUcsY0FBTSxZQUFJLENBQUMsS0FBSyxFQUFWLENBQVUsQ0FBQztRQUU1QixhQUFRLEdBQUcsY0FBTSxZQUFJLENBQUMsS0FBSyxFQUFWLENBQVUsQ0FBQztRQUVwQixlQUFVLEdBQUcsVUFBQyxRQUFnQjtZQUNwQyxNQUFNLElBQUksS0FBSyxD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cmFuZ2Utc2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbnRlcmZhY2UgSU1vZGVsIHtcbiAgZ2V0UmFuZ2UoKTogSVJhbmdlO1xuICBnZXRTdGFydCgpOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBJUmFuZ2Uge1xuICBtaW46IG51bWJlcjtcbiAgbWF4OiBudW1iZXI7XG59XG5cbmNsYXNzIE1vZGVsIGltcGxlbWVudHMgSU1vZGVsIHtcbiAgcHJpdmF0ZSBzdGFydDogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmFuZ2U6IElSYW5nZTtcblxuICBjb25zdHJ1Y3RvcihzdGFydDogbnVtYmVyLCByYW5nZTogSVJhbmdlKSB7XG4gICAgY29uc3QgeyBtaW4sIG1heCB9ID0gcmFuZ2U7XG5cbiAgICBpZiAocmFuZ2UubWluID4gcmFuZ2UubWF4KSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ3JhbmdlLm1pbiDQvdC1INC80L7QttC10YIg0LHRi9GC0YwgPiByYW5nZS5tYXgnKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XG4gICAgdGhpcy5yYW5nZSA9IHtcbiAgICAgIG1pbixcbiAgICAgIG1heCxcbiAgICB9O1xuICB9XG5cbiAgZ2V0UmFuZ2UgPSAoKSA9PiB0aGlzLnJhbmdlO1xuXG4gIGdldFN0YXJ0ID0gKCkgPT4gdGhpcy5zdGFydDtcblxuICBwcml2YXRlIHRocm93RXJyb3IgPSAoZXJyb3JNc2c6IHN0cmluZykgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1zZyk7XG4gIH07XG59XG5cbmV4cG9ydCB7IE1vZGVsLCBJTW9kZWwsIElSYW5nZSB9O1xuIiwiaW1wb3J0IHsgTW9kZWwsIElSYW5nZSB9IGZyb20gJy4uL01vZGVsL01vZGVsJztcbmltcG9ydCBWaWV3IGZyb20gJy4uL1ZpZXcvVmlldyc7XG5cbmludGVyZmFjZSBJT3B0aW9ucyB7XG4gIHN0YXJ0OiBudW1iZXI7XG4gIHJhbmdlOiBJUmFuZ2U7XG59XG5cbmNsYXNzIFByZXNlbnRlciB7XG4gIHByaXZhdGUgc3RhcnQ6IG51bWJlcjtcblxuICBwcml2YXRlIHJhbmdlOiBJUmFuZ2U7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogSU9wdGlvbnMpIHtcbiAgICB0aGlzLnN0YXJ0ID0gb3B0aW9ucy5zdGFydDtcbiAgICB0aGlzLnJhbmdlID0gb3B0aW9ucy5yYW5nZTtcbiAgfVxuXG4gIGluaXQgPSAoKSA9PiB7XG4gICAgY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwodGhpcy5zdGFydCwgdGhpcy5yYW5nZSk7XG4gICAgY29uc3QgdmlldyA9IG5ldyBWaWV3KG1vZGVsLmdldFN0YXJ0KCksIG1vZGVsLmdldFJhbmdlKCkpO1xuICAgIHZpZXcucmVuZGVyKCk7XG4gIH07XG59XG5cbmV4cG9ydCB7IFByZXNlbnRlciwgSU9wdGlvbnMgfTtcbiIsImltcG9ydCB7IElSYW5nZSB9IGZyb20gJy4uL01vZGVsL01vZGVsJztcblxuY2xhc3MgVmlldyB7XG4gIHByaXZhdGUgc3RhcnQ6IG51bWJlcjtcblxuICBwcml2YXRlIHJhbmdlOiBJUmFuZ2U7XG5cbiAgY29uc3RydWN0b3Ioc3RhcnQ6IG51bWJlciwgcmFuZ2U6IElSYW5nZSkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XG4gIH1cblxuICByZW5kZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRIVE1MID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHN0YXJ0SFRNTC50ZXh0Q29udGVudCA9IGDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtTogJHt0aGlzLnN0YXJ0fWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGFydEhUTUwpO1xuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgcC50ZXh0Q29udGVudCA9IGDRgNC10LnQvdC00LY6ICR7dGhpcy5yYW5nZS5taW59IC0tLSAke3RoaXMucmFuZ2UubWF4fWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbmltcG9ydCB7IFByZXNlbnRlciwgSU9wdGlvbnMgfSBmcm9tICcuL1ByZXNlbnRlci9QcmVzZW50ZXInO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBKUXVlcnkge1xuICAgIHJhbmdlU2xpZGVyKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZDtcbiAgfVxufVxuXG4oZnVuY3Rpb24gKGpxdWVyeSkge1xuICBjb25zdCAkID0ganF1ZXJ5O1xuICAkLmZuLnJhbmdlU2xpZGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBsZXQgc2xpZGVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LfQvdCw0YfQtdC90LjRjyDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuICAgIHNsaWRlck9wdGlvbnMgPSAkLmV4dGVuZChcbiAgICAgIHtcbiAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgbWluOiAwLFxuICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHNsaWRlck9wdGlvbnMsXG4gICAgKTtcbiAgICAvLyDQktGL0LHRgNCw0L3QvdGL0Lkg0Y3Qu9C10LzQtdC90YIg0LHRg9C00LXRgiDQsiB0aGlzLCDRgi7QtS4g0Y3RgtC+INGD0LbQtSDQvtCx0YrQtdC60YIgSlF1ZXJ5LCDQsCDQvdC1INGN0LvQtdC80LXQvdGCIERPTVxuICAgIC8vINCa0L7QtCDQv9C70LDQs9C40L3QsCAo0LzQvtC20LXRgiDQsdGL0YLRjCDQvdCwIEpTKVxuICAgIGNvbnN0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIoc2xpZGVyT3B0aW9ucyk7XG4gICAgcHJlc2VudGVyLmluaXQoKTtcbiAgfTtcbn0oalF1ZXJ5KSk7XG4iXSwic291cmNlUm9vdCI6IiJ9
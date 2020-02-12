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
    // TODO обернуть в 1 объект = options
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
    // TODO обернуть в 1 объект = options
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9QcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFQTtJQUtFLHFDQUFxQztJQUNyQyxlQUFZLEtBQWEsRUFBRSxLQUFhO1FBQXhDLGlCQVlDO1FBRUQsYUFBUSxHQUFHLGNBQU0sWUFBSSxDQUFDLEtBQUssRUFBVixDQUFVLENBQUM7UUFFNUIsYUFBUSxHQUFHLGNBQU0sWUFBSSxDQUFDLEtBQUssRUFBVixDQUFVLENBQUM7UUFFcEIsZUFBVSxHQUFHLFVBQUMsUUFBZ0I7WUFDcEMsTUFB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TSxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJyYW5nZS1zbGlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImludGVyZmFjZSBJTW9kZWwge1xuICBnZXRSYW5nZSgpOiBJUmFuZ2U7XG4gIGdldFN0YXJ0KCk6IG51bWJlcjtcbn1cblxuLy8gVE9ETzog0LLRi9C90LXRgdGC0Lgg0LjQvdGC0LXRgNGE0LXQudGBINCyINC+0YLQtdC00LvRjNC90YvQuSDRhNCw0LnQu1xuaW50ZXJmYWNlIElSYW5nZSB7XG4gIG1pbjogbnVtYmVyO1xuICBtYXg6IG51bWJlcjtcbn1cblxuY2xhc3MgTW9kZWwgaW1wbGVtZW50cyBJTW9kZWwge1xuICBwcml2YXRlIHN0YXJ0OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSByYW5nZTogSVJhbmdlO1xuXG4gIC8vIFRPRE8g0L7QsdC10YDQvdGD0YLRjCDQsiAxINC+0LHRitC10LrRgiA9IG9wdGlvbnNcbiAgY29uc3RydWN0b3Ioc3RhcnQ6IG51bWJlciwgcmFuZ2U6IElSYW5nZSkge1xuICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHJhbmdlO1xuXG4gICAgaWYgKHJhbmdlLm1pbiA+IHJhbmdlLm1heCkge1xuICAgICAgdGhpcy50aHJvd0Vycm9yKCdyYW5nZS5taW4g0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMID4gcmFuZ2UubWF4Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICBtaW4sXG4gICAgICBtYXgsXG4gICAgfTtcbiAgfVxuXG4gIGdldFJhbmdlID0gKCkgPT4gdGhpcy5yYW5nZTtcblxuICBnZXRTdGFydCA9ICgpID0+IHRoaXMuc3RhcnQ7XG5cbiAgcHJpdmF0ZSB0aHJvd0Vycm9yID0gKGVycm9yTXNnOiBzdHJpbmcpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNc2cpO1xuICB9O1xufVxuXG5leHBvcnQgeyBNb2RlbCwgSU1vZGVsLCBJUmFuZ2UgfTtcbiIsImltcG9ydCB7IE1vZGVsLCBJUmFuZ2UgfSBmcm9tICcuLi9Nb2RlbC9Nb2RlbCc7XG5pbXBvcnQgVmlldyBmcm9tICcuLi9WaWV3L1ZpZXcnO1xuXG4vLyBUT0RPOiDQstGL0L3QtdGB0YLQuCDQuNC90YLQtdGA0YTQtdC50YEg0LIg0L7RgtC00LXQu9GM0L3Ri9C5INGE0LDQudC7XG5pbnRlcmZhY2UgSU9wdGlvbnMge1xuICBzdGFydDogbnVtYmVyO1xuICByYW5nZTogSVJhbmdlO1xufVxuXG5jbGFzcyBQcmVzZW50ZXIge1xuICBwcml2YXRlIHN0YXJ0OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSByYW5nZTogSVJhbmdlO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IElPcHRpb25zKSB7XG4gICAgdGhpcy5zdGFydCA9IG9wdGlvbnMuc3RhcnQ7XG4gICAgdGhpcy5yYW5nZSA9IG9wdGlvbnMucmFuZ2U7XG4gIH1cblxuICBpbml0ID0gKCkgPT4ge1xuICAgIGNvbnN0IG1vZGVsID0gbmV3IE1vZGVsKHRoaXMuc3RhcnQsIHRoaXMucmFuZ2UpO1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgVmlldyhtb2RlbC5nZXRTdGFydCgpLCBtb2RlbC5nZXRSYW5nZSgpKTtcbiAgICB2aWV3LnJlbmRlcigpO1xuICB9O1xufVxuXG5leHBvcnQgeyBQcmVzZW50ZXIsIElPcHRpb25zIH07XG4iLCJpbXBvcnQgeyBJUmFuZ2UgfSBmcm9tICcuLi9Nb2RlbC9Nb2RlbCc7XG5cbmNsYXNzIFZpZXcge1xuICBwcml2YXRlIHN0YXJ0OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSByYW5nZTogSVJhbmdlO1xuICAvLyBUT0RPINC+0LHQtdGA0L3Rg9GC0Ywg0LIgMSDQvtCx0YrQtdC60YIgPSBvcHRpb25zXG5cbiAgY29uc3RydWN0b3Ioc3RhcnQ6IG51bWJlciwgcmFuZ2U6IElSYW5nZSkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XG4gIH1cblxuICByZW5kZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRIVE1MID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHN0YXJ0SFRNTC50ZXh0Q29udGVudCA9IGDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtTogJHt0aGlzLnN0YXJ0fWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGFydEhUTUwpO1xuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgcC50ZXh0Q29udGVudCA9IGDRgNC10LnQvdC00LY6ICR7dGhpcy5yYW5nZS5taW59IC0tLSAke3RoaXMucmFuZ2UubWF4fWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGZ1bmMtbmFtZXMgKi9cbmltcG9ydCB7IFByZXNlbnRlciwgSU9wdGlvbnMgfSBmcm9tICcuL1ByZXNlbnRlci9QcmVzZW50ZXInO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBKUXVlcnkge1xuICAgIHJhbmdlU2xpZGVyKG9wdGlvbnM6IElPcHRpb25zKTogdm9pZDtcbiAgfVxufVxuXG4oZnVuY3Rpb24gKGpxdWVyeSkge1xuICBjb25zdCAkID0ganF1ZXJ5O1xuICAkLmZuLnJhbmdlU2xpZGVyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBsZXQgc2xpZGVyT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgLy8g0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LfQvdCw0YfQtdC90LjRjyDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxuICAgIHNsaWRlck9wdGlvbnMgPSAkLmV4dGVuZChcbiAgICAgIHtcbiAgICAgICAgc3RhcnQ6IDAsXG4gICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgbWluOiAwLFxuICAgICAgICAgIG1heDogMTAwLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHNsaWRlck9wdGlvbnMsXG4gICAgKTtcbiAgICAvLyDQktGL0LHRgNCw0L3QvdGL0Lkg0Y3Qu9C10LzQtdC90YIg0LHRg9C00LXRgiDQsiB0aGlzLCDRgi7QtS4g0Y3RgtC+INGD0LbQtSDQvtCx0YrQtdC60YIgSlF1ZXJ5LCDQsCDQvdC1INGN0LvQtdC80LXQvdGCIERPTVxuICAgIC8vINCa0L7QtCDQv9C70LDQs9C40L3QsCAo0LzQvtC20LXRgiDQsdGL0YLRjCDQvdCwIEpTKVxuICAgIGNvbnN0IHByZXNlbnRlciA9IG5ldyBQcmVzZW50ZXIoc2xpZGVyT3B0aW9ucyk7XG4gICAgcHJlc2VudGVyLmluaXQoKTtcbiAgfTtcbn0oalF1ZXJ5KSk7XG4iXSwic291cmNlUm9vdCI6IiJ9
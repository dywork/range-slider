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
/*! exports provided: Model */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
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



/***/ }),

/***/ "./src/Presenter/Presenter.ts":
/*!************************************!*\
  !*** ./src/Presenter/Presenter.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Model_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Model/Model */ "./src/Model/Model.ts");
/* harmony import */ var _View_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../View/View */ "./src/View/View.ts");


var Presenter = /** @class */ (function () {
    function Presenter() {
        this.init = function () {
            var start = 0;
            var range = {
                min: 0,
                max: 100,
            };
            var model = new _Model_Model__WEBPACK_IMPORTED_MODULE_0__["Model"](start, range);
            var view = new _View_View__WEBPACK_IMPORTED_MODULE_1__["default"](model.getStart(), model.getRange());
            view.render();
        };
    }
    return Presenter;
}());
/* harmony default export */ __webpack_exports__["default"] = (Presenter);


/***/ }),

/***/ "./src/View/View.ts":
/*!**************************!*\
  !*** ./src/View/View.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (View);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Presenter_Presenter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Presenter/Presenter */ "./src/Presenter/Presenter.ts");

var presenter = new _Presenter_Presenter__WEBPACK_IMPORTED_MODULE_0__["default"]();
/* harmony default export */ __webpack_exports__["default"] = (presenter);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01vZGVsL01vZGVsLnRzIiwid2VicGFjazovLy8uL3NyYy9QcmVzZW50ZXIvUHJlc2VudGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9WaWV3L1ZpZXcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4RUE7QUFBQTtBQUFBO0lBS0UsZUFBWSxLQUFhLEVBQUUsS0FBYTtRQUF4QyxpQkFZQztRQUVELGFBQVEsR0FBRyxjQUFNLFlBQUksQ0FBQyxLQUFLLEVBQVYsQ0FBVSxDQUFDO1FBRTVCLGFBQVEsR0FBRyxjQUFNLFlBQUksQ0FBQyxLQUFLLEVBQVYsQ0FBVSxDQUFDO1FBRXBCLGVBQVUsR0FBRyxVQUFDLFFBQWdCO1lBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDO1FBbkJRLG1CQUFHLEVBQUUsZUFBRyxDQUFXO1FBRTNCLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUN4RDtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxHQUFHO1lBQ0gsR0FBRztTQUNKLENBQUM7SUFDSixDQUFDO0lBU0gsWUFBQztBQUFELENBQUM7QUFFZ0M7Ozs7Ozs7Ozs7Ozs7QUN0Q2pDO0FBQUE7QUFBQTtBQUF1QztBQUNQO0FBRWhDO0lBQUE7UUFDRSxTQUFJLEdBQUc7WUFDTCxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBTSxLQUFLLEdBQUc7Z0JBQ1osR0FBRyxFQUFFLENBQUM7Z0JBQ04sR0FBRyxFQUFFLEdBQUc7YUFDVCxDQUFDO1lBQ0YsSUFBTSxLQUFLLEdBQUcsSUFBSSxrREFBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QyxJQUFNLElBQUksR0FBRyxJQUFJLGtEQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0lBQUQsZ0JBQUM7QUFBRCxDQUFDO0FBRWMsd0VBQVMsRUFBQzs7Ozs7Ozs7Ozs7OztBQ2R6QjtBQUFBO0lBS0UsY0FBWSxLQUFhLEVBQUUsS0FBYTtRQUF4QyxpQkFHQztRQUVELFdBQU0sR0FBRztZQUNQLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsU0FBUyxDQUFDLFdBQVcsR0FBRyw4R0FBdUIsS0FBSSxDQUFDLEtBQU8sQ0FBQztZQUM1RCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxJQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxXQUFXLEdBQUcsMkNBQVcsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLGFBQVEsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFLLENBQUM7WUFDbEUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDO1FBWEEsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQVVILFdBQUM7QUFBRCxDQUFDO0FBRWMsbUVBQUksRUFBQzs7Ozs7Ozs7Ozs7OztBQ3RCcEI7QUFBQTtBQUE4QztBQUU5QyxJQUFNLFNBQVMsR0FBRyxJQUFJLDREQUFTLEVBQUUsQ0FBQztBQUVuQix3RUFBUyxFQUFDIiwiZmlsZSI6InJhbmdlLXNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW50ZXJmYWNlIElNb2RlbCB7XG4gIGdldFJhbmdlKCk6IElSYW5nZTtcbiAgZ2V0U3RhcnQoKTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgSVJhbmdlIHtcbiAgbWluOiBudW1iZXI7XG4gIG1heDogbnVtYmVyO1xufVxuXG5jbGFzcyBNb2RlbCBpbXBsZW1lbnRzIElNb2RlbCB7XG4gIHByaXZhdGUgc3RhcnQ6IG51bWJlcjtcblxuICBwcml2YXRlIHJhbmdlOiBJUmFuZ2U7XG5cbiAgY29uc3RydWN0b3Ioc3RhcnQ6IG51bWJlciwgcmFuZ2U6IElSYW5nZSkge1xuICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHJhbmdlO1xuXG4gICAgaWYgKHJhbmdlLm1pbiA+IHJhbmdlLm1heCkge1xuICAgICAgdGhpcy50aHJvd0Vycm9yKCdyYW5nZS5taW4g0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMID4gcmFuZ2UubWF4Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICBtaW4sXG4gICAgICBtYXgsXG4gICAgfTtcbiAgfVxuXG4gIGdldFJhbmdlID0gKCkgPT4gdGhpcy5yYW5nZTtcblxuICBnZXRTdGFydCA9ICgpID0+IHRoaXMuc3RhcnQ7XG5cbiAgcHJpdmF0ZSB0aHJvd0Vycm9yID0gKGVycm9yTXNnOiBzdHJpbmcpID0+IHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNc2cpO1xuICB9O1xufVxuXG5leHBvcnQgeyBNb2RlbCwgSU1vZGVsLCBJUmFuZ2UgfTtcbiIsImltcG9ydCB7IE1vZGVsIH0gZnJvbSAnLi4vTW9kZWwvTW9kZWwnO1xuaW1wb3J0IFZpZXcgZnJvbSAnLi4vVmlldy9WaWV3JztcblxuY2xhc3MgUHJlc2VudGVyIHtcbiAgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFydCA9IDA7XG4gICAgY29uc3QgcmFuZ2UgPSB7XG4gICAgICBtaW46IDAsXG4gICAgICBtYXg6IDEwMCxcbiAgICB9O1xuICAgIGNvbnN0IG1vZGVsID0gbmV3IE1vZGVsKHN0YXJ0LCByYW5nZSk7XG4gICAgY29uc3QgdmlldyA9IG5ldyBWaWV3KG1vZGVsLmdldFN0YXJ0KCksIG1vZGVsLmdldFJhbmdlKCkpO1xuICAgIHZpZXcucmVuZGVyKCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByZXNlbnRlcjtcbiIsImltcG9ydCB7IElSYW5nZSB9IGZyb20gJy4uL01vZGVsL01vZGVsJztcblxuY2xhc3MgVmlldyB7XG4gIHByaXZhdGUgc3RhcnQ6IG51bWJlcjtcblxuICBwcml2YXRlIHJhbmdlOiBJUmFuZ2U7XG5cbiAgY29uc3RydWN0b3Ioc3RhcnQ6IG51bWJlciwgcmFuZ2U6IElSYW5nZSkge1xuICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICB0aGlzLnJhbmdlID0gcmFuZ2U7XG4gIH1cblxuICByZW5kZXIgPSAoKSA9PiB7XG4gICAgY29uc3Qgc3RhcnRIVE1MID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHN0YXJ0SFRNTC50ZXh0Q29udGVudCA9IGDQvdCw0YfQsNC70YzQvdC+0LUg0LfQvdCw0YfQtdC90LjQtTogJHt0aGlzLnN0YXJ0fWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzdGFydEhUTUwpO1xuICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgcC50ZXh0Q29udGVudCA9IGDRgNC10LnQvdC00LY6ICR7dGhpcy5yYW5nZS5taW59IC0tLSAke3RoaXMucmFuZ2UubWF4fWA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlldztcbiIsImltcG9ydCBQcmVzZW50ZXIgZnJvbSAnLi9QcmVzZW50ZXIvUHJlc2VudGVyJztcblxuY29uc3QgcHJlc2VudGVyID0gbmV3IFByZXNlbnRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBwcmVzZW50ZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9
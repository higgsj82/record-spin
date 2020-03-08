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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

// let score;
var paddle;
var ammo;
var bubble;
var bubbles;
var playing;
var button;
var audio;

function setup() {
  createCanvas(windowWidth - 20, windowHeight * .85);
  button = createButton('Restart Game');
  button.position(23, height + 50);
  button.mousePressed(restartGame); // audio = randomSong();
  // audio = createAudio("assets/heyya.mp3");
  // audio.autoplay(true);

  gameState = 'playing';
  paddle = new Paddle();
  ammo = new Ammunition(paddle);
  bubbles = createBubbles();
  resetScore();
} // function mouseClicked () {
//     audio.play()
// }


function createBubbles() {
  var bubbles = [];
  var rows = 4;
  var bubbleRow = 12;
  var bubbleWidth = width / bubbleRow;
  var bubbleColors = [color(59, 87, 245), color(78, 56, 235), color(227, 54, 144), color(54, 227, 63), color(217, 106, 33), color(25, 194, 169), color(245, 66, 164), color(233, 242, 63), color(33, 173, 237), color(22, 145, 34), color(61, 21, 140)];

  for (var row = 0; row < rows; row++) {
    for (var i = 0; i < bubbleRow; i++) {
      bubble = new Bubble(createVector(bubbleWidth * i, 50 * row), bubbleWidth, 50, bubbleColors[Math.floor(random(0, bubbleColors.length - 1))]);
      bubbles.push(bubble);
    }
  }

  return bubbles;
}

function draw() {
  if (gameState === 'playing') {
    background(0);
    ammo.collisionEdge();
    ammo.collisionPaddle();
    ammo.update();

    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left');
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right');
    }

    for (var i = bubbles.length - 1; i >= 0; i--) {
      bubble = bubbles[i];

      if (bubble.hit(ammo)) {
        ammo.reverse('y');
        score += bubble.points;
        bubbles.splice(i, 1);
      } else {
        bubble.display();
      }
    }

    paddle.display();
    ammo.display();
    fill(255);
    textSize(32);
    text("Score: ".concat(score), width - 150, height - 30);

    if (ammo.belowPaddle()) {
      gameState = 'lose';
    }

    if (bubbles.length === 0) {
      gameState = 'win';
    }
  } else if (gameState === 'lose') {
    textFont("Impact", 118);
    fill(255, 0, 0);
    playing = false;
    text('Game Over!', width / 2 - 280, height / 2);
  } else {
    textFont("Impact", 118);
    fill(93, 215, 252);
    text('You Won!', width / 2 - 220, height / 2);
  }
}

function restartGame() {
  setup();
  createBubbles();
  draw();
}

function resetScore() {
  score = 0;
} // function randomSong() {
//     songs = [
//       createAudio("./assets/heyya.mp3"),
//       createAudio("./assets/it_takes_two.mp3"),
//       createAudio("./assets/mr.brightside.mp3"),
//       createAudio("./assets/prince.mp3"),
//       createAudio("./assets/push_it.mp3"),
//       createAudio("./assets/sixflags.m4a"),
//       createAudio("./assets/slickrick.mp3"),
//       createAudio("./assets/work_it.mp3")
//     ];
//     return songs[Math.floor(random(0, songs.length - 1))];
// }

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbInBhZGRsZSIsImFtbW8iLCJidWJibGUiLCJidWJibGVzIiwicGxheWluZyIsImJ1dHRvbiIsImF1ZGlvIiwic2V0dXAiLCJjcmVhdGVDYW52YXMiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsImNyZWF0ZUJ1dHRvbiIsInBvc2l0aW9uIiwiaGVpZ2h0IiwibW91c2VQcmVzc2VkIiwicmVzdGFydEdhbWUiLCJnYW1lU3RhdGUiLCJQYWRkbGUiLCJBbW11bml0aW9uIiwiY3JlYXRlQnViYmxlcyIsInJlc2V0U2NvcmUiLCJyb3dzIiwiYnViYmxlUm93IiwiYnViYmxlV2lkdGgiLCJ3aWR0aCIsImJ1YmJsZUNvbG9ycyIsImNvbG9yIiwicm93IiwiaSIsIkJ1YmJsZSIsImNyZWF0ZVZlY3RvciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInB1c2giLCJkcmF3IiwiYmFja2dyb3VuZCIsImNvbGxpc2lvbkVkZ2UiLCJjb2xsaXNpb25QYWRkbGUiLCJ1cGRhdGUiLCJrZXlJc0Rvd24iLCJMRUZUX0FSUk9XIiwibW92ZSIsIlJJR0hUX0FSUk9XIiwiaGl0IiwicmV2ZXJzZSIsInNjb3JlIiwicG9pbnRzIiwic3BsaWNlIiwiZGlzcGxheSIsImZpbGwiLCJ0ZXh0U2l6ZSIsInRleHQiLCJiZWxvd1BhZGRsZSIsInRleHRGb250Il0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RB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dWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8vIGxldCBzY29yZTtcbmxldCBwYWRkbGU7XG5sZXQgYW1tbztcbmxldCBidWJibGU7XG5sZXQgYnViYmxlcztcbmxldCBwbGF5aW5nO1xubGV0IGJ1dHRvbjtcbmxldCBhdWRpbztcblxuZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgY3JlYXRlQ2FudmFzKHdpbmRvd1dpZHRoIC0gMjAsIHdpbmRvd0hlaWdodCAqIC44NSk7XG4gICAgYnV0dG9uID0gY3JlYXRlQnV0dG9uKCdSZXN0YXJ0IEdhbWUnKTtcbiAgICBidXR0b24ucG9zaXRpb24oMjMsIGhlaWdodCArIDUwKTtcbiAgICBidXR0b24ubW91c2VQcmVzc2VkKHJlc3RhcnRHYW1lKTtcbiAgICAvLyBhdWRpbyA9IHJhbmRvbVNvbmcoKTtcbiAgICAvLyBhdWRpbyA9IGNyZWF0ZUF1ZGlvKFwiYXNzZXRzL2hleXlhLm1wM1wiKTtcbiAgICAvLyBhdWRpby5hdXRvcGxheSh0cnVlKTtcblxuICAgIGdhbWVTdGF0ZSA9ICdwbGF5aW5nJztcbiAgICBwYWRkbGUgPSBuZXcgUGFkZGxlKCk7XG4gICAgYW1tbyA9IG5ldyBBbW11bml0aW9uKHBhZGRsZSk7XG4gICAgYnViYmxlcyA9IGNyZWF0ZUJ1YmJsZXMoKTtcbiAgICByZXNldFNjb3JlKCk7XG59XG5cbi8vIGZ1bmN0aW9uIG1vdXNlQ2xpY2tlZCAoKSB7XG4vLyAgICAgYXVkaW8ucGxheSgpXG4vLyB9XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1YmJsZXMoKSB7XG4gICAgY29uc3QgYnViYmxlcyA9IFtdO1xuICAgIGNvbnN0IHJvd3MgPSA0O1xuICAgIGNvbnN0IGJ1YmJsZVJvdyA9IDEyO1xuICAgIGNvbnN0IGJ1YmJsZVdpZHRoID0gd2lkdGggLyBidWJibGVSb3c7XG4gICAgbGV0IGJ1YmJsZUNvbG9ycyA9IFtjb2xvcig1OSwgODcsIDI0NSksIGNvbG9yKDc4LCA1NiwgMjM1KSwgY29sb3IoMjI3LCA1NCwgMTQ0KSxcbiAgICBjb2xvcig1NCwgMjI3LCA2MyksIGNvbG9yKDIxNywgMTA2LCAzMyksIGNvbG9yKDI1LCAxOTQsIDE2OSksIGNvbG9yKDI0NSwgNjYsIDE2NCksXG4gICAgY29sb3IoMjMzLCAyNDIsIDYzKSwgY29sb3IoMzMsIDE3MywgMjM3KSwgY29sb3IoMjIsIDE0NSwgMzQpLCBjb2xvcig2MSwgMjEsIDE0MCldXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgcm93czsgcm93KyspIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWJibGVSb3c7IGkrKykge1xuICAgICAgICAgICAgYnViYmxlID0gbmV3IEJ1YmJsZShjcmVhdGVWZWN0b3IoXG4gICAgICAgICAgICAgICAgYnViYmxlV2lkdGggKiBpLCA1MCAqIHJvdyksXG4gICAgICAgICAgICAgICAgYnViYmxlV2lkdGgsXG4gICAgICAgICAgICAgICAgNTAsXG4gICAgICAgICAgICAgICAgYnViYmxlQ29sb3JzW01hdGguZmxvb3IocmFuZG9tKDAsIGJ1YmJsZUNvbG9ycy5sZW5ndGggLSAxKSldXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnViYmxlcy5wdXNoKGJ1YmJsZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJ1YmJsZXM7XG59XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgaWYgKGdhbWVTdGF0ZSA9PT0gJ3BsYXlpbmcnKSB7XG4gICAgICAgIGJhY2tncm91bmQoMCk7XG4gICAgICAgIFxuICAgICAgICBhbW1vLmNvbGxpc2lvbkVkZ2UoKTtcbiAgICAgICAgYW1tby5jb2xsaXNpb25QYWRkbGUoKTtcbiAgICAgICAgYW1tby51cGRhdGUoKTtcblxuICAgICAgICBpZiAoa2V5SXNEb3duKExFRlRfQVJST1cpKSB7XG4gICAgICAgICAgICBwYWRkbGUubW92ZSgnbGVmdCcpO1xuICAgICAgICB9IGVsc2UgaWYgKGtleUlzRG93bihSSUdIVF9BUlJPVykpIHtcbiAgICAgICAgICAgIHBhZGRsZS5tb3ZlKCdyaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gYnViYmxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgYnViYmxlID0gYnViYmxlc1tpXTtcbiAgICAgICAgICAgIGlmIChidWJibGUuaGl0KGFtbW8pKSB7XG4gICAgICAgICAgICAgICAgYW1tby5yZXZlcnNlKCd5Jyk7XG4gICAgICAgICAgICAgICAgc2NvcmUrPSBidWJibGUucG9pbnRzO1xuICAgICAgICAgICAgICAgIGJ1YmJsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWJibGUuZGlzcGxheSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHBhZGRsZS5kaXNwbGF5KCk7XG4gICAgICAgIGFtbW8uZGlzcGxheSgpO1xuXG4gICAgICAgIGZpbGwoMjU1KTtcbiAgICAgICAgdGV4dFNpemUoMzIpO1xuICAgICAgICB0ZXh0KGBTY29yZTogJHtzY29yZX1gLCB3aWR0aCAtIDE1MCwgaGVpZ2h0IC0gMzApO1xuXG4gICAgICAgIGlmIChhbW1vLmJlbG93UGFkZGxlKCkpIHtcbiAgICAgICAgICAgIGdhbWVTdGF0ZSA9ICdsb3NlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChidWJibGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZ2FtZVN0YXRlID0gJ3dpbic7XG4gICAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoZ2FtZVN0YXRlID09PSAnbG9zZScpe1xuICAgICAgICB0ZXh0Rm9udChcIkltcGFjdFwiLCAxMTgpXG4gICAgICAgIGZpbGwoMjU1LCAwLCAwKTtcbiAgICAgICAgcGxheWluZyA9IGZhbHNlO1xuICAgICAgICB0ZXh0KCdHYW1lIE92ZXIhJywgd2lkdGggLyAyIC0gMjgwLCBoZWlnaHQgLyAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0Rm9udChcIkltcGFjdFwiLCAxMTgpXG4gICAgICAgIGZpbGwoOTMsIDIxNSwgMjUyKTtcbiAgICAgICAgdGV4dCgnWW91IFdvbiEnLCB3aWR0aCAvIDIgLSAyMjAsIGhlaWdodCAvIDIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVzdGFydEdhbWUoKSB7XG4gICAgc2V0dXAoKTtcbiAgICBjcmVhdGVCdWJibGVzKCk7XG4gICAgZHJhdygpO1xufVxuXG5mdW5jdGlvbiByZXNldFNjb3JlKCkge1xuICAgIHNjb3JlID0gMDtcbn1cblxuLy8gZnVuY3Rpb24gcmFuZG9tU29uZygpIHtcbi8vICAgICBzb25ncyA9IFtcbi8vICAgICAgIGNyZWF0ZUF1ZGlvKFwiLi9hc3NldHMvaGV5eWEubXAzXCIpLFxuLy8gICAgICAgY3JlYXRlQXVkaW8oXCIuL2Fzc2V0cy9pdF90YWtlc190d28ubXAzXCIpLFxuLy8gICAgICAgY3JlYXRlQXVkaW8oXCIuL2Fzc2V0cy9tci5icmlnaHRzaWRlLm1wM1wiKSxcbi8vICAgICAgIGNyZWF0ZUF1ZGlvKFwiLi9hc3NldHMvcHJpbmNlLm1wM1wiKSxcbi8vICAgICAgIGNyZWF0ZUF1ZGlvKFwiLi9hc3NldHMvcHVzaF9pdC5tcDNcIiksXG4vLyAgICAgICBjcmVhdGVBdWRpbyhcIi4vYXNzZXRzL3NpeGZsYWdzLm00YVwiKSxcbi8vICAgICAgIGNyZWF0ZUF1ZGlvKFwiLi9hc3NldHMvc2xpY2tyaWNrLm1wM1wiKSxcbi8vICAgICAgIGNyZWF0ZUF1ZGlvKFwiLi9hc3NldHMvd29ya19pdC5tcDNcIilcbi8vICAgICBdO1xuLy8gICAgIHJldHVybiBzb25nc1tNYXRoLmZsb29yKHJhbmRvbSgwLCBzb25ncy5sZW5ndGggLSAxKSldO1xuLy8gfSJdLCJzb3VyY2VSb290IjoiIn0=
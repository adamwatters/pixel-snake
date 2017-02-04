(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = function Block() {
  _classCallCheck(this, Block);
};

exports.default = Block;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _Block = require('./Block');

var _Block2 = _interopRequireDefault(_Block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(_ref) {
    var keyboard = _ref.keyboard,
        renderer = _ref.renderer,
        width = _ref.width,
        height = _ref.height;

    _classCallCheck(this, Game);

    this.grid = new _Grid2.default(width, height);
    addBoundriesToGrid(this.grid);
    this.player = new _Player2.default(this.grid, keyboard);
    this.renderer = renderer;
    this.over = false;
  }

  _createClass(Game, [{
    key: 'start',
    value: function start() {
      var _this = this;

      var counter = 0;
      var speed = 10;
      var tick = function tick() {
        if (counter === speed) {
          _this.update();
          _this.render();
          counter = 0;
        } else {
          counter += 1;
        }
        if (!_this.over) {
          requestAnimationFrame(tick);
        } else {
          console.log('game over');
        }
      };
      tick();
    }
  }, {
    key: 'update',
    value: function update() {
      this.player.update();
      if (this.grid.hasCollisions()) {
        this.over = true;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.renderer.render(this.grid.forDisplay());
    }
  }]);

  return Game;
}();

function addBoundriesToGrid(grid) {
  grid.edges().forEach(function (position) {
    position.add(new _Block2.default());
  });
}

exports.default = Game;

},{"./Block":1,"./Grid":3,"./Player":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Position = require('./Position');

var _Position2 = _interopRequireDefault(_Position);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
  function Grid(width, height) {
    _classCallCheck(this, Grid);

    this.positions = buildPositions(width, height);
    this.width = width;
    this.height = height;
  }

  _createClass(Grid, [{
    key: 'position',
    value: function position(_ref) {
      var x = _ref.x,
          y = _ref.y;

      return this.positions[y * this.width + x];
    }
  }, {
    key: 'edges',
    value: function edges() {
      var _this = this;

      return this.positions.filter(function (position, index) {
        return index < _this.width || index >= _this.width * _this.height - _this.width || index % _this.width === 0 || (index + 1) % _this.width === 0;
      });
    }
  }, {
    key: 'hasCollisions',
    value: function hasCollisions() {
      return this.positions.filter(function (p) {
        return p.collision();
      }).length > 0;
    }
  }, {
    key: 'forDisplay',
    value: function forDisplay() {
      return this.positions.map(function (position) {
        return position.empty() ? 0 : 1;
      });
    }
  }]);

  return Grid;
}();

function buildPositions(width, height) {
  var positions = [];
  for (var i = 0; i < width * height; i += 1) {
    positions.push(new _Position2.default());
  }
  return positions;
}

exports.default = Grid;

},{"./Position":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function Keyboard() {
  var _this = this;

  _classCallCheck(this, Keyboard);

  window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
      case 37:
        _this.lastDirectionPressed = 'left';
        break;
      case 39:
        _this.lastDirectionPressed = 'right';
        break;
      case 38:
        _this.lastDirectionPressed = 'up';
        break;
      case 40:
        _this.lastDirectionPressed = 'down';
        break;
      default:
      // do nothing
    }
  });
};

exports.default = Keyboard;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pixel = function () {
  function Pixel(size) {
    _classCallCheck(this, Pixel);

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'pixel off');
    this.element.setAttribute('style', 'width: ' + size + '%; height: ' + size + '%');
    this.on = false;
  }

  _createClass(Pixel, [{
    key: 'toggle',
    value: function toggle() {
      this.on = !this.on;
      this.element.setAttribute('class', 'pixel ' + (this.on ? 'on' : 'off'));
    }
  }]);

  return Pixel;
}();

exports.default = Pixel;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(grid, keyboard) {
    _classCallCheck(this, Player);

    this.coordinates = { x: 2, y: 2 };
    this.head = {};
    this.grid = grid;
    this.grid.position(this.coordinates).add(this);
    this.keyboard = keyboard;
  }

  _createClass(Player, [{
    key: 'update',
    value: function update() {
      this.direction = decideDirection(this.direction, this.keyboard.lastDirectionPressed);
      this.grid.position(this.coordinates).remove(this);
      switch (this.direction) {
        case 'left':
          this.coordinates.x -= 1;
          break;
        case 'right':
          this.coordinates.x += 1;
          break;
        case 'up':
          this.coordinates.y -= 1;
          break;
        case 'down':
          this.coordinates.y += 1;
          break;
        default:
        // do nothing
      }
      this.grid.position(this.coordinates).add(this);
    }
  }]);

  return Player;
}();

function decideDirection(currentDirection, lastDirectionPressed) {
  switch (currentDirection) {
    case 'left':
      return lastDirectionPressed === 'right' ? currentDirection : lastDirectionPressed;
    case 'right':
      return lastDirectionPressed === 'left' ? currentDirection : lastDirectionPressed;
    case 'up':
      return lastDirectionPressed === 'down' ? currentDirection : lastDirectionPressed;
    case 'down':
      return lastDirectionPressed === 'up' ? currentDirection : lastDirectionPressed;
    default:
      return lastDirectionPressed;
  }
}

exports.default = Player;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Position = function () {
  function Position() {
    _classCallCheck(this, Position);

    this.bodies = [];
  }

  _createClass(Position, [{
    key: "add",
    value: function add(body) {
      this.bodies.push(body);
    }
  }, {
    key: "remove",
    value: function remove(body) {
      this.bodies = this.bodies.filter(function (b) {
        return b !== body;
      });
    }
  }, {
    key: "collision",
    value: function collision() {
      return this.bodies.length > 1;
    }
  }, {
    key: "empty",
    value: function empty() {
      return this.bodies.length === 0;
    }
  }]);

  return Position;
}();

exports.default = Position;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(pixels) {
    _classCallCheck(this, Renderer);

    this.pixels = pixels;
  }

  _createClass(Renderer, [{
    key: "initizialize",
    value: function initizialize(initialState) {
      var _this = this;

      initialState.forEach(function (element, index) {
        if (element === 1) {
          _this.pixels[index].toggle();
        }
      });
      this.previousState = initialState;
    }
  }, {
    key: "render",
    value: function render(nextState) {
      var _this2 = this;

      if (!this.previousState) {
        this.initizialize(nextState);
      } else {
        this.previousState.forEach(function (element, index) {
          if (element !== nextState[index]) {
            _this2.pixels[index].toggle();
          }
        });
        this.previousState = nextState;
      }
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pixel = require('./Pixel');

var _Pixel2 = _interopRequireDefault(_Pixel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Screen = function () {
  function Screen(rootElement, height, width) {
    _classCallCheck(this, Screen);

    var screenElement = document.createElement('div');
    screenElement.setAttribute('class', 'screen');
    this.pixels = [];
    var column = void 0;
    var pixel = void 0;
    for (var i = 0; i < height; i += 1) {
      column = [];
      for (var j = 0; j < width; j += 1) {
        pixel = new _Pixel2.default(100 / width);
        column.push(pixel);
        screenElement.appendChild(pixel.element);
      }
      this.pixels.push(column);
    }
    rootElement.appendChild(screenElement);
  }

  _createClass(Screen, [{
    key: 'flattenedSubScreen',
    value: function flattenedSubScreen(x, y, w, h) {
      var rows = this.pixels.slice(y, y + h);
      return rows.reduce(function (acc, row) {
        return acc.concat(row.slice(x, x + w));
      }, []);
    }
  }]);

  return Screen;
}();

exports.default = Screen;

},{"./Pixel":5}],10:[function(require,module,exports){
'use strict';

var _Screen = require('./Screen');

var _Screen2 = _interopRequireDefault(_Screen);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Keyboard = require('./Keyboard');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootElement = document.getElementById('root');
var screen = new _Screen2.default(rootElement, 40, 50);

var width = 24;
var height = 24;
var renderer = new _Renderer2.default(screen.flattenedSubScreen(3, 3, width, height));
var keyboard = new _Keyboard2.default();

var gameConfig = {
  keyboard: keyboard,
  renderer: renderer,
  width: width,
  height: height
};

var game = new _Game2.default(gameConfig);
game.render();
game.start();

},{"./Game":2,"./Keyboard":4,"./Renderer":8,"./Screen":9}]},{},[10]);

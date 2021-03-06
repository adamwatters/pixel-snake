(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = function Block() {
  _classCallCheck(this, Block);

  this.type = 'Block';
};

exports.default = Block;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Food = function Food() {
  _classCallCheck(this, Food);

  this.type = 'Food';
};

exports.default = Food;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Grid = require("./Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Player = require("./Player");

var _Player2 = _interopRequireDefault(_Player);

var _Block = require("./Block");

var _Block2 = _interopRequireDefault(_Block);

var _Food = require("./Food");

var _Food2 = _interopRequireDefault(_Food);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(_ref) {
    var keyboard = _ref.keyboard,
        renderer = _ref.renderer,
        width = _ref.width,
        height = _ref.height,
        onGameStart = _ref.onGameStart;

    _classCallCheck(this, Game);

    this.grid = new _Grid2.default(width, height);
    this.keyboard = keyboard;
    this.onGameStart = onGameStart;
    addBoundriesToGrid(this.grid);
    this.player = new _Player2.default(this.grid, this.keyboard);
    this.renderer = renderer;
    this.over = false;
  }

  _createClass(Game, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.render();
      var counter = 0;
      var speed = 5;
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
          _this.restart();
        }
      };
      tick();
    }
  }, {
    key: "restart",
    value: function restart() {
      this.grid.clear();
      this.keyboard.restart();
      addBoundriesToGrid(this.grid);
      this.player = new _Player2.default(this.grid, this.keyboard);
      this.over = false;
      this.start();
    }
  }, {
    key: "update",
    value: function update() {
      this.player.update();
      this.handleCollisions();
      if (Math.random() < 0.08 && this.keyboard.lastDirectionPressed) {
        this.addFood();
      }
    }
  }, {
    key: "handleCollisions",
    value: function handleCollisions() {
      var _this2 = this;

      this.grid.positionsWithCollisions().forEach(function (p) {
        _this2.handleBlockCollision(p);
        _this2.handleSelfCollision(p);
        _this2.handleFoodCollision(p);
      });
    }
  }, {
    key: "handleBlockCollision",
    value: function handleBlockCollision(postion) {
      if (postion.bodies[0].type === "PlayerSegment" && postion.bodies[1].type === "Block" || postion.bodies[0].type === "Block" && postion.bodies[1].type === "PlayerSegment") {
        this.over = true;
      }
    }
  }, {
    key: "handleSelfCollision",
    value: function handleSelfCollision(postion) {
      if (postion.bodies[0].type === "PlayerSegment" && postion.bodies[1].type === "PlayerSegment" || postion.bodies[0].type === "PlayerSegment" && postion.bodies[1].type === "PlayerSegment") {
        this.over = true;
      }
    }
  }, {
    key: "handleFoodCollision",
    value: function handleFoodCollision(position) {
      if (position.bodies[0].type === "PlayerSegment" && position.bodies[1].type === "Food") {
        position.remove(position.bodies[1]);
        this.player.addSegment();
      } else if (position.bodies[0].type === "Food" && position.bodies[1].type === "PlayerSegment") {
        position.remove(position.bodies[0]);
        this.player.addSegment();
      }
      return false;
    }
  }, {
    key: "addFood",
    value: function addFood() {
      var empties = this.grid.empties();
      var randomEmpty = empties[Math.floor(Math.random() * (empties.length - 1))];
      randomEmpty.add(new _Food2.default());
    }
  }, {
    key: "render",
    value: function render() {
      if (this.keyboard.lastDirectionPressed) {
        this.onGameStart();
      }
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

},{"./Block":1,"./Food":2,"./Grid":4,"./Player":7}],4:[function(require,module,exports){
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
    key: 'clear',
    value: function clear() {
      this.positions.forEach(function (p) {
        p.clear();
      });
    }
  }, {
    key: 'empties',
    value: function empties() {
      return this.positions.filter(function (p) {
        return p.isEmpty;
      });
    }
  }, {
    key: 'positionsWithCollisions',
    value: function positionsWithCollisions() {
      return this.positions.filter(function (p) {
        return p.containsCollision();
      });
    }
  }, {
    key: 'forDisplay',
    value: function forDisplay() {
      return this.positions.map(function (p) {
        return p.isEmpty() ? 0 : 1;
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

},{"./Position":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
  function Keyboard() {
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
  }

  _createClass(Keyboard, [{
    key: 'restart',
    value: function restart() {
      this.lastDirectionPressed = null;
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

},{}],6:[function(require,module,exports){
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
    this.element.setAttribute('style', 'width: ' + size + '%; height: 100%');
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

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlayerSegment = require('./PlayerSegment');

var _PlayerSegment2 = _interopRequireDefault(_PlayerSegment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(grid, keyboard) {
    _classCallCheck(this, Player);

    this.grid = grid;
    this.keyboard = keyboard;
    this.head = new _PlayerSegment2.default({ x: 10, y: 10 }, grid);
  }

  _createClass(Player, [{
    key: 'addSegment',
    value: function addSegment() {
      this.head.addSegment();
    }
  }, {
    key: 'update',
    value: function update() {
      var newCoordinates = {
        x: this.head.coordinates.x,
        y: this.head.coordinates.y
      };
      this.direction = decideDirection(this.direction, this.keyboard.lastDirectionPressed);
      switch (this.direction) {
        case 'left':
          newCoordinates.x -= 1;
          break;
        case 'right':
          newCoordinates.x += 1;
          break;
        case 'up':
          newCoordinates.y -= 1;
          break;
        case 'down':
          newCoordinates.y += 1;
          break;
        default:
        // do nothing
      }
      this.head.update(newCoordinates);
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

},{"./PlayerSegment":8}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerSegment = function () {
  function PlayerSegment(coordinates, grid) {
    _classCallCheck(this, PlayerSegment);

    this.coordinates = coordinates;
    this.nextSegment = null;
    this.grid = grid;
    this.type = 'PlayerSegment';
    grid.position(this.coordinates).add(this);
  }

  _createClass(PlayerSegment, [{
    key: 'addSegment',
    value: function addSegment() {
      if (this.nextSegment) {
        this.nextSegment.addSegment();
      } else {
        this.nextSegment = new PlayerSegment(this.coordinates, this.grid);
      }
    }
  }, {
    key: 'update',
    value: function update(coordinates) {
      this.grid.position(this.coordinates).remove(this);
      if (this.nextSegment) {
        this.nextSegment.update(this.coordinates, this.grid);
      }
      this.coordinates = coordinates;
      this.grid.position(coordinates).add(this);
    }
  }]);

  return PlayerSegment;
}();

exports.default = PlayerSegment;

},{}],9:[function(require,module,exports){
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
    this.nextSegment = null;
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
    key: "containsCollision",
    value: function containsCollision() {
      return this.bodies.length > 1;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.bodies.length === 0;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.bodies.splice(0, this.bodies.length);
    }
  }]);

  return Position;
}();

exports.default = Position;

},{}],10:[function(require,module,exports){
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
    this.previousState = null;
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

},{}],11:[function(require,module,exports){
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
  function Screen(rootElement, width, height) {
    _classCallCheck(this, Screen);

    this.pixels = [];
    var screenElement = document.createElement('div');
    screenElement.setAttribute('class', 'screen');
    var row = void 0;
    var rowElement = void 0;
    var pixel = void 0;
    for (var i = 0; i < height; i += 1) {
      row = [];
      rowElement = document.createElement('div');
      rowElement.setAttribute('class', 'row');
      rowElement.setAttribute('style', 'width: 100%; height: ' + 100 / width + '%');
      for (var j = 0; j < width; j += 1) {
        pixel = new _Pixel2.default(100 / width);
        row.push(pixel);
        rowElement.appendChild(pixel.element);
      }
      this.pixels.push(row);
      screenElement.appendChild(rowElement);
    }
    rootElement.appendChild(screenElement);
  }

  _createClass(Screen, [{
    key: 'subScreen',
    value: function subScreen(x, y, w, h) {
      var rows = this.pixels.slice(y, y + h);
      return rows.reduce(function (acc, row) {
        return acc.concat(row.slice(x, x + w));
      }, []);
    }
  }]);

  return Screen;
}();

exports.default = Screen;

},{"./Pixel":6}],12:[function(require,module,exports){
"use strict";

var _Screen = require("./Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _Renderer = require("./Renderer");

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Keyboard = require("./Keyboard");

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _Game = require("./Game");

var _Game2 = _interopRequireDefault(_Game);

var _snakeText = require("./snakeText");

var _snakeText2 = _interopRequireDefault(_snakeText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootElement = document.getElementById("root");
var screen = new _Screen2.default(rootElement, 40, 35);

var width = 24;
var height = 24;
var renderer = new _Renderer2.default(screen.subScreen(8, 2, width, height));
var keyboard = new _Keyboard2.default();

var textRenderer = new _Renderer2.default(screen.subScreen(8, 28, 24, 6));
// create a new div element
var instructions = document.createElement("div");
// and give it some content
var instructionsContent = document.createTextNode("press an arrow key to start the game");
// add the text node to the newly created div
instructions.appendChild(instructionsContent);
instructions.style.cssText = "position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); background-color: greenyellow";

rootElement.appendChild(instructions);

var onGameStart = function onGameStart() {
  instructions.style.display = "none";
};

textRenderer.render(_snakeText2.default);

var gameConfig = {
  keyboard: keyboard,
  renderer: renderer,
  width: width,
  height: height,
  onGameStart: onGameStart
};

var game = new _Game2.default(gameConfig);
game.start();

},{"./Game":3,"./Keyboard":5,"./Renderer":10,"./Screen":11,"./snakeText":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var combineHorizontal = function combineHorizontal(a, b, height) {
  var newMatrix = [];
  var aWidth = a.length / height;
  var bWidth = b.length / height;
  for (var i = 0; i < height; i += 1) {
    newMatrix = newMatrix.concat(a.slice(i * aWidth, i * aWidth + aWidth));
    newMatrix = newMatrix.concat(b.slice(i * bWidth, i * bWidth + bWidth));
  }
  return newMatrix;
};

var combineVertical = function combineVertical(a, b) {
  return a.concat(b);
};

var matrixUtilities = {
  combineHorizontal: combineHorizontal,
  combineVertical: combineVertical
};

exports.default = matrixUtilities;

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _matrixUtilities = require("./matrixUtilities");

var _matrixUtilities2 = _interopRequireDefault(_matrixUtilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var font = {
  _: [0, 0, 0, 0, 0],

  s: [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],

  n: [1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],

  a: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1],

  k: [1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],

  e: [1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1]
};

var _ = font._,
    s = font.s,
    n = font.n,
    a = font.a,
    k = font.k,
    e = font.e;

var chars = [_, n, _, a, _, k, _, e];
var snakeText = chars.reduce(function (acc, char) {
  return _matrixUtilities2.default.combineHorizontal(acc, char, 5);
}, s);

console.log(snakeText);

exports.default = snakeText;

},{"./matrixUtilities":13}]},{},[12]);

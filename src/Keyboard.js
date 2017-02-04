class Keyboard {
  constructor() {
    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 37:
          this.lastDirectionPressed = 'left';
          break;
        case 39:
          this.lastDirectionPressed = 'right';
          break;
        case 38:
          this.lastDirectionPressed = 'up';
          break;
        case 40:
          this.lastDirectionPressed = 'down';
          break;
        default:
          // do nothing
      }
    });
  }
}

export default Keyboard;

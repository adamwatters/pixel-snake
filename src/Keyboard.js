import Hammer from "hammerjs";

class Keyboard {
  constructor() {
    const rootElement = document.getElementById("root");
    window.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case 37:
          e.preventDefault();
          this.lastDirectionPressed = "left";
          break;
        case 39:
          e.preventDefault();
          this.lastDirectionPressed = "right";
          break;
        case 38:
          e.preventDefault();
          this.lastDirectionPressed = "up";
          break;
        case 40:
          e.preventDefault();
          this.lastDirectionPressed = "down";
          break;
        default:
        // do nothing
      }
    });
    const manager = new Hammer.Manager(rootElement);
    const Swipe = new Hammer.Swipe();
    manager.add(Swipe);
    manager.on("swipeleft", () => {
      this.lastDirectionPressed = "left";
    });
    manager.on("swiperight", () => {
      this.lastDirectionPressed = "right";
    });
    manager.on("swipeup", () => {
      this.lastDirectionPressed = "up";
    });
    manager.on("swipedown", () => {
      this.lastDirectionPressed = "down";
    });
  }
  restart() {
    this.lastDirectionPressed = null;
  }
}

export default Keyboard;

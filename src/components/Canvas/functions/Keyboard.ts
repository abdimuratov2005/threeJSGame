interface KeyCode {
  /**
   * @param key_87 forward
  */
  87: boolean;
  /**
   * @param key_65 left
  */
  65: boolean;
  /**
   * @param key_83 backward
  */
  83: boolean;
  /**
   * @param key_68 right
  */ 
  68: boolean;
}

export class Keyboard {
  public move: KeyCode;
  constructor() {
    this.move = {
      87: false,
      65: false,
      83: false,
      68: false,
    };
    this._addListeners();
  }

  private _addListeners() {
    window.addEventListener("keydown", this._onKeyDown.bind(this));
    window.addEventListener("keyup", this._onKeyUp.bind(this));
    // window.addEventListener("keypress", this._onKeyPress.bind(this));
  }

  private _removeListeners() {
    window.removeEventListener("keydown", this._onKeyDown.bind(this));
    window.removeEventListener("keyup", this._onKeyUp.bind(this));
    // window.removeEventListener("keypress", this._onKeyPress.bind(this));
  }

  private _onKeyDown = (input: KeyboardEvent) => {
    if (Object.keys(this.move).includes(input.keyCode.toString())) {
      this.move[input.keyCode] = true;
    } else {
      console.error(`Not registered key: ${input.keyCode}`);
    }
  };
  private _onKeyUp = (input: KeyboardEvent) => {
    if (Object.keys(this.move).includes(input.keyCode.toString())) {
      this.move[input.keyCode] = false;
    } else {
      console.error(`Not registered key: ${input.keyCode}`);
    }
  };

  public destroy() {
    this._removeListeners();
  }
}
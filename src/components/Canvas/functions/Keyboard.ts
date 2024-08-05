type KeyOption = {
  enabled: boolean;
  disableOnKeyUp: boolean;
}
type KeyCode = Record<number, KeyOption>

export class Keyboard {
  static _canCreate: boolean;
  static _instance: Keyboard;

  public keys: KeyCode;
  constructor() {
    this.keys = {
      87: { enabled: false, disableOnKeyUp: true },
      65: { enabled: false, disableOnKeyUp: true },
      83: { enabled: false, disableOnKeyUp: true },
      68: { enabled: false, disableOnKeyUp: true },

      27: { enabled: false, disableOnKeyUp: false },
    };
    
    this._addListeners();
  }

  public static getInstance() {
    return Keyboard._instance || (Keyboard._canCreate = true,
      Keyboard._instance = new Keyboard(),
      Keyboard._canCreate = false),
      Keyboard._instance
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
    if (Object.keys(this.keys).includes(input.keyCode.toString())) {
      const key = this.keys[input.keyCode];
      key.enabled = key.disableOnKeyUp ? true : !key.enabled
      
    } else {
      console.error(`Not registered key: ${input.keyCode}`);
    }
  };
  private _onKeyUp = (input: KeyboardEvent) => {
    if (Object.keys(this.keys).includes(input.keyCode.toString())) {
      const key = this.keys[input.keyCode];
      if (key.disableOnKeyUp) {
        key.enabled = false;
      }
    } else {
      console.error(`Not registered key: ${input.keyCode}`);
    }
  };

  public destroy() {
    this._removeListeners();
  }
}
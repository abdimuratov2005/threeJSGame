import { app } from "canvas/options/app";
import gsap from "gsap";
import { Keyboard } from "./Keyboard";

class UIInit {
    public pauseEl: HTMLElement;

    constructor() {
        this.pauseEl = null;
        this._getElements();
    }

    private _getElements() {
        this.pauseEl = document.querySelector("[data-ui='pause']");
    }

    public destroy() {
        this.pauseEl.remove();
    }
}

class UIMethods extends UIInit {
    private _keyboard: Keyboard;

    constructor() {
        super();
        this._keyboard = Keyboard.getInstance();

    }

    private _pauseToggle() {
        if (this._keyboard.keys[27].enabled) {
            if (app.game.paused === 1) {
                app.game.paused = 0;
            } else {
                app.game.paused = 1
            }
        }
        gsap.to(this.pauseEl, {
            scale: app.game.paused,
            opacity: app.game.paused,
            pointerEvents: app.game.paused === 1 ? "auto" : "none",
            onComplete: () => {
                
            }
        })
    }

    public update() {
        this._pauseToggle();
    }

    public destroy() {
        this._keyboard.destroy();
    }
}

export class UI extends UIMethods {
    constructor() {
        super();
    }

    public update() {
        super.update();
    }

    public destroy() {
        super.destroy();
    }
}
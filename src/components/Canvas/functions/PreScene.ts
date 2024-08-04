import { Color, Scene } from "three";

export class PreScene extends Scene {
    private _pixelRatio: number;

    constructor() {
        super();
        this._pixelRatio = 1;
        this.background = new Color("black")
    }

    public setPixelRatio(pixel: number) {
        this._pixelRatio = pixel;
    }
}
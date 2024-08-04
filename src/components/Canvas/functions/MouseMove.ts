import { OrthographicCamera, Raycaster, Vector2, Vector3 } from "three";

export class MouseMove {
    static _canCreate: boolean;
    static _instance: MouseMove;

    private _camera: OrthographicCamera;
    private _raycaster: Raycaster;
    private _mouse: Vector3;

    constructor() {
        this._raycaster = new Raycaster();
        this._mouse = new Vector3();

        this._addListeners();
    }

    public static getInstance() {
        return MouseMove._instance || (MouseMove._canCreate = true,
        MouseMove._instance = new MouseMove(),
        MouseMove._canCreate = false),
        MouseMove._instance
    }

    public setCamera(camera: OrthographicCamera) {
        this._camera = camera;
    }

    private _mouseMove(event: MouseEvent) {
        this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    private _addListeners() {
        window.addEventListener("mousemove", this._mouseMove.bind(this), false);
    }

    private _removeListeners() {
        window.removeEventListener("mousemove", this._mouseMove.bind(this), false);
    }

    public getPosition() {
        return this._mouse
    }

    public update() {
        this._raycaster.setFromCamera(new Vector2(this._mouse.x, this._mouse.y), this._camera);
    }

    public destroy() {
        this._removeListeners();
    }
}
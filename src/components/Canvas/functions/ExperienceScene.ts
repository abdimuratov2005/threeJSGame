import { appOptions } from "canvas/options/app";
import { Human } from "./Human";
import { PreScene } from "./PreScene";
import { Controller } from "./Controller";
import { OrthographicCamera } from "three";
import { MouseMove } from "./MouseMove";

interface SceneConstructor {
    camera: OrthographicCamera
}

interface SceneUpdateType {
    delta: number;
    slowDownFactor: number;
    time: number;
}

export class ExperienceScene extends PreScene {
    public camera: SceneConstructor["camera"];

    private _controller: Controller;
    private _mouse: MouseMove;
    private _player: Human;
    private _enemies: Human[];

    constructor({camera}: SceneConstructor) {
        super();
        this.camera = camera;
        this._enemies = [];
        this._mouse = MouseMove.getInstance();
        this._mouse.setCamera(this.camera);
        this._controller = new Controller();

        this._spawnPlayer();
        this._spawnEnemies();
    }

    private _spawnPlayer() {
        this._player = new Human({
            movement: {},
            size: [1, 2]
        })
        this.add(this._player);
    }

    private _spawnEnemies() {
        for (let index = 0; index < appOptions.objects.enemies; index++) {
            const enemy = new Human({
                movement: {},
                size: [1, 2]
            })
            enemy.position.x += index
            this._enemies.push(enemy);
        }
        this.add(...this._enemies);
    }

    public setPixelRatio(pixel: number) {
        super.setPixelRatio(pixel);
    }

    public update(frame: SceneUpdateType) {
        this._mouse.update();
        this._player.setController(this._controller.playerControl(this._player.position, 0.05));
        this._enemies.forEach(enemy => {
            enemy.setController(this._controller.enemyControl(this._player.position, enemy.position, 0.01))
        })
    }
    public destroy() {
        this._controller.destroy();
    }
}
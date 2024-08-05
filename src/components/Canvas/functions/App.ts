import { WebGLRenderer, OrthographicCamera, CameraHelper } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { resizeDebounced } from "canvas/shared/utils/resizeDebounced";
import { appOptions } from "canvas/options/app";
import { ExperienceScene } from "./ExperienceScene";

interface AppConstructor {
  rendererEl: HTMLElement;
}

export class App {
  public rendererEl: AppConstructor["rendererEl"];

  private _rafId: number;
  private _isResumed: boolean;
  private _lastFrameTime: number;
  private _pixelRatio: number;
  private _renderer: WebGLRenderer;
  private _experienceScene: ExperienceScene;
  private _canvas: HTMLCanvasElement;
  private _camera: OrthographicCamera;

  private _orbitControl: OrbitControls;

  private _frustumSize: number;

  constructor(cons: AppConstructor) {
    this._rafId = null!;
    this._isResumed = true;
    this._lastFrameTime = null!;
    this._pixelRatio = 1;
    this._frustumSize = 15;

    this.rendererEl = cons.rendererEl;
    this._canvas = document.createElement("canvas");
    this.rendererEl.appendChild(this._canvas);

    const rectRenderer = this.rendererEl.getBoundingClientRect();
    const aspectRenderer = rectRenderer.width / rectRenderer.height;

    this._camera = new OrthographicCamera(
      (0.5 * this._frustumSize * aspectRenderer) / -2,
      (0.5 * this._frustumSize * aspectRenderer) / 2,
      this._frustumSize / 2,
      this._frustumSize / -2,
      0.01,
      1000
    );
    this._camera.position.z = 10;
    const helperCamera = new CameraHelper(this._camera);
    this._orbitControl = new OrbitControls(this._camera, this.rendererEl)

    this._experienceScene = new ExperienceScene({
      camera: this._camera,
    });

    this._experienceScene.add(helperCamera);

    this._renderer = new WebGLRenderer({
      canvas: this._canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    this._onResize();

    this._addListeners();

    this._resumeApp();
  }

  private _renderOnFrame = (frame: number) => {
    this._isResumed = true;
    this._rafId = window.requestAnimationFrame(this._renderOnFrame);
    if (!this._isResumed || !this._lastFrameTime) {
      this._lastFrameTime = window.performance.now();
      this._isResumed = false;
      return;
    }
    const deltaTime = frame - this._lastFrameTime;
    const slowDownFactor = deltaTime / appOptions.frame.DT_FPS;
    this._lastFrameTime = frame;

    this._experienceScene.update({
      delta: deltaTime,
      slowDownFactor: slowDownFactor,
      time: frame,
    });
    
    this._orbitControl.update();

    this._renderer.render(this._experienceScene, this._camera);
  };

  private _onVisibilityChange = () => {
    document.hidden ? this._stopApp() : this._resumeApp();
  };

  private _onResize() {
    const rect = this.rendererEl.getBoundingClientRect();
    const aspectRenderer = rect.width / rect.height;
    this._camera.left = (-0.5 * this._frustumSize * aspectRenderer) / 2;
    this._camera.right = (0.5 * this._frustumSize * aspectRenderer) / 2;
    this._camera.top = this._frustumSize / 2;
    this._camera.bottom = -this._frustumSize / 2;

    this._renderer.setSize(rect.width, rect.height);
    this._pixelRatio = Math.min(window.devicePixelRatio, 2);
    this._renderer.setPixelRatio(this._pixelRatio);

    this._camera.updateProjectionMatrix();
    this._experienceScene.setPixelRatio(this._pixelRatio);
  }

  private _addListeners() {
    window.addEventListener(
      "resize",
      resizeDebounced(this._onResize.bind(this))
    );
    window.addEventListener(
      "visibilitychange",
      this._onVisibilityChange.bind(this)
    );
  }

  private _removeListeners() {
    window.removeEventListener(
      "resize",
      resizeDebounced(this._onResize.bind(this))
    );
    window.removeEventListener(
      "visibilitychange",
      this._onVisibilityChange.bind(this)
    );
  }

  private _resumeApp() {
    this._isResumed = true;

    if (!this._rafId) {
      this._rafId = window.requestAnimationFrame(
        this._renderOnFrame.bind(this)
      );
    }
  }

  private _stopApp() {
    if (this._rafId) {
      window.cancelAnimationFrame(this._rafId);
      this._rafId = null!;
    }
  }

  public destroy() {
    this._canvas.parentNode.removeChild(this._canvas);
    this._stopApp();
    this._removeListeners();
    this._renderer.dispose();
    this._experienceScene.destroy();
  }
}

import { Vector2, Vector3 } from "three";
import { Keyboard } from "./Keyboard";

export class Controller {
  private _keyboard: Keyboard;
  
  constructor() {
    this._keyboard = Keyboard.getInstance();
  }

  public playerControl(position: Vector3, speed: number) {
    const diagonalSpeed = speed / Math.sqrt(2);

    if (this._keyboard.keys[87].enabled && this._keyboard.keys[65].enabled) {
      position.x -= diagonalSpeed;
      position.y += diagonalSpeed;
    } else if (this._keyboard.keys[87].enabled && this._keyboard.keys[68].enabled) {
      position.x += diagonalSpeed;
      position.y += diagonalSpeed;
    } else if (this._keyboard.keys[83].enabled && this._keyboard.keys[65].enabled) {
      position.x -= diagonalSpeed;
      position.y -= diagonalSpeed;
    } else if (this._keyboard.keys[83].enabled && this._keyboard.keys[68].enabled) {
      position.x += diagonalSpeed;
      position.y -= diagonalSpeed;
    } else {
      if (this._keyboard.keys[87].enabled) position.y += speed;
      if (this._keyboard.keys[83].enabled) position.y -= speed;
      if (this._keyboard.keys[65].enabled) position.x -= speed;
      if (this._keyboard.keys[68].enabled) position.x += speed;
    }

    return position;
  }

  public enemyControl(targetPosition: Vector3, position: Vector3, speed: number) {
    const direction = new Vector3();
    direction.subVectors(targetPosition, position).normalize();
    position.add(direction.multiplyScalar(speed));

    return position;
  }

  public destroy() {
    this._keyboard.destroy();
  }
}

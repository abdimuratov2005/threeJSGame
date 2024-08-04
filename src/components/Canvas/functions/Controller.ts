import { Vector2, Vector3 } from "three";
import { Keyboard } from "./Keyboard";

export class Controller {
  private _keyboard: Keyboard;
  
  constructor() {
    this._keyboard = new Keyboard();
  }

  public playerControl(position: Vector3, speed: number) {
    const diagonalSpeed = speed / Math.sqrt(2);

    if (this._keyboard.move[87] && this._keyboard.move[65]) {
      position.x -= diagonalSpeed;
      position.y += diagonalSpeed;
    } else if (this._keyboard.move[87] && this._keyboard.move[68]) {
      position.x += diagonalSpeed;
      position.y += diagonalSpeed;
    } else if (this._keyboard.move[83] && this._keyboard.move[65]) {
      position.x -= diagonalSpeed;
      position.y -= diagonalSpeed;
    } else if (this._keyboard.move[83] && this._keyboard.move[68]) {
      position.x += diagonalSpeed;
      position.y -= diagonalSpeed;
    } else {
      if (this._keyboard.move[87]) position.y += speed;
      if (this._keyboard.move[83]) position.y -= speed;
      if (this._keyboard.move[65]) position.x -= speed;
      if (this._keyboard.move[68]) position.x += speed;
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

import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D, Vector3 } from "three";

interface HumanConstructor {
    size: [number, number];
    movement: {}
}

export class Human extends Mesh {
    public size: HumanConstructor["size"];
    public movement: HumanConstructor["movement"];
    private _mesh: Mesh;

    constructor(options: HumanConstructor) {
        super();
        this._setDefaultOptions(options, {
            onComplete: () => this._createModel()
        });
    }

    private _setDefaultOptions({ size, movement } : HumanConstructor, { onComplete }: { onComplete: () => void}) {
        this.size = size;
        this.movement = movement;
        onComplete();
    }

    private _createModel() {
        const geometry = new BoxGeometry(...this.size);
        const material = new MeshBasicMaterial({ color: "red" });
        this._mesh = new Mesh(geometry, material);
        this.add(this._mesh)
    }
    
    public setController(vector: Vector3) {
        if (this._mesh != null) {
            this._mesh.position.set(
                vector.x,
                vector.y,
                vector.z
            )
        }
    }
}
import Entity, { EntityLogicInput, EntityLogicOutput } from "../Engine/Entity";
/**
 * It's a full blown tank!
 */
export default class Tank extends Entity {
    static type: string;
    protected meshes: BABYLON.Mesh[];
    protected chassis: BABYLON.Mesh;
    protected turret: BABYLON.Mesh;
    initialize(): void;
    loadTank(path: string): Promise<void>;
    logic(input: EntityLogicInput): EntityLogicOutput;
    aimTurret(point: BABYLON.Vector3): void;
    removal(): void;
}

import Entity, { EntityOptions, EntityLogicInput, EntityLogicOutput, EntityState } from '../Engine/Entity';
import KeyboardWatcher from '../Engine/KeyboardWatcher';
/** Options for creating a tank. */
export interface TankOptions extends EntityOptions {
    entityState: TankState;
}
/**
 * It's a full blown tank!
 */
export default class Tank extends Entity {
    static type: string;
    /** Default tank art asset. */
    protected artPath: string;
    /** Array of all meshes related to this tank. */
    protected meshes: BABYLON.Mesh[];
    /** Parent tank body. Other tank components are children of this core unit. */
    protected chassis: BABYLON.Mesh;
    /** Top-mounted gun on a swivel. */
    protected turret: BABYLON.Mesh;
    /** Monitor keyboard activity for tank controls. */
    protected keyboardWatcher: KeyboardWatcher;
    /** Whether or not this tank will respond to keyboard input and the like. */
    protected playerControlled: boolean;
    /** Position the tank will start at. */
    protected startingPosition: BABYLON.Vector3;
    /** Camera for this tank. */
    protected camera: BABYLON.TargetCamera;
    /**
     * Construct a tank.
     */
    constructor(options: TankOptions);
    /**
     * Cleanup this tank entity.
     */
    removal(): void;
    /**
     * Load tank art into the scene.
     */
    loadTank(path: string): Promise<void>;
    /**
     * Run the tank's game logic.
     */
    logic(input: EntityLogicInput): EntityLogicOutput;
    /** Remember our last movement direction so we face the same way when we stop. Intialized facing south. */
    protected lastDesiredMovementVector: BABYLON.Vector3;
    /**
     * Get the direction in which the player wishes to move.
     */
    protected ascertainDesiredMovementVector(): (BABYLON.Vector3);
    protected speed: number;
    protected speedVector: BABYLON.Vector3;
    /**
     * Accelerate the tank when movement keys are pressed.
     */
    protected accelerateWhenMoving(desiredMovement: BABYLON.Vector3): void;
    /**
     * Orient the chassis in a given direction.
     */
    protected turnChassis(direction: BABYLON.Vector3): void;
    /**
     * Aim the turret toward any point in the 3D world.
     */
    protected aimTurret(pick: BABYLON.Vector3): void;
}
/**
 * State data for a Tank!
 */
export interface TankState extends EntityState {
    playerControlled?: boolean;
    artPath?: string;
    position?: number[];
}

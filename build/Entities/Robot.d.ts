import Entity, { EntityLogicInput, EntityLogicOutput } from "../Engine/Entity";
/**
 * A simple cube object in the game world.
 */
export default class Robot extends Entity {
    static type: string;
    private mesh;
    private listeners;
    private movement;
    protected initialize(): void;
    /**
     * Action taken after the robot mesh has loaded.
     */
    protected loaded(): void;
    /**
     * Game logic run every tick.
     */
    logic({entityState, tickInfo}: EntityLogicInput): EntityLogicOutput;
    removal(): void;
}

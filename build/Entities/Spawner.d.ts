import Entity, { EntityState } from "../Engine/Entity";
/**
 * Just spawns cubes when spacebar is pressed.
 */
export default class Spawner extends Entity {
    static type: string;
    private keyupAction;
    protected initialize(entityState: EntityState): void;
    /**
     * Cleanup for removal from the game.
     */
    destructor(): void;
}

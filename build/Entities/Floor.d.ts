import Entity, { EntityState } from "../Framework/Entity";
/**
 * A floor object for the game world.
 */
export default class Floor extends Entity {
    static type: string;
    private mesh;
    protected initialize(entityState: EntityState): void;
    /**
     * Cleanup for removal from the game.
     */
    destructor(): void;
}

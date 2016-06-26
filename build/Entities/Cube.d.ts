import Entity, { EntityState } from "../Framework/Entity";
/**
 * A simple cube object in the game world.
 */
export default class Cube extends Entity {
    static type: string;
    private mesh;
    protected initialize(entityState: EntityState): void;
    /**
     * Cleanup for removal from the game.
     */
    destructor(): void;
}

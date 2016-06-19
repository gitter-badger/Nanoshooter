import Entity, { EntityState } from "../Engine/Entity";
/**
 * A floor object for the game world.
 */
export default class Floor extends Entity {
    static type: string;
    private mesh;
    protected initialize(entityState: EntityState): void;
    removal(): void;
}

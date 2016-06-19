import Entity, { EntityState } from "../Engine/Entity";
/**
 * Spawns stuff.
 */
export default class Spawner extends Entity {
    static type: string;
    private keyupAction;
    protected initialize(entityState: EntityState): void;
    removal(): void;
}

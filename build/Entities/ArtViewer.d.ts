import Entity, { EntityState } from '../Engine/Entity';
/**
 * Preview by providing the art path as a query string.
 * Loads an ".obj" file into the scene upon initialization.
 */
export default class ArtViewer extends Entity {
    static type: string;
    protected meshes: BABYLON.Mesh[];
    protected initialize(entityState: EntityState): void;
    protected loadProp(path: string): Promise<void>;
    /**
     * Cleanup for removal from the game.
     */
    destructor(): void;
}

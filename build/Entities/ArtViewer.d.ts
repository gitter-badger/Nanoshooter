import Entity from '../Engine/Entity';
/**
 * Preview by providing the art path as a query string.
 * Loads an ".obj" file into the scene upon initialization.
 */
export default class ArtViewer extends Entity {
    static type: string;
    protected meshes: BABYLON.Mesh[];
    initialize(): void;
    loadProp(path: string): Promise<void>;
    removal(): void;
}
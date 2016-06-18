/**
 * Loads art assets.
 */
export default class Loader {
    protected scene: BABYLON.Scene;
    constructor(options: ObjectLoaderOptions);
    /**
     * Load a ".obj" file, relative to this loader's root url.
     * Returns a promise of a loaded object report, which contains the meshes.
     */
    loadObject({path}: LoadObjectOptions): Promise<LoadedObjectReport>;
}
/**
 * Options for loading an object.
 */
export interface LoadObjectOptions {
    /** URL to the ".obj" file, relative from the loader's root url. */
    path: string;
}
/**
 * Report returned when an object finishes loading.
 */
export interface LoadedObjectReport {
    meshes: BABYLON.Mesh[];
}
/**
 * Inputs for creating a loader.
 */
export interface ObjectLoaderOptions {
    /** Current babylon scene to load things into. */
    scene: BABYLON.Scene;
}

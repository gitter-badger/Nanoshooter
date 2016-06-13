/**
 * Govern a 3D Babylon scene from a high level.
 */
export default class Stage {
    hostElement: HTMLElement;
    canvas: HTMLCanvasElement;
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;
    /** Information about where the user's mouse cursor is hovering in the 3D scene. Updated on mousemove by the stage. */
    pick: BABYLON.PickingInfo;
    /**
     * Accept stage options and initialize the stage's babylon components.
     */
    constructor(options: StageOptions);
    /** Nifty diagnostics. */
    private stats;
    /** Event listeners that start and stop with the stage. */
    private listeners;
    /**
     * Establish an empty Babylon scene.
     */
    initialize(): void;
    /**
     * Start the rendering loop.
     */
    start(): void;
    private lastRenderTime;
    /**
     * Stop the rendering loop.
     */
    stop(): void;
    /**
     * Render a frame.
     */
    private render({since});
}
export interface StageOptions {
    /** HTML element to inject the canvas within. */
    hostElement: HTMLElement;
}
export interface RenderInfo {
    /** Time since the last frame finished rendering. */
    since: number;
}

/**
 * Govern a 3D Babylon scene from a high level.
 * The stage is an access point to some key Babylon API components.
 */
export default class Stage {
    /** HTML element which contains the game's rendering canvas. */
    hostElement: HTMLElement;
    /** Canvas HTML element which the game renders to. */
    canvas: HTMLCanvasElement;
    /** Babylon engine instance. */
    engine: BABYLON.Engine;
    /** Babylon scene instance. */
    scene: BABYLON.Scene;
    /** Information about where the user's mouse cursor is hovering in the 3D scene. Updated on mousemove by the stage. */
    pick: BABYLON.PickingInfo;
    /** Nifty diagnostics. */
    private stats;
    /** Event listeners that start and stop with the stage. */
    private listeners;
    /**
     * Accept stage options and initialize the stage's babylon components.
     */
    constructor(options: StageOptions);
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

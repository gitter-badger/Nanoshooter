/**
 * Generic ticking loop, with start/stop controls.
 * Keeps a consistent timeline.
 */
export default class Ticker {
    /**
     * Instantiate a ticker with an action function which will be called repeatedly.
     */
    constructor({tick, relax}: TickerOptions);
    /** Total ticker time, which actually pauses when the ticker is paused. */
    private timeline;
    /** Action to be called for every tick while the ticker is running. */
    private tick;
    /** Time to relax in between ticks. */
    private relax;
    /** Nifty statistics. */
    private stats;
    private stopTickingCallback;
    private lastTickTime;
    /**
     * Start the recursive ticking loop.
     */
    start(): void;
    /**
     * Halt the ticker.
     */
    stop(): Promise<void>;
}
/**
 * Options for instantiating a new ticker.
 */
export interface TickerOptions {
    tick: TickAction;
    relax?: number;
}
/**
 * Action to take when a tick occurs.
 * A function that is called repeatedly, for each tick.
 */
export declare type TickAction = (tickInfo: TickReport) => void;
/**
 * Package of information that is passed along with each tick action.
 */
export interface TickReport {
    /** Total place along ticker's timeline, which effectively freezes on stop() and resumes on start(). */
    timeline: number;
    /** Duration of time that has passed since the end of the last tick to the beginning of this tick, in milliseconds. */
    timeSinceLastTick: number;
}

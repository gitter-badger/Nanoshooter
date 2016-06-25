import Game from './Game';
import Stage from './Stage';
import Loader from './Loader';
import { TickReport } from './Ticker';
export { TickReport };
/**
 * Options for creating an Entity instance.
 */
export interface EntityOptions {
    id: string;
    entityState: EntityState;
    game: Game;
    stage: Stage;
    loader: Loader;
    label?: string;
}
/**
 * Entity in the game world which responds to fresh entity state on logic ticks.
 * An entity doesn't actually need to persist any state, fresh state can just pass through the logic method.
 */
export default class Entity {
    /** Module ID for this entity class. Used to load entity classes on-the-fly. */
    static type: string;
    /** Unique ID tag. */
    id: string;
    /** Human-friendly nickname for this entity instance. Doesn't have to be unique. Useful for entity queries. */
    label: string;
    /** Parent game instance. Entities have the right to manipulate the game on a high level (start/stop, etc). */
    protected game: Game;
    /** Stage instance. Entities have full access to the Babylon API that the stage exposes. */
    protected stage: Stage;
    /** Art loader instance. Allows the entity to load art asset files, like .obj's, sounds, or images. */
    protected loader: Loader;
    /**
     * Create a new entity instance.
     * You can optionally provide your own label for each instance.
     */
    constructor(options: EntityOptions);
    /**
     * Initialize this entity.
     */
    protected initialize(state: EntityState): void;
    /**
     * Respond to fresh entity state on a logic tick.
     */
    logic(input: EntityLogicInput): EntityLogicOutput;
    /**
     * Handle being removed from the game.
     * Tear down any event subscriptions, etc.
     */
    removal(): void;
    /**
     * Make it look pretty in the console logs.
     */
    toString(): string;
}
export interface EntityLogicInput {
    entityState: EntityState;
    tickReport: TickReport;
}
export interface EntityLogicOutput {
    entityStateDelta: any;
}
export interface EntityState {
    type: string;
    label?: string;
}

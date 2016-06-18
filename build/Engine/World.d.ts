import Game, { GameState, Logger } from "./Game";
import Stage from "./Stage";
import Loader from "./Loader";
import Entity from "./Entity";
import { TickReport } from "./Ticker";
/**
 * Inputs for a new world instance.
 */
export interface WorldOptions {
    game: Game;
    stage: Stage;
    loader: Loader;
    log?: Logger;
}
/**
 * Game world, which contains entity instances which imitate the game state.
 * Contain the entity instances of the game world.
 * Synchronizes with provided game state by adding or removing entities.
 * Responsible for dynamically loading and instancing entities.
 * Requires a stage reference, so it can be passed to each instanced entity.
 */
export default class World {
    /** Parent game instance. */
    protected game: Game;
    /** Babylon stage. */
    protected stage: Stage;
    /** Loads object files and images. */
    protected loader: Loader;
    /** Logger for world events. */
    protected log: Logger;
    /** Collection of entity instances. */
    protected entities: {
        [id: string]: Entity;
    };
    /**
     * Create a world instance with some world options.
     */
    constructor(options: WorldOptions);
    /**
     * Query entities by label with a regular expression.
     */
    query(regularExpression: RegExp): Entity[];
    /**
     * Loop over each entity.
     */
    loopOverEntities(looper: (entity: Entity) => void): void;
    /**
     * Run all game logic routines.
     *  - Add new entities to the world (load them dynamically).
     *  - Remove extraneous entities from the world.
     *  - Run all entity logic.
     *  - Return a final logic report, which includes all added or removed entities.
     */
    logic({gameState, tickReport}: WorldLogicInput): Promise<WorldLogicOutput>;
    /**
     * Dynamically load up and instantiate an entity provided entity state.
     */
    private summonEntity(id, state);
    /**
     * Remove an entity from the game world.
     */
    private removeEntity(id);
}
export interface WorldLogicInput {
    gameState: GameState;
    tickReport: TickReport;
}
export interface WorldLogicOutput {
    /** Entity instances which were added. */
    added: Entity[];
    /** The IDs of entity instances which were removed. */
    removed: string[];
}

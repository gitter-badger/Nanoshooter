import Stage from './Stage';
import World from './World';
import State from './State';
import Ticker from './Ticker';
import { EntityState } from './Entity';
/**
 * Options for creating a Game.
 */
export interface GameOptions {
    hostElement: HTMLElement;
    log: Logger;
}
/** Logging function to be used freely by entities and the like. */
export declare type Logger = (...messages: any[]) => void;
/**
 * 3D web game.
 */
export default class Game {
    /** Logging utility function. */
    log: Logger;
    /** Stage which manages the Babylon scene. */
    protected stage: Stage;
    /** Game state, source of truth that the world is based on. */
    protected state: GameState;
    /** Maintains entity instances, synchronizes with game state. */
    protected world: World;
    /** Game logic loop utility. */
    protected logicTicker: Ticker;
    /**
     * Create and wire up the engine components that the game is comprised of.
     */
    constructor({hostElement, log}: GameOptions);
    /** Overridable game initialization step. */
    protected initialize(): void;
    /**
     * Add an entity to the game based on the provided entity state.
     * TODO: Make this return a promise of the true Entity instance within the World.
     */
    addEntity<T extends EntityState>(entityState: T): void;
    /**
     * Remove an entity from the state based on the provided entity id.
     * TODO: Make this return a promise that is resolved when the entity instance is actually removed from the world.
     */
    removeEntity(id: string): void;
    /**
     * Run the whole game engine.
     */
    start(): void;
    /**
     * Halt the whole game engine.
     */
    stop(): Promise<void>;
    /**
     * Return the current number of frames being rendered per second.
     */
    getFramerate(): number;
}
/**
 * Serializable source-of-truth which describes everything (all entities) of the game at the current moment.
 */
export declare class GameState extends State {
    /** Collection of entity state. */
    private entities;
    /** Entity id pulling station. */
    private pullId;
    private nextId;
    /**
     * Loop over each entity state.
     */
    loopOverEntities(looper: (entityState: EntityState, id: string) => void): void;
    /**
     * Obtain a particular entity state.
     */
    getEntityState(id: string): EntityState;
    /**
     * Add entity state.
     */
    addEntity<T extends EntityState>(entityState: T): void;
    /**
     * Remove entity state.
     */
    removeEntity(id: string): void;
}

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Stage", "./World", "./Ticker", "./State", "./Loader"], function (require, exports, Stage_1, World_1, Ticker_1, State_1, Loader_1) {
    "use strict";
    /**
     * 3D web game.
     */
    var Game = (function () {
        /**
         * Create and wire up the engine components that the game is comprised of.
         */
        function Game(_a) {
            var _this = this;
            var artRootUrl = _a.artRootUrl, hostElement = _a.hostElement, log = _a.log;
            this.log = log;
            // Create the Babylon stage.
            this.stage = new Stage_1.default({ hostElement: hostElement });
            // Create the source-of-truth game state.
            this.state = new GameState();
            // Create the game world, which contains entity instances and conforms to the game state.
            this.world = new World_1.default({
                game: this,
                stage: this.stage,
                loader: new Loader_1.default({
                    scene: this.stage.scene,
                    rootUrl: artRootUrl
                })
            });
            // Create game logic ticker, and define the game logic routine.
            this.logicTicker = new Ticker_1.default({
                tick: function (tickInfo) {
                    _this.world.logic({ tickInfo: tickInfo, gameState: _this.state });
                }
            });
            // Initialize this game.
            this.initialize();
        }
        /** Overridable game initialization step. */
        Game.prototype.initialize = function () { };
        /**
         * Add an entity to the game based on the provided entity state.
         * TODO: Make this return a promise of the true Entity instance within the World.
         */
        Game.prototype.addEntity = function (entityState) {
            this.state.addEntity(entityState);
        };
        /**
         * Remove an entity from the state based on the provided entity id.
         * TODO: Make this return a promise that is resolved when the entity instance is actually removed from the world.
         */
        Game.prototype.removeEntity = function (id) {
            this.state.removeEntity(id);
        };
        /**
         * Run the whole game engine.
         */
        Game.prototype.start = function () {
            this.stage.start();
            this.logicTicker.start();
        };
        /**
         * Halt the whole game engine.
         */
        Game.prototype.stop = function () {
            this.stage.stop();
            return this.logicTicker.stop();
        };
        /**
         * Return the current number of frames being rendered per second.
         */
        Game.prototype.getFramerate = function () {
            return this.stage.engine.getFps();
        };
        return Game;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Game;
    /**
     * Serializable source-of-truth which describes everything (all entities) of the game at the current moment.
     */
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            var _this = this;
            _super.apply(this, arguments);
            /** Collection of entity state. */
            this.entities = {};
            /** Entity id pulling station. */
            this.pullId = function () { return (++_this.nextId).toString(); };
            this.nextId = 0;
        }
        /**
         * Loop over each entity state.
         */
        GameState.prototype.loopOverEntities = function (looper) {
            for (var _i = 0, _a = Object.keys(this.entities); _i < _a.length; _i++) {
                var id = _a[_i];
                looper(this.entities[id], id);
            }
        };
        /**
         * Obtain a particular entity state.
         */
        GameState.prototype.getEntityState = function (id) {
            return this.entities[id];
        };
        /**
         * Add entity state.
         */
        GameState.prototype.addEntity = function (entityState) {
            this.entities[this.pullId()] = entityState;
        };
        /**
         * Remove entity state.
         */
        GameState.prototype.removeEntity = function (id) {
            delete this.entities[id];
        };
        return GameState;
    }(State_1.default));
    exports.GameState = GameState;
});
//# sourceMappingURL=Game.js.map
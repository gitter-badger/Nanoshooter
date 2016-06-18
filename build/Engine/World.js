define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Game world, which contains entity instances which imitate the game state.
     * Contain the entity instances of the game world.
     * Synchronizes with provided game state by adding or removing entities.
     * Responsible for dynamically loading and instancing entities.
     * Requires a stage reference, so it can be passed to each instanced entity.
     */
    var World = (function () {
        /**
         * Create a world instance with some world options.
         */
        function World(options) {
            /** Collection of entity instances. */
            this.entities = {};
            this.game = options.game;
            this.stage = options.stage;
            this.loader = options.loader;
            this.log = options.log || this.game.log;
        }
        /**
         * Query entities by label with a regular expression.
         */
        World.prototype.query = function (regularExpression) {
            var matches = [];
            this.loopOverEntities(function (entity) {
                if (regularExpression.test(entity.label))
                    matches.push(entity);
            });
            return matches;
        };
        /**
         * Loop over each entity.
         */
        World.prototype.loopOverEntities = function (looper) {
            var _this = this;
            // Take the array of object keys, which are entity IDs.
            Object.keys(this.entities)
                .map(function (id) { return _this.entities[id]; })
                .filter(function (entity) { return !!entity; })
                .forEach(looper);
        };
        /**
         * Run all game logic routines.
         *  - Add new entities to the world (load them dynamically).
         *  - Remove extraneous entities from the world.
         *  - Run all entity logic.
         *  - Return a final logic report, which includes all added or removed entities.
         */
        World.prototype.logic = function (_a) {
            var _this = this;
            var gameState = _a.gameState, tickReport = _a.tickReport;
            var added = [];
            var removed = [];
            // Add entities that are present in the game state, but are missing from this world.
            gameState.loopOverEntities(function (entityState, id) {
                if (!_this.entities.hasOwnProperty(id))
                    added.push(_this.summonEntity(id, entityState).then(function () { return undefined; }));
            });
            // Remove entities that are missing from the game state, but are present in this game world.
            gameState.loopOverEntities(function (entityState, id) {
                if (!gameState.getEntityState(id))
                    removed.push(_this.removeEntity(id).then(function () { return id; }));
            });
            // Run all entity logic.
            this.loopOverEntities(function (entity) {
                entity.logic({
                    entityState: gameState.getEntityState(entity.id),
                    tickReport: tickReport
                });
            });
            // Return a report of all added or removed entities.
            return Promise.all([Promise.all(added), Promise.all(removed)])
                .then(function (results) { return ({
                added: results[0],
                removed: results[1]
            }); });
        };
        /**
         * Dynamically load up and instantiate an entity provided entity state.
         */
        World.prototype.summonEntity = function (id, state) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // Entity is set to null in the collection while the entity is loading.
                // If we didn't do this, the world might perform another sync during
                _this.entities[id] = null;
                // Load the entity.
                require([state.type], function (entityModule) {
                    // Instantiate the entity.
                    var entity = new entityModule.default({
                        id: id,
                        label: state.label,
                        game: _this.game,
                        stage: _this.stage,
                        loader: _this.loader
                    });
                    // Add the entity to the entities collection.
                    _this.entities[id] = entity;
                    // Log about it.
                    _this.log("(+) Added entity " + entity);
                    // Resolve the promise with the added entity.
                    resolve(entity);
                }, 
                // Handle loading error by rejecting the promise.
                function (error) { reject(error); });
            });
        };
        /**
         * Remove an entity from the game world.
         */
        World.prototype.removeEntity = function (id) {
            var entity = this.entities[id];
            entity.removal();
            delete this.entities[id];
            this.log("(-) Removed entity " + entity);
            return Promise.resolve();
        };
        return World;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = World;
});
//# sourceMappingURL=World.js.map
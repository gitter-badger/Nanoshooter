define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Entity in the game world which responds to fresh entity state on logic ticks.
     * An entity doesn't actually need to persist any state, fresh state can just pass through the logic method.
     */
    var Entity = (function () {
        /**
         * Create a new entity instance.
         * You can optionally provide your own label for each instance.
         */
        function Entity(options) {
            this.id = options.id;
            this.label = options.label || "";
            this.game = options.game;
            this.stage = options.stage;
            this.loader = options.loader;
            this.initialize(options.entityState);
        }
        /**
         * Initialize this entity.
         */
        Entity.prototype.initialize = function (state) { };
        /**
         * Respond to fresh entity state on a logic tick.
         */
        Entity.prototype.logic = function (input) { return undefined; };
        /**
         * Handle being removed from the game.
         * Tear down any event subscriptions, etc.
         */
        Entity.prototype.removal = function () { };
        /**
         * Make it look pretty in the console logs.
         */
        Entity.prototype.toString = function () { return "<" + this.id + (this.label ? '-' : '') + this.label + ">"; };
        /** Module ID for this entity class. Used to load entity classes on-the-fly. */
        Entity.type = 'Nanoshooter/Entities/Entity';
        return Entity;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Entity;
});
//# sourceMappingURL=Entity.js.map
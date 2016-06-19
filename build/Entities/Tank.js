var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Engine/Entity', '../Engine/KeyboardWatcher'], function (require, exports, Entity_1, KeyboardWatcher_1) {
    "use strict";
    /**
     * It's a full blown tank!
     */
    var Tank = (function (_super) {
        __extends(Tank, _super);
        function Tank() {
            _super.apply(this, arguments);
            /** Default tank art asset. */
            this.artPath = 'art/tanks/alpha/tank-alpha.obj';
            /** Whether or not this tank will respond to keyboard input and the like. */
            this.playerControlled = false;
            /** Remember our last movement direction so we face the same way when we stop. Intialized facing south. */
            this.lastDesiredMovementVector = new BABYLON.Vector3(0, 0, -1);
        }
        /**
         * Initialize the tank, by loading it.
         */
        Tank.prototype.initialize = function (entityState) {
            // Starting position.
            if (entityState.position) {
                var p = entityState.position;
                this.startingPosition = new BABYLON.Vector3(p[0], p[1], p[2]);
            }
            // Determine player controlled state.
            this.playerControlled = !!entityState.playerControlled;
            // If this tank is player controlled, establish a keyboard watcher.
            if (this.playerControlled) {
                this.keyboardWatcher = new KeyboardWatcher_1.default({
                    keyNames: {
                        'north': 'w',
                        'east': 'd',
                        'south': 's',
                        'west': 'a',
                    }
                });
            }
            // Load the tank obj from the art path specified in entity state, or use the default.
            this.loadTank(entityState.artPath || this.artPath);
        };
        /**
         * Cleanup this tank entity.
         */
        Tank.prototype.removal = function () {
            // Remove all meshes from the scene.
            for (var _i = 0, _a = this.meshes; _i < _a.length; _i++) {
                var mesh = _a[_i];
                this.stage.scene.removeMesh(mesh);
            }
            // Cleanup the keyboard watcher.
            this.keyboardWatcher.unbind();
        };
        /**
         * Load tank art into the scene.
         */
        Tank.prototype.loadTank = function (path) {
            var _this = this;
            return this.loader.loadObject({ path: path }).then(function (loaded) {
                _this.meshes = loaded.meshes;
                _this.chassis = _this.meshes.find(function (mesh) { return /Chassis/i.test(mesh.name); });
                _this.turret = _this.meshes.find(function (mesh) { return /Turret/i.test(mesh.name); });
                _this.turret.parent = _this.chassis;
                if (_this.startingPosition)
                    _this.chassis.setAbsolutePosition(_this.startingPosition);
            });
        };
        /**
         * Run the tank's game logic.
         */
        Tank.prototype.logic = function (input) {
            // Stuff that we only do when the meshes are loaded, and the keyboard watcher is active.
            if (this.meshes && this.keyboardWatcher) {
                // Aim the tank chassis toward the desired movement vector.
                this.turnChassis(this.ascertainDesiredMovementVector());
                // Aim the tank's gun turret toward the user's cursor.
                if (this.stage.pick.hit)
                    this.aimTurret(this.stage.pick.pickedPoint);
            }
            return;
        };
        /**
         * Get the direction in which the player wishes to move.
         */
        Tank.prototype.ascertainDesiredMovementVector = function () {
            var _this = this;
            var vector = BABYLON.Vector3.Zero();
            var status = function (label) { return _this.keyboardWatcher.status[label]; };
            if (!status('north') && !status('east') && !status('south') && !status('west'))
                return this.lastDesiredMovementVector;
            if (status('north'))
                vector.z += 1;
            if (status('east'))
                vector.x += 1;
            if (status('south'))
                vector.z -= 1;
            if (status('west'))
                vector.x -= 1;
            return this.lastDesiredMovementVector = vector;
        };
        /**
         * Orient the chassis in a given direction.
         */
        Tank.prototype.turnChassis = function (direction) {
            var point = this.chassis.position.add(direction);
            this.chassis.lookAt(point, 0, 0, 0);
        };
        /**
         * Aim the turret toward any point in the 3D world.
         */
        Tank.prototype.aimTurret = function (pick) {
            var aimPoint = BABYLON.Vector3.Zero();
            aimPoint.copyFrom(pick);
            aimPoint.y = this.turret.position.y;
            var matrix = BABYLON.Matrix.Zero();
            this.chassis.getWorldMatrix().invertToRef(matrix);
            var localPoint = BABYLON.Vector3.TransformCoordinates(aimPoint, matrix);
            this.turret.lookAt(localPoint, 0, 0, 0);
        };
        Tank.type = 'Nanoshooter/Entities/Tank';
        return Tank;
    }(Entity_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Tank;
});
//# sourceMappingURL=Tank.js.map
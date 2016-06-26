var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Framework/Entity', '../Toolbox/KeyboardWatcher'], function (require, exports, Entity_1, KeyboardWatcher_1) {
    "use strict";
    /**
     * It's a full blown tank!
     */
    var Tank = (function (_super) {
        __extends(Tank, _super);
        /**
         * Construct a tank.
         */
        function Tank(options) {
            var _this = this;
            _super.call(this, options);
            /** Default tank art asset. */
            this.artPath = 'art/tanks/alpha/tank-alpha.obj';
            /** Whether or not this tank will respond to keyboard input and the like. */
            this.playerControlled = false;
            /** Remember our last movement direction so we face the same way when we stop. Intialized facing south. */
            this.lastDesiredMovementVector = new BABYLON.Vector3(0, 0, -1);
            this.speed = 5;
            this.speedVector = new BABYLON.Vector3(this.speed, this.speed, this.speed);
            var tankState = options.entityState;
            // Starting position.
            if (tankState.position) {
                var p = tankState.position;
                this.startingPosition = new BABYLON.Vector3(p[0], p[1], p[2]);
            }
            // Determine player controlled state.
            this.playerControlled = !!tankState.playerControlled;
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
            this.loadTank(tankState.artPath || this.artPath)
                .then(function () {
                // Create the tank's camera – all tanks have a camera, it just might not be active.
                _this.camera = new BABYLON.TargetCamera("tank-camera-" + _this.id, BABYLON.Vector3.Zero(), _this.stage.scene);
                _this.camera.lockedTarget = _this.chassis;
                _this.camera.position = _this.chassis.position.add(new BABYLON.Vector3(0, 80, -40));
                // If the tank is player controlled.
                if (_this.playerControlled) {
                    // Create, position, and activate its camera.
                    _this.stage.scene.swithActiveCamera(_this.camera);
                }
            });
        }
        /**
         * Load tank art (.obj file) into the scene.
         */
        Tank.prototype.loadTank = function (path) {
            var _this = this;
            return this.loader.loadObject({ path: path }).then(function (loaded) {
                _this.meshes = loaded.meshes;
                // Find the right meshes.
                _this.chassis = _this.meshes.find(function (mesh) { return /Chassis/i.test(mesh.name); });
                _this.turret = _this.meshes.find(function (mesh) { return /Turret/i.test(mesh.name); });
                // Attach the turret to the chassis.
                _this.turret.parent = _this.chassis;
                // Assume the starting position.
                if (_this.startingPosition)
                    _this.chassis.setAbsolutePosition(_this.startingPosition.add(new BABYLON.Vector3(0, 10, 0)));
                // Apply physics.
                _this.chassis.physicsImpostor = new BABYLON.PhysicsImpostor(_this.chassis, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, restitution: 0.1 }, _this.stage.scene);
            });
        };
        /**
         * Run the tank's game logic.
         */
        Tank.prototype.logic = function (input) {
            // If meshes are loaded.
            if (this.meshes) {
                // Aim the tank's gun turret toward the user's cursor.
                if (this.stage.pick.hit)
                    this.aimTurret(this.stage.pick.pickedPoint);
                // If the keyboard watcher is active.
                if (this.keyboardWatcher) {
                    // Get the direction that the user wishes to move in.
                    var desiredMovement = this.ascertainDesiredMovementVector();
                    // Turn the tank chassis toward the desired movement vector.
                    this.turnChassis(desiredMovement || this.lastDesiredMovementVector);
                    // Gas the tank when movement keys are pressed.
                    this.accelerateWhenMoving(desiredMovement);
                }
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
                return null;
            if (status('north'))
                vector.z += 1;
            if (status('east'))
                vector.x += 1;
            if (status('south'))
                vector.z -= 1;
            if (status('west'))
                vector.x -= 1;
            this.lastDesiredMovementVector = vector;
            return vector;
        };
        /**
         * Accelerate the tank when movement keys are pressed.
         */
        Tank.prototype.accelerateWhenMoving = function (desiredMovement) {
            if (!desiredMovement)
                return;
            this.chassis.physicsImpostor.setLinearVelocity(desiredMovement.multiply(this.speedVector));
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
        /**
         * Cleanup for removal from the game.
         */
        Tank.prototype.destructor = function () {
            // Remove all meshes from the scene.
            for (var _i = 0, _a = this.meshes; _i < _a.length; _i++) {
                var mesh = _a[_i];
                this.stage.scene.removeMesh(mesh);
            }
            // Cleanup the keyboard watcher.
            this.keyboardWatcher.unbind();
        };
        Tank.type = 'Nanoshooter/Entities/Tank';
        return Tank;
    }(Entity_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Tank;
});
//# sourceMappingURL=Tank.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../Engine/Entity"], function (require, exports, Entity_1) {
    "use strict";
    /**
     * It's a full blown tank!
     */
    var Tank = (function (_super) {
        __extends(Tank, _super);
        function Tank() {
            _super.apply(this, arguments);
        }
        Tank.prototype.initialize = function () {
            this.loadTank("tank-bravo.obj");
        };
        Tank.prototype.loadTank = function (path) {
            var _this = this;
            return this.loader.loadObject({ path: path }).then(function (loaded) {
                _this.meshes = loaded.meshes;
                _this.chassis = _this.meshes.find(function (mesh) { return /Chassis/i.test(mesh.name); });
                _this.turret = _this.meshes.find(function (mesh) { return /Turret/i.test(mesh.name); });
                _this.turret.parent = _this.chassis;
            });
        };
        Tank.prototype.logic = function (input) {
            // Aim the tank's gun turret toward the user's cursor.
            if (this.meshes && this.stage.pick.hit)
                this.aimTurret(this.stage.pick.pickedPoint);
            return;
        };
        Tank.prototype.aimTurret = function (point) {
            var aim = BABYLON.Vector3.Zero();
            aim.copyFrom(point);
            aim.subtractInPlace(this.turret.absolutePosition);
            aim.y = this.turret.position.y;
            this.turret.lookAt(aim, 0, 0, 0);
        };
        Tank.prototype.removal = function () {
            // Remove all meshes from the scene.
            for (var _i = 0, _a = this.meshes; _i < _a.length; _i++) {
                var mesh = _a[_i];
                this.stage.scene.removeMesh(mesh);
            }
        };
        Tank.type = "Nanoshooter/Entities/Tank";
        return Tank;
    }(Entity_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Tank;
});
//# sourceMappingURL=Tank.js.map
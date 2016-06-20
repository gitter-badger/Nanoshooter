var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Engine/Game"], function (require, exports, Game_1) {
    "use strict";
    /**
     * Nanoshooter game.
     * Subclass of Game, which has start/stop methods, etc.
     */
    var Nanoshooter = (function (_super) {
        __extends(Nanoshooter, _super);
        function Nanoshooter() {
            _super.apply(this, arguments);
        }
        Nanoshooter.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            var _a = this.stage, canvas = _a.canvas, scene = _a.scene;
            // Physics.
            var gravity = new BABYLON.Vector3(0, -9.81, 0);
            scene.enablePhysics(gravity, new BABYLON.CannonJSPlugin());
            // Background color.
            scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.2);
            // Lights.
            var toplight = new BABYLON.DirectionalLight("sunlight", new BABYLON.Vector3(0.2, -1, 0.3), scene);
            var backlight = new BABYLON.DirectionalLight("backlight", new BABYLON.Vector3(-0.76, -0.8, -0.44), scene);
            toplight.intensity = 0.8;
            backlight.intensity = 0.4;
            // Camera.
            var camera = new BABYLON.UniversalCamera("camera1", new BABYLON.Vector3(-5, 15, -15), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, false);
            // Action!
            this.createInitialEntities();
        };
        Nanoshooter.prototype.createInitialEntities = function () {
            // Floor.
            this.addEntity({
                type: "Nanoshooter/Entities/Floor",
                label: "FancyFloor"
            });
            // If the page has a querystring, display an empty scene with the art viewer.
            if (location.search) {
                // Art viewer.
                this.addEntity({
                    type: "Nanoshooter/Entities/ArtViewer",
                    label: "ArtViewer"
                });
            }
            else {
                // Tank alpha.
                this.addEntity({
                    type: "Nanoshooter/Entities/Tank",
                    label: "TankAlpha",
                    playerControlled: true,
                    artPath: "art/tanks/alpha/tank-alpha.obj",
                    position: [-4, 0, 0]
                });
                // Tank bravo.
                this.addEntity({
                    type: "Nanoshooter/Entities/Tank",
                    label: "TankBravo",
                    artPath: "art/tanks/bravo/tank-bravo.obj",
                    position: [4, 0, 0]
                });
                // Spawner.
                this.addEntity({
                    type: "Nanoshooter/Entities/Spawner",
                    label: "Spawnlord"
                });
            }
            // // Robot.
            // this.addEntity(new EntityState({
            //   type: "Nanoshooter/Entities/Robot",
            //   label: "Robot"
            // }))
            // // Cube.
            // this.addEntity(new EntityState({
            //     type: "Nanoshooter/Entities/Cube",
            //     label: "FancyCube"
            // }))
        };
        return Nanoshooter;
    }(Game_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Nanoshooter;
});
//# sourceMappingURL=Nanoshooter.js.map
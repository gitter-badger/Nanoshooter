var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../Engine/Entity'], function (require, exports, Entity_1) {
    "use strict";
    /**
     * Preview by providing the art path as a query string.
     * Loads an ".obj" file into the scene upon initialization.
     */
    var ArtViewer = (function (_super) {
        __extends(ArtViewer, _super);
        function ArtViewer() {
            _super.apply(this, arguments);
        }
        ArtViewer.prototype.initialize = function (entityState) {
            var viewPath = location.search.substr(1);
            if (viewPath)
                this.loadProp(viewPath);
        };
        ArtViewer.prototype.loadProp = function (path) {
            var _this = this;
            return this.loader.loadObject({ path: path })
                .then(function (loaded) {
                _this.meshes = loaded.meshes;
            })
                .catch(function (error) {
                console.error("Failed to load .obj file: \"" + path + "\"");
                if (error)
                    console.error(error);
            });
        };
        /**
         * Cleanup for removal from the game.
         */
        ArtViewer.prototype.destructor = function () {
            for (var _i = 0, _a = this.meshes; _i < _a.length; _i++) {
                var mesh = _a[_i];
                this.stage.scene.removeMesh(mesh);
            }
        };
        ArtViewer.type = 'Nanoshooter/Entities/ArtViewer';
        return ArtViewer;
    }(Entity_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = ArtViewer;
});
//# sourceMappingURL=ArtViewer.js.map
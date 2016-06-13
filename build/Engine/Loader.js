define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Loads art assets.
     */
    var Loader = (function () {
        function Loader(options) {
            this.scene = options.scene;
            this.rootUrl = options.rootUrl;
        }
        /**
         * Load a ".obj" file, relative to this loader's root url.
         * Returns a promise of a loaded object report, which contains the meshes.
         */
        Loader.prototype.loadObject = function (_a) {
            var _this = this;
            var path = _a.path;
            return new Promise(function (resolve, reject) {
                var assetsManager = new BABYLON.AssetsManager(_this.scene);
                assetsManager.useDefaultLoadingScreen = false;
                var meshTask = assetsManager.addMeshTask(performance.now().toString(), null, _this.rootUrl, path);
                meshTask.onSuccess = function (task) {
                    resolve({
                        meshes: task.loadedMeshes
                    });
                };
                meshTask.onError = reject;
                assetsManager.load();
            });
        };
        return Loader;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Loader;
});
//# sourceMappingURL=Loader.js.map
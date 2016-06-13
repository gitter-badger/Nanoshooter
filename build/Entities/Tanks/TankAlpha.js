var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../Tank"], function (require, exports, Tank_1) {
    "use strict";
    var TankAlpha = (function (_super) {
        __extends(TankAlpha, _super);
        function TankAlpha() {
            _super.apply(this, arguments);
        }
        TankAlpha.prototype.initialize = function () {
            var _this = this;
            this.loadTank("tank-alpha.obj").then(function () {
                _this.chassis.position.x -= 4;
            });
        };
        TankAlpha.type = "Nanoshooter/Entities/Tanks/TankAlpha";
        return TankAlpha;
    }(Tank_1.default));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TankAlpha;
});
//# sourceMappingURL=TankAlpha.js.map
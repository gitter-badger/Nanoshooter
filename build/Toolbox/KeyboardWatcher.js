define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Watch keyboard activity.
     */
    var KeyboardWatcher = (function () {
        /**
         * Create a keyboard watcher which watches the provided keys.
         */
        function KeyboardWatcher(_a) {
            var _this = this;
            var keyNames = _a.keyNames;
            /** Dictionary of key codes by key names. This gives each key code a key name. */
            this.codes = (_b = {
                    w: 87,
                    a: 65,
                    s: 83,
                    d: 68,
                    space: 32,
                    q: 81,
                    e: 69,
                    shift: 16,
                    ctrl: 17,
                    alt: 18
                },
                _b['1'] = 49,
                _b['2'] = 50,
                _b['3'] = 51,
                _b['4'] = 52,
                _b['5'] = 53,
                _b['6'] = 54,
                _b['7'] = 55,
                _b['8'] = 56,
                _b['9'] = 57,
                _b['0'] = 48,
                _b
            );
            /** Dictionary of key names by key labels. This gives each key name a handy label. */
            this.labels = {};
            /** Dictionary of status booleans by key labels. This stores the current status of a given key label. */
            this.status = {};
            /**
             * Handle the moment that a key is struck.
             * Set the key status to true.
             */
            this.keydown = function (event) {
                // Identify which key is being struck.
                var struckKeyName = _this.getKeyNameByKeyCode(event.keyCode);
                // Identify which label the struck key is associated with.
                var struckKeyLabel = _this.getKeyLabelByKeyName(struckKeyName);
                // Set key status to true.
                _this.status[struckKeyLabel] = true;
            };
            /**
             * Handle the release of a key.
             * Set the key status to false.
             */
            this.keyup = function (event) {
                // Identify which key is being released.
                var releasedKeyName = _this.getKeyNameByKeyCode(event.keyCode);
                // Identify which label the released key is associated with.
                var releasedKeyLabel = _this.getKeyLabelByKeyName(releasedKeyName);
                // Set key status to false.
                _this.status[releasedKeyLabel] = false;
            };
            this.labels = keyNames;
            // Initializing the status dictionary, based on the provided labels.
            Object.keys(keyNames).forEach(function (keyLabel) {
                var keyName = keyNames[keyLabel];
                // Throw error for unknown keys.
                if (!(keyName in _this.codes))
                    throw "Unknown key: " + keyName;
                // Initial key status is null.
                _this.status[keyLabel] = null;
            });
            // Add event listeners.
            this.bind();
            var _b;
        }
        /**
         * Start watching keyboard activity, by adding event listeners.
        */
        KeyboardWatcher.prototype.bind = function () {
            addEventListener('keydown', this.keydown);
            addEventListener('keyup', this.keyup);
        };
        /**
         * Stop watching keyboard activity, by removing event listeners.
         */
        KeyboardWatcher.prototype.unbind = function () {
            removeEventListener('keydown', this.keydown);
            removeEventListener('keyup', this.keyup);
        };
        /**
         * Given a key code, return the key name.
         */
        KeyboardWatcher.prototype.getKeyNameByKeyCode = function (keyCode) {
            var _this = this;
            return Object.keys(this.codes).find(function (keyName) { return _this.codes[keyName] === keyCode; });
        };
        /**
         * Given a key name, return the key label.
         */
        KeyboardWatcher.prototype.getKeyLabelByKeyName = function (keyName) {
            var _this = this;
            return Object.keys(this.labels).find(function (keyLabel) { return _this.labels[keyLabel] === keyName; });
        };
        return KeyboardWatcher;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = KeyboardWatcher;
});
//# sourceMappingURL=KeyboardWatcher.js.map
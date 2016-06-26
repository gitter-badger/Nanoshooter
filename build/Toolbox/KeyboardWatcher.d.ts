/**
 * Options for creating a new keyboard watcher instance.
 */
export interface KeyboardWatcherOptions {
    keyNames: {
        [keyLabel: string]: string;
    };
}
/**
 * Watch keyboard activity.
 */
export default class KeyboardWatcher {
    /** Dictionary of key codes by key names. This gives each key code a key name. */
    protected codes: {
        [keyName: string]: number;
    };
    /** Dictionary of key names by key labels. This gives each key name a handy label. */
    protected labels: {
        [keyLabel: string]: string;
    };
    /** Dictionary of status booleans by key labels. This stores the current status of a given key label. */
    status: {
        [keyLabel: string]: boolean;
    };
    /**
     * Create a keyboard watcher which watches the provided keys.
     */
    constructor({keyNames}: KeyboardWatcherOptions);
    /**
     * Start watching keyboard activity, by adding event listeners.
    */
    bind(): void;
    /**
     * Stop watching keyboard activity, by removing event listeners.
     */
    unbind(): void;
    /**
     * Given a key code, return the key name.
     */
    protected getKeyNameByKeyCode(keyCode: number): string;
    /**
     * Given a key name, return the key label.
     */
    protected getKeyLabelByKeyName(keyName: string): string;
    /**
     * Handle the moment that a key is struck.
     * Set the key status to true.
     */
    protected keydown: (event: KeyboardEvent) => void;
    /**
     * Handle the release of a key.
     * Set the key status to false.
     */
    protected keyup: (event: KeyboardEvent) => void;
}

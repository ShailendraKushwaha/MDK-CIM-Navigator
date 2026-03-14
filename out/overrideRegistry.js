"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideRegistry = void 0;
class OverrideRegistry {
    map = new Map();
    add(target, source) {
        this.map.set(target, source);
    }
    getSource(target) {
        return this.map.get(target);
    }
    clear() {
        this.map.clear();
    }
}
exports.OverrideRegistry = OverrideRegistry;
//# sourceMappingURL=overrideRegistry.js.map
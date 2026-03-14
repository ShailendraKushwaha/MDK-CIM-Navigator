"use strict";
// export class OverrideRegistry {
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideRegistry = void 0;
//     private map: Map<string, string> = new Map()
//     add(target: string, source: string) {
//         this.map.set(target, source)
//         console.log(this.map)
//     }
//     getSource(target: string): string | undefined {
//         return this.map.get(target)
//     }
//     getTarget(source: string): string | undefined {
//         return this.map.get(source)
//     }
//     clear() {
//         this.map.clear()
//     }
// }
class OverrideRegistry {
    targetToSource = new Map();
    sourceToTarget = new Map();
    add(target, source) {
        const normalizedTarget = target.replace(/\\/g, "/");
        const normalizedSource = source.replace(/\\/g, "/");
        this.targetToSource.set(normalizedTarget, normalizedSource);
        this.sourceToTarget.set(normalizedSource, normalizedTarget);
    }
    getSource(target) {
        return this.targetToSource.get(target);
    }
    getTarget(source) {
        return this.sourceToTarget.get(source);
    }
    clear() {
        this.targetToSource.clear();
        this.sourceToTarget.clear();
    }
}
exports.OverrideRegistry = OverrideRegistry;
//# sourceMappingURL=overrideRegistry.js.map
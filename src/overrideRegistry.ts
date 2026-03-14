// export class OverrideRegistry {

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

export class OverrideRegistry {

    private targetToSource: Map<string, string> = new Map()
    private sourceToTarget: Map<string, string> = new Map()

    add(target: string, source: string) {

        const normalizedTarget = target.replace(/\\/g, "/")
        const normalizedSource = source.replace(/\\/g, "/")

        this.targetToSource.set(normalizedTarget, normalizedSource)
        this.sourceToTarget.set(normalizedSource, normalizedTarget)
    }

    getSource(target: string): string | undefined {
        return this.targetToSource.get(target)
    }

    getTarget(source: string): string | undefined {
        return this.sourceToTarget.get(source)
    }

    clear() {
        this.targetToSource.clear()
        this.sourceToTarget.clear()
    }
}
export class OverrideRegistry {

    private map: Map<string, string> = new Map()

    add(target: string, source: string) {
        this.map.set(target, source)
    }

    getSource(target: string): string | undefined {
        return this.map.get(target)
    }

    clear() {
        this.map.clear()
    }
}
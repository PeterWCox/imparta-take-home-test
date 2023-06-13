export interface JSONPatch {
    op: 'add' | 'remove' | 'replace' | 'copy' | 'move' | 'test'
    path: string
    value?: any
}

export class JSONPatchFactory {
    private _jsonPatch: JSONPatch[] = []

    public add(path: string, value: any) {
        this._jsonPatch.push({ op: 'add', path, value })
        return this
    }

    public getJsonPatch = (): JSONPatch[] => {
        const x = this._jsonPatch
        console.log(x)
        return x
    }
}

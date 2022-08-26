import * as path from 'path'

export class NormalizePath {
    constructor() {

    }
    static normalizeSeparator(targetPath) {
        return targetPath.replace(/\\/g, "/")
    }
    static absolutePath(targetPath, currentDirectory) {
        const cwd = currentDirectory || process.cwd()
        return NormalizePath.normalizeSeparator(path.normalize((path.isAbsolute(targetPath)) ? targetPath : path.join(cwd, targetPath)))
    }
}

export default NormalizePath

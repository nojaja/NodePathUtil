import * as path from 'path'

export class NormalizePath {
    constructor(debug) {
        this.debug = debug || false
    }
    /**
     * PathのOS差分をLinuxに寄せて統一
     * @param {*} targetPath 
     * @returns 
     */
    static normalizeSeparator(targetPath) {
        if(!targetPath) return null;
        return targetPath.replace(/\\/g, "/");
    }

    /**
     * Pathを絶対Pathに変換
     * @param {*} targetPath 
     * @param {*} currentDirectory 
     * @returns 
     */
    static absolutePath(targetPath, currentDirectory) {
        if(!targetPath) return null;
        const cwd = currentDirectory || process.cwd();
        return NormalizePath.normalizeSeparator(path.normalize((path.isAbsolute(targetPath)) ? targetPath : path.join(cwd, targetPath)));
    }

    /**
     * Pathを相対Pathに変換
     * @param {*} targetPath 
     * @param {*} currentDirectory 
     * @returns 
     */
    static relativePath(targetPath, currentDirectory) {
        if(!targetPath) return null;
        const cwd = currentDirectory || process.cwd();
        return NormalizePath.normalizeSeparator(path.relative(cwd, targetPath));
    }

}

export default NormalizePath

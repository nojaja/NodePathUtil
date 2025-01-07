import * as path from 'path'

export class PathUtil {
    constructor() {

    }
    /**
     * Unify path OS differences by aligning them with Linux 
     * @param {*} targetPath 
     * @returns 
     */
    static normalizeSeparator(targetPath) {
        if(!targetPath) return null;
        const _targetPath = targetPath.replace(/(\\|\/)/g, "/") // a\b\c a/b/c -> a/b/c
        //win32 namespaces
        const win32NS = Array.from(_targetPath.matchAll(/^\/\/+([\?\.])\//g))
        const end = (win32NS[0]) ? win32NS[0].index + win32NS[0][0].length : 0
        const prefix = (win32NS[0]) ? `//${win32NS[0][1]}/` : ''
        const suffix = ((win32NS[0]) ? _targetPath.slice(end) : _targetPath).replace(/\/+/g, "/")

        return prefix + suffix
    }
    /**
     * 
     * @param {*} targetPath 
     * @returns 
     */
    static isAbsolute(targetPath) {
        const _targetPath = PathUtil.normalizeSeparator(targetPath)
        if (/^[a-z]:\//i.test(_targetPath)) {
            return true;
        }
        // Microsoft Azure absolute filepath
        if (/^\/\//.test(_targetPath)) {
            return true;
        }
        if (/^\//.test(_targetPath)) {
            return true;
        }
        return false
    }
    /**
     * Convert path to absolute path
     * @param {*} targetPath 
     * @param {*} currentDirectory 
     * @returns 
     */
    static absolutePath(targetPath, currentDirectory) {
        if(!targetPath) return null;
        const cwd = currentDirectory || process.cwd()
        return PathUtil.normalizeSeparator(path.win32.normalize((PathUtil.isAbsolute(targetPath)) ? targetPath : path.join(cwd, targetPath)))
    }
    /**
     * Convert path to relative path
     * @param {*} targetPath 
     * @param {*} currentDirectory 
     * @returns 
     */
    static relativePath(targetPath, currentDirectory) {
        if(!targetPath) return null;
        const cwd = PathUtil.normalizeSeparator(currentDirectory) || process.cwd();
        return PathUtil.normalizeSeparator(path.posix.relative(cwd, targetPath));
    }
}

export default PathUtil

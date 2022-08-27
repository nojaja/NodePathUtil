import * as path from 'path'

export class PathUtil {
    constructor() {

    }
    static normalizeSeparator(targetPath) {
        const _targetPath = targetPath.replace(/(\\|\/)/g, "/") // a\b\c a/b/c -> a/b/c
        //win32 namespaces
        const win32NS = Array.from(_targetPath.matchAll(/^\/\/+([\?\.])\//g))
        const end = (win32NS[0]) ? win32NS[0].index + win32NS[0][0].length : 0
        const prefix = (win32NS[0]) ? `//${win32NS[0][1]}/` : ''
        const suffix = ((win32NS[0]) ? _targetPath.slice(end) : _targetPath).replace(/\/+/g, "/")

        return prefix + suffix
    }
    
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
    
    static absolutePath(targetPath, currentDirectory) {
        const cwd = currentDirectory || process.cwd()
        return PathUtil.normalizeSeparator(path.normalize((PathUtil.isAbsolute(targetPath)) ? targetPath : path.join(cwd, targetPath)))
    }
}

export default PathUtil

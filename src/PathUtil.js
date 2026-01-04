import * as path from 'path'

/**
 * Unify path OS differences by aligning them with Linux separators.
 * @param {string | null | undefined} targetPath
 * @returns {string | null}
 */
export function normalizeSeparator(targetPath) {
    if (!targetPath) return null;
    const _targetPath = targetPath.replace(/(\\|\/)/g, "/");
    // win32 namespaces
    const win32NS = Array.from(_targetPath.matchAll(/^\/\/+([\?\.])\//g));
    const end = win32NS[0] ? win32NS[0].index + win32NS[0][0].length : 0;
    const prefix = win32NS[0] ? `//${win32NS[0][1]}/` : '';
    const suffix = (win32NS[0] ? _targetPath.slice(end) : _targetPath).replace(/\/+/g, "/");

    return prefix + suffix;
}

/**
 * Determine whether the provided path is absolute.
 * @param {string} targetPath
 * @returns {boolean}
 */
export function isAbsolute(targetPath) {
    const _targetPath = normalizeSeparator(targetPath);
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
    return false;
}

/**
 * Convert path to absolute path.
 * @param {string | null | undefined} targetPath
 * @param {string} [currentDirectory]
 * @returns {string | null}
 */
export function absolutePath(targetPath, currentDirectory) {
    if (!targetPath) return null;
    const cwd = currentDirectory || process.cwd();
    return normalizeSeparator(path.win32.normalize(isAbsolute(targetPath) ? targetPath : path.join(cwd, targetPath)));
}

/**
 * Convert path to relative path.
 * @param {string | null | undefined} targetPath
 * @param {string} [currentDirectory]
 * @returns {string | null}
 */
export function relativePath(targetPath, currentDirectory) {
    if (!targetPath) return null;
    const cwd = normalizeSeparator(currentDirectory) || process.cwd();
    return normalizeSeparator(path.posix.relative(cwd, targetPath));
}

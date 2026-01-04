/**
 * Normalize path separators to POSIX style. Returns null when input is falsy.
 */
export declare function normalizeSeparator(targetPath: string | null | undefined): string | null;

/**
 * Determine whether a path string is absolute.
 */
export declare function isAbsolute(targetPath: string): boolean;

/**
 * Resolve a path to an absolute form. Returns null when input is falsy.
 */
export declare function absolutePath(targetPath: string | null | undefined, currentDirectory?: string): string | null;

/**
 * Convert an absolute path into a relative one. Returns null when input is falsy.
 */
export declare function relativePath(targetPath: string | null | undefined, currentDirectory?: string): string | null;

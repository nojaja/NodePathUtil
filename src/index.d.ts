export declare class PathUtil {
  /**
   * Normalize path separators to POSIX style. Returns null when input is falsy.
   */
  static normalizeSeparator(targetPath: string | null | undefined): string | null;

  /**
   * Determine whether a path string is absolute.
   */
  static isAbsolute(targetPath: string): boolean;

  /**
   * Resolve a path to an absolute form. Returns null when input is falsy.
   */
  static absolutePath(targetPath: string | null | undefined, currentDirectory?: string): string | null;

  /**
   * Convert an absolute path into a relative one. Returns null when input is falsy.
   */
  static relativePath(targetPath: string | null | undefined, currentDirectory?: string): string | null;
}

export default PathUtil;

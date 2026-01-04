import * as PathUtil from '../../src/PathUtil';

describe('@nojaja/pathutil exports', () => {
  it('should expose normalizeSeparator', () => {
    expect(typeof PathUtil.normalizeSeparator).toBe('function');
  });

  it('should expose absolutePath', () => {
    expect(typeof PathUtil.absolutePath).toBe('function');
  });

  it('should expose isAbsolute', () => {
    expect(typeof PathUtil.isAbsolute).toBe('function');
  });

  it('should expose relativePath', () => {
    expect(typeof PathUtil.relativePath).toBe('function');
  });
});

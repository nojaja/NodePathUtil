import PathUtil from '@nojaja/pathutil';

describe('@nojaja/pathutil exports', () => {
  it('should expose normalizeSeparator', () => {
    expect(typeof (PathUtil as any).normalizeSeparator).toBe('function');
  });

  it('should expose absolutePath', () => {
    expect(typeof (PathUtil as any).absolutePath).toBe('function');
  });

  it('should expose isAbsolute', () => {
    expect(typeof (PathUtil as any).isAbsolute).toBe('function');
  });

  it('should expose relativePath', () => {
    expect(typeof (PathUtil as any).relativePath).toBe('function');
  });
});

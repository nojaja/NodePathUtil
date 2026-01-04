import * as PathUtil from '../../src/PathUtil';

// Given（前提）: PathUtilが名前空間的にインポートされている
// When（操作）: 各メソッドを呼び出す
// Then（期待）: 正常に実行できる
describe('PathUtil Namespace Import Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // Given（前提）: PathUtilが名前空間的にインポートされている
  // When（操作）: normalizeSeparatorを呼び出す
  // Then（期待）: 正常に実行でき、パスが正規化される
  it('should allow namespace-style usage of normalizeSeparator', () => {
    const result = PathUtil.normalizeSeparator('\\path\\to\\file');
    
    expect(result).toBe('/path/to/file');
  });

  // Given（前提）: PathUtilが名前空間的にインポートされている
  // When（操作）: isAbsoluteを呼び出す
  // Then（期待）: 正常に実行でき、絶対パス判定が行われる
  it('should allow namespace-style usage of isAbsolute', () => {
    const result1 = PathUtil.isAbsolute('/absolute/path');
    const result2 = PathUtil.isAbsolute('relative/path');
    
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  // Given（前提）: PathUtilが名前空間的にインポートされている
  // When（操作）: absolutePathを呼び出す
  // Then（期待）: 正常に実行でき、絶対パスが生成される
  it('should allow namespace-style usage of absolutePath', () => {
    const result = PathUtil.absolutePath('relative/path', '/base/dir');
    
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(typeof result).toBe('string');
  });

  // Given（前提）: PathUtilが名前空間的にインポートされている
  // When（操作）: relativePathを呼び出す
  // Then（期待）: 正常に実行でき、相対パスが生成される
  it('should allow namespace-style usage of relativePath', () => {
    const result = PathUtil.relativePath('/absolute/path', '/base');
    
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(typeof result).toBe('string');
  });

  // Given（前提）: PathUtilが名前空間的にインポートされている
  // When（操作）: 複数のメソッドを連鎖的に呼び出す
  // Then（期待）: 正常に実行でき、期待通りの結果が得られる
  it('should allow chained namespace-style usage', () => {
    const result = PathUtil.normalizeSeparator(
      PathUtil.absolutePath('test\\path', 'C:\\base\\dir')
    );
    
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    expect(typeof result).toBe('string');
    // Windows形式のパスが正規化されていることを確認
    expect(result).not.toContain('\\');
  });

  // Given（前提）: PathUtilが名前空間的にインポートされている
  // When（操作）: nullやundefinedを渡す
  // Then（期待）: nullを返す
  it('should handle null and undefined inputs correctly', () => {
    expect(PathUtil.normalizeSeparator(null)).toBeNull();
    expect(PathUtil.normalizeSeparator(undefined)).toBeNull();
    expect(PathUtil.absolutePath(null)).toBeNull();
    expect(PathUtil.absolutePath(undefined)).toBeNull();
    expect(PathUtil.relativePath(null)).toBeNull();
    expect(PathUtil.relativePath(undefined)).toBeNull();
  });

  // Given（前提）: PathUtilが名前空間的にインポートされている
  // When（操作）: Windows形式の絶対パスを処理する
  // Then（期待）: 正しく正規化される
  it('should normalize Windows absolute paths', () => {
    const result = PathUtil.normalizeSeparator('C:\\Users\\test\\file.txt');
    
    expect(result).toBe('C:/Users/test/file.txt');
  });

  // Given（前提）: PathUtilが名前空間的にインポートされている
  // When（操作）: 複数のスラッシュを含むパスを処理する
  // Then（期待）: 正しく正規化される
  it('should normalize multiple slashes', () => {
    const result = PathUtil.normalizeSeparator('/path//to///file');
    
    expect(result).toBe('/path/to/file');
  });

  // Given（前提）: PathUtilが名前空間的にインポートされている
  // When（操作）: UNC パス（Windows ネットワークパス）を処理する
  // Then（期待）: 正しく判定される
  it('should handle UNC paths', () => {
    const result = PathUtil.isAbsolute('//server/share/file');
    
    expect(result).toBe(true);
  });
});

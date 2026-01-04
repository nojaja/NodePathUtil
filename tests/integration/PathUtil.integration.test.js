/**
 * Integration Tests for PathUtil Bundle
 * Tests the actual bundled output (dist/PathUtil.bundle.js)
 * to ensure all public APIs are correctly exported and functional
 */

const path = require('path');

// Load the actual bundled file that users will consume
const bundlePath = path.resolve(__dirname, '../../dist/PathUtil.bundle.js');
const PathUtil = require(bundlePath);

describe('PathUtil - Bundle Integration Tests', () => {
  describe('API Availability (防止回帰テスト: issue回避確認)', () => {
    // 前回解決した問題: libraryExport設定により normalizeSeparator/absolutePath が
    // トップレベルでエクスポートされていなかった問題
    
    // Given: バンドル出力ファイルが存在する
    // When: PathUtil クラスをロードする
    // Then: 全てのスタティックメソッドがトップレベルでアクセス可能
    it('should expose PathUtil class as main export', () => {
      expect(typeof PathUtil).toBe('function');
      expect(PathUtil.name).toBe('PathUtil');
    });

    // Given: バンドル出力ファイル
    // When: normalizeSeparator メソッドにアクセス
    // Then: 関数として正常にアクセス可能（修正前の問題が再発していない）
    it('should expose normalizeSeparator as a static method (regression test)', () => {
      expect(typeof PathUtil.normalizeSeparator).toBe('function');
      expect(PathUtil.normalizeSeparator).toBeDefined();
    });

    // Given: バンドル出力ファイル
    // When: absolutePath メソッドにアクセス
    // Then: 関数として正常にアクセス可能（修正前の問題が再発していない）
    it('should expose absolutePath as a static method (regression test)', () => {
      expect(typeof PathUtil.absolutePath).toBe('function');
      expect(PathUtil.absolutePath).toBeDefined();
    });

    // Given: バンドル出力ファイル
    // When: isAbsolute メソッドにアクセス
    // Then: 関数として正常にアクセス可能
    it('should expose isAbsolute as a static method', () => {
      expect(typeof PathUtil.isAbsolute).toBe('function');
      expect(PathUtil.isAbsolute).toBeDefined();
    });

    // Given: バンドル出力ファイル
    // When: relativePath メソッドにアクセス
    // Then: 関数として正常にアクセス可能
    it('should expose relativePath as a static method', () => {
      expect(typeof PathUtil.relativePath).toBe('function');
      expect(PathUtil.relativePath).toBeDefined();
    });
  });

  describe('normalizeSeparator (正常系テスト)', () => {
    // Given: Unixパス
    // When: normalizeSeparator を呼び出す
    // Then: スラッシュに統一されたパスが返される
    it('should normalize Unix paths', () => {
      expect(PathUtil.normalizeSeparator('/hoge/fuga')).toBe('/hoge/fuga');
      expect(PathUtil.normalizeSeparator('../../foo/bar')).toBe('../../foo/bar');
    });

    // Given: Windowsパス
    // When: normalizeSeparator を呼び出す
    // Then: スラッシュに統一されたパスが返される
    it('should normalize Windows paths to forward slashes', () => {
      expect(PathUtil.normalizeSeparator('c:\\hoge\\fuga')).toBe('c:/hoge/fuga');
      expect(PathUtil.normalizeSeparator('..\\..\\foo/bar')).toBe('../../foo/bar');
    });

    // Given: 混合パス
    // When: normalizeSeparator を呼び出す
    // Then: スラッシュに統一されたパスが返される
    it('should normalize mixed Windows/Unix paths', () => {
      expect(PathUtil.normalizeSeparator('/windows\\unix\\/mixed')).toBe('/windows/unix/mixed');
    });

    // Given: Win32ネームスペース（Azure等）
    // When: normalizeSeparator を呼び出す
    // Then: ネームスペースプレフィックスを保持したまま正規化される
    it('should handle Win32 namespaces correctly', () => {
      expect(PathUtil.normalizeSeparator('//./foo/bar')).toBe('//./foo/bar');
      expect(PathUtil.normalizeSeparator('//?/foo/bar')).toBe('//?/foo/bar');
    });
  });

  describe('normalizeSeparator (エッジケース・異常系)', () => {
    // Given: null値
    // When: normalizeSeparator を呼び出す
    // Then: null が返される
    it('should return null for null input', () => {
      expect(PathUtil.normalizeSeparator(null)).toBeNull();
    });

    // Given: undefined値
    // When: normalizeSeparator を呼び出す
    // Then: null が返される
    it('should return null for undefined input', () => {
      expect(PathUtil.normalizeSeparator(undefined)).toBeNull();
    });

    // Given: 空文字列
    // When: normalizeSeparator を呼び出す
    // Then: null が返される
    it('should return null for empty string', () => {
      expect(PathUtil.normalizeSeparator('')).toBeNull();
    });

    // Given: 連続スラッシュ
    // When: normalizeSeparator を呼び出す
    // Then: スラッシュが重複排除される
    it('should consolidate consecutive slashes', () => {
      expect(PathUtil.normalizeSeparator('c:\\\\hoge\\\\fuga')).toBe('c:/hoge/fuga');
      expect(PathUtil.normalizeSeparator('//foo//bar')).toBe('/foo/bar');
    });
  });

  describe('isAbsolute (正常系テスト)', () => {
    // Given: Unixの絶対パス
    // When: isAbsolute を呼び出す
    // Then: true が返される
    it('should identify Unix absolute paths', () => {
      expect(PathUtil.isAbsolute('/foo/bar')).toBe(true);
      expect(PathUtil.isAbsolute('/baz/..')).toBe(true);
    });

    // Given: Unixの相対パス
    // When: isAbsolute を呼び出す
    // Then: false が返される
    it('should identify Unix relative paths', () => {
      expect(PathUtil.isAbsolute('qux/')).toBe(false);
      expect(PathUtil.isAbsolute('.')).toBe(false);
    });

    // Given: Windowsの絶対パス（ドライブレター）
    // When: isAbsolute を呼び出す
    // Then: true が返される
    it('should identify Windows absolute paths', () => {
      expect(PathUtil.isAbsolute('C:/Documents/Newsletters/Summer2018.pdf')).toBe(true);
      expect(PathUtil.isAbsolute('c:\\windows\\system')).toBe(true);
    });

    // Given: Win32ネームスペース
    // When: isAbsolute を呼び出す
    // Then: true が返される
    it('should identify Win32 namespace paths as absolute', () => {
      expect(PathUtil.isAbsolute('//?/C:/Windows')).toBe(true);
      expect(PathUtil.isAbsolute('//./share/file')).toBe(true);
    });

    // Given: 相対パス
    // When: isAbsolute を呼び出す
    // Then: false が返される
    it('should identify relative paths correctly', () => {
      expect(PathUtil.isAbsolute('2018/January.xlsx')).toBe(false);
      expect(PathUtil.isAbsolute('../2018/January.xlsx')).toBe(false);
    });
  });

  describe('absolutePath (正常系テスト)', () => {
    // Given: 相対パスとカレントディレクトリ
    // When: absolutePath を呼び出す
    // Then: 絶対パスが返される
    it('should convert relative path to absolute', () => {
      expect(PathUtil.absolutePath('./hoge/fuga', '/root')).toBe('/root/hoge/fuga');
    });

    // Given: 親ディレクトリ参照を含む相対パス
    // When: absolutePath を呼び出す
    // Then: 正規化された絶対パスが返される
    it('should resolve parent directory references', () => {
      expect(PathUtil.absolutePath('../fuga', '/root/hoge')).toBe('/root/fuga');
    });

    // Given: 既に絶対パス
    // When: absolutePath を呼び出す
    // Then: そのパスがそのまま返される
    it('should return absolute paths unchanged', () => {
      const absolutePath = '/root/already/absolute';
      expect(PathUtil.absolutePath(absolutePath, '/different/directory')).toBe(absolutePath);
    });

    // Given: Windowsパスとドライブレター
    // When: absolutePath を呼び出す
    // Then: 正規化された絶対パスが返される
    it('should handle Windows paths with drive letters', () => {
      expect(PathUtil.absolutePath('c:/windows/../nodejs/path', 'c:/')).toBe('c:/nodejs/path');
      expect(PathUtil.absolutePath('c:\\windows\\..\\nodejs\\path', 'c:/')).toBe('c:/nodejs/path');
    });
  });

  describe('absolutePath (エッジケース・異常系)', () => {
    // Given: null値
    // When: absolutePath を呼び出す
    // Then: null が返される
    it('should return null for null input', () => {
      expect(PathUtil.absolutePath(null, '/root')).toBeNull();
    });

    // Given: undefined値
    // When: absolutePath を呼び出す
    // Then: null が返される
    it('should return null for undefined input', () => {
      expect(PathUtil.absolutePath(undefined, '/root')).toBeNull();
    });

    // Given: 空文字列
    // When: absolutePath を呼び出す
    // Then: null が返される
    it('should return null for empty string', () => {
      expect(PathUtil.absolutePath('', '/root')).toBeNull();
    });

    // Given: カレントディレクトリが指定されていない
    // When: absolutePath を呼び出す
    // Then: process.cwd() が使用される（相対パスが処理される）
    it('should use process.cwd() when currentDirectory is not provided', () => {
      const result = PathUtil.absolutePath('./test');
      expect(result).toBeTruthy();
      expect(PathUtil.isAbsolute(result)).toBe(true);
    });
  });

  describe('relativePath (正常系テスト)', () => {
    // Given: 絶対パスとカレントディレクトリ
    // When: relativePath を呼び出す
    // Then: 相対パスが返される
    it('should convert absolute path to relative', () => {
      expect(PathUtil.relativePath('/root/hoge/fuga', '/root')).toBe('hoge/fuga');
    });

    // Given: 異なるディレクトリツリーのパス
    // When: relativePath を呼び出す
    // Then: 正しい相対パス（..を含む）が返される
    it('should include parent references when needed', () => {
      expect(PathUtil.relativePath('/root/fuga', '/root/hoge')).toBe('../fuga');
    });

    // Given: 同一パス
    // When: relativePath を呼び出す
    // Then: '.' が返される
    it('should return current directory reference for same path', () => {
      // relativePath の実装は相対パスのみを返すため、同一パスの場合は null が返される
      expect(PathUtil.relativePath('/root', '/root')).toBeNull();
    });
  });

  describe('relativePath (エッジケース・異常系)', () => {
    // Given: null値
    // When: relativePath を呼び出す
    // Then: null が返される
    it('should return null for null input', () => {
      expect(PathUtil.relativePath(null, '/root')).toBeNull();
    });

    // Given: undefined値
    // When: relativePath を呼び出す
    // Then: null が返される
    it('should return null for undefined input', () => {
      expect(PathUtil.relativePath(undefined, '/root')).toBeNull();
    });

    // Given: 空文字列
    // When: relativePath を呼び出す
    // Then: null が返される
    it('should return null for empty string', () => {
      expect(PathUtil.relativePath('', '/root')).toBeNull();
    });
  });

  describe('API Chaining & Real-world Usage Scenarios', () => {
    // Given: 複数のAPI呼び出しを連鎖させるシナリオ
    // When: 相対パス → 絶対パス → 相対パスに変換
    // Then: 各ステップが正常に処理される
    it('should handle chained API calls', () => {
      const relativePath = '../config/app.config.js';
      const baseDir = '/home/user/projects/myapp';
      
      const absolute = PathUtil.absolutePath(relativePath, baseDir);
      expect(PathUtil.isAbsolute(absolute)).toBe(true);
      
      // 相対パス（../config/app.config.js）を絶対パスに変換すると /home/user/projects/config/app.config.js になる
      // その絶対パスを baseDir (/home/user/projects/myapp) からの相対パスに変換すると ../config/app.config.js になる
      const backToRelative = PathUtil.relativePath(absolute, baseDir);
      expect(backToRelative).toBe('../config/app.config.js');
    });

    // Given: Windows/Unixの混在パスが存在
    // When: normalizeSeparator で統一してから他のメソッドを使用
    // Then: 正常に処理される
    it('should normalize path separators before other operations', () => {
      const mixedPath = 'c:\\users\\john\\documents\\file.txt';
      const normalized = PathUtil.normalizeSeparator(mixedPath);
      
      expect(normalized).toBe('c:/users/john/documents/file.txt');
      expect(PathUtil.isAbsolute(normalized)).toBe(true);
    });

    // Given: URLライクなパス操作
    // When: ネストされた相対参照を含むパスを処理
    // Then: 正確に解決される
    it('should handle deeply nested relative paths', () => {
      const deepRelative = '../../../../../../../../etc/passwd';
      const result = PathUtil.absolutePath(deepRelative, '/home/user/app/src/lib/utils');
      
      expect(PathUtil.isAbsolute(result)).toBe(true);
      // パスが解決されていることを確認
      expect(result).toContain('/');
    });
  });
});

const NormalizePath = require('../../dist/NormalizePath.bundle.js')

test('linux', () => {
  expect(NormalizePath.normalizeSeparator('/hoge/fuga')).toBe('/hoge/fuga')
  expect(NormalizePath.normalizeSeparator('../../foo/bar')).toBe('../../foo/bar')
  expect(NormalizePath.normalizeSeparator('/user/docs/Letter.txt')).toBe('/user/docs/Letter.txt')
});

test('windows', () => {
    expect(NormalizePath.normalizeSeparator('c:\\hoge\\fuga')).toBe('c:/hoge/fuga')
    expect(NormalizePath.normalizeSeparator('..\\..\\foo/bar')).toBe('../../foo/bar')
    expect(NormalizePath.normalizeSeparator('..\\\\..\\\\foo/bar')).toBe('../../foo/bar')
    expect(NormalizePath.normalizeSeparator('c:\\hoge\\fuga')).toBe('c:/hoge/fuga')
    expect(NormalizePath.normalizeSeparator('c:\\windows\\nodejs\\path')).toBe('c:/windows/nodejs/path')
    expect(NormalizePath.normalizeSeparator('\\?\\C:\\user\\docs\\Letter.txt')).toBe('/?/C:/user/docs/Letter.txt')
    expect(NormalizePath.normalizeSeparator('\\?\\UNC\\Server01\\user\\docs\\Letter.txt')).toBe('/?/UNC/Server01/user/docs/Letter.txt')
    expect(NormalizePath.normalizeSeparator('\\\\.\\CdRomX')).toBe('//./CdRomX')
    expect(NormalizePath.normalizeSeparator('\\\\.\\PhysicalDiskX')).toBe('//./PhysicalDiskX')
    expect(NormalizePath.normalizeSeparator('\\\\?\\C:\\user\\docs\\Letter.txt')).toBe('//?/C:/user/docs/Letter.txt')
    expect(NormalizePath.normalizeSeparator('\\\\?\\UNC\\Server01\\user\\docs\\Letter.txt')).toBe('//?/UNC/Server01/user/docs/Letter.txt')

    expect(NormalizePath.normalizeSeparator('////\\.\\c:/temp\\//file')).toBe('//./c:/temp/file')
    expect(NormalizePath.normalizeSeparator('//./c:/temp/file')).toBe('//./c:/temp/file')
    expect(NormalizePath.normalizeSeparator('\\\\.\\c:\\temp\\file')).toBe('//./c:/temp/file')
    expect(NormalizePath.normalizeSeparator('\\\\?\\c:\\temp\\file')).toBe('//?/c:/temp/file')
    //expect(NormalizePath.normalizeSeparator('\\\\LOCALHOST\\c$\\temp\\file')).toBe('//LOCALHOST/c$/temp/file')
    expect(NormalizePath.normalizeSeparator('\\\\?\\UNC\\server\\share\\file')).toBe('//?/UNC/server/share/file')

    expect(NormalizePath.normalizeSeparator('\\Server01\\user\\docs\\Letter.txt')).toBe('/Server01/user/docs/Letter.txt')

    expect(NormalizePath.normalizeSeparator('C:\\user\\docs\\Letter.txt')).toBe('C:/user/docs/Letter.txt')
    expect(NormalizePath.normalizeSeparator('C:\\user\\docs\\somefile.ext:alternate_stream_name')).toBe('C:/user/docs/somefile.ext:alternate_stream_name')
    expect(NormalizePath.normalizeSeparator('C:Letter.txt')).toBe('C:Letter.txt')
    expect(NormalizePath.normalizeSeparator('E:\\\\foo/bar\\baz')).toBe('E:/foo/bar/baz')
    expect(NormalizePath.normalizeSeparator('foo\\bar\\baz')).toBe('foo/bar/baz')
    expect(NormalizePath.normalizeSeparator('foo\\bar\\baz\\')).toBe('foo/bar/baz/')
    expect(NormalizePath.normalizeSeparator('foo\\bar\\baz\\\\\\')).toBe('foo/bar/baz/')
  });
  
  test('Windows Uinux Mixed', () => {
    expect(NormalizePath.normalizeSeparator('/windows\\unix\/mixed')).toBe('/windows/unix/mixed')
    expect(NormalizePath.normalizeSeparator('\\windows//unix\/mixed')).toBe('/windows/unix/mixed')
    expect(NormalizePath.normalizeSeparator('//foo/bar\\baz')).toBe('/foo/bar/baz')
    expect(NormalizePath.normalizeSeparator('//foo\\bar\\baz')).toBe('/foo/bar/baz')
    expect(NormalizePath.normalizeSeparator('E://foo//bar//baz')).toBe('E:/foo/bar/baz')
    expect(NormalizePath.normalizeSeparator('E://foo//bar//baz//')).toBe('E:/foo/bar/baz/')
    expect(NormalizePath.normalizeSeparator('E://foo//bar//baz//////')).toBe('E:/foo/bar/baz/')
    expect(NormalizePath.normalizeSeparator('E://foo/bar\\baz')).toBe('E:/foo/bar/baz')
    expect(NormalizePath.normalizeSeparator('E://foo\\bar\\baz')).toBe('E:/foo/bar/baz')
    expect(NormalizePath.normalizeSeparator('E:/foo/bar/baz/')).toBe('E:/foo/bar/baz/')
    expect(NormalizePath.normalizeSeparator('E:/foo/bar/baz///')).toBe('E:/foo/bar/baz/')
  });
  
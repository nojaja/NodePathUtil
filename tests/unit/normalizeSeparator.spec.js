const PathUtil = require('../../dist/PathUtil.bundle.js')

test('Uinux', () => {
  expect(PathUtil.normalizeSeparator('/hoge/fuga')).toBe('/hoge/fuga')
  expect(PathUtil.normalizeSeparator('../../foo/bar')).toBe('../../foo/bar')
  expect(PathUtil.normalizeSeparator('/user/docs/Letter.txt')).toBe('/user/docs/Letter.txt')
  //expect(PathUtil.normalizeSeparator('//server/share/file')).toBe('//server/share/file')
  //expect(PathUtil.normalizeSeparator('\\\\server\\share\\file')).toBe('//server/share/file')
});

test('windows', () => {
    expect(PathUtil.normalizeSeparator('c:\\hoge\\fuga')).toBe('c:/hoge/fuga')
    expect(PathUtil.normalizeSeparator('..\\..\\foo/bar')).toBe('../../foo/bar')
    expect(PathUtil.normalizeSeparator('..\\\\..\\\\foo/bar')).toBe('../../foo/bar')
    expect(PathUtil.normalizeSeparator('c:\\hoge\\fuga')).toBe('c:/hoge/fuga')
    expect(PathUtil.normalizeSeparator('c:\\windows\\nodejs\\path')).toBe('c:/windows/nodejs/path')
    expect(PathUtil.normalizeSeparator('\\?\\C:\\user\\docs\\Letter.txt')).toBe('/?/C:/user/docs/Letter.txt')
    expect(PathUtil.normalizeSeparator('\\?\\UNC\\Server01\\user\\docs\\Letter.txt')).toBe('/?/UNC/Server01/user/docs/Letter.txt')
    expect(PathUtil.normalizeSeparator('\\\\.\\CdRomX')).toBe('//./CdRomX')
    expect(PathUtil.normalizeSeparator('\\\\.\\PhysicalDiskX')).toBe('//./PhysicalDiskX')
    expect(PathUtil.normalizeSeparator('\\\\?\\C:\\user\\docs\\Letter.txt')).toBe('//?/C:/user/docs/Letter.txt')
    expect(PathUtil.normalizeSeparator('\\\\?\\UNC\\Server01\\user\\docs\\Letter.txt')).toBe('//?/UNC/Server01/user/docs/Letter.txt')

    expect(PathUtil.normalizeSeparator('////\\.\\c:/temp\\//file')).toBe('//./c:/temp/file')
    expect(PathUtil.normalizeSeparator('//./c:/temp/file')).toBe('//./c:/temp/file')
    expect(PathUtil.normalizeSeparator('\\\\.\\c:\\temp\\file')).toBe('//./c:/temp/file')
    expect(PathUtil.normalizeSeparator('\\\\?\\c:\\temp\\file')).toBe('//?/c:/temp/file')
    //expect(PathUtil.normalizeSeparator('\\\\LOCALHOST\\c$\\temp\\file')).toBe('//LOCALHOST/c$/temp/file')
    expect(PathUtil.normalizeSeparator('\\\\?\\UNC\\server\\share\\file')).toBe('//?/UNC/server/share/file')

    expect(PathUtil.normalizeSeparator('\\Server01\\user\\docs\\Letter.txt')).toBe('/Server01/user/docs/Letter.txt')

    expect(PathUtil.normalizeSeparator('C:\\user\\docs\\Letter.txt')).toBe('C:/user/docs/Letter.txt')
    expect(PathUtil.normalizeSeparator('C:\\user\\docs\\somefile.ext:alternate_stream_name')).toBe('C:/user/docs/somefile.ext:alternate_stream_name')
    expect(PathUtil.normalizeSeparator('C:Letter.txt')).toBe('C:Letter.txt')
    expect(PathUtil.normalizeSeparator('E:\\\\foo/bar\\baz')).toBe('E:/foo/bar/baz')
    expect(PathUtil.normalizeSeparator('foo\\bar\\baz')).toBe('foo/bar/baz')
    expect(PathUtil.normalizeSeparator('foo\\bar\\baz\\')).toBe('foo/bar/baz/')
    expect(PathUtil.normalizeSeparator('foo\\bar\\baz\\\\\\')).toBe('foo/bar/baz/')
  });
  
  test('Windows Uinux Mixed', () => {
    expect(PathUtil.normalizeSeparator('/windows\\unix\/mixed')).toBe('/windows/unix/mixed')
    expect(PathUtil.normalizeSeparator('\\windows//unix\/mixed')).toBe('/windows/unix/mixed')
    expect(PathUtil.normalizeSeparator('//foo/bar\\baz')).toBe('/foo/bar/baz')
    expect(PathUtil.normalizeSeparator('//foo\\bar\\baz')).toBe('/foo/bar/baz')
    expect(PathUtil.normalizeSeparator('E://foo//bar//baz')).toBe('E:/foo/bar/baz')
    expect(PathUtil.normalizeSeparator('E://foo//bar//baz//')).toBe('E:/foo/bar/baz/')
    expect(PathUtil.normalizeSeparator('E://foo//bar//baz//////')).toBe('E:/foo/bar/baz/')
    expect(PathUtil.normalizeSeparator('E://foo/bar\\baz')).toBe('E:/foo/bar/baz')
    expect(PathUtil.normalizeSeparator('E://foo\\bar\\baz')).toBe('E:/foo/bar/baz')
    expect(PathUtil.normalizeSeparator('E:/foo/bar/baz/')).toBe('E:/foo/bar/baz/')
    expect(PathUtil.normalizeSeparator('E:/foo/bar/baz///')).toBe('E:/foo/bar/baz/')
  });
  
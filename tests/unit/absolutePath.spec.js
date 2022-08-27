const PathUtil = require('../../dist/PathUtil.bundle.js')

test('1', () => {
  expect(PathUtil.absolutePath('./hoge/fuga', '/root')).toBe('/root/hoge/fuga')
});

test('2', () => {
  expect(PathUtil.absolutePath('../fuga', '/root/hoge')).toBe('/root/fuga')
});
test('3', () => {
  expect(PathUtil.absolutePath('c:/windows/../nodejs/path', '')).toBe('c:/nodejs/path')
  expect(PathUtil.absolutePath('c:\\windows\\..\\nodejs\\path')).toBe('c:/nodejs/path')
});
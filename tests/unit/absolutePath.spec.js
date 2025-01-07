const NormalizePath = require('../../dist/NormalizePath.bundle.js')

test('1', () => {
  expect(NormalizePath.absolutePath('./hoge/fuga', '/root')).toBe('/root/hoge/fuga')
});

test('2', () => {
  expect(NormalizePath.absolutePath('../fuga', '/root/hoge')).toBe('/root/fuga')
  });
  
test('3', () => {
  expect(NormalizePath.absolutePath('c:/windows/../nodejs/path', 'c:/')).toBe('c:/nodejs/path')
  expect(NormalizePath.absolutePath('c:\\windows\\..\\nodejs\\path', 'c:/')).toBe('c:/nodejs/path')
});
const NormalizePath = require('../../dist/NormalizePath.bundle.js')

test('1', () => {
  expect(NormalizePath.absolutePath('./hoge/fuga','/root')).toBe('/root/hoge/fuga')
});

test('2', () => {
  expect(NormalizePath.absolutePath('../fuga','/root/hoge')).toBe('/root/fuga')
  });
  
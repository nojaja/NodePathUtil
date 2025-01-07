const NormalizePath = require('../../dist/NormalizePath.bundle.js')

test('1', () => {
  expect(NormalizePath.relativePath('/root/hoge/fuga','/root')).toBe('hoge/fuga')
});

test('2', () => {
  expect(NormalizePath.relativePath('/root/fuga','/root/hoge')).toBe('../fuga')
  });
  
const PathUtil = require('../../dist/PathUtil.bundle.js')

test('1', () => {
  expect(PathUtil.relativePath('/root/hoge/fuga','/root')).toBe('hoge/fuga')
});

test('2', () => {
  expect(PathUtil.relativePath('/root/fuga','/root/hoge')).toBe('../fuga')
  });
  
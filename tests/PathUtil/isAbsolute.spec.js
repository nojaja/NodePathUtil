const PathUtil = require('../../dist/PathUtil.bundle.js')

test('linux', () => {
  expect(PathUtil.isAbsolute('/foo/bar')).toBe(true)
  expect(PathUtil.isAbsolute('/baz/..')).toBe(true)
  expect(PathUtil.isAbsolute('qux/')).toBe(false)
  expect(PathUtil.isAbsolute('.')).toBe(false)
});
test('windows', () => {
  expect(PathUtil.isAbsolute('C:/Documents/Newsletters/Summer2018.pdf')).toBe(true)
  expect(PathUtil.isAbsolute('/Program Files/Custom Utilities/StringFinder.exe')).toBe(true)
  expect(PathUtil.isAbsolute('2018/January.xlsx')).toBe(false)
  expect(PathUtil.isAbsolute('../2018/January.xlsx')).toBe(false)
  expect(PathUtil.isAbsolute('./2018/January.xlsx')).toBe(false)
  expect(PathUtil.isAbsolute('C:/Projects/apilibrary/apilibrary.sln')).toBe(true)
  expect(PathUtil.isAbsolute('C:Projects/apilibrary/apilibrary.sln')).toBe(false)
});

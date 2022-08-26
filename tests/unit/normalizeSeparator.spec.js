const NormalizePath = require('../../dist/NormalizePath.bundle.js')

test('linux', () => {
  expect(NormalizePath.normalizeSeparator('/hoge/fuga')).toBe('/hoge/fuga')
});

test('windows', () => {
    expect(NormalizePath.normalizeSeparator('c:\\hoge\\fuga')).toBe('c:/hoge/fuga')
  });
  
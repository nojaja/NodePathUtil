module.exports = {
    verbose: true ,
    transform: {
      '^.+\\.(js|ts)$'  : 'babel-jest'
    },
    testMatch: [
      '**/tests/**/*.spec.(js|jsx|ts|tsx)',
      '**/test/unit/**/*.test.(js|jsx|ts|tsx)',
      '**/__tests__/*.(js|jsx|ts|tsx)'
    ]
  }
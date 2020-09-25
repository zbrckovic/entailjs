module.exports = {
  rootDir: 'src',
  testEnvironment: 'node',
  modulePaths: ['<rootDir>/'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    './src/parsers/peg/grammar.js'
  ],
  coverageDirectory: '../docs/coverage'
}

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePaths: ['<rootDir>/src'],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        './src/parsers/peg/grammar.js'
    ]
}

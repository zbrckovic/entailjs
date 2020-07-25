module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        targets: {
          esmodules: true
        },
        corejs: 3,
        modules: false
      }
    ],
    '@babel/preset-typescript'
  ]
}

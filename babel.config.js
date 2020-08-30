module.exports = api => {
  const isTest = api.env('test')

  const presetEnv = isTest
    ? [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
    : [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3,
        targets: {
          esmodules: true
        },
        modules: false
      }
    ]

  return { presets: [presetEnv] }
}

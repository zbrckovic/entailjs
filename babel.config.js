module.exports = api => {
  const isTest = api.env('test')

  if (isTest) {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'entry',
            corejs: 3,
          }
        ],
        '@babel/preset-typescript'
      ]
    }
  }

  return {
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
}

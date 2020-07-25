const path = require('path')

module.exports = (options = {}) => {
  const development = Boolean(options.development)

  return {
    mode: development ? 'development' : 'production',
    entry: './src/index.ts',
    resolve: {
      extensions: ['.js', '.ts'],
      modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'entail-core.js',
      library: 'entailCore',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    externals: ['immutable'],
    optimization: {
      runtimeChunk: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ]
    }
  }
}

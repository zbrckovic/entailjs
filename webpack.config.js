const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const SRC_DIR = path.resolve(__dirname, 'node_modules')
const DIST_DIR = path.resolve(__dirname, 'dist')
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules')


module.exports = (options = {}) => {
  const development = Boolean(options.development)

  return {
    mode: development ? 'development' : 'production',
    entry: './src/index.ts',
    resolve: {
      extensions: ['.js', '.ts'],
      modules: [NODE_MODULES_DIR, SRC_DIR]
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
    output: {
      path: DIST_DIR,
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

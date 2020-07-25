const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const SRC_DIR = path.resolve(__dirname, 'node_modules')
const LIB_DIR = path.resolve(__dirname, 'lib')
const NODE_MODULES_DIR = path.resolve(__dirname, 'node_modules')

var LIBRARY_NAME = 'theoremCore'
var OUTPUT_FILE = LIBRARY_NAME + '.js'

module.exports = (options = {}) => {
  return {
    mode: 'development',
    entry: './src/index.ts',
    resolve: {
      extensions: ['.js', '.ts'],
      modules: [NODE_MODULES_DIR, SRC_DIR]
    },
    plugins: [new CleanWebpackPlugin()],
    output: {
      path: LIB_DIR,
      filename: OUTPUT_FILE,
      library: LIBRARY_NAME,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    devtool: 'source-map',
    externals: {
      immutable: {
        commonjs: 'immutable',
        commonjs2: 'immutable',
        amd: 'immutable'
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    }
  }
}

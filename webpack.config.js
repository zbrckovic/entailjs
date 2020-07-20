const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
        library: 'entail-core'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: [path.resolve(__dirname, './node_modules'), path.resolve(__dirname, './src')]
    },
    externals: {
        immutable: {
            commonjs: 'immutable',
            commonjs2: 'immutable',
            amd: 'immutable'
        }

    },
    optimization: {
        runtimeChunk: true
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}

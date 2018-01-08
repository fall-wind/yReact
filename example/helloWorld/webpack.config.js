const webpack = require('webpack')
const path = require('path')
const rootPath = path.resolve(__dirname)
const ROOT_PATH = path.resolve(__dirname)

const config = {
    entry: path.resolve(__dirname, 'index.js'),
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            // '_containers': path.join(rootPath, "./src/containers"),
            // '_util': path.join(rootPath, "./src/util")
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     enforce: "pre",
            //     loader: "eslint-loader",
            //     exclude: /node_modules/,
            //     options: {
            //         emitWarning: true,
            //         emitError: false,
            //         //failOnWarning: false,
            //         //failOnError: true,
            //         useEslintrc: false,
            //         configFile: path.join(__dirname, ".eslintrc")
            //     }
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ],     
    },
}

module.exports = config
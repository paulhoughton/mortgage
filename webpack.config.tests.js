var path = require('path');
var webpack = require('webpack');
var TapWebpackPlugin = require('tap-webpack-plugin');

module.exports = {
    name: 'test',
    target: 'node',
    entry: ['./tests/'],
    output: {
        path: 'build',
        filename: 'tests.js'
    },
    plugins: [
                new webpack.ProvidePlugin({ 'React': 'react', 'test':'tape'}),
                new TapWebpackPlugin()
             ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: { 'presets': ['react', 'es2015', 'stage-0'] }
        }]
    }
};
"use strict";

// Modified from https://github.com/photonstorm/phaser3-plugin-template

const webpack = require("webpack");

module.exports = {

    context: `${__dirname}/src/`,

    devtool: "source-map",

    mode: "development",

    entry: {
        CartesianSystemPlugin: "./CartesianSystemPlugin.js",
    },

    output: {
        path: `${__dirname}/dist/`,
        filename: "[name].js",
        library: "CartesianSystemPlugin",
        libraryTarget: "umd",
        sourceMapFilename: '[file].map',
        umdNamedDefine: true
    },

    devtool: 'source-map'
};
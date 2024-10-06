const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

module.exports = merge(commonConfig, {
	mode: 'production',
	output: {
		filename: '[name].[contenthash].js', // Cache-busting filenames
		path: path.resolve(__dirname, '../dist'),
		clean: true, // Cleans the /dist folder on every build
	},
	optimization: {
		minimize: true, // Enables minification
		splitChunks: {
			chunks: 'all', // Splits vendor and common modules
		},
	},
});

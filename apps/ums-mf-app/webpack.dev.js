const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

module.exports = merge(commonConfig, {
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, '../dist'),
		},
		port: 3006,
		hot: true,
	},
	devtool: 'inline-source-map',
});

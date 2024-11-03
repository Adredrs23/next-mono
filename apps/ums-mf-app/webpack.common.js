const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
	entry: './index.ts',
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: 'auto',
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new ModuleFederationPlugin({
			name: 'mfApp',
			filename: 'remoteEntry.js',
			exposes: {
				'./Button': './src/Button',
				'./Images': './src/Images',
			},
			remotes: {
				mfShell: 'mfShell@http://localhost:3005/remoteEntry.js',
			},
			shared: {
				react: { singleton: true, requiredVersion: deps.react },
				'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
			},
		}),
	],
};

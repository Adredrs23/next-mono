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
		new HtmlWebpackPlugin({
			template: './public/silent-check-sso.html',
			filename: 'silent-check-sso.html', // Output filename
		}),
		new ModuleFederationPlugin({
			name: 'mfShell',
			filename: 'remoteEntry.js',
			remotes: {
				mfApp: 'mfApp@http://localhost:3006/remoteEntry.js',
			},
			exposes: {
				'./ErrorBoundary': './src/ErrorBoundary',
			},
			shared: {
				react: { singleton: true, requiredVersion: deps.react },
				'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
			},
		}),
	],
};

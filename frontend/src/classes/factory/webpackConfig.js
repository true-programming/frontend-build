import webpackBaseConfig from '../../config/webpack.config';
import path from "path";

export class WebpackConfig {
	constructor(_buildConfig = {}, _sitesConfigPath = '', _mode = 'production') {
		this.config = _buildConfig;
		this.siteConfigPath = _sitesConfigPath;
		this.mode = _mode;
	}

	build() {
		let webpackConfig = webpackBaseConfig;
		const webpackSiteConfig = this.configFromSiteConfig(this.config);
		const merge = require('webpack-merge');

		webpackConfig = merge.merge(webpackConfig, webpackSiteConfig);

		return webpackConfig;
	}

	configFromSiteConfig() {
		let publicPath = 'auto';
		if (this.config.path.public) {
			publicPath = this.config.path.public;
		}
		return {
			output: {
				filename: '[name].js',
				chunkFilename: 'chunk.[contenthash].js',
				library: {
					name: this.config.filename.main,
					type: 'umd'
				},
				umdNamedDefine: false,
				path: path.resolve(this.siteConfigPath, this.config.path.target),
				publicPath: publicPath
			},
			mode: this.mode,
			entry: [`${path.resolve(this.siteConfigPath, this.config.path.source)}/${this.config.filename.main}.js`],
			optimization: {
				splitChunks: {
					cacheGroups: {
						commons: {
							test  : /[\\/]node_modules[\\/]/,
							name  : this.config.filename.commonVendor,
							chunks: 'all'
						}
					}
				}
			},
		};
	}
}

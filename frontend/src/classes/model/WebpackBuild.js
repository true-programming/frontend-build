import webpack from 'webpack';
import {WebpackConfig} from "../factory/webpackConfig";
import {clearPath} from "../util/clearPath";
import {Notification} from "../util/notification";

export class WebpackBuild {
	constructor(_siteConfigPath, _buildConfig, _mode) {
		this.siteConfigPath = _siteConfigPath;
		this.config = _buildConfig;
		this.mode = _mode;
	}

	build() {
		let clearPathClass = new clearPath(this.siteConfigPath);
		clearPathClass.clear(this.config.path.target)

		const webpackConfig = new WebpackConfig(this.config, this.siteConfigPath, this.mode).build();
		const webpackCompiler = webpack(webpackConfig);

		webpackCompiler.run((err, stats) => {
			Notification.taskInfo('Process JavaScript file(s)');

			if (err) {
				Notification.error('JS build failed', err.stack || err);
				if (err.details) {
					Notification.error('JS build failed', err.details);
				}
				return;
			}

			if (stats.hasErrors()) {
				Notification.error('JS build failed', stats.toString({
					chunks: false,
					colors: true
				}));
				process.exit(1);
			}

			const info = stats.toJson();
			if (stats.hasWarnings()) {
				Notification.warn(info.warnings);
			}

			Notification.log(stats.toString({
				chunks: false,
				colors: true
			}));

			webpackCompiler.close((closeErr) => {
				// ...
			});
		});
	}
}

import {siteRepository} from './classes/util/siteRepository';
import {scssBuild} from './classes/model/ScssBuild';
import {Notification} from "./classes/util/notification";
import {WebpackBuild} from "./classes/model/WebpackBuild";

export function build(args) {
	const sites = siteRepository(args);
	const sitesConfigPath = args.sitesConfigPath;
	const mode = args.mode ? args.mode : 'production';

	for (const [key, site] of sites) {
		Notification.title('Starting frontend build for site ' + key);

		if (site.hasScss()) {
			let scss = new scssBuild(sitesConfigPath, site.config.scss);
			scss.build()
		}

		if (site.hasJs()) {
			const webpackBuild = new WebpackBuild(sitesConfigPath, site.config.webpack, mode);
			webpackBuild.build();
		}

		Notification.space();
	}
}

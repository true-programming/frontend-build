import fs from 'fs';
import { Notification } from "./notification";
import { SiteConfig } from '../model/SiteConfig';

export function siteRepository(args) {
	const sites = new Map();
	const sitesConfigPath = args.sitesConfigPath;

	if (!sitesConfigPath || !fs.existsSync(sitesConfigPath)) {
		Notification.error('missing site build config');
		return sites;
	}

	fs.readdirSync(
		sitesConfigPath,
		{ withFileTypes: true }
	).forEach((file) => {
		const config = require(`${sitesConfigPath}/${file.name}`);
		sites.set(config.name, new SiteConfig(config, file.name));
	});

	return sites;
}

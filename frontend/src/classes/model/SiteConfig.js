export class SiteConfig {
	constructor(config = {}, filename = '') {
		this.config = config;
		this.filename = filename;
	}

	hasJs() {
		return this.config.webpack && Object.keys(this.config.webpack).length > 0
	}

	hasScss() {
		return this.config.scss && Object.keys(this.config.scss).length > 0
	}
}

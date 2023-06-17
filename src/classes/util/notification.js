import chalk from 'chalk';

const bold = chalk.bold;
const success = chalk.bold.green;
const warn = chalk.bold.yellow;
const error = chalk.bold.red;
const blue = chalk.bold.blue;
const title = chalk.bgGreen.bold;

export class Notification {
	constructor() {}

	static log(msg = '') {
		if (msg.length > 0) {
			console.log(msg);
		}
	}

	static bold(msg = '') {
		if (msg.length > 0) {
			console.log(bold(msg));
		}
	}

	static warn(msg = '') {
		if (msg.length > 0) {
			console.warn(warn(`Warning: ${msg}`));
		}
	}

	static success(msg = '') {
		if (msg.length > 0) {
			console.log(success(`Success: ${msg}`));
		}
	}

	static error(msg = '', e) {
		if (msg.length > 0) {
			console.error(error(`Error: ${msg}`));
		}
		if (e) {
			console.error(e);
		}
	}

	static taskInfo(msg = '') {
		if (msg.length > 0) {
			let notification = `${msg}`;

			console.log(notification);
			console.log('------------------------');
		}
	}

	static title(msg = '') {
		if (msg.length > 0) {
			console.log(title(msg));
		}
	}

	static space() {
		console.log();
		console.log();
	}
}

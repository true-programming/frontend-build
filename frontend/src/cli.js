import minimist from 'minimist';
import { build } from './build';
import path from "path";

const DEFAULT_CONFIG_PATH = './sites';

export function cli(argsArray) {
	const args = minimist(argsArray.slice(2));
	let cmd = args._[0] || 'help';

	if (!args.sitesConfigPath) {
		args.sitesConfigPath = DEFAULT_CONFIG_PATH;
	}

	args.sitesConfigPath = path.resolve(process.env.INIT_CWD, args.sitesConfigPath);

	switch (cmd) {
		case 'build':
			build(args);
			break;

		default:
			console.error(`"${cmd}" is not a valid command!`);
			break;
	}
}

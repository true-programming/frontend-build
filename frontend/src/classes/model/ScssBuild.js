import sass from 'sass';
import path from "path";
import fs from 'fs';
import chalk from "chalk";
import size from "filesize";
import postcss from "postcss";
import {Notification} from "../util/notification";
import {clearPath} from "../util/clearPath";
import CleanCSS from "clean-css";

const getDirName = path.dirname;
const success = chalk.bold.green;
const error = chalk.bold.red;

const reflect = p => p.then(v => ({v, status: "fulfilled"}),
	e => ({e, status: "rejected"}));

export class scssBuild {
	constructor(_configPath, _buildConfig) {
		this.configPath = _configPath;
		this.config = _buildConfig;
		this.processed = [];
	}

	build() {
		let clearPathClass = new clearPath(this.configPath);
		clearPathClass.clear(this.config.publicPath)

		Notification.taskInfo('Process SCSS file(s)');
		for (const [dest, src] of Object.entries(this.config.files)) {
			this.processFile(
				path.resolve(this.configPath, src),
				path.resolve(this.configPath, dest)
			);
		}

		this.processed.forEach(function (item) {
			let stats = fs.statSync(item.dest);
			item.message += ' (' + size(stats.size) + ')';
			console.log(item.message);
		});
	}

	async processFile(_src, _dest) {
		const targetFileName = path.basename(_dest);

		this.setProcessed(targetFileName, `${success(targetFileName)}`, _dest);

		if (!fs.existsSync(_src)) {
			this.setProcessed(targetFileName, `${error(targetFileName)} failed (src file not present)`, _dest);
			return;
		}

		if (!fs.existsSync(getDirName(_dest))) {
			fs.mkdirSync(getDirName(_dest), {recursive: true});
		}

		let result;

		try {
			result = sass.renderSync({
				file: _src,
				style: 'compressed'
			});
		} catch (e) {
			Notification.error('Css build failed: ' + _dest);
			process.exit(1);
		}

		this.writeCssFile(result, _dest);
	}

	writeCssFile(result, _dest) {
		let postCssProcessors = [];

		if (this.config.options.autoPrefix && this.config.options.autoPrefix === true) {
			postCssProcessors.push(
				require('autoprefixer')()
			);
		}

		let processedCss = postcss(postCssProcessors).process(result.css.toString()).css;

		if (this.config.options.minify && this.config.options.minify === true) {
			processedCss = new CleanCSS().minify(processedCss).styles;
		}

		fs.writeFileSync(_dest, processedCss);

		if (!fs.existsSync(_dest)) {
			Notification.error('Css build failed: ' + _dest);
			process.exit(1);
		}
	}

	setProcessed(fileName, message, dest) {
		let object = {
			fileName: fileName,
			message: message,
			dest: dest,
		};
		this.processed.push(object);
	}
}

import path from "path";
import fs from 'fs';
import {Notification} from "./notification";

export class clearPath {
	constructor(_basePath) {
		this.basePath = _basePath;
	}

	clear(_clearPath) {
		if (this.basePath === '' || _clearPath === '') {
			return;
		}

		const pathToClear = path.resolve(this.basePath, _clearPath);

		if (!fs.existsSync(pathToClear)) {
			fs.mkdirSync(pathToClear, {recursive: true});
		}

		fs.readdirSync(pathToClear).forEach((file) => {
			fs.unlinkSync(path.resolve(this.basePath, `${_clearPath}/${file}`), (err) => {
				if (err) {
					Notification.error(err);
					throw err;
				}
			});
		});
	}
}

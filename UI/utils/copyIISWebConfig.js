const fs = require('fs-extra');

const webConfigPath = __dirname + '/../build/web.config';

if (fs.existsSync(webConfigPath)) {
  fs.unlinkSync(webConfigPath);
}

fs.copySync(__dirname + '/../public/web.config', webConfigPath);

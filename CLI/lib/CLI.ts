import * as program from "commander";
import * as chalk from "chalk";
import { isFileExists, writeFile } from './utils/config';
import { configPath, packageJson } from "./utils/const";
import { login } from "./modules/login";
import { addNote } from "./modules/addNote";

let config: any = {
    firstLogin: true,
    username: '',
    password: '',
};

program
    .version(packageJson.version)
    .description('Daily-app CLI')
    .command('help', '')
    .action(() => {
        program.help();
    });

program
    .command('note')
    .option('-a, --add', 'add note')
    .option('-r, --reset', 'resets all config values to default')
    .action(async (options: any) => {
        try {
            if (!isFileExists(configPath)) {
                await writeFile(config, configPath);
            }
            const savedConfig = require("../config.json");
            if (options.reset) {
                await writeFile(config, configPath);
                console.log(chalk.green(
                    '\nSuccessfully reset to default values! Please run "DailyCli note" to start over.\n'));
            }
            if (options.add) {
                await login(savedConfig, config);
                await addNote();
            }
            process.exit(0);
        } catch (error) {
            console.error(chalk.red('\n' + error.toString() + '\n'));
            process.exit(0);
        }
    });

program.parse(process.argv);

if (!program.args.length) {
    program.help();
}


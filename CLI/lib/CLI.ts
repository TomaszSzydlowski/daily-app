import * as program from "commander";
import * as chalk from "chalk";

import { isFileExists, decryptCredentials, encryptCredentials, writeFile } from './utils/config';
import inquirer = require("inquirer");

const configPath = "./config.json";
const packageJson = require('../package.json');
const loginText: string = '\nPlease wait! Logging...\n';

let config: any = {
    firstLogin: true,
    save: false,
    username: '',
    password: '',
    jwt: '',
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
            } else {
                let credentials: any;
                if (savedConfig.firstLogin === true) {
                    console.log('\n');
                    credentials = await inquirer.prompt([
                        {
                            message: 'Please enter your username:',
                            name: 'username',
                            type: 'input',
                        },
                        {
                            message: 'Please enter your password:',
                            name: 'password',
                            mask: '*',
                            type: 'password',
                        },
                    ]);
                    encryptCredentials(config, credentials);
                    config.firstLogin = false;
                    //TODO
                }
                else {
                    const savedCredentials: any = {};
                    decryptCredentials(savedConfig, savedCredentials);
                    console.log(chalk.yellowBright(loginText));
                    //TODO
                    // config = await Wisher.login(savedCredentials, config, savedConfig); // get jwt
                }

            }
            await writeFile(config, configPath);
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

import * as chalk from "chalk";
import * as authService from '../services/authService';
import { decryptCredentials, encryptCredentials, writeFile } from '../utils/config';
import inquirer = require("inquirer");
import { configPath } from "../utils/const";

const loginText: string = '\nPlease wait! Logging...\n';

export const login = async (savedConfig: any, config: any) => {
  let credentials: any;
  let jwt: string = "";
  let attempt = 0;
  const limit = 3;

  while (jwt === "" && attempt < limit) {
    try {
      if (savedConfig.firstLogin === true) {
        credentials = await inquirer.prompt([
          {
            message: 'Please enter your username:',
            name: 'email',
            type: 'input',
          },
          {
            message: 'Please enter your password:',
            name: 'password',
            mask: '*',
            type: 'password',
          },
        ]);
        console.log(chalk.yellowBright(loginText));
        jwt = await authService.login(credentials);
        let saveOption: any = await inquirer.prompt([
          {
            message: "Would you like to save your credential?",
            name: 'shouldSave',
            type: 'confirm',
            default: false,
          }
        ]);
        if (saveOption.shouldSave) {
          config.firstLogin = false;
          encryptCredentials(config, credentials);
          await writeFile(config, configPath);
        }
      }
      else {
        const savedCredentials: any = {};
        decryptCredentials(savedConfig, savedCredentials);
        console.log(chalk.yellowBright(loginText));
        jwt = await authService.login(savedCredentials);
      }
      console.log(chalk.green('Successfully login.\n'));
    } catch (error) {
      if (error.response.status === 401) {
        console.log(chalk.red('Incorrect email or password. Try again.\n'))
        attempt++;
      }
      else {
        console.log(chalk.red("Something went wrong."))
      }
    }
  }
  if (attempt === limit) {
    console.log(chalk.red('To many attemps.'))
    process.exit(0);
  }
}
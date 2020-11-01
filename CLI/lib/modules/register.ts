
import * as chalk from "chalk";
import * as authService from '../services/authService';
import inquirer = require("inquirer");

const registerText: string = '\nRegister new user...\n';

export const register = async () => {
  let credentials: any;
  let isPasswordMatch: boolean = false;
  console.log(chalk.yellowBright(registerText));
  try {
    while (!isPasswordMatch) {
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
        {
          message: 'Please confirm your password:',
          name: 'confirmpassword',
          mask: '*',
          type: 'password',
        },
      ])
      isPasswordMatch = credentials.password === credentials.confirmpassword;
      if (!isPasswordMatch) {
        console.log(chalk.red("The password does not match. Try again."))
      }
    }
    await authService.register(credentials.email, credentials.password);
    console.log(chalk.green('Successfully register.\n'));
  } catch (error) {
    console.log(chalk.red("Something went wrong."))
  }
}
import { decrypt, encrypt } from './crypto';
import * as chalk from "chalk";
import * as fs from 'fs';
import { promisify } from 'util';

export const writeFileAsync = promisify(fs.writeFile.bind(fs));

/**
 * @param  {any} file
 */
export async function writeFile(file: any, path: string) {
  try {
    await writeFileAsync(path, JSON.stringify(file, null, 4));
  } catch (Exception) {
    console.error(
      chalk.red('\nFailed to update config.json file! Most likely due to below reason: ') + '\n' +
      Exception.toString());
  }
}

export function isFileExists(path: string): boolean {
  try {
    if (fs.existsSync(path)) {
      return true;
    }
    return false;
  }
  catch (error) {
    return false
  }
}

/**
 * @param  {any} answers
 */
export function encryptCredentials(config: any, answers: any) {
  try {
    config.username = encrypt(answers.username);
    config.password = encrypt(answers.password);
  } catch (Exception) {
    throw new Error(Exception);
  }
}

/**
 * @param  {any} answers
 */
export function decryptCredentials(config: any, answers: any) {
  try {
    answers.username = decrypt(config.username);
    answers.password = decrypt(config.password);
  } catch (Exception) {
    throw new Error(Exception);
  }
}


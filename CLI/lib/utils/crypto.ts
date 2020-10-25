import * as crypto from 'crypto';
const cliSettings = require("../../cliSettings.json");

/**
 * @param  {string} text
 */
export function encrypt(text: string) {
  const { alg, key, iv } = cliSettings;
  const cipher = crypto.createCipheriv(alg, key, iv);
  let crypted = cipher.update(text, 'utf8', 'binary');
  crypted += cipher.final('binary');
  return crypted;
}
/**
 * @param  {string} text
 */
export function decrypt(text: string) {
  const { alg, key, iv } = cliSettings;
  const decipher = crypto.createDecipheriv(alg, key, iv);
  let deciphered = decipher.update(text, 'binary', 'utf8');
  deciphered += decipher.final('utf8');
  return deciphered;
}
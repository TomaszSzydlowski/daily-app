import chalk = require("chalk");
import inquirer = require("inquirer");
import { INote } from "../interfaces/INote";
import * as noteService from "../services/noteService";

export async function addNote() {
  let note: INote = await inquirer.prompt([
    {
      message: 'Please type your note:',
      name: 'content',
      type: 'input',
    },
    {
      message: 'Please select project:',
      name: 'projectId',
      type: 'input',
      default: 2
    },
    {
      message: 'Please select date:',
      name: 'date',
      type: 'input',
      default: new Date().toJSON()
    },
  ]);
  const response = await noteService.saveNote(note);
  console.log(chalk.green(`\nSuccessfully added a note at ${new Date(response.createdAt).toLocaleDateString('en-GB')}`));
}
import chalk = require("chalk");
import inquirer = require("inquirer");
import { INote } from "../interfaces/INote";
import * as noteService from "../services/noteService";
import * as projectService from "../services/projectService";

export async function addNote() {
  const projects = await projectService.getProjects();
  let noteAnswear = await inquirer.prompt([
    {
      message: 'Please type your note:',
      name: 'content',
      type: 'input',
    },
    {
      message: 'Please select project:',
      name: 'projectName',
      type: "list",
      choices: projects.map(p => { return p.name })
    },
    {
      message: 'Please select date:',
      name: 'date',
      type: 'input',
      default: new Date().toJSON()
    },
  ]);
  const note: INote = {
    content: noteAnswear.content,
    date: noteAnswear.date,
    projectId: projects.find(p => p.name == noteAnswear.projectName).id
  }

  const response = await noteService.saveNote(note);
  console.log(chalk.green(`\nSuccessfully added a note at ${new Date(response.createdAt).toLocaleDateString('en-GB')}`));
}
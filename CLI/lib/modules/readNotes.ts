import chalk = require("chalk");
import inquirer = require("inquirer")
import * as noteService from '../services/noteService'
import * as projectService from '../services/projectService'

export const readNotes = async () => {
  const notesDate = await noteService.getNotesDate();
  const readOptionAnswear = await inquirer.prompt([{
    message: 'Please select date',
    name: "noteDate",
    type: 'list',
    choices: notesDate
  }])

  const notesResponse = await noteService.getNotesByDate(readOptionAnswear.noteDate);
  const projectIds = notesResponse.map(p => { return p.projectId }).filter((v, i, id) => id.indexOf(v) === i)
  const projects = await projectService.getProjectsByIds(projectIds);

  const notesWithProject = notesResponse.map((note) => {
    return {
      id: note.id,
      content: note.content,
      date: note.date,
      projectName: projects.find((p) => p.id === note.projectId).name
    }
  });

  showBeautifyNotes(notesWithProject);
}

const showBeautifyNotes = (notes) => {
  console.log("\n");
  for (const note of notes) {
    console.log(chalk.blue("#" + note.projectName))
    console.log(chalk.yellow(note.date));
    console.log(chalk.gray(note.id));
    console.log(chalk.green(note.content));
    console.log("\n");
  }
}
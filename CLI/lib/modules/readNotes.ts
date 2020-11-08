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

  console.log(notesWithProject);
}
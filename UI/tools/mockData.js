const notes = [
  {
    id: '"7f645525-d855-4c27-9428-ac2f8fabef91"',
    date: '2020-10-11T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: "7f645525-d855-4c27-9428-ac2f8fabef91"
  },
  {
    id: '"145e5b5f-2300-4430-a59b-d97d9a899ec8"',
    date: '2020-10-10T09:19:00.000Z',
    content: 'Secur2ing React Apps with Auth0',
    projectId: "7f645525-d855-4c27-9428-ac2f8fabef91"
  },
  {
    id: '3',
    date: '2020-10-09T09:19:00.000Z',
    content: 'Securin3g React Apps with Auth0',
    projectId: "7f645525-d855-4c27-9428-ac2f8fabef91"
  },
  {
    id: '4',
    date: '2020-10-08T09:19:00.000Z',
    content: 'Secur4ing React Apps with Auth0',
    projectId: "7f645525-d855-4c27-9428-ac2f8fabef91"
  },
  {
    id: '5',
    date: '2020-10-07T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: "7f645525-d855-4c27-9428-ac2f8fabef91"
  },
  {
    id: '6',
    date: '2020-10-07T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: "7f645525-d855-4c27-9428-ac2f8fabef91"
  },
  {
    id: '7',
    date: '2020-10-06T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: "145e5b5f-2300-4430-a59b-d97d9a899ec8"
  },
  {
    id: '8',
    date: '2020-10-05T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: "145e5b5f-2300-4430-a59b-d97d9a899ec8"
  },
  {
    id: 'k9',
    date: '2020-10-04T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: "145e5b5f-2300-4430-a59b-d97d9a899ec8"
  },
  {
    id: '10',
    date: '2020-10-03T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: "145e5b5f-2300-4430-a59b-d97d9a899ec8"
  }
];

const projects = [ { id: "7f645525-d855-4c27-9428-ac2f8fabef91", name: 'Home' }, { id: "145e5b5f-2300-4430-a59b-d97d9a899ec8", name: 'Work' } ];

const newNote = {
  id: null,
  content: '',
  date: '',
  projectId: "7f645525-d855-4c27-9428-ac2f8fabef91"
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newNote,
  notes,
  projects
};

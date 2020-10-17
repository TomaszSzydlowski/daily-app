const notes = [
  {
    id: '1',
    date: '2020-10-11T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '2',
    date: '2020-10-10T09:19:00.000Z',
    content: 'Secur2ing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '3',
    date: '2020-10-09T09:19:00.000Z',
    content: 'Securin3g React Apps with Auth0',
    projectId: 1
  },
  {
    id: '4',
    date: '2020-10-08T09:19:00.000Z',
    content: 'Secur4ing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '5',
    date: '2020-10-07T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '6',
    date: '2020-10-07T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '7',
    date: '2020-10-06T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  },
  {
    id: '8',
    date: '2020-10-05T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  },
  {
    id: 'k9',
    date: '2020-10-04T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  },
  {
    id: '10',
    date: '2020-10-03T09:19:00.000Z',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  }
];

const projects = [ { id: 1, name: 'Home' }, { id: 2, name: 'Work' } ];

const newNote = {
  id: null,
  content: '',
  date: '',
  projectId: 1
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newNote,
  notes,
  projects
};

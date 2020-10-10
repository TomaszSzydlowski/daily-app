const notes = [
  {
    id: '1',
    date: '2020-10-09T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '2',
    date: '2020-10-08T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '3',
    date: '2020-10-07T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '4',
    date: '2020-10-06T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '5',
    date: '2020-10-05T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '6',
    date: '2020-10-05T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '7',
    date: '2020-10-05T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  },
  {
    id: '8',
    date: '2020-10-04T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  },
  {
    id: '9',
    date: '2020-10-03T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  },
  {
    id: '10',
    date: '2020-10-02T20:00',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  }
];

const projects = [ { id: 1, name: 'Home' }, { id: 2, name: 'Work' } ];

const newNote = {
  id: null,
  date: '',
  content: '',
  projectId: null
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newNote,
  notes,
  projects
};

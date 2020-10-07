const notes = [
  {
    id: '1',
    date: '23/09/2020',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '2',
    date: '24/09/2020',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '3',
    date: '25/09/2020',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '4',
    date: '26/09/2020',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '5',
    date: '27/09/2020',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '6',
    date: '30/09/2020',
    content: 'Securing React Apps with Auth0',
    projectId: 1
  },
  {
    id: '7',
    date: '30/09/2020',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  },
  {
    id: '8',
    date: '01/10/2020',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  },
  {
    id: '9',
    date: '02/10/2020',
    content: 'Securing React Apps with Auth0',
    projectId: 2
  },
  {
    id: '10',
    date: '03/10/2020',
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

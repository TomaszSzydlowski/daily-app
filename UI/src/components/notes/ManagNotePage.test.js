import React from 'react';
import { mount } from 'enzyme';
import { projects, newNote, notes } from '../../../tools/mockData';
import { ManageNotePage } from './ManageNotePage';

function render(args) {
  const defaultProps = {
    projects,
    notes,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    history: {},
    saveNote: jest.fn(),
    loadProjects: jest.fn(),
    loadNotes: jest.fn(),
    note: newNote,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  // mount return component with childs
  return mount(<ManageNotePage {...props} />);
}

it('sets error when attempting to save an empty date field', () => {
  const wrapper = render();
  wrapper.find('form').simulate('submit');
  const error = wrapper.find('.alert').first();
  expect(error.text()).toBe('Date is required.');
});

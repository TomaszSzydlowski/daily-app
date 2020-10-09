import React from 'react';
import NoteForm from './NoteForm';
import { shallow } from 'enzyme';

function renderNoteForm(args) {
  const defaultProps = {
    projects: [],
    note: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<NoteForm {...props} />);
}

it('renders form and header', () => {
  const wrapper = renderNoteForm();
  // console.log(wrapper.debug());
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Add Note');
});

it('label save button as "Save" when not saving', () => {
  const wrapper = renderNoteForm();
  expect(wrapper.find('button').text()).toBe('Save');
});

it('label save button as "Saving..." when saving', () => {
  const wrapper = renderNoteForm({ saving: true });
  expect(wrapper.find('button').text()).toBe('Saving...');
});

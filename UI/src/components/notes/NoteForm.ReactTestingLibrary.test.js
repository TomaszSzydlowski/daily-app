import React from 'react';
import NoteForm from './NoteForm';
import { cleanup, render } from 'react-testing-library';

afterEach(cleanup);

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
  return render(<NoteForm {...props} />);
}

it('should render Add Note header', () => {
  const { getByText } = renderNoteForm();
  getByText('Add Note');
});

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderNoteForm();
  getByText('Save');
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText /*,debug*/ } = renderNoteForm({ saving: true });
  // debug();
  getByText('Saving...');
});

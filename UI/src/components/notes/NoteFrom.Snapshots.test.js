import React from 'react';
import NoteForm from './NoteForm';
import renderer from 'react-test-renderer';
import { notes, projects } from '../../../tools/mockData';

it("sets submit button label 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <NoteForm note={notes[0]} projects={projects} onSave={jest.fn()} onChange={jest.fn()} saving />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label 'Save' when saving is false", () => {
  const tree = renderer.create(
    <NoteForm note={notes[0]} projects={projects} onSave={jest.fn()} onChange={jest.fn()} saving={false} />
  );

  expect(tree).toMatchSnapshot();
});

import noteReducer from './noteReducer';
import * as actions from '../actions/noteActions';

it('should add note when passed CREATE_NOTES_SUCCESS', () => {
  // arrange
  const initialState = [
    {
      title: 'A'
    },
    {
      title: 'B'
    }
  ];

  const newNote = {
    title: 'C'
  };

  const action = actions.createNoteSuccess(newNote);

  // act
  const newState = noteReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual('A');
  expect(newState[1].title).toEqual('B');
  expect(newState[2].title).toEqual('C');
});

it('should update note when passed UPDATE_NOTES_SUCCESS', () => {
  // arrange
  const initialState = [ { id: 1, title: 'A' }, { id: 2, title: 'B' }, { id: 3, title: 'C' } ];

  const note = { id: 2, title: 'New Title' };
  const action = actions.updateNoteSuccess(note);

  // act
  const newState = noteReducer(initialState, action);
  const updatedNote = newState.find((a) => a.id == note.id);
  const untouchedNote = newState.find((a) => a.id == 1);

  // assert
  expect(updatedNote.title).toEqual('New Title');
  expect(untouchedNote.title).toEqual('A');
  expect(newState.length).toEqual(3);
});

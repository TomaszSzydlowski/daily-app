import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as noteActions from './actions/noteActions';

it('Should handle creating courses', function() {
  // arrange
  const store = createStore(rootReducer, initialState);
  const note = {
    content: 'Clean Code'
  };

  // act
  const action = noteActions.createNoteSuccess(note);
  store.dispatch(action);

  // assert
  const createdNote = store.getState().notes[0];
  expect(createdNote).toEqual(note);
});

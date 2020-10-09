import * as noteActions from './noteActions';
import * as types from './actionTypes';
import { notes } from '../../../tools/mockData';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

// Test an async action
const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe('Load Notes Thunk', () => {
    it('should create BEGIN_API_CALL and LOAD_NOTES_SUCCESS when loading notes', () => {
      fetchMock.mock('*', {
        body: notes,
        headers: { 'content-type': 'application/json' }
      });

      const expectedActions = [ { type: types.BEGIN_API_CALL }, { type: types.LOAD_NOTES_SUCCESS, notes } ];

      const store = mockStore({ notes: [] });
      return store.dispatch(noteActions.loadNotes()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe('createNoteSuccess', () => {
  it('should create a CREATE_NOTE_SUCCESS action', () => {
    //arrange
    const note = notes[0];
    const expectedAction = {
      type: types.CREATE_NOTE_SUCCESS,
      note
    };

    //act
    const action = noteActions.createNoteSuccess(note);

    //assert
    expect(action).toEqual(expectedAction);
  });
});

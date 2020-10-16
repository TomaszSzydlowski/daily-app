import React from 'react';
import { connect } from 'react-redux';
import * as noteActions from '../../redux/actions/noteActions';
import * as projectActions from '../../redux/actions/projectActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import NoteList from './NoteList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

class NotesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { notes, projects, actions } = this.props;

    if (notes.length === 0) {
      try {
        actions.loadNotes();
      } catch (error) {
        alert('Loading notes failed' + error);
      }
    }

    if (projects.length === 0) {
      try {
        actions.loadProjects();
      } catch (error) {
        alert('Loading procjects failed' + error);
      }
    }
  }

  handleDeleteNote = async (note) => {
    toast.success('Note deleted');
    try {
      await this.props.actions.deleteNote(note);
    } catch (error) {
      toast.error('Delete failed.' + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <div>
        {this.state.redirectToAddCoursePage && <Redirect to="/note" />}
        <h2>Notes</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <div>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Note
            </button>

            <NoteList onDeleteClick={this.handleDeleteNote} notes={this.props.notes} />
          </div>
        )}
      </div>
    );
  }
}

NotesPage.propTypes = {
  projects: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    notes:
      state.projects.length === 0
        ? []
        : state.notes.map((note) => {
            return {
              ...note,
              projectName: state.projects.find((a) => a.id === note.projectId).name,
              date: new Date(note.date).toISOString().slice(0, 10)
            };
          }),
    projects: state.projects,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadNotes: bindActionCreators(noteActions.loadNotes, dispatch),
      loadProjects: bindActionCreators(projectActions.loadProjects, dispatch),
      deleteNote: bindActionCreators(noteActions.deleteNote, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadNotes, saveNote } from '../../redux/actions/noteActions';
import { loadProjects } from '../../redux/actions/projectActions';
import PropTypes from 'prop-types';
import NoteForm from './NoteForm';
import { newNote } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

export function ManageNotePage({ notes, projects, loadProjects, loadNotes, saveNote, history, ...props }) {
  const [ note, setNote ] = useState({ ...props.note });
  const [ errors, setErrors ] = useState({});
  const [ saving, setSaving ] = useState(false);

  useEffect(
    () => {
      if (notes.length === 0) {
        try {
          loadNotes();
        } catch (error) {
          alert('Loading notes failed' + error);
        }
      } else {
        setNote({ ...props.note });
      }

      if (projects.length === 0) {
        try {
          loadProjects();
        } catch (error) {
          alert('Loading projects failed' + error);
        }
      }
    },
    [ props.note ]
  );

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: name === 'projectId' ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { date, projectId, content } = note;
    const errors = {};

    if (!date) errors.date = 'Date is required.';
    if (!projectId) errors.project = 'Project is required.';
    if (!content) errors.content = 'Content is required.';

    setErrors(errors);
    // Form is valid if the rrors object still has no properties
    return Object.keys(errors).length === 0;
  }

  async function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    try {
      await saveNote(note);
      toast.success('Note saved.');
      history.push('/notes');
    } catch (error) {
      setSaving(false);
      setErrors({ onSave: error.message });
    }
  }

  return projects.length === 0 || notes.length === 0 ? (
    <Spinner />
  ) : (
    <NoteForm
      note={note}
      errors={errors}
      projects={projects}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageNotePage.propTypes = {
  note: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  loadNotes: PropTypes.func.isRequired,
  loadProjects: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getNoteById(notes, id) {
  return notes.find((note) => note.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const note = id && state.notes.length > 0 ? getNoteById(state.notes, id) : newNote;
  return {
    note,
    notes: state.notes,
    projects: state.projects
  };
}

const mapDispatchToProps = {
  loadNotes,
  loadProjects,
  saveNote
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNotePage);

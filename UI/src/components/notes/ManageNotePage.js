import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadNotes, saveNote } from '../../redux/actions/noteActions';
import { loadProjects } from '../../redux/actions/projectActions';
import PropTypes from 'prop-types';
import NoteForm from './NoteForm';
import { newNote } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import { parseDateToTimeField } from '../../../utils/time';

export function ManageNotePage({ notes, projects, loadProjects, loadNotes, saveNote, history, ...props }) {
  const [ note, setNote ] = useState({ ...props.note });
  const [ errors, setErrors ] = useState({});
  const [ saving, setSaving ] = useState(false);

  useEffect(
    () => {
      initNote();
      if (notes.length === 0) {
        try {
          loadNotes();
        } catch (error) {
          alert('Loading notes failed' + error);
        }
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

  function initNote() {
    const newNote = { ...props.note };
    newNote.date = !newNote.id ? parseDateToTimeField(new Date()) : parseDateToTimeField(new Date(props.note.date));
    if (projects.length > 0 && !newNote.id) newNote.projectId = projects[0].id;
    setNote(newNote);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value
    }));
  }

  function formIsValid() {
    const { date, projectId, content } = note;
    const errors = {};

    if (!date) errors.date = 'Date is required.';
    if (!projectId) errors.project = 'Project is required.';
    if (!content) errors.content = 'Content is required.';

    setErrors(errors);
    // Form is valid if the errors object still has no properties
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
      toast.error(error.message);
    }
  }

  return props.loading ? (
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
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function getNoteById(notes, id) {
  return notes.find((note) => note.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const note = id && state.notes.length > 0 ? getNoteById(state.notes, id) : newNote;
  return {
    note,
    notes: state.notes,
    projects: state.projects,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadNotes,
  loadProjects,
  saveNote
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNotePage);

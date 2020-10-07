import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const NoteForm = ({ note, projects, onSave, onChange, saving = false, errors = {} }) => {
  return (
    <form onSubmit={onSave}>
      <h2>{note.id ? 'Edit' : 'Add'} Note</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput name="date" label="Date" value={note.date} onChange={onChange} error={errors.date} />

      <SelectInput
        name="projectId"
        label="Project"
        value={note.projectId || ''}
        defaultOption="Select Project"
        options={projects.map((project) => ({
          value: project.id,
          text: project.name
        }))}
        onChange={onChange}
        error={errors.project}
      />

      <TextInput name="content" label="Content" value={note.content} onChange={onChange} error={errors.content} />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

NoteForm.propTypes = {
  projects: PropTypes.array.isRequired,
  note: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default NoteForm;

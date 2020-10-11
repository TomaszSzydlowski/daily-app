import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import './NoteForm.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const NoteForm = ({ note, projects, onSave, onChange, saving = false, errors = {} }) => {
  const classes = useStyles();

  return (
    <form onSubmit={onSave}>
      <div className="container">
        <div className="row">
          <h2>{note.id ? 'Edit' : 'Add'} Note</h2>
          {errors.onSave && (
            <div className="alert alert-danger" role="alert">
              {errors.onSave}
            </div>
          )}
        </div>
        <div className="row marginTop15px">
          <TextField
            error={errors.content}
            name="content"
            id="standard-textarea"
            label="Content"
            placeholder="Placeholder"
            helperText={errors.content}
            multiline
            value={note.content}
            onChange={onChange}
          />
        </div>
        <div className="row marginTop15px">
          <div className="col-2 project-entryTime">
            <FormControl className={classes.formControl}>
              <InputLabel id="select-label-project">Project</InputLabel>
              <Select
                name="projectId"
                labelId="select-label-project"
                id="demo-simple-select"
                value={note.projectId ? note.projectId : 'Select Project'}
                onChange={onChange}
                error={errors.project}
              >
                {projects.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-2 project-entryTime">
            <TextField
              name="date"
              id="datetime-local"
              label="Entry time"
              type="datetime-local"
              value={note.date}
              onChange={onChange}
              error={errors.date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
        </div>
        <div className="row marginTop15px">
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
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

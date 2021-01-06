import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { VscAdd } from 'react-icons/vsc';
import './AddForm.css';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
export default function AddForm({ task, onChange, saving = false }) {
  const [ addModeOn, setAddModeOn ] = useState(true);

  const useStyles = makeStyles({
    underline: {
      '&&&:before': {
        borderBottom: 'none'
      },
      '&&:after': {
        borderBottom: 'none'
      }
    }
  });

  const classes = useStyles();

  function onClickAddNew() {
    setAddModeOn(true);
  }

  return (
    <div>
      {addModeOn ? (
        <div className="add-mode-on-main-container">
          <div className="add-mode-on-container">
            <div className="input-container">
              <InputBase
                name="content"
                onChange={onChange}
                multiline
                placeholder="Write your story here..."
                inputProps={{ 'aria-label': 'naked' }}
              />
            </div>
            <div className="options-container">
              <div className="date-container">
                <TextField
                  id="date"
                  name="toDoDate"
                  type="date"
                  defaultValue="2017-05-24"
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true,
                    disableUnderline: true
                  }}
                  InputProps={{ classes }}
                />
              </div>
            </div>
          </div>
          <button type="button" disabled={saving} className="btn btn-primary custom-btn">
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button type="button" disabled={saving} className="btn btn-secondary custom-btn">
            Cancel
          </button>
        </div>
      ) : (
        <div
          className="add-new-container"
          onClick={() => {
            onClickAddNew();
          }}
        >
          <div className="item-add-new-container">
            <div className="item-add-new-icon">
              <VscAdd style={{ width: 'inherit', height: 'inherit' }} />
            </div>
          </div>
          <div className="item-content">Add new</div>
        </div>
      )}
    </div>
  );
}

AddForm.protoTypes = {
  saving: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
};

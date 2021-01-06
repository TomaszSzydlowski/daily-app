import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { VscAdd } from 'react-icons/vsc';
import './AddForm.css';
import TaskContentInput from './TaskContentInput';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';

export default function AddForm() {
  const [ addModeOn, setAddModeOn ] = useState(true);

  function onClickAddNew() {
    setAddModeOn(true);
  }

  return (
    <div>
      {addModeOn ? (
        <div className="add-mode-on-container">
          <div className="input-container">
            <InputBase multiline rowsMax={2} defaultValue="Naked input" inputProps={{ 'aria-label': 'naked' }} />
          </div>
          <div className="date-container">
            <TextField
              id="date"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
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

AddForm.protoTypes = {};

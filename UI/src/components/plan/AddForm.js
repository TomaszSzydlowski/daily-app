import React from 'react';
import PropTypes from 'prop-types';
import { VscAdd } from 'react-icons/vsc';

export default function AddForm() {
  return (
    <div className="add-new-container">
      <div className="item-add-new-container">
        <div className="item-add-new-icon">
          <VscAdd style={{ width: 'inherit', height: 'inherit' }} />
        </div>
      </div>
      <div className="item-content">Add new</div>
    </div>
  );
}

AddForm.protoTypes = {};

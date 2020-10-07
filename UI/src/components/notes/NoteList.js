import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NoteList = ({ notes, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Content</th>
        <th>Project</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {notes.map((note) => {
        return (
          <tr key={note.id}>
            <td>{note.date}</td>
            <td>
              <Link to={'/note/' + note.id}>{note.content}</Link>
            </td>
            <td>{note.projectName}</td>
            <td>
              <button className="btn btn-outline-danger" onClick={() => onDeleteClick(note)}>
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default NoteList;

import React from 'react';
import './ManagePlanPage.css';
import DragNDrop from './DragNDrop';

const data = [ { title: 'group 1', items: [ '1', '2', '3' ] }, { title: 'group 2', items: [ '4', '5' ] } ];

const ManagePlanPage = () => {
  return (
    <div className="App-header">
      <DragNDrop data={data} />
    </div>
  );
};

export default ManagePlanPage;

import React from 'react';
import './ManagePlanPage.css';

const data = [ { title: 'group 1', items: [ '1', '2', '3' ] }, { title: 'group 2', items: [ '4', '5' ] } ];

const ManagePlanPage = () => {
  return (
    <div className="App-header">
      <div className="drag-n-drop">
        {data.map((grp, grpI) => (
          <div key={grp.title} className="dnd-group">
            {grp.items.map((item, itemI) => (
              <div draggable key={item} className="dnd-item">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePlanPage;

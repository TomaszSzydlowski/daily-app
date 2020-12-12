import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function DragNDropTasks({ data, isShowingBackLog }) {
  const [ list, setList ] = useState(data);
  const [ dragging, setDragging ] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  useEffect(
    () => {
      console.log(data);
    },
    [ data ]
  );

  const handleDragStart = (e, params) => {
    console.log(e.target);
    console.log('drag starting..', params);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    console.log('Entering drag..', params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      //no allow to send task to backlog
      if (currentItem.grpI == 1 && params.grpI == 0) return;
      console.log('target is not the same');
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        );
        //updated priority
        newList[params.grpI].items = newList[params.grpI].items.map((item, index) => {
          return {
            ...item,
            priority: ++index
          };
        });
        dragItem.current = params;
        return newList;
      });
    }
    console.log(list[params.grpI].items.map((i) => i.priority));
  };

  const handleDragEnd = () => {
    console.log('Ending drag..');
    setDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (params) => {
    const currentItem = dragItem.current;
    if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
      return 'current dnd-item';
    }
    return 'dnd-item';
  };

  function renderDnDGroup(grp, grpI) {
    return (
      <div
        key={grp.title}
        className="dnd-group"
        onDragEnter={dragging && !grp.items.length ? (e) => handleDragEnter(e, { grpI, itemI: 0 }) : null}
      >
        <div className="group-title">{grp.title}</div>
        {grp.items.map((item, itemI) => (
          <div
            draggable
            onDragStart={(e) => {
              handleDragStart(e, { grpI, itemI });
            }}
            onDragEnter={
              dragging ? (
                (e) => {
                  handleDragEnter(e, { grpI, itemI });
                }
              ) : null
            }
            key={item.id}
            className={dragging ? getStyles({ grpI, itemI }) : 'dnd-item'}
          >
            {item.content}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="drag-n-drop">
      {list.map(
        (grp, grpI) =>
          grp.title !== 'BackLog'
            ? renderDnDGroup(grp, grpI)
            : isShowingBackLog && grp.items.length > 0 ? renderDnDGroup(grp, grpI) : null
      )}
    </div>
  );
}

DragNDropTasks.propTypes = {
  data: PropTypes.array.isRequired,
  isShowingBackLog: PropTypes.bool.isRequired
};

export default DragNDropTasks;

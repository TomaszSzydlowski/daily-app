import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

function DragNDropTasks({ data, isShowingBackLog, backLog, tasks }) {
  const [ list, setList ] = useState(data);
  const [ tasksList, setTasksList ] = useState(tasks);
  const [ backLogList, setBackLogList ] = useState(backLog);
  const [ dragging, setDragging ] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  useEffect(
    () => {
      console.log(data);
      console.log(isShowingBackLog);
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
    // console.log('Start at posion:', dragItem.current);
    // console.log('End posion', params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      console.log('target is not the same');
      if (params.grpI === 1) {
        //tasks list refactor
        setTasksList((oldTaskList) => {
          let newTaskList = JSON.parse(JSON.stringify(oldTaskList));
          newTaskList.splice(params.itemI, 0, newTaskList.splice(currentItem.itemI, 1)[0]);
          dragItem.current = params;
          return newTaskList;
        });
      } else {
        //backlog list refactor
        setBackLogList((oldBackLogList) => {
          let newBackLogList = JSON.parse(JSON.stringify(oldBackLogList));
          newBackLogList.splice(params.itemI, 0, newBackLogList.splice(currentItem.itemI, 1)[0]);
          dragItem.current = params;
          return newBackLogList;
        });
      }
    }
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

  return (
    <div className="drag-n-drop">
      {isShowingBackLog ? (
        <div
          key="backLog"
          className="dnd-group"
          onDragEnter={dragging && !backLog.length ? (e) => handleDragEnter(e, { grpI: 0, itemI: 0 }) : null}
        >
          <div className="group-title">BackLog</div>
          {backLogList.map((item, itemI) => (
            <div
              draggable
              onDragStart={(e) => {
                handleDragStart(e, { grpI: 0, itemI });
              }}
              onDragEnter={
                dragging ? (
                  (e) => {
                    handleDragEnter(e, { grpI: 0, itemI });
                  }
                ) : null
              }
              key={item.id}
              className={dragging ? getStyles({ grpI: 0, itemI }) : 'dnd-item'}
            >
              {item.content}
            </div>
          ))}
        </div>
      ) : null}
      <div
        key="tasks"
        className="dnd-group"
        onDragEnter={dragging && !tasksList.length ? (e) => handleDragEnter(e, { grpI: 1, itemI: 0 }) : null}
      >
        <div className="group-title">Dzis</div>
        {tasksList.map((item, itemI) => (
          <div
            draggable
            onDragStart={(e) => {
              handleDragStart(e, { grpI: 1, itemI });
            }}
            onDragEnter={
              dragging ? (
                (e) => {
                  handleDragEnter(e, { grpI: 1, itemI });
                }
              ) : null
            }
            key={item.id}
            className={dragging ? getStyles({ grpI: 1, itemI }) : 'dnd-item'}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}

DragNDropTasks.propTypes = {
  data: PropTypes.array.isRequired,
  backLog: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  isShowingBackLog: PropTypes.bool.isRequired
};

export default DragNDropTasks;

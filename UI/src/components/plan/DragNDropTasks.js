import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function DragNDropTasks({
  data,
  isShowingBackLog,
  onUpdateTasksPriority,
  onUpdateBackLogsPriority,
  onRemoveTaskFromBackLogs,
  onPushTaskToDailyTasks
}) {
  const [ list, setList ] = useState(data);
  const [ dragging, setDragging ] = useState(false);
  const [ priorityChanging, setPriorityChanging ] = useState(false);
  const [ startDraggingAt, setStartDraggingAt ] = useState({});
  const [ endDraggingAt, setEndDraggingAt ] = useState({});
  const [ draggingTaskId, setDraggingTaskId ] = useState('');
  const dragItem = useRef();
  const dragNode = useRef();

  const getTasksToUpdatePriority = (listIndex, startingUpdatingIndexAt) => {
    return list[listIndex].items.slice(startingUpdatingIndexAt).map((task) => {
      return {
        id: task.id,
        priority: task.priority
      };
    });
  };

  const shouldUpdatePriority = () => {
    const isDraggingTargetDiffrent =
      startDraggingAt.grpI !== endDraggingAt.grpI || startDraggingAt.itemI !== endDraggingAt.itemI;

    return priorityChanging && !dragging && isDraggingTargetDiffrent;
  };

  useEffect(
    () => {
      if (shouldUpdatePriority()) {
        if (startDraggingAt.grpI === endDraggingAt.grpI) {
          const startingUpdatingIndexAt = Math.min(startDraggingAt.itemI, endDraggingAt.itemI);
          //Update_Backlog
          if (startDraggingAt.grpI === 0 || endDraggingAt.grpI === 0) {
            let listOfTaskToChangePriority = getTasksToUpdatePriority(startDraggingAt.grpI, startingUpdatingIndexAt);
            onUpdateBackLogsPriority(listOfTaskToChangePriority);
          }
          //Update_Tasks
          if (startDraggingAt.grpI === 1 || endDraggingAt.grpI === 1) {
            let listOfTaskToChangePriority = getTasksToUpdatePriority(startDraggingAt.grpI, startingUpdatingIndexAt);
            onUpdateTasksPriority(listOfTaskToChangePriority);
          }
        } else {
          //Update_All
          let listOfTaskToChangePriorityBacklog = getTasksToUpdatePriority(startDraggingAt.grpI, startDraggingAt.itemI);
          let listOfTaskToChangePriorityTasks = getTasksToUpdatePriority(endDraggingAt.grpI, endDraggingAt.itemI);
          onUpdateBackLogsPriority(listOfTaskToChangePriorityBacklog);
          onUpdateTasksPriority(listOfTaskToChangePriorityTasks);
          onMoveTaskFromBackLogToDailyTask(list[endDraggingAt.grpI].items.find((i) => i.id === draggingTaskId));
        }
        setPriorityChanging(false);
      }
    },
    [ priorityChanging, dragging ]
  );

  const onMoveTaskFromBackLogToDailyTask = (task) => {
    onRemoveTaskFromBackLogs(task);
    onPushTaskToDailyTasks(task);
  };

  const handleDragStart = (e, params) => {
    // console.log('drag starting..', params);
    setStartDraggingAt({ grpI: params.grpI, itemI: params.itemI });
    setDraggingTaskId(list[params.grpI].items[params.itemI].id);
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    // console.log('Entering drag..', params);
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      //no allow to send task to backlog
      if (currentItem.grpI == 1 && params.grpI == 0) return;
      // console.log('target is not the same');
      setEndDraggingAt({ grpI: params.grpI, itemI: params.itemI });
      setPriorityChanging(true);
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
  };

  const handleDragEnd = () => {
    // console.log('Ending drag..');
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
            <div className="item-container">
              <div className="item-checkbox">
                <CheckCircleOutlineIcon />
              </div>
              <div className="item-content">{item.content}</div>
              <div className="item-date-container">
                <span className="item-date">{new Date(item.toDoDate).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
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
  isShowingBackLog: PropTypes.bool.isRequired,
  onUpdateTasksPriority: PropTypes.func.isRequired,
  onUpdateBackLogsPriority: PropTypes.func.isRequired,
  onRemoveTaskFromBackLogs: PropTypes.func.isRequired,
  onPushTaskToDailyTasks: PropTypes.func.isRequired
};

export default DragNDropTasks;
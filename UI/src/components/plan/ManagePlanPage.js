import React, { useEffect, useState } from 'react';
import './DragNDropTasks.css';
import DragNDropTasks from './DragNDropTasks';
import DataPicker from './PlanMainDataPicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTasks, updateTasksPriority, pushTaskToDailyTasks, saveTask } from '../../redux/actions/tasksActions';
import { loadBackLog, updateBackLogsPriority, removeTaskFromBackLogs } from '../../redux/actions/backLogActions';
import Spinner from '../common/Spinner';
import './ManagePlanPage.css';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import AddForm from './AddForm';
import { newTask } from '../../../tools/mockData';

const currentDate = new Date().toISOString().slice(0, 10);
export function ManagePlanPage({
  loadTasks,
  loadBackLog,
  dragNDropTasksData,
  updateTasksPriority,
  updateBackLogsPriority,
  removeTaskFromBackLogs,
  pushTaskToDailyTasks,
  saveTask,
  ...props
}) {
  const [ task, setTask ] = useState(newTask);
  const [ datePlan, setDatePlan ] = useState(currentDate);
  const [ saving, setSaving ] = useState(false);
  const [ errors, setErrors ] = useState({});

  useEffect(
    () => {
      try {
        loadTasks(datePlan);
        if (isShowingBackLog()) {
          loadBackLog();
        }
      } catch (error) {
        alert('Loading notes failed' + error);
      }
    },
    [ datePlan ]
  );

  async function handleNewTaskSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    try {
      await saveTask(task);
    } catch (error) {
      setSaving(false);
    }
  }

  function formIsValid() {
    const { content, toDoDate } = task;
    const errors = {};

    if (!content) errors.content = 'Content is required.';
    if (!toDoDate) errors.toDoDate = 'Date is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChangeNewTask(event) {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  }

  function handleChangeDatePlan(event) {
    setDatePlan(event.target.value);
  }

  function isShowingBackLog() {
    return currentDate === datePlan;
  }

  function addDays(days) {
    setDatePlan((oldDatePlan) => {
      let result = new Date(oldDatePlan);
      result.setDate(result.getDate() + days);
      return result.toISOString().slice(0, 10);
    });
  }

  useEffect(
    () => {
      console.log(task);
    },
    [ task ]
  );

  return (
    <div>
      <div id="plan-menu-header">
        <div className="arrow-container">
          <FiChevronLeft
            style={{ width: 'inherit', height: 'inherit', color: 'inherit' }}
            onClick={() => addDays(-1)}
          />
        </div>
        <DataPicker id="plan-main-data-picker" value={datePlan} onChange={handleChangeDatePlan} />
        <div className="arrow-container">
          <FiChevronRight
            style={{ width: 'inherit', height: 'inherit', color: 'inherit' }}
            onClick={() => addDays(1)}
          />
        </div>
      </div>
      {props.loading ? (
        <Spinner />
      ) : (
        <div className="drag-n-drop">
          <DragNDropTasks
            data={dragNDropTasksData}
            onUpdateTasksPriority={updateTasksPriority}
            onUpdateBackLogsPriority={updateBackLogsPriority}
            onRemoveTaskFromBackLogs={removeTaskFromBackLogs}
            onPushTaskToDailyTasks={pushTaskToDailyTasks}
            isShowingBackLog={isShowingBackLog()}
            onSaveTask={saveTask}
          />
          <AddForm task={task} saving={saving} onChange={handleChangeNewTask} />
        </div>
      )}
    </div>
  );
}

ManagePlanPage.propTypes = {
  dragNDropTasksData: PropTypes.array.isRequired,
  loadTasks: PropTypes.func.isRequired,
  updateTasksPriority: PropTypes.func.isRequired,
  updateBackLogsPriority: PropTypes.func.isRequired,
  removeTaskFromBackLogs: PropTypes.func.isRequired,
  pushTaskToDailyTasks: PropTypes.func.isRequired,
  loadBackLog: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveTask: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    dragNDropTasksData: [ { title: 'Backlog', items: state.backLog }, { title: 'Today', items: state.tasks } ],
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadTasks,
  loadBackLog,
  updateTasksPriority,
  updateBackLogsPriority,
  removeTaskFromBackLogs,
  pushTaskToDailyTasks,
  saveTask
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlanPage);

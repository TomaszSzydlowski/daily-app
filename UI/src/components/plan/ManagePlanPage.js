import React, { useEffect, useState } from 'react';
import './DragNDropTasks.css';
import DragNDropTasks from './DragNDropTasks';
import DataPicker from './PlanMainDataPicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTasks, updateTasksPriority, pushTaskToDailyTasks } from '../../redux/actions/tasksActions';
import { loadBackLog, updateBackLogsPriority, removeTaskFromBackLogs } from '../../redux/actions/backLogActions';
import Spinner from '../common/Spinner';

const currentDate = new Date().toISOString().slice(0, 10);
export function ManagePlanPage({
  loadTasks,
  loadBackLog,
  dragNDropTasksData,
  updateTasksPriority,
  updateBackLogsPriority,
  removeTaskFromBackLogs,
  pushTaskToDailyTasks,
  ...props
}) {
  const [ datePlan, setDatePlan ] = useState(currentDate);

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

  function handleChange(event) {
    setDatePlan(event.target.value);
  }

  function isShowingBackLog() {
    return currentDate === datePlan;
  }

  return (
    <div>
      <DataPicker id="plan-main-data-picker" value={datePlan} onChange={handleChange} />
      {props.loading ? (
        <Spinner />
      ) : (
        <div className="App-header">
          <DragNDropTasks
            data={dragNDropTasksData}
            onUpdateTasksPriority={updateTasksPriority}
            onUpdateBackLogsPriority={updateBackLogsPriority}
            onRemoveTaskFromBackLogs={removeTaskFromBackLogs}
            onPushTaskToDailyTasks={pushTaskToDailyTasks}
            isShowingBackLog={isShowingBackLog()}
          />
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
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    dragNDropTasksData: [ { title: 'BackLog', items: state.backLog }, { title: 'Dzis', items: state.tasks } ],
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadTasks,
  loadBackLog,
  updateTasksPriority,
  updateBackLogsPriority,
  removeTaskFromBackLogs,
  pushTaskToDailyTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlanPage);

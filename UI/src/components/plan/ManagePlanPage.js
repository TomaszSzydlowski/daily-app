import React, { useEffect, useState } from 'react';
import './DragNDropTasks.css';
import DragNDropTasks from './DragNDropTasks';
import DataPicker from './PlanMainDataPicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTasks, updateTasksPriority, pushTaskToDailyTasks } from '../../redux/actions/tasksActions';
import { loadBackLog, updateBackLogsPriority, removeTaskFromBackLogs } from '../../redux/actions/backLogActions';
import Spinner from '../common/Spinner';
import './ManagePlanPage.css';
import { VscAdd } from 'react-icons/vsc';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

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

  function addDays(days) {
    setDatePlan((oldDatePlan) => {
      let result = new Date(oldDatePlan);
      result.setDate(result.getDate() + days);
      return result.toISOString().slice(0, 10);
    });
  }

  return (
    <div>
      <div id="plan-menu-header">
        <div className="arrow-container">
          <FiChevronLeft
            style={{ width: 'inherit', height: 'inherit', color: 'inherit' }}
            onClick={() => addDays(-1)}
          />
        </div>
        <DataPicker id="plan-main-data-picker" value={datePlan} onChange={handleChange} />
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
        <div>
          <div className="drag-n-drop">
            <DragNDropTasks
              data={dragNDropTasksData}
              onUpdateTasksPriority={updateTasksPriority}
              onUpdateBackLogsPriority={updateBackLogsPriority}
              onRemoveTaskFromBackLogs={removeTaskFromBackLogs}
              onPushTaskToDailyTasks={pushTaskToDailyTasks}
              isShowingBackLog={isShowingBackLog()}
            />
            <div className="add-new-container">
              <div className="item-add-new-container">
                <div className="item-add-new-icon">
                  <VscAdd style={{ width: 'inherit', height: 'inherit' }} />
                </div>
              </div>
              <div className="item-content">Add new</div>
            </div>
          </div>
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
  pushTaskToDailyTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlanPage);

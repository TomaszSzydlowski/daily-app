import React, { useEffect, useState } from 'react';
import './DragNDropTasks.css';
import DragNDropTasks from './DragNDropTasks';
import DataPicker from './PlanMainDataPicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/actions/tasksActions';
import { loadBackLog } from '../../redux/actions/backLogActions';
import Spinner from '../common/Spinner';

const currentDate = new Date().toISOString().slice(0, 10);
// const data = [
//   { title: 'group 1', items: [ { id: '1', content: 'c1' } ] },
//   { title: 'group 2', items: [ { id: '2', content: 'c2' }, { id: '3', content: 'c3' } ] }
// ];

export function ManagePlanPage({ loadTasks, loadBackLog, dragNDropTasksData, backLog, tasks, ...props }) {
  const [ datePlan, setDatePlan ] = useState(currentDate);

  useEffect(
    () => {
      console.log(datePlan);
      console.log('o cos sie zmienilo');
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

  function isShowingBackLog() {
    return currentDate === datePlan;
  }

  function handleChange(event) {
    setDatePlan(event.target.value);
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
            isShowingBackLog={isShowingBackLog()}
            backLog={backLog}
            tasks={tasks}
          />
        </div>
      )}
    </div>
  );
}

ManagePlanPage.propTypes = {
  dragNDropTasksData: PropTypes.array.isRequired,
  backLog: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  loadTasks: PropTypes.func.isRequired,
  loadBackLog: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    backLog: state.backLog,
    tasks: state.tasks,
    dragNDropTasksData: [ { title: 'BackLog', items: state.backLog }, { title: 'Dzis', items: state.tasks } ],
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadTasks,
  loadBackLog
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlanPage);

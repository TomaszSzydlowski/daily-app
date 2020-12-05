import React, { useEffect, useState } from 'react';
import './ManagePlanPage.css';
import DragNDrop from './DragNDrop';
import DataPicker from './PlanMainDataPicker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTasks } from '../../redux/actions/tasksActions';
import { loadBackLog } from '../../redux/actions/backLogActions';
import Spinner from '../common/Spinner';

const currentDate = new Date().toISOString().slice(0, 10);
const data = [ { title: 'group 1', items: [ '1', '2', '3' ] }, { title: 'group 2', items: [ '4', '5' ] } ];

export function ManagePlanPage({ tasks, backLog, loadTasks, loadBackLog, ...props }) {
  const [ datePlan, setDatePlan ] = useState(currentDate);

  useEffect(
    () => {
      console.log(datePlan);
      console.log('o cos sie zmienilo');
      try {
        loadTasks(datePlan);
        if (currentDate === datePlan) {
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

  return (
    <div>
      <DataPicker id="plan-main-data-picker" value={datePlan} onChange={handleChange} />
      {props.loading ? (
        <Spinner />
      ) : (
        <div className="App-header">
          <DragNDrop data={data} />
        </div>
      )}
    </div>
  );
}

ManagePlanPage.propTypes = {
  tasks: PropTypes.array.isRequired,
  backLog: PropTypes.array.isRequired,
  loadTasks: PropTypes.func.isRequired,
  loadBackLog: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    backLog: state.backLog,
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadTasks,
  loadBackLog
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePlanPage);

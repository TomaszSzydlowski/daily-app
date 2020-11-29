import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { shouldRefreshTokenAction } from '../../redux/actions/refreshTokenActions';
import { clearNotesAction } from '../../redux/actions/noteActions';
import { clearProjectsAction } from '../../redux/actions/projectActions';

const Logout = ({ logout, shouldRefreshTokenAction, clearNotesAction, clearProjectsAction }) => {
  useEffect(() => {
    try {
      logout();
      shouldRefreshTokenAction(true);
      clearNotesAction();
      clearProjectsAction();
      toast.success('Successfully log out.');
    } catch (error) {
      toast.error('Error when try log out.');
    }
  }, []);

  return <Redirect to="/login/" />;
};

const mapDispatchToProps = {
  logout,
  shouldRefreshTokenAction,
  clearNotesAction,
  clearProjectsAction
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  shouldRefreshTokenAction: PropTypes.func.isRequired,
  clearNotesAction: PropTypes.func.isRequired,
  clearProjectsAction: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

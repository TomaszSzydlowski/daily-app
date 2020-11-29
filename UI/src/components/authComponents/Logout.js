import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { shouldRefreshTokenAction } from '../../redux/actions/refreshTokenActions';

const Logout = ({ logout, shouldRefreshTokenAction }) => {
  useEffect(() => {
    try {
      logout();
      shouldRefreshTokenAction(true);
      toast.success('Successfully log out.');
    } catch (error) {
      toast.error('Error when try log out.');
    }
  }, []);

  return <Redirect to="/login/" />;
};

const mapDispatchToProps = {
  logout,
  shouldRefreshTokenAction
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  shouldRefreshTokenAction: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

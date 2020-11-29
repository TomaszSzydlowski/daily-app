import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkFreshnessToken } from '../../redux/actions/refreshTokenActions';

const ProtectedRoute = ({ component: Component, render, shouldRefreshToken, checkFreshnessToken, ...rest }) => {
  useEffect(() => {
    if (shouldRefreshToken) checkFreshnessToken();
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (shouldRefreshToken)
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  render: PropTypes.array,
  shouldRefreshToken: PropTypes.bool,
  checkFreshnessToken: PropTypes.func,
  location: PropTypes.object
};

function mapStateToProps(state) {
  return {
    shouldRefreshToken: state.shouldRefreshToken
  };
}

const MapDispatchToProps = {
  checkFreshnessToken
};

export default connect(mapStateToProps, MapDispatchToProps)(ProtectedRoute);

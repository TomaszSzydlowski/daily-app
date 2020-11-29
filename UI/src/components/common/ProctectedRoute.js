import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkFreshnessTokenAction } from '../../redux/actions/refreshTokenActions';

const ProtectedRoute = ({ component: Component, render, shouldRefreshToken, checkFreshnessTokenAction, ...rest }) => {
  useEffect(() => {
    if (shouldRefreshToken) checkFreshnessTokenAction();
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
  checkFreshnessTokenAction: PropTypes.func,
  location: PropTypes.object
};

function mapStateToProps(state) {
  return {
    shouldRefreshToken: state.shouldRefreshToken
  };
}

const MapDispatchToProps = {
  checkFreshnessTokenAction
};

export default connect(mapStateToProps, MapDispatchToProps)(ProtectedRoute);

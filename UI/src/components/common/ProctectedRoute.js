import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
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
  location: PropTypes.object
};

export default ProtectedRoute;

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Spinner from '../common/Spinner';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import './LoginForm.css';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { shouldNotRefreshToken } from '../../redux/actions/refreshTokenActions';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      autoWidth: true
    }
  }
}));

export function LoginForm({ login, shouldNotRefreshToken, history, shouldRefreshToken }) {
  const [ errors, setErrors ] = useState({});
  const [ user, setUser ] = useState({ email: '', password: '' });
  const [ saving, setSaving ] = useState(false);
  const classes = useStyles();

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  async function doSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);

    try {
      await login(user);
      await shouldNotRefreshToken();
      toast.success('Successfully logged in.');
      setSaving(false);
      history.push('/notes');
    } catch (error) {
      setUser({ email: '', password: '' });
      setSaving(false);
      if (isHandleError(error)) return;
      toast.error(error.message);
    }
  }

  function isHandleError(error) {
    const errors = {};
    if (error.response.status === 401) errors.unauthorize = 'Login, e-mail or password are incorrect';
    setErrors(errors);
    return Object.keys(errors).length > 0;
  }

  function formIsValid() {
    const { email, password } = user;
    const errors = {};

    if (!email) errors.email = 'Email is required.';
    if (!password) errors.password = 'Password is required.';

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  return (
    <div className="LoginForm-container">
      {!shouldRefreshToken && <Redirect to="/notes" />}
      <div className="row">
        <h2 id="SignIn">Sign In</h2>
      </div>
      <form onSubmit={doSubmit} className={classes.root} noValidate autoComplete="off">
        <div className="row">
          <TextField
            id="email-standard-basic"
            label="E-mail"
            name="email"
            value={user.email}
            onChange={handleChange}
            error={errors.email !== undefined || errors.unauthorize !== undefined}
            helperText={errors.email}
          />
        </div>
        <div className="row">
          <TextField
            id="password-standard-basic"
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            error={errors.password !== undefined || errors.unauthorize !== undefined}
            helperText={errors.password || errors.unauthorize}
          />
        </div>
        <div className="row">
          {saving ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '30px' }}
            >
              LOG IN
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  shouldNotRefreshToken: PropTypes.func.isRequired,
  shouldRefreshToken: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    shouldRefreshToken: state.shouldRefreshToken
  };
}

const mapDispatchToProps = {
  login,
  shouldNotRefreshToken
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

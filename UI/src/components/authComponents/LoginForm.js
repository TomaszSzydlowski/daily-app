import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Spinner from '../common/Spinner';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import authService from '../../services/authService';
import PropTypes from 'prop-types';
import './LoginForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      autoWidth: true
    }
  }
}));

export function LoginForm({ history }) {
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
      await authService.login(user);
      toast.success('Successfully logged in.');
      setSaving(false);
      history.push('/notes');
    } catch (error) {
      setSaving(false);
      setErrors({ onSave: error.message });
    }
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
      <div className="row">
        <h2 id="SignIn">Sign In</h2>
      </div>
      <form onSubmit={doSubmit} className={classes.root} noValidate autoComplete="off">
        <div className="row">
          <TextField
            id="email-standard-basic"
            label="Email"
            name="email"
            onChange={handleChange}
            error={errors.email !== undefined}
            helperText={errors.email}
          />
        </div>
        <div className="row">
          <TextField
            id="password-standard-basic"
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            error={errors.password !== undefined}
            helperText={errors.password}
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
  history: PropTypes.object.isRequired
};

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Spinner from '../common/Spinner';
import { register } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import './RegisterForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      autoWidth: true
    }
  }
}));

function Registerform({ history, register }) {
  const [ errors, setErrors ] = useState({});
  const [ registerUser, setRegisterUser ] = useState({ email: '', password: '', passwordConfirm: '' });
  const [ saving, setSaving ] = useState(false);
  const classes = useStyles();

  async function doSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);
    try {
      await register(registerUser.email, registerUser.password);
      toast.success('Successfully logged in.');
      setSaving(false);
      history.push('/notes');
    } catch (error) {
      setSaving(false);
      toast.error(error.message);
    }
  }

  function formIsValid() {
    const { email, password, passwordConfirm } = registerUser;
    const errors = {};

    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    if (password !== passwordConfirm) errors.passwordConfirm = 'Passwords do not match';
    if (!passwordConfirm) errors.passwordConfirm = 'Confirm password is required';

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  return (
    <div className="RegisterForm-container">
      <div className="row">
        <h2 id="SignIn">Register</h2>
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
          <TextField
            id="password-confim-standard-basic"
            label="Confirm password"
            type="password"
            name="passwordConfirm"
            onChange={handleChange}
            error={errors.passwordConfirm !== undefined}
            helperText={errors.passwordConfirm}
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
              REGISTER
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
Registerform.propTypes = {
  history: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(Registerform);

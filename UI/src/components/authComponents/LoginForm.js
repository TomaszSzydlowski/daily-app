import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Spinner from '../common/Spinner';
import React, { useState } from 'react';
import './LoginForm.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      autoWidth: true
    }
  }
}));

export function LoginForm(props) {
  const [ saving, setSaving ] = useState(false);
  const classes = useStyles();

  function doSubmit() {
    alert('dziala');
  }

  return (
    <div className="LoginForm-container">
      <div className="row">
        <h2 id="SignIn">Sign In</h2>
      </div>
      <form onSubmit={doSubmit} className={classes.root} noValidate autoComplete="off">
        <div className="row">
          <TextField id="standard-basic" label="Username" />
        </div>
        <div className="row">
          <TextField id="standard-basic" label="Password" type="password" />
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
              onClick={() => {
                setSaving(true);
              }}
            >
              LOG IN
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

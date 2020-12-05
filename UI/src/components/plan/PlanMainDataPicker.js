import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150
  }
}));

const DataPicker = ({ id, value, onChange }) => {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={id}
        type="date"
        value={value}
        onChange={onChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  );
};

DataPicker.propTypes = {
  id:PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DataPicker;

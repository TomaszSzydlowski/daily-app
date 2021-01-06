import React from 'react';
import { fade, ThemeProvider, withStyles, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';




export default function CustomizedInputs() {
  return <InputBase defaultValue="Naked input" inputProps={{ 'aria-label': 'naked' }} />;
}

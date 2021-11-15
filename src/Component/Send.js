import React from 'react';
import FlatAccordion from './Accordion';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 0,
    flexGrow: 1,
    overflowY: 'scroll',
    padding: theme.spacing(2, 3),
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default function Address(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FlatAccordion />
    </div>
  );
}

import React from 'react';
import Card from '@material-ui/core/Card';

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
  },
  card: {
    width: '100%',
    flexGrow: 1,
    borderRadius: 0
  }
}));

export default function Address(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
      </Card>
    </div>
  );
}

import React from 'react';
import clsx from 'clsx';
import FlatAccordion from './Accordion';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
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
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function Address(props) {
  const classes = useStyles();
  const { pair, draft, setDraft } = props;

  return (
    <div className={clsx(classes.root, !draft.length && classes.center)}>
      {draft.length
        ? <FlatAccordion pair={pair} list={draft} setList={setDraft}/>
        : <Typography variant="button" color="textSecondary"> NO DATA </Typography>}
    </div>
  );
}

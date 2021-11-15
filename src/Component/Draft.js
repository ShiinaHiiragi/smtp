import React from 'react';
import clsx from 'clsx';
import FlatAccordion from './Accordion';
import Overwrite from './Ovewrite';
import { sideList } from './Constant';

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

export default function Draft(props) {
  const classes = useStyles();
  const { pair, now, setNow, draft, setDraft, setRouter } = props;
  const { toList, subject, text, buffer } = now;
  const { setToList, setSubject, setText, clearMail, setBuffer } = setNow;

  const [overwrite, setOverwrite] = React.useState(false);
  const [target, setTarget] = React.useState(null);
  const toggleEdit = (item, index) => {
    const notNil = toList.length || subject.length || text.length;
    if (buffer < 0 || (buffer === 0 && notNil)) {
      setTarget([item, index]);
      setOverwrite(true);
    } else {
      confirm(item, index);
    }
  };

  const confirm = (item, index) => {
    setToList(item.to);
    setSubject(item.message.subject);
    setText(item.message.content);
    setBuffer(index + 1);
    setRouter(sideList.new.index);
  }

  return (
    <div className={clsx(classes.root, !draft.length && classes.center)}>
      {draft.length
        ? <FlatAccordion
          pair={pair}
          list={draft}
          setList={setDraft}
          setBuffer={setBuffer}
          clearMail={clearMail}
          toggleEdit={toggleEdit}
        /> : <Typography variant="button" color="textSecondary"> NO DATA </Typography>}
      <Overwrite
        open={overwrite}
        handleApply={() => confirm(...target)}
        handleClose={() => setOverwrite(false)}
      />
    </div>
  );
}

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import ChipsArray from './Chips';
import { saveObject, timeFormat } from './Constant';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
    alignItems: 'center'
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    flexDirection: 'column'
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  info: {
    display: 'flex'
  },
  buttons: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    display: 'flex',
    maxHeight: 48
  }
}));

export default function FlatAccordion(props) {
  const classes = useStyles();
  const { pair, list, setList, setBuffer, clearMail, toggleEdit } = props;

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (index) => (_, newExpanded) => {
    setExpanded(newExpanded ? index : false);
  };

  const deleteItem = (toDelete) => {
    setList((list) => {
      const newList = list.filter((_, index) => index !== toDelete);
      saveObject(pair.email, pair.localName, newList);
      return newList;
    });
    setBuffer?.((buffer) => {
      if (toggleEdit && Math.abs(buffer) - 1 === toDelete) {
        clearMail();
        return 0;
      }
      return buffer;
    });
    setExpanded(false);
  };

  return (
    <div>
      {list.map((item, index) => (
        <Accordion square expanded={expanded === index} onChange={handleChange(index)}>
          <AccordionSummary>
            <Typography variant="subtitle1" color="textSecondary">
              {timeFormat(new Date(item.time), 'yyyy MM/dd hh:mm:ss')}
            </Typography>
            {'　'}
            <Typography variant="subtitle1">
              {item.message.subject}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.info}>
              <ChipsArray toList={item.to}/>
              <div style={{ flexGrow: 1 }}/>
              <div className={classes.buttons}>
                {toggleEdit && <div className={classes.button}>
                  <IconButton onClick={() => toggleEdit(item, index)}>
                    <CreateOutlinedIcon />
                  </IconButton>
                </div>}
                <div className={classes.button}>
                  <IconButton onClick={() => deleteItem(index)}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            </div>
            <Typography> {item.message.content} </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

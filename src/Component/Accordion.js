import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

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
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function FlatAccordion(props) {
  const { list } = props;

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (index) => (_, newExpanded) => {
    setExpanded(newExpanded ? index : false);
  };

  return (
    <div>
      {list.map((item, index) => (
        <Accordion square expanded={expanded === index} onChange={handleChange(index)}>
          <AccordionSummary>
            <Typography> {item.message.subject} </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography> {item.message.content} </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

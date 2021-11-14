import React from 'react';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const { toList, setToList, toggleEditContact } = props;

  const handleDelete = (chipToDelete) => () => {
    setToList((toList) => toList.filter((_, index) => index !== chipToDelete));
  };

  return (
    <div component="ul" className={classes.root}>
      {toList.map((data, index) => {
        return (
          <li key={index}>
            <Chip
              className={classes.chip}
              variant="outlined"
              label={data.name || data.email}
              onDelete={handleDelete(index)}
            />
          </li>
        );
      })}
      <Chip
        clickable
        icon={<AddIcon />}
        className={classes.chip}
        variant="outlined"
        label={"Add Addressee"}
        onClick={toggleEditContact}
      />
    </div>
  );
}

import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { localName } from "./Constant";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  text: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export default function Sign(props) {
  const classes = useStyles();
  const { open, name, setName, config, handleClose } = props;

  const apply = React.useCallback(() => {
    let result = name;
    const pair = `${config.email}_${localName.sign}`;
    if (!result.length) {
      result = config.email;
    }
    setName(result);
    window.localStorage.setItem(pair, result);
    handleClose();
  }, [config.email, handleClose, name, setName]);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle> Change Signature </DialogTitle>
      <DialogContent>
        <DialogContentText>
          The signature assigned will appear as your name before your E-Mail address.
        </DialogContentText>
        <div className={classes.text}>
          <TextField
            label={'Name'}
            style={{ width: '60%' }}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={apply} color="secondary">
          APPLY
        </Button>
        <Button onClick={handleClose} color="primary">
          BACK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

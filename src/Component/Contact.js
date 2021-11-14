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

export default function Contact(props) {
  const classes = useStyles();
  const { open, handleClose } = props;

  const apply = React.useCallback(() => {
  }, []);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle> Add Addressee </DialogTitle>
      <DialogContent>
        {/* <DialogContentText>
          The signature assigned will appear as your name before your E-Mail address.
        </DialogContentText>
        <div className={classes.text}>
          123
        </div> */}
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

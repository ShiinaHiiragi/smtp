import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { emailReg } from './Constant';

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
  const { open, address, email, setEmail, handleClose, toggleMessageBox } = props;
  const { toSend, toList, toSendError } = email;
  const { setToSend, setToList, setToSendError } = setEmail;

  const apply = () => {
    setToSendError(!toSend.length);
    if (!toSend.length) {
      toggleMessageBox(`Please enter the E-Mail.`, 'error');
      return;
    }
    if (!emailReg.test(toSend)) {
      setToSendError(true);
      toggleMessageBox(`Unsupported E-Mail address.`, 'error');
      return;
    }
    if (toList.find((item) => item.email === toSend)) {
      setToSendError(true);
      toggleMessageBox(`Duplicate E-Mail address.`, 'error');
      return;
    }

    const possibleName = address.find((item) => item.email === toSend)?.name;
    setToList((toList) => [...toList, { name: possibleName ?? "", email: toSend }]);
    handleClose();
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle> Add Addressee </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the address you want to send E-Mail to and click 'APPLY' to continue.
        </DialogContentText>
        <div className={classes.text}>
          <TextField
            label={'E-Mail'}
            style={{ width: '60%' }}
            value={toSend}
            error={toSendError}
            onChange={(event) => setToSend(event.target.value)}
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

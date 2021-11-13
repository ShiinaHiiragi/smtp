import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  }
}));

export default function Auth(props) {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={props.handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle> What is Auth Code? </DialogTitle>
      <DialogContent>
        <DialogContentText>
          The Auth Code is issued by QQ Mailbox. It is a special password used to log in to third-party clients. You need to configure the Auth Code to verify your identity on the SMTP server.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          BACK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

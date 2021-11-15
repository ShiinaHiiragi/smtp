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

export default function Overwrite(props) {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      open={props.open}
      onClose={props.handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle> Overwrite Warning </DialogTitle>
      <DialogContent>
        <DialogContentText>
          The E-Mail writing now has not been saved. Clicking 'YES' will overwrite the unsaved mail with the chosen one.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleApply} color="secondary">
          YES
        </Button>
        <Button onClick={props.handleClose} color="primary">
          BACK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

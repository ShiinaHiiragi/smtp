import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

export default function NewContact(props) {
  const classes = useStyles();
  const { open, form, setForm, handleClose, handleApply } = props;
  const { name, email, nameError, emailError } = form;
  const { setName, setEmail } = setForm;

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      className={classes.noneSelect}
    >
      <DialogTitle> Add New Liaison </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the remarks name and its e-mail, and then click 'APPLY' to continue.
        </DialogContentText>
        <div className={classes.text}>
          <TextField
            label={'Name'}
            style={{ width: '60%' }}
            value={name}
            error={nameError}
            onChange={(event) => setName(event.target.value)}
            // fullWidth
          />
          <TextField
            label={'E-Mail'}
            style={{ width: '60%' }}
            value={email}
            error={emailError}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleApply} color="secondary">
          APPLY
        </Button>
        <Button onClick={handleClose} color="primary">
          BACK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

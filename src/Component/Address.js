import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import MailOutlined from '@material-ui/icons/MailOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import NewContact from './NewContact';
import { contacts } from '../Component/Constant';
import { DataGridPro } from '@mui/x-data-grid-pro';

import { makeStyles } from '@material-ui/core/styles';
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
  card: {
    width: '100%',
    flexGrow: 1,
    borderRadius: 0
  },
  buttons: {
    display: 'flex',
    marginBottom: theme.spacing(1)
  },
  button: {
    borderRadius: 0
  }
}));

export default function Address(props) {
  const classes = useStyles();
  const { toggleMessageBox, address, setAddress } = props;

  const [newContact, setNewContact] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);

  const toggleNewContact = React.useCallback(() => {
    setName("");
    setEmail("");
    setNameError(false);
    setEmailError(false);
    setNewContact(true);
  }, []);

  const apply = () => {
    setNameError(!name.length);
    setEmailError(!email.length);
    if (!name.length || !email.length) {
      toggleMessageBox(`Please enter the name and the e-mail.`, 'error');
      return;
    }
    setAddress((address) => [
      ...address,
      { id: address.length + 1, name: name, email: email }
    ]);
    setNewContact(false);
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<MailOutlined />}
        >
          Send Email
        </Button>
        <div style={{ flexGrow: 1 }}/>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          style={{ marginRight: 8 }}
          startIcon={<CloseIcon />}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={toggleNewContact}
        >
          New
        </Button>
      </div>
      <Card className={classes.card}>
        <DataGridPro
          checkboxSelection
          style={{ borderRadius: 0 }}
          rows={address}
          columns={contacts}
        />
      </Card>
      <NewContact
        open={newContact}
        form={{ name, email, nameError, emailError }}
        setForm={{ setName, setEmail }}
        handleApply={apply}
        handleClose={() => setNewContact(false)}
      />
    </div>
  );
}

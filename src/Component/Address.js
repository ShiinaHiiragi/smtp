import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import MailOutlined from '@material-ui/icons/MailOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import NewContact from './NewContact';
import { contacts, saveObject, localName, emailReg, sideList } from '../Component/Constant';
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';

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
  const apiRef = useGridApiRef();
  const { config, address, setAddress, passing, toggleMessageBox } = props;
  const { toList, setToList, setRouter, setBuffer } = passing;

  const [newContact, setNewContact] = React.useState(false);
  const [invalid, setInvalid] = React.useState(true);

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

  // TODO: Change Contact in draft and new
  const applyNew = () => {
    setNameError(!name.length);
    setEmailError(!email.length);
    if (!name.length || !email.length) {
      toggleMessageBox(`Please enter the name and the E-Mail.`, 'error');
      return;
    }
    if (!emailReg.test(email)) {
      setEmailError(true);
      toggleMessageBox(`Unsupported E-Mail address.`, 'error');
      return;
    }
    if (address.find((item) => item.email === email)) {
      setEmailError(true);
      toggleMessageBox(`Duplicate E-Mail address.`, 'error');
      return;
    }

    setAddress((address) => {
      const newAddress = [
        ...address,
        { id: address.length + 1, name: name, email: email }
      ];
      saveObject(config.email, localName.address, newAddress);
      return newAddress;
    });
    setNewContact(false);
  }

  React.useEffect(() => {
    return apiRef.current.subscribeEvent("selectionChange", (params) => {
      setInvalid(params.length === 0);
    });
  }, [apiRef]);

  const deleteContact = () => {
    setAddress((address) => {
      let newAddress = [...address];
      const forDelete = [...apiRef.current.getSelectedRows().keys()]
        .sort((left, right) => right - left)
        .map((item) => item - 1);
      forDelete.forEach((item) => newAddress.splice(item, 1));
      newAddress.forEach((item, index) => item.id = index + 1);
      saveObject(config.email, localName.address, newAddress);
      return newAddress;
    });
  };

  const pass = () => {
    let toPass = [...apiRef.current.getSelectedRows().keys()];
    let hasPass = toList.map((item) => item.email);
    console.log(hasPass);
    toPass = toPass.filter((item) => !hasPass.includes(address[item - 1].email))
      .map((item) => ({ name: address[item - 1].name, email: address[item - 1].email }));
    setToList((toList) => [...toList, ...toPass]);
    setRouter(sideList.new.index);
    if (toPass.length) {
      setBuffer((buffer) => -Math.abs(buffer));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<MailOutlined />}
          disabled={invalid}
          onClick={pass}
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
          disabled={invalid}
          onClick={deleteContact}
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
          apiRef={apiRef}
        />
      </Card>
      <NewContact
        open={newContact}
        form={{ name, email, nameError, emailError }}
        setForm={{ setName, setEmail }}
        handleApply={applyNew}
        handleClose={() => setNewContact(false)}
      />
    </div>
  );
}

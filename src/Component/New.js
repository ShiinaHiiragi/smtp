import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ChipsArray from './Chips';
import Sign from './Sign';
import Contact from './Contact';
import { localName, saveObject } from './Constant';
// import { globalConfig } from './Sender';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 0,
    flexGrow: 1,
    overflowY: 'scroll',
    padding: theme.spacing(2, 3),
    display: 'flex',
    flexDirection: 'column',
  },
  buttons: {
    display: 'flex',
    marginBottom: theme.spacing(1)
  },
  button: {
    borderRadius: 0
  },
  card: {
    padding: theme.spacing(2, 3),
    width: '100%',
    flexGrow: 1,
    borderRadius: 0
  },
  chip: {
    height: "22%",
    overflowY: "scroll"
  },
  subject: {
    height: 14,
  },
  text: {
    height: "calc(72% - 48px)",
    overflowY: "scroll",
    '& ::before': {
      content: "none"
    },
    '& ::after': {
      content: "none"
    }
  }
}));

export default function New(props) {
  const classes = useStyles();
  const { config, address, mail, setMail, memory, toggleMessageBox } = props;
  const { toList, subject, text, buffer } = mail;
  const { setToList, setSubject, setText, setBuffer } = setMail;
  const { setSended, setDraft } = memory;
  
  const [editSign, setEditSign] = React.useState(false);
  const [editContact, setEditContact] = React.useState(false);
  const [sign, setSign] = React.useState("");
  const [toSend, setToSend] = React.useState("");
  const [toSendError, setToSendError] = React.useState(false);

  React.useEffect(() => {
    let pair = `${config.email}_${localName.sign}`;
    let storage = window.localStorage.getItem(pair);
    if (storage === null) {
      window.localStorage.setItem(pair, config.email);
      storage = config.email;
    }
    setSign(storage);
  // eslint-disable-next-line
  }, []);

  const toggleEditContact = React.useCallback(() => {
    setToSend("");
    setToSendError(false);
    setEditContact(true);
  }, []);

  const send = () => {
    const info = {
      to: toList,
      time: new Date().toISOString(),
      message: { subject: subject, content: text }
    };
    const configs = {
      // ...globalConfig,
      sign: sign,
      from: config.email,
      auth: config.auth
    };
    setSended((sended) => {
      const newSended = [info, ...sended];
      saveObject(config.email, localName.sended, newSended);
      return newSended;
    });
    toggleMessageBox(`The mail has been sent successfully.`, 'success');
    setToList([]);
    setSubject("");
    setText("");
  };

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          style={{ marginRight: 8 }}
          startIcon={<CreateOutlinedIcon />}
          onClick={() => setEditSign(true)}
        >
          Signature
        </Button>
        <div style={{ flexGrow: 1 }}/>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          style={{ marginRight: 8 }}
          startIcon={<SaveOutlinedIcon />}
          disabled={buffer > 0}
          // onClick={toggleNewContact}
        >
          Save Draft
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<SendOutlinedIcon />}
          disabled={!toList.length}
          onClick={send}
        >
          Send E-Mail
        </Button>
      </div>
      <Card className={classes.card}>
        <div className={classes.chip}>
          <ChipsArray
            toList={toList}
            setToList={setToList}
            toggleEditContact={toggleEditContact}
          />
        </div>
        <div style={{ height: "2%" }}/>
        <Divider />
        <div style={{ height: "2%" }}/>
        <TextField
          fullWidth
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          label="Subject"
        />
        <div style={{ height: "2%" }}/>
        <div className={classes.text}>
          <TextField
            fullWidth
            multiline
            value={text}
            onChange={(event) => setText(event.target.value)}
            label="Text"
          />
        </div>
        <Sign
          open={editSign}
          name={sign}
          setName={setSign}
          config={config}
          handleClose={() => setEditSign(false)}
        />
        <Contact
          open={editContact}
          address={address}
          email={{ toSend, toList, toSendError }}
          setEmail={{ setToSend, setToList, setToSendError }}
          handleClose={() => setEditContact(false)}
          toggleMessageBox={toggleMessageBox}
        />
      </Card>
    </div>
  );
}

import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import LayersClearOutlinedIcon from '@material-ui/icons/LayersClearOutlined';
import ChipsArray from './Chips';
import Sign from './Sign';
import Contact from './Contact';
import { localName, saveObject } from './Constant';
import { globalConfig, Sender } from './Sender';

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
  const { config, address, mail, setMail, memory, toggleMessageBox, loading } = props;
  const { toList, subject, text, buffer } = mail;
  const { setToList, setSubject, setText, setBuffer, clearMail } = setMail;
  const { setSended, setDraft } = memory;
  const { toggleLoading, closeLoading } = loading;
  
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
      ...globalConfig,
      sign: sign,
      from: config.email,
      auth: config.auth
    };
    toggleLoading();
    const sender = new Sender(info, configs);
    sender.connect(false, (err) => {
      closeLoading();
      if (err) {
        toggleMessageBox(`Server Error: ${err}`, 'error');
        return;
      }
      setSended((sended) => {
        const newSended = [info, ...sended];
        saveObject(config.email, localName.sended, newSended);
        return newSended;
      });
      toggleMessageBox(`The mail has been sent successfully.`, 'success');
      setBuffer((buffer) => {
        if (buffer) {
          setDraft((draft) => {
            const newDraft = draft.filter((_, index) => index !== Math.abs(buffer) - 1);
            saveObject(config.email, localName.draft, newDraft);
            return newDraft;
          });
        }
        return 0;
      });
      clearMail();
    });
  };

  const save = () => {
    const info = {
      to: toList,
      time: new Date().toISOString(),
      message: { subject: subject, content: text }
    };
    if (buffer < 0) {
      setBuffer((buffer) => {
        const newBuffer = -buffer, newIndex = -buffer - 1;
        setDraft((draft) => {
          const newDraft = draft.map((item, index) => index === newIndex ? info : item);
          saveObject(config.email, localName.draft, newDraft);
          return newDraft;
        });
        return newBuffer;
      });
    } else {
      setDraft((draft) => {
        const newDraft = [info, ...draft];
        saveObject(config.email, localName.draft, newDraft);
        return newDraft;
      });
      setBuffer(1);
    }
  }

  const subjectChange = React.useCallback((event) => {
    setSubject(event.target.value);
    setBuffer((buffer) => -Math.abs(buffer));
  }, [setBuffer, setSubject]);

  const textChange = React.useCallback((event) => {
    setText(event.target.value);
    setBuffer((buffer) => -Math.abs(buffer));
  }, [setBuffer, setText]);

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
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
          startIcon={<LayersClearOutlinedIcon />}
          onClick={() => { clearMail(); setBuffer(0); }}
        >
          Clear
        </Button>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          style={{ marginRight: 8 }}
          startIcon={<SaveOutlinedIcon />}
          disabled={buffer > 0}
          onClick={save}
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
            setBuffer={setBuffer}
            toggleEditContact={toggleEditContact}
          />
        </div>
        <div style={{ height: "2%" }}/>
        <Divider />
        <div style={{ height: "2%" }}/>
        <TextField
          fullWidth
          value={subject}
          onChange={subjectChange}
          label="Subject"
        />
        <div style={{ height: "2%" }}/>
        <div className={classes.text}>
          <TextField
            fullWidth
            multiline
            value={text}
            onChange={textChange}
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
          setEmail={{ setToSend, setToList, setToSendError, setBuffer }}
          handleClose={() => setEditContact(false)}
          toggleMessageBox={toggleMessageBox}
        />
      </Card>
    </div>
  );
}

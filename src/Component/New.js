import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import Sign from './Sign';
import { localName } from './Constant';

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
    height: "18%",
    overflowY: "scroll"
  },
  text: {
    height: "78%",
    overflowY: "scroll",
    '& ::before': {
      content: "none"
    },
    '& ::after': {
      content: "none"
    }
  },
  nil: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function New(props) {
  const classes = useStyles();
  const { config, toggleMessageBox, mail, setMail } = props;
  const { toList, text } = mail;
  const { setToList, setText } = setMail;
  
  const [editSign, setEditSign] = React.useState(false);
  const [sign, setSign] = React.useState("");

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
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<PersonAddOutlinedIcon />}
          // onClick={toggleNewContact}
        >
          New Addressee
        </Button>
        <div style={{ flexGrow: 1 }}/>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<SendOutlinedIcon />}
          disabled={!toList.length}
          // onClick={toggleNewContact}
        >
          Send E-Mail
        </Button>
      </div>
      <Card className={classes.card}>
        <div className={classes.chip}>
          <div
            className={classes.nil}
            children={<Typography children="NO ADDRESSEE NOW" variant="button"/>}
          />
        </div>
        <div style={{ height: "2%" }}/>
        <Divider />
        <div style={{ height: "2%" }}/>
        <div className={classes.text}>
          <TextField
            fullWidth
            multiline
            value={text}
            onChange={(event) => setText(event.target.value)}
            label="Text Here"
          />
        </div>
        <Sign
          open={editSign}
          name={sign}
          setName={setSign}
          config={config}
          handleClose={() => setEditSign(false)}
        />
      </Card>
    </div>
  );
}

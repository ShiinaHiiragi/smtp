import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Auth from '../Component/Auth';
import MessageBox from "../Component/MessageBox";
import { globalConfig, Sender } from '../Component/Sender';
import { localName } from '../Component/Constant';
import Panel from './Panel';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Ichinoe '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Log() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [auth, setAuth] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [authError, setAuthError] = React.useState(false);
  const [tick, setTick] = React.useState(false);
  const [authDialogue, setAuthDialogue] = React.useState(false);

  React.useEffect(() => {
    const storageEmail = window.localStorage.getItem(localName.email);
    setTick(storageEmail !== null);
    if (storageEmail !== null) {
      setEmail(storageEmail);
    }
  }, []);

  // the setting of snackbar
  const [messageBoxInfo, setMessageBoxInfo] = React.useState({
    open: false,
    type: "success",
    message: ""
  });
  const toggleMessageBox = React.useCallback((message, type) => {
    setMessageBoxInfo({
      open: true,
      type: type,
      message: message
    });
  }, []);
  const closeMessageBox = React.useCallback(() => {
    setMessageBoxInfo((snackbarInfo) => ({
      ...snackbarInfo,
      open: false
    }));
  }, []);

  const verify = React.useCallback(() => {
    setEmailError(!email.length);
    setAuthError(!auth.length);
    if (!email.length || !auth.length) {
      toggleMessageBox(`Please enter the E-Mail and the Auth Code.`, 'error');
      return;
    }
    const sender = new Sender({ }, { ...globalConfig, email: email, auth: auth });
    sender.connect(true, (err) => {
      if (err) {
        toggleMessageBox(`Auth Error: ${err}`, 'error');
      } else {
        ReactDOM.render(<Panel email={email} auth={auth}/>, document.getElementById("root"));
        if (tick) {
          window.localStorage.setItem(localName.email, email);
        }
      }
    });
  }, [email, auth, tick, toggleMessageBox]);

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MailOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in to SMTP Sender
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            value={email}
            error={emailError}
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Auth Code"
            type="password"
            value={auth}
            error={authError}
            onChange={(event) => setAuth(event.target.value)}
          />
          <FormControlLabel
            checked={tick}
            onChange={(event) => setTick((tick) => !tick)}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember my E-mail"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={verify}
          >
            Log IN
          </Button>
          <Grid container>
            <Grid item>
              <Link
                variant="body2"
                style={{cursor: "pointer"}}
                onClick={() => setAuthDialogue(true)}
              >
                What is Auth Code?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Auth
        open={authDialogue}
        handleClose={() => setAuthDialogue(false)}
      />
      <MessageBox
        open={messageBoxInfo.open}
        handleClose={closeMessageBox}
        messageBoxType={messageBoxInfo.type}
        messageBoxMessage={messageBoxInfo.message}
      />
    </Container>
  );
}

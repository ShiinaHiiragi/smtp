import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ichinoe.xyz" target="_blank">
        Ichinoe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

export default function Log() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [auth, setAuth] = React.useState("");
  const [tick, setTick] = React.useState(false);

  React.useEffect(() => {
    const storageEmail = window.localStorage.getItem("email");
    setTick(storageEmail !== null);
    if (storageEmail !== null) {
      setEmail(storageEmail);
    }
  }, []);

  const tickRemember = (event) => {
    setTick((tick) => !tick);
  }

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
            onChange={(event) => setAuth(event.target.value)}
          />
          <FormControlLabel
            checked={tick}
            onChange={tickRemember}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember my E-mail"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log IN
          </Button>
          <Grid container>
            <Grid item>
              <Link variant="body2" style={{cursor: "pointer"}}>
                What is Auth Code?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

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
    overflowY: "scroll"
  },
  nil: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export default function New() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.buttons}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          style={{ marginRight: 8 }}
          startIcon={<CreateOutlinedIcon />}
          // onClick={toggleNewContact}
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
          临兵斗者皆阵列在前
        </div>
      </Card>
    </div>
  );
}

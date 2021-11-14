import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import MailOutlined from '@material-ui/icons/MailOutlined';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
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
  const { address } = props;

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
    </div>
  );
}

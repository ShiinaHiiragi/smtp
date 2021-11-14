
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 0,
    flexGrow: 1,
    overflowY: 'scroll'
  }
}));

export default function Address() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      1
    </div>
  );
}

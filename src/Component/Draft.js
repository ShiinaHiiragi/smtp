
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 0,
    flexGrow: 1,
    overflowY: 'scroll',
    padding: theme.spacing(2, 3)
  }
}));

export default function Draft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      4
    </div>
  );
}

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import makeStyles from "@material-ui/core/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

export default function Load(props) {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <CircularProgress color="inherit" size={56} />
    </Backdrop>
  );
}

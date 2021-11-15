import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CheckIcon from '@material-ui/icons/Check';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import favicon from './favicon.png';
import MessageBox from "../Component/MessageBox";
import { localName, sideList, loadObject } from '../Component/Constant';
import Address from '../Component/Address';
import New from '../Component/New';
import Send from '../Component/Send';
import Draft from '../Component/Draft';

import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
    display: 'flex',
    height: '100%'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    display: 'flex',
    maxHeight: '100%',
    flexDirection: 'column',
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Panel(props) {
  const classes = useStyles();

  const [drawer, setDrawer] = React.useState(true);
  const [config, setConfig] = React.useState({ });
  const [router, setRouter] = React.useState(sideList.smtp.index);

  /**
   * The meaning of buffer state:
   * 0 - Unsave, and no e-mail accordance
   * N - N > 0. Saved, and correspond to no.N e-mail
   * N - N < 0. Unsave, and correspond to no.-N e-mail
   */
  const [buffer, setBuffer] = React.useState(0);

  const [address, setAddress] = React.useState([]);

  const [toList, setToList] = React.useState([]);
  const [subject, setSubject] = React.useState("");
  const [text, setText] = React.useState("");

  // initilize from local storage
  React.useEffect(() => {
    setConfig({ email: props.email, auth: props.email });
    setAddress(loadObject(props.email, localName.address));
  // eslint-disable-next-line
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setDrawer(!drawer)}
            edge="start"
            className={classes.menuButton}
          >
            {drawer ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap>
            {sideList[Object.keys(sideList).find((item) => sideList[item].index === router)].name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <ListItem style={{ paddingLeft: 16 }}>
          <ListItemAvatar>
            <img src={favicon} alt="" width={32} height={32} />
          </ListItemAvatar>
          <ListItemText primary="SMTP Sender" secondary="Version 0.1.0" />
        </ListItem>
        <Divider />
        <List>
          <ListItem
            button
            selected={router === sideList.address.index}
            onClick={() => setRouter(sideList.address.index)}
          >
            <ListItemIcon style={{ paddingLeft: 4 }}>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText
              primary={sideList.address.name}
              secondary={`${address.length} Liaison${address.length > 1 ? 's' : ''}`}
            />
          </ListItem>
          <ListItem
            button
            selected={router === sideList.new.index}
            onClick={() => setRouter(sideList.new.index)}
          >
            <ListItemIcon style={{ paddingLeft: 4 }}>
              <MailOutlineIcon />
            </ListItemIcon>
            <ListItemText
              primary={sideList.new.name}
              secondary={`${buffer > 0 ? 'Saved' : 'No Save'}`}
            />
          </ListItem>
          <ListItem
            button
            selected={router === sideList.send.index}
            onClick={() => setRouter(sideList.send.index)}
          >
            <ListItemIcon style={{ paddingLeft: 4 }}>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary={sideList.send.name}
            />
          </ListItem>
          <ListItem
            button
            selected={router === sideList.draft.index}
            onClick={() => setRouter(sideList.draft.index)}
          >
            <ListItemIcon style={{ paddingLeft: 4 }}>
              <SaveAltIcon />
            </ListItemIcon>
            <ListItemText
              primary={sideList.draft.name}
            />
          </ListItem>
        </List>
      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: drawer })}>
        <div className={classes.drawerHeader} />
        {router === sideList.address.index
          ? <Address
            config={config}
            address={address}
            setAddress={setAddress}
            passing={{ toList, setToList, setRouter }}
            toggleMessageBox={toggleMessageBox}
          /> : router === sideList.new.index
          ? <New
            config={config}
            address={address}
            mail={{ toList, subject, text, buffer }}
            setMail={{ setToList, setSubject, setText, setBuffer }}
            toggleMessageBox={toggleMessageBox}
          /> : router === sideList.send.index
          ? <Send />
          : router === sideList.draft.index
          ? <Draft />
          : null}
      </main>
      <MessageBox
        open={messageBoxInfo.open}
        handleClose={closeMessageBox}
        messageBoxType={messageBoxInfo.type}
        messageBoxMessage={messageBoxInfo.message}
      />
    </div>
  );
}

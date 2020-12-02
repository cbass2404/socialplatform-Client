import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Tooltip } from "@material-ui/core";

import AccountCircle from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  pictureIcon: {
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    maxWidth: "100%",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const menuId = "primary-search-account-menu";

  const {
    user: {
      authenticated,
      credentials: { handle, imageUrl },
      notifications,
    },
    logoutUser,
  } = props;

  const history = useHistory();

  const handleLogout = () => {
    logoutUser(history);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item>
            <Link to="/">
              <h2>POSTAL</h2>
            </Link>
          </Grid>
          <Grid item>
            <Tooltip title="Add a new post">
              <IconButton color="inherit">
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Your profile">
              <Link to={`/user/${handle}`}>
                {!authenticated ? "@GUEST" : `@${handle}`}{" "}
              </Link>
            </Tooltip>
            <Tooltip title="See your notifications">
              <IconButton color="inherit">
                <Badge badgeContent={notifications.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Link to="/signup">SIGNUP</Link>
            <Tooltip title={!authenticated ? "Login" : "Logout"}>
              <Link
                to={!authenticated ? "/login" : null}
                onClick={authenticated ? handleLogout : null}
              >
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                >
                  {!authenticated ? (
                    <AccountCircle className={classes.pictureIcon} />
                  ) : (
                    <img
                      src={imageUrl}
                      alt="Profile Picture"
                      className={classes.pictureIcon}
                    />
                  )}
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  handle: PropTypes.string,
  imageUrl: PropTypes.string,
  notifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);

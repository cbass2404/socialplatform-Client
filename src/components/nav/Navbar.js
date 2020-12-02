import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Tooltip } from "@material-ui/core";
import theme from "../util/theme";

import AccountCircle from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const styles = {
  ...theme,
  pictureIcon: {
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    maxWidth: "50px",
  },
};

const Navbar = (props) => {
  const menuId = "primary-search-account-menu";

  const {
    classes,
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
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Tooltip title="Home">
              <Link to="/">
                <h2>POSTAL</h2>
              </Link>
            </Tooltip>
          </Grid>
          <Grid item>
            {authenticated ? (
              <Tooltip title="Add a new post">
                <IconButton color="inherit">
                  <AddIcon />
                </IconButton>
              </Tooltip>
            ) : null}
            <Tooltip title={!authenticated ? "Login" : "Your profile"}>
              <Link to={!authenticated ? "/login" : `/users/${handle}`}>
                {!authenticated ? "@GUEST" : `@${handle}`}{" "}
              </Link>
            </Tooltip>
            {authenticated ? (
              <Tooltip title="See your notifications">
                <IconButton color="inherit">
                  <Badge badgeContent={notifications.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : null}
          </Grid>
          <Grid item>
            {!authenticated ? <Link to="/signup">SIGNUP</Link> : null}
            <Tooltip title={!authenticated ? "Login" : "Logout"}>
              <Link
                to={!authenticated ? "/login" : "/"}
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
                      alt="Profile"
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
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
  handle: PropTypes.string,
  imageUrl: PropTypes.string,
  notifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Navbar)
);

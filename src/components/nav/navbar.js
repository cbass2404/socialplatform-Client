import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";
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
    logoutUser();
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Tooltip title="Home">
              <MuiLink component={Link} to={`/`} color="inherit" variant="h5">
                POSTAL
              </MuiLink>
            </Tooltip>
          </Grid>
          <Grid item>
            {authenticated ? (
              <Tooltip title="Add a new post">
                <MuiLink
                  component={Link}
                  to={`/new-post`}
                  color="inherit"
                  variant="h5"
                >
                  <IconButton color="inherit">
                    <AddIcon />
                  </IconButton>
                </MuiLink>
              </Tooltip>
            ) : null}
            <Tooltip title={!authenticated ? "Login" : "Your profile"}>
              <MuiLink
                component={Link}
                to={!authenticated ? "/login" : `/users/${handle}`}
                color="inherit"
                variant="h5"
              >
                {!authenticated ? "@GUEST" : `@${handle.toUpperCase()}`}{" "}
              </MuiLink>
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
            {!authenticated ? (
              <MuiLink
                component={Link}
                to={`signup`}
                color="inherit"
                variant="h6"
              >
                SIGNUP
              </MuiLink>
            ) : null}

            <Tooltip title={!authenticated ? "Login" : "Logout"}>
              <MuiLink
                component={Link}
                to={!authenticated ? "/login" : "/"}
                color="inherit"
                variant="h5"
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
              </MuiLink>
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

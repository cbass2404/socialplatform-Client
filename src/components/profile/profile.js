import { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// import PropTypes from "prop-types";

import theme from "../util/theme";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import LocationOn from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

import { connect } from "react-redux";
import { uploadImage } from "../redux/actions/userActions";

import TipButton from "../util/tipButton";
import EditDetails from "./editDetails";

const styles = {
  ...theme,
};

const Profile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
    user: { credentials, loading, authenticated },
    uploadImage,
  } = props;

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  let setProfile = !loading ? (
    authenticated && credentials.handle === handle ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="Profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <TipButton
              tip="Edit profile picture"
              onClick={handleEditPicture}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </TipButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            <EditDetails />
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="Profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    )
  ) : (
    "Loading..."
  );

  return setProfile;
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { uploadImage })(
  withStyles(styles)(Profile)
);

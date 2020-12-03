import { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import theme from "../util/theme";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { newPost } from "../redux/actions/dataActions";

const styles = {
  ...theme,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  image: {
    width: 200,
    height: 200,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
  },
};

const NewPost = (props) => {
  const {
    classes,
    credentials: { handle, imageUrl },
    UI: { loading },
    newPost,
  } = props;

  const [body, setBody] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    newPost(body, history);
  };

  return (
    <Grid container justify="space-between">
      <Grid item />
      <Grid container direction="column">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <img src={imageUrl} alt="Profile" className={classes.image} />
          </Grid>
          <Grid item>
            <Typography variant="h4" color="primary">
              @{handle}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Post"
              placeholder="Post content"
              className={classes.textField}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

NewPost.propTypes = {
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  newPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
  UI: state.UI,
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { newPost })(
  withStyles(styles)(NewPost)
);

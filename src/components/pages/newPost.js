import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import theme from "../util/theme";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { newPost, editPost } from "../redux/actions/dataActions";

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
  const history = useHistory();
  const postParamId = props.match.params.postId;
  const {
    classes,
    user: {
      credentials: { handle, imageUrl },
    },
    UI: { loading },
    newPost,
    editPost,
  } = props;

  const [edit, setEdit] = useState(false);
  const [post, setPost] = useState({});
  const [body, setBody] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleNewSubmit = (e) => {
    e.preventDefault();
    newPost(body, history);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const edittedPost = post.postId;
    editPost(edittedPost, body, history);
  };

  useEffect(() => {
    postParamId
      ? axios
          .get(`posts/${postParamId}`)
          .then((res) => {
            setPost(res.data);
            setEdit(true);
            return res.data;
          })
          .then((data) => {
            setBody(data.body);
          })
          .catch((err) => {
            console.error("editpost body", err);
          })
      : setEdit(false);
  }, []);

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
          <form onSubmit={!edit ? handleNewSubmit : handleEditSubmit}>
            <TextField
              name="body"
              type="text"
              label="Post"
              placeholder="Post content"
              className={classes.textField}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={disabled}
              fullWidth
              required
            />

            <Button
              type="submit"
              disabled={loading && disabled}
              color="primary"
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
  classes: PropTypes.object,
  credentials: PropTypes.object,
  UI: PropTypes.object.isRequired,
  newPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  classes: state.classes,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  newPost,
  editPost,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(NewPost));

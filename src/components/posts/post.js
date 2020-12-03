import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { deletePost } from "../redux/actions/dataActions";

import { withStyles, Tooltip } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import theme from "../util/theme";

import ChatIcon from "@material-ui/icons/Chat";
import DeleteIcon from "@material-ui/icons/Delete";

import TipButton from "../util/tipButton";

const styles = {
  ...theme,
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

const Post = (props) => {
  const {
    classes,
    user: { authenticated, credentials },
    post: {
      body,
      commentCount,
      createdAt,
      handle,
      imageUrl,
      likeCount,
      postId,
    },
    deletePost,
  } = props;

  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <Grid container justify="space-between">
        <CardMedia
          image={imageUrl}
          title="Profile image"
          className={classes.image}
        />
        <Grid item>
          <CardContent className={classes.content}>
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${handle}`}
              color="primary"
            >
              {handle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            <span>{likeCount} Likes</span>
            <TipButton tip="comments">
              <ChatIcon color="primary" />
            </TipButton>
            <span>{commentCount} comments</span>
          </CardContent>
        </Grid>
        <Grid item>
          {authenticated && credentials.handle === handle ? (
            <Grid container>
              <Grid item>
                <Tooltip title="Delete">
                  <Link onClick={() => deletePost(postId)}>
                    <DeleteIcon color="secondary" />
                  </Link>
                </Tooltip>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Card>
  );
};

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { deletePost })(
  withStyles(styles)(Post)
);

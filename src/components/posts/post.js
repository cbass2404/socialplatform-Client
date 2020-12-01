import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import theme from "../util/theme";

import ChatIcon from "@material-ui/icons/Chat";

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
  } = props;

  dayjs.extend(relativeTime);

  return (
    <Card className={classes.card}>
      <CardMedia
        image={imageUrl}
        title="Profile image"
        className={classes.image}
      />
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
    </Card>
  );
};

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Post));

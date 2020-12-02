import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

import Post from "../posts/post";
import Profile from "../profile/profile";

const User = (props) => {
  const {
    data: { posts, loading },
    getUserData,
  } = props;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const handle = props.match.params.handle;
    getUserData(handle);
  }, [getUserData, props.match.params.handle]);

  useEffect(() => {
    const handle = props.match.params.handle;
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log("userProfile getUserData", err));
    return;
  }, [props.match.params.handle]);

  const userPosts =
    posts !== null
      ? posts.filter((post) => post.handle === props.match.params.handle)
      : null;

  const postMarkup = loading ? (
    "Loading..."
  ) : userPosts === null ? (
    <p>No post updates from this user</p>
  ) : (
    userPosts.map((post) => {
      return <Post key={post.postId} post={post} />;
    })
  );

  return (
    <Grid container spacing={10} direction="row">
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          "Can not find that user"
        ) : (
          <Profile profile={profile} />
        )}
      </Grid>
      <Grid item sm={8} xs={12}>
        {postMarkup}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);

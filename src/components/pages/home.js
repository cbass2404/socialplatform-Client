import { useEffect } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

import Post from "../posts/post";

const Home = (props) => {
  const {
    getPosts,
    data: { posts, loading },
  } = props;

  let postFeed = !loading
    ? posts !== null
      ? posts.map((post) => {
          return <Post key={post.postId} post={post} />;
        })
      : "No posts"
    : "Loading";

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {postFeed}
      </Grid>
      <Grid item sm={4} xs={12}></Grid>
    </Grid>
  );
};

Home.propTypes = {
  data: PropTypes.object,
  getPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(Home);

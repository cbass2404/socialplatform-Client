import { LOADING_DATA, SET_POSTS } from "../types";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
      console.log(res);
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
      console.error("GET ALL POSTS", err);
    });
};

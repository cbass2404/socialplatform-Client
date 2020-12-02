import { CLEAR_ERRORS, LOADING_DATA, SET_POSTS } from "../types";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts")
    .then((res) => {
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

export const getUserData = (handle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${handle}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts,
      });
    })
    .catch(() => {
      dispatch({ type: SET_POSTS, payload: null });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

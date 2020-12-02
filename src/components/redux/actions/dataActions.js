import {
  CLEAR_ERRORS,
  LOADING_DATA,
  NEW_POST,
  SET_POSTS,
  LOADING_UI,
  SET_ERRORS,
  DELETE_POST,
} from "../types";
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

export const newPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/posts", newPost)
    .then((res) => {
      dispatch({
        type: NEW_POST,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deletePost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/posts/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST });
      dispatch({ CLEAR_ERRORS });
      console.log("DELETED POST");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

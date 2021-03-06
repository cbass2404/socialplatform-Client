import {
  CLEAR_ERRORS,
  LOADING_DATA,
  NEW_POST,
  SET_POST,
  SET_POSTS,
  LOADING_UI,
  SET_ERRORS,
  DELETE_POST,
  EDIT_POST,
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

export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/posts/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POST,
        payload: {},
      });
      console.error("GET A POST", err);
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

export const newPost = (body, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/posts", { body })
    .then((res) => {
      dispatch({
        type: NEW_POST,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .then(() => {
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
      });
      console.error("NEW POST DATAACTIONS.JS", err);
    });
};

export const deletePost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .delete(`/posts/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
      dispatch({ CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const editPost = (postId, body, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .patch(`/posts/${postId}`, { body })
    .then((res) => {
      dispatch({
        type: EDIT_POST,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .then(() => {
      history.push("/");
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

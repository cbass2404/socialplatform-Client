import {
  LOADING_DATA,
  NEW_POST,
  SET_POST,
  SET_POSTS,
  EDIT_POST,
  DELETE_POST,
  LIKE_POST,
  UNLIKE_POST,
  SUBMIT_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case NEW_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case EDIT_POST:
      let editIdx = state.posts.findIndex((post) => post.postId === action);
      state.posts[editIdx].body = action.payload;
      state.post.postId === action.payload.postId &&
        (state.post.body = action.payload.body);
      state.posts.postId === action.payload.postId &&
        (state.posts.body = action.payload.body);
      return {
        ...state,
      };
    case DELETE_POST:
      let idx = state.posts.findIndex((post) => post.postId === action.payload);
      state.posts.splice(idx, 1);
      return {
        ...state,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let postIdx = state.posts.findIndex(
        (post) => post.postId === action.payload
      );
      state.posts[postIdx] = action.payload;
      state.post.postId === action.payload.postId &&
        (state.post = action.payload);
      state.posts.postId === action.payload.postId &&
        (state.posts = action.payload);
      return {
        ...state,
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments],
        },
      };
    case EDIT_COMMENT:
      let commentIdx = state.post.findIndex(
        (comment) => comment.id === action.payload
      );
      state.post.comments[commentIdx].body = action.payload;
      return {
        ...state,
      };
    case DELETE_COMMENT:
      let deleteComment = state.post.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      state.post.comments.splice(deleteComment, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}

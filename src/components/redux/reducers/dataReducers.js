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

export default function (state = initialState, action) {
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
      let idx = state.posts.findIndex((post) => post.postId === action);
      state.post.postId === action.payload.postId &&
        (state.post.body = action.payload.body);
      state.posts.postId === action.payload.postId &&
        (state.posts.body = action.payload.body);
      return {
        ...state,
        post: (post.body = action.payload),
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          post.id !== action.payload.postId;
        }),
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let idx = state.posts.findIndex((post) => post.postId === action.payload);
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
      let idx = state.post.findIndex(
        (comment) => comment.id === action.payload
      );
      state.post.comments.body = action.payload;
      return {
        ...state,
      };
    case DELETE_COMMENT:
      let comment = state.post.comments.filter((comment) => {
        comment.id === action.payload && comment;
      });
      state.post.comments.splice(comment, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}

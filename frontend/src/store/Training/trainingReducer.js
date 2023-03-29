import {
  TRAINING_CREATE_FAIL,
  TRAINING_CREATE_REQUEST,
  TRAINING_CREATE_RESET,
  TRAINING_CREATE_REVIEW_FAIL,
  TRAINING_CREATE_REVIEW_REQUEST,
  TRAINING_CREATE_REVIEW_RESET,
  TRAINING_CREATE_REVIEW_SUCCESS,
  TRAINING_CREATE_SUCCESS,
  TRAINING_DELETE_FAIL,
  TRAINING_DELETE_REQUEST,
  TRAINING_DELETE_SUCCESS,
  TRAINING_DETAILS_FAIL,
  TRAINING_DETAILS_REQUEST,
  TRAINING_DETAILS_SUCCESS,
  TRAINING_LIST_FAIL,
  TRAINING_LIST_REQUEST,
  TRAINING_LIST_SUCCESS,
  TRAINING_TYPE_LIST_FAIL,
  TRAINING_TYPE_LIST_REQUEST,
  TRAINING_TYPE_LIST_SUCCESS,
  TRAINING_UPDATE_FAIL,
  TRAINING_UPDATE_REQUEST,
  TRAINING_UPDATE_RESET,
  TRAINING_UPDATE_SUCCESS,
  TRAINING_LIKE_FAIL,
  TRAINING_LIKE_REQUEST,
  TRAINING_LIKE_SUCCESS,
  TRAINING_LIKE_RESET,
} from "./trainingConstants";

export const trainingListReducer = (state = { trainings: [] }, action) => {
  switch (action.type) {
    case TRAINING_LIST_REQUEST:
      return { loading: true, trainings: [] };
    case TRAINING_LIST_SUCCESS:
      return {
        loading: false,
        trainings: action.payload,
      };
    case TRAINING_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trainingDetailsReducer = (
  state = { training: { reviews: [], exercise: [] } },
  action
) => {
  switch (action.type) {
    case TRAINING_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TRAINING_DETAILS_SUCCESS:
      return { loading: false, training: action.payload };
    case TRAINING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trainingDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINING_DELETE_REQUEST:
      return { loading: true };
    case TRAINING_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRAINING_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trainingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINING_CREATE_REQUEST:
      return { loading: true };
    case TRAINING_CREATE_SUCCESS:
      return { loading: false, success: true, training: action.payload };
    case TRAINING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const trainingUpdateReducer = (state = { training: {} }, action) => {
  switch (action.type) {
    case TRAINING_UPDATE_REQUEST:
      return { loading: true };
    case TRAINING_UPDATE_SUCCESS:
      return { loading: false, success: true, training: action.payload };
    case TRAINING_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINING_UPDATE_RESET:
      return { training: {} };
    default:
      return state;
  }
};

export const trainingReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINING_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case TRAINING_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case TRAINING_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case TRAINING_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const trainingTypeReducer = (state = { trainings: [] }, action) => {
  switch (action.type) {
    case TRAINING_TYPE_LIST_REQUEST:
      return {
        loading: true,
        trainings: [],
      };
    case TRAINING_TYPE_LIST_SUCCESS:
      return { loading: false, trainings: action.payload };
    case TRAINING_TYPE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const trainingToggleLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINING_LIKE_REQUEST:
      return {
        loading: true,
      };
    case TRAINING_LIKE_SUCCESS:
      return { loading: false, success: true };
    case TRAINING_LIKE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINING_LIKE_RESET:
      return {};
    default:
      return state;
  }
};

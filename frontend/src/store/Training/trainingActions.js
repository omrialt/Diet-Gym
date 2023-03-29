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
} from "./trainingConstants";
import axios from "axios";

export const listTrainings = () => async (dispatch) => {
  try {
    dispatch({ type: TRAINING_LIST_REQUEST });
    const { data } = await axios.get(`/api/training`);
    dispatch({
      type: TRAINING_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TRAINING_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listTrainingDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TRAINING_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/training/${id}`);
    dispatch({
      type: TRAINING_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TRAINING_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteTraining = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINING_DELETE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        x_auth_token: userInfo.token,
      },
    };

    await axios.delete(`/api/training/${id}`, config);
    dispatch({
      type: TRAINING_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: TRAINING_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createTraining = (training) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINING_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        x_auth_token: userInfo.token,
      },
    };

    const { data } = await axios.post(`/api/training`, training, config);
    dispatch({
      type: TRAINING_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TRAINING_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateTraining = (training) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINING_UPDATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        x_auth_token: userInfo.token,
      },
    };
    const { data } = await axios.put(
      `/api/training/${training._id}`,
      training,
      config
    );
    dispatch({
      type: TRAINING_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TRAINING_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createTrainingReview =
  (trainingId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRAINING_CREATE_REVIEW_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          x_auth_token: userInfo.token,
        },
      };

      await axios.post(`/api/training/${trainingId}/reviews`, review, config);
      dispatch({
        type: TRAINING_CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: TRAINING_CREATE_REVIEW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listTrainingByType = (type) => async (dispatch) => {
  try {
    dispatch({ type: TRAINING_TYPE_LIST_REQUEST });
    const { data } = await axios.get(`/api/training/types/${type}`);
    dispatch({
      type: TRAINING_TYPE_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TRAINING_TYPE_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const toggleTrainingLike =
  (trainingId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRAINING_LIKE_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          x_auth_token: userInfo.token,
        },
      };

      await axios.post(`/api/training/${trainingId}/likes`, {}, config);
      dispatch({
        type: TRAINING_LIKE_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: TRAINING_LIKE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

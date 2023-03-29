import {
  MENU_CREATE_FAIL,
  MENU_CREATE_REQUEST,
  MENU_CREATE_RESET,
  MENU_CREATE_REVIEW_FAIL,
  MENU_CREATE_REVIEW_REQUEST,
  MENU_CREATE_REVIEW_RESET,
  MENU_CREATE_REVIEW_SUCCESS,
  MENU_CREATE_SUCCESS,
  MENU_DELETE_FAIL,
  MENU_DELETE_REQUEST,
  MENU_DELETE_SUCCESS,
  MENU_DETAILS_FAIL,
  MENU_DETAILS_REQUEST,
  MENU_DETAILS_SUCCESS,
  MENU_LIST_FAIL,
  MENU_LIST_REQUEST,
  MENU_LIST_SUCCESS,
  MENU_TYPE_LIST_FAIL,
  MENU_TYPE_LIST_REQUEST,
  MENU_TYPE_LIST_SUCCESS,
  MENU_UPDATE_FAIL,
  MENU_UPDATE_REQUEST,
  MENU_UPDATE_RESET,
  MENU_UPDATE_SUCCESS,
  MENU_LIKE_FAIL,
  MENU_LIKE_REQUEST,
  MENU_LIKE_SUCCESS,
} from "./menuConstants";
import axios from "axios";

export const listMenus = () => async (dispatch) => {
  try {
    dispatch({ type: MENU_LIST_REQUEST });
    const { data } = await axios.get(`/api/menu`);
    dispatch({
      type: MENU_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MENU_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listMenuDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MENU_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/menu/${id}`);
    dispatch({
      type: MENU_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MENU_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteMenu = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENU_DELETE_REQUEST,
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

    await axios.delete(`/api/menu/${id}`, config);
    dispatch({
      type: MENU_DELETE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: MENU_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createMenu = (menu) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENU_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        x_auth_token: userInfo.token,
      },
    };

    const { data } = await axios.post(`/api/menu`, menu, config);
    dispatch({
      type: MENU_CREATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MENU_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateMenu = (menu) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENU_UPDATE_REQUEST,
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
    const { data } = await axios.put(`/api/menu/${menu._id}`, menu, config);
    dispatch({
      type: MENU_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MENU_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createMenuReview =
  (menuId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MENU_CREATE_REVIEW_REQUEST,
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

      await axios.post(`/api/menu/${menuId}/reviews`, review, config);
      dispatch({
        type: MENU_CREATE_REVIEW_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: MENU_CREATE_REVIEW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listMenuByType = (type) => async (dispatch) => {
  try {
    dispatch({ type: MENU_TYPE_LIST_REQUEST });
    const { data } = await axios.get(`/api/menu/types/${type}`);
    dispatch({
      type: MENU_TYPE_LIST_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MENU_TYPE_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const toggleMenuLike = (menuId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MENU_LIKE_REQUEST,
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

    await axios.post(`/api/menu/${menuId}/likes`, {}, config);
    dispatch({
      type: MENU_LIKE_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: MENU_LIKE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

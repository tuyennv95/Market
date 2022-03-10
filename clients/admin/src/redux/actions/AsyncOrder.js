import {
  SET_ORDER,
  SET_ERR_ORDER,
  REMOVE_ERROR_ORDER,
  SET_LOAD,
  HIDDEN_LOAD,
  SET_REDIRECT,
  SET_DETAIL_ORDER,
  CANCEL_REDIRECT,
  SET_ERR_ORDER_EDIT,
  REMOVE_ERROR_ORDER_EDIT
} from "constan/types";
import orderApi from "config/orderApi";

export const getAllOrder = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOAD });
    try {
      const orders = await orderApi.getOrders(data);
      dispatch({ type: SET_ORDER, payload: orders.data });
      dispatch({ type: REMOVE_ERROR_ORDER });
      dispatch({ type: HIDDEN_LOAD });
    } catch (err) {
      dispatch({ type: SET_ERR_ORDER, payload: err.message });
      dispatch({ type: HIDDEN_LOAD });
    }
  };
};
export const getOrder = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOAD });
    try {
      const order = await orderApi.getOrder(data);
      dispatch({ type: SET_DETAIL_ORDER, payload: order.data[0] });
      dispatch({ type: REMOVE_ERROR_ORDER });
      dispatch({ type: HIDDEN_LOAD });
    } catch (err) {
      dispatch({ type: HIDDEN_LOAD });
      dispatch({ type: SET_ERR_ORDER, payload: err.message });
    }
  };
};
export const delOrder = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOAD });
    try {
      const del = await orderApi.deleteOrder(data);
      dispatch({ type: REMOVE_ERROR_ORDER });
      dispatch({ type: HIDDEN_LOAD });
      dispatch({ type: SET_REDIRECT });
    } catch (error) {
      dispatch({ type: SET_ERR_ORDER, payload: error.response.data.message });
      dispatch({ type: HIDDEN_LOAD });
      dispatch({ type: REMOVE_ERROR_ORDER });

    }
  };
};
export const editOrderAct = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOAD });
    try {
      const del = await orderApi.editOrder(data);
      dispatch({ type: REMOVE_ERROR_ORDER_EDIT });
      dispatch({ type: HIDDEN_LOAD });
      dispatch({ type: SET_REDIRECT });
      dispatch({ type: CANCEL_REDIRECT });

    } catch (error) {
      dispatch({ type: SET_ERR_ORDER_EDIT, payload: error.response.data.message });
      dispatch({ type: HIDDEN_LOAD });
      dispatch({ type: REMOVE_ERROR_ORDER_EDIT });

    }
  };
};

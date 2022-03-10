import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "api/orderApi";

export const getAllOrders = createAsyncThunk(
  "order/getAll",
  async (payload) => {
    const response = await orderApi.getOrders(payload);
    return response.data;
  }
);
export const getOrderDetail = createAsyncThunk(
  "order/getorder",
  async (payload) => {
    const response = await orderApi.getOrder(payload);
    return response.data.result;
  }
);
export const getAdrCus = createAsyncThunk("order/getAdr", async (payload) => {
  const response = await orderApi.getAddress(payload);
  return response.data.result;
});

const initialState = {
  isLoading: false,
  err: "",
  orders: null,
  order: null,
  adr: null,
};
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getAllOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
      state.err = "";
    },
    [getAllOrders.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.error;
      state.orders = null;
    },
    [getOrderDetail.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderDetail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.order = action.payload;
      state.err = "";
    },
    [getOrderDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.error;
      state.order = null;
    },


    [getAdrCus.pending]: (state) => {
      state.isLoading = true;
    },
    [getAdrCus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.adr = action.payload;
      state.err = "";
    },
    [getAdrCus.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action.error;
      state.adr = null;
    },
  },
});
const { actions, reducer } = orderSlice;
export const {} = actions;
export default reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "api/userApi";

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, {rejectWithValue}) => {
    // const response = await userApi.register(userData);
    // return response;
    try {
      const response = await userApi.register(userData);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
);

export const login = createAsyncThunk("user/login", async (payload) => {
  const data2 = await userApi.login(payload);
  localStorage.setItem("token", data2.data.result);
  return data2;
});
export const change = createAsyncThunk("user/changepass", async (payload) => {
  try {
    const data2 = await userApi.changePass(payload);
  } catch (error) {
    return error.response.data.message;
  }
});

const initialState = {
  isLoading: false,
  errorMessage: "",
  currentUser: null,
  userName: "",
  err: "",
  listLove: [],
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.isLoading = false;
      state.errorMessage = "";
      state.currentUser = null;
      state.userName = "";
      state.listLove = [];
    },
    setUser(state, action) {
      state.userName = action.payload;
    },
    setErr(state, action) {
      state.err = action.payload;
    },
    setLoveAct(state, action) {
      state.listLove = action.payload;
    },
    addLoveAct(state, action) {
      state.listLove.push(action.payload);
    },
    removeLoveAct(state, action) {
      const list = state.listLove.filter((item) => item !== action.payload);
      state.listLove = list;
    },
    removeErrReg(state){
      state.errorMessage = null;
    }
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.errorMessage = "";
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.currentUser = null;
      

    },

    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.errorMessage = "";
      // state.userName = action.payload.meta.arg.username
    },
    [login.rejected]: (state) => {
      state.isLoading = false;
      state.errorMessage = "Login lỗi rồi anh";
      state.currentUser = null;
      state.userName = "";
    },
    [change.pending]: (state) => {
      state.isLoading = true;
    },
    [change.fulfilled]: (state, action) => {
      state.isLoading = false;
      //   state.err = action.payload;
    },
    [change.rejected]: (state, action) => {
      state.isLoading = false;
      state.err = action;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout, setUser, setLoveAct, addLoveAct, removeLoveAct, removeErrReg } =
  actions;
export default reducer;

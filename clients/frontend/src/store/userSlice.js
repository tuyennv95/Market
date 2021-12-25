import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from 'api/userApi';

export const registerUser = createAsyncThunk('user/register', async (userData, thunkAPI) =>{
   
    const response  = await userApi.register(userData);
    return response.data.result;
});

export const login = createAsyncThunk('user/login', async (payload) =>{
    const data2 = await userApi.login(payload);
    localStorage.setItem('token', data2.data.result);
    return data2;
})

const initialState ={
    isLoading: false,
    errorMessage: '',
    currentUser: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        logout(state){
            state.errorMessage = '1234556'
        }
    },
    extraReducers:{
        [registerUser.pending]: (state) =>{
            state.isLoading = true;
        },
        [registerUser.fulfilled] :(state, action) =>{
            state.isLoading = false;
            state.currentUser = action.payload.data.result;
            state.errorMessage = '';


        },
        [registerUser.rejected] :(state, action) =>{
            state.isLoading = false;
            state.errorMessage = action.error;
            state.currentUser = null;

        },


        [login.pending]: (state) =>{
            state.isLoading = true;
        },
        [login.fulfilled] :(state, action) =>{
            state.isLoading = false;
            state.currentUser = action.payload;
            state.errorMessage = '';


        },
        [login.rejected] :(state) =>{
            state.isLoading = false;
            state.errorMessage = 'Login lỗi rồi anh';
            state.currentUser = null;

        },
        

    }
})

const { actions, reducer} = userSlice;
export const {logout} = actions;
export default reducer;



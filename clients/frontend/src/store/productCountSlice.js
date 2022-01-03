import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsApi from 'api/productApi';
export const getCount = createAsyncThunk('product/count', async (payload) =>{
    const response = await productsApi.getCountProducts(payload);
    return response.data;
})
const initialState = {
    count: 0,
    errorMessage: '',
    isLoading: false
}
const productCountSlice = createSlice({ 
    name: 'count',
    initialState: initialState, 
    reducers:{

    },
    extraReducers:{
        [getCount.pending]: (state) =>{
            state.isLoading = true;
        },
        [getCount.fulfilled] :(state, action) =>{
            state.isLoading = false;
            state.errorMessage = '';
            state.count = action.payload.result;
        },
        [getCount.rejected] :(state, action) =>{
            state.isLoading = false;
            state.errorMessage = action.error;
            state.count = 0;
        }
    }
 })
const {reducer} = productCountSlice;
export default reducer;
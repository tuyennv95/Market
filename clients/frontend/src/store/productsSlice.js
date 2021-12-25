import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsApi from 'api/productApi';

export const getProducts = createAsyncThunk('user/getProducts', async (payload) =>{
   
    const response  = await productsApi.getProducts(payload);
    return response;
});


const initialState ={
    isLoading: false,
    errorMessage: '',
    listProducts: [],
}
const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers:{
       
    },
    extraReducers:{
        [getProducts.pending]: (state) =>{
            state.isLoading = true;
        },
        [getProducts.fulfilled] :(state, action) =>{
            state.isLoading = false;
            state.errorMessage = '';
            state.listProducts = action.payload.data;


        },
        [getProducts.rejected] :(state, action) =>{
            state.isLoading = false;
            state.errorMessage = action.error;
            state.listProducts = [];

        }



        

    }
})

const { reducer} = productsSlice;
// export const {logout} = actions;
export default reducer;



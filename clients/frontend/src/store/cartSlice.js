import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      if (state?.listCart?.length === 0) {
        state.listCart.push(action.payload);
      } else {
        const index = state?.listCart?.map((item) => item?.id)?.indexOf(action?.payload.id);
        if (index === -1) {
          state.listCart.push(action.payload);
        } else {
          state.listCart[index] = action.payload;
        }
      }
    },
    delCartItem(state, action){
        state.listCart = state.listCart.filter(e => e.id !== action.payload.id)
    },
    resetCart(state){
      state.listCart = [];
    }
   
  },
});

const { actions, reducer } = cartSlice;
export const { addToCart, delCartItem,resetCart } = actions;
export default reducer;

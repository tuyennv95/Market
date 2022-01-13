import {
  GET_PRODUCTS,
  SET_LOAD,
  HIDDEN_LOAD,
  REMOVE_ERROR,
} from "constan/types";
import productApi from "config/productApi";

export const getAllPRoduct = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOAD });
    try {
      const getList = await productApi.getProducts(data);
      const data1 = [];
      for (let i = 0; i < getList?.data?.length; i++) {
        data1.push({
          ...getList?.data[i],
          priceProduct: getList?.data[i]?.price.price,
          priceProductSale: getList?.data[i].price?.priceSale,
        });
      }
      dispatch({ type: GET_PRODUCTS, payload: data1 });
      dispatch({ type: REMOVE_ERROR });

      dispatch({ type: HIDDEN_LOAD });
    } catch (error) {}
  };
};

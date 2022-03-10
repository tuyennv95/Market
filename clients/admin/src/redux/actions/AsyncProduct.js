import {
  GET_PRODUCTS,
  SET_LOAD,
  HIDDEN_LOAD,
  SET_REDIRECT,
  REMOVE_ERR_PRODUCT,
  ERR_PRODUCT,
  GET_PRODUCT
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
      dispatch({ type: REMOVE_ERR_PRODUCT });

      dispatch({ type: HIDDEN_LOAD });
    } catch (error) {
      dispatch({ type: ERR_PRODUCT, payload: error });
    }
  };
};
export const createProductAct = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOAD });
    try {
      const creta = await productApi.createProduct(data);
      dispatch({ type: SET_REDIRECT });
      dispatch({ type: REMOVE_ERR_PRODUCT });
      dispatch({ type: HIDDEN_LOAD });
    } catch (error) {
      dispatch({ type: ERR_PRODUCT, payload: error });
    }
  };
};
export const deleteProductAct = (data) =>{
  return async (dispatch) =>{
    dispatch({ type: SET_LOAD })
    try{
      const del = await productApi.deleteProduct(data);
      dispatch({ type: REMOVE_ERR_PRODUCT });
      dispatch({ type: HIDDEN_LOAD });
      window.location.reload();

    }
    catch(error){
      dispatch({ type: ERR_PRODUCT, payload: error})
    }
  }
}
export const getProductAct = (data) =>{
  return async (dispatch) => {
    dispatch({ type: SET_LOAD })
    try{
      const getp = await productApi.getProduct(data); 
      dispatch({ type: GET_PRODUCT, payload: getp.data.result})
      dispatch({ type: REMOVE_ERR_PRODUCT });
      dispatch({ type: HIDDEN_LOAD });
      
    }
    catch(error){
      dispatch({ type: ERR_PRODUCT, payload: error});
    }
  }
}
export const updateProductAct = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOAD })
    try{
      const update = await productApi.updateProduct(data);
      dispatch({ type: SET_REDIRECT});
      dispatch({ type: HIDDEN_LOAD })
      dispatch({ type:REMOVE_ERR_PRODUCT})
    }
    catch(error){
      dispatch({ type: ERR_PRODUCT})
      dispatch({ type: HIDDEN_LOAD});
    }
  }
}

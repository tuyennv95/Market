import React,{useEffect} from 'react';
import ShopCart from 'components/ShopCart/ShopCart';
import orderApi from 'api/orderApi';
import { useDispatch } from 'react-redux';
import { getAdrCus } from 'store/orderSlice';
const Cart = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAdrCus())
    },[])
    return (
        <div>
            <ShopCart/>
        </div>
    );
};

export default Cart;
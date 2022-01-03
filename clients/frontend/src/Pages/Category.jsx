import React,{ useEffect} from 'react';
import { useParams } from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import { getProducts } from "store/productsSlice";
import ShowProducts from 'components/ShowProducts/ShowProducts';
import {getCount } from 'store/productCountSlice'

const Category = () => {
    let {id} = useParams();
    const dispatch = useDispatch()
    const data = useSelector((state=> state.products.listProducts))
    
    useEffect(()=>{
        dispatch(getCount({ 
            categoryCode: id,
            // recordPerPage: 1000,
          }))
    }, [dispatch, id])

    return (
        <div className="category" style={{marginTop: '50px'}}>
            <div className="container">
                <div className="category-main">
                    <ShowProducts data={data}/>
                </div>
            </div>
        </div>
    );
};

export default Category;
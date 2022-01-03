import React,{useEffect} from 'react';
import {useSearchParams  } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts} from 'store/productsSlice';
import ShowProducts from 'components/ShowProducts/ShowProducts';
import {getCount } from 'store/productCountSlice'

const Search = (props) => {
const dispatch = useDispatch();
const dataListSearch = useSelector((state) => state.products.listProducts)
const count = useSelector(state => state.count.count);

const [searchParams] = useSearchParams();
const key = searchParams.get('key');
useEffect(()=>{
    dispatch(getCount({ 
        keyword: key,
        recordPerPage: 1000,
      }))
}, [dispatch, key])

    return (
        <div className="search" style={{marginTop:'30px'}}>
            <div className="container">
                <div className="search-main">
                    <ShowProducts data={dataListSearch}/>
                </div>
            </div>
        </div>
    );
};

export default Search;
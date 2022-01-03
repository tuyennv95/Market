import ShowProductItem from 'components/ShowProductItem/ShowProductItem';
import ShowProductSame from 'components/ShowProductItem/ShowProductSame';
import React, { useEffect, useState } from "react";
import productsApi from "api/productApi";
import { useParams } from "react-router";

const Product = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    productsApi
      .getProductDetail(id)
      .then((response) => setData(response?.data?.result));
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
        <div>
            <ShowProductItem data={data}/>
            <ShowProductSame data={data} />
        </div>
    );
};

export default Product;
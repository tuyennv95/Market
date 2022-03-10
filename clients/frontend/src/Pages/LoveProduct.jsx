import { Col, Row, Empty } from "antd";
import ProductDetail from "components/ProductDetail/ProductDetail";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
const LoveProduct = () => {
  const listLove = useSelector((state) => state.user.listLove);
  const listProducts = useSelector((state) => state.products.listProducts);
  const listData = listProducts.filter(
    (item) => listLove.indexOf(item.code) !== -1
  );

  return (
    <div className="love-products" style={{ margin: "50px 0" }}>
      <div className="container">
        <h2 style={{ fontWeight: "700", textTransform: "uppercase" }}>
          Sản phẩm yêu thích
        </h2>
        <div className="love-products-main" style={{ margin: "100px 0" }}>
          {listData.length !== 0 ? (
            <Row
              justify="space-between"
              style={{ flexWrap: "wrap", marginBottom: "200px" }}
              gutter={[8, 16]}
              align="middle"
            >
              {listData &&
                listData.map((propduct, index) => (
                  <Col
                    className="styleCol"
                    key={propduct.code}
                    md={6}
                    sm={8}
                    xs={12}
                  >
                    <ProductDetail data={propduct} />
                  </Col>
                ))}
            </Row>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoveProduct;

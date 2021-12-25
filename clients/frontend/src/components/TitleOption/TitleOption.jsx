import React from "react";
import "./style.css";
import { GiftOutlined } from "@ant-design/icons";
import { Select  } from "antd";
import {Link } from "react-router-dom";

const { Option } = Select;
const TitleOption = () => {
  const sortOptions = [0, 1, 2];
  const [option, setOption] = React.useState(0);
  const handleProvinceChange = (value) => {
    setOption(value);
  };
  return (
    <div className="title-option">
      <div className="container">
        <div className="title-option-main">
          <div className="title">
            <div className="text">
              <h2>Thịt lợn</h2>
            </div>
            <div className="option">
              <Link to="">
                <div className="promotion">
                  <GiftOutlined
                    style={{
                      marginTop: "2px",
                      color: "black",
                      fontWeight: "500",
                      marginRight: "5px",
                    }}
                  />
                  <h2>Khuyến mại</h2>
                </div>
              </Link>
              <div  className="option-divider" ></div>
              <div className="sort">
                <Select
                  defaultValue="Sắp xếp"
                  style={{ width: 150 }}
                  onChange={handleProvinceChange}
                >
                  {sortOptions.map((sortOption) => (
                    <Option key={sortOption}>
                      {sortOption === 0
                        ? "Sắp xếp"
                        : sortOption === 1
                        ? "Giá tăng dần"
                        : sortOption === 2
                        ? "Giá giảm dần"
                        : ""}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TitleOption;

import React,{useEffect} from "react";
import "./style.css";
import { GiftOutlined } from "@ant-design/icons";
import { Select  } from "antd";
import {Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useNavigate } from "react-router";
const { Option } = Select;
const TitleOption = () => {
  // const sortOptions = [0, 'ASC', 'DESC'];
  // const [option, setOption] = React.useState(0);
  const navigate = useNavigate();
  const loca = useLocation();
  const pathname = loca.pathname;
  const search = queryString.parse(loca.search);
  function makeUrl(x) {
    return `${pathname}?${queryString.stringify({...search, isSale: x , page: 1})}`;
  }
  function makeUrl2(xy){
    return `${pathname}?${queryString.stringify({...search, sort: xy, fieldSorted: 'price.price'  })}`;

  }

  const handleProvinceChange = (value) => {
      navigate(makeUrl2(value))  
  };
  

  return (
    <div className="title-option">
      <div className="container">
        <div className="title-option-main">
          <div className="title">
            <div className="text">
              {/* <h2>Thịt lợn</h2> */}
            </div>
            <div className="option">
              <Link to={makeUrl(true)}>
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
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="ASC">Giá tăng dần</Option>
                  <Option value="DESC">Giá giảm dần</Option>
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

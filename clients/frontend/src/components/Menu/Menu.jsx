import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import categoryApi from "api/categoryApi";
import { Affix } from 'antd';
const Menu = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    categoryApi.getData().then((response) => {
      setData(response.data);
    });
  }, []);
  const level0 = data.filter((item) => item.level === 0);
  const level1 = data.filter((item) => item.level === 1);
  const level2 = data.filter((item) => item.level === 2);

  function renderLV0() {
    return level0.map((itemLv0, index) => (
      <li key={itemLv0.code} className="menu-main-item">
        <Link className="link-menu" to={`/category/${itemLv0.code}`}>
          <h2>{itemLv0.name}</h2>
        </Link>
        <div className={`menu-show ${index > 2 ? 'toRight' : 'toLeft'}`}>
          <ul className="menu-show-list">
            {level1
              .filter((itemLv1) => itemLv1.parentCode === itemLv0.code)
              .map((itemMap1, index) => (
                <li key={itemMap1.code} className="menu-show-item">
                  <Link
                    className="menu-show-item-link"
                    to={`/category/${itemMap1.code}`}
                  >
                    {itemMap1.name}
                  </Link>
                  <ul className="menu-show-item-col">
                    {level2 &&
                      level2
                        .filter((itemLv2) => itemLv2.parentCode === itemMap1.code)
                        .map((itemMap2) => (
                          <li key={itemMap2.code} className="menu-show-item-row">
                            <Link
                              className="menu-show-item-row-link"
                              to={`/category/${itemMap2.code}`}
                            >
                              {itemMap2.name}
                            </Link>
                          </li>
                        ))}
                  </ul>
                </li>
              ))}

          </ul>
        </div>
      </li>
    ));
  }

  return (
    <>
      {data && (
        <Affix offsetTop={50}>
        <div className="menu">
          <div className="container">
            <div className="menu-main">
              <ul className="menu-main-list">{renderLV0()}</ul>
            </div>
          </div>
        </div>
        </Affix>
    )}
    </>
  );
};

export default Menu;

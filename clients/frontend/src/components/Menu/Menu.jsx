import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
const Menu = () => {

  return (
    <div className="menu">
      <div className="container">
        <div className="menu-main">
          <ul className="menu-main-list">
            <li className="menu-main-item">
              <Link className="link-menu" to="">
                <h2>Trái cây</h2>
              </Link>
              {/* ---menu show---  */}
              <div  className="menu-show">
                <ul className="menu-show-list">
                  {/* --1-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---1---  */}
                  {/* --2-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---2---  */}
                  {/* --3-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---3---  */}
                </ul>
              </div>
              {/* ---menu show---  */}
            </li>

            <li className="menu-main-item">
              <Link className="link-menu" to="">
                <h2>Rau củ</h2>
              </Link>
              {/* ---menu show---  */}
              <div className="menu-show">
                <ul className="menu-show-list">
                  {/* --1-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---1---  */}
                  {/* --2-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---2---  */}
                  {/* --3-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---3---  */}
                </ul>
              </div>
              {/* ---menu show---  */}
            </li>
            <li className="menu-main-item">
              <Link className="link-menu" to="">
                <h2>Gia vị & Phụ liệu</h2>
              </Link>
              {/* ---menu show---  */}
              <div className="menu-show">
                <ul className="menu-show-list">
                  {/* --1-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---1---  */}
                  {/* --2-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---2---  */}
                  {/* --3-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---3---  */}
                </ul>
              </div>
              {/* ---menu show---  */}
            </li>
            <li className="menu-main-item">
              <Link className="link-menu" to="">
                <h2>Thịt & Trứng</h2>
              </Link>
              {/* ---menu show---  */}
              <div className="menu-show">
                <ul className="menu-show-list">
                  {/* --1-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---1---  */}
                  {/* --2-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---2---  */}
                  {/* --3-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---3---  */}
                </ul>
              </div>
              {/* ---menu show---  */}
            </li>
            <li className="menu-main-item">
              <Link className="link-menu" to="">
                <h2>Hàng khô</h2>
              </Link>
              {/* ---menu show---  */}
              <div className="menu-show">
                <ul className="menu-show-list">
                  {/* --1-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---1---  */}
                  {/* --2-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---2---  */}
                  {/* --3-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---3---  */}
                </ul>
              </div>
              {/* ---menu show---  */}
            </li>
            <li className="menu-main-item">
              <Link className="link-menu" to="">
                <h2>Thủy hải sản</h2>
              </Link>
              {/* ---menu show---  */}
              <div className="menu-show">
                <ul className="menu-show-list">
                  {/* --1-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---1---  */}
                  {/* --2-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---2---  */}
                  {/* --3-- */}
                  <li className="menu-show-item">
                    <Link className="menu-show-item-link" to="#">
                      Trái cây tươi
                    </Link>
                    <ul className="menu-show-item-col">
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Taó
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Lê
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Chuối
                        </Link>
                      </li>
                      <li className="menu-show-item-row">
                        <Link className="menu-show-item-row-link" to="#">
                          Dưa hấu
                        </Link>
                      </li>
                    </ul>
                  </li>
                  {/* ---3---  */}
                </ul>
              </div>
              {/* ---menu show---  */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;

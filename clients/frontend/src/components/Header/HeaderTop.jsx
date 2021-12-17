import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import {PhoneOutlined} from '@ant-design/icons';

const HeaderTop = () => {
    const loadingPage = () =>{

    }
    return (
      <div className="header-top">
        <div className="container">
          <div className="header-top_main" style={{paddingTop: '10px'}}>
            
                <ul className="phone-wrap">
                  <li><PhoneOutlined style={{ fontSize: '24px', color: '#08c' }}/><Link className="link phone-header" to="/">0824 307 307</Link></li>
                </ul>
            
                <ul className="ht-menu">
                  <li>
                    <Link onClick={()=>loadingPage()} style={{fontSize: '14px', color: 'black' }} to="/login-register" className=""> Đăng nhập </Link>
                        {/* <div className="dropdown show">
                          <Link to="#" className=" fix-link-color dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Tài khoản
                          </Link>
                          <div className="fix-text-item dropdown-menu ht-setting-list " aria-labelledby="dropdownMenuLink">
                            <Link className="fix-text-item dropdown-item" to="/profile">Tài khoản của bạn</Link>
                            <Link onClick={this.logOut} to="/login-register" className="fix-text-item dropdown-item" href="/">Đăng xuất</Link>
                          </div>
                        </div> */}
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
    )
  }




export default HeaderTop;

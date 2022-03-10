import React,{useEffect} from "react";
import { Row, Col, Form, Input, Button,message } from "antd";
import {useNavigate} from 'react-router-dom';
import "./style.css";
// import axios from "axios";
// import { unwrapResult } from '@reduxjs/toolkit';
import {login, setUser} from 'store/userSlice';
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { setLoveAct } from "store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const success = () => {
    message.success('Đăng nhập thành công');
  };
  const error = () => {
    message.error('Thử lại. Đăng nhập không thành công.');
  };
  const onFinish = async (value) => {
    const dataLogin = await dispatch(login(value));
    if(dataLogin.payload){
      dispatch(setUser(dataLogin?.meta?.arg?.username))
      const token = await dataLogin?.payload?.data?.result;
      const encodeData = await jwt_decode(token);
      dispatch(setLoveAct(encodeData?.productFavorite));
      success();
      setTimeout(() => {
        navigate('/');
      }, 3000)
    }else{
      error();
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const onFinishFailed = (errorInfo) => {};
  const moveLink= () =>{
    navigate('/register');
  }
  return (
    <div className="login">
      <div className="container">
        <div className="login-main">
          <Row gutter={48}>
            <Col md={12} sm={24} xs={24}>
              <div className="login-text">
                <h2>Đăng nhập</h2>
                <p>Bạn đã có tài khoản. Hãy đăng nhập</p>
              </div>
              <hr />
              <div className="login-form">
                <Form
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input placeholder="Email" className="login-form-input" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Password"
                      className="login-form-input"
                    />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      className="login-btn"
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <div className="login-text">
                <h2>Đăng ký</h2>
                <h3 style={{padding: '20px 0'}}>Bạn chưa có tài khoản</h3>
                <p>Hãy đăng ký ngay bằng cách click vào nút bên dưới.</p>
              </div>
              <div >
                  <Button onClick={moveLink} type="primary" className="login-btn btn2" size="large">Đăng ký ngay</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Login;

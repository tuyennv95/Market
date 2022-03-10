import React, { useState } from "react";
import "./style.css";
import {useDispatch, useSelector} from 'react-redux';
import {login} from 'redux/actions/AsyncAuth';
const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.AuthReducer)
  
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const {name, value} = e.target;
    setState({
      ...state,
      [name] : value,
    })
  };
  const onLogin = (e) =>{
    e.preventDefault();
    dispatch(login(state))
  }
  return (
    <div className="login-page">
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={onLogin}>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name / Email"
                  name="email"
                  onChange={handleInput}
                  value={state.email}
                  required
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password"
                  name="password"
                  onChange={handleInput}
                  value={state.password}
                  required

                />
              </div>
              <button className="button login__submit">
                <span className="button__text">{user?.isLoading ? '...Loading' : 'LOGIN'}</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            <div className="social-login">
              <h3>LOGIN ADMIN</h3>
              <div className="social-icons">
                <a href="#" className="social-login__icon fab fa-instagram"></a>
                <a href="#" className="social-login__icon fab fa-facebook"></a>
                <a href="#" className="social-login__icon fab fa-twitter"></a>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

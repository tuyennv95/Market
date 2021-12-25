import React from "react";
import { useForm } from "react-hook-form";
import './style.css';
// import { unwrapResult } from '@reduxjs/toolkit';
import {registerUser} from 'store/userSlice';
import {useDispatch} from 'react-redux';
import {message} from 'antd';
import { useNavigate } from "react-router";

const Register = () => {
  const { register, handleSubmit,formState: {errors},watch  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const userData ={
      fullName: data?.name,
      password: data?.password,
      phone: data?.mobile,
     verifyPassword: data?.passwordConfirm,
    }
    const data2 = await dispatch(registerUser(userData));
    // unwrapResult(data2);
    console.log("🚀 ~ file: Register.jsx ~ line 23 ~ onSubmit ~ data2", data2)
     if(data2?.type === 'user/register/fulfilled'){
      const success = () => {
        message.success('Đăng ký thành công');
      };
      success();
      setTimeout(() =>{
        navigate('/login')
      },2000)
    }else{
      const error = () => {
        message.error('Đăng ký không thành công, xin mời thử lại.');
      };
      error();
    }
  }
 
 
  return (
    <div className="register">
      <div className="container">
        <div className="register-main">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input
              type="text"
              {...register("name", { required: true, maxLength: 80 })}
            />
             {errors.name?.type === 'required' && <p>Name is required</p>}

            <label>Mobile number</label>
            <input
              type="tel"
              {...register("mobile", {
                required: true,
                maxLength: 11,
                minLength: 8,
              })}
            />
             {errors.mobile?.type === 'required' && <p>Mobile number is required</p>}

            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
            />
             {errors.password?.type === 'required' && <p>Password is required</p>}

            <label>Confirm Password</label>
            <input
              type="password"
              {...register("passwordConfirm", {
                required: true,
                maxLength: 20,
                minLength: 3,
                validate: (value) => {
                  return value === watch('password'); // value is from password2 and watch will return value from password1
                },
               
              })}
             
            />
             {errors.passwordConfirm?.type === 'required' ? (<p>Password is required</p>) : (errors.passwordConfirm?.value === watch('password') ? '' : <p>Password is note match</p>)}
            <input type="submit" value="Đăng ký" className ="reg-btn"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

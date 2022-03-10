import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import "./style.css";
// import { unwrapResult } from '@reduxjs/toolkit';
import { registerUser } from "store/userSlice";
import { message } from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { removeErrReg } from "store/userSlice";

const Register = () => {
  const password = useRef({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  password.current = watch("password", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const err = useSelector((state) => state?.user?.errorMessage);
  console.log("🚀 ~ err", err);
  useEffect(() => {
    dispatch(removeErrReg());
  }, [err]);
  const onSubmit = async (data) => {
    const userData = {
      fullName: data?.name,
      password: data?.password,
      phone: data?.mobile,
      verifyPassword: data?.passwordConfirm,
    };
    const data2 = await dispatch(registerUser(userData));
    console.log("🚀 ~ data2", data2);
    // unwrapResult(data2);
    if (data2?.type === "user/register/fulfilled") {
      const success = () => {
        message.success("Đăng ký thành công");
      };
      success();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      const error = () => {
        message.error(data2.payload);
      };
      error();
    }
  };

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
            {errors.name?.type === "required" && <p>Name is required</p>}

            <label>Mobile number</label>
            <input
              type="tel"
              {...register("mobile", {
                required: true,
                maxLength: 11,
                minLength: 9,
              })}
            />
            {errors.mobile?.type === "required" && (
              <p>Mobile number is required</p>
            )}

            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 6,
              })}
            />
            {errors.password?.type === "required" && (
              <p>Password is required</p>
            )}

            <label>Confirm Password</label>
            <input
              type="password"
              {...register("passwordConfirm", {
                required: true,
                maxLength: 20,
                minLength: 6,
                validate: (value) => {
                  return (
                    value === password.current || "The passwords do not match"
                  ); // value is from password2 and watch will return value from password1
                },
              })}
            />
            {console.log(errors)}
            {errors.passwordConfirm?.type === "required" ? (
              <p>Password is required</p>
            ) : errors.passwordConfirm?.type === "validate" ? (
              <p>Password is note match</p>
            ) : (
              ""
            )}
            
            <input type="submit" value="Đăng ký" className="reg-btn" />
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default Register;

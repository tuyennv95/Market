import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { registerUser } from "redux/actions/AsyncCustomer";
import {useDispatch, useSelector} from 'react-redux';
import { CANCEL_REDIRECT } from "constan/types";
import {useHistory} from 'react-router-dom'
 const AddProduct = (props) => {
  const {isLoading, redirect} = useSelector((state) => state.LoadingReducer)
  
    const dispatch = useDispatch();
    const history = useHistory();
  const [image, setImage] = useState("");
  const [form] = Form.useForm()
  const success = () => {
    message.success('Thêm thành công');
  };
  useEffect(()=>{
    if(redirect){
      dispatch({type: CANCEL_REDIRECT});
      success();
      setTimeout(()=>{
          history.push('/customers')
      }, 1000)

    }
  },[redirect])
  const onFinish = async (values) => {
    const reg = await dispatch(registerUser(values));
    console.log('🚀 ~ reg', reg);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleUploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "market");
      const {
        data: { secure_url },
      } = await axios.post(
        "https://api.cloudinary.com/v1_1/marketlocal/image/upload",
        formData
      );
      setImage(secure_url);
    } catch (e) {
      console.dir(e.response.data.message);
    }
  };

  return (
    <div>
      <h2>Thêm sản phẩm mới</h2>

      <div className="add-form">
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="FullName"
            name="fullName"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your Mobile Number!" },
            ]}
          >
            <Input />
          </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>

              <Form.Item label="Avatar" name="avatar">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  //   showUploadList={false}
                  beforeUpload={handleUploadFile}
                  name="avatar"
                  maxCount={1}
                  accept=".jpg, .png"
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                ,
              </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="verifyPassword"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? 'Loading' : 'Add User'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;

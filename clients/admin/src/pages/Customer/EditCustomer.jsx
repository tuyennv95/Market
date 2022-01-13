import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { registerUser } from "redux/actions/AsyncCustomer";
import {useDispatch, useSelector} from 'react-redux';
import { CANCEL_REDIRECT } from "constan/types";
import {useHistory} from 'react-router-dom';
import { getUserDetail,editUser } from "redux/actions/AsyncCustomer";
 const EditCustomer = (props) => {
  const {isLoading, redirect} = useSelector((state) => state.LoadingReducer);
  const {user} = useSelector((state) => state.CustomerReducer);
  console.log('🚀 ~ user', user);
  const {id} = props?.match?.params;
   const dispatch = useDispatch();
 const history = useHistory();
  const [image, setImage] = useState("");
  const [form] = Form.useForm()
  const success = () => {
    message.success('Thêm thành công');
  };
  useEffect(() => {
    dispatch(getUserDetail(id));
  },[id])
//   useEffect(() => {
//     form.setFieldsValue({
        
//     })
//   },[user])

   const valueInput = {
        fullName: user?.fullName,
        phone: user?.phone,
        email: user?.email || "",
        avatar: image,
    }
        


  useEffect(()=>{
    if(redirect){
      dispatch({type: CANCEL_REDIRECT});
      success();
      setTimeout(()=>{
          history.push('/customers')
      }, 1000)

    }
  },[redirect])
  const onFinish = async ( values) => {
      const dataInput = {...values, avatar: image}
      await dispatch(editUser(dataInput));
    
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
      <h2>Thay đổi thông tin người dùng</h2>
    
    {isLoading ?
    <Spin />  
    
    : (

              
      
      <div className="add-form">
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={valueInput}
        >
          <Form.Item
            label="FullName"
            name="fullName"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input {...props}/>
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
                  
                  listType="picture-card"
                  //   showUploadList={false}
                  beforeUpload={handleUploadFile}
                  maxCount={1}
                  accept=".jpg, .png"
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
                ,
              </Form.Item>
        

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? 'Loading' : 'Add User'}
            </Button>
          </Form.Item>
        </Form>
      </div>
        )}  
    </div>
    
  );
};

export default EditCustomer;

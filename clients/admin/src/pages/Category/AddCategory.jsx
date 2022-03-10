import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { CANCEL_REDIRECT } from "constan/types";
import { useHistory } from "react-router-dom";
import { createCategoryAct, getAllCategory } from "redux/actions/AsyncCategory";
const AddCategory = (props) => {
  const { isLoading, redirect } = useSelector((state) => state.LoadingReducer);
    const {listCategory} = useSelector((state) => state.CategoryReducer);
    // const categoryRender = listCategory?.filter((cate) => cate.level !== 2)
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const {Option} = Select;
  const success = () => {
    message.success("Thêm thành công");
  };
  
  useEffect(() => {
    if (redirect) {
      dispatch({ type: CANCEL_REDIRECT });
      success();
      setTimeout(() => {
        history.push("/categories");
      }, 1000);
    }
  }, [redirect]);
  const onFinish = async (values) => {
    const reg = await dispatch(createCategoryAct(values));
  };

  const onFinishFailed = (errorInfo) => {
  };

  return (
    <div>
      <h2>Thêm danh mục mới</h2>

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
            label="Tên danh mục"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Danh mục cha"
            name="parentCode"
          >
            <Select defaultValue={false} style={{ width: 520 }}>
                {listCategory.map((i) => ( 
                    <Option key={i.code} value={i.code}>ID:{i.code}- Tên danh mục:{i.name}-LEVEL:{i.level}{i.parentCode ? `-Danh mục cha:${i.parentCode}` : ''}</Option>

                ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? "Loading" : "Add Category"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddCategory;

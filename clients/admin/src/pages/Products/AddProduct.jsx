import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, Select, InputNumber } from "antd";
import { Upload, message, Option } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { registerUser } from "redux/actions/AsyncCustomer";
import { useDispatch, useSelector } from "react-redux";
import { CANCEL_REDIRECT } from "constan/types";
import { useHistory } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { createProductAct } from "redux/actions/AsyncProduct";
const AddProduct = (props) => {
  const { isLoading, redirect } = useSelector((state) => state.LoadingReducer);
  const { listCategory } = useSelector((state) => state.CategoryReducer);
  // const categoryLevel2 = listCategory?.filter((item) => item.level === 2);
  const { Option } = Select;
  const [note, setNote] = useState("");
  const [state, setState] = useState(0)
  function onChange1(e) {
    setState(e.target?.value)
    // const {name, value} = e.target;
    // setState({ ...state, [name]: value})
  }
  function onChange(e) {
    
  }

  function onSearch(val) {
  }
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState("");
  const [form] = Form.useForm();
  const success = () => {
    message.success("Thêm thành công");
  };
  useEffect(() => {
    if (redirect) {
      dispatch({ type: CANCEL_REDIRECT });
      success();
      setTimeout(() => {
        history.push("/products");
      }, 1000);
    }
  }, [redirect]);
  const onFinish = async (values) => {
    const valueCate = {...values, image: image, note: note, nameDisplay: values.name, price: {
      price: values.priceProduct,
       priceSale: values.priceProductSale,
    }, tags: []}
    const createP = await dispatch(createProductAct(valueCate));

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
          autoComplete="off"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên Category"
            
            name="categoryCode"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Select
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
            >
              {listCategory?.map((item) => (
                <Option key={item.code} value={item.code}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Upload
              listType="picture-card"
              //   showUploadList={false}
              beforeUpload={handleUploadFile}
              name="image"
              maxCount={1}
              accept=".jpg, .png"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Xuất xứ"
            name="origin"
            rules={[{ required: true, message: "Please input your origin!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="priceProduct"
            label="Giá"
            rules={[
              {
                required: true,
                message: "Please confirm your price!",
              },
            ]}
          >
            <InputNumber prefix="VND" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="priceProductSale"
            label=" Giá khuyến mại"
            onChange={(e) => onChange1(e)}
            rules={[
              {
                required: false,
                message: "Please confirm your price sale!",
              },
            ]}
          >
            <InputNumber prefix="VND" style={{ width: "100%" }} />
          </Form.Item>
         {state > 0 && ( 
            <Form.Item
            name="sale"
            label="isSale"
            
          >
            <Select
              defaultValue={false}
              style={{ width: 120 }}
            >
              <Option value={true}>ON SALE</Option>
              <Option value={false}>OFF SALE</Option>
            </Select>
          </Form.Item>
         )}
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Please confirm your quantity",
              },
            ]}
          >
            <InputNumber min={1} max={100000}/>
          </Form.Item>
          <Form.Item
            label="Đóng gói"
            name="unit"
            rules={[
              {
                required: true,
                message: "Please confirm your unit",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Thông tin" name="note">
            <CKEditor
              editor={ClassicEditor}
              // data="<p>Hello from CKEditor 5!</p>"
              onChange={(event, editor) => {
                const data = editor.getData();
                setNote(data);
              }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? "Loading" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;

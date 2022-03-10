import React,{useEffect} from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import userApi from "api/userApi";
import { change } from "store/userSlice";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state?.user?.currentUser?.data?.result)
  const [form] = Form.useForm();
  const error = (value) => {
    message.error(value);
  };
  const success = () => {
    message.success("Đổi mật khẩu thành công");
  };
  async function onFinish(value) {
    const changeData = await dispatch(change(value));
    if (changeData?.payload) {
      error(changeData?.payload);
    } else {
      success();
      form.setFieldsValue({
        currentPassword: "",
        newPassword: "",
        verifyPassword: "",
      });
    }
  }
  useEffect(() => {
    if(!token){
      navigate('/')
    }
  }, [token]);
  return (
    <div className="change-password">
      <div className="container">
        <h2
          style={{
            padding: "50px 0 20px 0",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Thay đổi mật khẩu
        </h2>
        <div className="change-main">
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            //   onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Mật khẩu cũ"
              name="currentPassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
                {
                  min: 6,
                  message: "Password min length 6",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="verifyPassword"
              label="Xác nhận mật khẩu mới"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
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
              <Button type="primary" htmlType="submit">
                Thay đổi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

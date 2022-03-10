import React from "react";
import {Table,Space,Popconfirm} from 'antd';
import {EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteUser } from "redux/actions/AsyncCustomer"; 
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom"
const EditTableUser = ({data}) => {
const dispatch = useDispatch()
const history = useHistory();
  const EditCustom = (nameUserDel) =>{
    history.push(`/customers/edit-user/${nameUserDel}`);
  }
  const DelCustom = async (nameUserDel) =>{
    const del = await dispatch(deleteUser(nameUserDel))
    console.log('🚀 ~ del', del);

  }
 
  const columns = [
    {
      title: "ID",
      dataIndex: "code",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          {/* <a onClick={() => EditCustom(record.code)}>Edit</a> */}
          <EditOutlined onClick={() => EditCustom(record.username)}/>
          <Popconfirm
            title={`Bạn muốn xóa người dùng ${record?.username}`}
            onConfirm={() => DelCustom(record?.username)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const onSelects = () =>{
    console.log('a')
  }
  return (
    <div>
      <Table  dataSource={data} columns={columns} onSelect={onSelects} />;
    </div>
  );
};

export default EditTableUser;

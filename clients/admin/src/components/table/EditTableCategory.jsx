import React, {useEffect} from "react";
import {Table,Space,notification } from 'antd';
import {EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteUser } from "redux/actions/AsyncCustomer"; 
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import { deleteCategoryAct } from "redux/actions/AsyncCategory";
const EditTableCategory = ({data}) => {
const dispatch = useDispatch()
const history = useHistory();
const err = useSelector((state) => state.CategoryReducer.err);
  const EditCustom = (nameCateDel) =>{
    history.push(`/categories/edit-category/${nameCateDel}`);
  }
  const DelCustom = (nameCateDel) =>{
    dispatch(deleteCategoryAct(nameCateDel))


  }
  const openNotification = (err) => {
    notification.open({
      description: err,
      
    });
  };
  useEffect(()=>{
    if(err){
      openNotification(err);
    }
  },[err] )
  const columns = [
    {
      title: "ID",
      dataIndex: "code",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Category Parent",
      dataIndex: "parentCode",
      key: "parentCode",
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          {/* <a onClick={() => EditCustom(record.code)}>Edit</a> */}
          <EditOutlined onClick={() => EditCustom(record.code)}/>
          <DeleteOutlined onClick={() => DelCustom(record.code)}/>
        </Space>
      ),
    },
  ];
  const onSelects = () =>{
    console.log('a')
  }
  return (
    <div>
      <Table dataSource={data} columns={columns} onSelect={onSelects} />;
    </div>
  );
};

export default EditTableCategory;

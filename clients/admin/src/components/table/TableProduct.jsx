import React, { useState } from "react";
import { Table, Space, Tag, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteUser } from "redux/actions/AsyncCustomer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { money } from "utils/money";
import {deleteProductAct} from 'redux/actions/AsyncProduct';
import slug from 'slug';
const EditTableUser = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const EditCustom = (record) => {
    history.push(`/products/edit-product/${record.code}.${slug(record.name)}`);
  };
  const DelCustom = (nameProductDel) => {
    dispatch(deleteProductAct(nameProductDel));
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "code",
      fixed: "left",
      key: "id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "nameDisplay",
      fixed: "left",
      key: "nameDisplay",
      width: 200,
    },
    {
      title: "Mã Category",
      dataIndex: "categoryCode",
      width: 100,
      key: "categoryCode",
    },
    {
      title: "Xuất xứ",
      dataIndex: "origin",
      width: 150,
      key: "origin",
    },
    {
      title: "Giá",
      dataIndex: "priceProduct",
      width: 100,
      key: "priceProduct",
      render: (priceProduct) => (
        <Tag color="green" key={priceProduct}>
          {money(priceProduct)}
        </Tag>
      ),
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: "priceProductSale",
      width: 100,
      key: "priceProductSale",
      render: (priceProductSale) => (
        <Tag color="blue" key={priceProductSale}>
          {money(priceProductSale)}
        </Tag>
      ),
    },
    {
      title: "Khuyến mại",
      dataIndex: "sale",
      width: 100,
      key: "sale",
      render: (sale) => (
        <Tag color={`${sale ? "red" : "blue"}`} key={sale}>
          {sale ? "ON SALE" : "OFF SALE"}
        </Tag>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: 100,
      key: "quantity",
    },
    {
      title: "Đóng gói",
      dataIndex: "unit",
      width: 100,
      key: "unit",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} style={{ width: "50px" }} />,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (record) => (
        <Space size="middle">
          {/* <a onClick={() => EditCustom(record.code)}>Edit</a> */}
          <EditOutlined onClick={() => EditCustom(record)} />
          <Popconfirm
            title={`Bạn muốn xóa sản phẩm ${record?.name}`}
            onConfirm={() => DelCustom(record?.code)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
          ,
        </Space>
      ),
    },
  ];
  const onSelects = () => {
    console.log("a");
  };
  return (
    <div>
      <Table
        scroll={{ x: 1300 }}
        dataSource={data}
        columns={columns}
        onSelect={onSelects}
      />
      ;
    </div>
  );
};

export default EditTableUser;

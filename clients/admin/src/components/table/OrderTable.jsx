import React,{useEffect} from "react";
import { Table, Space, Tag, Popconfirm,notification  } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { money } from "utils/money";
import { delOrder } from "redux/actions/AsyncOrder";
import { checkStatus } from "utils/checkStatus";
const OrderTable = ({ data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const err = useSelector((state) => state.OrderReducer.err)
  // console.log('🚀 ~ err', err);
  const EditCustom = (nameOrder) => {
    history.push(`/order/edit-order/${nameOrder}`);
  };
  const DelCustom = async (nameDel) => {
    const dele = await dispatch(delOrder(nameDel));
    
  };
  const openNotification = (err) => {
    notification.open({
      // message: 'Notification Title',
      description: err,
      
    });
  };
  useEffect(()=>{
    if(err){
      openNotification(err);
    }
  },[err])
  const columns = [
    {
      title: "ID",
      dataIndex: "code",
      key: "id",
      fixed: "left",
    },
    {
      title: "Customer",
      children: [
        {
          title: "ID_KH",
          dataIndex: "customerCode",
          key: "id_kh",
          width: 150,
        },
        {
          title: "User",
          dataIndex: "customerUserName",
          key: "user",
          width: 150,
        },
        {
          title: "Full_Name",
          dataIndex: "customerFullName",
          key: "full_name",
          width: 150,
        },
      ],
    },
    {
      title: "Email",
      dataIndex: "receiverPhone2",
      key: "email",
    },
    {
      title: "Phone_1",
      dataIndex: "customerUserName",
      key: "phone1",
    },
    {
      title: "Phone_2",
      dataIndex: "receiverPhone",
      key: "phone2",
    },
    {
      title: "Phone_3",
      dataIndex: "receiverPhone2",
      key: "phone3",
    },
    {
      title: "Họ tên",
      dataIndex: "receiverName",
      key: "hoten",
    },
    {
      title: "Note",
      dataIndex: "customerNote",
      key: "note",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số sản phẩm",
      dataIndex: "totalProduct",
      key: "totalProduct",
    },
    {
      title: "Giá",
      dataIndex: "amountProduct",
      key: "amountProduct",
      render: (amountProduct) => (
        <Tag color="green" key={amountProduct}>
          {money(amountProduct)}
        </Tag>
      ),
    },

    {
      title: "Phí + ship",
      dataIndex: "otherAmount",
      key: "otherAmount",
      render: (otherAmount) => (
        <Tag color="green" key={otherAmount}>
          {money(otherAmount)}
        </Tag>
      ),
    },
    {
      title: "Tổng",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Tag color="green" key={amount}>
          {money(amount)}
        </Tag>
      ),
    },

    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} style={{ width: "50px" }} />,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      fixed: "right",

      key: "status",
      render: (status) => (
        <Tag
          color={`${
            status === "NEW" ? "red" : status === "PENDING" ? "blue" : status === "CONFIRMED" ? 'GREEN' : status === "PREPARE" ? 'ORANGE' : status === "WAIT_FOR_PACKING" ? "RED" : status === "DELIVERING" ? "YELLOW" : status === "DELIVERED" ? "LIME" : status === "COMPLETED" ? "VIOLET" : status === "CANCELLED" ? "BLACK" : status === "LOST" ? "RED" : status === "BACK_GOODS" ? "SALMON" : 'UPDAETING'
          }`}
          key={status}
        >
          {checkStatus(status)}
        </Tag>
      ),
    },

    {
      fixed: "right",

      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          {/* <a onClick={() => EditCustom(record.code)}>Edit</a> */}
          <EditOutlined onClick={() => EditCustom(record.code)} />
          <Popconfirm
            title={`Bạn muốn xóa đơn hàng ${record?.code}`}
            onConfirm={() => DelCustom(record?.code)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
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
        scroll={{ x: 2300 }}
        dataSource={data}
        columns={columns}
        onSelect={onSelects}
      />
      ;
    </div>
  );
};

export default OrderTable;

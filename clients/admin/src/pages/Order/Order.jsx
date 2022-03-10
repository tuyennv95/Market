import React, { useEffect, useState } from "react";
import moment from "moment";
import EditTable from "components/table/EditTableUser";
import { Button, Spin, DatePicker, Select ,Input } from "antd";
import EditTableUser from "components/table/EditTableUser";
import { getAllOrder } from "redux/actions/AsyncOrder";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import queryString from "query-string";
import OrderTable from "components/table/OrderTable";
import { CANCEL_REDIRECT } from "constan/types";
import { money } from "utils/money";
import {replaceName } from "utils/replaceName";
import { ExportToExcel } from "utils/ExportToExcel";
import { checkStatus } from "utils/checkStatus";

const Customers = (props) => {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  const { Option } = Select;

  const history = useHistory();
  const dispatch = useDispatch();
  const keySearch = queryString.parse(props.location.search);
  const { orders } = useSelector((state) => state.OrderReducer);
  const [date, setDate] = useState([]);
  const [searchNameProduct, setSearchNameProduct] = useState('');
  
  const dateStart = moment(date[0]).format("DD/MM/yyyy")
  const dateEnd = moment(date[1]).format("DD/MM/yyyy")
  
  // }
  const [select, setSelect] = useState("All");
  const data1 = [];
  const dataExport = [];
  for (let i = 0; i < orders.length; i++) {
    const get = {
      ...orders[i],
      customerUserName: orders[i].customer.username,
      customerCode: orders[i].customer.code,
      customerFullName: orders[i].customer.fullName,
      nameProductOrder: (orders[i].products.map((item) => item.name)).toString(),
    };
    
    data1.push(get);
  }
  const data2 = data1?.filter((item)=> replaceName(item.nameProductOrder).indexOf(replaceName(searchNameProduct))!==-1);
  const data = searchNameProduct.length !== 0 ? data2 : data1;
  for (let i = 0; i < data.length; i++) {
    const exportD = {
      MaDonHang: data[i].code,
      MaTaiKhoan: data[i].customer.code,
      TenKhachHang: data[i].receiverName,
      LienLac1: data[i].receiverPhone,
      LienLac2: data[i].receiverPhone2,
      MatHang: data[i].nameProductOrder,
      SoLuongMatHang: data[i].totalProduct,
      Gia: money(data[i].amountProduct),
      Phi: money(data[i].otherAmount),
      TongTien: money(data[i].amount),
      DiaChiNhanHang: data[i].address,
      GhiChu: data[i].customerNote,
      TrangThaiDonHang: checkStatus(data[i].status),

    }
    dataExport.push(exportD)

  
  }
  const res = useSelector((state) => state.LoadingReducer.redirect);

  useEffect(() => {
    dispatch({ type: CANCEL_REDIRECT });
  }, [orders]);
  useEffect(() => {
    dispatch(
      getAllOrder({
        recordPerPage: 1000,
        keyword: keySearch.key,
        status: select === "All" ? null : select,
        beginDate: `${date.length !== 0 ? dateStart + ' 00:00:00' : ''}`,
        endDate: `${date.length !== 0 ? dateEnd + ' 23:59:59': ''}`,
      })
    );
  }, [dispatch, keySearch.key, res, date,select]);
  const movePage = () => {
    history.push("/customers/create-user");
  };
  const { RangePicker } = DatePicker;
  const changeDate = (value) => {
    setDate(value);
  };
  function handleChange(value) {
    setSelect(value);
  }
  function resetForm() {
    setSelect("All");
    setDate([]);
    setSearchNameProduct('');
  }
  
  const fileName = `${date.length !== 0 ? `start=${dateStart}end=${dateEnd}` : '' }${searchNameProduct.length!==0 ? `name=${searchNameProduct}` : ''}${`status=${checkStatus(select)}`} `; 
  function handleChangeInput(e){
    e.preventDefault();
    const {value} = e.target;
    setSearchNameProduct(value)
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="page-header">Order {isLoading ? <Spin /> : null}</h2>
      </div>
      <RangePicker  onChange={changeDate} value={date} />
      <Input value={searchNameProduct} onChange={handleChangeInput} placeholder="Mặt hàng..." style={{ width: '20%' }}/>
      <Select value={select} style={{ width: 150 }} onChange={handleChange}>
        <Option value="All">Tất cả</Option>
        <Option value="NEW">Mới</Option>
        <Option value="PENDING">Chờ xác nhận</Option>
        <Option value="CONFIRMED">Đã xác nhận</Option>
        <Option value="PREPARE">Chuẩn bị hàng</Option>
        <Option value="WAIT_FOR_PACKING">Chờ lấy hàng</Option>
        <Option value="DELIVERING">Đang giao hàng</Option>
        <Option value="DELIVERED">Đã giao</Option>
        <Option value="COMPLETED">Hoàn thành</Option>
        <Option value="CANCELLED">Đã hủy</Option>
        <Option value="LOST">Thất lạc</Option>
        <Option value="BACK_GOODS">Hoàn hàng</Option>
      </Select>
      <Button onClick={resetForm}>Reset</Button>
      <Button>

      <ExportToExcel apiData={dataExport} fileName={fileName}/>
      </Button>
      <br />
      <p>Tổng: {data.length} đơn hàng.</p>
      <p>Tổng giá trị: {money(data?.reduce((a, b) => a + b.amount,0))}</p>
      
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <OrderTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;

import { Table } from "antd";
import React from "react";
import { money } from "utils/money";
const TableTopCustomer = ({ data }) => {
  function SelectSort(arr){
    let min;
    for(let i=0;i<arr.length;i++){
      min = i; 
      for(let j=i+1; j<arr.length; j++){
        if(arr[j].moneySpent > arr[min].moneySpent){
          min = j;
        }
      }
      if(min !== i){[arr[i], arr[min]] = [arr[min], arr[i]]}
    }
    return arr;
  }
  SelectSort(data);
  const dataList = data.map((item, index) => ({
    key: index,
    code: item.code,
    name: item.username,
    fullName: item.fullName,
    moneySpent: money(item.moneySpent),
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "MaKH",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "userName",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
    },

    {
      title: "Tổng tiền",
      dataIndex: "moneySpent",
      key: "moneySpent",
    },
  ];
  return (
    <div>
      <Table
        scroll={{ x: 300 }}
        dataSource={dataList}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TableTopCustomer;

import { Table } from 'antd';
import React from 'react';
import {money} from 'utils/money'
const TableTopProduct = ({data}) => {
const dataList = data.map((item, index) => ({ 
    key: index,
    code: item.code, 
    name: item.name,  
    quantityBuy: item.quantityBuy,
    
 }))
 function SelectSort(arr){
  let min;
  for(let i=0;i<arr.length;i++){
    min = i; 
    for(let j=i+1; j<arr.length; j++){
      if(arr[j].quantityBuy > arr[min].quantityBuy){
        min = j;
      }
    }
    if(min !== i){[arr[i], arr[min]] = [arr[min], arr[i]]}
  }
  return arr;
}
SelectSort(dataList);

    
      
      const columns = [
        {
          title: 'STT',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'MaSP',
          dataIndex: 'code',
          key: 'code',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        
        {
          title: 'Tổng lần mua',
          dataIndex: 'quantityBuy',
          key: 'quantityBuy',
        },
      ];
    return (
        <div>
            <Table dataSource={dataList} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default TableTopProduct;
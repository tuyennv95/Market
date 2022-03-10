import React,{useEffect} from 'react';
import HistoryOrderItem from './HistoryOrderItem';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const HistoryOrder = ({data}) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state?.user?.currentUser?.data?.result)
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
      useEffect(() => {
        if(!token){
          navigate('/')
        }
      }, [token]);
    

    return (
        <div>
            {data?.map((item) => (
                <HistoryOrderItem key={item.code} data={item}/>

             ))}
        </div>
    );
};

export default HistoryOrder;
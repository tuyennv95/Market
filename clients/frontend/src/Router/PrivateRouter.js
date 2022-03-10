import React from 'react';
import {  Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const PrivateRouter = ({children}) => {
    const token = useSelector(state => state.user?.currentUser?.data?.result)
    return token ? children : <Navigate to="/login" />
      
};

export default PrivateRouter;
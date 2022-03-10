import React from 'react';
import {  Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
const PublicRouter = ({children}) => {
    const token = useSelector(state => state.user?.currentUser?.data?.result)
    return token ? <Navigate to="/" /> : children;
      
};

export default PublicRouter;
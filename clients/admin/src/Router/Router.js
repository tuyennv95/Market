import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from 'pages/Dashboard'
import Customers from 'pages/Customer/Customers'
import PrivateRoute from './PrivateRoute'
import Login from 'components/Login/Login'
import PublicRoute from './PublicRoute';
import AddCustomer from 'pages/Customer/AddCustomer'
import EditCustomer from 'pages/Customer/EditCustomer'
import Products from 'pages/Products/Products'
import AddProduct from 'pages/Products/AddProduct'
const Routes = () => {
    return (
        <Switch>
            <PrivateRoute path='/' exact component={Dashboard}/>
            <PrivateRoute path='/customers' exact component={Customers}/>
            <PrivateRoute path='/customers/create-user' component={AddCustomer}/>
            <PrivateRoute path='/customers/edit-user/:id' component={EditCustomer}/>
            <PrivateRoute path='/products' exact component={Products}/>
            <PrivateRoute path='/products/add-product' component={AddProduct}/>

            <PublicRoute path="/login" component={Login}/>
        </Switch>
    )
}

export default Routes

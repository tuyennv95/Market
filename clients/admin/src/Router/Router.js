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
import EditProduct from 'pages/Products/EditProduct'
import Category from 'pages/Category/Category';
import AddCategory from 'pages/Category/AddCategory'
import EditCategory from 'pages/Category/EditCategory'
import Order from 'pages/Order/Order';
import EditOrder from 'pages/Order/EditOrder'
const Routes = () => {
    return (
        <Switch>
            <PrivateRoute path='/' exact component={Dashboard}/>
            <PrivateRoute path='/customers' exact component={Customers}/>
            <PrivateRoute path='/customers/create-user' component={AddCustomer}/>
            <PrivateRoute path='/customers/edit-user/:id' component={EditCustomer}/>
            <PrivateRoute path='/products' exact component={Products}/>
            <PrivateRoute path='/products/add-product' component={AddProduct}/>
            <PrivateRoute path='/products/edit-product/:id.:slug' component={EditProduct}/>
            <PrivateRoute path='/categories' exact component={Category}/>
            <PrivateRoute path='/categories/create-category' component={AddCategory}/>
            <PrivateRoute path='/categories/edit-category/:id' component={EditCategory}/>
            <PrivateRoute path='/orders' exact component={Order}/>
            <PrivateRoute path='/order/edit-order/:id' component={EditOrder}/>



            <PublicRoute path="/login" component={Login}/>
        </Switch>
    )
}

export default Routes

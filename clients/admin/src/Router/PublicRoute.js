import { Route, Redirect } from 'react-router-dom'
const PublicRoute = (props) => {
    const token = localStorage.getItem('token')
    return token ? (
        <Redirect to="/dashboard" />
        ) : (
            <Route
                path={props.path}
                exact={props.exact}
                component={props.component}
            />
        )
}

export default PublicRoute;

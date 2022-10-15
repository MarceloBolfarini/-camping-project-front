import { Navigate } from 'react-router-dom'

export const RequireAuth = ({ children }) =>{

    const isAuth = true;


    if(isAuth)
    return children
    else 
    return <Navigate to="/" />
}
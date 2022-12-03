import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const RequireAuth = ({ children }) =>{

    const {isAuthenticated} = useSelector(state => state.auth)

    if(isAuthenticated)
    return children
    else 
    return <Navigate to="/" />

}
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

export const RequireAuth = ({ children }) =>{

    const {isAuthenticated} = useSelector(state => state.auth)
   

    if(isAuthenticated)
    return children
    else 
    return <Navigate to="/" />

}
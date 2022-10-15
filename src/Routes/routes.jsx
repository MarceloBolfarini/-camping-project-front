import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login/Login"
import { NotFound } from "../Pages/NotFound/NotFound.jsx";
import { RequireAuth } from "./RequireAuth.jsx";
import { ContextProvider } from '../Contexts/context'

export const Rotas = () =>{

    return (
        <ContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/home" element={
                        <RequireAuth>
                            <Home/>
                        </RequireAuth>
                    } />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </BrowserRouter>
        </ContextProvider>
    )
}

export const RotasPrivadas = ({ children }) =>{

}

export default Rotas;

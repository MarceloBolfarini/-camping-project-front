import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login/Login"
import { NotFound } from "../Pages/NotFound/NotFound.jsx";
import { RequireAuth } from "./RequireAuth.jsx";
import { ContextProvider } from '../Contexts/context'
import { ThemeProvider } from "@emotion/react";
import theme from "../Components/Styles/Styles.js";
import CadastroEvento from "../Pages/CadastroEvento/CadastroEvento.jsx";
import GerenciarEventos from "../Pages/GerenciarEventos/GerenciarEventos.jsx";

export const Rotas = () =>{

    return (
        <ThemeProvider theme={theme}>
            <ContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/home" element={
                            <RequireAuth>
                                <Home/>
                            </RequireAuth>
                        } />
                        <Route path="/eventos/cadastrar" element={<CadastroEvento/>} />
                        <Route path="/eventos/gerenciar" element={<GerenciarEventos/>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </BrowserRouter>
            </ContextProvider>
        </ThemeProvider>
    )
}

export const RotasPrivadas = ({ children }) =>{

}

export default Rotas;

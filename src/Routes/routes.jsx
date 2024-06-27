import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../Pages/Home/Home.jsx";
import Login from "../Pages/Login/Login"
import { NotFound } from "../Pages/NotFound/NotFound.jsx";
import { RequireAuth } from "./RequireAuth.jsx";
import { ThemeProvider } from "@emotion/react";
import theme from "../Components/Styles/Styles.js";
import CadastroEvento from "../Pages/CadastroEvento/CadastroEvento.jsx";
import GerenciarEventos from "../Pages/GerenciarEventos/GerenciarEventos.jsx";
import MeusEventos from "../Pages/MeusEventos/MeusEventos.jsx";
import ListaInscritos from "../Pages/ListaInscritos/ListaInscritos.jsx";
import EnvioEmail from "../Pages/RecuperarSenha/EnvioEmail.jsx";
import RecuperarSenha from "../Pages/RecuperarSenha/RecuperarSenha.jsx";


export const Rotas = () =>{

    

    return (
        <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/home" element={<Home/>} />
                        <Route path="/eventos/cadastrar" element={JSON.parse(localStorage.getItem('usuario'))?.nivelAcesso == 0 ? <RequireAuth><CadastroEvento/></RequireAuth> : <RequireAuth><Home/></RequireAuth>} />
                        <Route path="/eventos/editar/:id" element={JSON.parse(localStorage.getItem('usuario'))?.nivelAcesso == 0 ? <RequireAuth><CadastroEvento/></RequireAuth> : <RequireAuth><Home/></RequireAuth>} />
                        <Route path="/eventos/gerenciar" element={JSON.parse(localStorage.getItem('usuario'))?.nivelAcesso == 0 ? <RequireAuth><GerenciarEventos/></RequireAuth> : <RequireAuth><Home/></RequireAuth>} />
                        <Route path="/eventos/meusEventos" element={<RequireAuth><MeusEventos/></RequireAuth>} />
                        <Route path="/eventos/gerenciar/lista/:id" element={JSON.parse(localStorage.getItem('usuario'))?.nivelAcesso == 0 ? <RequireAuth><ListaInscritos/></RequireAuth> : <RequireAuth><Home/></RequireAuth>} />
                        <Route path="/enviarEmail" element={<EnvioEmail/>} />
                        <Route path="/recuperarSenha" element={<RecuperarSenha/>} />
                        <Route path="*" element={<RequireAuth><Home/></RequireAuth>} />
                    </Routes>
                </BrowserRouter>
        </ThemeProvider>
    )
}

export const RotasPrivadas = ({ children }) =>{

}

export default Rotas;

import React, { useState } from 'react'
import camp from '../../img/camp.png'
import { api } from '../../services/api';
import { Button, ContainerPrincipal, Img, Input, TelaLogin } from './style';



function EnvioEmail() {

    const [email, setEmail] = useState({
        para: '',
        titulo: '',
        conteudo: ''
    });

    const enviarEmail = async () => {
        localStorage.setItem("email", email.para)
        await api.post("/usuarios/enviarEmail", email).then((res) => {
            console.log(res);
        })

    }

    return (
        <ContainerPrincipal>

            <TelaLogin>
                <div>
                    <h1>Digite seu email.</h1>
                    <br></br> <br></br>
                    <form>
                        <Input type="email" placeholder="Email" name="email"
                            onChange={(event) => setEmail({
                                para: event.target.value,
                                titulo: "Redefinição de Senha Acamp",
                                conteudo: "Clique no Link para redefinir sua senha: <a href='http://localhost:3000/recuperarSenha'> Redefinir </a>"
                            })}></Input>
                        <br></br> <br></br>
                        <Button onClick={enviarEmail}>Enviar</Button>
                    </form>
                </div>
            </TelaLogin>

            <Img src={camp} alt="camp" ></Img>

        </ContainerPrincipal>
    );
}

export default EnvioEmail;

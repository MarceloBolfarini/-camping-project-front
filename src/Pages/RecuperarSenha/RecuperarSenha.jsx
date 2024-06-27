import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import camp from '../../img/camp.png'
import { api } from '../../services/api';
import { Button, ContainerPrincipal, Img, Input, TelaLogin } from './style';



function RecuperarSenha() {

    const [email, setEmail] = useState();
    const [novaSenha, setNovaSenha] = useState();
    const [confirmaSenha, setConfirmaSenha] = useState();

    useEffect(async () => {
        await setEmail(localStorage.getItem("email"));
    }, [])

    const handleSubmitNovaSenha = async (event) => {
        event.preventDefault();
        await redefinirSenha();
    }

    const redefinirSenha = async () => {

        if (novaSenha != confirmaSenha) {
            return (
                Swal.fire({
                    icon: "error",
                    title: "As senhas são diferentes!",
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })
            )

        } else {

            let form = { email: email, senha: novaSenha };

            await api.put("/usuarios/recuperarSenha", form).then((res) => {
                
                localStorage.removeItem("email");

                return (
                    Swal.fire({
                        icon: "sucess",
                        title: "Senha alterada com sucesso!",
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                )
            })
        }
    }

    return (
        <ContainerPrincipal>

            <TelaLogin>
                <div>
                    <h1>Digite sua senha nova.</h1>
                    <br></br> <br></br>
                    <form onSubmit={handleSubmitNovaSenha}>
                        <Input type="password" placeholder="Nova Senha"  onChange={(event) => setNovaSenha(event.target.value)}></Input>
                        <br></br> <br></br>
                        <Input type="password" placeholder="Confirme a senha"  onChange={(event) => setConfirmaSenha(event.target.value)}></Input>
                        <br></br> <br></br>
                        <Button>Salvar</Button>
                    </form>
                </div>
            </TelaLogin>

            <Img src={camp} alt="camp" ></Img>

        </ContainerPrincipal>
    );
}

export default RecuperarSenha;
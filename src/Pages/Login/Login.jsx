import { Grid } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { api } from '../../services/api';
import ButtonRegister from '../../Components/ButtonComponent';
import TextFieldComponent from '../../Components/TextFieldComponent';
import camp from '../../img/camp.png'
import { Button, ContainerPrincipal, Img, Input, TelaLogin, ButtonCadastrese, TituloCadastro, ContainerGrid, SubTituloCadastro } from './style';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../store/fetchActions';

function Login() {

  const [form, setForm] = useState({ email: '', senha: '' });
  const [exibeLogin, setExibeLogin] = useState(true);
  const [continuar, setContinuar] = useState(false);
  const { control, handleSubmit, watch, setValue, setFocus } = useForm();
  const [cep] =  watch(['cep']);
  
  const dispatch = useDispatch()

  const [usuario, setUsuario] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    dataNascimento: "",
    cpf: "",
    senha: "",
    telefone: "",
    cidade: "",
	  estado: "",
	  rua: "",
	  numero:"",
	  bairro:"",
	  cep:"",
  })

  const handleSubmitLogin = (event) => {
    login();
    event?.preventDefault();
  }

  const login = async() => {
    // await api.post("/auth", form).then((response)=> {
    //   localStorage.setItem("token", response.data.token)
    //   console.log(response)
    // })
    dispatch(authLogin(form))
  }

  const handleSubmitCadastro = async (event) => {
    await cadastrar(event);
    event?.preventDefault();
  }

  const cadastrar = async(event) => {
    let dataSplit = event.dataNascimento.split("/")
    let dataForm = dataSplit[2] + "-" + dataSplit[1] + "-" + dataSplit[0]
    setUsuario({ ...usuario, nome: event.nome, sobrenome: event.sobrenome, cpf: event.cpf, email: event.email, 
    dataNascimento: dataForm, senha: event.senha, telefone: event.telefone, numero: event.numero})
    console.log(usuario)
    await api.post("/usuarios", usuario).then((response)=> {
      setUsuario({});
      console.log(response)
      return (
        Swal.fire({
          icon: "success",
          title: "Usuario criado com sucesso",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      )
      
    }).catch(
      Swal.fire({
        icon: "error",
        title: "Ocorreu um erro"
      })
    )
  }

  const buscaCep = () => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
        console.log(data)
        setUsuario({ ...usuario, bairro: data.bairro, cep: data.cep, cidade: data.localidade, estado: data.uf, rua: data.logradouro })
        setValue("cidade", data.localidade);        
        setValue("bairro", data.bairro);
        setValue("estado", data.uf);
        setValue("rua", data.logradouro);
        setFocus("numero");
    });
  }

  return (
    <ContainerPrincipal>
      { exibeLogin &&
        <TelaLogin>
          <div>
            <h1>Login</h1>
            <br></br> <br></br>
            <form onSubmit={handleSubmitLogin}>
              <Input type="text" placeholder="Usuario" name="usuario" onChange={(event) => setForm({ ...form, email: event.target.value })} value={form.email}></Input>
              <br></br> <br></br>
              <Input type="password" placeholder="Senha" name="senha" onChange={(event) => setForm({ ...form, senha: event.target.value })} value={form.senha}></Input>
              <br></br> <br></br>
              <Button>Enviar</Button>
              <div style={{marginTop: 50}}><ButtonCadastrese onClick={()=>setExibeLogin(false)}>Cadastre-se</ButtonCadastrese></div>
            </form>
          </div>
        </TelaLogin>
      }
      { exibeLogin === false &&
        <form onSubmit={handleSubmit(handleSubmitCadastro)}>
          <ContainerGrid container>
            <Grid item xs={12} >
              <Grid container >
                <Grid item xs={1.2} style={{margin: "0 auto"}}>
                  <TituloCadastro>Cadastro</TituloCadastro>
                </Grid>
              </Grid>
              
              <Grid container>

                <Grid item xs={5.95} >
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container style={{justifyContent: "center"}}>
                        <Grid item>
                          <SubTituloCadastro>Dados Pessoais</SubTituloCadastro>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} style={{margin: "0 auto"}}>
                      <Grid container justifyContent="space-around" style={{margin: "0 auto"}}>
                        <Grid item xs={4.5}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.nome}
                            name="nome"
                            control={control}
                            label="Nome"
                            fullWidth
                            disabled={continuar}
                            inputMask={{ mask: '', }}
                            
                          />
                        </Grid>
                        <Grid item xs={4.5}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.sobrenome}
                            name="sobrenome"
                            control={control}
                            label="Sobrenome"
                            fullWidth
                            disabled={continuar}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{margin: "0 auto", marginTop: 20}}>
                      <Grid container justifyContent="space-around" style={{margin: "0 auto"}}>
                        <Grid item xs={10.5}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.email}
                            name="email"
                            control={control}
                            label="Email"
                            fullWidth
                            disabled={continuar}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{margin: "0 auto", marginTop: 20}}>
                      <Grid container justifyContent="space-around" style={{margin: "0 auto"}}>
                        <Grid item xs={4.5}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.dataNascimento}
                            label="Data Nascimento"
                            control={control}
                            name="dataNascimento"
                            fullWidth
                            disabled={continuar}
                            inputMask={{ mask: '99/99/9999', maskChar: "", alwaysShowMask: false }}
                          />
                        </Grid>
                        <Grid item xs={4.5}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.cpf}
                            name="cpf"
                            control={control}
                            label="CPF"
                            fullWidth
                            disabled={continuar}
                            inputMask={{ mask: '999.999.999-99', maskChar: "", alwaysShowMask: false }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{margin: "0 auto", marginTop: 20}}>
                      <Grid container justifyContent="space-around" style={{margin: "0 auto"}}>
                        <Grid item xs={10.5}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.senha}
                            name="senha"
                            control={control}
                            label="Senha"
                            fullWidth
                            disabled={continuar}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{margin: "0 auto", marginTop: 20}}>
                      <Grid container justifyContent="space-around" style={{margin: "0 auto"}}>
                        <Grid item xs={10.5}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.telefone}
                            name="telefone"
                            control={control}
                            label="Telefone"
                            fullWidth
                            disabled={continuar}
                            inputMask={{ mask: '(99) 99999-9999', maskChar: "", alwaysShowMask: false }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{marginTop: 20}}>
                      <Grid container style={{padding: "0 80px"}} justifyContent="flex-end">
                        <Grid item xs={2}>
                          <ButtonRegister
                            variant="outlined"
                            text="Continuar"
                            onClick={()=>setContinuar(true)}
                            disabled={continuar}
                          />
                        </Grid>
                      </Grid>
                    </Grid>


                  </Grid>
                </Grid>

                <div style={{width: 2, height: 500, backgroundColor: "white", marginBottom: 30, marginTop: 30}}></div>

                <Grid item xs={5.95} >
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container style={{justifyContent: "center"}}>
                        <Grid item>
                          <SubTituloCadastro>Endereço</SubTituloCadastro>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{margin: "0 auto"}}>
                      <Grid container style={{margin: "0 auto", padding: "0 40px"}}>
                        <Grid item xs={5}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.cep}
                            name="cep"
                            control={control}
                            label="CEP"
                            fullWidth
                            onBlur={ () => buscaCep() }
                            disabled={!continuar}
                          />
                        </Grid>
                        <Grid item xs={7} />
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{margin: "0 auto", marginTop: 20}}>
                      <Grid container justifyContent="space-between" style={{margin: "0 auto", padding: "0 40px"}}>
                        <Grid item xs={7}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.cidade}
                            name="cidade"
                            control={control}
                            label="Cidade"
                            fullWidth
                            disabled={!continuar}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.estado}
                            name="estado"
                            control={control}
                            label="Estado"
                            fullWidth
                            disabled={!continuar}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{margin: "0 auto", marginTop: 20}}>
                      <Grid container style={{margin: "0 auto", padding: "0 40px"}}>
                        <Grid item xs={12}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.rua}
                            name="rua"
                            control={control}
                            label="Rua"
                            fullWidth
                            disabled={!continuar}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{margin: "0 auto", marginTop: 20}}>
                      <Grid container justifyContent="space-between" style={{margin: "0 auto", padding: "0 40px"}}>
                        <Grid item xs={4}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.numero}
                            name="numero"
                            control={control}
                            label="Numero"
                            fullWidth
                            disabled={!continuar}
                            inputMask={{ mask: '99999', maskChar: "", alwaysShowMask: false }}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <TextFieldComponent 
                            id="standard-basic"
                            variant="standard"
                            defaultValue={usuario.bairro}
                            name="bairro"
                            control={control}
                            label="Bairro"
                            fullWidth
                            disabled={!continuar}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} style={{margin: "0 auto", marginTop: "14.4%"}}>
                      <Grid container justifyContent="space-between" style={{margin: "0 auto", padding: "0 40px"}}>
                        <Grid item xs={6}>
                          <ButtonRegister
                            variant="outlined"
                            text="Voltar"
                            onClick={()=>setContinuar(false)}
                            disabled={!continuar}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Grid container justifyContent="flex-end" style={{margin: "0 auto", padding: "0 40px"}}>
                            <Grid item xs={5}>
                              <ButtonRegister
                                variant="outlined"
                                text="Continuar"
                                type="submit"
                                disabled={!continuar}
                              />
                            </Grid>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                    
                  </Grid>
                </Grid>


              </Grid>

            </Grid>
          </ContainerGrid>
          </form>
      }
      
      <Img src={camp} alt="camp" ></Img>


    </ContainerPrincipal>

  );
}


export default Login;

import { Grid } from '@mui/material';
import React, { useState } from 'react'
import camp from '../../img/camp.png'
import { Button, ContainerPrincipal, Img, Input, TelaLogin, ButtonCadastrese, TituloCadastro, ContainerGrid, SubTituloCadastro } from './style';


function Login() {

  const [form, setForm] = useState({ login: '', senha: '' });
  const [exibeLogin, setExibeLogin] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
  }

  return (
    <ContainerPrincipal>
      { exibeLogin &&
        <TelaLogin>
          <div>
            <h1>Login</h1>
            <br></br> <br></br>
            <form onSubmit={handleSubmit}>
              <Input type="text" placeholder="usuario" name="usuario" onChange={(event) => setForm({ ...form, login: event.target.value })} value={form.login}></Input>
              <br></br> <br></br>
              <Input type="password" placeholder="senha" name="senha" onChange={(event) => setForm({ ...form, senha: event.target.value })} value={form.senha}></Input>
              <br></br> <br></br>
              <Button>Enviar</Button>
              <div style={{marginTop: 50}}><ButtonCadastrese onClick={()=>setExibeLogin(false)}>Cadastre-se</ButtonCadastrese></div>
            </form>
          </div>
        </TelaLogin>
      }
      { exibeLogin === false &&
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
                    <Grid item style={{margin: "0 auto"}}>
                      <SubTituloCadastro>Dados Pessoais</SubTituloCadastro>
                    </Grid>
                    
                  </Grid>
                </Grid>
                <div style={{width: 2, height: 500, backgroundColor: "white", marginBottom: 30, marginTop: 30}}></div>
                <Grid item xs={5.95} >
                  <Grid container>
                    <Grid item style={{margin: "0 auto"}}>
                      <SubTituloCadastro>Dados Pessoais</SubTituloCadastro>
                    </Grid>
                    
                  </Grid>
                </Grid>


              </Grid>

            </Grid>
          </ContainerGrid>
      }
      
      <Img src={camp} alt="camp" ></Img>


    </ContainerPrincipal>

  );
}


export default Login;

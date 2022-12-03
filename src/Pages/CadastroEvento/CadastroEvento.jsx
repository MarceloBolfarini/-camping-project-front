import { Grid } from '@mui/material';
import Header from "../../Components/Header";
import BackGroundPage from "../../Components/BackgroundPage";
import { InputTitle, Title } from './style';
import { useState } from 'react';
import TextFieldComponent from '../../Components/TextFieldComponent';
import { useForm } from 'react-hook-form';
import ButtonRegister from '../../Components/ButtonComponent';
import { Icon } from '@iconify/react';


const CadastroEvento = () => {

  const { control, handleSubmit, register, watch, setValue, setFocus } = useForm();


  return (
    <>
      <Header></Header>
      <BackGroundPage page={
        <Grid container justifyContent="center">
          <Grid item xs={4} style={{ display: "flex", marginTop: 40 }} justifyContent="center">
            <Title>Cadastro de Eventos</Title>
          </Grid>

          <Grid item xs={12} style={{ margin: "0 auto" }}>
            <Grid container justifyContent="space-around" style={{ margin: "0 auto" }}>
              <Grid item xs={6}>

                <br></br>
                <Grid item xs={12} style={{ margin: "20px 0px 0px 0px" }}>
                  <TextFieldComponent
                    id="standard-basic"
                    variant="standard"
                    defaultValue={""}
                    name="titulo"
                    control={control}
                    label="Título"
                    fullWidth
                  />
                </Grid>

                <br></br>
                <Grid container justifyContent="space-between" style={{ margin: "0 auto" }}>
                  <Grid item xs={5.4}>
                    <TextFieldComponent
                      id="standard-basic"
                      variant="standard"
                      defaultValue={""}
                      name="dataInicio"
                      control={control}
                      label="Data de Início"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5.4}>
                    <TextFieldComponent
                      id="standard-basic"
                      variant="standard"
                      defaultValue={""}
                      name="dataEncerramento"
                      control={control}
                      label="Data de Encerramento"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <br></br>
                <Grid item xs={12}>
                  <TextFieldComponent
                    id="standard-basic"
                    variant="standard"
                    defaultValue={""}
                    name="localEvento"
                    control={control}
                    label="Local do Evento"
                    fullWidth
                  />
                </Grid>

                <br></br>
                <Grid item xs={12} style={{color:"white"}}>
                  <InputTitle>Descrição</InputTitle>
                  <TextFieldComponent
                    id="filled-multiline-static"
                    variant="filled"
                    name="descricao"
                    control={control}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>

                <br></br>
                <Grid container justifyContent="space-between" style={{ margin: "0 auto" }}>
                  <Grid item xs={5.4}>
                    <TextFieldComponent
                      id="standard-basic"
                      variant="standard"
                      defaultValue={""}
                      name="taxaInsricao"
                      control={control}
                      label="Taxa de inscrição"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5.4}>
                    <TextFieldComponent
                      id="standard-basic"
                      variant="standard"
                      defaultValue={""}
                      name="idadeMinima"
                      control={control}
                      label="Idade Mínima"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <br></br>
                <Grid container justifyContent="space-between" style={{ margin: "0 auto" }}>
                  <Grid item xs={8}>
                    <Grid item xs={4}>
                      <InputTitle>Imagem</InputTitle>
                    </Grid>
                    <Grid item xs={2}>
                      <Icon icon="ant-design:cloud-upload-outlined" color='white' fontSize="30px"></Icon>
                    </Grid>
                  </Grid>
                  <Grid item xs={2} style={{ margin: "45px 20px 0px 0px" }}>
                    <ButtonRegister
                      variant="outlined"
                      text="Cadastrar"
                      type="submit"
                      bottaoCadEventos
                    />
                  </Grid>
                </Grid>

              </Grid>
            </Grid>
          </Grid>

        </Grid>
      }></BackGroundPage>
    </>
  )
}

export default CadastroEvento;
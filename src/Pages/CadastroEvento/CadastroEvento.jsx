import { Grid } from '@mui/material';
import Header from "../../Components/Header";
import BackGroundPage from "../../Components/BackgroundPage";
import { InputTitle, Title } from './style';
import { useState } from 'react';
import TextFieldComponent from '../../Components/TextFieldComponent';
import { useForm } from 'react-hook-form';
import ButtonRegister from '../../Components/ButtonComponent';
import { Icon } from '@iconify/react';
import { useRef } from 'react';
import { api } from '../../services/api';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export const CadastroEvento = ({}) => {

  const { id } = useParams();

  

  const { control, handleSubmit, register, watch, setValue, setFocus } = useForm();
  const ref = useRef(null)
  const [file, setFile] = useState({})
  const [evento, setEvento] = useState({
      titulo: "",
      dataAbertura: "",
      dataEncerramento: "",
      local: "",
      descricao: "",
      taxaInscricao: "",
      idadeMinima: "",
      caminhoImagem: ""
  })
  const [loading, setLoading] = useState(true)

  useEffect(async()=>{
    await api.get("/eventos/"+id).then((res)=>{
      console.log(res)
      setEvento({
        titulo: res.data.titulo,
        dataAbertura: res.data.dataAbertura,
        dataEncerramento: res.data.dataEncerramento,
        local: res.data.local,
        descricao: res.data.descricao,
        taxaInscricao: res.data.taxaInscricao,
        idadeMinima: res.data.idadeMinima,
      })
    })
    setLoading(false)
  },[])

  const cadastrar = async (event) => {

    console.log(event)

    if(file != {}){
      let formData = new FormData()
      formData.append("file", file)
      await api.post("/eventos/salvarImagem", formData ,{
        headers: {
          "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        }
      })
      .then((res) => { })
      .catch((err) => { });
    }

    let dataAbertura = event?.dataAbertura.split("/");
    dataAbertura = dataAbertura[2] + "-" + dataAbertura[1] + "-" + dataAbertura[0]

    let dataEncerramento = event.dataEncerramento.split("/");
    dataEncerramento = dataEncerramento[2] + "-" + dataEncerramento[1] + "-" + dataEncerramento[0]

    let parsedvalue = {...event, dataAbertura, dataEncerramento}

    if(!id){

      await api.post("eventos", parsedvalue).then((res)=>{
        Swal.fire({
          icon: "success",
          title: "Acampamento criado com sucesso",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }).catch((err)=>{
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro"
        }) 
        console.log(err)
      })

    }else{

      await api.put("eventos/"+id, parsedvalue).then((res)=>{
        Swal.fire({
          icon: "success",
          title: "Acampamento alterado com sucesso",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
      }).catch((err)=>{
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro"
        }) 
        console.log(err)
      })
    }
  }


  return (
    <>
      <Header></Header>
      <BackGroundPage page={
        <Grid container justifyContent="center">
           <Grid item xs={4} style={{ display: "flex", marginTop: 10 }} justifyContent="center">
            
            <Grid position="absolute" left="16%" top="12.5%" onClick={ ()=>{window.history.back()} } style={{ cursor: "pointer"  }}>
              <Icon icon="icon-park-outline:return" color="white" fontSize={40} />
            </Grid> 
              
            <Title>{window.location.href === "http://localhost:3000/eventos/cadastrar" ? "Cadastrar Evento" : "Alterar Evento"}</Title>
          </Grid>
          { loading ? "" : (
          <Grid item xs={12} style={{ margin: "0 auto" }}>
            <Grid container justifyContent="space-around" style={{ margin: "0 auto" }}>
              <Grid item xs={6}>
                <form onSubmit={handleSubmit(cadastrar)}>
                <br></br>
                <Grid item xs={12} style={{ margin: "20px 0px 0px 0px" }}>
                  <TextFieldComponent
                    id="standard-basic"
                    variant="standard"
                    defaultValue={evento.titulo}
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
                      defaultValue={evento.dataAbertura}
                      name="dataAbertura"
                      control={control}
                      label="Data de Início"
                      fullWidth
                      inputMask={{ mask: '99/99/9999', maskChar: "", alwaysShowMask: false }}
                    />
                  </Grid>
                  <Grid item xs={5.4}>
                    <TextFieldComponent
                      id="standard-basic"
                      variant="standard"
                      defaultValue={evento.dataEncerramento}
                      name="dataEncerramento"
                      control={control}
                      label="Data de Encerramento"
                      fullWidth
                      inputMask={{ mask: '99/99/9999', maskChar: "", alwaysShowMask: false }}
                    />
                  </Grid>
                </Grid>

                <br></br>
                <Grid item xs={12}>
                  <TextFieldComponent
                    id="standard-basic"
                    variant="standard"
                    defaultValue={evento.local}
                    name="local"
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
                    defaultValue={evento.descricao}
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
                      defaultValue={evento.taxaInscricao}
                      name="taxaInscricao"
                      control={control}
                      label="Taxa de inscrição"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={5.4}>
                    <TextFieldComponent
                      id="standard-basic"
                      variant="standard"
                      defaultValue={evento.idadeMinima}
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
                    <Grid item xs={2} >
                      <input type='file' ref={ref} hidden onChange={(e)=>setFile(e.target.files[0])}></input>
                      <Icon icon="ant-design:cloud-upload-outlined" color='white' fontSize="30px" type='file' onClick={()=>ref.current.click()}></Icon>
                    </Grid>
                  </Grid>
                  <Grid item xs={2} style={{ margin: "45px 20px 0px 0px", paddingBottom: "10%" }}>
                    <ButtonRegister
                      variant="outlined"
                      text={window.location.href === "http://localhost:3000/eventos/cadastrar" ? "Cadastrar" : "Salvar"}
                      type="submit"
                      bottaoCadEventos
                      onClick={cadastrar}
                    />
                  </Grid>
                </Grid>
                </form>
              </Grid>
            </Grid>
          </Grid>
          )}
        </Grid>
      }></BackGroundPage>
    </>
  )
}

export default CadastroEvento;
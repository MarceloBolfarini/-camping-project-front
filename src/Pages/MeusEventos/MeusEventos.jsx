import { Icon } from "@iconify/react";
import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import BackGroundPage from "../../Components/BackgroundPage";
import ButtonRegister from "../../Components/ButtonComponent";
import Header from "../../Components/Header";
import { api } from "../../services/api";
import { DescriptionCard, Imagem, SubDescriptionCard, SubTitleCard, Title, TitleCard } from "./style";


function MeusEventos (){

    const [meusEventos, setMeusEventos] = useState([])
    const [eventoSelecionado, setEventoSelecionado] = useState({});
    const [usuario, setUsuario] = useState({});
    const { isAuthenticated } = useSelector(state => state.auth)

    useEffect(async ()=>{
        
        await getUser();
        
        
    },[])

    useEffect(async ()=>{
      
      if(usuario.id != undefined)
        await loadmyEvents();

    },[usuario])

    const getUser = async () => {
      let usuarioo = await JSON.parse(localStorage.getItem('usuario'))
      setUsuario(usuarioo);
    }

    const desinscreverse = async () =>{
      await api.put("eventos/removerInscricao/evento/"+ eventoSelecionado.id +"/usuario/"+usuario.id)
        .then((response)=>{
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Sua inscrição foi desfeita com sucesso",
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        }).catch(()=>{
          Swal.fire({
            icon: "error",
            title: "Ocorreu um erro"
          }) 
        })
    }

    const modalConfirmacao = () => {
      return Swal.fire({
        title: 'Tem certeza que deseja se desinscrever do acampamento:',
        text: eventoSelecionado.titulo,
        color: "white",
        showCancelButton: true,
        style: "&.swal2-styled.swal2-confirm {background: white !important}",
        confirmButtonText: "confirmar",
        cancelButtonColor: "#313131",
        cancelButtonText: "cancelar",
        background: "#414141",
        border: "1px solid #FFFFFF",
        customClass: {
          confirmButton: 'btn-class' //insert class here
        }
    }).then(async(result) => {
        if(result.isConfirmed){
          await desinscreverse()
        }
    })
    }

    const loadmyEvents = async () => {
        api.get('/usuarios/'+usuario.id,{})
        .then(response => {
          console.log(response.data)
          setMeusEventos(response.data.eventos)
        }).catch(err=> console.log(err))
    }

    return (
        <>
        <Header></Header>
        <BackGroundPage page={
        <Grid container justifyContent="center">
          <Grid item xs={4} style={{ display: "flex", marginTop: 10 }} justifyContent="center">
            { eventoSelecionado.id &&  
            <Grid position="absolute" left="16%" top="12.5%" onClick={ ()=>setEventoSelecionado({}) } style={{ cursor: "pointer"  }}>
              <Icon icon="icon-park-outline:return" color="white" fontSize={40} />
            </Grid> 
            }       
            <Title>{eventoSelecionado.titulo == undefined ? "Meus Eventos" : eventoSelecionado.titulo}</Title>
          </Grid>

          {eventoSelecionado.id === undefined ?
            meusEventos?.map((evento, key) =>

              <Grid item xs={12} justifyContent="center" style={{ display: "flex", marginBottom: "5%" }}>
                <Grid container onClick={() => setEventoSelecionado(evento)} style={{ background: "#535353", height: 200, width: "60%", borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);" }}>
                  <Grid item xs={4}>
                    <Imagem src={"http://localhost:8080/eventos/recuperarImagem/" + evento?.caminhoImagem} />
                  </Grid>
                  <Grid item xs={7}>
                    <Grid container xs={12}>
                      <Grid item xs={12}>
                        <TitleCard>
                          {evento?.titulo}
                        </TitleCard>
                      </Grid>
                      <Grid item xs={12}>
                        <DescriptionCard>
                          {evento?.descricao}
                        </DescriptionCard>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )
            :
            <>
              <Grid item xs={12} style={{ padding: "0 20%" }}>
                <Grid container >
                  <Grid item xs={8} style={{height: 200, borderRadius: 10}}>
                    <Imagem style={{ borderRadius: "10px", width: "90%", height: "120%", boxShadow: "-4px 4px 4px rgba(0, 0, 0, 0.50)" }} src={"http://localhost:8080/eventos/recuperarImagem/" + eventoSelecionado.caminhoImagem} />
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container style={{ marginLeft: "20%" }}>
                      <Grid item xs={12}>
                        <SubTitleCard>
                          Abertura:
                        </SubTitleCard>
                        <SubDescriptionCard>
                          {eventoSelecionado?.dataAbertura}
                        </SubDescriptionCard>
                      </Grid>

                      <Grid item xs={12} marginTop={2}>
                        <SubTitleCard>
                          Encerramento:
                        </SubTitleCard>
                        <SubDescriptionCard>
                          {eventoSelecionado.dataEncerramento}
                        </SubDescriptionCard>
                      </Grid>

                      <Grid item xs={12} marginTop={2}>
                        <SubTitleCard>
                          Local:
                        </SubTitleCard>
                        <SubDescriptionCard>
                          {eventoSelecionado.local}
                        </SubDescriptionCard>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} marginTop={3}>
                    <SubTitleCard>
                      Descrição:
                    </SubTitleCard>
                    <SubDescriptionCard>
                      {eventoSelecionado.descricao}
                    </SubDescriptionCard>
                  </Grid>
                  <Grid item xs={12} marginTop={3}>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={3}>
                        <SubTitleCard>
                          Taxa de inscrição:
                        </SubTitleCard>
                        <SubDescriptionCard>
                          {"R$" + eventoSelecionado.taxaInscricao}
                        </SubDescriptionCard>
                      </Grid>
                      <Grid item xs={3}>
                        <SubTitleCard style={{float: 'right', display: "flex"}}>
                          Idade mínima:
                        </SubTitleCard>
                        <SubDescriptionCard>
                          {eventoSelecionado.idadeMinima + " anos"}
                        </SubDescriptionCard>
                      </Grid>
                    </Grid>
                    
                  </Grid>
                  <Grid item xs={12} style={{display: "flex", justifyContent:"center", marginTop: 30, paddingBottom: "10%"}}>
                    <ButtonRegister
                      variant="outlined"
                      text="Desinscreva-se"
                      type="submit"
                      bottaoCadEventos
                      onClick={modalConfirmacao}
                    />
                  </Grid>
                </Grid>
              </Grid>



            </>
          }





        </Grid>

      }></BackGroundPage>
    </>
    )
}


export default MeusEventos;
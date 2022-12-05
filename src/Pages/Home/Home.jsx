import { Grid } from '@mui/material';
import Header from "../../Components/Header";
import BackGroundPage from "../../Components/BackgroundPage";
import { DescriptionCard, Imagem, SubDescriptionCard, SubTitleCard, Title, TitleCard } from './style';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonRegister from '../../Components/ButtonComponent';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { api } from '../../services/api';

const Home = () => {

  const [eventos, setEventos] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState({});
  const [usuario, setUsuario] = useState({});
  const { isAuthenticated } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true)

  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    background: "#8e2748",
    showConfirmButton: false,
    timer: 5001,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const loadEvents = async () => (
    await axios.get('http://localhost:8080/eventos', {})
      .then((response) => {
        setEventos(response.data);
        console.log(response)
      }).catch(console.log)
  )

  const inscreverse = async () => (
    await api.put(`/eventos/inscricao/evento/${eventoSelecionado.id}/usuario/${usuario.id}`, {})
      .then((response)=>{
        console.log(response)
        return (
          Swal.fire({
            icon: "success",
            title: "Você se inscreveu com sucesso no Acampamento: "+ eventoSelecionado.titulo,
            showClass: {
              popup: 'animate__animated animate__fadeInDown' 
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        )
      }).catch(err => {
        console.log(err)
        return (
          Swal.fire({
            icon: "error",
            title: "Você já está inscrito nesse Acampamento",
            showClass: {
              popup: 'animate__animated animate__fadeInDown' 
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
        )
      })
  )

  useEffect(async () => {
    await loadEvents();
    console.log(eventos)
    setUsuario(JSON.parse(localStorage.getItem('usuario')));
    console.log(usuario);
    if(isAuthenticated){
      return(
        Toast.fire({
          icon: 'success',
          title: 'você está autenticado',
          color: "white",
          iconColor: "#FFFFFF"
        })
      )
    }
    setLoading(false)
  }, [])

  const openModal = async() => {
   return Swal.fire({
      title: 'Você está se inscrevendo no evento',
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

  }).then((result) => {
      if(result.isConfirmed){
        inscreverse()
      }
  })
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
            { (usuario.nivelAcesso == 0 && eventoSelecionado.id == undefined) &&  
            <Grid position="absolute" right="16%" top="12.5%" onClick={()=> window.location.pathname = "/eventos/cadastrar"} style={{cursor: "pointer"}}>
              <Icon icon="carbon:add-alt" color="white" fontSize={40} style />
            </Grid> 
            }
            <Title>{eventoSelecionado.titulo == undefined ? "Eventos" : eventoSelecionado.titulo}</Title>
          </Grid>

          {eventoSelecionado.id === undefined ?
            eventos.map((evento, key) =>

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
                  <Grid item xs={12} style={{display: "flex", justifyContent:"center", marginTop: 30}}>
                    <ButtonRegister
                      variant="outlined"
                      text="Inscreva-se"
                      type="submit"
                      disabled={eventoSelecionado.inscritos.find((inscritos) => inscritos.id == usuario.id) ? true : false}
                      bottaoCadEventos
                      onClick={openModal}
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

export default Home;
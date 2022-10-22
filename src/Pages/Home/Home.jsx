// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { Context } from "../../Contexts/context"
// import axios from "axios";
// import { DivCard, Input, Moldura } from "./style";
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Header from "../../Components/Header";
import BackGroundPage from "../../Components/BackgroundPage";
import { DescriptionCard, Imagem, SubDescriptionCard, SubTitleCard, Title, TitleCard } from './style';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {

  const [eventos, setEventos] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState({});

  const loadEvents = async () => (
    await axios.get('http://localhost:8080/eventos', {})
      .then((response) => {
        setEventos(response.data);
        console.log(response)
      }).catch(console.log)
  )

  useEffect(async () => {
    await loadEvents();
    console.log(eventos)
  }, [])

  useEffect(async () => {
    console.log(eventoSelecionado)
  }, [eventoSelecionado])

  return (
    <>
      <Header></Header>
      <BackGroundPage page={
        <Grid container justifyContent="center">
          <Grid item xs={4} style={{ display: "flex", marginTop: 10 }} justifyContent="center">
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
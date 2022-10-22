import { Grid } from '@mui/material';
import Header from "../../Components/Header";
import BackGroundPage from "../../Components/BackgroundPage";
import { DescriptionCard, Imagem, Title, TitleCard } from './style';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {

    const [eventos, setEventos] = useState([]);

    const loadEvents = async () => (
        await axios.get('http://localhost:8080/eventos',{
            // headers:{
            //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgQWNhbXBhbWVudG9zIiwic3ViIjoiRW1haXNUZXN0ZWVAaG90bWFpbC5jb20iLCJpYXQiOjE2NjYzODg3MTQsImV4cCI6MTY2NjQ3NTExNH0.OzL7-5oukSRk5MVWhC8JIc42RUq0r7c_4tC0xPVZqNQ'
            // }
        })
        .then( (response)=> {setEventos(response.data); 
                            console.log(response) }).catch(console.log)
    )

    useEffect( async()=>{
        await  loadEvents();
        console.log(eventos)
    },[])

    return(
    <>
    <Header></Header>
    <BackGroundPage page={
        <Grid container justifyContent="center">
          <Grid item xs={4} style={{display: "flex", marginTop: 10}} justifyContent="center">
              <Title>Eventos</Title>
          </Grid>

          { eventos.map((evento)=>
          <Grid item xs={12} justifyContent="center" style={{ display: "flex", marginBottom: "5%" }}>
            <Grid container style={{ background: "#535353", height: 200, width: "60%", borderRadius: "10px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);"}}>
              <Grid item xs={4}> 
                <Imagem src={"http://localhost:8080/eventos/recuperarImagem/" + evento?.caminhoImagem}/>
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
          )}
        </Grid>
    }></BackGroundPage>   
    {/* <Moldura>
        <h1>{nome}</h1>
    </Moldura>

    <Moldura red>  
        
    </Moldura>
    <h1>{nome}</h1>

    <Input color="red" value={nome} onChange={(e)=>setNome(e.target.value)} />
    <hr />
    <div> Meu nome é  {nome} </div>

        <button onClick={()=>{alert("Pedrão Lindo S2")}}>aaa</button>

    <DivCard>
    { 
    filmes?.map((filme, index)=>(

        <><Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={"http://localhost:8080/eventos/recuperarImagem/" + filme?.caminhoImagem}
            alt={filme?.titulo}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
            {filme?.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {filme?.descricao}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <><br></br><br></br>
            </></>
    ))
    }
    </DivCard>
    
    {filmes[1]?.titulo}

     <h1>Pagina home do {data.nome} que tem {data.idade} </h1>

     <Link to="/"> <h2>logout</h2> </Link> */}

    </>
    )
}

export default Home;
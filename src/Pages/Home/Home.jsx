import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Contexts/context"
import axios from "axios";
import { DivCard, Input, Moldura } from "./style";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Home = () => {

    const data = useContext(Context);

    const [filmes, setFilmes] = useState([]);

    const loadMoviess = async () => (
        await axios.get('http://localhost:8080/eventos',{
            headers:{
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgQWNhbXBhbWVudG9zIiwic3ViIjoidGVzdGVAaG90bWFpbC5jb20iLCJpYXQiOjE2NjYyMjIxNjgsImV4cCI6MTY2NjMwODU2OH0.9dIvsPOD6ysNBUZx6t5gernQd1usYoiOFNHcbTLg9Us'
            }
        })
        .then( (response)=> {setFilmes(response.data); 
                            console.log(response) }).catch(console.log)
        
    )

    useEffect( async()=>{
        await  loadMoviess();
        console.log(filmes)
    },[])

    const [nome, setNome] = useState('');

    return(
    <>
    <Moldura>
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

     <Link to="/"> <h2>logout</h2> </Link>

    </>
    )
}

export default Home;
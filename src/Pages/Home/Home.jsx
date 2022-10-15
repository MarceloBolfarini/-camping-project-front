import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../Contexts/context"
import axios from "axios";
import { Input, Moldura } from "./style";

const Home = () => {

    const data = useContext(Context);

    const [filmes, setFilmes] = useState([]);

    const loadMoviess = async () => (
        await axios.get('https://api.b7web.com.br/cinema/')
        .then( (response)=> {setFilmes(response.data) })
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

    { 
    filmes?.map((filme, index)=>(
        <>
        <li key={index}>{filme?.titulo}</li>
        <img src={filme?.avatar}></img>
        </>
    ))
    }
    
    {filmes[1]?.titulo}

     <h1>Pagina home do {data.nome} que tem {data.idade} </h1>

     <Link to="/"> <h2>logout</h2> </Link>

    </>
    )
}

export default Home;
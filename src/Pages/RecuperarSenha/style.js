import { Grid } from "@mui/material";
import styled from "styled-components";

export const ContainerPrincipal = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`

export const TituloCadastro = styled.h2`
  color: white;
  font-weight: 500;
  font-size: 30px;
  //font-family: Poppins;
  font-style: normal;
`;

export const SubTituloCadastro = styled.h3`
  color: white;
  font-weight: 400;
  font-size: 25px;
`;

export const Img = styled.img`
width:100vw;
height:100vh;
`

export const TelaLogin = styled.div`
  background-image: linear-gradient(to bottom right, rgba(239, 239, 239, 0.03),
  rgba(239, 239, 239, 0.1),
  rgba(239, 239, 239, 0.174)) ;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 60px;
  border-radius: 15px;
  color: white;
  text-align: center; 
`
export const ContainerGrid = styled(Grid)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  background-image: linear-gradient(to bottom right, rgba(239, 239, 239, 0.03),
  rgba(239, 239, 239, 0.1),
  rgba(239, 239, 239, 0.174));
  width: 80% !important;
  border-radius: 21px;
`;

export const Input = styled.input`
  background-color: rgba(0,0,0,0.0);
  padding: 5px 1px;
  border: none;
  outline: none;
  font-size:15px;
  border-bottom: 2px solid white;
  color: white;
  ::placeholder {
    color: white;
    opacity: 1; 
};
`
export const Button = styled.button`
  background-color: rgba(227, 92, 133, 0.38);
  border: none;
  padding: 15px;
  width: 100%;
  border-radius: 10px;
  color: white;

    :hover{
    background-color: rgba(227, 92, 133, 0.6);
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.7));
    cursor: pointer;
    }
`;

export const ButtonCadastrese =  styled.a`

  text-decoration-line: underline;

  :hover{
    cursor: pointer;
  }
`;

import { Grid } from '@mui/material';
import Header from "../../Components/Header";
import BackGroundPage from "../../Components/BackgroundPage";
import { InputTitle, Title } from './style';
import { useState } from 'react';
import TextFieldComponent from '../../Components/TextFieldComponent';
import { useForm } from 'react-hook-form';
import ButtonRegister from '../../Components/ButtonComponent';
import { Icon } from '@iconify/react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { api } from '../../services/api';
import jsPDF from "jspdf";
import "jspdf-autotable";

const StyledTableCell = styled(TableCell)(({ }) => ({
  [`&.${tableCellClasses.head}`]: {
    background: "linear-gradient(to bottom , #902747 , #542864B0)",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    border: 0,
    textAlign: "center"
  },
  [`&.${tableCellClasses.body}`]: {
    background: "rgba(0,0,0,0.6)",
    fontSize: 14,
    border: 0,
    color: "white",
    textAlign: "center"

  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "rgba(0,0,0,0.5)",
    border: 0,
    boxShadow: "0px 0px 20px rgba(3, 3, 3, 0.5)"

  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    color: "white"
  },
}));

const GerenciarEventos = () => {

  const { control, handleSubmit, register, watch, setValue, setFocus } = useForm();

  const [eventos, setEventos] = useState([]);

  const loadEvents = async () => (
    await axios.get('http://localhost:8080/eventos', {
      // headers:{
      //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgQWNhbXBhbWVudG9zIiwic3ViIjoiRW1haXNUZXN0ZWVAaG90bWFpbC5jb20iLCJpYXQiOjE2NjYzODg3MTQsImV4cCI6MTY2NjQ3NTExNH0.OzL7-5oukSRk5MVWhC8JIc42RUq0r7c_4tC0xPVZqNQ'
      // }
    })
      .then((response) => {
        setEventos(response.data);
        console.log(response)
      }).catch(console.log)
  )

  useEffect(async () => {
    await loadEvents();
    console.log(eventos)
  }, [])

  const excluirEvento = async (id) => {
    await api.delete("/eventos/" + id).then((res) => {
      loadEvents();
      console.log(res)
      Swal.fire({
        icon: "success",
        title: "Acampamento deletado com sucesso",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }).catch((res) => {
      console.log(res)
      Swal.fire({
        icon: "error",
        title: "ocorreu algum erro",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    })
  }

  const openModal = async (id, titulo) => {
    return Swal.fire({
      title: titulo ? titulo : "Acampamento Selecionado",
      color: "white",
      showCancelButton: true,
      style: "&.swal2-styled.swal2-confirm {background: white !important}",
      confirmButtonText: "Excluir",
      cancelButtonColor: "#313131",
      cancelButtonText: "Alterar",
      background: "#414141",
      border: "1px solid #FFFFFF",
      customClass: {
        confirmButton: 'btn-class' //insert class here
      }

    }).then((result) => {
      if (result.isConfirmed) {
        excluirEvento(id)
      }
      if (result.dismiss) {
        window.location.pathname = "/eventos/editar/" + id
      }
    })
  }

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Lista de Eventos";
    const headers = [["Título", "Local", "Data Início", "Data Encerramento", "Taxa Inscrição", "Idade Minima", "Qtd. Inscritos"]];

    const data = eventos.map(pdf => [pdf.titulo, pdf.local, pdf.dataAbertura, pdf.dataEncerramento, pdf.taxaInscricao, pdf.idadeMinima, pdf.inscritos.length]);

    let content = {
        startY: 50,
        head: headers,
        body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("lista-eventos.pdf")
}


  return (
    <>
      <Header></Header>
      <BackGroundPage page={
        <Grid container justifyContent="center">
          <Grid item xs={4} style={{ display: "flex", marginTop: 40 }} justifyContent="center">
            <Title>Gerenciamento de Eventos</Title>
          </Grid>

          <Grid item xs={12} style={{ margin: "0 auto" }}>
            <Grid container justifyContent="space-around" style={{ margin: "60px 0px 0px 0px" }}>
              <Grid item xs={9}>
                <TableContainer component={Paper} style={{ boxShadow: "10px 5px 30px rgba(3, 3, 3, 0.5)" }}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="right">Título</StyledTableCell>
                        <StyledTableCell align="right">Local</StyledTableCell>
                        <StyledTableCell align="right">Data Início</StyledTableCell>
                        <StyledTableCell align="right">Data Encerramento</StyledTableCell>
                        <StyledTableCell align="right">Taxa Inscrição</StyledTableCell>
                        <StyledTableCell align="right">Idade Minima</StyledTableCell>
                        <StyledTableCell align="right">Qtd. Inscritos</StyledTableCell>
                        <StyledTableCell align="right">Lista Inscritos</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {eventos.map((evento) =>
                        <StyledTableRow key={evento?.id}>
                          <StyledTableCell component="th" scope="row" onClick={() => openModal(evento.id, evento.titulo)}>{evento?.titulo}</StyledTableCell>
                          <StyledTableCell align="right" onClick={() => openModal(evento.id, evento.titulo)}>{evento?.local}</StyledTableCell>
                          <StyledTableCell align="right" onClick={() => openModal(evento.id, evento.titulo)}>{evento?.dataAbertura}</StyledTableCell>
                          <StyledTableCell align="right" onClick={() => openModal(evento.id, evento.titulo)}>{evento?.dataEncerramento}</StyledTableCell>
                          <StyledTableCell align="right" onClick={() => openModal(evento.id, evento.titulo)}>{evento?.taxaInscricao}</StyledTableCell>
                          <StyledTableCell align="right" onClick={() => openModal(evento.id, evento.titulo)}>{evento?.idadeMinima}</StyledTableCell>
                          <StyledTableCell align="right" onClick={() => openModal(evento.id, evento.titulo)}>{evento?.inscritos.length}</StyledTableCell>
                          <StyledTableCell align="right" onClick={() => window.location.pathname = "/eventos/gerenciar/lista/" + evento.id}><Icon icon="fontisto:file-1" style={{cursor: "pointer"}} color='white' fontSize="20px"></Icon></StyledTableCell>
                        </StyledTableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid item xs={12} style={{ display: "flex" }} justifyContent="center" onClick={() => exportPDF()}>
                  <h4 style={{ color: "white" }} >Imprimir: </h4>
                  <Icon style={{ marginTop: "25px", marginLeft: "10px", cursor: "pointer" }} icon="fontisto:print" color="white" fontSize={18} />
                </Grid>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }></BackGroundPage>
    </>
  )
}

export default GerenciarEventos;
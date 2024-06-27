import { Checkbox, Grid } from '@mui/material';
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
import { useParams } from 'react-router-dom';
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

const ListaInscritos = () => {

    const { id } = useParams();

    const [evento, setEvento] = useState([]);
    const [titulo, setTitulo] = useState([]);

    const loadEvent = async () => (
        await api.get('http://localhost:8080/eventos/' + id, {})
            .then((response) => {
                setEvento(response.data.inscritos);
                setTitulo(response.data.titulo);
                console.log(response)
            }).catch(console.log)
    )

    useEffect(async () => {
        await loadEvent();
        console.log(evento)
    }, [])

    const confirmaPagamento = async (idInscrito) => {
        await api.put('http://localhost:8080/eventos/pagamento/evento/'+id+'/usuario/'+idInscrito, {})
        .then((response) => {
            console.log(response)
            loadEvent();
        }).catch(console.log)
    }

    const removerInscricao = async (idInscrito) => {
        await api.put('http://localhost:8080/eventos/removerInscricao/evento/'+id+'/usuario/'+idInscrito, {})
        .then((response) => {
            console.log(response)
            loadEvent();
        }).catch(console.log)
    }

    const openModal = async (id, nome, sobrenome) => {
        return Swal.fire({
          title: nome && sobrenome ? "Você deseja remover a inscrição do usuário: "+ nome +" "+ sobrenome + "?" : "Usuário Selecionado",
          color: "white",
          showCancelButton: true,
          style: "&.swal2-styled.swal2-confirm {background: white !important}",
          confirmButtonText: "Sim",
          cancelButtonColor: "#313131",
          cancelButtonText: "Não",
          background: "#414141",
          border: "1px solid #FFFFFF",
          customClass: {
            confirmButton: 'btn-class' //insert class here
          }
    
        }).then((result) => {
          if (result.isConfirmed) {
           removerInscricao(id)
          }
          if (result.dismiss) {
            loadEvent()
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

        const title = titulo;
        const headers = [["Nome", "Email", "Telefone", "Cidade", "Estado", "Pagamento"]];

        const data = evento.map(pdf => [pdf.nome + " " + pdf.sobrenome, pdf.email, pdf.telefone, pdf.cidade, pdf.estado, pdf.pagamento == true ? "OK" : "Pendente"]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("lista-inscritos.pdf")
    }


    return (
        <>
            <Header></Header>
            <BackGroundPage page={
                <Grid container justifyContent="center">
                    <Grid item xs={4} style={{ display: "flex", marginTop: 40 }} justifyContent="center">
                        <Grid position="absolute" left="16%" top="12.5%" onClick={() => { window.history.back() }} style={{ cursor: "pointer" }}>
                            <Icon icon="icon-park-outline:return" color="white" fontSize={40} />
                        </Grid>
                        <Title>{"Lista de Inscritos: " + titulo}</Title>
                    </Grid>

                    <Grid item xs={12} style={{ margin: "0 auto" }}>
                        <Grid container justifyContent="space-around" style={{ margin: "60px 0px 0px 0px" }}>
                            <Grid item xs={9}>

                                <TableContainer component={Paper} style={{ boxShadow: "10px 5px 30px rgba(3, 3, 3, 0.5)" }}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table" >
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="right">Nome</StyledTableCell>
                                                <StyledTableCell align="right">Email</StyledTableCell>
                                                <StyledTableCell align="right">Telefone</StyledTableCell>
                                                <StyledTableCell align="right">Cidade</StyledTableCell>
                                                <StyledTableCell align="right">Estado</StyledTableCell>
                                                <StyledTableCell align="right">Pagamento</StyledTableCell>
                                                <StyledTableCell align="right">Remover Inscrição</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {evento.map((inscrito) =>
                                                <StyledTableRow key={evento.id}>
                                                    <StyledTableCell component="th" scope="row" >{inscrito?.nome + " " + inscrito?.sobrenome}</StyledTableCell>
                                                    <StyledTableCell align="right" >{inscrito?.email}</StyledTableCell>
                                                    <StyledTableCell align="right" >{inscrito?.telefone}</StyledTableCell>
                                                    <StyledTableCell align="right" >{inscrito?.cidade}</StyledTableCell>
                                                    <StyledTableCell align="right" >{inscrito?.estado}</StyledTableCell>
                                                    <StyledTableCell align="right" ><Checkbox style={{color: "white"}} onChange={() => confirmaPagamento(inscrito?.id)} defaultChecked={inscrito?.pagamento} ></Checkbox></StyledTableCell>
                                                    <StyledTableCell align="right" ><Icon style={{cursor: "pointer"}} onClick={() => openModal(inscrito?.id, inscrito?.nome, inscrito?.sobrenome)} icon="material-symbols:delete-outline" color="white" fontSize={25} /></StyledTableCell>
                                                </StyledTableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Grid item xs={12} style={{ display: "flex" }} justifyContent="center" onClick={() => exportPDF()}>
                                    <h4 style={{ color: "white" }} >Imprimir: </h4>
                                    <Icon style={{marginTop: "25px", marginLeft: "10px", cursor: "pointer" }} icon="fontisto:print" color="white" fontSize={18}  />
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }></BackGroundPage>
        </>
    )
}

export default ListaInscritos;

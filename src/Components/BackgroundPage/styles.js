import { Grid } from "@mui/material";
import styled from "styled-components";


export const Container = styled(Grid)`
    width: 100%;
    height: 45.1vw;
    background: #282828;
    overflow: auto;
    max-width: 100vw;
`;

export const Content = styled(Grid)`
    overflow: auto;
    background: #313131;
    width: 80%;
    height: 100%;
    margin: 0px auto;
    box-shadow: 0px 0px 30px rgba(3, 3, 3, 0.5);

    ::-webkit-scrollbar {
    width: 10px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
    background: #313131;
    border-radius: 5px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #535353;
    border-radius: 5px;
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555;
    }
`;
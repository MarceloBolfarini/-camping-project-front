import { Grid } from "@mui/material";
import styled from "styled-components";


export const Container = styled(Grid)`
    display: flex;
    width: 100%;
    height: 60px;
    background: linear-gradient(to right, #902747, #543883, #2D7989);
`;

export const ItemsMenu = styled.h1`
    color: white;
    font-size: 25px;
    font-weight: 500;

    :hover{
        cursor: pointer;
    }

    -webkit-touch-callout: none;  /* iPhone OS, Safari */
    -webkit-user-select: none;    /* Chrome, Safari 3 */
    -khtml-user-select: none;     /* Safari 2 */
    -moz-user-select: none;       /* Firefox */
    -ms-user-select: none;        /* IE10+ */
    user-select: none;
`;